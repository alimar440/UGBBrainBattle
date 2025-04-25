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
      // Tu peux filtrer par id ou un autre champ (ex: name)
      const player = players.find(p =>  p.name === id);
      return player;
    })
    .catch(err => {
      console.error('Erreur GET by ID:', err);
      return null;
    });
}


function getPlayers() {
  return fetch('/players') // ✅ on retourne la promesse ici
    .then(res => res.json())
    .then(data => {
      console.log('Liste des joueurs:', data);
      return data.map(p => new Player(p.rank, p.name, p.avatar, p.points)); // ✅ transformation en instances
    })
    .catch(err => {
      console.error('Erreur GET:', err);
      return []; // on retourne un tableau vide si erreur
    });
}

document.addEventListener("DOMContentLoaded", async () => {
  document.getElementById("welcome-name").innerHTML = localStorage.getItem('username')
  const voirPlus = document.getElementById("plus");
  const board = document.getElementById("board");
  const players = await getPlayers();
  let max = 3 > players.length ? players.length : 3  ;

  console.log('Joueurs : ', players)
  players.sort((a, b) => b.points - a.points);

  for (let i = 0; i < max; i++) {
    const playerElement = players[i].createElement();
    board.insertBefore(playerElement, voirPlus);
  }

  voirPlus.addEventListener("click", () => {
    window.location.href = "ranking.html";
  });
});
function redirectGame(){
  window.location.href = "game.html";
}