function openPack(packId){
  const container = document.getElementById(packId);
  if (!container.classList.contains('open'))
    container.classList.add('open');
    container.style.display = 'flex';

const cards = [
  {
  name: "WoodyBlue",
  image: "assets/images/WoodyBlue.png",
  stats: { speed: 60, style: 80, loyalty: 97, rarity: "Legendary" }
    },{
  name: "Ace",
  image: "assets/images/Ace.png",
  stats: { speed: 82, style: 57, loyalty: 78, rarity: "Rare" }
    },{
  name: "LandBlue",
  image: "assets/images/LandBlue.png",
  stats: { speed: 43, style: 67, loyalty: 97, rarity: "Common" }
    },{
  name: "Darla",
  image: "assets/images/Darla.png",
  stats: { speed: 60, style: 80, loyalty: 97, rarity: "Legendary" }
    },{
  name: "SpacePup",
  image: "assets/images/SpacePup.png",
  status: { speed: 60, style: 88, loyalty: 75, rarity: "Rare" }
    },{
  name: "Rover",
  image: "assets/images/Rover.png",
  stats: { speed: 75, style: 95, loyalty: 64, rarity: "Epic" }
    },{
  name: "Victor",
  image: "assets/images/Victor.png",
  stats: { speed: 69, style: 67, loyalty: 26, rarity: "Uncommon" }
    },{
  name: "Jinx",
  image: "assets/images/Jinx.png",
  stats: { speed: 86, style: 80, loyalty: 65, rarity: "Rare" }
    },
   ];

   renderCards(packId, cards);
  }

function switchPage(pageId) {
  document.querySelectorAll('.page').forEach(page => {
    page.classList.remove('active');
  });
  document.getElementById(pageId).classList.add('active');
}
function renderCollectionCards(containerId, cardArray) {
  const container = document.getElementById(containerId);
  container.innerHTML = "";
  cardArray.forEach(card => {
    const cardDiv = document.createElement('div');
    cardDiv.className = 'collection-card';
    cardDiv.innerHTML = `
        <div class="card-inner-face card-front-face">
          <img src="${card.image}" alt="${card.name}" />
        </div>
        <div class="card-inner-face card-back-face">
          <h4>${card.name}</h4>
          <ul>
            <li>Speed: ${card.stats.speed}</li>
            <li>Style: ${card.stats.style}</li>
            <li>Loyalty: ${card.stats.loyalty}</li>
            <li>Rarity: ${card.stats.rarity}</li>
          </ul>
        </div>
      `;
    cardDiv.addEventListener('click', () => {
      cardDiv.classList.toggle('flipped');
    });
    container.appendChild(cardDiv);
    // Flip cards (main/home)
    cardDiv.innerHTML = `
          <div class="card-inner">
            <div class="card-front">
              <img src="${card.image}"/>
            </div>
            <div class="card-back">
              <h4>Stats</h4>
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

function signIn() {
  const username = document.querySelector('input[type="text"]').value;
  document.querySelector('.sign-in-box').style.display = 'none';
  document.getElementById('userLevelBox').style.display = 'block';
  document.getElementById('usernameDisplay').textContent = `${username}'s Profile`;
}

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

document.addEventListener("DOMContentLoaded", () => {
  // Home
  if (document.getElementById('cardContainer')) {
    renderCards('cardContainer', cards);
  }

  // Collection
  if (document.getElementById('collectionContainer')) {
    renderCards('collectionContainer', cards);
  }

  // Profile Carousel
  if (document.getElementById('profileCardCarousel')) {
    const topCards = cards.slice(0, 3); // Change to your featured cards
    renderCards('profileCardCarousel', topCards);
  }
});