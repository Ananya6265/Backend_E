const jwt=require('jsonwebtoken')

const jwtMiddleware=(req,res,next)=>{
    console.log('inside jwtmiddleware');
    console.log(req.headers);

    const token =req.headers["authorization"].split(" ")[1]
    
    
    if(token){
        try{
           const jwtResponse=jwt.verify(token,process.env.JWT_PASSWORD)
           console.log(jwtResponse);
           req.userId=jwtResponse.userId
           next()
           
           
        }catch(err){
          
          res.status(401).json("authorization failed!...Please login")
        }
    }else{
        res.status(401).json("authorization failed token is missing")
    }
    
}
module.exports= jwtMiddleware