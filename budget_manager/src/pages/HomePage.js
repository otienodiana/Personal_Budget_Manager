// src/pages/HomePage.js
import React from 'react';
import './HomePage.css'; // Import the CSS file for styling

const HomePage = () => {
    return (
        <div className="homepage">
            <header className="homepage-header">
                <h1>Welcome to Budget Manager</h1>
                <p>Effortlessly manage your finances.</p>
                <a href="/add-expense" className="cta-button">Get Started</a>
            </header>

            <section className="features">
                <h2>Features</h2>
                <div className="feature-list">
                    <div className="feature">
                        <h3>Add Expenses</h3>
                    </div>
                    <div className="feature">
                        <h3>View Expenses</h3>
                    </div>
                    <div className="feature">
                        <h3>Budget Alerts</h3>
                    </div>
                </div>
            </section>

            <footer className="homepage-footer">
                <p>&copy; {new Date().getFullYear()} Budget Manager. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default HomePage;
