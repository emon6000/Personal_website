// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on a nav link
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Active navigation link based on scroll position
    const sections = document.querySelectorAll('section[id]');
    
    function highlightNavLink() {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelector('.nav-menu a[href*=' + sectionId + ']').classList.add('active');
            } else {
                document.querySelector('.nav-menu a[href*=' + sectionId + ']').classList.remove('active');
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavLink);
    
    // Skill Bars Animation
    const skillBars = document.querySelectorAll('.skill-per');
    
    function animateSkillBars() {
        skillBars.forEach(skill => {
            const percentage = skill.getAttribute('per');
            skill.style.width = percentage + '%';
        });
    }
    
    // Check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    // Animate skill bars when they come into view
    function checkSkillBars() {
        const skillsSection = document.querySelector('.skills');
        if (skillsSection && isInViewport(skillsSection)) {
            animateSkillBars();
            window.removeEventListener('scroll', checkSkillBars);
        }
    }
    
    window.addEventListener('scroll', checkSkillBars);
    checkSkillBars(); // Check on initial load
    
    // Gallery Filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            const filterValue = button.getAttribute('data-filter');
            
            galleryItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
    
    // Gallery Modal
    const galleryImages = document.querySelectorAll('.gallery-item');
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const closeModal = document.querySelector('.close-modal');
    
    galleryImages.forEach(image => {
        image.addEventListener('click', () => {
            modal.style.display = 'flex';
            modalImg.src = image.querySelector('img').src;
        });
    });
    
    if (closeModal) {
        closeModal.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }
    
    // Close modal when clicking outside the image
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // Contact Form Submission
    const contactForm = document.getElementById('contactForm');
    
   if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault(); // 1. Stop the page from reloading
        
        // 2. Gather the data from the form
        // (This automatically grabs fields with 'name' attributes)
        const data = new FormData(contactForm);
        
        // 3. Send the data to Formspree using the link in your HTML
        fetch(contactForm.action, {
            method: contactForm.method,
            body: data,
            headers: {
                'Accept': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                // 4. Success! Show message and clear form
                alert('Thank you for your message! I will get back to you soon.');
                contactForm.reset();
            } else {
                // 5. Error handling
                response.json().then(data => {
                    if (Object.hasOwn(data, 'errors')) {
                        alert(data["errors"].map(error => error["message"]).join(", "));
                    } else {
                        alert("Oops! There was a problem submitting your form");
                    }
                })
            }
        }).catch(error => {
            alert("Oops! There was a problem submitting your form");
        });
    });
}
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Blog Filters
    const blogPosts = document.querySelectorAll('.blog-card');
    const searchInput = document.querySelector('.search-input');

    // Filter blog posts
    function filterBlogPosts(category) {
        blogPosts.forEach(post => {
            const postCategory = post.dataset.category;
            if (category === 'all' || postCategory === category) {
                post.style.display = 'block';
                post.style.animation = 'fadeIn 0.5s ease';
            } else {
                post.style.display = 'none';
            }
        });
    }

    // Add click event to filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            // Filter posts
            const category = button.dataset.filter;
            filterBlogPosts(category);
        });
    });

    // Search functionality
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            
            blogPosts.forEach(post => {
                const title = post.querySelector('h3').textContent.toLowerCase();
                const content = post.querySelector('p').textContent.toLowerCase();
                const category = post.querySelector('.blog-category').textContent.toLowerCase();
                
                if (title.includes(searchTerm) || 
                    content.includes(searchTerm) || 
                    category.includes(searchTerm)) {
                    post.style.display = 'block';
                } else {
                    post.style.display = 'none';
                }
            });
        });
    }

    // Add fadeIn animation to CSS
    const style = document.createElement('style');
    style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    `;
    document.head.appendChild(style);

    // Initialize all posts visible
    filterBlogPosts('all');
}); 