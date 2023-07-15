const mongoose=require('mongoose');
const validator=require('validator')
const {ObjectId}=mongoose.Schema.Types;

const Schema=mongoose.Schema;

// product brand model 
const brandSchema=new Schema({
	name:{
		type:String,
		trim:true,
		maxLength:100,
		required:[true,'Please provide a valid brand name'],
		unique:true,
		lowercase:true
	},
	description:String,
	email:{
		type:String,
		validate:[validator.isEmail,'Please provide a valid Email']
	},
	website:{
		type:String,
		validate:[validator.idURL,'Please provide a valid URL']
	},
	location:String,
	products:[{
		type:ObjectId,
		ref:"Product"
	}],
	suppliers:[{
		name:String,
		contactNumber:String,
		id:ObjectId,
		ref:"Supplier"
	}],
	status:{
		type:String,
		enum:['active','inactive'],
		default:'active'
	},
	timestamps:true
})
const Brand=mongoose.model('brand',brandSchema);
module.exports=Brand;