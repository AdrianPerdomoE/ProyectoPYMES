"use strict"
var Pyme = require('../models/Pyme');
var Wallet = require('../models/Wallet');


var PymeController = {
    savePyme: (req, res) =>
     
    {
        let pyme = new Pyme();
        var params = req.body;
        pyme.name = params.name;
        pyme.password = params.password;
        pyme.category = params.category;
        pyme.creationDate = new Date();
        pyme.pageStyle = {};

        pyme.save().then((pymeSaved) => {
            
            if (!pymeSaved) {
                return res.status(404).send({ msg: 'Pyme could not be saved' })
            }
            let wallet = new Wallet()
            wallet.owner_id = pymeSaved._id;
            wallet.money = 0;

            wallet.save().then((walletSaved) => {
                if(walletSaved) return res.status(200).send({ msg: 'Pyme created successfully', PYME: pymeSaved });
            });
        });
    },
    getPyme: function (req, res)
    
    {
        var id = req.params.id;

        if (!id) {
            return res.status(404).send({ message: 'Id was not provided' })
        }
        Pyme.findById(id).then((pyme) => {
           
            if (!pyme) return res.status(404).send({ message: 'The pyme dont exist' })

            return res.status(200).send({ PYME: pyme });

        });
    },
    getPymes: function (req, res){
        Pyme.find({}).exec().then((pymes) => {
            if (!pymes) {
                return res.status(404).send({ msg: "There is not pymes" });
            }
            return res.status(200).send({ PYMES: pymes });
        });
    },
    getPymesByCategory: function (req, res){
        let pymeCategory = new RegExp(`${req.params.searchBy}`, "i")
        Pyme.find({category:pymeCategory}).exec().then((pymes) => {
            if (!pymes) {
                return res.status(404).send({ msg: "There is not pymes" });
            }
            return res.status(200).send({ PYMES: pymes });
        });
    },
    getExistence: function (req, res)
    
    {
        var id = req.params.id;
        Pyme.findOne({email:id}).exec().then((Result) => {
            if (!Result) return res.status(200).send({Exist:false})
            return res.status(200).send({Exist:true});
        });
    },
    updatePyme: function (req, res)
    
    {
        var id = req.params.id;
        var update = req.body;
        Pyme.findByIdAndUpdate(id, update, { new: true }).then((pymeUpdated) => {
          
            if (!pymeUpdated) return res.status(404).send({ message: 'No se ha podido actualizar' });

            return res.status(200).send({
                PYME: pymeUpdated
            })
        });
    },
    confirmPassword: function (req, res) {
        let email = req.body.email
        let password = req.body.password

        Pyme.findOne({email:email}).exec().then((pyme)=>
        {if (!pyme) return res.status(404).send({ message: 'No hay usuarios registrados' })
            
            return res.status(200).send({ passwordIsCorrect:pyme.password == password })
        }).catch((err)=>{
                if (err) return res.status(500).send({ message: 'Error al devolver los datos' })
            })  
           

            
        
    }
}
module.exports = PymeController
