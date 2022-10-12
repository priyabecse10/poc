const fastify=require('fastify')({logger:true});

//require our routes into the appication
require('./server/routes/user/index')(fastify);
require('./server/routes/session/signup')(fastify);
require('./server/routes/session/login')(fastify);
require('./server/routes/book/book.private.route')(fastify);
fastify.get('/',(req,res)=>{
    res.status(200).send({
        message:"hello world",});
});

const start=async()=>{
    try{
        await fastify.listen({port:8000});
    }catch(err){
        fastify.log.error(err);
        process.exit(1);
    }
};
start();
