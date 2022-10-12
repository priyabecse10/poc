const book = require('../../models').books;
//const user=require('../../models/user');
const nodemailer=require('nodemailer');
module.exports = {
  create(req, res) {
    return book
      .create({
        name: req.body.name,
        //user_id: req.params.user_id,
        price:req.body.price,
        date_of_expiry:req.body.date_of_expiry,
      })
      .then(book =>{
        const mailTransporter=nodemailer.createTransport({
          service:'Gmail',
          auth:{
            user:'xyz@gmail.com',
            pass:'12345678'
          }
        });
        const mailDetails={
          from:'xyz@gmail.com',
          to:'admin@gmail.com',
          subject:'Book created',
          text:'Book created successfully'
        };
        mailTransporter.sendMail(mailDetails,function(err,data){
          if(err){
            console.log('Error Occurs');
          }else{
            res.send('Email sent Successfully'+ data.response);
          }
        });
        res.status(201).send(book);
        })
      .catch(error => res.status(400).send(error));
  },
  
  update(req, res) {
    return book
      .find({
          where: {
            id: req.params.id,
            user_id: req.params.user_id,
          },
        })
      .then(book => {
        if (!book) {
          return res.status(404).send({
            message: 'Book Not Found',
          });
        }
        return book
          .update({
            
            date_of_expiry: req.body.date_of_expiry || book.date_of_expiry,
          })
          .then(book => res.status(200).send(book))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },
  
  destroy(req, res) {
    return book
      .find({
          where: {
            id: req.params.id,
            user_id: req.params.user_id,
          },
        })
      .then(book => {
        if (!book) {
          return res.status(404).send({
            message: 'Book Not Found',
          });
        }
        return book
          .destroy()
          .then(() => {
            const mailTransporter=nodemailer.createTransport({
              service:'Gmail',
              auth:{
                user:'xyz@gmail.com',
                pass:'12345678'
              }
            });
            const mailDetails={
              from:'xyz@gmail.com',
              to:'priyabecse10@gmail.com',
              subject:'Book created',
              text:'Book deleted successfully'
            };
            mailTransporter.sendMail(mailDetails,function(err,data){
              if(err){
                console.log('Error Occurs');
              }else{
                res.send('Email sent Successfully'+ data.response);
              }
            })
            res.status(204).send()})
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },
  list(req, res) {
    return book => {
        const page=parseInt(req.query.page)
        const limit=parseInt(req.query.limit)
        const startIndex=(page-1)*limit
        const endIndex=page*limit
        const results={}

        results.resultBooks=book.slice(startIndex,endIndex)
        results.next={
          page:page+1,
          pagelimit:limit
        }
        results.previous={
          page:page-1,
          pagelimit:limit
        }
        res.status(200).send(results);
      }
      // catch(error){ 
      //   res.status(400).send(error)
      // };
  },
};
