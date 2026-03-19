(function () {
    "use strict";

    // ---------- LANGUAGE TOGGLE ----------
    var currentLang = "nl";
    var toggle = document.getElementById("langToggle");

    function applyLanguage(lang) {
        currentLang = lang;
        document.documentElement.lang = lang;

        // Update text content
        document.querySelectorAll("[data-nl][data-en]").forEach(function (el) {
            el.textContent = el.getAttribute("data-" + lang);
        });

        // Update placeholders
        document.querySelectorAll("[data-nl-placeholder][data-en-placeholder]").forEach(function (el) {
            el.placeholder = el.getAttribute("data-" + lang + "-placeholder");
        });

        // Toggle button shows the OTHER language
        toggle.textContent = lang === "nl" ? "EN" : "NL";
    }

    toggle.addEventListener("click", function () {
        applyLanguage(currentLang === "nl" ? "en" : "nl");
    });

    // Apply default language on load
    applyLanguage(currentLang);

    // ---------- THEME TOGGLE ----------
    var themeToggle = document.getElementById("themeToggle");
    var savedTheme = localStorage.getItem("theme") ||
        (window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");

    function applyTheme(theme) {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
        themeToggle.innerHTML = theme === "dark"
            ? '<span class="material-symbols-outlined">light_mode</span>'
            : '<span class="material-symbols-outlined">dark_mode</span>';
    }

    themeToggle.addEventListener("click", function () {
        var current = document.documentElement.getAttribute("data-theme");
        applyTheme(current === "dark" ? "light" : "dark");
    });

    applyTheme(savedTheme);

    // ---------- HAMBURGER MENU ----------
    var hamburger = document.getElementById("navHamburger");
    var navLinks = document.getElementById("navLinks");

    if (hamburger && navLinks) {
        hamburger.addEventListener("click", function () {
            hamburger.classList.toggle("active");
            navLinks.classList.toggle("open");
        });

        navLinks.querySelectorAll("a").forEach(function (link) {
            link.addEventListener("click", function () {
                hamburger.classList.remove("active");
                navLinks.classList.remove("open");
            });
        });
    }

    // ---------- SCROLL ANIMATIONS ----------
    var revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    document.querySelectorAll('.reveal').forEach(function (el) {
        revealObserver.observe(el);
    });

    // ---------- RESULTS BAR ANIMATION ----------
    var resultsSection = document.querySelector('.results');
    if (resultsSection) {
        var barObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.querySelectorAll('.result-bar').forEach(function (bar) {
                        bar.classList.add('animated');
                    });
                    barObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        barObserver.observe(resultsSection);
    }

    // ---------- CONTACT FORM ----------
    var form = document.getElementById("contactForm");
    var thanks = document.getElementById("formThanks");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        var data = new FormData(form);

        fetch(form.action, {
            method: "POST",
            body: data,
            headers: { "Accept": "application/json" }
        })
        .then(function (response) {
            if (response.ok) {
                form.reset();
                form.hidden = true;
                thanks.hidden = false;
                applyLanguage(currentLang);
            } else {
                alert(currentLang === "nl"
                    ? "Er ging iets mis. Probeer het later opnieuw."
                    : "Something went wrong. Please try again later.");
            }
        })
        .catch(function () {
            alert(currentLang === "nl"
                ? "Er ging iets mis. Probeer het later opnieuw."
                : "Something went wrong. Please try again later.");
        });
    });
})();
