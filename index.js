const express=require("express");
const app=express();
var bodyParser = require('body-parser');
var {mongoose} = require('./db/mongoose');
var {Tenant} = require('./models/model')
var {ObjectID} = require('mongodb');
const joi = require('joi');
const PORT=process.env.PORT|3000;
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/api/tenant/',(req,res)=>{
	Tenant.find().then((ten)=>{
		res.send({ten});
	},(e)=>{
		res.status(400).send(e);
	
	})
})






app.post('/api/tenant',(req,res)=>{
	const schema={
		Building_no:joi.number().min(1).max(2).required(),
			Room_no:joi.number().min(1).max(2).required(),
	
	Pan:joi.string().min(6).max(36).required(),
	Aadhar_no:joi.number().required(),
		Name:joi.string().min(6).max(36).required()

	}
	const result = joi.validate(req.body,schema);
	if(result.error){
		res.status(400).send(result.error.details[0].message);
		return;
	}

	var newTenant= new Tenant({
    Room_no:req.body.Room_no,
	Name:req.body.Name,
	Pan:req.body.Pan,
	Aadhar_no:req.body.Aadhar_no
     });

     newTenant.save().then((doc)=>{
     	console.log('save tenant',JSON.stringify(doc,undefined,2));
     	res.send(doc);
     },(e)=>{
     	res.status(400).send(e)
     })

	console.log(newTenant);
	res.send(newTenant);
	
})


app.get('/api/tenant/:id',(req,res)=>{
	var id=req.params.id;
	if(!ObjectID.isValid(id)){
		return res.status(404).send("error");
	}
	Tenant.findById(id).then((ten)=>{
		if(!ten){
			return res.status(404).send("error");
		}
		res.send(ten);

	}).catch((e)=>{
		res.status(400).send();
	})
	
})






app.put('/api/tenant/:id',(req,res)=>{
	var id=req.params.id;
	if(!ObjectID.isValid(id)){
		return res.status(404).send("error");
	}
	Tenant.findByIdAndUpdate(id,{$set:body}).then((ten)=>{
		if(!ten){
			return res.status(404).send("error");
		}
	
	ten.save().then((doc)=>{
     	console.log('save tenant',JSON.stringify(doc,undefined,2));
     	res.send(doc);
     },(e)=>{
     	res.status(400).send(e)
     })


	}).catch((e)=>{
		res.status(400).send();
	})
	

	
})


app.delete('/api/tenant/:id',(req,res)=>{
	var id=req.params.id;
	if(!ObjectID.isValid(id)){
		return res.status(404).send("error");
	}
	Tenant.findByIdAndRemove(id).then((ten)=>{
		if(!ten){
			return res.status(404).send("error");
		}
		res.send(ten);
		
		
	})

	
})






app.listen(PORT,()=>{
	console.log(PORT);
})
