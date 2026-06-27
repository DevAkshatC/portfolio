// script.js

// Smooth scroll to contact
function scrollToContact() {
    document.getElementById("contact").scrollIntoView({ behavior: "smooth" });
}

// Pop-up for project details
function learnMore() {
    alert("NewsInsighter: Access global news in various categories, built with HTML, CSS, and JavaScript.");
}


// Fade-in effect on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        if (sectionTop < window.innerHeight - 100) {
            section.classList.add('fade-in');
        }
    });
});
