const router = require('express').Router();
const mongoose = require('mongoose');
const Product = require('../models/Product');
const {verifyToken, verifyTokenAuthorization, verifyTokenAndAdmin }= require('./verifyToken');

router.post('/create', verifyTokenAndAdmin, async (req, res) => {
    const newProduct =  new Product(req.body)
    try {
        const savedProduct = await newProduct.save()
        res.status(200).json(savedProduct)
    } catch (error) {
        res.status(500).json(error)
    }

})
router.put('/edit/:id', verifyTokenAuthorization, async (req, res) => {
        if (req.body.password) {
   req.body.password = CryptoJS.AES.encrypt(
                req.body.password, process.env.PASS_SEC
        ).toString()
        }
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { new: true },
        );
        res.status(200).json(updatedProduct);
    } catch (err) {
        res.status(500).json(err)

    
    }
    })
    
    
router.delete('/delete/:id', verifyTokenAuthorization, async (req, res) => {
    try {
        await Product.findOneAndDelete(req.params.id)
        res.status(200).json("Prodcut deleted successfully")

    } catch (err) {
        res.status(500).json(err)
    }
})

// // get user by id
// router.get('/find/:id', verifyTokenAndAdmin, async (req, res) => {
//     try {
//         const user = await User.findById(req.params.id)
//         const {password, ...others} = user._doc
//         res.status(200).json(others)

//     } catch (err) {
//         res.status(500).json(err)
//     }
// })
// // get all users 
// router.get('/find', async (req, res) => {
//     try {
//         const users = query ? await User.find().limit(5) :
//             await User.find()
//         res.status(200).json(users)

//     } catch (err) {
//         res.status(500).json(err)
//     }
// })
// // user stat
// router.get('/stats',async (req, res) => {
//     const date = new Date();
//     const lastYear = new Date(date.setFullYear(date.getFullYear() - 1))
//     try {
//         const data = await User.aggregate([
        
//             { $match: { createdAt: { $gte: lastYear } } },
//             {
//                 $project: {
//                     month: { $month: "$createdAt" },
                    
//                 },

//             },
//             {
//                 $group: {
//                     _id: "$month" ,
//                     total: { $sum: 1 }
//                 }
//             },
//         ]);
//         res.status(200).json(data)
       
//     } catch (err) {
//        res.status(500).json(err) 
//     }
// })


module.exports = router;