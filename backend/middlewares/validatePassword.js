const passwordValidate = require('password-validator');

const passwordSchema = new passwordValidate();

passwordSchema
    .is().min(8)                                    
    .is().max(64)                                  
    .has().uppercase()                              
    .has().lowercase()                             
    .has().digits(2)                                
    .has().not().spaces()                    

module.exports = (req, res, next) => {
    if (!passwordSchema.validate(req.body.password)) {
        res.status(400).json({ password: "Il doit contenir 8 caractères, 1 majuscule, 2 chiffres et sans espace" });
    } else {
        next();
    }
};