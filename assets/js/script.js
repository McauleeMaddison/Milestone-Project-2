function switchPage(pageId) {
  document.querySelectorAll('.page').forEach(page => {
    page.classList.remove('active');
  });
  document.getElementById(pageId).classList.add('active');
}

// ========== CARD DATA ==========
const cryptopups = [
  {
    name: "Darla",
    image: "assets/images/cryptopups/Darla.png",
    stats: { speed: 85, style: 90, loyalty: 95, rarity: "Epic" }
  },
  {
    name: "WoodyBlue",
    image: "assets/images/cryptopups/WoodyBlue.png",
    stats: { speed: 75, style: 88, loyalty: 92, rarity: "Rare" }
  }
];

const cyberpups = [
  {
    name: "Jinx",
    image: "assets/images/cyberpups/Jinx.png",
    stats: { speed: 80, style: 85, loyalty: 80, rarity: "Ultra Rare" }
  },
  {
    name: "Nukie",
    image: "assets/images/cyberpups/Nukie.png",
    stats: { speed: 78, style: 89, loyalty: 84, rarity: "Rare" }
  }
];

const alienpups = [
  {
    name: "Lucy",
    image: "assets/images/alienpups/Lucy.png",
    stats: { speed: 70, style: 95, loyalty: 90, rarity: "Legendary" }
  },
  {
    name: "AlienPup",
    image: "assets/images/alienpups/AlienPup.png",
    stats: { speed: 82, style: 91, loyalty: 86, rarity: "Epic" }
  }
];

const cards = [...cryptopups, ...cyberpups, ...alienpups];

// ========== RENDER CARDS ========== //
function renderCards(containerId, cardArray) {
  const container = document.getElementById(containerId);
  container.innerHTML = "";
  cardArray.forEach(card => {
    const cardDiv = document.createElement('div');
    cardDiv.className = 'collection-card';
    cardDiv.innerHTML = `
      <div class="card-inner">
        <div class="card-front">
          <img src="${card.image}" alt="${card.name}" />
        </div>
        <div class="card-back">
          <h4>${card.name}</h4>
          <ul>
            <li>Speed: ${card.stats.speed}</li>
            <li>Style: ${card.stats.style}</li>
            <li>Loyalty: ${card.stats.loyalty}</li>
            <li>Rarity: ${card.stats.rarity}</li>
          </ul>
        </div>
      </div>
    `;
    cardDiv.addEventListener('click', () => {
      cardDiv.classList.toggle('flipped');
    });
    container.appendChild(cardDiv);
  });
}

// ========== SIGN IN ========== //
function signIn() {
  const username = document.querySelector('input[type="text"]').value;
  document.querySelector('.sign-in-box').style.display = 'none';
  document.getElementById('userLevelBox').style.display = 'block';
  document.getElementById('usernameDisplay').textContent = `${username}'s Profile`;
}

// ========== FILTER CARDS ========== //
function filterCards() {
  const sortBy = document.getElementById('filter').value;
  if (sortBy === "all") {
    renderCards('cardContainer', cards);
    return;
  }

  const sorted = [...cards].sort((a, b) => {
    if (typeof a.stats[sortBy] === "number") {
      return b.stats[sortBy] - a.stats[sortBy];
    } else {
      return a.stats[sortBy].localeCompare(b.stats[sortBy]);
    }
  });

  renderCards('cardContainer', sorted);
}

// ========== OPEN PACK ========== //
function openPack(packName) {
  let cards = [];
  if (packName === "cryptopups") cards = cryptopups;
  if (packName === "cyberpups") cards = cyberpups;
  if (packName === "alienpups") cards = alienpups;

  const display = document.getElementById("packDisplay");
  display.innerHTML = "";

  cards.forEach((card, index) => {
    setTimeout(() => {
      const div = document.createElement("div");
      div.className = "card";
      div.innerHTML = `
        <div class="card-inner flipped">
          <div class="card-front">
            <img src="${card.image}" alt="${card.name}" />
          </div>
          <div class="card-back">
            <h4>${card.name}</h4>
            <ul>
              <li>Speed: ${card.stats.speed}</li>
              <li>Style: ${card.stats.style}</li>
              <li>Loyalty: ${card.stats.loyalty}</li>
              <li>Rarity: ${card.stats.rarity}</li>
            </ul>
          </div>
        </div>
      `;
      display.appendChild(div);

      const rect = div.getBoundingClientRect();
      const sparkleX = rect.left + rect.width / 2 + Math.random() * 100 - 50;
      const sparkleY = rect.top + rect.height / 2 + Math.random() * 60 - 30;
      createSparkle(sparkleX, sparkleY);
    }, index * 200);
  });
}

// ========== INITIALISE ========== //
document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById('cardContainer')) {
    renderCards('cardContainer', cards);
  }

  if (document.getElementById('collectionContainer')) {
    renderCards('collectionContainer', cards);
  }
});