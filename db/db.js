import mongoose from "mongoose";

export const connectDB= () => {
    mongoose.connect(process.env.MONGODB_URL, {
        dbName: "backendapi"
    })
    .then((c) => console.log(`Database connected With ${c.connection.host}`))
    .catch((c) => console.log(c));
}