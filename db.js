import mongoose from "mongoose";

 const Connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL); /*mongodb+srv://manuelmircea20:parola2@cluster1.4uluqlz.mongodb.net/  --> Connection string  */
        console.log('connected to mongodb...')
        
    } catch (error) {
        throw new Error("Could not connect to mongodb...")
    }
}

export default Connect