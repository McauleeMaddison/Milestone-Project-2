/*jslint browser: true */
"use strict";

(function () {
    var cards = [
        {name: "Gibbons", image: "assets/images/cyberpack/Gibbons.png", stats: {speed: 7, style: 10, loyalty: 8}, type: "Cyberpups"},
        {name: "Darla", image: "assets/images/cryptopack/Darla.png", stats: {speed: 9, style: 9, loyalty: 6}, type: "Cryptopups"},
        {name: "Lucy", image: "assets/images/alienpack/Lucy.png", stats: {speed: 6, style: 8, loyalty: 10}, type: "Alienpups"},
        {name: "Ace", image: "assets/images/cyberpack/Ace.png", stats: {speed: 15, style: 15, loyalty: 9}, type: "Cyberpups"},
        {name: "Jasper", image: "assets/images/cryptopack/Jasper.png", stats: {speed: 4, style: 10, loyalty: 20}, type: "Cryptopups"},
        {name: "Victor", image: "assets/images/alienpack/Victor.png", stats: {speed: 15, style: 12, loyalty: 7}, type: "Alienpups"},
        {name: "Jinx", image: "assets/images/cyberpack/Jinx.png", stats: {speed: 20, style: 10, loyalty: 15}, type: "Cyberpups"},
        {name: "WoodyBlue", image: "assets/images/cryptopack/WoodyBlue.png", stats: {speed: 8, style: 5, loyalty: 10}, type: "Cryptopups"},
        {name: "Tima", image: "assets/images/alienpack/Tima.png", stats: {speed: 10, style: 20, loyalty: 15}, type: "Alienpups"}
    ],
        stats = ["speed", "style", "loyalty"];

    function getElement(id) {
        return document.getElementById(id);
    }

    function setText(id, message) {
        var element = getElement(id);
        if (element) {
            element.textContent = message;
        }
    }

    function isValidCard(card) {
        return Boolean(card && typeof card.name === "string" && typeof card.image === "string" && card.stats && typeof card.stats.speed === "number" && typeof card.stats.style === "number" && typeof card.stats.loyalty === "number" && typeof card.type === "string");
    }

    function getRandomCard(cardList) {
        if (!Array.isArray(cardList) || cardList.length === 0) {
            return null;
        }
        return cardList[Math.floor(Math.random() * cardList.length)] || null;
    }

    function switchPage(pageId) {
        var nextPage = getElement(pageId);
        if (!nextPage || !nextPage.classList.contains("page")) {
            return;
        }
        document.querySelectorAll(".page").forEach(function (page) {
            var isActive = page.id === pageId;
            page.classList.toggle("active", isActive);
            page.hidden = !isActive;
        });
        document.querySelectorAll(".nav-link").forEach(function (button) {
            var isActive = button.dataset.page === pageId;
            button.classList.toggle("is-active", isActive);
            if (isActive) {
                button.setAttribute("aria-current", "page");
            } else {
                button.removeAttribute("aria-current");
            }
        });
        nextPage.querySelector("h1").focus({preventScroll: true});
    }

    function createCardElement(card, position) {
        var article = document.createElement("article"),
            image = document.createElement("img"),
            name = document.createElement("h3"),
            statLine = document.createElement("p");
        if (!isValidCard(card)) {
            return null;
        }
        article.className = "card fan-" + String((position % 5) + 1);
        image.src = card.image;
        image.alt = card.name + " trading card";
        name.textContent = card.name;
        statLine.className = "card-stat-line";
        statLine.textContent = "SPD " + String(card.stats.speed) + " · STY " + String(card.stats.style) + " · LOY " + String(card.stats.loyalty);
        article.append(image, name, statLine);
        return article;
    }

    function openPack(type, targetId) {
        var area = getElement(targetId),
            filteredCards = cards.filter(function (card) {
                return isValidCard(card) && card.type === type;
            });
        document.querySelectorAll(".card-reveal-area").forEach(function (revealArea) {
            revealArea.replaceChildren();
        });
        if (!area) {
            setText("collection-status", "That pack cannot be opened right now. Please choose another pack.");
            return;
        }
        if (filteredCards.length === 0) {
            setText("collection-status", "No valid cards were found in that pack. Please choose another pack.");
            return;
        }
        filteredCards.forEach(function (card, index) {
            var cardElement = createCardElement(card, index);
            if (cardElement) {
                area.appendChild(cardElement);
            }
        });
        setText("collection-status", type + " opened — " + String(filteredCards.length) + " pups revealed.");
    }

    function renderBattleCard(targetId, card, stat) {
        var target = getElement(targetId),
            image = document.createElement("img"),
            label = document.createElement("p"),
            name = document.createElement("strong"),
            statValue = document.createElement("span");
        if (!target || !isValidCard(card) || stats.indexOf(stat) === -1) {
            return false;
        }
        image.src = card.image;
        image.alt = card.name + " selected for battle";
        name.textContent = card.name;
        statValue.textContent = stat + ": " + String(card.stats[stat]);
        label.append(name, statValue);
        target.replaceChildren(image, label);
        target.classList.remove("battle-card-empty");
        return true;
    }

    function playGame() {
        var player = getRandomCard(cards.filter(isValidCard)),
            computer = getRandomCard(cards.filter(isValidCard)),
            stat = stats[Math.floor(Math.random() * stats.length)],
            result;
        if (!player || !computer || !stat) {
            setText("game-result", "A valid battle deck is unavailable. Please refresh and try again.");
            return;
        }
        if (!renderBattleCard("player-card", player, stat) || !renderBattleCard("computer-card", computer, stat)) {
            setText("game-result", "The battle cards could not be shown. Please refresh and try again.");
            return;
        }
        if (player.stats[stat] > computer.stats[stat]) {
            result = "You win! " + player.name + " takes " + stat + ".";
        } else if (player.stats[stat] < computer.stats[stat]) {
            result = "The bot wins this time. " + computer.name + " takes " + stat + ".";
        } else {
            result = "Draw! Both pups have " + String(player.stats[stat]) + " " + stat + ".";
        }
        setText("game-result", result);
    }

    function validateLogin(username, password) {
        var validUsername = /^[A-Za-z0-9 _\u002d]{3,20}$/.test(username);
        if (!username || !password) {
            return "Please enter both a trainer name and an access code.";
        }
        if (!validUsername) {
            return "Trainer names must use 3–20 letters, numbers, spaces, underscores or hyphens.";
        }
        if (password.length < 6) {
            return "Your access code must contain at least 6 characters.";
        }
        return "";
    }

    function handleLogin(event) {
        var usernameInput = getElement("username"),
            passwordInput = getElement("password"),
            errorMessage;
        event.preventDefault();
        if (!usernameInput || !passwordInput) {
            setText("login-status", "The sign-in form is unavailable. Please refresh and try again.");
            return;
        }
        errorMessage = validateLogin(usernameInput.value.trim(), passwordInput.value);
        if (errorMessage) {
            setText("login-status", errorMessage);
            return;
        }
        setText("login-status", "Welcome back, " + usernameInput.value.trim() + "! Your kennel is ready.");
        passwordInput.value = "";
    }

    function openStorePack(storeCard) {
        var packType = storeCard.dataset.pack || "",
            packButton = storeCard.querySelector(".pack-button"),
            revealArea = storeCard.querySelector(".pack-reveal"),
            packCards,
            fragment;
        if (!packButton || !revealArea) {
            return;
        }
        packCards = cards.filter(function (card) {
            return isValidCard(card) && card.type === packType;
        }).slice(0, 3);
        revealArea.innerHTML = "";
        if (packCards.length === 0) {
            revealArea.innerHTML = '<div class="pack-reveal-item"><strong>Empty</strong><span>No pups are available in this pack right now.</span></div>';
            storeCard.classList.add("is-open");
            packButton.setAttribute("aria-expanded", "true");
            return;
        }
        fragment = document.createDocumentFragment();
        packCards.forEach(function (card) {
            var item = document.createElement("div"),
                image = document.createElement("img"),
                name = document.createElement("strong");
            image.src = card.image;
            image.alt = card.name + " revealed from the " + packType + " pack";
            name.textContent = card.name;
            item.className = "pack-reveal-item";
            item.append(image, name);
            fragment.appendChild(item);
        });
        revealArea.appendChild(fragment);
        storeCard.classList.add("is-open");
        packButton.setAttribute("aria-expanded", "true");
    }

    function closeStorePack(storeCard) {
        var packButton = storeCard.querySelector(".pack-button"),
            revealArea = storeCard.querySelector(".pack-reveal");
        if (!packButton || !revealArea) {
            return;
        }
        revealArea.innerHTML = "";
        storeCard.classList.remove("is-open");
        packButton.setAttribute("aria-expanded", "false");
    }

    function toggleStorePack(storeCard) {
        if (storeCard.classList.contains("is-open")) {
            closeStorePack(storeCard);
            return;
        }
        openStorePack(storeCard);
    }

    function initialise() {
        var playButton = getElement("play-button"),
            loginForm = getElement("login-form");
        document.querySelectorAll(".nav-link").forEach(function (button) {
            button.addEventListener("click", function () {
                switchPage(button.dataset.page || "");
            });
        });
        document.querySelectorAll(".pack-card").forEach(function (button) {
            button.addEventListener("click", function () {
                openPack(button.dataset.pack || "", button.dataset.target || "");
            });
        });
        document.querySelectorAll(".store-card").forEach(function (card) {
            var button = card.querySelector(".pack-button");
            if (!button) {
                return;
            }
            button.setAttribute("aria-expanded", "false");
            button.addEventListener("click", function () {
                toggleStorePack(card);
            });
        });
        if (playButton) {
            playButton.addEventListener("click", playGame);
        }
        if (loginForm) {
            loginForm.addEventListener("submit", handleLogin);
        }
    }

    initialise();
}());
