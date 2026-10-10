// HEADER

const header = document.querySelector(".header"); 
const menuToggle = document.querySelector(".menu-toggle");


window.addEventListener("scroll", () => { 
    if (window.scrollY > 50) { 
        header.classList.add("scrolled"); 
    } else { 
        header.classList.remove("scrolled"); 
        header.classList.remove("menu-open"); 
        menuToggle.setAttribute("aria-expanded", "false"); 
    } 
    
});

menuToggle.addEventListener("click", () => { 
    const isOpen = header.classList.toggle("menu-open"); 
    menuToggle.setAttribute("aria-expanded", isOpen); 
});



// CARROUSEL 

const recommendations = document.querySelector(".recommendations");

if (recommendations) {

    const track = recommendations.querySelector(".recommendations__track");
    const cards = recommendations.querySelectorAll(".recommendation-card");
    const prevButton = recommendations.querySelector(".recommendations__arrow--prev");
    const nextButton = recommendations.querySelector(".recommendations__arrow--next");
    const dots = recommendations.querySelectorAll(".recommendations__dot");

    let currentIndex = 0;

    function showRecommendation(index) {

        if (index < 0) {
            currentIndex = cards.length - 1;
        } else if (index >= cards.length) {
            currentIndex = 0;
        } else {
            currentIndex = index;
        }

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
            dot.setAttribute(
                "aria-current",
                isActive ? "true" : "false"
            );

        });
    }

    prevButton.addEventListener("click", () => {
        showRecommendation(currentIndex - 1);
    });

    nextButton.addEventListener("click", () => {
        showRecommendation(currentIndex + 1);
    });

    dots.forEach((dot, index) => {

        dot.addEventListener("click", () => {
            showRecommendation(index);
        });

    });

    showRecommendation(0);
}


// SHOP FILTERS

const inventory = document.querySelector(".inventory");

if (inventory) {

    const filters = inventory.querySelectorAll(
        '.inventory-filters input[type="checkbox"]'
    );

    const products = inventory.querySelectorAll(".product-card");

    filters.forEach(filter => {

        filter.addEventListener("change", () => {

            const selectedRoasts = Array.from(
                inventory.querySelectorAll(
                    'input[name="roast"]:checked'
                )
            ).map(filter => filter.value);

            const selectedRegions = Array.from(
                inventory.querySelectorAll(
                    'input[name="region"]:checked'
                )
            ).map(filter => filter.value);

            products.forEach(product => {

                const roast = product.dataset.roast;
                const region = product.dataset.region;
                const category = product.dataset.category;

                let roastMatch = true;
                let regionMatch = true;


                if (selectedRoasts.length > 0) {

                    roastMatch =
                        roast &&
                        selectedRoasts.includes(roast);
                }

                if (selectedRegions.length > 0) {

                    regionMatch =
                        region &&
                        selectedRegions.includes(region);

                }
                const hasFilterData =
                    product.dataset.roast ||
                    product.dataset.region;

                if (!hasFilterData) {

                    product.style.display = 
                        selectedRoasts.length === 0 &&
                        selectedRegions.length === 0
                            ? ""
                            : "none";

                    return;
                }

                product.style.display =
                    roastMatch && regionMatch
                        ? ""
                        : "none";

            });

        });

    });

}


