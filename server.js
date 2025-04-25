const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

const dataFile = path.join(__dirname, 'data.json');

app.use(express.json());
app.use(express.static('public'));

// Lire tous les joueurs
app.get('/players', (req, res) => {
  fs.readFile(dataFile, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Erreur de lecture' });
    res.json(JSON.parse(data));
  });
});

// Créer un nouveau joueur
app.post('/players', (req, res) => {
  const newPlayer = req.body; // doit contenir rank, name, avatar, points

  fs.readFile(dataFile, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Erreur de lecture' });

    let players = [];
    try {
      players = JSON.parse(data);
    } catch {
      return res.status(500).json({ error: 'Fichier JSON invalide' });
    }

    const exists = players.find(p => p.name === newPlayer.name);
    if (exists) {
      return res.status(400).json({ error: 'Nom déjà utilisé' });
    }

    players.push(newPlayer);

    fs.writeFile(dataFile, JSON.stringify(players, null, 2), err => {
      if (err) return res.status(500).json({ error: 'Erreur d\'écriture' });
      res.json({ message: 'Joueur ajouté avec succès' });
    });
  });
});

// Modifier les points d’un joueur
app.put('/players/:name', (req, res) => {
  const { name } = req.params;
  const { points } = req.body;

  fs.readFile(dataFile, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Erreur de lecture' });

    let players = [];
    try {
      players = JSON.parse(data);
    } catch {
      return res.status(500).json({ error: 'Fichier JSON invalide' });
    }

    const player = players.find(p => p.name === name);
    if (!player) return res.status(404).json({ error: 'Joueur introuvable' });

    player.points = points;

    fs.writeFile(dataFile, JSON.stringify(players, null, 2), err => {
      if (err) return res.status(500).json({ error: 'Erreur d\'écriture' });
      res.json({ message: 'Points mis à jour' });
    });
  });
});

// Chercher un joueur par nom
app.get('/players/:name', (req, res) => {
  const { name } = req.params;

  fs.readFile(dataFile, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Erreur de lecture' });

    let players;
    try {
      players = JSON.parse(data);
    } catch {
      return res.status(500).json({ error: 'Fichier JSON invalide' });
    }

    const player = players.find(p => p.name.toLowerCase() === name.toLowerCase());
    if (!player) return res.status(404).json({ error: 'Joueur non trouvé' });

    res.json(player);
  });
});
app.put('/players', (req, res) => {
  const updatedPlayers = req.body;

  if (!Array.isArray(updatedPlayers)) {
    return res.status(400).json({ message: 'Les données doivent être un tableau.' });
  }

  fs.writeFile(dataFile, JSON.stringify(updatedPlayers, null, 2), (err) => {
    if (err) {
      console.error('Erreur lors de l\'écriture:', err);
      return res.status(500).json({ message: 'Erreur serveur.' });
    }
    res.json({ message: 'Fichier mis à jour avec succès !' });
  });
});


app.listen(PORT, () => {
  console.log(`Serveur en écoute sur http://localhost:${PORT}`);
});
