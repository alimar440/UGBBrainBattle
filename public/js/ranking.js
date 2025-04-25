class Player {
  constructor(rank, name, avatar, points) {
    this.rank = rank;
    this.name = name;
    this.avatar = avatar;
    this.points = points;
  }

  createElement() {
    const div = document.createElement("div");
    div.className = "player";
    div.innerHTML = `
      <span class="rank">${this.rank}</span>
      <img src="${this.avatar}" class="avatar" />
      <span class="name">${this.name}</span>
      <span class="points">${this.points} Points</span>
    `;
    return div;
  }
}

function getPlayersById(id) {
  return fetch('/players')
    .then(res => res.json())
    .then(players => {
      
      const player = players.find(p =>  p.name === id);
      return player;
    })
    .catch(err => {
      console.error('Erreur GET by ID:', err);
      return null;
    });
}

// function getPlayerLocalStorage() {
  // Récupérer les données du joueur depuis le localStorage
//   const storedPlayer = localStorage.getItem('player');

  // Vérifier si des données ont été trouvées
//   if (storedPlayer) {
    // Convertir la chaîne JSON en objet JavaScript
//     const player = JSON.parse(storedPlayer);

    // Supprimer l'entrée du localStorage
//     localStorage.removeItem('player');

    // Retourner l'objet joueur
//     return player;
//   } else {
    // Aucun joueur trouvé dans le localStorage
//     return null;
//   }
// }



function getPlayers() {
  return fetch('/players')
    .then(res => res.json())
    .then(data => {
      console.log('Liste des joueurs:', data);
      return data.map(p => new Player(p.rank, p.name, p.avatar, p.points)); 
    })
    .catch(err => {
      console.error('Erreur GET:', err);
      return [];
    });
}

document.addEventListener("DOMContentLoaded", async () => {
  const board = document.getElementById("board");
  const players = await getPlayers();

  players.sort((a, b) => b.points - a.points).forEach(player => {
    board.appendChild(player.createElement());
  });

  const playerName =  localStorage.getItem('username');
  const playerMe = await getPlayersById(playerName);

  if (playerMe) {
    const totalPlayers = players.length;
    const percent = Math.floor(((totalPlayers - playerMe.rank) / totalPlayers) * 100);

    document.getElementById("info-rank").textContent = `#${playerMe.rank}`;
    document.getElementById("info-text").textContent =
      `Tu fais mieux que ${percent}% des autres joueurs, @${localStorage.getItem('username')}`;

    if (playerMe.rank === 1 || playerMe.rank === 2 || playerMe.rank === 3) {
      document.getElementById("info-text").textContent = `Tu es dans le top 3, @${localStorage.getItem('username')}`;
      document.getElementById("info-text").style.fontWeight = "bold";
    }
  } else {
    console.error("Joueur 'Fatou' non trouvé.");
  }
});

