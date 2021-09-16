//ce middleware ne'accepte pas les mots de passe de moins de 12 caractères//
module.exports = (req, res, next) =>{
    try {
        const password = req.body.password;
        if (password.length < 12) {
            throw 'Longueur incorrecte';
        } else {
            next();
        }
    } catch (err) {
        res.status(401).json({
            error: new Error('Invalid request!')
          });
    }
}; 