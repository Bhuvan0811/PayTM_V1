const express = require('express');
const { userMiddleware } = require('../middleware');
const { Accounts } = require('../modal/db');
const { default: mongoose } = require('mongoose');
const router = express.Router();

router.get("/balance", userMiddleware, async (req, res) =>{
    const account = await Accounts.findOne({
        userId: req.userId
    })
    res.status(200).json({
        balance: account.balance
    })
})
router.post("/transfer", userMiddleware, async (req,res)=>{
    const session = await mongoose.startSession();
    session.startTransaction();
    try{
        const { to, amount } = req.body;
    
        const sendTo = await Accounts.findOne({ userId: to }).session(session);
        console.log(sendTo)
        if(!sendTo){
            session.abortTransaction();
            return res.status(411).json({ msg: "Account does not exist" })
        } 

        const user = await Accounts.findOne({ userId: req.userId }).session(session);
        
        if(user.balance < amount) {
            await session.abortTransaction();
            return res.status(400).json("Insufficient balance");
        }

        await Accounts.updateOne({ userId: sendTo.userId },{ $inc: { balance: amount } }).session(session);
        await Accounts.updateOne({ userId: req.userId },{ $inc: { balance: -amount } }).session(session);

        await session.commitTransaction();
        
        return res.status(200).json({ msg: "Transfer completed" });

    }
    catch(err){
        await session.abortTransaction();
        res.status(411).json({ msg: "Internal server error" });
    }finally{
        session.endSession();
    }
})
module.exports = router;
