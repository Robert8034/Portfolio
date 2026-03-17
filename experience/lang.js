(function () {
    "use strict";
    var currentLang = "nl";
    var toggle = document.getElementById("langToggle");

    function applyLanguage(lang) {
        currentLang = lang;
        document.documentElement.lang = lang;
        document.querySelectorAll("[data-nl][data-en]").forEach(function (el) {
            el.textContent = el.getAttribute("data-" + lang);
        });
        toggle.textContent = lang === "nl" ? "EN" : "NL";
    }

    toggle.addEventListener("click", function () {
        applyLanguage(currentLang === "nl" ? "en" : "nl");
    });

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
})();
