const Post = require('../models/post'); 
const jwt = require('jsonwebtoken');
const fs = require('fs');

require('dotenv').config();

function chekToken(req) {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
    console.log(decodedToken);
    return {
        admin: decodedToken.admin,
        userId: decodedToken.userId,
        nom: decodedToken.nom,
        prenom: decodedToken.prenom,
    } 
}

exports.createPost = (req, res) => { 
    // console.log(req);
    let check = chekToken(req);
    const postObject = req.file ?
	{
		message: req.body.message,	
		picture: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`	
	} : {message: req.body.message};
	const post = new Post({
		...postObject,
		userId: check.userId,
        nom: check.nom,
        prenom: check.prenom

	});	
    console.log(post);
    post.save()
        .then(() => res.status(201).json({ message: 'Publication enregistrée !'}))
        .catch(error => { res.status(400).json({ error: "Certains champs requis ne sont pas remplies" })});
};

exports.getAllPosts = (req, res) => {
    Post.find()
        .then(posts => res.status(200).json(posts))
        .catch(error => res.status(404).json({ error: "Aucune publication trouvé" }));
};

// exports.modifyPost = (req, res) => {
//     let check = chekToken(req);
//     console.log(req);
//     console.log(req.file);
//     if (req.file.filename) {
//         // si l'image est modifiée, il faut supprimer l'ancienne image dans le dossier /image
//         Post.findOne({ _id: req.params.id })
//             .then((post) => {
//                 if (check.userId === post.userId || check.admin === true) {
//                     console.log('authorisation pour modifié le post');
//                     const filename = post.picture[0].split('/images/')[1];
//                     fs.unlink(`images/${filename}`, () => {
//                         const postObject = {
//                             ...req.body,
//                             picture: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
//                         }
//                         console.log(postObject);
//                         Post.updateOne({ _id: req.params.id }, { ...postObject, _id: req.params.id })
//                         .then(() => res.status(200).json({ message: 'Publication modifié'}))
//                         .catch(error => res.status(400).json({ error }));
//                     })

//                 } else {
//                     console.log('userId different du post');
//                     return res.status(401).json({ message: "Vous n'etes pas authorisé a modifier le post" });
//                 }
//             })
//             .catch(error => res.status(403).json({ error }));
//     } else {
//     // si l'image n'est pas modifiée
//     const postObject = { ...req.body };
//     Post.updateOne({ _id: req.params.id }, { ...postObject, _id: req.params.id })
//         .then(() => res.status(200).json({ message: 'Publication modifié' }))
//         .catch(error => res.status(400).json({ error }));
//     }   

// };

exports.modifyPost = (req, res) =>
{
	let check = chekToken(req);
	const postObject = req.file ?
	{
		message: req.body.message,	
		picture: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`	
	} : {message: req.body.message};
	Post.findOne({_id : req.params.id})
	.then((post) =>
	{	
		if (check.userId === post.userId || check.admin === true) {
			console.log('authorisation pour modifié le post');
			if(req.file && (post.picture && post.picture !== ""))
			{
				const filename = post.picture.split("/images/")[1];
				fs.unlink(`images/${filename}`, function(error){
					if(error){console.log(`ligne 50 : ${error}`)}
						else {console.log("Old file delete")};
				})
			} else {
				if(postObject.picture === "" && (post.picture && post.picture !== ""))
				{
					const filename = post.picture.split("/images/")[1];
					fs.unlink(`images/${filename}`, function(error){
					if(error){console.log(error)}
						else {console.log("Old file delete")};
					})
				}
			}
			Post.updateOne({_id : req.params.id}, {...postObject, _id : req.params.id})
			.then(function(){
				res.status(200).json({message : "Post updated successfully"});
			})
			.catch(function(error){
				res.status(400).json({error});
			});
		} else {
			console.log('userId different du post');
			return res.status(401).json({ message: "Vous n'etes pas authorisé a modifier le post", id: req.params.id });
		}
	});
};

exports.deletePost = (req, res) => {
    let check = chekToken(req);
    Post.findOne({ _id: req.params.id })
        .then((post) => {
            if (check.userId === post.userId || check.admin === true) {
                console.log('authorisation pour supprimé le post');
                if(!post.picture || post.picture === "") {
						Post.deleteOne({_id : req.params.id})
						.then(() => {
							res.status(200).json({message : "Deleted"});
						})
						.catch((error) => {
							res.status(400).json({error : error});
						});
					} else {
						const filename = post.picture.split("/images/")[1];
						fs.unlink(`images/${filename}`,() => {
							Post.deleteOne({_id : req.params.id})
							.then(() => {
								res.status(200).json({message : "Deleted"});
							})
							.catch((error) => {
								res.status(400).json({error : error});
							});
						});
					};
            } else {
                console.log('userId different du post');
                return res.status(401).json({ message: "Vous n'etes pas authorisé a supprimer le post", id: req.params.id });
            }
        })
        .catch(error => res.status(403).json({ error }));
};

exports.likePost = (req, res, next) => {
    let check = chekToken(req);
  
    Post.findOne({ _id: req.params.id })
      .then((post) => {
        if (post.usersLiked.includes(check.userId)) {
          Post.updateOne(
            { _id: req.params.id },
            { $pull: { usersLiked: check.userId } }
          )
            // retirer l'userId dans l'Array usersLiked
            .then(() => res.status(200).json({ message: "Post unliked !", "nbLike" : post.usersLiked.length - 1 }))
            .catch((error) => res.status(401).json({ error }));
        } else {
          Post.updateOne(
            { _id: req.params.id },
            { $push: { usersLiked: check.userId } }
          )
            // push l'userId dans l'Array usersLiked
            .then(() => res.status(200).json({ message: "Post liked !", "nbLike" : post.usersLiked.length + 1 }))
            .catch((error) => res.status(401).json({ error }));
        }
      })
      .catch((error) => res.status(401).json({ error }));
  };

// exports.likePost = (req, res) => {
//     let check = chekToken(req);
//     const like = req.body.like;

//     console.log("=> like ---------------");
//     console.log(like);

//     Post.findOne({ _id: req.params.id })
//         .then((post) => {
//             switch (like) {
//                 case 1 :
//                     if (!post.usersLiked.includes(check.userId)) {
//                         Post.updateOne({ _id: req.params.id },
//                             {   $inc: { likes: 1 },
//                                 $push: { usersLiked: check.userId }})
//                             .then(() => res.status(201).json({ message: 1}))
//                             .catch((error) => res.status(404).json({ message: "error" }));
//                     } break;

//                 case 0 :
//                     if (post.usersLiked.includes(check.userId)) {
//                         Post.updateOne({ _id: req.params.id },
//                             {   $inc: { likes: -1 },
//                                 $pull: { usersLiked: check.userId }})
//                             .then(() => res.status(201).json({ message: 0}))
//                             .catch((error) => res.status(404).json({ message: "error" }));
//                     } break;
                
//                 default:
                        
//                     break;    
//             }
//         })
//         .catch((error) => res.status(404).json({ error }));
// };