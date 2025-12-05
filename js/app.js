/* ========================================
   STAFFLOG - JavaScript & Animations
   ======================================== */

document.addEventListener("DOMContentLoaded", function () {
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger);

    // Initialize all modules
    initNavbar();
    initMobileMenu();
    initHeroAnimations();
    initProblemsAnimations();
    initHowItWorksAnimations();
    initStatsAnimations();
    initAudienceAnimations();
    initDemoAnimations();
    initFooterAnimations();
    initContactForm();
    setCopyrightYear();

    // Refresh ScrollTrigger after all animations are set up
    ScrollTrigger.refresh();
});

/* ----------------------------------------
   1. NAVBAR - Scroll Effect
   ---------------------------------------- */
function initNavbar() {
    const navbar = document.querySelector(".navbar");
    if (!navbar) return;

    function handleNavbarScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    }

    window.addEventListener("scroll", handleNavbarScroll, { passive: true });
    handleNavbarScroll(); // Initial check
}

/* ----------------------------------------
   2. MOBILE MENU - Toggle
   ---------------------------------------- */
function initMobileMenu() {
    const menuBtn = document.querySelector(".mobile-menu-btn");
    const mobileMenu = document.querySelector(".mobile-menu");

    if (!menuBtn || !mobileMenu) return;

    menuBtn.addEventListener("click", () => {
        mobileMenu.classList.toggle("active");
        menuBtn.classList.toggle("active");
        document.body.style.overflow = mobileMenu.classList.contains("active") ? "hidden" : "";
    });

    // Close menu on link click
    mobileMenu.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            mobileMenu.classList.remove("active");
            menuBtn.classList.remove("active");
            document.body.style.overflow = "";
        });
    });

    // Close on escape key
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && mobileMenu.classList.contains("active")) {
            mobileMenu.classList.remove("active");
            menuBtn.classList.remove("active");
            document.body.style.overflow = "";
        }
    });
}

/* ----------------------------------------
   3. HERO SECTION - Animations (No ScrollTrigger - plays on load)
   ---------------------------------------- */
function initHeroAnimations() {
    const heroSection = document.querySelector(".hero-section");
    const heroImage = document.querySelector(".hero-image");

    if (!heroSection) return;

    // Create timeline for hero animations - plays immediately on page load
    const heroTl = gsap.timeline({ defaults: { ease: "power2.out" } });

    // 3.1 Headline - fade-in + slide-up
    heroTl.fromTo(".hero-section h1",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, delay: 0.1 }
    );

    // 3.2 Subtitle - fade-in
    heroTl.fromTo(".hero-section > .container > div > p",
        { opacity: 0 },
        { opacity: 1, duration: 0.4 },
        "-=0.3"
    );

    // 3.3 Buttons - fade-in + scale-in
    heroTl.fromTo(".hero-btn",
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.5, stagger: 0.1 },
        "-=0.2"
    );

    // 3.5 Laptop image - fade-in + slide-up
    if (heroImage) {
        heroTl.fromTo(heroImage,
            { opacity: 0, y: 60 },
            { opacity: 1, y: 0, duration: 0.7 },
            "-=0.4"
        );

        // Parallax on scroll
        gsap.to(heroImage, {
            scrollTrigger: {
                trigger: ".hero-section",
                start: "top top",
                end: "bottom top",
                scrub: true
            },
            y: -30
        });
    }
}

/* ----------------------------------------
   4. PROBLEMS SECTION - Animations
   ---------------------------------------- */
function initProblemsAnimations() {
    const section = document.querySelector("#problems");
    if (!section) return;

    // Section header animation
    gsap.fromTo("#problems h2",
        { opacity: 0, y: 30 },
        {
            opacity: 1,
            y: 0,
            duration: 0.6,
            scrollTrigger: {
                trigger: "#problems",
                start: "top 80%",
                toggleActions: "play none none none"
            }
        }
    );

    gsap.fromTo("#problems > .container > div:first-child > p",
        { opacity: 0, y: 30 },
        {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: 0.1,
            scrollTrigger: {
                trigger: "#problems",
                start: "top 80%",
                toggleActions: "play none none none"
            }
        }
    );

    // Problem cards - fade-in with stagger
    gsap.fromTo(".problem-card-simple",
        { opacity: 0, y: 20 },
        {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.15,
            ease: "power2.out",
            scrollTrigger: {
                trigger: ".problem-card-simple",
                start: "top 85%",
                toggleActions: "play none none none"
            }
        }
    );
}

/* ----------------------------------------
   5. HOW IT WORKS SECTION - Animations
   ---------------------------------------- */
function initHowItWorksAnimations() {
    const section = document.querySelector("#how-it-works");
    if (!section) return;

    // Section header
    gsap.fromTo("#how-it-works h2",
        { opacity: 0, y: 30 },
        {
            opacity: 1,
            y: 0,
            duration: 0.6,
            scrollTrigger: {
                trigger: "#how-it-works",
                start: "top 80%",
                toggleActions: "play none none none"
            }
        }
    );

    // Feature items - fade-in + slide from left with stagger
    gsap.fromTo(".feature-item-new",
        { opacity: 0, x: -30 },
        {
            opacity: 1,
            x: 0,
            duration: 0.6,
            stagger: 0.2,
            ease: "power2.out",
            scrollTrigger: {
                trigger: ".feature-item-new",
                start: "top 85%",
                toggleActions: "play none none none"
            }
        }
    );

    // Feature image - slide from right
    const featureImage = section.querySelector(".feature-image");
    if (featureImage) {
        gsap.fromTo(featureImage,
            { opacity: 0, x: 50 },
            {
                opacity: 1,
                x: 0,
                duration: 0.7,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: featureImage,
                    start: "top 80%",
                    toggleActions: "play none none none"
                }
            }
        );

        // Parallax on image
        gsap.to(featureImage, {
            scrollTrigger: {
                trigger: section,
                start: "top bottom",
                end: "bottom top",
                scrub: true
            },
            y: -20
        });
    }
}

/* ----------------------------------------
   6. STATISTICS SECTION - Count-up Animation
   ---------------------------------------- */
function initStatsAnimations() {
    const stats = document.querySelectorAll(".stat-number");
    if (!stats.length) return;

    // Section fade-in
    gsap.fromTo(".stat-card",
        { opacity: 0, y: 30 },
        {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.15,
            scrollTrigger: {
                trigger: ".stat-card",
                start: "top 85%",
                toggleActions: "play none none none"
            }
        }
    );

    // Count-up animation for each stat
    stats.forEach(stat => {
        const target = parseInt(stat.getAttribute("data-value"));
        const suffix = stat.getAttribute("data-suffix") || "";
        const prefix = stat.getAttribute("data-prefix") || "";

        ScrollTrigger.create({
            trigger: stat,
            start: "top 85%",
            onEnter: () => {
                gsap.to(stat, {
                    duration: 1.2,
                    ease: "power2.out",
                    onUpdate: function() {
                        const progress = this.progress();
                        const currentValue = Math.floor(target * progress);
                        stat.textContent = prefix + currentValue + suffix;
                    },
                    onComplete: function() {
                        stat.textContent = prefix + target + suffix;
                    }
                });
            },
            once: true
        });
    });

    // Text under stats
    gsap.fromTo(".stat-card p",
        { opacity: 0 },
        {
            opacity: 1,
            duration: 0.4,
            delay: 0.3,
            stagger: 0.1,
            scrollTrigger: {
                trigger: ".stat-card",
                start: "top 85%",
                toggleActions: "play none none none"
            }
        }
    );
}

/* ----------------------------------------
   7. AUDIENCE SECTION - Animations
   ---------------------------------------- */
function initAudienceAnimations() {
    const section = document.querySelector("#audience");
    if (!section) return;

    // Section header
    gsap.fromTo("#audience h2",
        { opacity: 0, y: 30 },
        {
            opacity: 1,
            y: 0,
            duration: 0.6,
            scrollTrigger: {
                trigger: "#audience",
                start: "top 80%",
                toggleActions: "play none none none"
            }
        }
    );

    // Audience cards - fade-in + slide-up with stagger
    gsap.fromTo(".audience-card",
        { opacity: 0, y: 40 },
        {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.15,
            ease: "power2.out",
            scrollTrigger: {
                trigger: ".audience-card",
                start: "top 85%",
                toggleActions: "play none none none"
            }
        }
    );

    // Phones image - scale in
    const phonesImg = section.querySelector("img[src*='for-who']");
    if (phonesImg) {
        gsap.fromTo(phonesImg,
            { opacity: 0, scale: 0.9 },
            {
                opacity: 1,
                scale: 1,
                duration: 0.7,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: phonesImg,
                    start: "top 85%",
                    toggleActions: "play none none none"
                }
            }
        );
    }
}

/* ----------------------------------------
   8. DEMO SECTION - Animations
   ---------------------------------------- */
function initDemoAnimations() {
    const section = document.querySelector("#demo");
    if (!section) return;

    // Whole section fade-in + slide-up
    const demoContent = section.querySelector(".max-w-\\[1200px\\]");
    if (demoContent) {
        gsap.fromTo(demoContent,
            { opacity: 0, y: 40 },
            {
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: "#demo",
                    start: "top 80%",
                    toggleActions: "play none none none"
                }
            }
        );
    }

    // Form inputs stagger
    gsap.fromTo("#contactForm input, #contactForm button",
        { opacity: 0, y: 20 },
        {
            opacity: 1,
            y: 0,
            duration: 0.4,
            stagger: 0.1,
            delay: 0.3,
            scrollTrigger: {
                trigger: "#contactForm",
                start: "top 85%",
                toggleActions: "play none none none"
            }
        }
    );
}

/* ----------------------------------------
   9. FOOTER - Animations
   ---------------------------------------- */
function initFooterAnimations() {
    const footer = document.querySelector("footer");
    if (!footer) return;

    // Footer content columns
    gsap.fromTo("footer .grid > div",
        { opacity: 0, y: 20 },
        {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.1,
            scrollTrigger: {
                trigger: "footer",
                start: "top 90%",
                toggleActions: "play none none none"
            }
        }
    );

    // Social icons
    gsap.fromTo(".social-icon",
        { opacity: 0, scale: 0.8 },
        {
            opacity: 1,
            scale: 1,
            duration: 0.4,
            stagger: 0.1,
            scrollTrigger: {
                trigger: ".social-icon",
                start: "top 95%",
                toggleActions: "play none none none"
            }
        }
    );
}

/* ----------------------------------------
   10. CONTACT FORM - Validation & Submit to Google Sheets
   ---------------------------------------- */

// Google Apps Script Web App URL - Replace with your deployed URL
const GOOGLE_SHEETS_URL = "YOUR_GOOGLE_APPS_SCRIPT_URL_HERE";

function initContactForm() {
    const form = document.getElementById("contactForm");
    const phoneInput = document.getElementById("phoneInput");
    const formMessage = document.getElementById("formMessage");

    if (!form) return;

    // Phone mask with IMask
    if (phoneInput && typeof IMask !== "undefined") {
        IMask(phoneInput, {
            mask: "+{998} (00) 000-00-00",
            lazy: false
        });
    }

    // Form submit handler
    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        const data = {
            name: formData.get("name"),
            organization: formData.get("organization") || "",
            phone: formData.get("phone")
        };

        // Validation
        if (!data.name || !data.phone) {
            showFormMessage("Пожалуйста, заполните обязательные поля", "error");
            return;
        }

        // Phone validation (check if complete)
        const phoneDigits = data.phone.replace(/\D/g, "");
        if (phoneDigits.length < 12) {
            showFormMessage("Пожалуйста, введите полный номер телефона", "error");
            return;
        }

        // Submit button state
        const submitBtn = form.querySelector("button[type='submit']");
        const originalText = submitBtn.textContent;
        submitBtn.textContent = "Отправка...";
        submitBtn.disabled = true;

        try {
            // Send to Google Sheets via Apps Script Web App
            // Replace this URL with your deployed Apps Script Web App URL
            const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbw5D7u2R82wGD7YH6qud0yGknUzI4ZlKm1eeO7wfMxppMqeKGPWIDNoQH_PaduI2D-m/exec";

            await fetch(GOOGLE_SCRIPT_URL, {
                method: "POST",
                mode: "no-cors",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            // With no-cors mode, we can't read the response, so we assume success
            // For production, consider using a proxy server or enabling CORS in Apps Script

            showFormMessage("Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.", "success");
            form.reset();

            // Reset phone mask
            if (phoneInput && phoneInput._maskRef) {
                phoneInput._maskRef.updateValue();
            }

            console.log("Form submitted to Google Sheets:", data);

        } catch (error) {
            showFormMessage("Произошла ошибка. Пожалуйста, попробуйте еще раз.", "error");
            console.error("Form error:", error);
        } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });

    // Helper function to show messages
    function showFormMessage(message, type) {
        if (!formMessage) return;

        formMessage.textContent = message;
        formMessage.className = "form-message " + type;
        formMessage.classList.remove("hidden");

        // Auto hide after 5 seconds
        setTimeout(() => {
            formMessage.classList.add("hidden");
        }, 5000);
    }
}

/* ----------------------------------------
   11. COPYRIGHT YEAR
   ---------------------------------------- */
function setCopyrightYear() {
    const yearEl = document.getElementById("currentYear");
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }
}

/* ----------------------------------------
   12. SMOOTH SCROLL (for anchor links)
   ---------------------------------------- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        const targetId = this.getAttribute("href");
        if (targetId === "#") return;

        const target = document.querySelector(targetId);
        if (target) {
            e.preventDefault();
            const navHeight = document.querySelector(".navbar").offsetHeight;
            const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight - 20;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });
        }
    });
});
