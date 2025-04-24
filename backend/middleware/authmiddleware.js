
const jwt=require("jsonwebtoken")

module.exports=(req,res,next)=>{
    const authheader=req.headers["authorization"];

    if(!authheader || !authheader.startsWith("Bearer ")){
        return res.status(401).json({message:"unauthorized : No Token Provided.."})
    }

    const token = authheader.split(" ")[1];

    try {
        const decoded=jwt.verify(token,process.env.JWT_SECRET_KEY);
        req.user=decoded;
        next();
    } catch (error) {
        res.status(401).json({message:"unauthorized :invalid token."})
    }
}