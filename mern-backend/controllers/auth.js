const User = require('../models/user');
const jwt = require('jsonwebtoken');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_APIKEY);

// exports.signup = (req, res) => {
//     // console.log(req.body);
//     const {name, email, password} = req.body;
//     User.findOne({email: email}).exec((err, user) => {
//         if(user) {
//             return res.status(400).json({
//                 error: 'Email is taken'
//             });
//         }

//     })
//     let newUser = new User({
//         name,
//         email,
//         password
//     });
//     newUser.save((err, success) => {
//         if(err){
//             console.log(err);
//             return res.status(400).json({
//                 error: err
//             })
//         }
//         res.json({
//             message: 'Signup success! Please sign in'
//         })
//     })
// };

exports.signup = (req,res) => {
    const {name, email, password} = req.body;
    User.findOne({email: email}).exec((err, user) => {
        if(user) {
            return res.status(400).json({
                error: 'Email is taken'
            });
        }
        const token = jwt.sign({name, email, password}, process.env.JWT_ACCOUNT_ACTIVATION, {expiresIn: '10m'})
        const emailData = {
            from: process.env.EMAIL_FROM,
            to: email,
            subject: `Account activation link`,
            html: `
                <h1>Please use the following link to activate your account</h1>
                <p>${process.env.CLIENT_URL}/auth/activate/${token}</p>
                <hr/>
                <p>This email may contain sensitive information</p>
                <p>${process.env.CLIENT_URL}</p>
            `
        }
        sgMail.send(emailData)
            .then(sent => {
                return res.json({
                    message: `Email has been sent to ${email}. Follow the instructions to activate your account`
                })
            })
            .catch(err => {
                return res.json({message: err.message});
            });
    });
}

exports.accountActivation = (req,res) => {
    const {token} = req.body;
    if(token) {
        jwt.verify(token, process.env.JWT_ACCOUNT_ACTIVATION, function(err, decoded) {
            if(err) {
                return res.status(401).json({
                    error: 'Expired link. Signup again'
                })
            }
            const  {name, email, password} = jwt.decode(token);
            const user = new User({
                name, email, password
            });
            user.save((err, user) => {
                if(err) {
                    return res.status(401).json({
                        error: 'Error saving user in database. Try signup again'
                    })
                }
                return res.json({
                    message: 'Signup success. Please sign in'
                })
            })
        })
    } else {
        return res.json({
            message: 'Something went wrong. Try again'
        })
    }
}
