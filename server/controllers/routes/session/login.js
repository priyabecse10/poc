const usercontroller=require('../../controllers/user/login');
module.exports=(app)=>{
    app.post('/v1/signin',usercontroller.signin);
};
