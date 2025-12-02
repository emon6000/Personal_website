// Entertainment Section Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Movie Filter Functionality
    const filterButtons = document.querySelectorAll('.movie-filter button');
    const movieItems = document.querySelectorAll('.movie-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            movieItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Animation List Functionality
    const animationItems = document.querySelectorAll('.animation-item');
    
    animationItems.forEach(item => {
        item.addEventListener('click', () => {
            // Toggle active class
            item.classList.toggle('active');
            
            // Get description element
            const description = item.querySelector('.animation-description');
            
            // Toggle description visibility
            if (item.classList.contains('active')) {
                description.style.maxHeight = description.scrollHeight + 'px';
            } else {
                description.style.maxHeight = '0';
            }
        });
    });

    // Favorite Stars Hover Effect
    const starItems = document.querySelectorAll('.star-item');
    
    starItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.classList.add('hover');
        });
        
        item.addEventListener('mouseleave', () => {
            item.classList.remove('hover');
        });
    });

    // Search Functionality
    const searchInput = document.querySelector('.entertainment-search input');
    const entertainmentItems = document.querySelectorAll('.entertainment-item');

    if (searchInput) {
        searchInput.addEventListener('input', () => {
            const searchTerm = searchInput.value.toLowerCase();

            entertainmentItems.forEach(item => {
                const title = item.querySelector('h3').textContent.toLowerCase();
                const description = item.querySelector('p').textContent.toLowerCase();

                if (title.includes(searchTerm) || description.includes(searchTerm)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    }
}); 