import React from 'react';
import "./Footer.css";

function Contact() {
    return (
        <footer className="footer">
            <div className="footer-content">
                <p>&copy; {new Date().getFullYear()} Doctor Recommendation Application</p>
                <p>Developed by Team Alpha</p>
                <p>Contact: owner@example.com | Phone: +1-234-567-8900</p>
                <div className="footer-links">
                    <a href="#about">About Us</a> |
                    <a href="#services"> Services</a> |
                    <a href="#contact"> Contact</a>
                </div>
            </div>
        </footer>
    );
}

export default Contact;
