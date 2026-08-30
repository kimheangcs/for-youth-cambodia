/*!
   * Color mode toggler for Bootstrap's docs (https://getbootstrap.com/)
   * Copyright 2011-2025 The Bootstrap Authors
   * Licensed under the Creative Commons Attribution 3.0 Unported License.
   */

(() => {
    'use strict'

    const getStoredTheme = () => localStorage.getItem('theme')
    const setStoredTheme = theme => localStorage.setItem('theme', theme)

    const getPreferredTheme = () => {
        const storedTheme = getStoredTheme()
        if (storedTheme) {
            return storedTheme
        }
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    }

    const setTheme = theme => {
        if (theme === 'auto') {
            document.documentElement.setAttribute('data-bs-theme',
                (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'))
        } else {
            document.documentElement.setAttribute('data-bs-theme', theme)
        }
    }

    setTheme(getPreferredTheme())

    const showActiveTheme = (theme, focus = false) => {
        const themeSwitcher = document.querySelector('#bd-theme')
        if (!themeSwitcher) {
            return
        }
        const themeSwitcherText = document.querySelector('#bd-theme-text')
        const activeThemeIcon = document.querySelector('.theme-icon-active use')
        const btnToActive = document.querySelector(`[data-bs-theme-value="${theme}"]`)
        const svgOfActiveBtn = btnToActive.querySelector('svg use').getAttribute('href')

        document.querySelectorAll('[data-bs-theme-value]').forEach(element => {
            element.classList.remove('active')
            element.setAttribute('aria-pressed', 'false')
        })

        btnToActive.classList.add('active')
        btnToActive.setAttribute('aria-pressed', 'true')
        activeThemeIcon.setAttribute('href', svgOfActiveBtn)
        const themeSwitcherLabel = `${themeSwitcherText.textContent} (${btnToActive.dataset.bsThemeValue})`
        themeSwitcher.setAttribute('aria-label', themeSwitcherLabel)

        if (focus) {
            themeSwitcher.focus()
        }
    }

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
        const storedTheme = getStoredTheme()
        if (storedTheme !== 'light' && storedTheme !== 'dark') {
            setTheme(getPreferredTheme())
        }
    })

    window.addEventListener('DOMContentLoaded', () => {
        showActiveTheme(getPreferredTheme())
        document.querySelectorAll('[data-bs-theme-value]')
            .forEach(toggle => {
                toggle.addEventListener('click', () => {
                    const theme = toggle.getAttribute('data-bs-theme-value')
                    setStoredTheme(theme)
                    setTheme(theme)
                    showActiveTheme(theme, true)
                })
            })
    })
})()

// Custom two toggle system
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");
const themeToggle2 = document.getElementById("themeToggle2");
const themeIcon2 = document.getElementById("themeIcon2");
const body = document.body;
let rotation = 0;

// Load saved theme
const savedTheme = localStorage.getItem("theme") || "light";
setThemeCustom(savedTheme);

themeToggle.addEventListener("click", toggleTheme);
themeToggle2.addEventListener("click", toggleTheme);

function toggleTheme() {
    const currentTheme = body.getAttribute("data-bs-theme");
    const newTheme = currentTheme === "light" ? "dark" : "light";
    setThemeCustom(newTheme);
}

function setThemeCustom(theme) {
    body.setAttribute("data-bs-theme", theme);
    localStorage.setItem("theme", theme);

    const logo = document.getElementById("logo");

    // Rotate both icons
    rotation += 180;
    themeIcon.style.transform = `rotate(${rotation}deg)`;
    themeIcon2.style.transform = `rotate(${rotation}deg)`;

    // Change icons + logo
    if (theme === "light") {
        themeIcon.className = "bi bi-brightness-high-fill icon-animate";
        themeIcon2.className = "bi bi-brightness-high-fill icon-animate";
        logo.src = "../../image/project-logo/logo01.png";
    } else {
        themeIcon.className = "bi bi-moon-fill icon-animate";
        themeIcon2.className = "bi bi-moon-fill icon-animate";
        logo.src = "../../image/project-logo/logo02.png";
    }
}

AOS.init({
    disable: 'mobile', // disables AOS on phones & tablets
    duration: 800, // animation duration
    once: true // animate only once when scrolling
});

const topModal = document.getElementById('topModal');
topModal.addEventListener('shown.bs.modal', () => {
    setTimeout(() => {
        const modalInstance = bootstrap.Modal.getInstance(topModal);
        modalInstance.hide();
    }, 300); // 300ms = 0.3 seconds
});
document.addEventListener("DOMContentLoaded", function () {
    const autoCloseModals = document.querySelectorAll(".auto-close");

    autoCloseModals.forEach(modalEl => {
        modalEl.addEventListener("shown.bs.modal", function () {
            setTimeout(() => {
                const modal = bootstrap.Modal.getInstance(modalEl);
                if (modal) modal.hide();
            }, 1000);
        });
    });
});