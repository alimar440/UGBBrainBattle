const all_questions = [
    {
    "question": "Quelle UFR surnomme-t-on chine populaire ?",
    "choices": {
        "1": "SAT",
        "2": "LSH",
        "3": "SJP",
        "4": "SEFS"
    },
    "answer": "3"
    },
    {
    "question": "Où se trouve mère zéro déchet ?",
    "choices": {
        "1": "au CROUS",
        "2": "restaurant n⁰2",
        "3": "restaurant n⁰1",
        "4": "Dans les UFRS"
    },
    "answer": "3"
    },
    {
    "question": "Le mot préféré de l'animateur du campus est : ?",
    "choices": {
        "1": "UGB",
        "2": "incroyablement",
        "3": "shoooow",
        "4": "fondamentalement"
    },
    "answer": "4"
    },
    {
    "question": "Y'a combien de villages à l'UGB ?",
    "choices": {
        "1": "10",
        "2": "08",
        "3": "17",
        "4": "16"
    },
    "answer": "3"
    },
    {
    "question": "En quelle année a eu lieu la pose de la 1ère pierre de l'université Gaston Berger ?",
    "choices": {
        "1": "1990",
        "2": "1985",
        "3": "1975",
        "4": "1973"
    },
    "answer": "3"
    },
    {
    "question": "En quelle année a été créée l'université Gaston Berger ?",
    "choices": {
        "1": "2004",
        "2": "1980",
        "3": "1975",
        "4": "1990"
    },
    "answer": "4"
    },
    {
    "question": "Quelle est la superficie de l'UGB ?",
    "choices": {
        "1": "240ha",
        "2": "100ha",
        "3": "375ha",
        "4": "217ha"
    },
    "answer": "1"
    },
    {
    "question": "Comment s'appelle le 1er recteur de l'UGB ?",
    "choices": {
        "1": "maguette ndiaye",
        "2": "Amadou lamine ndiaye",
        "3": "Diarietou T Sadio",
        "4": "Moustapha Sarr"
    },
    "answer": "2"
    },
    {
    "question": "Comment s'appelle l'actuelle recteur de l'UGB ?",
    "choices": {
        "1": "Amina Diaw",
        "2": "Maguatte ndiaye",
        "3": "Bernard syna",
        "4": "Moussa Cissé"
    },
    "answer": "2"
    },
    {
    "question": "Où se trouve l'UGB ?",
    "choices": {
        "1": "SANAR",
        "2": "BOUDJOUCK",
        "3": "NGUALENE",
        "4": "SOR"
    },
    "answer": "1"
    },
    {
      "question": "Quelle organisation représente les étudiants au sein de l'université ?",
      "choices": {
        "1": "cesl",
        "2": "ucad",
        "3": "crous",
        "4": "cetugb"
      },
      "answer": "1"
    },
    {
      "question": "Comment appelle-t-on la grande place centrale où les étudiants se rassemblent souvent ?",
      "choices": {
        "1": "La Cour d'honneur",
        "2": "Le Forum",
        "3": "Le Rond-point",
        "4": "La Place du savoir"
      },
      "answer": "2"
    },
    {
      "question": "Quel service s’occupe de la restauration et du logement à l’UGB ?",
      "choices": {
        "1": "CROUS",
        "2": "COUD",
        "3": "CDEPS",
        "4": "CNOU"
      },
      "answer": "1"
    },
    {
      "question": "Combien coûte un ticket vert ?",
      "choices": {
        "1": "200f",
        "2": "100f",
        "3": "50f",
        "4": "150f"
      },
      "answer": "2"
    },
    {
      "question": "Quelle a été la 1ère UFR créée à l'UGB ?",
      "choices": {
        "1": "seg",
        "2": "crac",
        "3": "sat",
        "4": "sjp"
      },
      "answer": "1"
    },
    {
      "question": "Qui nomme le recteur ?",
      "choices": {
        "1": "les étudiants",
        "2": "le président",
        "3": "ministre de l'enseignement supérieur",
        "4": "crous"
      },
      "answer": "2"
    },
    {
      "question": "Quel Président Sénégalais a officiellement inauguré l'UGB ?",
      "choices": {
        "1": "L.S.Senghor",
        "2": "Abdou Diouf",
        "3": "Abdoulaye Wade",
        "4": "Macky Sall"
      },
      "answer": "2"
    },
    {
      "question": "Qui fut le fondateur et le 1er directeur de SAT ?",
      "choices": {
        "1": "David Faye",
        "2": "M.Teuw Niane",
        "3": "Galaye Dia",
        "4": "Mouhamadou Gaye"
      },
      "answer": "3"
    },
    {
      "question": "Comment surnomme t'on la 1er promo de l'UGB ?",
      "choices": {
        "1": "Les Super Ances",
        "2": "the first",
        "3": "les dinosaures",
        "4": "taawou UGB"
      },
      "answer": "3"
    }
]


const game_questions = shuffleArray(all_questions).slice(0,10)
function shuffleArray(array) {
    let temparr = array
    for (let i = temparr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [temparr[i], temparr[j]] = [temparr[j], temparr[i]];
    }
    return temparr;
}
//Game variables
let remaining_t = document.getElementById("remaining_t")
let score_count = document.getElementById("score_count")
let plain_score = document.getElementById("plain_score")
let question = document.getElementById("question")
let res_contents = document.querySelectorAll(".res_content")
let solutions = document.querySelectorAll(".solution")
let sol_contents = document.querySelectorAll(".sol_content")
let choices = document.querySelectorAll(".choice")
let btn = document.getElementById("btn")
let bonne = document.getElementById("bonne")
let mauvaise = document.getElementById("mauvaise")

let seriesCount = 0;
const totalSeries = 10;
let founded_questions = 0
let shouldGoPause = false
let selected_value = ''
let choice_state = false

function startSeries() {
  console.log(game_questions)
  document.querySelectorAll(".responses")[0].style.display = "flex"
  document.querySelectorAll(".solutions")[0].style.display = "none"
  if (seriesCount >= totalSeries) {
    document.getElementById("final_points").innerHTML = `${founded_questions*10} points`
    document.getElementById("game").style.display = "none"
    document.getElementById("resultat").style.display = "flex"

    return;
  }
  question.innerHTML = game_questions[seriesCount].question


  res_contents.forEach((response,i)=>{
    response.innerHTML = game_questions[seriesCount].choices[`${i+1}`]
    sol_contents[i].innerHTML = game_questions[seriesCount].choices[`${i+1}`]
  })


  score_count.innerHTML = `${seriesCount + 1}`
  let seconds = 9;

  const interval = setInterval(() => {
    remaining_t.innerHTML =`${seconds}s`
    seconds--
    if (seconds < 0 || shouldGoPause) {
        if(selected_value === game_questions[seriesCount].answer){
          choice_state = true
        }

      clearInterval(interval);
      startPause()
    }
  }, 1000);
}
function startPause() {
    remaining_t.innerHTML =`10s`
    document.querySelectorAll(".responses")[0].style.display = "none"
    document.querySelectorAll(".solutions")[0].style.display = "flex"
    if(choice_state){
        founded_questions++
        plain_score.style.width = `${founded_questions*10}%`
        plain_score.innerHTML = `${founded_questions}`
        plain_score.style.paddingRight = '5px'
        bonne.style.bottom = "25px"
        bonne.style.opacity = "1";
    }
    else{
        mauvaise.style.bottom = "25px"
        mauvaise.style.opacity = "1";
    }
    solutions.forEach((solution,i) =>{
        if(choices[i].value === game_questions[seriesCount].answer)
            solution.style.backgroundColor = '#12D18E'
        else
            solution.style.backgroundColor = '#F75455'

    })
    let pauseTime = 3;
    btn.style.display = "none"
    shouldGoPause = false
    choices.forEach(radio => radio.checked = false);
    seriesCount++;
    const pauseInterval = setInterval(() => {
      pauseTime--
      if (pauseTime < 0) {
        clearInterval(pauseInterval);
        choice_state = false
        document.querySelectorAll(".popup").forEach(popup => {
            popup.style.bottom = "-25px"
            popup.style.opacity = "0";
        } )
        startSeries(); 
      }
    }, 1000);
  }
startSeries();

btn.addEventListener("click",()=>{
    if(selected_value === game_questions[seriesCount].answer){
        choice_state = true
    }
    else
        choice_state = false
    shouldGoPause = true
})

choices.forEach(choice =>{
    choice.addEventListener("click",()=>{
        btn.style.display = "flex"
        selected_value = choice.value
    })
})
document.querySelectorAll('.response').forEach((rep,index) => {
  rep.addEventListener('click',()=>{
    btn.style.display = "flex"
    selected_value = choices[index].value
  })
})

document.getElementById('voir_classement').addEventListener('click',async ()=>{
    await updatePointsAndRanks(localStorage.getItem('username'),founded_questions*10)
      window.location.href = "ranking.html";
})
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
async function updatePointsAndRanks(name, newPoints) {
    try {
      // 1. Récupérer tous les joueurs
      const players = await getPlayers();
      console.log(players)
      // 2. Mettre à jour les points du joueur ciblé
      const updatedPlayers = players.map(p => {
        if (p.name === name) {
          p.points = newPoints;
        }
        return p;
      });
  
      // 3. Trier les joueurs par points
      updatedPlayers.sort((a, b) => b.points - a.points);
  
      // 4. Recalculer les rangs
      updatedPlayers.forEach((p, i) => {
        p.rank = i + 1;
      });
  
      // 5. Envoyer la liste entière mise à jour
      const res = await fetch('/players', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedPlayers)
      });
  
      const result = await res.json();
      console.log('Mise à jour réussie :', result);
  
    } catch (err) {
      console.error('Erreur updatePointsAndRanks:', err);
    }
  }
  