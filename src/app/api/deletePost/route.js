import { NextResponse } from "next/server";
import Connect from "../../../../db";
import Saved from "../../../../models/Saved"; 

export const DELETE = async (req, res) => { 
    const { cityId } = await req.json();

    try {
      await Connect();
      const deletedCity = await Saved.findOneAndDelete({ cityId });
  
      if (deletedCity) {
        console.log(`City with cityId ${cityId} deleted:`, deletedCity);
        return NextResponse.json({ msg: ["City deleted from favorites"], success: true });
      } else {
        console.log(`City with cityId ${cityId} not found`);
        return new NextResponse("City not found", { status: 404 });
      }
    } catch (error) {
      console.error('Error deleting city:', error);
      return new NextResponse("Error in deleting city" + error, { status: 500 });
    }

}