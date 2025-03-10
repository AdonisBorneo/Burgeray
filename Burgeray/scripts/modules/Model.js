/**
 * Model Class
 * 
 * Responsible for all data management and business logic in the application.
 * Implements the data layer of the MVC pattern.
 * 
 * Key Responsibilities:
 * - Manages menu data (main dishes, side dishes, desserts)
 * - Handles order state management
 * - Provides data persistence using localStorage
 * - Calculates order totals
 * - Validates and processes customer information
 * 
 * Data Persistence:
 * - All order data is automatically saved to localStorage
 * - Data is restored when the page reloads
 * - Order history is maintained between sessions
 */
import { menuData } from '../data/menuData.js';

export default class Model {
    /**
     * Constructor initializes the model with:
     * - Menu data from external source
     * - Empty order state
     * - Loads any existing order from localStorage
     */
    constructor() {
        console.log('Initializing Model...');
        /**
         * Menu data structure
         * Contains all available items organized by category (mainDish, sideDish, dessert)
         * Each item has: id (unique identifier), name (display name), price (in USD)
         */
        this.menuData = menuData;
        console.log('Menu data loaded:', this.menuData);
        
        /**
         * Current order state structure:
         * - mainDish: Selected main dish
         * - sideDish: Selected side dish
         * - dessert: Selected dessert
         * - customerInfo: Customer details (name, phone, address)
         */
        this.currentOrder = {
            mainDish: null,
            sideDish: null,
            dessert: null,
            customerInfo: {
                name: '',
                phone: '',
                address: ''
            }
        };
        
        // Load any saved order data
        this.loadFromLocalStorage();
    }

    /**
     * Persists the current order state to localStorage
     * Allows order to persist between page refreshes
     */
    saveToLocalStorage() {
        localStorage.setItem('currentOrder', JSON.stringify(this.currentOrder));
    }

    /**
     * Retrieves and restores any previously saved order from localStorage
     * Called during initialization to restore user's previous order
     */
    loadFromLocalStorage() {
        const savedOrder = localStorage.getItem('currentOrder');
        if (savedOrder) {
            this.currentOrder = JSON.parse(savedOrder);
        }
    }

    /**
     * Updates the selected item for a given menu type
     * @param {string} type - Category of item (mainDish, sideDish, dessert)
     * @param {number} itemId - ID of the selected item
     */
    updateSelection(type, itemId) {
        const item = this.menuData[type].find(item => item.id === parseInt(itemId));
        this.currentOrder[type] = item;
        // Save to localStorage immediately after any change
        this.saveToLocalStorage();
    }

    /**
     * Updates customer information in the current order
     * @param {Object} info - Customer details (name, phone, address)
     */
    updateCustomerInfo(info) {
        this.currentOrder.customerInfo = { ...info };
        // Save to localStorage immediately after any change
        this.saveToLocalStorage();
    }

    /**
     * Updates a single field of customer information
     * @param {string} field - Field to update (name, phone, address)
     * @param {string} value - New value for the field
     */
    updateCustomerField(field, value) {
        this.currentOrder.customerInfo[field] = value;
        // Save to localStorage immediately after any change
        this.saveToLocalStorage();
    }

    /**
     * Retrieves menu items for a specific category
     * @param {string} type - Category to retrieve (mainDish, sideDish, dessert)
     * @returns {Array} Array of menu items for the specified category
     */
    getMenuItems(type) {
        return this.menuData[type];
    }

    /**
     * Returns the current order state
     * @returns {Object} Complete current order including selections and customer info
     */
    getCurrentOrder() {
        return this.currentOrder;
    }

    /**
     * Calculates the total price of the current order
     * @returns {string} Total price formatted to 2 decimal places
     * Sums up prices of all selected items (main dish, side dish, dessert)
     */
    calculateTotal() {
        let total = 0;
        ['mainDish', 'sideDish', 'dessert'].forEach(type => {
            if (this.currentOrder[type]) {
                total += this.currentOrder[type].price;
            }
        });
        return total.toFixed(2);
    }
} 