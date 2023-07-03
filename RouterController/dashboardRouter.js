const {Router}=require('express')

const dashBoardRouter=Router();


dashBoardRouter.get('/',(req,res)=>{
    res.status(200).json({message:"dashboard page "})
})

module.exports={dashBoardRouter}