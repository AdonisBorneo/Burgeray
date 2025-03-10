/**
 * Main Application Entry Point
 * 
 * This file serves as the primary entry point for the restaurant ordering system.
 * It implements a Model-View-Controller (MVC) architectural pattern for clean separation of concerns.
 * 
 * Key Features:
 * - Modular design using ES6 modules
 * - MVC architectural pattern
 * - Real-time form validation
 * - Local storage persistence
 * - Responsive design using Bootstrap
 * 
 * Browser Requirements:
 * - Modern JavaScript support (Proxy, Promise, Map)
 * - LocalStorage support
 * - Flexbox support
 */

import Model from './modules/Model.js';
import View from './modules/View.js';
import Controller from './modules/Controller.js';

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Check for essential browser features
    if (!window.Proxy || !window.Promise || !window.Map) {
        console.error('Your browser does not support modern JavaScript features. Please upgrade to a newer browser.');
        return;
    }

    try {
        const app = new Controller(new Model(), new View());
        console.log('Application initialized successfully');
    } catch (error) {
        console.error('Error initializing application:', error);
    }
}); 