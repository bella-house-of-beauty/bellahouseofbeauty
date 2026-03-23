


document.addEventListener('DOMContentLoaded', function() {
    console.log('Bella House of Beauty - JavaScript loaded! 💅✨');
    
    
    initSmoothScrolling();
    initMobileMenu();
    initScrollEffects();
    initFormHandler();
    initServiceCards();
    initGallery();
    initScrollProgress();
    initParallaxEffect();
    initCounterAnimation();
    initBackToTop();
});


function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            
            if (target) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}


function initMobileMenu() {
    
    const nav = document.querySelector('nav');
    const mobileMenuBtn = document.createElement('div');
    mobileMenuBtn.className = 'mobile-menu-btn';
    mobileMenuBtn.innerHTML = '☰';
    mobileMenuBtn.style.cssText = `
        display: none;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0.5rem;
        color: white;
        font-weight: bold;
        @media (max-width: 768px) { display: block; }
    `;
    
    nav.appendChild(mobileMenuBtn);
    
 
    mobileMenuBtn.addEventListener('click', function() {
        const navLinks = document.querySelector('.nav-links');
        navLinks.classList.toggle('mobile-open');
        this.innerHTML = navLinks.classList.contains('mobile-open') ? '✕' : '☰';
    });
}


function initScrollEffects() {
   
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 107, 157, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.background = 'linear-gradient(135deg, #ff6b9d 0%, #c44569 100%)';
            header.style.backdropFilter = 'none';
        }
    });

   
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    
    document.querySelectorAll('.service-card, .gallery-item, .about-content, .contact-info').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}


function initFormHandler() {
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
   
            const formData = new FormData(this);
            const name = this.querySelector('input[type="text"]').value;
            
          
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
       
            setTimeout(() => {
            
                this.reset();
                
         
                showNotification('Thank you ' + name + '! Your message has been sent. We\'ll contact you soon! 💖', 'success');
                
    
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }
}

// ==================== SERVICE CARDS INTERACTION ====================
function initServiceCards() {
    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// ==================== GALLERY INTERACTION ====================
function initGallery() {
    document.querySelectorAll('.gallery-item').forEach((item, index) => {
        item.addEventListener('click', function() {
            // Create modal effect
            const overlay = document.createElement('div');
            overlay.className = 'gallery-modal';
            overlay.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.9);
                z-index: 9999;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
            `;
            
            const modalContent = document.createElement('div');
            modalContent.style.cssText = `
                background: linear-gradient(135deg, #ff6b9d, #c44569);
                padding: 3rem;
                border-radius: 20px;
                text-align: center;
                color: white;
                max-width: 500px;
                transform: scale(0.8);
                animation: modalPop 0.3s ease forwards;
            `;
            
            modalContent.innerHTML = `
                <i class="fas fa-times" style="font-size: 2rem; float: right; cursor: pointer; margin-bottom: 1rem;"></i>
                <i class="fas fa-images" style="font-size: 4rem; margin-bottom: 1rem;"></i>
                <h3>Beautiful Transformations</h3>
                <p>Gallery image ${index + 1} - Click to explore more of our stunning work!</p>
            `;
            
            overlay.appendChild(modalContent);
            document.body.appendChild(overlay);
            
            // Close modal
            overlay.addEventListener('click', function() {
                document.body.removeChild(overlay);
            });
            
            modalContent.querySelector('.fa-times').addEventListener('click', function(e) {
                e.stopPropagation();
                document.body.removeChild(overlay);
            });
        });
    });
}

// ==================== SCROLL PROGRESS BAR ====================
function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.id = 'scroll-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 4px;
        background: linear-gradient(90deg, #ff6b9d, #c44569);
        z-index: 10000;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
}

// ==================== PARALLAX EFFECT ====================
function initParallaxEffect() {
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
}

// ==================== COUNTER ANIMATION ====================
function initCounterAnimation() {
    // Add some stats to about section (optional)
    const aboutText = document.querySelector('.about-text');
    if (aboutText && !aboutText.querySelector('.stats')) {
        const stats = document.createElement('div');
        stats.className = 'stats';
        stats.style.cssText = `
            display: flex;
            justify-content: space-around;
            margin-top: 2rem;
            padding: 2rem;
            background: rgba(255,255,255,0.3);
            border-radius: 15px;
        `;
        stats.innerHTML = `
            <div><span class="counter" data-target="5000">0</span><br>Happy Clients</div>
            <div><span class="counter" data-target="15">0</span><br>Years Experience</div>
            <div><span class="counter" data-target="10000">0</span><br>Services Done</div>
        `;
        aboutText.appendChild(stats);
    }
    
    // Animate counters
    const counters = document.querySelectorAll('.counter');
    const counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
            }
        });
    });
    
    counters.forEach(counter => counterObserver.observe(counter));
}

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const increment = target / 100;
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target.toLocaleString();
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current).toLocaleString();
        }
    }, 20);
}

// ==================== BACK TO TOP BUTTON ====================
function initBackToTop() {
    const backToTop = document.createElement('button');
    backToTop.id = 'back-to-top';
    backToTop.innerHTML = '<i class="fas fa-chevron-up"></i>';
    backToTop.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(135deg, #ff6b9d, #c44569);
        color: white;
        border: none;
        font-size: 1.2rem;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
    `;
    
    document.body.appendChild(backToTop);
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 500) {
            backToTop.style.opacity = '1';
            backToTop.style.visibility = 'visible';
        } else {
            backToTop.style.opacity = '0';
            backToTop.style.visibility = 'hidden';
        }
    });
    
    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ==================== NOTIFICATION SYSTEM ====================
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
        ${message}
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 1.5rem 2rem;
        border-radius: 10px;
        color: white;
        font-weight: 500;
        z-index: 10001;
        transform: translateX(400px);
        transition: all 0.4s ease;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        background: ${type === 'success' ? 'linear-gradient(135deg, #4CAF50, #45a049)' : 'linear-gradient(135deg, #f44336, #d32f2f)'};
        display: flex;
        align-items: center;
        gap: 1rem;
        max-width: 400px;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    requestAnimationFrame(() => {
        notification.style.transform = 'translateX(0)';
    });
    
    // Auto remove
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (notification.parentNode) {
                document.body.removeChild(notification);
            }
        }, 400);
    }, 4000);
}

// ==================== ADD CSS FOR NEW ELEMENTS ====================
const style = document.createElement('style');
style.textContent = `
    @keyframes modalPop {
        to { transform: scale(1); }
    }
    
    .mobile-open {
        display: flex !important;
        flex-direction: column !important;
        position: absolute !important;
        top: 100% !important;
        left: 0 !important;
        width: 100% !important;
        background: rgba(255,107,157,0.98) !important;
        padding: 1rem !important;
        box-shadow: 0 10px 30px rgba(0,0,0,0.2) !important;
    }
    
    .stats {
        font-size: 1.1rem;
    }
    
    .stats .counter {
        font-size: 2.5rem;
        font-weight: bold;
        color: #c44569;
        font-family: 'Playfair Display', serif;
        display: block;
    }
    
    @media (max-width: 768px) {
        .mobile-menu-btn {
            display: block !important;
        }
    }
    
`;
document.head.appendChild(style);