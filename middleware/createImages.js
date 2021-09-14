const fs = require('fs');

//ce middleware créé le dossier images si celui-ci n'existe pas//
module.exports = (req, res, next) =>{
    try {
        const dir = './images';
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
            console.log("Directory is created.");
            next();
        } else {
            next();
        }
    } catch (err) {
        res.status(401).json({
            error: new Error('Invalid request!')
          });
    }
}; 