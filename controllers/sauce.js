const Sauce = require ('../models/sauce');
const fs = require('fs');


//création d'une instance du modèle 'Sauce' en passant un objet JS contenant les informations requises du corps de la requête. La methode save() enregistre la sauce dans la bdd//
exports.createSauce = (req, res, next) => {
	const sauceObject = JSON.parse(req.body.sauce);
	delete sauceObject._id;
	const sauce = new Sauce({
		...sauceObject,
		usersDisliked: [],
		usersLiked: [],
		dislikes: 0,
		likes: 0,
		imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
	});
	sauce.save()
	.then(() => res.status(201).json({message: 'Objet enregistré'}))
	.catch(error => res.status(400).json({error}));
};

//possibilité de liker ou disliker une sauce, ajout like ou dislike dans la bdd et ajout ou suppression de l'id utilisateur dans un tableau de la bdd//
exports.likeSauce = (req, res, next) => {
	const userId = req.body.userId;
	const like = req.body.like;
	console.log(req.body.like);
	Sauce.findOne({ _id: req.params.id})
	.then(sauce => { 
		if(like == 1){
			Sauce.updateOne({ _id: req.params.id }, {$push: {usersLiked: userId}, $inc: {likes: +1}})
			.then(() => res.status(200).json({message: 'Objet liké'}))
			.catch(error => res.status(400).json({error}));
		}else if (like == 0){
			if (sauce.usersLiked.includes(userId)){
				Sauce.updateOne({ _id: req.params.id }, {$pull: {usersLiked: userId}, $inc: {likes: -1}})
				.then(() => res.status(200).json({message: 'Objet non liké'}))
				.catch(error => res.status(400).json({error}));
				}else{
					Sauce.updateOne({ _id: req.params.id }, {$pull: {usersDisliked: userId}, $inc: {dislikes: -1}})
					.then(() => res.status(200).json({message: 'Objet non liké'}))
					.catch(error => res.status(400).json({error}));
			}
		}else if (like == -1){
			Sauce.updateOne({ _id: req.params.id }, {$push: {usersDisliked: userId}, $inc: {dislikes: +1}})
			.then(() => res.status(200).json({message: 'Objet disliké'}))
			.catch(error => res.status(400).json({error}));
		}
	});
};

// avec la methode updateOne(), nous pouvons mettre à jour une 'Sauce'//
exports.modifySauce = (req, res, next) => {
	const sauceObject = req.file ?
	{
		...JSON.parse(req.body.sauce),
		imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
	} : {...req.body};
	Sauce.updateOne({ _id: req.params.id}, {...sauceObject, _id: req.params.id})
	.then(() => res.status(200).json({ message: 'Objet modifié'}))
	.catch(error => res.status(403).json({message: 'unauthorized request'}));
};

// avec la methode deleteOne(), nous pouvons supprimer une 'Sauce'//
exports.deleteSauce = (req, res, next) => {
	Sauce.findOne({ _id: req.params.id })
	.then(sauce => {
		const filename = sauce.imageUrl.split('/images/') [1];
		fs.unlink(`images/${filename}`, () => {
			Sauce.deleteOne({ _id: req.params.id})
			.then(() => res.status(200).json({message: 'Objet supprimé'}))
			.catch(error => res.status(400).json({error}));
		});
	})
	.catch(error => res.status(500).json({error}));
};


//utilisation de la méthode find() qui va renvoyer la 'Sauce' ayant le même -id que le paramètre de la requete//
exports.getOneSauce = (req, res, next) => {
	Sauce.findOne({ _id: req.params.id})
	.then(sauce => res.status(200).json(sauce))
	.catch(error => res.status(404).json({error}));
};

//utilisation de la méthode find() qui va renvoyer un tableau contenant toutes les 'Sauce' de la bdd//
exports.getAllSauce = (req, res, next) => {
	Sauce.find()
	.then(sauces => res.status(200).json(sauces))
	.catch(error => res.status(400).json({error}));
};