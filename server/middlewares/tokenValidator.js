const jwt =require( "jsonwebtoken");
// const mongoose =require( "mongoose");

 const validation = async (req, res, next) => {
    try {
        const token=req.cookies.authToken||""
        // console.log(token);
        jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
            if (err) {
                res.status(401);
                throw new Error("Authorization token not valid")
            }
        })
        //NOTE - now token is valid move forward  
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        req.user = payload.user;
        req.expireTime = payload.expireTime;
        next()

    } catch (error) {
        res.status(401)
        next(error)
    }

} 

module.exports=validation