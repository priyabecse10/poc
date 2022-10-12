const user = require('../../models').users;
const bcrypt=require('bcryptjs');
//const jwt=require("jsonwebtoken");
const book = require('../../models').books;
module.exports = {
    create(req, res) {
      return user
        .create({
          name: req.body.name,
          role:req.body.role,
          email:req.body.email,
          password:bcrypt.hashSync(req.body.password,8)
        })
        .then(res.status(201).send("User Successfully registered"))
        .catch(error => res.status(400).send(error));
    },
    list(req, res) {
      return user
        .findAll({
          include: [{
            model: book,
            as: 'Books',
          }],
        })
        .then(user => {
          const page=parseInt(req.query.page)
          const limit=parseInt(req.query.limit)
          const startIndex=(page-1)*limit
          const endIndex=page*limit
          const results={}

          results.resultUsers=user.slice(startIndex,endIndex)
          results.next={
            page:page+1,
            pagelimit:limit
          }
          results.previous={
            page:page-1,
            pagelimit:limit
          }
          res.status(200).send(results);
        })
        .catch(error => res.status(400).send(error));
    },
    retrieve(req, res) {
      return user
         .findByPk(req.params.id,
         {
          include: [{
            model:book,
            as: 'Books',
          }],
        })
        .then(user => {
          if (!user) {
            return res.status(404).send({
              message: 'User Not Found',
            });
          }
          return res.status(200).send(user);
        })
        .catch(error => res.status(400).send(error));
    },
    update(req, res) {
      return user
        .findByPk(req.params.id, {
          include: [{
            model: book,
            as: 'Books',
          }],
        })
        .then(user => {
          if (!user) {
            return res.status(404).send({
              message: 'user Not Found',
            });
          }
          return user
            .update({
              name: req.body.name || user.name,
              role:req.body.role||user.role,
              email:req.body.email,
              password:bcrypt.hashSync(req.body.password,8)
            })
            .then((user) => res.status(200).send(user))  // Send back the updated todo.
            .catch((error) => res.status(400).send(error));
        })
        .catch((error) => res.status(400).send(error));
    },
    destroy(req, res) {
      return user
        .findByPk(req.params.id)
        .then(user => {
          if (!user) {
            return res.status(400).send({
              message: 'User Not Found',
            });
          }
          return user
            .destroy()
            .then(() => res.status(200).send({message:'User deleted successfully.'}))
            .catch(error => res.status(400).send(error));
        })
        .catch(error => res.status(400).send(error));
    },
    logout(req,res){
        const token=res.headers("authorization");
      return user
     .destroy(token)
     .then(res.send({token:null,msg:"successfully logged out"}))
 },
  };
