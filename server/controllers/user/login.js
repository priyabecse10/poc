const user = require('../../models').users;
const bcrypt=require('bcryptjs');
const jwt=require("jsonwebtoken");
const secretKey="Todo-Poc-CRUD-API";
module.exports = {
  signin(req,res){
    const email=req.body.email;
    const password=req.body.password;
    return user
    .findOne({
        where:{
            email:req.body.email
        }
    })
    .then(user=>{
        //
        if(!user){
            return res.status(404).send({message:"user not found."});
        }
        const passwordIsValid=bcrypt.compareSync(
            req.body.password,
            user.password
        );
        if(!passwordIsValid){
            return res.status(401).send({
                message:"Invalid pasword!"
            });
        }
        else{
            
           let token=jwt.sign({email,password},secretKey,{expiresIn:'1d'});
                
                res.status(200).send({
                    id:user.id,
                    name:user.name,
                    email:user.email,
                    password:user.password,
                    accesstoken:token,
                    msg:"success"
                });
                                 
           }
         })

    },
};
