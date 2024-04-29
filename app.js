import express from "express";
import morgan from "morgan";
import cors from "cors";
import mongoose from "mongoose";

import contactsRouter from "./routes/contactsRouter.js";

mongoose.set("strictQuery", true);

const DB_HOST =
  "mongodb+srv://Krylov-Artem:H83HDfefBvAaxPzn@atlascluster.eu6shs1.mongodb.net/Contacts_reader?retryWrites=true&w=majority&appName=AtlasCluster";
mongoose
  .connect(DB_HOST)
  .then(() => console.log("finnaly"))
  .catch((error) => console.log(error.message));
const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

app.listen(3000, () => {
  console.log("Server is running. Use our API on port: 3000");
});
