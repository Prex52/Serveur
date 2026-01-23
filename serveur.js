const express = require("express");
const app = express();
app.use(express.json());

const SECRET = process.env.SECRET_KEY
const PORT = process.env.PORT || 3000

let pendingAction =  [];

app.post("/discord", (req, res) => {
  console.log("Clé reçue dans /discord :", req.body.key);

  if (req.body.key !== SECRET) {
    console.log("Tentative d'accès non autorisée à /discord");
    return res.sendStatus(403);
  }
  if (!req.body.action) {
    console.log("Aucune action fournie");
    return res.status(400).send("Aucune action fournie");
  }

  pendingAction.push(req.body.action);
  console.log("Action stockée :", pendingAction);
  res.sendStatus(200);
});

app.get("/roblox", (req, res) => {
  console.log("Clé reçue dans /roblox :", req.query.key);

  if (req.query.key !== SECRET) {
    console.log("Tentative d'accès non autorisée à /roblox");
    return res.sendStatus(403);
  }
  res.json({ action: pendingAction });
  pendingAction = [];
});

app.get("/", (req, res) => {
  res.send("API en ligne")
});

app.listen(PORT, () => console.log(`API running on port ${PORT}`));