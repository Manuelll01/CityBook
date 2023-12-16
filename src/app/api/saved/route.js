
import { NextResponse } from "next/server";
import Connect from "../../../../db";
import Saved from "../../../../models/Saved";
import useSWR from 'swr'

export const GET = async (request) => {
    try {
        await Connect();
        const posts = await Saved.find();
        return new NextResponse(JSON.stringify(posts) , {status: 200, headers: { 'Content-Type': 'application/json' }})
    } catch (error) {
        return new NextResponse("Error in fetching posts" + error, {status: 500})
    }
}