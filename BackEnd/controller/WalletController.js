"use strict"
var Wallet = require('../models/Wallet');



var WalletController = {
    getWallet: function (req, res)
    {
        var owner_id = req.params.id;

        if (!owner_id) {
            return req.status(404).send({ message: 'Id was not provided' })
        }
        Wallet.find({owner_id:owner_id}).exec((err, wallet) => {
            if (err) {
                return res.status(500).send({ msg: "Error during getting the wallet" });
            }
            if (!wallet) {
                return res.status(404).send({ msg: "There is not wallet" });
            }
            return res.status(200).send({WALLET:wallet });
        });
    }
}
module.exports = WalletController
