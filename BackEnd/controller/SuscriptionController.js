"use strict"
var Suscription = require('../models/Suscription');
var suscriptionController = {
    saveSuscription: (req, res) =>
    {
        let suscription = new Suscription();
        var params = req.body;
        suscription.suscriptor_id = params.suscriptor_id;
        suscription.pyme_id = params.pyme_id;
        suscription.charge = params.charge;
        suscription.creationDate = Date();
        
        suscription.save((err, suscriptionSaved) => {
            if (err) {
                return res.status(500).send({ msg: 'Error in petition' })
            }
            if (!suscriptionSaved) {
                return res.status(404).send({ msg: 'Suscription could not be saved' })
            }
            return res.status(200).send({ msg: 'Suscription created successfully', SUSCRIPTION: suscriptionSaved });
        })

    },
    getSuscription: function (req, res)
    
    {
        var id = req.params.id;

        if (!id) {
            return req.status(404).send({ message: 'Id was not provided' })
        }
        Suscription.findById(id ,(err, suscription) => {
            if (err) {
                return res.status(500).send({ message: 'Error at returning the data.' });
            }

            if (!suscription) return req.status(404).send({ message: 'The suscription dont exist' })

            return res.status(200).send({ SUSCRIPTION: suscription });

        })
    },
    getSuscriptionsUser: function (req, res){
        var suscriptor_id = req.params.id;
        Suscription.find({suscriptor_id:suscriptor_id}).exec((err, suscriptions) => {
            if (err) {
                return res.status(500).send({ msg: "Error during getting the suscriptions" });
            }
            if (!suscriptions) {
                return res.status(404).send({ msg: "There is not suscriptions" });
            }
            return res.status(200).send({ SUSCRIPTIONS: suscriptions });
        });
    },
    getSuscriptionsPyme: function (req, res){
        var pyme_id = req.params.id;
        Suscription.find({pyme_id:pyme_id}).exec((err, suscriptions) => {
            if (err) {
                return res.status(500).send({ msg: "Error during getting the suscriptions" });
            }
            if (!suscriptions) {
                return res.status(404).send({ msg: "There is not suscriptions" });
            }
            return res.status(200).send({ SUSCRIPTIONS: suscriptions });
        });
    }
}
module.exports = suscriptionController
