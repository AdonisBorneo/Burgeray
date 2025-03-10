/**
 * Controller Class
 * 
 * Coordinates all interactions between Model and View components.
 * Implements the control layer of the MVC pattern.
 * 
 * Key Responsibilities:
 * - Initializes application components
 * - Handles user interactions
 * - Updates Model based on user input
 * - Updates View based on Model changes
 * - Manages form validation
 * - Handles order submission
 * 
 * Features:
 * - Real-time data saving
 * - Form validation
 * - Browser feature detection
 * - Error handling
 * 
 * Event Handling:
 * - Menu selection changes
 * - Form input validation
 * - Form submission
 * - Order confirmation
 */

export default class Controller {
    /**
     * Constructor sets up the MVC pattern by connecting Model and View
     * Creates the connection between data management and user interface
     * 
     * @param {Model} model - Handles data and business logic
     * @param {View} view - Manages UI and user interaction
     */
    constructor(model, view) {
        this.model = model;
        this.view = view;

        // Initialize immediately since modules are deferred by default
        this.initialize();
    }

    /**
     * Initialize the application
     * Sets up the initial state and binds all event handlers
     * 
     * Process:
     * 1. Comprehensive Modernizr feature detection
     * 2. Initializes menu selection dropdowns
     * 3. Loads any previously saved order
     * 4. Binds all event handlers for user interactions
     */
    initialize() {
        // Comprehensive Modernizr feature detection
        this.checkBrowserSupport();

        // Set up initial application state
        this.initializeSelects();
        this.loadSavedOrder();
        
        // Set up event handlers for all user interactions
        this.view.bindSelectChange(this.handleSelectChange.bind(this));
        this.view.bindFormSubmit(this.handleFormSubmit.bind(this));
        this.view.bindInputValidation(this.validateInput.bind(this));
        this.view.bindInputChange(this.handleInputChange.bind(this));
    }

    /**
     * Checks browser compatibility using Modernizr
     * Verifies all required features before allowing interaction
     */
    checkBrowserSupport() {
        if (typeof Modernizr === 'undefined') {
            console.error('Modernizr not loaded');
            this.view.showBrowserSupport(false, 'Critical error: Feature detection not available');
            return false;
        }

        // Check only features that Modernizr actually tests
        const requiredFeatures = {
            flexbox: 'Flexible Box Layout',
            localstorage: 'Local Storage'
        };

        const missingFeatures = [];

        // Check each required feature
        Object.entries(requiredFeatures).forEach(([feature, description]) => {
            if (!Modernizr[feature]) {
                missingFeatures.push(description);
            }
        });

        // Handle missing features
        if (missingFeatures.length > 0) {
            const message = `Your browser is missing required features: ${missingFeatures.join(', ')}`;
            this.view.showBrowserSupport(false, message);
            return false;
        }

        // All features are supported
        return true;
    }

    /**
     * Initializes all select dropdowns with menu items
     * Sets up the initial state of menu selection UI
     * 
     * Process:
     * 1. Gets menu items for each category from model
     * 2. Finds corresponding select elements in DOM
     * 3. Populates dropdowns with menu options
     * 4. Restores any previously selected items
     * 
     * Error Handling:
     * - Logs errors if select elements are not found
     * - Validates menu item data before population
     */
    initializeSelects() {
        console.log('Initializing selects...');
        ['mainDish', 'sideDish', 'dessert'].forEach(type => {
            const items = this.model.getMenuItems(type);
            console.log(`Got ${items?.length || 0} items for ${type}`);
            const select = document.getElementById(type);
            
            if (!select) {
                console.error(`Select element not found for ${type}`);
                return;
            }

            const currentSelection = this.model.getCurrentOrder()[type];
            this.view.populateSelect(select, items, currentSelection?.id);
        });
    }

    /**
     * Loads and displays any previously saved order
     * Restores the application state from localStorage
     * 
     * Process:
     * 1. Retrieves saved order from model
     * 2. Populates form with saved customer info
     * 3. Updates order summary display
     * 
     * Data Restoration:
     * - Customer information
     * - Selected menu items
     * - Order total
     */
    loadSavedOrder() {
        const currentOrder = this.model.getCurrentOrder();
        this.view.populateCustomerInfo(currentOrder.customerInfo);
        this.updateOrderSummary();
    }

    /**
     * Handles changes to menu item selections
     * Updates model and view when user selects menu items
     * 
     * @param {string} type - Category of item being changed (mainDish, sideDish, dessert)
     * @param {string} itemId - ID of selected item
     * 
     * Process:
     * 1. Updates selection in model
     * 2. Saves to localStorage
     * 3. Updates order summary display
     */
    handleSelectChange(type, itemId) {
        this.model.updateSelection(type, itemId);
        this.updateOrderSummary();
    }

    /**
     * Validates form input in real-time
     * Provides immediate feedback on input validity
     * 
     * @param {string} inputId - ID of input being validated
     * @param {string} value - Current input value
     * @param {RegExp} pattern - Validation pattern to test against
     * @param {string} format - Expected format description for error messages
     * 
     * Validation Rules:
     * - Name: Letters only, minimum 2 characters
     * - Phone: (XXX) XXX-XXXX format
     * - Address: Minimum 10 characters
     */
    validateInput(inputId, value, pattern, format) {
        const isValid = pattern.test(value);
        const message = isValid 
            ? 'Looks good!'
            : `Please enter in format: ${format}`;
        
        this.view.showValidationFeedback(inputId, isValid, message);
    }

    /**
     * Handles form submission with customer information
     * Processes the order when user submits the form
     * 
     * @param {Object} customerInfo - Customer details from form
     * 
     * Process:
     * 1. Validates all form inputs
     * 2. Updates customer info in model
     * 3. Saves final order to storage
     * 4. Redirects to confirmation page
     * 
     * Validation:
     * - Ensures all required fields are valid
     * - Prevents submission if validation fails
     */
    handleFormSubmit(customerInfo) {
        if (this.view.isFormValid()) {
            this.model.updateCustomerInfo(customerInfo);
            const currentOrder = this.model.getCurrentOrder();
            this.view.redirectToConfirmation(currentOrder);
        }
    }

    /**
     * Updates the order summary display
     * Refreshes the UI with current order details
     * 
     * Process:
     * 1. Gets current order state from model
     * 2. Calculates total price
     * 3. Updates summary display in view
     * 
     * Display Updates:
     * - Selected items
     * - Individual prices
     * - Total order amount
     */
    updateOrderSummary() {
        const currentOrder = this.model.getCurrentOrder();
        const total = this.model.calculateTotal();
        this.view.updateOrderSummary(currentOrder, total);
    }

    /**
     * Handles input changes for real-time saving
     * Saves form data as user types
     * 
     * @param {string} field - Field being changed (name, phone, address)
     * @param {string} value - New value entered by user
     * 
     * Process:
     * 1. Updates single field in model
     * 2. Triggers automatic save to localStorage
     * 
     * Features:
     * - Real-time data persistence
     * - Automatic state management
     */
    handleInputChange(field, value) {
        this.model.updateCustomerField(field, value);
    }
} 