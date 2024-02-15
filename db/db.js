import mongoose from "mongoose";

export const connectDB = () => {
  mongoose
    .connect(process.env.MONGODB_URL, {
      dbName: "backendapi",
    })
    .then((c) => console.log(`Database Connected with ${c.connection.host}`))
    .catch((e) => console.log(e));
};
