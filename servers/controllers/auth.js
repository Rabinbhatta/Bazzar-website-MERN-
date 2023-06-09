import bcrypt from "bcrypt";
import  Jwt  from "jsonwebtoken";
import { User } from "../models/user.js";

export const register = async (req,res) => {
 try {
    const {
        firstName,
        lastName,
        email,
        password,
        address
       } =req.body;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password,salt);

    const newUser = new User({
        firstName,
        lastName,
        email,
        address,
        password:passwordHash,
        
    })

    const savedUser = await newUser.save()
    res.status(201).json(savedUser) 
 } catch (err ) {
    res.status(404).json({error : err.message})
 }


}

export const login = async (req,res) =>{
   try {
      const {email , password} = req.body;
      const user = await User.findOne({email})
      if(!user){
        return res.status(400).json({mes:"User Not Found"})
      }
      const isMatch = await bcrypt.compare(password,user.password)
      if(!isMatch){
         return res.status(400).json({mes:"Wrong password"})
      }
      const token = Jwt.sign({id:user._id},process.env.Jwt_Secret)
      delete user.password
      res.status(200).json({token,user})
      
   } catch (err) {
      res.status(404).json({error : err.message})
   }
}
