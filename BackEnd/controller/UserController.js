"use strict"
var User = require('../models/User');
var Wallet = require('../models/Wallet')
var UserController = {
    saveUser: (req, res) =>
     
    {
        
        let user = new User();
        var params = req.body;
        user.name = params.name;
        user.password = params.password;
        user.shoppingKart = 
        {toPay:0,
        items: [],
        amountItems:0
        };

        user.save().then((userSaved) => {
            if (!userSaved) {
                return res.status(404).send({ msg: 'User could not be saved' })
            }
            let wallet = new Wallet()
            wallet.owner_id = userSaved._id;
            wallet.money = 0;

            wallet.save().then((walletSaved) => {
                if(walletSaved) return res.status(200).send({ msg: 'User created successfully',USER: userSaved,walletSaved })
            }) 
        })
    },
    getUser: function (req, res)
    
    {
        var id = req.params.id;

        if (!id) {
            return res.status(404).send({ message: 'Id was not provided' })
        }
        User.findById(id).then((user) => {

            if (!user) return res.status(404).send({ message: 'The user dont exist' })

            return res.status(200).send({ USER: user });

        })
    },
    getExistence: function (req, res)
    
    {
        var id = req.params.id;
        User.exists({_id:id}).exec().then((Result) => {
            if (!Result) return res.status(200).send({Exist:false})

            return res.status(200).send({Exist:true});
        });
    },
    updateUser: function (req, res)
    
    {
        var id = req.params.id;
        var update = req.body;

        User.findByIdAndUpdate(id, update, { new: true }).then((userUpdated) => {
    
            if (!userUpdated) return res.status(404).send({ message: 'Document could not be updated' });

            return res.status(200).send({
                USER: userUpdated
            })
        });
    },
    updateKart: function (req, res)
    
    {
        var id = req.params.id;
        var  kart = req.body;

        User.findByIdAndUpdate(id, {shoppingKart: kart}, { new: true }).then(( userUpdated) => {
            if (!userUpdated) return res.status(404).send({ message: 'Document could not be updated' });

            return res.status(200).send({
                USER: userUpdated
            })
        });
    }
    
}
module.exports = UserController
