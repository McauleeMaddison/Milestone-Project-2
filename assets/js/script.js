// ========== PAGE SWITCHING ========== //
function switchPage(pageId) {
  document.querySelectorAll('.page').forEach(page => {
    page.classList.remove('active');
  });
  const targetPage = document.getElementById(pageId);
  if (targetPage) {
    targetPage.classList.add('active');
  }
}

// ========== CARD DATA ========== //
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

const allCards = [...cryptopups, ...cyberpups, ...alienpups];

// ========== RENDER CARDS ========== //
function renderCards(containerId, cardArray) {
  const container = document.getElementById(containerId);
  if (!container) return;

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
  const usernameInput = document.querySelector('input[type="text"]');
  const username = usernameInput ? usernameInput.value.trim() : "";
  if (!username) return;

  const signInBox = document.querySelector('.sign-in-box');
  const userLevelBox = document.getElementById('userLevelBox');
  const usernameDisplay = document.getElementById('usernameDisplay');

  if (signInBox) signInBox.style.display = 'none';
  if (userLevelBox) userLevelBox.style.display = 'block';
  if (usernameDisplay) usernameDisplay.textContent = `${username}'s Profile`;
}

// ========== FILTER CARDS ========== //
function filterCards() {
  const filterEl = document.getElementById('filter');
  if (!filterEl) return;

  const sortBy = filterEl.value;
  if (sortBy === "all") {
    renderCards('cardContainer', allCards);
    return;
  }

  const sorted = [...allCards].sort((a, b) => {
    const valA = a.stats[sortBy];
    const valB = b.stats[sortBy];
    return typeof valA === "number" ? valB - valA : valA.localeCompare(valB);
  });

  renderCards('cardContainer', sorted);
}

// ========== OPEN PACK ========== //
function openPack(packName) {
  let selectedCards = [];
  switch (packName) {
    case "cryptopups": selectedCards = cryptopups; break;
    case "cyberpups": selectedCards = cyberpups; break;
    case "alienpups": selectedCards = alienpups; break;
    default: return;
  }

  const display = document.getElementById("packDisplay");
  if (!display) return;
  display.innerHTML = "";

  selectedCards.forEach((card, index) => {
    setTimeout(() => {
      const div = document.createElement("div");
      div.className = "collection-card";
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
      div.addEventListener('click', () => {
        div.classList.toggle('flipped');
      });

      display.appendChild(div);

      // Optional sparkle effect
      if (typeof createSparkle === 'function') {
        const rect = div.getBoundingClientRect();
        const sparkleX = rect.left + rect.width / 2 + (Math.random() * 100 - 50);
        const sparkleY = rect.top + rect.height / 2 + (Math.random() * 60 - 30);
        createSparkle(sparkleX, sparkleY);
      }
    }, index * 200);
  });
}

// ========== INITIALISE ========== //
document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById('cardContainer')) {
    renderCards('cardContainer', allCards);
  }

  if (document.getElementById('collectionContainer')) {
    renderCards('collectionContainer', allCards);
  }
});
