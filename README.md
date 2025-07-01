# 🐶 NFTPups - Interactive Trading Card Web App

NFTPups is a fun, animated, and fully responsive digital card game where users can collect, reveal, and battle with stylized puppy trading cards. Each card has its own personality with stats like Speed, Style, Loyalty, and Rarity.

![NFTPups Preview](assets/images/screenshots/nftpups-preview.png)

---

## 🎯 Project Purpose

This project is designed to give users an interactive and enjoyable collectible card experience using modern front-end technologies. With slick animations, a card battle game, and personal customizations like dark mode and border styling, it aims to blend creativity with functionality.

---

## 👥 User Stories

### As a user:
- I want to open card packs and see the cards fan out with 3D animation so I can enjoy the collectible experience.
- I want to flip the cards to view their stats so I can understand each pup's abilities.
- I want to play a mini card game against the computer so I can test my luck.
- I want to customize the card border color so I can personalize my deck.
- I want to switch to dark mode so I can browse comfortably at night.
- I want to log in with my name so I can feel like the game is made just for me.

---

## 🧪 Testing Summary

### ✅ Manual Testing

| Feature                     | Tested On Click/View             | Result     |
|-----------------------------|----------------------------------|------------|
| Page navigation             | Nav bar items                    | ✅ Working |
| Card pack reveal            | Crypto, Cyber, Alien packs       | ✅ Working |
| Card flip animation         | Each card                        | ✅ Working |
| Card game play              | Play Round button                | ✅ Working |
| Dark mode toggle            | Settings page                    | ✅ Working |
| Border color customization  | Color input selector             | ✅ Working |
| Login animation             | Profile page form and status     | ✅ Working |
| Responsiveness              | Mobile, tablet, desktop views    | ✅ Working |

---

## 🧰 Technologies & Frameworks

| Feature              | Tool/Technology         |
|----------------------|-------------------------|
| Structure            | HTML5                   |
| Styling              | CSS3, Animations, Flexbox, Media Queries |
| Interactivity        | Vanilla JavaScript      |
| Customization        | `localStorage`, toggle switches |
| Optional Addons      | Fake Login UI & Card Game |
| Version Control      | Git + GitHub            |
| Deployment           | GitHub Pages            |

---

## 📁 Folder Structure

```plaintext
nftpups/
│
├── index.html                   # Single-page layout and main content
├── README.md                    # Project documentation
├── assets/
│   ├── css/
│   │   └── style.css            # Styling and animations
│   ├── js/
│   │   └── script.js            # Game logic, navigation, and interactivity
│   └── images/
│       ├── cryptopack/          # Cryptopups card images
│       ├── cyberpack/           # Cyberpups card images
│       └── alienpack/           # Alienpups card images
🎮 Pages Overview

🏠 Home - Card Battle
Play a round by clicking "Play Round".
Random cards are generated for the player and computer.
Stats compared to determine a winner.
Dynamic result message and card visuals.

📂 Collection - Open Your Packs
Three pack types: Cryptopups, Cyberpups, Alienpups.
Click a pack to open and reveal themed cards in a designated area.
Cards animate with a 3D fanning effect and flip to show stats.

🛒 Store - Buy Card Packs
Each pack displayed as a 3D rotatable card.
Front shows pack name and cost, back shows contents.

HADE HELP FROM AI TO MAKE THE README.md FILE LOOK MORE professional 

Built with CSS 3D transformations for stylish hover effects.
👤 Profile - Login Animation
Username and password fields with animated focus and glow effects.
Sign-in button triggers a simulated login status animation.
