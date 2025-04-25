window.addEventListener('load',()=>{
  if(localStorage.getItem('username') !== null)
    window.location.href = "/html/home.html";
})

const form = document.getElementById('userForm');
const usernameInput = document.getElementById('username').value;
const genderInput = document.getElementById('gender').value;
class Player {
  constructor(rank, name, avatar, points) {
    this.rank = rank;
    this.name = name;
    this.avatar = avatar;
    this.points=points;
}
}
function addPlayer(player) {
    console.log('Affichage de player : ', player)
    localStorage.setItem('username',player.name)
    console.log('Affichage de localstorage : ',localStorage.getItem('username'))
    // Envoi au serveur
    fetch('/players', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(player)
    })
      .then(res => res.json())
      .then(result => {
        console.log('Réponse du serveur :', result);
      })
      .catch(err => console.error('Erreur POST:', err));
  }
  

function getPlayers() {
    return fetch('/players') 
      .then(res => res.json())
      .then(data => {
        console.log('Liste des joueurs:', data);
        return data.map(p => new Player(p.rank, p.name, p.avatar, p.points)); // ✅ transformation en instances
      })
      .catch(err => {
        console.error('Erreur GET:', err);
        return [];
      });
  }

   


function Rand(array) {
    return array[Math.floor(Math.random() * array.length)];
}


form.addEventListener("submit", async e => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const player = Object.fromEntries(formData.entries());
    const players = await getPlayers();
    player.name = player.name.replace(/\s+/g, '');
    player.rank = players.length + 1;
    player.points = 0;
    
    if (player.gender === 'M') {
        player.avatar = Rand(["../assets/SexeM/avatar1.png","../assets/SexeM/avatar2.png","../assets/SexeM/avatar3.png","../assets/SexeM/avatar4.png","../assets/SexeM/avatar5.png","../assets/SexeM/avatar6.png","../assets/SexeM/avatar7.png","../assets/SexeM/avatar8.png","../assets/SexeM/avatar9.png","../assets/SexeM/avatar10.png","../assets/SexeM/avatar11.png"]);
    } else {
        player.avatar = Rand(['../assets/sexeF/avatar12.png','../assets/sexeF/avatar13.png','../assets/sexeF/avatar14.png','../assets/sexeF/avatar15.png','../assets/sexeF/avatar16.png','../assets/sexeF/avatar17.png','../assets/sexeF/avatar18.png','../assets/sexeF/avatar19.png','../assets/sexeF/avatar20.png',,'../assets/sexeF/avatar21.png']);
    }

    
    fetch(`/players/${player.name}`)
    .then(res => {
      if (!res.ok) {
        addPlayer(player);
        window.location.href = "/html/home.html";
      }
      else{
        alert('Le nom d\'utilisateur ' + player.name + ' existe deja!')

      }
    })
});
