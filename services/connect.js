import mongoose from "mongoose";

const connectDB = async (url) => {
    await mongoose.set("strictQuery", true);
    await mongoose
        .connect(url)
        .then(() => console.log("MongoDB Connected"))
        .catch((error) => console.log(error));
};

export default connectDB;
