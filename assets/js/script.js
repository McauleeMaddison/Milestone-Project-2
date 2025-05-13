// ========== CARD DATA ========== //
const cards = [
  {
    name: "Gibbons", image: "assets/images/cyberpack/Gibbons.png",
    stats: { speed: 7, style: 10, loyalty: 8 }, type: "Cyberpups"
  },
  {
    name: "FloatyBlue", image: "assets/images/cryptopack/Darla.png",
    stats: { speed: 9, style: 9, loyalty: 6 }, type: "Cryptopups"
  },
  {
    name: "Lucy", image: "assets/images/alienpack/Lucy.png",
    stats: { speed: 6, style: 8, loyalty: 10 }, type: "Alienpups"
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
