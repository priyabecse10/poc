const jwt = require("jsonwebtoken");
const secretKey="Todo-Poc-CRUD-API";

const verifyToken=()=>{
    fastify.decorateRequest('user'," ");
    fastify.addHook('preHandler',async(req,res,next)=>{
        const authHeader=req.headers["Authorization"];
        const token=authHeader&&authHeader.split(" ")[1];
        if(token==null) return res.send("error");
        try{
        jwt.verify(token,seretKey,(err,data)=>{
            if(err)return res.send("error");
            else{
                req.data=data;
                res.send("token verified");
            }
        })
    }catch(error){
        res.send("error occurred");
    }
        next();
    })
};

module.exports={
    verifyToken
}
