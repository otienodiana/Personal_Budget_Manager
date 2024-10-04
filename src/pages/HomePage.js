// src/pages/HomePage.js
import React from 'react';
import './HomePage.css'; // Import the CSS file for styling

const HomePage = () => {
    return (
        <div className="homepage">
            <header className="homepage-header">
                <h1>Budget Manager</h1>
                <p>Your all-in-one solution for tracking and managing your finances.</p>
                {/* Change the anchor tag to a button for accessibility */}
                <a href="#/add-expense" className="cta-button">
                    <button>Get Started</button>
                </a>
            </header>

            <section className="overview">
                
            </section>

            <footer className="homepage-footer">
                <p>&copy; {new Date().getFullYear()} Budget Manager. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default HomePage;
