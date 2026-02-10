document.addEventListener('DOMContentLoaded', () => {
    init();
});

function init() {
    renderHeader();
    renderFooter();
    renderPageContent();
}

function renderHeader() {
    const headerHTML = `
        <div class="container">
            <nav>
                <a href="index.html" class="logo">Abhinath <span>Caters</span></a>
                <ul class="nav-links">
                    <li><a href="index.html">Home</a></li>
                    <li><a href="services.html">Services & Menu</a></li>
                    <li><a href="about.html">About Us</a></li>
                    <li><a href="contact.html">Contact</a></li>
                </ul>
                <div class="burger">
                    <i class="fas fa-bars"></i>
                </div>
            </nav>
        </div>
    `;
    document.querySelector('header').innerHTML = headerHTML;

    // Highlight active link
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        }
    });

    // Mobile Menu Toggle based on burger click
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');

    if (burger && nav) {
        burger.addEventListener('click', () => {
            nav.classList.toggle('nav-active');

            // Toggle Burger Animation
            burger.classList.toggle('toggle');
        });
    }
}

function renderFooter() {
    const { contact, businessName } = SITE_DATA;
    const footerHTML = `
        <div class="container footer-content">
            <h3>${businessName}</h3>
            <p>${SITE_DATA.tagline}</p>
            <div style="margin-top: 20px;">
                <p><i class="fas fa-phone"></i> ${contact.phone}</p>
                <p><i class="fas fa-envelope"></i> ${contact.email}</p>
            </div>
        </div>
        <div class="footer-bottom">
            <div class="container">
                &copy; ${new Date().getFullYear()} ${businessName}. All Rights Reserved.
            </div>
        </div>
    `;
    document.querySelector('footer').innerHTML = footerHTML;
}

function renderPageContent() {
    // Home Page
    const heroSection = document.getElementById('hero');
    if (heroSection) {
        heroSection.style.backgroundImage = `url('assets/${SITE_DATA.heroImage}')`;
        heroSection.innerHTML = `
            <div class="hero-content">
                <h1>${SITE_DATA.businessName}</h1>
                <p>${SITE_DATA.tagline}</p>
                <a href="services.html" class="btn">View Menu</a>
                <a href="contact.html" class="btn btn-outline" style="border-color: white; color: white;">Contact Us</a>
            </div>
        `;
    }

    // Services & Menu Page
    const servicesGrid = document.querySelector('.services-grid');
    if (servicesGrid) {
        SITE_DATA.services.forEach(service => {
            const card = document.createElement('div');
            card.className = 'service-card';
            card.innerHTML = `
                <div class="service-icon"><i class="fas fa-concierge-bell"></i></div>
                <h3>${service.title}</h3>
                <p>${service.description}</p>
            `;
            servicesGrid.appendChild(card);
        });

        const menuContainer = document.querySelector('.menu-items');
        const tabContainer = document.querySelector('.menu-tabs');

        if (menuContainer && tabContainer) {
            // Render Tabs
            SITE_DATA.menu.forEach((category, index) => {
                const button = document.createElement('button');
                button.className = `tab-btn ${index === 0 ? 'active' : ''}`;
                button.textContent = category.category;
                button.onclick = () => filterMenu(index);
                tabContainer.appendChild(button);
            });

            // Render Initial Menu
            renderMenu(0);
        }
    }

    // About Page
    const aboutSection = document.querySelector('.about-text');
    if (aboutSection) {
        aboutSection.innerHTML = `
            <h2>${SITE_DATA.about.title}</h2>
            <p>${SITE_DATA.about.description}</p>
            <h3>Why Choose Us?</h3>
            <ul style="list-style: none; margin-top: 10px;">
                <li><i class="fas fa-check" style="color: var(--secondary-color); margin-right: 10px;"></i> Premium Quality Ingredients</li>
                <li><i class="fas fa-check" style="color: var(--secondary-color); margin-right: 10px;"></i> Experienced Chefs</li>
                <li><i class="fas fa-check" style="color: var(--secondary-color); margin-right: 10px;"></i> Elegant Presentation</li>
                <li><i class="fas fa-check" style="color: var(--secondary-color); margin-right: 10px;"></i> Customized Menus</li>
            </ul>
        `;
    }

    // Contact Page
    const contactInfo = document.querySelector('.contact-info-container');
    if (contactInfo) {
        const { contact } = SITE_DATA;
        contactInfo.innerHTML = `
            <div class="contact-info-block">
                <h4>Address</h4>
                <p>${contact.address}</p>
            </div>
            <div class="contact-info-block">
                <h4>Phone</h4>
                <p>${contact.phone}</p>
            </div>
            <div class="contact-info-block">
                <h4>Email</h4>
                <p>${contact.email}</p>
            </div>
            <div class="contact-info-block">
                <h4>WhatsApp</h4>
                <a href="https://wa.me/${contact.whatsapp.replace(/[^0-9]/g, '')}" class="btn" style="padding: 8px 16px; font-size: 0.9rem;">Chat on WhatsApp</a>
            </div>
        `;
    }
}

function filterMenu(index) {
    // Update Active Tab
    document.querySelectorAll('.tab-btn').forEach((btn, i) => {
        if (i === index) btn.classList.add('active');
        else btn.classList.remove('active');
    });
    renderMenu(index);
}

function renderMenu(index) {
    const menuContainer = document.querySelector('.menu-items');
    menuContainer.innerHTML = '';

    const category = SITE_DATA.menu[index];
    category.items.forEach(item => {
        const itemEl = document.createElement('div');
        itemEl.className = 'menu-item';
        itemEl.innerHTML = `
            <div class="item-details">
                <h4>${item.name}</h4>
                <p>${item.description}</p>
            </div>
            <div class="item-price">${item.price}</div>
        `;
        menuContainer.appendChild(itemEl);
    });
}
