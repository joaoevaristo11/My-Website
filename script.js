// Typing Animation Effect
const typingText = document.getElementById('typingText');
const textToType = 'a Computer Engineering student from Portugal';
let charIndex = 0;

function typeText() {
    if (charIndex < textToType.length) {
        typingText.textContent += textToType.charAt(charIndex);
        charIndex++;
        setTimeout(typeText, 80); // Velocidade de escrita (80ms por letra)
    } else {
        // Remove cursor depois de terminar
        setTimeout(() => {
            typingText.style.borderRight = 'none';
        }, 1000);
    }
}

// Inicia a animação após 1 segundo
window.addEventListener('load', () => {
    setTimeout(typeText, 1000);
});

// Tab Navigation System
function opentab(tabname, event) {
    const tablinks = document.getElementsByClassName('tab-links');
    const tabcontents = document.getElementsByClassName('tab-contents');
    
    // Remove active state from all tabs
    for (let tablink of tablinks) {
        tablink.classList.remove('active-link');
        tablink.setAttribute('aria-selected', 'false');
    }
    
    // Hide all tab contents
    for (let tabcontent of tabcontents) {
        tabcontent.classList.remove('active-tab');
        tabcontent.setAttribute('hidden', 'true');
    }
    
    // Activate current tab
    if (event && event.currentTarget) {
        event.currentTarget.classList.add('active-link');
        event.currentTarget.setAttribute('aria-selected', 'true');
    }
    
    // Show current tab content
    const activeTab = document.getElementById(tabname);
    if (activeTab) {
        activeTab.classList.add('active-tab');
        activeTab.removeAttribute('hidden');
    }
}

// Mobile Menu System - Enhanced for Better UX
const sidemenu = document.getElementById('sidemenu');
const menuOverlay = document.getElementById('menu-overlay');
const menuToggle = document.querySelector('.menu-toggle');

function openmenu() {
    sidemenu.style.right = '0';
    menuOverlay.classList.add('active');
    menuOverlay.setAttribute('aria-hidden', 'false');
    document.body.classList.add('menu-open');
    if (menuToggle) {
        menuToggle.setAttribute('aria-expanded', 'true');
    }
    // Prevent body scroll when menu is open
    document.body.style.overflow = 'hidden';
}

function closemenu() {
    sidemenu.style.right = '-250px';
    menuOverlay.classList.remove('active');
    menuOverlay.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('menu-open');
    if (menuToggle) {
        menuToggle.setAttribute('aria-expanded', 'false');
    }
    // Re-enable body scroll
    document.body.style.overflow = 'auto';
}

// Close menu when clicking on a link (Mobile Navigation)
document.querySelectorAll('#sidemenu a').forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 767) {
            closemenu();
        }
    });
});

// Close menu when clicking outside of it
document.addEventListener('click', (e) => {
    const nav = document.querySelector('nav');
    const isClickInsideNav = nav.contains(e.target);
    const isMenuOpen = sidemenu.style.right === '0px';
    
    if (!isClickInsideNav && isMenuOpen && window.innerWidth <= 767) {
        closemenu();
    }
});

// Swipe gesture to close menu on mobile
let touchStartX = 0;
let touchEndX = 0;

sidemenu.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
}, false);

sidemenu.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
}, false);

function handleSwipe() {
    // Swipe right to close menu
    if (touchEndX > touchStartX + 50) {
        closemenu();
    }
}

// Contact Form Submission
const scriptURL = 'https://script.google.com/macros/s/AKfycbyFIZFeuGyTIYv8B5xidKRolM_bPwTv4_9oD0R_u_07HsqS7HcDox6T8ODTwcXqYwreTQ/exec';
const form = document.forms['submit-to-google-sheet'];
const msg = document.createElement('p');
msg.style.color = 'green';
form.appendChild(msg);

form.addEventListener('submit', e => {
    e.preventDefault(); // Impede o reload da página
    msg.textContent = 'Sending...';

    fetch(scriptURL, { method: 'POST', body: new FormData(form) })
        .then(response => {
            if (response.ok) {
                msg.textContent = 'Message sent sucessfully!';
                form.reset();
            } else {
                msg.textContent = 'Error... Try again.';
                msg.style.color = 'red';
            }
        })
        .catch(error => {
            msg.textContent = 'Connection error!';
            msg.style.color = 'red';
            console.error('Error!', error.message);
        });
});

// ==========================================
// CYBERPUNK SCROLL ANIMATIONS
// ==========================================

// Intersection Observer para detectar elementos visíveis
const observerOptions = {
    threshold: 0.15, // 15% do elemento visível
    rootMargin: '0px 0px -50px 0px' // Trigger um pouco antes
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add(entry.target.dataset.animation);
            
            // Não observar mais depois de animar
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Função para inicializar animações
function initScrollAnimations() {
    // About Section - Imagem e Texto
    const aboutImage = document.querySelector('.about-col-1');
    if (aboutImage) {
        aboutImage.classList.add('scroll-hidden');
        aboutImage.dataset.animation = 'fade-in-left';
        observer.observe(aboutImage);
    }
    
    const aboutText = document.querySelector('.about-col-2');
    if (aboutText) {
        aboutText.classList.add('scroll-hidden');
        aboutText.dataset.animation = 'fade-in-right';
        observer.observe(aboutText);
    }
    
    // About - Sub Title
    const aboutTitle = document.querySelector('#about .sub-title');
    if (aboutTitle) {
        aboutTitle.classList.add('scroll-hidden');
        aboutTitle.dataset.animation = 'scale-in';
        observer.observe(aboutTitle);
    }
    
    // About - Parágrafos
    const aboutParagraphs = document.querySelectorAll('#about p');
    aboutParagraphs.forEach((p, index) => {
        p.classList.add('scroll-hidden');
        p.dataset.animation = 'fade-in-up';
        p.classList.add(`delay-${(index + 1) * 100}`);
        observer.observe(p);
    });
    
    // Tab Titles com efeito stagger
    const tabTitles = document.querySelectorAll('.tab-links');
    tabTitles.forEach((tab, index) => {
        tab.classList.add('scroll-hidden');
        tab.dataset.animation = 'fade-in-up';
        tab.classList.add(`delay-${(index + 1) * 100}`);
        observer.observe(tab);
    });
    
    // Portfolio Section
    const portfolioTitle = document.querySelector('#portfolio .sub-title');
    if (portfolioTitle) {
        portfolioTitle.classList.add('scroll-hidden');
        portfolioTitle.dataset.animation = 'scale-in';
        observer.observe(portfolioTitle);
    }
    
    // Portfolio - Work Cards com stagger effect
    const workCards = document.querySelectorAll('.work');
    workCards.forEach((card, index) => {
        card.classList.add('scroll-hidden', 'cyber-hover');
        card.dataset.animation = 'fade-in-up';
        card.classList.add(`delay-${(index + 2) * 100}`);
        observer.observe(card);
    });
    
    // Portfolio - Botão
    const portfolioBtn = document.querySelector('#portfolio .btn');
    if (portfolioBtn) {
        portfolioBtn.classList.add('scroll-hidden', 'border-glow');
        portfolioBtn.dataset.animation = 'scale-in';
        portfolioBtn.style.position = 'relative';
        portfolioBtn.style.zIndex = '10';
        observer.observe(portfolioBtn);
    }
    
    // Contact Section
    const contactTitle = document.querySelector('#contact .sub-title');
    if (contactTitle) {
        contactTitle.classList.add('scroll-hidden');
        contactTitle.dataset.animation = 'scale-in';
        observer.observe(contactTitle);
    }
    
    const contactLeft = document.querySelector('.contact-left');
    if (contactLeft) {
        contactLeft.classList.add('scroll-hidden');
        contactLeft.dataset.animation = 'fade-in-left';
        observer.observe(contactLeft);
    }
    
    const contactRight = document.querySelector('.contact-right');
    if (contactRight) {
        contactRight.classList.add('scroll-hidden');
        contactRight.dataset.animation = 'fade-in-right';
        observer.observe(contactRight);
    }
    
    // Contact - Info items com stagger
    const contactInfo = document.querySelectorAll('.contact-left p, .social-icons a');
    contactInfo.forEach((item, index) => {
        item.classList.add('scroll-hidden');
        item.dataset.animation = 'fade-in-left';
        item.classList.add(`delay-${(index + 1) * 100}`);
        observer.observe(item);
    });
    
    // Form inputs com efeito cascata
    const formInputs = document.querySelectorAll('form input, form textarea, form button');
    formInputs.forEach((input, index) => {
        input.classList.add('scroll-hidden');
        input.dataset.animation = 'fade-in-up';
        input.classList.add(`delay-${(index + 1) * 100}`);
        observer.observe(input);
    });
}

// Adicionar efeito de scanline em algumas secções
function addScanlineEffect() {
    const sections = ['#about', '#portfolio', '#contact'];
    sections.forEach(selector => {
        const section = document.querySelector(selector);
        if (section) {
            section.classList.add('scanline-effect');
            section.style.position = 'relative';
        }
    });
}

// Inicializar tudo quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    initScrollAnimations();
    addScanlineEffect();
});

// ==========================================
// MOBILE TOUCH OPTIMIZATION FOR PORTFOLIO
// ==========================================

// Make portfolio cards tappable on touch devices
document.addEventListener('DOMContentLoaded', () => {
    const workItems = document.querySelectorAll('.work');
    
    workItems.forEach(item => {
        // Check if device supports touch
        if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
            let tapTimeout;
            
            item.addEventListener('touchstart', (e) => {
                // Prevent immediate propagation
                clearTimeout(tapTimeout);
                
                // Close other open cards
                workItems.forEach(other => {
                    if (other !== item) {
                        other.classList.remove('active');
                    }
                });
                
                // Toggle current card
                item.classList.toggle('active');
                
                // Auto close after 5 seconds
                if (item.classList.contains('active')) {
                    tapTimeout = setTimeout(() => {
                        item.classList.remove('active');
                    }, 5000);
                }
            });
        }
    });
});

// ==========================================
// PERFORMANCE OPTIMIZATIONS
// ==========================================

// Reduce scroll event listeners on mobile
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            // Scroll-based animations go here
            ticking = false;
        });
        ticking = true;
    }
});

// Lazy load images for better mobile performance
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}
