import  jwt  from "jsonwebtoken";

export const verifyToken = async (req, res , next) =>{
    try {
        let token = req.header("Authorization")
        if(!token){
            return res.status(404).json({message : "Acess denied"})
        }
        if(token.startsWith("Bearer ")){
            token = token.slice(7,token.length).trimLeft();
        }
        const verified = jwt.verify(token, process.env.Jwt_Secret);
        req.user = verified;
        next()
    } catch (err) {
        res.status(404).json({message : err.message})
    }
} 