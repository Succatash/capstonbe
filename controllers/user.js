const router = require('express').Router();
const {User} = require('../models');
const {v4: uuidv4} = require('uuid');

router.get('/register', async (req, res, next) => {
	try {
		const user = await User.findAll();
		res.status(200).json(user);
		

	} catch(err) {
		console.log('An error happened in the get user route ', err);
	}
});

router.post('/register', async(req,res,next)=>{

	 const [user, created] = await User.findOrCreate({
	 	where: { 
	    email:req.body.user.email,
	
 	 }, defaults:{
	id:uuidv4(),
	firstName: req.body.user.firstName,
	lastName: req.body.user.lastName,
	password:req.body.user.password
  }
	 
	  });

	 return res.status(200).send({success:created});
})


router.post('/login', async(req,res,next)=>{

	await User.findOne({ where: { email:req.body.user.email  }}).then(async (user) =>{
if(!user){
	res.json({success:false, user:'No User Found'})
}
  user.validPassword(req.body.user.password,user.password).then(result=>{
if(!result){
	res.json({success:result,user:"Wrong Password"})
} else {

	res.status(200).json({success:result,
		firstName:user.firstName, 
		lastName:user.lastName})
}
	})


})
})

module.exports = router;
