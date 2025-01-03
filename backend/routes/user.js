const express = require('express');
const z = require('zod');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { User, Accounts } = require('../modal/db');
const { userMiddleware } = require('../middleware');
const JWT_KEY = process.env.JWT_KEY;

const signupSchema = z.object({
    username: z.string().min(3).email(),
    password: z.string().length(6),
    firstname: z.string().max(30),
    lastname: z.string().max(40)
})
const signinSchema = z.object({
    username: z.string().min(3).email(),
    password: z.string().length(6),
})
const updateUserSchema = z.object({
    password: z.string().length(6),
    firstname: z.string().max(30).min(1).optional(),
    lastname: z.string().max(40).min(1).optional()
}).strict()
router.post("/signup", async (req, res)=>{
    const userObject = req.body;
    const validate = signupSchema.safeParse(userObject);

    if(!validate.success) return res.status(411).json({
        msg: "The password and username does not meet the required conditions."
    });

    const user = await User.findOne({
        username: userObject.username
    });

    if(user) return res.status(411).json({
        msg: "Username already taken."
    })

    const newUser = new User(userObject);
    await newUser.save();
    await Accounts.create({
        userId: newUser._id,
        balance: 1 + (Math.random()*10000)
    })

    const token = jwt.sign({
        userId: newUser._id
    }, JWT_KEY);

    return res.status(200).json({
        token: token
    })    
})
router.post("/signin", async (req,res)=>{
    const userBody = req.body;

    const validate = signinSchema.safeParse(userBody);
    if(!validate.success) return res.status(411).json({
        msg: "Incorrect inputs"
    })

    const user = await User.findOne({
        username: userBody.username,
        password: userBody.password
    });

    if(!user) return res.status(404).json({
        msg: "user does not exist"
    });

    const token = jwt.sign({
        userId: user._id
    }, JWT_KEY)

    return res.status(200).json({
        token: token
    })
})
router.put("/", userMiddleware, async (req, res) =>{
    const update = req.body
    const validate = updateUserSchema.safeParse(update);
    if(!validate.success) res.status(403).json({
        msg: "What are you sending?"
    });
    const user = await User.updateOne({
        _id: req.userId
    },update);
    res.status(200).json({
        msg: "Updated Successfully"
    })
})

router.get("/bulk", userMiddleware, async (req, res) =>{
    const filter = req.query.filter || "";

    let matchedUsers = await User.find({
        $or :[{
            firstname:{
                "$regex": filter
            }
        }, {
            lastname: {
                "$regex": filter
            }
        }]
    });
    const response = matchedUsers.map((user)=>{
        return {
            firstname: user.firstname,
            lastname: user.lastname,
            _id: user._id
        }
    });
    res.status(200).json({
        users: response
    });
})
module.exports = router;