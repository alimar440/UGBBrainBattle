class PlayerService {
    constructor() {
      this.players = [];
      this.storageKey = "players";
      this.avatarPath = "../assets/logo.jpg";
      this.loadPlayers();
    }
  
    loadPlayers() {
      try {
        const storedPlayers = localStorage.getItem(this.storageKey);
        this.players = storedPlayers ? JSON.parse(storedPlayers) : [];
      } catch (error) {
        console.error("Error loading players:", error);
        this.players = [];
      }
    }
  
    savePlayers() {
      try {
        localStorage.setItem(this.storageKey, JSON.stringify(this.players));
        return true;
      } catch (error) {
        console.error("Error saving players:", error);
        return false;
      }
    }
  
    playerExists(username) {
      return this.players.some(
        player => player.name.toLowerCase() === username.toLowerCase()
      );
    }
  
    addPlayer(username, gender) {
      if (this.playerExists(username)) {
        throw new Error(`Le joueur ${username} existe déjà`);
      }
  
      const newPlayer = {
        rank: this.players.length + 1,
        name: username,
        avatar: this.avatarPath,
        points: 0,
        gender: gender
      };
  
      this.players.push(newPlayer);
      const success = this.savePlayers();
      
      if (!success) {
        this.players.pop(); // Rollback if save fails
        throw new Error("Erreur lors de l'enregistrement du joueur");
      }
  
      return newPlayer;
    }
  
    getPlayers() {
      return [...this.players]; // Return copy
    }
  
    clearPlayers() {
      this.players = [];
      this.savePlayers();
    }
  }
  
  // Singleton instance
  const playerService = new PlayerService();
  export default playerService;import playerService from './FileJsonService.js';

  document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById('userForm');
    const usernameInput = document.getElementById('username');
    const genderInput = document.getElementById('gender');
  
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
  
      const username = usernameInput.value.trim();
      const gender = genderInput.value;
  
      if (!username || !gender) {
        alert('Veuillez remplir tous les champs.');
        return;
      }
  
      try {
        const newPlayer = playerService.addPlayer(username, gender);
        alert(`Bienvenue ${newPlayer.name} (${newPlayer.gender}) !`);
        
        // Reset form
        form.reset();
        console.log("Player added:", newPlayer);
        // Optional: Redirect to game page
        window.location.href = '../html/home.html';
        
      } catch (error) {
        alert(error.message);
        console.error("Registration error:", error);
      }
    });
  });