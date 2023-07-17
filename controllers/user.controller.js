const { signupService, loginService, findUserByEmail } = require("../services/user.services");


exports.signup=async(req,res,next)=>{
	try {
		const result= await signupService(req.body);
		res.status(200).json({
			status:'success',
			message:'signed up successfully',
			result:result
		})
	} catch (error) {
		res.status(400).json({
			status:'fail',
			message:error
		})
		
	}
}
exports.login=async(req,res,next)=>{
	try {
		// const result= await loginService(req.body);
		const {email,password}=req.body;
		if(!email || !password){
			return res.status(401).json({
				status:"fail",
				error:"Please provide your credentials",
			});
		};
		const user=await findUserByEmail(email);
		// if user not exist
		if(!user){
			return res.status(401).json({
				status:"fail",
				error:"no user found"
			})
		};
		const isPasswordMatched=user.comparePassword(password,user.password);
		if(!isPasswordMatched){
			return res.status(400).json({
				status:"fail",
				error:"Wrong user Email and Password"
			})
		}

		res.status(200).json({
			status:'success',
			message:'login successful',
			// result:result
		})
	} catch (error) {
		res.status(400).json({
			status:'fail',
			message:error
		})
		
	}
}