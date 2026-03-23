(function () {
    "use strict";

    // ---------- LANGUAGE TOGGLE ----------
    var currentLang = "nl";
    var toggle = document.getElementById("langToggle");

    function applyLanguage(lang) {
        currentLang = lang;
        document.documentElement.lang = lang;

        document.querySelectorAll("[data-nl][data-en]").forEach(function (el) {
            el.textContent = el.getAttribute("data-" + lang);
        });

        document.querySelectorAll("[data-nl-placeholder][data-en-placeholder]").forEach(function (el) {
            el.placeholder = el.getAttribute("data-" + lang + "-placeholder");
        });

        toggle.textContent = lang === "nl" ? "EN" : "NL";

        // Re-render sprint check feedback if visible
        renderCheckFeedback();
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
                entry.target.classList.add("visible");
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    document.querySelectorAll(".reveal").forEach(function (el) {
        revealObserver.observe(el);
    });

    // ---------- SCROLL PROGRESS BAR ----------
    var scrollProgress = document.getElementById("scrollProgress");

    if (scrollProgress) {
        window.addEventListener("scroll", function () {
            var scrollTop = document.documentElement.scrollTop;
            var scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            var pct = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
            scrollProgress.style.width = pct + "%";
        });
    }

    // ---------- PRINT / PDF DOWNLOAD ----------
    var printBtn = document.getElementById("printBtn");
    var printBtnFooter = document.getElementById("printBtnFooter");

    function triggerPrint() {
        window.print();
    }

    if (printBtn) printBtn.addEventListener("click", triggerPrint);
    if (printBtnFooter) printBtnFooter.addEventListener("click", triggerPrint);

    // ---------- VERTICAL TIMELINE EXPAND/COLLAPSE ----------
    document.querySelectorAll(".vtl-expand-btn").forEach(function (btn) {
        btn.addEventListener("click", function () {
            var entry = btn.closest(".vtl-entry");
            entry.classList.toggle("expanded");
        });
    });

    // ---------- NAV SCROLL-SPY ----------
    var spyLinks = document.querySelectorAll(".nav-links a[href^='#']");
    var spySections = [];

    spyLinks.forEach(function (link) {
        var id = link.getAttribute("href").slice(1);
        var section = document.getElementById(id);
        if (section) spySections.push({ el: section, link: link });
    });

    if (spySections.length) {
        var spyObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                var match = spySections.find(function (s) { return s.el === entry.target; });
                if (match) {
                    match.link.classList.toggle("active", entry.isIntersecting);
                }
            });
        }, { threshold: 0.3 });

        spySections.forEach(function (s) { spyObserver.observe(s.el); });
    }

    // ---------- SPRINT HEALTH CHECK ----------
    var answers = {};
    var totalQuestions = 6;
    var checkResult = document.getElementById("checkResult");
    var checkScoreNumber = document.getElementById("checkScoreNumber");
    var checkFeedback = document.getElementById("checkFeedback");

    var feedbackTexts = {
        low: {
            nl: "Er is ruimte voor groei. Een ervaren Scrum Master kan helpen om structuur en focus te brengen.",
            en: "There's room to grow. An experienced Scrum Master can help bring structure and focus."
        },
        mid: {
            nl: "Goede basis, maar er zijn verbeterpunten. Gerichte coaching kan het verschil maken.",
            en: "Good foundation, but there are areas to improve. Targeted coaching can make the difference."
        },
        high: {
            nl: "Sterk team! Continu verbeteren is de sleutel om dat vast te houden.",
            en: "Strong team! Continuous improvement is key to sustaining that."
        }
    };

    function renderCheckFeedback() {
        if (!answers) return;
        var answered = Object.keys(answers).length;
        if (answered < totalQuestions) return;

        var score = 0;
        for (var key in answers) {
            if (answers[key] === "yes") score++;
        }

        checkScoreNumber.textContent = score;
        checkResult.hidden = false;

        var tier = score <= 2 ? "low" : score <= 4 ? "mid" : "high";
        checkFeedback.textContent = feedbackTexts[tier][currentLang];
    }

    document.querySelectorAll(".check-btn").forEach(function (btn) {
        btn.addEventListener("click", function () {
            var question = btn.closest(".check-question");
            var qIndex = question.getAttribute("data-q");
            var answer = btn.getAttribute("data-answer");

            // Clear previous selection in this question
            question.querySelectorAll(".check-btn").forEach(function (b) {
                b.classList.remove("selected");
            });

            btn.classList.add("selected");
            answers[qIndex] = answer;

            renderCheckFeedback();
        });
    });

})();
