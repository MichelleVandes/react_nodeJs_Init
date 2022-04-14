const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser")
const userRoutes = require("./router.js");
const app = express();


mongoose
  .connect(
    "mongodb+srv://MichelleV:sKX07tjZNYGEiFsb9bu2@cluster0.u7oyk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));




  // Autorise l'appli à se connecter à l'api
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  
  next();
});


//*********************************************** */
// .all utilisé quelquesoit la méthode demandée (GET, POST, PUT, DELETE)

app.use(bodyParser.json());
app.all("/signup", userRoutes);
app.all("/login", userRoutes);
app.all("/user/:email", userRoutes);



// Message d'erreur si aucun middleware n'a été enclanché précédement
app.use((req, res) => {
  console.log(req.url, req.body)
  res.status(404);
  res.json({
    error: "oups,Page not found",
  });
});


module.exports = app;