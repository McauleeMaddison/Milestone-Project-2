const cards = [
    {
      name: "AlienPup",
      image: "assets/images/shadow.png",
      stats: { speed: 7, style: 10, loyalty: 8, rarity: "Legendary" }
    },
    {
      name: "FloatyPup",
      image: "assets/images/blaze.png",
      stats: { speed: 9, style: 9, loyalty: 6, rarity: "Epic" }
    },
    {
      name: "LandPup",
      image: "assets/images/nova.png",
      stats: { speed: 6, style: 8, loyalty: 10, rarity: "Rare" }
    },
    {
      name: "MoonPup",
      image: "assets/images/bolt.png",
      stats: { speed: 10, style: 7, loyalty: 7, rarity: "Epic" }
    },
    {
      name: "SpacePup",
      image: "images/frost.png",
      stats: { speed: 8, style: 9, loyalty: 9, rarity: "Legendary" }
    }
  ];
  
  function switchPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
      page.classList.remove('active');
    });
    document.getElementById(pageId).classList.add('active');
  }
  
  function renderCards(containerId, cardArray) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = "";
  
    cardArray.forEach(card => {
      const cardDiv = document.createElement('div');
      const isCollection = containerId.includes("collection");
      const isCarousel = containerId.includes("Carousel");
  
      cardDiv.className = isCollection || isCarousel ? 'collection-card' : 'card';
        if (isCollection || isCarousel) {
        cardDiv.innerHTML = `
          <img src="${card.image}" alt="${card.name}" />
          <div class="speech-bubble">
            <strong>${card.name}</strong><br>
            Speed: ${card.stats.speed}<br>
            Style: ${card.stats.style}<br>
            Loyalty: ${card.stats.loyalty}<br>
            Rarity: ${card.stats.rarity}
          </div>
        `;
      } else {
        function renderCircularCarousel(cards) {
            const carousel = document.getElementById('cardCarousel');
            const cardCount = cards.length;
            const angle = 360 / cardCount;
          
            cards.forEach((card, index) => {
              const cardDiv = document.createElement('div');
              cardDiv.className = 'carousel-card';
              cardDiv.style.transform = `rotateY(${angle * index}deg) translateZ(300px)`;
          
              cardDiv.innerHTML = `
                <img src="${card.image}" alt="${card.name}" />
                <div class="hologram">
                  <strong>${card.name}</strong><br>
                  Speed: ${card.stats.speed}<br>
                  Style: ${card.stats.style}<br>
                  Loyalty: ${card.stats.loyalty}<br>
                  Rarity: ${card.stats.rarity}
                </div>
              `;
          
              carousel.appendChild(cardDiv);
            });
          }
        // Flip cards (main/home)
        cardDiv.innerHTML = `
          <div class="card-inner">
            <div class="card-front">
              <img src="${card.image}" alt="${card.name}" />
              <h3>${card.name}</h3>
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
      }
  
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