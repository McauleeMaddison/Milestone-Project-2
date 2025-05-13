// ========== CARD DATA ========== //
document.addEventListener('DOMContentLoaded', () => {
  const allCards = {
    cryptopups: [
      {
        name: "FloatyBlue",
        image: "assets/images/cryptopups/FloatyBlue.png",
        stats: { speed: 9, style: 9, loyalty: 6, rarity: "Epic" }
      }
    ],
    cyberpups: [
      {
        name: "Gibbons",
        image: "assets/images/cyberpups/Gibbons.png",
        stats: { speed: 7, style: 10, loyalty: 8, rarity: "Legendary" }
      }
    ],
    alienpups: [
      {
        name: "Lucy",
        image: "assets/images/alienpups/Lucy.png",
        stats: { speed: 6, style: 8, loyalty: 10, rarity: "Rare" }
      }
    ]
  };

  const allFlatCards = [
    ...allCards.cryptopups,
    ...allCards.cyberpups,
    ...allCards.alienpups
  ];

  // SPA Page Switcher
  window.switchPage = function (pageId) {
    document.querySelectorAll('.page').forEach(page => {
      page.classList.remove('active');
    });
    const target = document.getElementById(pageId);
    if (target) target.classList.add('active');
  };

  // Render Cards
  function renderCards(containerId, cardsToRender) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const borderColor = localStorage.getItem('cardBorderColor') || '#ffcc00';
    container.innerHTML = '';

    cardsToRender.forEach(card => {
      const cardDiv = document.createElement('div');
      cardDiv.classList.add('card');
      cardDiv.style.border = `2px solid ${borderColor}`;
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

  // Handle Pack Clicks
  window.openPack = function (packName) {
    // Hide other containers (optional if only one deck container exists)
    ['cryptopups', 'cyberpups', 'alienpups'].forEach(id => {
      const container = document.getElementById('deckContainer');
      if (container) container.innerHTML = '';
    });

    const cards = allCards[packName] || [];
    renderCards('deckContainer', cards);
  };

  // Filter Cards
  window.filterCards = function () {
    const sortBy = document.getElementById('filter').value;
    if (sortBy === "all") {
      renderCards('cardContainer', allFlatCards);
      return;
    }

    const sorted = [...allFlatCards].sort((a, b) => {
      const valA = a.stats[sortBy];
      const valB = b.stats[sortBy];
      return typeof valA === "number"
        ? valB - valA
        : valA.localeCompare(valB);
    });

    renderCards('cardContainer', sorted);
  };

  // Dark Mode Toggle
  const darkModeToggle = document.getElementById('darkModeToggle');
  if (darkModeToggle) {
    const savedTheme = localStorage.getItem('darkMode');
    if (savedTheme === 'true') {
      darkModeToggle.checked = true;
      document.body.style.background = 'linear-gradient(to right, #000, #222)';
    }

    darkModeToggle.addEventListener('change', () => {
      const isDark = darkModeToggle.checked;
      document.body.style.background = isDark
        ? 'linear-gradient(to right, #000, #222)'
        : 'linear-gradient(to right, #232526, #414345)';
      localStorage.setItem('darkMode', isDark);
    });
  }

  // Border Color Picker
  const borderColorPicker = document.getElementById('borderColorPicker');
  if (borderColorPicker) {
    const savedColor = localStorage.getItem('cardBorderColor') || '#ffcc00';
    borderColorPicker.value = savedColor;

    borderColorPicker.addEventListener('input', (e) => {
      const color = e.target.value;
      document.querySelectorAll('.card').forEach(card => {
        card.style.border = `2px solid ${color}`;
      });
      localStorage.setItem('cardBorderColor', color);
    });
  }

  // Initial Renders
  renderCards('cardContainer', allFlatCards);              // Full collection view
  renderCards('collectionContainer', allFlatCards.slice(0, 2)); // Sample in another section
});
