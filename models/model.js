var mongoose = require('mongoose');
var Tenant=mongoose.model('Tenant',{
	Building_no:{
		type:Number,
		required:true,
		minlength:1,
		trim:true
	},
	Room_no:{
		type:Number,
		required:true,
		minlength:1,
		trim:true


	},
	Name:{
		type:String,
		required:true,
		minlength:6,
		trim:true


	},
	Pan:{
		type:String,
		required:true,
		minlength:6,
		trim:true


	},
	Aadhar_no:{
		type:Number,
		required:true,
		minlength:6,
		trim:true


	},
	DOB:{
		type:Date
		


	},
	Check_In:{
		type:Date
	
		



	}
},'Building');

module.exports = {Tenant};