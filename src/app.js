import express from "express";
import cors from "cors";

export const startServer = () => {
	const app = express();
	const PORT = process.env["PORT"] ?? "";

	app.use(cors());
	app.use(express.json());

	app.get("/", (req, res) => {
		return res.status(200).json({
			success: true,
			message: "Hello from communo API",
		});
	});

	app.listen(PORT, () => console.log(`App is running at port: ${PORT}`));
};
