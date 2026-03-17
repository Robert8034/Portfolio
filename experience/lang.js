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
})();
