import mongoose from "mongoose"
const signupschema=new mongoose.Schema({
    email:String,
    value:Array
})
export const Userid = mongoose.models.expenditure||mongoose.model("expenditure",signupschema)