// ========== CARD DATA ========== //
const cards = [
  {
    name: "Gibbons", image: "assets/images/cyberpack/Gibbons.png",
    stats: { speed: 7, style: 10, loyalty: 8 }, type: "Cyberpups"
  },
  {
    name: "Darla", image: "assets/images/cryptopack/Darla.png",
    stats: { speed: 9, style: 9, loyalty: 6 }, type: "Cryptopups"
  },
  {
    name: "Lucy", image: "assets/images/alienpack/Lucy.png",
    stats: { speed: 6, style: 8, loyalty: 10 }, type: "Alienpups"
  },
  {
    name: "Ace", image: "assets/images/cyberpack/Ace.png",
    stats: { speed: 15, style: 15, loyalty: 9 }, type: "Cyberpups"
  },
  {
    name: "Jasper", image: "assets/images/cryptopack/Jasper.png",
    stats: { speed: 4, style: 10, loyalty: 20 }, type: "Cryptopups"
  },
  {
    name: "Victor", image: "assets/images/alienpack/Victor.png",
    stats: { speed: 15, style: 12, loyalty: 7 }, type: "Alienpups"
  },
  {
    name: "Jinx", image: "assets/images/cyberpack/Jinx.png",
    stats: { speed: 20, style: 10, loyalty: 15 }, type: "Cyberpups"
  },
  {
    name: "WoodyBlue", image: "assets/images/cryptopack/WoodyBlue.png",
    stats: { speed: 8, style: 5, loyalty: 10 }, type: "Cryptopups"
  },
  {
    name: "Tima", image: "assets/images/alienpack/Tima.png",
    stats: { speed: 10, style: 20, loyalty: 15 }, type: "Alienpups"
  },
];

function switchPage(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

function openPack(type, containerId) {
  const area = document.getElementById(containerId);
  area.innerHTML = '';
  const filtered = cards.filter(card => card.type === type);
  filtered.forEach((card, i) => {
    const div = document.createElement('div');
    div.className = `card fan-${(i % 5) + 1}`;
    div.innerHTML = `<img src="${card.image}" alt="${card.name}"><p>${card.name}</p>`;
    area.appendChild(div);
  });
}

function playGame() {
  const player = cards[Math.floor(Math.random() * cards.length)];
  const computer = cards[Math.floor(Math.random() * cards.length)];
  const stat = ['speed', 'style', 'loyalty'][Math.floor(Math.random() * 3)];
  const result =
    player.stats[stat] > computer.stats[stat] ? 'You Win!' :
      player.stats[stat] < computer.stats[stat] ? 'You Lose!' :
        'Draw!';

  document.getElementById('playerCard').innerHTML = `
    <img src="${player.image}" alt="${player.name}">
    <p>${player.name}<br>${stat}: ${player.stats[stat]}</p>`;

  document.getElementById('computerCard').innerHTML = `
    <img src="${computer.image}" alt="${computer.name}">
    <p>${computer.name}<br>${stat}: ${computer.stats[stat]}</p>`;

  document.getElementById('gameResult').textContent = result;
}
function fakeLogin() {
  const status = document.getElementById('loginStatus');
  status.textContent = "Signing in...";
  status.style.color = "#00f2ff";
  setTimeout(() => {
    status.textContent = "Welcome back, Trainer!";
    status.style.color = "#ffcc00";
  }, 1000);
}