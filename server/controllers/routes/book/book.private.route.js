const bookcontroller=require('../../controllers/book/book');
const authUser=require('../../controllers/middleware');

module.exports=(app)=>{
app.post('/v1/book/create',authUser,bookcontroller.create);
app.post('/v1/book/update/:id',authUser,bookcontroller.update);
app.get('/v1/book/list',authUser,bookcontroller.list);
app.delete('/v1/book/delete/:id',authUser,bookcontroller.destroy);
};
