module.exports={
    authUser(req,res,next){
      const role=req.query.role;
      if(role==='admin'){
        next();
       }
       else{
        res.send('error');
       }  
}
};
