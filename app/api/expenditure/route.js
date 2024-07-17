import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { connect } from "./address";
import { Userid } from "./find_address";



export async function POST(req){
	const payload = await req.json();
	await mongoose.connect(connect)
	const email={"email":payload.email};
	const value={"value":payload.value}
	const user=await Userid.findOneAndUpdate(email,value)
    
	return NextResponse.json({success:true});
	
}
