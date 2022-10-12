const usercontroller=require('../../controllers/user/login');
module.exports=(app)=>{
    app.get('/v1/signin',usercontroller.signin);
};
