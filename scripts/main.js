document.addEventListener("DOMContentLoaded", () => {
    const header = document.querySelector(".header");
    const examplesTabsBtns = document.querySelector(".examples__btns");
    const examplesItem = document.querySelectorAll(".examples__item-slider");
    const body = document.querySelector("body");
    const priceTabsBtns = document.querySelector(".price__btns");
    const teamTabsBtns = document.querySelector(".team__btns");
    const locationBtn = document.querySelector(".location__btn");
    const showMoreBtns = document.querySelectorAll(".show-more");

    const showMore = (contentBlock) => {
        document.querySelectorAll(`.${contentBlock}`).forEach(element => {
            element.classList.add("active");
        });
    }

    showMoreBtns.forEach(showMoreBtn => {
        showMoreBtn.addEventListener("click", event => {
            if(event.target.classList.contains("examples__btn")) {
                showMore("examples__content");
            }
            if(event.target.classList.contains("price__btn")) {
                showMore("price__content");
            }
        });
    });

    locationBtn.addEventListener("click", () => {
        const locationInfo = document.querySelector(".header__inner_tel .location__info");

        locationBtn.classList.toggle("active");
        locationInfo.classList.toggle("active");
        if (locationBtn.classList.contains("active")) {
            header.classList.add("dark-bg");
        } else {
            header.classList.remove("dark-bg");
        }
    });

    let swiperExamples = new Swiper(".examples__item-slider", {
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev"
        },
        loop: true
    });

    let teamSwiper = new Swiper(".mySwiper.team__content", {
        slidesPerView: 3,
        slidesPerGroup: 3,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        navigation: {
            nextEl: ".swiper-next-team",
            prevEl: ".swiper-prev-team"
        },
        breakpoints: {
            320: {
                slidesPerView: 1,
                slidesPerGroup: 1
            },
            650: {
                slidesPerView: 2,
                slidesPerGroup: 2
            },
            1200: {
                slidesPerView: 3,
                slidesPerGroup: 3
            }
        }
    });

    let documentsSwiper = new Swiper(".mySwiper.documents__content", {
        slidesPerView: 3,
        slidesPerGroup: 3,
        spaceBetween: 20,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        navigation: {
            nextEl: ".swiper-next-doc",
            prevEl: ".swiper-prev-doc"
        },
        breakpoints: {
            320: {
                slidesPerView: 1,
                slidesPerGroup: 1
            },
            600: {
                slidesPerView: 2,
                slidesPerGroup: 2
            },
            1200: {
                slidesPerView: 3,
                slidesPerGroup: 3
            }
        }
    });

    let reviewsSwiper = new Swiper(".mySwiper.reviews__content", {
        slidesPerView: 3,
        slidesPerGroup: 3,
        spaceBetween: 20,
        loop: true,
        navigation: {
            nextEl: ".swiper-next-rev",
            prevEl: ".swiper-prev-rev"
        },
        breakpoints: {
            320: {
                slidesPerView: 1,
                slidesPerGroup: 1
            },
            600: {
                slidesPerView: 2,
                slidesPerGroup: 2
            },
            1200: {
                slidesPerView: 3,
                slidesPerGroup: 3
            }
        }
    });

    const switchTabs = (event, tabBtns, content) => {
        const tabID = event.target.dataset.tab;
        const currentContent = document.getElementById(tabID);
        const btns = document.querySelectorAll(`.${tabBtns}`);
        const contentBlocks = document.querySelectorAll(`.${content}`);

        btns.forEach(btn => {
            btn.classList.remove("active");
            contentBlocks.forEach(contentBlock => {
                contentBlock.classList.remove("active");
            });
        });

        if (!event.target.classList.contains("active")) {
            event.target.classList.add("active");
            currentContent.classList.add("active");
        }
    };

    examplesTabsBtns.addEventListener("click", (event) => {
        switchTabs(event, "examples__btn", "examples__content");
    });

    priceTabsBtns.addEventListener("click", (event) => {
        switchTabs(event, "price__btn", "price__content");
    });

    teamTabsBtns.addEventListener("click", (event) => {
        switchTabs(event, "team__btn", "team__content");
    });

    examplesItem.forEach(element => {
        element.addEventListener("click", event => {
            const close = document.querySelector(".examples-close");
            const item = event.target.parentNode.parentNode;
            const examplesSection = document.querySelector(".examples");


            if (!event.target.classList.contains("swiper-button-next")
                && !event.target.classList.contains("swiper-button-prev")) {
                examplesSection.classList.add("active");
                item.classList.add("active");
                body.style.overflow = "hidden";
                close.style.display = "block";
            }

            close.addEventListener("click", () => {
                examplesSection.classList.remove("active");
                item.classList.remove("active");
                body.style.overflowY = "auto";
                body.style.overflowX = "hidden";
                close.style.display = "none";
            });
        });
    });

    const smoothScroll = () => {
        const smoothLinks = document.querySelectorAll("a[href^='#']");

        smoothLinks.forEach(smoothLink => {
            smoothLink.addEventListener("click", event => {
                event.preventDefault();
                const id = smoothLink.getAttribute("href");

                document.querySelector(id).scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            })
        })
    };

    smoothScroll();

    const telMask = () => {
        let eventCalllback = function (e) {

            let el = e.target,
                clearVal = el.dataset.phoneClear,
                pattern = el.dataset.phonePattern,
                matrix_def = "+7(___) ___-__-__",
                matrix = pattern ? pattern : matrix_def,
                i = 0,
                def = matrix.replace(/\D/g, ""),
                val = e.target.value.replace(/\D/g, "");

            if (clearVal !== "false" && e.type === "blur") {
                if (val.length < matrix.match(/([\_\d])/g).length) {
                    e.target.value = "";
                    return;
                }
            }
            if (def.length >= val.length) val = def;
            e.target.value = matrix.replace(/./g, function (a) {
                return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? "" : a
            });
        }

        let phone_inputs = document.querySelectorAll("[data-phone-pattern]");
        for (let elem of phone_inputs) {
            for (let ev of ["input", "blur", "focus"]) {
                elem.addEventListener(ev, eventCalllback);
            }
        }
    }

    telMask();
});
