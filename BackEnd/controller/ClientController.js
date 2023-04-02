"use strict"
var Client = require('../models/Client');
var Wallet = require('../models/Wallet')
const { Kart } = require('../models/Kart');
var ClientController = {
    saveClient: (req, res) =>
     
    {
        let client = new Client();
        var params = req.body;
        client.name = params.name;
        client.password = params.password;
        client.shoppingKart = new Kart(0,[],0);

        client.save((err, clientSaved) => {
            if (err) {
                return res.status(500).send({ msg: 'Error in petition' })
            }
            if (!clientSaved) {
                return res.status(404).send({ msg: 'Client could not be saved' })
            }
            let wallet = new Wallet()
            wallet.owner_id = clientSaved._id;
            wallet.money = 0;

            wallet.save((err, walletSaved) => {
                if(walletSaved) return res.status(200).send({ msg: 'Client created successfully', CLIENT: clientSaved })
            })
            
        })

    },
    getClient: function (req, res)
    
    {
        var id = req.params.id;

        if (!id) {
            return req.status(404).send({ message: 'Id was not provided' })
        }
        Client.findById(id ,(err, client) => {
            if (err) {
                return res.status(500).send({ message: 'Error at returning the data.' });
            }

            if (!client) return req.status(404).send({ message: 'The client dont exist' })

            return res.status(200).send({ CLIENT: client });

        })
    },
    getExistence: function (req, res)
    
    {
        var id = req.params.id;
        Client.exists({id:id}).exec((err, Result) => {
            if (err) return res.status(500).send({ message: 'Error during verifying the data' })

            if (!Result) return res.status(200).send({Exist:false})

            return res.status(200).send({Exist:true});
        })

    },
    updateClient: function (req, res)
    
    {
        var id = req.params.id;
        var update = req.body;

        Client.findByIdAndUpdate(id, update, { new: true }, (err, clientUpdated) => {
            if (err) return res.status(500).send({ message: 'Error during updating' });

            if (!clientUpdated) return res.status(404).send({ message: 'Document could not be updated' });

            return res.status(200).send({
                CLIENT: clientUpdated
            })
        })
    },
    updateKart: function (req, res)
    
    {
        var id = req.params.id;
        var  kart = req.body;

        Client.findByIdAndUpdate(id, {shoppingKart: kart}, { new: true }, (err, clientUpdated) => {
            if (err) return res.status(500).send({ message: 'Error during uptdating' });

            if (!clientUpdated) return res.status(404).send({ message: 'Document could not be updated' });

            return res.status(200).send({
                CLIENT: clientUpdated
            })
        })
    }
    
}
module.exports = ClientController
