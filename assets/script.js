// Dynamic Year in Footer
document.getElementById("year").textContent = new Date().getFullYear();

// Typing Animation
const phrases = [
    "Frontend Developer",
    "UI/UX Enthusiast",
];
const typingContainer = document.querySelector(".typing-text");
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    if (!typingContainer) return;

    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
        typingContainer.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingContainer.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentPhrase.length) {
        typeSpeed = 2000; // Pause at end of word
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typeSpeed = 500; // Pause before typing next word
    }

    setTimeout(typeEffect, typeSpeed);
}

// Start typing animation on load
if (typingContainer) {
    setTimeout(typeEffect, 1000);
}

// Intersection Observer for Scroll Animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            // Optional: stop observing once animated
            // observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.scroll-anim').forEach((element) => {
    observer.observe(element);
});

// Navbar background change on scroll
const navbar = document.querySelector('.glass-nav');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(10, 10, 15, 0.9)';
        navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.5)';
    } else {
        navbar.style.background = 'rgba(10, 10, 15, 0.7)';
        navbar.style.boxShadow = 'none';
    }
});


// Form Submission Simulation
const contactForm = document.getElementById("contactForm");
if (contactForm) {
    const submitBtn = document.getElementById("submitBtn");
    const btnText = submitBtn.querySelector(".btn-text");
    const spinner = submitBtn.querySelector(".spinner-border");

    contactForm.addEventListener("submit", function (e) {
        e.preventDefault();

        // UI State: Loading
        btnText.classList.add("d-none");
        spinner.classList.remove("d-none");
        submitBtn.disabled = true;

        // Simulate API call delay
        setTimeout(() => {
            // UI State: Success
            spinner.classList.add("d-none");
            btnText.classList.remove("d-none");
            btnText.innerHTML = "Sent Successfully! <i class='bx bx-check ms-2'></i>";
            submitBtn.classList.replace("btn-primary-custom", "btn-success");

            contactForm.reset();

            // Reset UI after 3 seconds
            setTimeout(() => {
                btnText.innerHTML = "Send Message <i class='bx bx-send ms-2'></i>";
                submitBtn.classList.replace("btn-success", "btn-primary-custom");
                submitBtn.disabled = false;
            }, 3000);

        }, 1500);
    });
}