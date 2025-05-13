// ========== CARD DATA ========== //
document.addEventListener('DOMContentLoaded', () => {
  const cards = [
    {
      name: "Gibbons",
      image: "assets/images/cyberpups/Gibbons.png",
      stats: { speed: 7, style: 10, loyalty: 8, rarity: "Legendary" }
    },
    {
      name: "FloatyBlue",
      image: "assets/images/cryptopups/FloatyBlue.png",
      stats: { speed: 9, style: 9, loyalty: 6, rarity: "Epic" }
    },
    {
      name: "Lucy",
      image: "assets/images/alienpups/Lucy.png",
      stats: { speed: 6, style: 8, loyalty: 10, rarity: "Rare" }
    }
  ];

  // SPA Page Switcher
  window.switchPage = function(pageId) {
    document.querySelectorAll('.page').forEach(page => {
      page.classList.remove('active');
    });
    const target = document.getElementById(pageId);
    if (target) target.classList.add('active');
  };

  // Render Cards
  function renderCards(containerId, cardsToRender) {
    const container = document.getElementById(containerId);
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

  // Filter Cards
  window.filterCards = function () {
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

  // Initial Card Rendering
  renderCards('cardContainer', cards);
  renderCards('collectionContainer', cards.slice(0, 2)); // Example for collection page
});
