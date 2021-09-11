const multer = require ('multer');

/*ce middleware permet d'enregistrer les images des utilisateurs dans le fichier 'images', 
oblige à utiliser le nom d'origine en ajoutant une timestamp au nom du fichier, et résoud l'extenson du fichier, uniquement pour les fichiers image*/
const MIME_TYPES = {
    'image/jpg' : 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};

const storage = multer.diskStorage ({
    destination: (req, file, callback) =>{
        callback(null, 'images')
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_')
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + Date.now() + '.' + extension);
    }
});

module.exports = multer({storage}).single('image');