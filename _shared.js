// ── Header scroll ──────────────────────────────────────────────────────
const header = document.getElementById('site-header');
const annBar = document.querySelector('.announcement-bar');

if (header) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 80) {
            header.classList.add('scrolled');
            if (annBar) annBar.style.display = 'none';
        } else {
            header.classList.remove('scrolled');
            if (annBar) annBar.style.display = '';
        }
    }, { passive: true });
}

// ── Reveal ────────────────────────────────────────────────────────────
function doReveal() {
    document.querySelectorAll('.reveal').forEach(el => {
        if (el.getBoundingClientRect().top < window.innerHeight - 60) {
            el.classList.add('visible');
        }
    });
}
window.addEventListener('scroll', doReveal, { passive: true });
// Run once on load
doReveal();

// ── Search ────────────────────────────────────────────────────────────
const searchBtn = document.getElementById('search-btn');
const searchOverlay = document.getElementById('search-overlay');
const searchCloseBtn = document.getElementById('search-close');
const searchFieldEl = document.getElementById('search-field');

if (searchBtn && searchOverlay) {
    searchBtn.addEventListener('click', () => {
        searchOverlay.classList.add('open');
        setTimeout(() => { if (searchFieldEl) searchFieldEl.focus() }, 300);
    });
    if (searchCloseBtn) {
        searchCloseBtn.addEventListener('click', () => searchOverlay.classList.remove('open'));
    }
}

// ── Mobile Nav ────────────────────────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobile-nav');
const mobileClose = document.getElementById('mobile-close');

if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => mobileNav.classList.add('open'));
    if (mobileClose) {
        mobileClose.addEventListener('click', () => mobileNav.classList.remove('open'));
    }
}

// ── Esc close ─────────────────────────────────────────────────────────
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
        if (searchOverlay) searchOverlay.classList.remove('open');
        if (mobileNav) mobileNav.classList.remove('open');
    }
});

// ── Parallax hero bg ──────────────────────────────────────────────────
const heroBg = document.getElementById('hero-bg');
if (heroBg) {
    window.addEventListener('scroll', () => {
        heroBg.style.transform = `translateY(${window.scrollY * .3}px)`;
    }, { passive: true });
}

// ── Home Product Filter ───────────────────────────────────────────────
window.filterHomeProducts = function(category) {
    if (category === 'all') {
        window.location.href = 'shop.html';
        return;
    }

    // Safely find the target button
    let targetBtn = null;
    const btns = document.querySelectorAll('.filter-tab-btn');
    for (let b of btns) {
        if (b.getAttribute('onclick') && b.getAttribute('onclick').includes("'" + category + "'")) {
            targetBtn = b;
            break;
        }
    }

    // Update active button
    const buttons = document.querySelectorAll('.filter-tab-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    
    if (targetBtn) {
        targetBtn.classList.add('active');
    }

    // Filter products
    const products = document.querySelectorAll('#home-filtered-products .product-card');
    products.forEach(prod => {
        if (prod.classList.contains('prod-' + category)) {
            prod.style.display = 'block';
            // re-trigger animation
            prod.classList.remove('visible');
            setTimeout(() => {
                prod.classList.add('visible');
            }, 50);
        } else {
            prod.style.display = 'none';
        }
    });
};

// Initialize filter on page load if grid exists
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('home-filtered-products')) {
        const activeBtn = document.querySelector('.filter-tab-btn.active');
        if (activeBtn && activeBtn.getAttribute('onclick')) {
            const match = activeBtn.getAttribute('onclick').match(/'([^']+)'/);
            if (match && match[1] !== 'all') {
                filterHomeProducts(match[1]);
            }
        } else {
            filterHomeProducts('oud');
        }
    }
});

// ── Sliders ──────────────────────────────────────────────────────────
window.scrollSlider = function(btn, dir) {
    const wrapper = btn.closest('.product-slider-wrapper');
    if (wrapper) {
        const slider = wrapper.querySelector('.product-slider');
        if (slider) {
            const scrollAmount = slider.clientWidth * 0.8;
            slider.scrollBy({ left: dir * scrollAmount, behavior: 'smooth' });
        }
    }
};
