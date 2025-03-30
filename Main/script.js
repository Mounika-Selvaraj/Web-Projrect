document.addEventListener("DOMContentLoaded", () => {
    // Dark Mode Toggle
    const darkModeToggle = document.getElementById("dark-mode-toggle");
    const body = document.body;

    darkModeToggle.addEventListener("click", () => {
        body.classList.toggle("dark-mode");
        const icon = darkModeToggle.querySelector("i");
        icon.classList.toggle("fa-moon");
        icon.classList.toggle("fa-sun");
    });

    // Mobile Menu Toggle
    const hamburgerMenu = document.getElementById("hamburger-menu");
    const navLinks = document.querySelector(".nav-links");

    hamburgerMenu.addEventListener("click", () => {
        navLinks.classList.toggle("active");
    });
});
document.querySelector(".prev-btn").addEventListener("click", () => {
    console.log("Previous button clicked!");
});

document.querySelector(".next-btn").addEventListener("click", () => {
    console.log("Next button clicked!");
});

document.addEventListener("DOMContentLoaded", () => {
    console.log("Featured Dishes Section Loaded!");
});

document.addEventListener("DOMContentLoaded", () => {
    console.log("About Us Section Loaded!");
});


document.addEventListener("DOMContentLoaded", () => {
    console.log("Menu Highlights Section Loaded!");

    const menuItems = document.querySelectorAll(".menu-item");

    menuItems.forEach(item => {
        item.addEventListener("click", () => {
            alert("More details about " + item.querySelector("h3").textContent + " coming soon!");
        });
    });
});
document.addEventListener("DOMContentLoaded", () => {
    console.log("Dish of the Day Section Loaded!");

    // Array of dishes for each day
    const dishes = [
        {
            "name": "Chicken Biryani",
            "description": "A fragrant rice dish cooked with spiced chicken and aromatic basmati rice.",
            "time": "45 minutes",
            "image": "assets/briyani.jpg"
        },
        {
            "name": "Mutton Rogan Josh",
            "description": "A flavorful Kashmiri mutton curry cooked with aromatic spices.",
            "time": "50 minutes",
            "image": "assets/mutton_rogan_josh.jpg"
        },
        {
            "name": "Butter Chicken",
            "description": "A rich and creamy tomato-based curry with tender chicken pieces.",
            "time": "40 minutes",
            "image": "assets/Butter_chicken.jpeg"
        },
        {
            "name": "Chicken Chettinad",
            "description": "A spicy South Indian chicken curry with a blend of roasted spices.",
            "time": "35 minutes",
            "image": "assets/Chicken Chettinad.jpg"
        },
        {
            "name": "Hyderabadi Mutton Haleem",
            "description": "A slow-cooked dish made with wheat, lentils, and mutton.",
            "time": "60 minutes",
            "image": "assets/Hyderabadi Mutton Haleem.jpg"
        },
        {
            "name": "Fish Curry",
            "description": "A tangy South Indian fish curry made with tamarind and coconut.",
            "time": "30 minutes",
            "image": "assets/Fish Curry.jpg"
        },
        {
            "name": "Prawn Masala",
            "description": "A spicy and flavorful prawn curry cooked with onions and tomatoes.",
            "time": "25 minutes",
            "image": "assets/Prawn Masala.jpg"
        }
    ];
    

    // Get the current day of the week (0 = Sunday, 6 = Saturday)
    const today = new Date().getDay();

    // Get elements
    const dishName = document.getElementById("dish-name");
    const dishDescription = document.getElementById("dish-description");
    const dishTime = document.getElementById("dish-time");
    const dishImage = document.getElementById("dish-image");

    // Update dish details dynamically
    dishName.textContent = dishes[today].name;
    dishDescription.textContent = dishes[today].description;
    dishTime.textContent = dishes[today].time;
    dishImage.src = dishes[today].image;
});

document.addEventListener("DOMContentLoaded", () => {
    console.log("Testimonials Section Loaded!");

    // Array of customer testimonials
    const testimonials = [
        {
            name: "Sarah Johnson",
            quote: "The best dining experience ever! The food was amazing and the service was top-notch!",
            image: "assets/customer.jpeg"
        },
        {
            name: "Michael Brown",
            quote: "Absolutely loved the ambiance and the flavors! Highly recommend this place.",
            image: "assets/customer.jpeg"
        },
        {
            name: "Emma Wilson",
            quote: "A must-visit restaurant! Their dishes are creative and full of taste. 5 stars!",
            image: "assets/customer.jpeg"
        }
    ];

    let index = 0;

    // Get elements
    const customerImg = document.getElementById("customer-img");
    const customerQuote = document.getElementById("customer-quote");
    const customerName = document.getElementById("customer-name");

    // Navigation buttons
    const prevBtn = document.querySelector(".prev-btn");
    const nextBtn = document.querySelector(".next-btn");

    // Function to update testimonial
    function updateTestimonial() {
        customerImg.src = testimonials[index].image;
        customerQuote.textContent = `"${testimonials[index].quote}"`;
        customerName.textContent = `- ${testimonials[index].name}`;
    }

    // Next Button Click Event
    nextBtn.addEventListener("click", () => {
        index = (index + 1) % testimonials.length; // Cycle through testimonials
        updateTestimonial();
    });

    // Previous Button Click Event
    prevBtn.addEventListener("click", () => {
        index = (index - 1 + testimonials.length) % testimonials.length;
        updateTestimonial();
    });

    // Auto-Change Testimonial Every 5 Seconds
    setInterval(() => {
        index = (index + 1) % testimonials.length;
        updateTestimonial();
    }, 5000);
});
document.addEventListener("DOMContentLoaded", () => {
    console.log("Contact & Location Section Loaded!");

    // Get form elements
    const contactForm = document.getElementById("contactForm");
    const formMessage = document.getElementById("formMessage");

    // Form Submission Event
    contactForm.addEventListener("submit", (e) => {
        e.preventDefault(); // Prevent page reload

        // Get input values
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const message = document.getElementById("message").value;

        // Simple Validation
        if (name.trim() === "" || email.trim() === "" || message.trim() === "") {
            formMessage.style.color = "red";
            formMessage.textContent = "⚠️ Please fill in all fields!";
            return;
        }

        // Simulate form submission
        formMessage.style.color = "green";
        formMessage.textContent = "✅ Message sent successfully!";
        
        // Clear form
        contactForm.reset();
    });
});
document.getElementById("contactForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    const response = await fetch("http://localhost:5000/submit-form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message })
    });

    const result = await response.json();
    document.getElementById("formMessage").innerText = result.message;
});
