// HEADER

const header = document.querySelector(".header");
const menuToggle = document.querySelector(".menu-toggle");

if (header && menuToggle) {
    function handleScroll() {
        const isScrolled = window.scrollY > 50;

        header.classList.toggle("scrolled", isScrolled);

        if (!isScrolled) {
            header.classList.remove("menu-open");
            menuToggle.setAttribute("aria-expanded", "false");
        }
    }

    function handleMenuToggle() {
        const isOpen = header.classList.toggle("menu-open");

        menuToggle.setAttribute("aria-expanded", String(isOpen));
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    menuToggle.addEventListener("click", handleMenuToggle);

    handleScroll();
}


// CAROUSEL

const recommendations = document.querySelector(".recommendations");

if (recommendations) {
    const track = recommendations.querySelector(".recommendations__track");
    const cards = recommendations.querySelectorAll(".recommendation-card");
    const prevButton = recommendations.querySelector(
        ".recommendations__arrow--prev"
    );
    const nextButton = recommendations.querySelector(
        ".recommendations__arrow--next"
    );
    const dots = recommendations.querySelectorAll(".recommendations__dot");

    let currentIndex = 0;

    function showRecommendation(index) {
        if (!track || cards.length === 0) {
            return;
        }

        currentIndex = (index + cards.length) % cards.length;

        track.style.transform = `translateX(-${currentIndex * 100}%)`;

        cards.forEach((card, cardIndex) => {
            card.classList.toggle(
                "is-active",
                cardIndex === currentIndex
            );
        });

        dots.forEach((dot, dotIndex) => {
            const isActive = dotIndex === currentIndex;

            dot.classList.toggle("is-active", isActive);
            dot.setAttribute("aria-current", String(isActive));
        });
    }

    function handlePrevClick() {
        showRecommendation(currentIndex - 1);
    }

    function handleNextClick() {
        showRecommendation(currentIndex + 1);
    }

    function handleDotClick(index) {
        showRecommendation(index);
    }

    if (prevButton) {
        prevButton.addEventListener("click", handlePrevClick);
    }

    if (nextButton) {
        nextButton.addEventListener("click", handleNextClick);
    }

    dots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
            handleDotClick(index);
        });
    });

    showRecommendation(0);
}


// SHOP FILTERS

const inventory = document.querySelector(".inventory");

if (inventory) {
    const filters = Array.from(
        inventory.querySelectorAll(
            '.inventory-filters input[type="checkbox"]'
        )
    );

    const products = inventory.querySelectorAll(".product-card");

    function handleFilterChange() {
        const selectedRoasts = filters
            .filter(filter => filter.checked && filter.name === "roast")
            .map(filter => filter.value);

        const selectedRegions = filters
            .filter(filter => filter.checked && filter.name === "region")
            .map(filter => filter.value);

        products.forEach(product => {
            const roast = product.dataset.roast;
            const region = product.dataset.region;

            // Oculta los productos que no tienen datos de café
            // cuando hay algún filtro seleccionado.
            if (!roast && !region) {
                product.style.display =
                    selectedRoasts.length === 0 &&
                    selectedRegions.length === 0
                        ? ""
                        : "none";

                return;
            }

            const matchesRoast =
                selectedRoasts.length === 0 ||
                selectedRoasts.includes(roast);

            const matchesRegion =
                selectedRegions.length === 0 ||
                selectedRegions.includes(region);

            product.style.display =
                matchesRoast && matchesRegion ? "" : "none";
        });
    }

    filters.forEach(filter => {
        filter.addEventListener("change", handleFilterChange);
    });

    handleFilterChange();
}

// TRANSICIONES DE SCROLL

const elementos = document.querySelectorAll('.transicionScroll');

const observador = new IntersectionObserver((entradas) => {
    entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
            entrada.target.classList.add('visible');
        } else {
            entrada.target.classList.remove('visible');
        }
    });
}, {
    threshold: 0.15
});

elementos.forEach((elemento) => {
    observador.observe(elemento);
});
