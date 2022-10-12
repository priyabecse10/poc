const usercontroller=require('../../controllers/user/user');
const auth=require('../../hooks/auth');
module.exports=(app)=>{
    app.get('/v1/logout',auth,usercontroller.logout);
};
