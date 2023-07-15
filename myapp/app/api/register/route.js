import { NextResponse } from "next/server"
import db from "../../../lib/db.js"

export const POST = async (request) => {
    try {
        const body = await request.json();
        const {name, email, image} = body;

        const newUser = await db.user.create({
            data: {
                name,
                email,
                image
            }
        })

        return NextResponse.json(newUser);

    } catch(err) {
        return NextResponse.json({message: "POST Error", err}, {status: 500})
    }
}