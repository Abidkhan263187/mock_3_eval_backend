const mongoose = require('mongoose')


const empSchema=mongoose.Schema({
firstName:{type:String, required:true},
lastName:{type:String, required:true},
email:{type:String, required:true},
department:{type:String, required:true , enum:["Tech", "Marketing", "Operations"]},
salary:{type:String, required:true}
})
const empModel= mongoose.model('employee',empSchema)

module.exports={empModel}