var express = require('express');
var router =  express.Router();
var Admin = require('../../models').Admin
var bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken');
var randomToken = require('random-token');

router.get('/',function(req,res,next){
    res.json("addsds");
})

router.post('/',function(req,res,next){
    const {username, email, password} = req.body;
    let hashPassword = bcrypt.hashSync(password,8);
    let status = 1
    Admin.create({
        username,
        email,
        password: hashPassword,
        status
    })
    .then(results => {
        res.send({
            status: true,
            data: results
        })
    })
    .catch(err => {
        let  error = err.errors ? err.errors[0].message : err;
        res.send({
            status: false,
            error
        })
    })
})
router.post("/login",function(req,res,next){
    const {email, password} = req.body;
    let status = 1;
    Admin.findOne({
        where: {
            email,
            status
        }
    })
    .then(result => {
        if(bcrypt.compareSync(password,result.password)){
            var token = jwt.sign({ foo: email }, 'shhhhh');
            res.send({
                status: true,
                data: {user: result,  token: token}
            })
        }
        else{
            let error = [];
            res.send({
                status: false,
                error: {password: "Password incorrect"}
            })
        }
    })
    .catch(err => {
        let  error = err.errors ? err.errors[0].message : err;
        res.send({
            status: false,
            error: {email: "Email incorrect",password: "Password incorrect"}
        })
    })
})
router.put("/forgetpassword",function(req,res,next){
    const {email} = req.body
    let token = randomToken(100)
    Admin.update({
        token,
      }, {
        where: {
          email
        }
      })
    .then(result => {
        if(result == 1){
            res.send({
                status: true,
                message: "Email sent successfully"
            })
        }
        else{
            res.send({
                status: false,
                error : "Email incorrect"
            })    
        }
    })
    .catch(err => {
        let error = err.errors ? err.errors[0].message : err
        res.send({
            status: false,
            error
        })
    })   
})
module.exports = router;
