"use strict"
var Investment = require('../models/Investment');
var investmentController = {
    saveInvestment: (req, res) =>
    {
        let investment = new Investment();
        var params = req.body;
        investment.investor_id = params.investor_id;
        investment.pyme_id = params.pyme_id;
        investment.invested = params.invested;
        investment.creationDate = Date();
        
        investment.save((err, investmentSaved) => {
            if (err) {
                return res.status(500).send({ msg: 'Error in petition' })
            }
            if (!investmentSaved) {
                return res.status(404).send({ msg: 'Investment could not be saved' })
            }
            return res.status(200).send({ msg: 'Investment created successfully',INVESTMENT: investmentSaved });
        })

    },
    getInvestment: function (req, res)
    
    {
        var id = req.params.id;

        if (!id) {
            return req.status(404).send({ message: 'Id was not provided' })
        }
        Investment.findById(id ,(err, investment) => {
            if (err) {
                return res.status(500).send({ message: 'Error at returning the data.' });
            }

            if (!investment) return req.status(404).send({ message: 'The investment dont exist' })

            return res.status(200).send({ INVESTMENT: investment });

        })
    },
    getInvestmentsClient: function (req, res){
        var investor_id = req.params.id;
        Investment.find({investor_id:investor_id}).exec((err, investments) => {
            if (err) {
                return res.status(500).send({ msg: "Error during getting the investments" });
            }
            if (!investments) {
                return res.status(404).send({ msg: "There is not investments" });
            }
            return res.status(200).send({INVESTMENTS: investments });
        });
    },
    getInvestmentsPyme: function (req, res){
        var pyme_id = req.params.id;
        Investment.find({pyme_id:pyme_id}).exec((err, investments) => {
            if (err) {
                return res.status(500).send({ msg: "Error during getting the investments" });
            }
            if (!investments) {
                return res.status(404).send({ msg: "There is not investments" });
            }
            return res.status(200).send({ INVESTMENTS: investments });
        });
    }
}
module.exports = investmentController
