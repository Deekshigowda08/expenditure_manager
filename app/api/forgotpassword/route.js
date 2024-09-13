import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { connect } from "./address";
import { Userid } from "./find_address";
const CryptoJS = require("crypto-js");



export async function POST(req){
	const payload = await req.json();
	await mongoose.connect(connect)
	const user=await Userid.findOne({"email":payload.email})
    if(user){
	   var bytes  = CryptoJS.AES.decrypt(user.password, '@deekshigowda');
	   var originalText = bytes.toString(CryptoJS.enc.Utf8);
		if(payload.email== user.email && payload.name==user.name){
			return NextResponse.json({success:true,password:originalText});

		}
		else{
			return NextResponse.json({success:false,password:"Invalid Name"});
		}

	}
	else{
		return NextResponse.json({success:false,password:"User not found"});
	}	
}
