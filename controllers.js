const User = require('./models/user');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

// Nouveau profil
exports.signup = (req, res, next) => {
  console.log('arrivé dans controllers createUser');

  bcrypt.hash(req.body.password, 10)
  .then(hash => {
    const user = new User({
      email: req.body.email,
      password: hash,
      name: req.body.name,
      acceptTerms: req.body.acceptTerms
    })
    console.log("new user", user);

    user.save()
    .then(() => res.status(201).json({message: 'Utilisateur créé'}))
    .catch((error) => res.status(400).json({ error: `Impossible de créer l'utilisateur ${req.body.email}` }))

  })
  .catch((error) => res.status(500).json({ error }));
}
 //******************************************************** */
 // Login de l'utilisateur, récup de ses données :
exports.login = (req, res) => {
   console.log(`entré dans login ${req.body.email}`);
  User.findOne({ email: req.body.email })
    .then((user) => {
      console.log(`top1 :`, user);
      console.log(`user trouvé :${user.name}`);
      if (!user) // si pas de concordence dans MongoDb
      {
        console.log(`top2`, user);
        return res.status(400).json({ error: "Email non trouvé" });
      }           // on retourne l'erreur de connexion et on sort avec return
   console.log(`top3`);
      console.log(`user trouvé :${user.name}`);
      bcrypt
        .compare(req.body.password, user.password)
        .then((passwordValid) => {
          console.log(`top4`);
          if (!passwordValid) {
            return res
              .status(401)
              .json({ error: "Mot de passe incorrect !!!" });
          }
          const data = user;
          //var token = jwt.sign({ foo: 'bar' }, privateKey, { algorithm: 'RS256'});
          const token = jwt.sign(
            { userID: user._id }, 
            "chaineAleatoire", 
            {expiresIn: '1h'});
            
          res.status(200).json({ user, token: token });
          console.log(user);
        })
        .catch((error) => { 
          console.log(`top5`);
          res.status(500).json({ error: "impossible décrypter mot de passe" });
        }
         
        );
    })

    .catch((error) => res.status(500).json({ error })); // 500 erreur serveur, soit pas de connexion à MongoDB
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