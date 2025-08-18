import express from "express";
import cors from "cors";
import env from "dotenv";
env.config();

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ message: "Server is UP" });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
