"use strict";

const places = [
  {
    id: "kinshasa",
    name: "Kinshasa",
    category: "city",
    label: "Capital city",
    description: "Discover the capital's lively music scene, markets, riverside setting, and contemporary Congolese culture.",
    image: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=900&q=75",
    alt: "A city skyline with buildings and urban lights",
    link: "https://www.britannica.com/place/Kinshasa"
  },
  {
    id: "congo-river",
    name: "The Congo River",
    category: "nature",
    label: "River & landscape",
    description: "Learn about one of the world's great rivers and its importance to transport, communities, and ecosystems.",
    image: "https://images.unsplash.com/photo-1437482078695-73f5ca6c96e2?auto=format&fit=crop&w=900&q=75",
    alt: "A wide natural river landscape",
    link: "https://www.britannica.com/place/Congo-River"
  },
  {
    id: "virunga",
    name: "Virunga National Park",
    category: "park",
    label: "World Heritage site",
    description: "Explore a remarkable protected area known for mountain gorillas, volcanic landscapes, and rich biodiversity.",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=900&q=75",
    alt: "Dramatic mountain scenery",
    link: "https://virunga.org/"
  },
  {
    id: "kahuzi-biega",
    name: "Kahuzi-Biega National Park",
    category: "park",
    label: "Forest & wildlife",
    description: "Learn about the montane and lowland forests that provide habitat for the eastern lowland gorilla.",
    image: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=900&q=75",
    alt: "A dense green rainforest",
    link: "https://whc.unesco.org/"
  },
  {
    id: "boyoma-falls",
    name: "Boyoma Falls",
    category: "nature",
    label: "River rapids",
    description: "Discover a series of powerful rapids along the Lualaba River near Kisangani.",
    image: "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=900&q=75",
    alt: "Flowing water and a natural waterfall",
    link: "https://www.britannica.com/place/Congo-River"
  },
  {
    id: "goma",
    name: "Goma",
    category: "city",
    label: "Eastern DR Congo",
    description: "Learn about a city near Lake Kivu and the volcanic landscapes of the Virunga region.",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=900&q=75",
    alt: "Mountain peaks and a rugged landscape",
    link: "https://www.britannica.com/place/Democratic-Republic-of-the-Congo"
  }
];

const wildlife = [
  {
    id: "mountain-gorilla",
    name: "Mountain Gorilla",
    category: "mammal",
    habitat: "forest",
    description: "An endangered great ape that lives in the Virunga mountain forests. Conservation and habitat protection are essential to its survival.",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Mountain_gorilla_(Gorilla_beringei_beringei)_2-year-old_4.jpg",
    alt: "Mountain gorilla in its natural forest habitat"
  },
  {
    id: "eastern-lowland-gorilla",
    name: "Eastern Lowland Gorilla",
    category: "mammal",
    habitat: "forest",
    description: "Also called Grauer's gorilla, this great ape is native to eastern DR Congo and is threatened by habitat loss and other pressures.",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Likal%C3%A9_-_Gorille_des_plaines_%C3%A0_Saint_Martin_la_Plaine.jpg",
    alt: "Gorilla resting in a green environment"
  },
  {
    id: "okapi",
    name: "Okapi",
    category: "mammal",
    habitat: "forest",
    description: "A shy forest mammal native to DR Congo. Its striped legs and long ears make it distinctive, and it is the only living relative of the giraffe.",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Saint-Aignan_(Loir-et-Cher)._Okapi.jpg",
    alt: "Okapi showing its distinctive striped legs"
  },
  {
    id: "african-grey-parrot",
    name: "African Grey Parrot",
    category: "bird",
    habitat: "forest",
    description: "An intelligent parrot associated with African forests. Habitat protection and action against illegal wildlife trade are important for its future.",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Congo_African_Grey_pet_on_a_perch.JPG",
    alt: "African grey parrot perched on a branch"
  },
  {
    id: "hippopotamus",
    name: "Hippopotamus",
    category: "mammal",
    habitat: "aquatic",
    description: "A large semiaquatic mammal that depends on rivers and lakes for much of its daily life.",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Hippo_(Hippopotamus_amphibius)_going_out_of_the_water.jpg",
    alt: "Hippopotamus emerging from the water"
  }
];

const savedStorageKey = "exploreDrCongoSavedPlaces";
const interestStorageKey = "exploreDrCongoInterest";

function readSavedPlaces() {
  try {
    const stored = JSON.parse(localStorage.getItem(savedStorageKey) || "[]");

    if (!Array.isArray(stored)) {
      return [];
    }

    return stored.filter((id) =>
      places.some((place) => place.id === id)
    );
  } catch (error) {
    return [];
  }
}

let savedPlaces = readSavedPlaces();
let showingSavedOnly = false;

function savePlaces() {
  try {
    localStorage.setItem(savedStorageKey, JSON.stringify(savedPlaces));
    return true;
  } catch (error) {
    return false;
  }
}

function createPlaceCard(place) {
  const isSaved = savedPlaces.includes(place.id);
  const buttonText = isSaved ? "✓ Saved" : "+ Save place";
  const pressed = isSaved ? "true" : "false";

  return `
    <article class="destination-card">
      <img
        src="${place.image}"
        alt="${place.alt}"
        loading="lazy"
        width="900"
        height="563"
      >
      <div class="destination-card-content">
        <span class="destination-meta">${place.label}</span>
        <h3>${place.name}</h3>
        <p>${place.description}</p>
        <a
          class="text-link"
          href="${place.link}"
          target="_blank"
          rel="noopener noreferrer"
        >Learn more ↗</a>
        <button
          class="save-button"
          type="button"
          data-save-place="${place.id}"
          aria-pressed="${pressed}"
        >${buttonText}</button>
      </div>
    </article>
  `;
}

function renderPlaces() {
  const grid = document.querySelector("#places-grid");

  if (!grid) {
    return;
  }

  const searchInput = document.querySelector("#place-search");
  const filterInput = document.querySelector("#place-filter");
  const count = document.querySelector("#place-count");

  const query = searchInput.value.trim().toLowerCase();
  const category = filterInput.value;

  const filteredPlaces = places.filter((place) => {
    const matchesSearch =
      `${place.name} ${place.description} ${place.label}`
        .toLowerCase()
        .includes(query);

    const matchesCategory =
      category === "all" || place.category === category;

    const matchesSaved =
      !showingSavedOnly || savedPlaces.includes(place.id);

    return matchesSearch && matchesCategory && matchesSaved;
  });

  if (filteredPlaces.length === 0) {
    grid.innerHTML = `
      <div class="empty-state">
        <h3>No destinations found</h3>
        <p>Try another search or category, or save a place to build your list.</p>
      </div>
    `;
  } else {
    grid.innerHTML = filteredPlaces.map(createPlaceCard).join("");
  }

  count.textContent = showingSavedOnly
    ? `${filteredPlaces.length} saved destination${filteredPlaces.length === 1 ? "" : "s"} shown.`
    : `${filteredPlaces.length} destination${filteredPlaces.length === 1 ? "" : "s"} found.`;

  const savedToggle = document.querySelector("#show-saved");

  if (savedToggle) {
    savedToggle.setAttribute("aria-pressed", String(showingSavedOnly));
    savedToggle.textContent = showingSavedOnly
      ? "Show all places"
      : `Show saved places (${savedPlaces.length})`;
  }
}

function handlePlaceGridClick(event) {
  const button = event.target.closest("[data-save-place]");

  if (!button) {
    return;
  }

  const placeId = button.dataset.savePlace;
  const placeExists = places.some((place) => place.id === placeId);

  if (!placeExists) {
    return;
  }

  if (savedPlaces.includes(placeId)) {
    savedPlaces = savedPlaces.filter((id) => id !== placeId);
  } else {
    savedPlaces = [...savedPlaces, placeId];
  }

  const persisted = savePlaces();
  renderPlaces();

  const count = document.querySelector("#place-count");

  if (!persisted && count) {
    count.textContent =
      "Your list changed for this session, but browser storage is unavailable.";
  }
}

function createWildlifeCard(animal) {
  return `
    <article class="destination-card">
      <img
        src="${animal.image}"
        alt="${animal.alt}"
        loading="lazy"
        width="900"
        height="563"
      >
      <div class="destination-card-content">
        <span class="destination-meta">${animal.category} · ${animal.habitat}</span>
        <h3>${animal.name}</h3>
        <p>${animal.description}</p>
      </div>
    </article>
  `;
}

function renderWildlife() {
  const grid = document.querySelector("#wildlife-grid");

  if (!grid) {
    return;
  }

  const filter = document.querySelector("#wildlife-filter").value;

  const filteredWildlife = wildlife.filter((animal) => {
    if (filter === "all") {
      return true;
    }

    if (filter === "mammal") {
      return animal.category === "mammal";
    }

    if (filter === "forest") {
      return animal.habitat === "forest";
    }

    if (filter === "bird") {
      return animal.category === "bird";
    }

    if (filter === "aquatic") {
      return animal.habitat === "aquatic";
    }

    return false;
  });

  grid.innerHTML = filteredWildlife.length
    ? filteredWildlife.map(createWildlifeCard).join("")
    : `
      <div class="empty-state">
        <h3>No wildlife found</h3>
        <p>Choose another filter to explore more species.</p>
      </div>
    `;
}

function handleInterestSubmit(event) {
  event.preventDefault();

  const select = document.querySelector("#interest");
  const emailInput = document.querySelector("#visitor-email");
  const result = document.querySelector("#interest-result");

  const recommendations = {
    nature: {
      title: "Nature and geography",
      message: "Start with the Congo River and the Congo Basin."
    },
    culture: {
      title: "Culture and languages",
      message: "Explore Congolese languages, music, food, and artistic traditions."
    },
    wildlife: {
      title: "Wildlife and national parks",
      message: "Discover Virunga National Park and Kahuzi-Biega National Park."
    },
    cities: {
      title: "Cities and destinations",
      message: "Begin with Kinshasa and learn about the country's major cities."
    }
  };

  const recommendation = recommendations[select.value];

  if (!recommendation) {
    result.textContent = "Please choose a topic before continuing.";
    return;
  }

  try {
    localStorage.setItem(interestStorageKey, select.value);
  } catch (error) {
    // The recommendation remains available even if storage is disabled.
  }

  result.textContent = `${recommendation.title}: ${recommendation.message}`;

  const email = emailInput.value.trim();

  if (email) {
    result.textContent += " Your email was not sent or stored by this demo.";
  }
}

function initializeNavigation() {
  const menuButton = document.querySelector(".menu-toggle");
  const navigation = document.querySelector("#primary-nav");

  if (!menuButton || !navigation) {
    return;
  }

  menuButton.addEventListener("click", () => {
    const isOpen = navigation.classList.toggle("is-open");

    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute(
      "aria-label",
      isOpen ? "Close navigation" : "Open navigation"
    );
    menuButton.textContent = isOpen ? "✕" : "☰";
  });

  navigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navigation.classList.remove("is-open");
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Open navigation");
      menuButton.textContent = "☰";
    });
  });
}

function initializePage() {
  document.querySelectorAll(".current-year").forEach((element) => {
    element.textContent = String(new Date().getFullYear());
  });

  initializeNavigation();

  const placeGrid = document.querySelector("#places-grid");

  if (placeGrid) {
    renderPlaces();

    placeGrid.addEventListener("click", handlePlaceGridClick);

    document.querySelector("#place-search")
      .addEventListener("input", renderPlaces);

    document.querySelector("#place-filter")
      .addEventListener("change", renderPlaces);

    document.querySelector("#show-saved")
      .addEventListener("click", () => {
        showingSavedOnly = !showingSavedOnly;
        renderPlaces();
      });
  }

  const wildlifeFilter = document.querySelector("#wildlife-filter");

  if (wildlifeFilter) {
    renderWildlife();
    wildlifeFilter.addEventListener("change", renderWildlife);
  }

  const interestForm = document.querySelector("#interest-form");

  if (interestForm) {
    interestForm.addEventListener("submit", handleInterestSubmit);

    try {
      const previousInterest = localStorage.getItem(interestStorageKey);
      const interestSelect = document.querySelector("#interest");

      if (previousInterest && interestSelect) {
        interestSelect.value = previousInterest;
      }
    } catch (error) {
      // The form works even if browser storage is unavailable.
    }
  }
}

document.addEventListener("DOMContentLoaded", initializePage);