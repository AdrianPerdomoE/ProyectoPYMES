"use strict"
var Pyme = require('../models/Pyme');
var Wallet = require('../models/Wallet');
const { pageStyle } = require('../models/pageStyle');

var PymeController = {
    savePyme: (req, res) =>
     
    {
        let pyme = new Pyme();
        var params = req.body;
        pyme.name = params.name;
        pyme.password = params.password;
        pyme.category = params.category;
        pyme.creationDate = new Date();
        pyme.pageStyle = new pageStyle();

        pyme.save((err, pymeSaved) => {
            if (err) {
                return res.status(500).send({ msg: 'Error in petition' })
            }
            if (!pymeSaved) {
                return res.status(404).send({ msg: 'Pyme could not be saved' })
            }
            let wallet = new Wallet()
            wallet.owner_id = pymeSaved._id;
            wallet.money = 0;

            wallet.save((err, walletSaved) => {
                if(walletSaved) return res.status(200).send({ msg: 'Pyme created successfully', pyme: pymeSaved })
            })
            
        })

    },
    getPyme: function (req, res)
    
    {
        var id = req.params.id;

        if (!id) {
            return req.status(404).send({ message: 'Id was not provided' })
        }
        Pyme.findById(id ,(err, pyme) => {
            if (err) {
                return res.status(500).send({ message: 'Error at returning the data.' });
            }

            if (!pyme) return req.status(404).send({ message: 'The pyme dont exist' })

            return res.status(200).send({ pyme: pyme });

        })
    },
    getPymes: function (req, res){
        Pyme.find({}).exec((err, pymes) => {
            if (err) {
                return res.status(500).send({ msg: "Error during getting the pymes" });
            }
            if (!pymes) {
                return res.status(404).send({ msg: "There is not pymes" });
            }
            return res.status(200).send({ pymes });
        });
    },
    getExistence: function (req, res)
    
    {
        var id = req.params.id;
        Pyme.exists({id:id}).exec((err, Result) => {
            if (err) return res.status(500).send({ message: 'Error during verifying the data ' })

            if (!Result) return res.status(200).send({Exist:false})

            return res.status(200).send({Exist:true});
        })

    },
    updatePyme: function (req, res)
    
    {
        var id = req.params.id;
        var update = req.body;
        Pyme.findByIdAndUpdate(id, update, { new: true }, (err, pymeUpdated) => {
            if (err) return res.status(500).send({ message: 'Error al actualizar' });

            if (!pymeUpdated) return res.status(404).send({ message: 'No se ha podido actualizar' });

            return res.status(200).send({
                pyme: pymeUpdated
            })
        })
    }
}
module.exports = PymeController
