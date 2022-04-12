const User = require('./models/user')
const bcrypt = require('bcrypt')

// Nouveau profil

// exports.signup = (req, res, next) => {
//   console.log("arrivé dans controllers createUser");
//     bcrypt
//       .hash(req.body.password, 10)
//       .then((hash) => {
//         const user = new User({
//           email: req.body.email,
//           password: hash,
//           name: req.body.name,
//           acceptTerms: req.body.acceptTerms
//         });
// console.log(user);

//         user
//           .save()
//           .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
//           .catch((error) => res.status(400).json({ error }));
//       })
//       .catch((error) => res.status(500).json({ error }));

// };

exports.signup = (req, res, next) => {
  console.log('arrivé dans controllers createUser');
 
const fs = require("fs");



  delete req.body._id;
  delete req.body.confirmPassword;
   console.log(req.body);

  const user = new User({
    ...req.body,
  });
  user
    .save()
    .then(() => res.status(201).json({ message: "Utilisateur enregistré" }))
    .catch((error) => res.status(999).json({ error }));
  
}
exports.login = (req, res) => {
  //http://localhost:8080/user/test@mail

  // Récupérer un User

  User.findOne({ email: req.params.email }).then((user) => {
    console.log(`entré dans findOne`);

    if (!user) {
      console.log(`email non  trouvé : ${req.params.email}`);
      return res.status(401).json({ error: "Utilisateur non trouvé !" });
    }
    // Pas besoin de else comme on a renvoyé l'erreur de connexion
  });
};









// fonctionne sur paramètre dans l'adresse ip
exports.oneUser = (req, res) => {
  //http://localhost:8080/user/test@mail
  
// Récupérer un User

  User.findOne({ email: req.params.email })
      .then((user) => { console.log(`entré dans findOne`)
   
     if (!user) {
           console.log(`email non  trouvé : ${req.params.email}`);
        return res.status(401).json({ error: "Utilisateur non trouvé !" });
    
      } 
      // Pas besoin de else comme on a renvoyé l'erreur de connexion
      
  });
}