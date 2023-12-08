import mongoose from "mongoose";

 const Connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('connected to mongodb...')
        
    } catch (error) {
        throw new Error("Could not connect to mongodb...")
    }
}

export default Connect