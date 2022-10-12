const usercontroller=require('../../controllers/user/user');

module.exports=(app)=>{
app.post('/v1/create',usercontroller.create);
app.put('/v1/update/:id',usercontroller.update);
app.get('/v1/list',usercontroller.list);
app.get('/v1/retrieve/:id',usercontroller.retrieve);
app.delete('/v1/delete/:id',usercontroller.destroy);
};
