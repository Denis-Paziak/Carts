const swiper = new Swiper('.swiper-carts', {
    slidesPerView: 1,
    spaceBetween: 20,
    centeredSlides: true,
    initialSlide: 1,
    keyboard: {
        enabled: true,
        onlyInViewport: false,
    },
    breakpoints: {
        767: {
            slidesPerView: 2,
        },
        991: {
            slidesPerView: 3,
        },
    },

    autoplay: {
        delay: 10000,
    },
});

AOS.init({
    duration: 1000
});

const menuBut = document.querySelector(".menu-but"),
    menu = document.querySelector(".menu"),
    menuItems = document.querySelectorAll(".menu .menu__item");

menuItems.forEach(el => {
    el.addEventListener("click", closeMenu);
});

menuBut.addEventListener("click", () => {
    if (menu.classList.contains("active")) {
        closeMenu();
    } else {
        openMenu();
    }
});

function openMenu() {
    if (!menu.classList.contains("active")) {
        menu.classList.add("active");
        menuBut.classList.add("active");
        document.body.style.overflow = "hidden";
    }

}

function closeMenu() {
    if (menu.classList.contains("active")) {
        menu.classList.remove("active");
        menuBut.classList.remove("active");
        document.body.style.overflow = "";
    }

}