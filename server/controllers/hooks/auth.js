const jwt = require("jsonwebtoken");
const secretKey="Todo-Poc-CRUD-API";
module.exports={
 verifyToken(req,res,next){
    const authHeader=req.headers["authorization"];
    const token=authHeader&&authHeader.split(" ")[1];
    if(token==null) return res.send("error");
    jwt.verify(token,secretKey,(err,user)=>{
        if(err)return res.send("error");
        req.user=user;
        next();
    })
}
};
