"use strict"
var Transaction = require('../models/Transaction');



var TransactionController = {
    saveTransaction: (req, res) =>
    {
        let transaction = new Transaction();
        var params = req.body;
        transaction.wallet_id = params.wallet_id;
        transaction.value = params.value;
        transaction.detail = params.detail;
        transaction.creationDate = Date();
        
        transaction.save((err, TransactionSaved) => {
            if (err) {
                return res.status(500).send({ msg: 'Error in petition' })
            }
            if (!TransactionSaved) {
                return res.status(404).send({ msg: 'Transaction could not be saved' })
            }
           
            return res.status(200).send({ msg: 'Transaction created successfully', TRANSACTION: TransactionSaved });
            
            
        })

    },
    getTransaction: function (req, res)
    
    {
        var id = req.params.id;

        if (!id) {
            return req.status(404).send({ message: 'Id was not provided' })
        }
        Transaction.findById(id ,(err, transaction) => {
            if (err) {
                return res.status(500).send({ message: 'Error at returning the data.' });
            }

            if (!transaction) return req.status(404).send({ message: 'The transaction dont exist' })

            return res.status(200).send({ TRANSACTION: transaction });

        })
    },
    getTransactions: function (req, res){
        var wallet_id = req.params.id;
        Transaction.find({wallet_id:wallet_id}).exec((err, Transactions) => {
            if (err) {
                return res.status(500).send({ msg: "Error during getting the Transactions" });
            }
            if (!Transactions) {
                return res.status(404).send({ msg: "There is not Transactions" });
            }
            return res.status(200).send({ TRANSACTIONS: Transactions });
        });
    }
}
module.exports = TransactionController
