const express = require("express");
const { check, validationResult} = require("express-validator/check");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const authshopkeeper = require("../middleware/authshopkeeper");


const Shopkeeper = require("../model/Shopkeeper");

router.post(
    "/signup", 
    [
        check("mobile", "Please enter a Valid Mobile Number")
        .isNumeric({ min : 10 })
        .not()
        .isEmpty(),
        check('email', "Please enter a valid email").isEmail(),
        check("password", "Please enter a valid password").isLength({ min : 6 })
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }

        const {
            mobile,
            email,
            password
        } = req.body;
        try {
            let shopkeeper = await Shopkeeper.findOne({
                mobile
            });
            if (shopkeeper) {
                return res.status(400).json({
                    msg: "Shopkeeper Already Exists"
                });
            }
            shopkeeper = new Shopkeeper({
                mobile,
                email,
                password
            });

            const salt = await bcrypt.genSalt(10);
            shopkeeper.password = await bcrypt.hash(password, salt);

            await shopkeeper.save();

            const payload = {
                shopkeeper: {
                    id: shopkeeper.id
                }
            };

            jwt.sign(
                payload,
                "randomString", {
                    expiresIn: 10000
                },
                (err, token) => {
                    if (err) throw err;
                    res.status(200).json({
                        token
                    });
                }
            );
        } catch (err) {
            console.log(err.message);
            res.status(500).send("Error in Saving");
        }
    }
);



router.post(
    "/login",
    [
      check("mobile", "Please enter a valid email").isNumeric({ min : 10 }),
      check("password", "Please enter a valid password").isLength({
        min: 6
      })
    ],

    async (req, res) => {
        const errors = validationResult(req);
    
        if (!errors.isEmpty()) {
          return res.status(400).json({
            errors: errors.array()
          });
        }

        const { mobile, password } = req.body;
        try {
            let shopkeeper = await Shopkeeper.findOne({
                mobile
            });
            if (!shopkeeper)
                return res.status(400).json({
                message: "Shopkeeper Not Exist"
                });

            const isMatch = await bcrypt.compare(password, shopkeeper.password);
            if (!isMatch)
                return res.status(400).json({
                message: "Incorrect Password !"
                });
        
            const payload = {
                shopkeeper: {
                    id: shopkeeper.id
                }
            };

            jwt.sign(
                payload,
                "randomString",
                {
                  expiresIn: 3600
                },
                (err, token) => {
                  if (err) throw err;
                  res.status(200).json({
                    token
                  });
                }
              );
            } catch (e) {
              console.error(e);
              res.status(500).json({
                message: "Server Error"
              });
            }
          }
        );


const Product = require("../model/Product");

router.get('/list', async(req, res) => {
    try {
        const products = await Product.find()
        res.json({'Items': products})
    } catch (err) {
        res.status(500).json({ message: err.message})
    }
})

router.post("/list", async (req, res) => {
    const product = new Product({
        title: req.body.title,
        description : req.body.description,
        price: req.body.price
    })
    try {
        const newProduct = await product.save()
        res.status(201).json(newProduct)
    } catch(err) {
        res.status(400).json({ message: err.message})
    }
});

router.get("/me", authshopkeeper, async (req, res) => {
    try {
      // request.user is getting fetched from Middleware after token authentication
      const user = await Shopkeeper.findById(req.user.id);
      res.json(shopkeeper);
    } catch (e) {
      res.send({ message: "Error in Fetching user" });
    }
  });
        

module.exports = router;