// src/pages/HomePage.js
import React from 'react';
import './HomePage.css'; // Import the CSS file for styling

const HomePage = () => {
    return (
        <div className="homepage">
            <header className="homepage-header">
                <h1>Budget Manager</h1>
                <p>Your all-in-one solution for tracking and managing your finances.</p>
                <a href="/add-expense" className="cta-button">Get Started</a>
            </header>

            <section className="overview">
                <h2>Overview</h2>
                <p>
                    Easily track your expenses, set budgets, and receive alerts to keep your finances in check. 
                    Visualize your spending habits and make informed decisions to reach your financial goals.
                </p>
            </section>

            <footer className="homepage-footer">
                <p>&copy; {new Date().getFullYear()} Budget Manager. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default HomePage;
