const multer = require('multer');

//Ajoute d'une extention en fonction du type mime du ficher
const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};

//Création du nom de l'image pour le stocage sur le serveur
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'images');
    },
    filename: (req, file, callback) => {
        /*const name = file.originalname.split(' ').join('_');*/
        const extension = MIME_TYPES[file.mimetype];
        callback(null, /*name + */Date.now() + '.' + extension);
    }
});

//Filtre pour n'accepter que les fichiers image
const fileFilter =(req, file, callback) =>{
    if(!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG)$/)) {
        return callback(new Error('Vous devez choisir un fichier image !'), false);
    }
    callback(null, true);
};

module.exports = multer({storage: storage}).single('image');
