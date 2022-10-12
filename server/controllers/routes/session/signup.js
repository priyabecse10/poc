const usercontroller=require('../../controllers/user/user');
module.exports=(app)=>{
    app.post('/v1/signup',usercontroller.create);
};
