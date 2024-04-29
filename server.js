import app from "./app";
import mongoose from "mongoose";

mongoose.set("strictQuery", true);

const DB_HOST =
  "mongodb+srv://Krylov-Artem:H83HDfefBvAaxPzn@atlascluster.eu6shs1.mongodb.net/Contacts_reader?retryWrites=true&w=majority&appName=AtlasCluster";

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(3000);
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });

app.listen(3000, () => {
  console.log("Server is running");
});
