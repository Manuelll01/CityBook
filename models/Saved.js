import mongoose from "mongoose";

const { Schema } = mongoose;

const savedSchema = new Schema({
    cityName: {
        type: String,
        required: true
    },
    cityId: {
        type: String,
        required: true
    },
    cityProvince: {
        type: String,
        required: true
    },
    cityCountry: {
        type: String,
        required: true
    },
    cityLatitude: {
        type: Number,
        required: true
    },
    cityLongitude: {
        type: Number,
        required: true
    }
})

export default mongoose.models.Saved || mongoose.model("Saved", savedSchema)