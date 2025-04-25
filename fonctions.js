function getPlayers() {
    fetch('/players')
      .then(res => res.json())
      .then(players => {
        console.log('Liste des joueurs:', players);
        // Affiche dans le DOM si tu veux
      })
      .catch(err => console.error('Erreur GET:', err));
  }

  function getPlayersById(id) {
    return fetch('/players')
      .then(res => res.json())
      .then(players => {
        // Tu peux filtrer par id ou un autre champ (ex: name)
        const player = players.find(p => p.id === id || p.name === id);
        return player;
      })
      .catch(err => {
        console.error('Erreur GET by ID:', err);
        return null;
      });
  }

  
function addPlayer(player) {
fetch('/players', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(player)
})
    .then(res => res.json())
    .then(result => {
    console.log(result);
    })
    .catch(err => console.error('Erreur POST:', err));
}
  
// Exemple d’utilisation :
addPlayer({
rank: 2,
name: "Fanta",
avatar: "img/fanta.png",
points: 50
});

function updatePoints(name, newPoints) {
fetch(`/players/${name}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ points: newPoints })
})
    .then(res => res.json())
    .then(result => {
    console.log(result);
    })
    .catch(err => console.error('Erreur PUT:', err));
}

// Exemple d’utilisation :
updatePoints("Fanta", 75);
  