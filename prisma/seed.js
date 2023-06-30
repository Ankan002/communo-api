import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { genSalt, hash } from "bcrypt";

const prismaClient = new PrismaClient();

const seedDatabase = async () => {
	try {
		const salt = await genSalt();
		const newPassword = await hash(
			process.env["ADMIN_PASSWORD"] ?? "",
			salt
		);

		await prismaClient.admin.upsert({
			where: {
				email: process.env["ADMIN_EMAIL"],
			},
			create: {
				email: process.env["ADMIN_EMAIL"],
				password: newPassword,
				name: process.env["ADMIN_NAME"],
			},
			update: {
				password: newPassword,
			},
		});
	} catch (error) {
		if (error instanceof Error) {
			console.log(error.message);
			return;
		}

		console.log(error);
	}
};

seedDatabase()
	.then(() => console.log("DONE!!"))
	.catch((e) => console.log(e));
