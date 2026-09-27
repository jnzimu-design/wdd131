const temples = [
    {
        templeName: "Aba Nigeria",
        location: "Aba, Nigeria",
        dedicated: "2005, August, 7",
        area: 11500,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
    },
    {
        templeName: "Manti Utah",
        location: "Manti, Utah, United States",
        dedicated: "1888, May, 21",
        area: 74792,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
    },
    {
        templeName: "Payson Utah",
        location: "Payson, Utah, United States",
        dedicated: "2015, June, 7",
        area: 96630,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
    },
    {
        templeName: "Yigo Guam",
        location: "Yigo, Guam",
        dedicated: "2020, May, 2",
        area: 6861,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
    },
    {
        templeName: "Washington D.C.",
        location: "Kensington, Maryland, United States",
        dedicated: "1974, November, 19",
        area: 156558,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
    },
    {
        templeName: "Lima Perú",
        location: "Lima, Perú",
        dedicated: "1986, January, 10",
        area: 9600,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
    },
    {
        templeName: "Mexico City Mexico",
        location: "Mexico City, Mexico",
        dedicated: "1983, December, 2",
        area: 116642,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
    },

    // Three additional temples
    {
        templeName: "Accra Ghana",
        location: "Accra, Ghana",
        dedicated: "2004, January, 11",
        area: 17500,
        imageUrl:
            "https://www.churchofjesuschrist.org/media/image/accra-ghana-temple-lds-fac2f82?lang=eng"
    },
    {
        templeName: "Salt Lake Utah",
        location: "Salt Lake City, Utah, United States",
        dedicated: "1893, April, 6",
        area: 253000,
        imageUrl:
            "https://www.churchofjesuschrist.org/media/image/salt-lake-temple-e04d565?lang=eng"
    },
    {
        templeName: "Rome Italy",
        location: "Rome, Italy",
        dedicated: "2019, March, 10",
        area: 41010,
        imageUrl:
            "https://www.churchofjesuschrist.org/media/image/rome-italy-temple-bf73f13?lang=eng"
    }
];

const templeContainer = document.querySelector("#temple-container");
const menuButton = document.querySelector("#menu-button");
const navMenu = document.querySelector("#nav-menu");
const filterLinks = document.querySelectorAll("[data-filter]");

// Get the year from the dedication string.
function getYear(dedicated) {
    return Number(dedicated.split(",")[0]);
}

// Format the dedication date.
function formatDate(dedicated) {
    const parts = dedicated.split(",").map(part => part.trim());

    const year = Number(parts[0]);
    const month = parts[1];
    const day = Number(parts[2]);

    return `${month} ${day}, ${year}`;
}

// Create one temple card.
function createTempleCard(temple) {
    const card = document.createElement("article");
    card.classList.add("temple-card");

    const name = document.createElement("h2");
    name.textContent = temple.templeName;

    const location = document.createElement("p");
    location.innerHTML = `<strong>Location:</strong> ${temple.location}`;

    const dedicated = document.createElement("p");
    dedicated.innerHTML =
        `<strong>Dedicated:</strong> ${formatDate(temple.dedicated)}`;

    const area = document.createElement("p");
    area.innerHTML =
        `<strong>Area:</strong> ${temple.area.toLocaleString()} sq ft`;

    const image = document.createElement("img");
    image.src = temple.imageUrl;
    image.alt = `${temple.templeName} temple`;
    image.loading = "lazy";
    image.width = 400;
    image.height = 250;

    card.appendChild(name);
    card.appendChild(location);
    card.appendChild(dedicated);
    card.appendChild(area);
    card.appendChild(image);

    return card;
}

// Display temple cards.
function displayTemples(templeList) {
    templeContainer.innerHTML = "";

    templeList.forEach(temple => {
        const card = createTempleCard(temple);
        templeContainer.appendChild(card);
    });
}

// Filter the temple array.
function filterTemples(filter) {
    let filteredTemples;

    switch (filter) {
        case "old":
            filteredTemples = temples.filter(
                temple => getYear(temple.dedicated) < 1900
            );
            break;

        case "new":
            filteredTemples = temples.filter(
                temple => getYear(temple.dedicated) > 2000
            );
            break;

        case "large":
            filteredTemples = temples.filter(
                temple => temple.area > 90000
            );
            break;

        case "small":
            filteredTemples = temples.filter(
                temple => temple.area < 10000
            );
            break;

        case "home":
        default:
            filteredTemples = temples;
    }

    displayTemples(filteredTemples);
}

// Navigation filtering.
filterLinks.forEach(link => {
    link.addEventListener("click", event => {
        event.preventDefault();

        const filter = link.dataset.filter;

        filterTemples(filter);

        // Close mobile navigation after selection.
        navMenu.classList.remove("open");
        menuButton.textContent = "☰";
        menuButton.setAttribute("aria-label", "Open navigation menu");
        menuButton.setAttribute("aria-expanded", "false");
    });
});

// Mobile menu.
menuButton.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("open");

    if (isOpen) {
        menuButton.textContent = "✕";
        menuButton.setAttribute("aria-label", "Close navigation menu");
        menuButton.setAttribute("aria-expanded", "true");
    } else {
        menuButton.textContent = "☰";
        menuButton.setAttribute("aria-label", "Open navigation menu");
        menuButton.setAttribute("aria-expanded", "false");
    }
});

// Footer year.
document.querySelector("#currentyear").textContent =
    new Date().getFullYear();

// Footer last modified date.
document.querySelector("#lastModified").textContent =
    `Last Modified: ${document.lastModified}`;

// Display all temples when the page loads.
displayTemples(temples);
