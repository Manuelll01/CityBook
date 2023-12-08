
import { NextResponse } from "next/server";
import Connect from "../../../../db";
import Post from "../../../../models/Post";
import useSWR from 'swr'

export const GET = async (request) => {
    try {
        await Connect();
        const posts = await Post.find();
        return new NextResponse(JSON.stringify(posts) , {status: 200, headers: { 'Content-Type': 'application/json' }})
    } catch (error) {
        return new NextResponse("Error in fetching posts" + error, {status: 500})
    }
}