import { NextResponse } from "next/server";
import Connect from "../../../../db";
import Saved from "../../../../models/Saved";
export const POST = async (req, res) => { 
    const { cityName, cityId, cityProvince, cityCountry, cityLatitude, cityLongitude } = await req.json();
    try {
        await Connect();
        const newCity = await Saved.create({ cityName, cityId, cityProvince, cityCountry, cityLatitude, cityLongitude });
        console.log(newCity);
        return NextResponse.json({msg: ["City added to favorites"], success: true,});
    } catch (error) {
        return new NextResponse("Error in fetching posts" + error, {status: 500})
    }

}
