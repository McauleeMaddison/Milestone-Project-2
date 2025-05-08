const cards = [
  {
 name: "AlienPup",
  image: "assets/images/AlienPup.png",
 stats: { speed: 74, style: 93, loyalty: 97, rarity: "Legendary" }
  },
  {
 name: "Lucy",
 image: "assets/images/Lucy.png",
 stats: { style: 90, loyalty: 60, Speed: 80, rarity: "Epic" }
  },
 {
  name: "Trevor",
 image: "assets/images/Trevor.png",
 stats: { Speed: 90, Style: 80, loyalty: 70, rarity: "Rare" }
 },
 {
 name: "Gibbons",
 image: "assets/images/Gibbons.png",
 stats: { style: 70, loyalty: 80, rarity: "Common" }
 },
 {
 name: "Elsie",
 image: "assets/images/Elsie.png",
 stats: { Energy: 80, iq: 90, rarity: "Uncommon" }
  },
     {
 name: "AlienPup",
  image: "assets/images/AlienPup.png",
 stats: { speed: 43, style: 63, loyalty: 85, rarity: "Rare" },
 },
 {
 name: "Lucy",
 image: "assets/images/Lucy.png",
 stats: { style: 90, loyalty: 60, Speed: 80, rarity: "Epic" }
  },
 {
  name: "Trevor",
 image: "assets/images/Trevor.png",
 stats: { Speed: 90, Style: 80, loyalty: 70, rarity: "Epic" }
 },
  {
 name: "Gibbons",
 image: "assets/images/Gibbons.png",
 stats: { style: 70, loyalty: 80, rarity: "Epic" }
 },
 {
 name: "Elsie",
 image: "assets/images/Elsie.png",
 stats: { Energy: 80, iq: 90, rarity: "Epic" }
  }
  ];
 
  
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