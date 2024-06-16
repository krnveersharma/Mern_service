const User=require("../models/user-model")
const bcrypt=require("bcryptjs");
const register=async(req,res)=>{
    try {
        const mail=req.body.email;
    const exist=await User.findOne({email:mail});
    if(exist){
        return res.status(200).json({msg:"User already exists"});
    }
    const saltround=10;
    const hashpassword=await bcrypt.hash(req.body.password,saltround);
    const newUser=await User.create({username:req.body.username,email:req.body.email,phone:req.body.phone,password:hashpassword});
    res.json({msg:"User created"});
    } catch (error) {
        console.error(error);
    }
}
const login=async(req,res)=>{
    try {
        const mail=req.body.email;
    const exist=await User.findOne({email:mail});
    if(exist){
        const valid=await bcrypt.compare(req.body.password,exist.password);
        if(valid){
            return res.status(200).json({msg:"logged in successfuly"});
        }
        return res.status(400).json({msg:"Invalid password"});
    }
    res.status(400).json({msg:"email not found"});
    } catch (error) {
        console.error(error);
    }
}
module.exports={register,login};