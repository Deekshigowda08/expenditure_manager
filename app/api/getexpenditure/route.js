import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { connect } from "./address";
import { Userid } from "./find_address";



export async function POST(req){
	const payload = await req.json();
	await mongoose.connect(connect)
	const user=await Userid.findOne({email:payload.email})
	return NextResponse.json({success:true,result:user});
	
}
