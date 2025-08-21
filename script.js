// Ensure adminNav link shows the admin section
document.addEventListener('DOMContentLoaded', function() {
    var adminNav = document.getElementById('adminNav');
    if (adminNav) {
        adminNav.addEventListener('click', function(e) {
            e.preventDefault();
            showAdmin();
        });
    }
});

// Initialize EmailJS with error handling
try {
    emailjs.init('bk6A9sOtbUJF722eC');
} catch (error) {
    console.error('EmailJS initialization failed:', error);
}

// Admin reply form logic - only if form exists
const replyForm = document.getElementById('replyForm');
if (replyForm) {
    replyForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const to_email = document.getElementById('replyEmail').value;
        const reply_message = document.getElementById('replyMessage').value;
        
        if (!to_email || !reply_message) {
            alert('Please fill in all fields');
            return;
        }
        
        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(to_email)) {
            alert('Please enter a valid email address');
            return;
        }
        
        emailjs.send('service_rusosmh', 'template_0m26qv4', {
            to_email: to_email,
            message: reply_message,
            to_name: to_email
        })
        .then(function(response) {
            alert('Reply sent successfully!');
            replyForm.reset();
        }, function(error) {
            alert('Failed to send reply: ' + error.text);
        });
    });
}
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        // Collect feedback
        const name = this.elements[0].value;
        const email = this.elements[1].value;
        const message = this.elements[2].value;
        const feedback = { name, email, message, date: new Date().toLocaleString() };
        // Store feedback in localStorage
        let feedbacks = JSON.parse(localStorage.getItem('feedbacks') || '[]');
        feedbacks.push(feedback);
        localStorage.setItem('feedbacks', JSON.stringify(feedbacks));
        alert('Thank you for your message!');
        this.reset();
    });
}

// Admin authentication and panel logic
const adminSection = document.getElementById('admin');
const adminLoginForm = document.getElementById('adminLoginForm');
const adminPanel = document.getElementById('adminPanel');
const feedbackList = document.getElementById('feedbackList');
const logoutBtn = document.getElementById('logoutBtn');

// Show admin section (for demo, you can add a link/button to show it)
window.showAdmin = function() {
    // Hide all sections except admin
    document.querySelectorAll('section').forEach(function(sec) {
        if (sec.id !== 'admin') {
            sec.style.display = 'none';
        }
    });
    if (adminSection) {
        adminSection.style.display = 'block';
        window.scrollTo({ top: adminSection.offsetTop, behavior: 'smooth' });
    }
}

if (adminLoginForm) {
    adminLoginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const user = document.getElementById('adminUser').value;
        const pass = document.getElementById('adminPass').value;
        // Simple authentication (replace with secure backend in production)
        if (user === 'wisdom' && pass === 'wisdom2025') {
            adminLoginForm.style.display = 'none';
            if (adminPanel) adminPanel.style.display = 'block';
            loadFeedbacks();
        } else {
            alert('Invalid credentials');
        }
    });
}

if (logoutBtn) {
    logoutBtn.addEventListener('click', function() {
        if (adminPanel) adminPanel.style.display = 'none';
        if (adminLoginForm) adminLoginForm.style.display = 'block';
    });
}

function loadFeedbacks() {
    if (!feedbackList) return;
    feedbackList.innerHTML = '';
    let feedbacks = JSON.parse(localStorage.getItem('feedbacks') || '[]');
    if (feedbacks.length === 0) {
        feedbackList.innerHTML = '<li>No feedback received yet.</li>';
    } else {
        feedbacks.reverse().forEach(fb => {
            const li = document.createElement('li');
            li.innerHTML = `<strong>${fb.name}</strong> (${fb.email})<br>${fb.message}<br><small>${fb.date}</small>`;
            feedbackList.appendChild(li);
        });
    }
}

// Animation on scroll
function revealOnScroll() {
    const reveals = document.querySelectorAll('.fade-in, .slide-in');
    for (let el of reveals) {
        const windowHeight = window.innerHeight;
        const elementTop = el.getBoundingClientRect().top;
        const elementVisible = 80;
        if (elementTop < windowHeight - elementVisible) {
            el.style.animationPlayState = 'running';
        }
    }
}
window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);
