/**
 * View Class
 * 
 * Handles all UI interactions and DOM manipulation.
 * Implements the presentation layer of the MVC pattern.
 * 
 * Key Features:
 * - Real-time form validation with visual feedback
 * - Dynamic image loading for menu items
 * - Phone number formatting as user types
 * - Order summary updates
 * - Form submission handling
 * - Responsive design integration
 * 
 * UI Components:
 * - Menu selection dropdowns with images
 * - Customer information form
 * - Order summary display
 * - Validation feedback messages
 * 
 * Validation Rules:
 * - Name: Letters only, minimum 2 characters
 * - Phone: (XXX) XXX-XXXX format
 * - Address: Minimum 10 characters
 */

export default class View {
    constructor() {
        /**
         * Initialize references to DOM elements
         * Select dropdowns for menu items
         */
        // Initialize select elements
        this.mainDishSelect = document.getElementById('mainDish');
        this.sideDishSelect = document.getElementById('sideDish');
        this.dessertSelect = document.getElementById('dessert');

        if (!this.mainDishSelect || !this.sideDishSelect || !this.dessertSelect) {
            console.error('One or more select elements not found');
        }
        
        /**
         * Form elements for customer information and order display
         */
        this.checkoutForm = document.getElementById('checkoutForm');
        this.nameInput = document.getElementById('name');
        this.phoneInput = document.getElementById('phone');
        this.addressInput = document.getElementById('address');
        this.orderSummary = document.getElementById('orderSummary');

        // Initialize event handlers
        if (this.checkoutForm) {
            this.checkoutForm.addEventListener('submit', (e) => {
                e.preventDefault();
                if (this.onFormSubmit) {
                    this.onFormSubmit({
                        name: this.nameInput.value,
                        phone: this.phoneInput.value,
                        address: this.addressInput.value
                    });
                }
            });
        }
    }

    /**
     * Populates a select dropdown with menu items and their images
     * @param {HTMLSelectElement} selectElement - The dropdown to populate
     * @param {Array} items - Array of menu items to display
     * @param {number} selectedId - Optional ID of item to pre-select
     */
    populateSelect(selectElement, items, selectedId = null) {
        // Check if select element exists
        if (!selectElement) {
            console.error('Select element not found');
            return;
        }
        
        const container = selectElement.parentElement;
        
        // Clear existing options and add default option
        selectElement.innerHTML = '<option value="">Select an option</option>';
        
        // Remove existing image if present
        const existingImg = container.querySelector('.menu-item-image');
        if (existingImg) {
            existingImg.remove();
        }
        
        // Check if items array exists and has length
        if (!items || !items.length) {
            console.error('No menu items provided for select:', selectElement.id);
            return;
        }
        
        // Create and append new options for each menu item
        items.forEach(item => {
            const option = document.createElement('option');
            option.value = item.id;
            option.textContent = `${item.name} ($${item.price})`;
            option.dataset.image = item.image;
            if (selectedId && item.id === selectedId) {
                option.selected = true;
                this.displayItemImage(container, item.image);
            }
            selectElement.appendChild(option);
        });
        
        // Add change listener for image updates
        selectElement.removeEventListener('change', this.handleSelectChange);
        this.handleSelectChange = (e) => {
            const selectedOption = e.target.options[e.target.selectedIndex];
            if (selectedOption.dataset.image) {
                this.displayItemImage(container, selectedOption.dataset.image);
            }
        };
        selectElement.addEventListener('change', this.handleSelectChange);
    }

    /**
     * Displays an image next to the select element
     * @param {HTMLElement} container - Container element
     * @param {string} imagePath - Path to the image
     */
    displayItemImage(container, imagePath) {
        try {
            const existingImg = container.querySelector('.menu-item-image');
            if (existingImg) {
                existingImg.remove();
            }
            
            const img = document.createElement('img');
            img.src = imagePath;
            img.classList.add('menu-item-image', 'img-fluid', 'mt-2');
            img.style.maxHeight = '150px';
            img.onerror = () => console.error('Failed to load image:', imagePath);
            container.appendChild(img);
        } catch (error) {
            console.error('Error displaying image:', error);
        }
    }

    /**
     * Updates the order summary display
     * @param {Object} order - Current order state
     * @param {string} total - Calculated total price
     */
    updateOrderSummary(order, total) {
        let summaryHTML = '<div class="mb-3">';
        
        // Add selected items to summary
        if (order.mainDish) {
            summaryHTML += `<p>Main: ${order.mainDish.name} ($${order.mainDish.price})</p>`;
        }
        if (order.sideDish) {
            summaryHTML += `<p>Side: ${order.sideDish.name} ($${order.sideDish.price})</p>`;
        }
        if (order.dessert) {
            summaryHTML += `<p>Dessert: ${order.dessert.name} ($${order.dessert.price})</p>`;
        }
        
        // Add total price
        summaryHTML += `<p class="fw-bold">Total: $${total}</p>`;
        summaryHTML += '</div>';
        
        this.orderSummary.innerHTML = summaryHTML;
    }

    /**
     * Binds change event handlers to select dropdowns
     * @param {Function} handler - Callback function to handle selection changes
     */
    bindSelectChange(handler) {
        const selects = [
            { element: this.mainDishSelect, type: 'mainDish' },
            { element: this.sideDishSelect, type: 'sideDish' },
            { element: this.dessertSelect, type: 'dessert' }
        ];

        selects.forEach(({ element, type }) => {
            if (element) {
                // Remove any existing listeners
                element.removeEventListener('change', element._changeHandler);
                
                // Create new handler and store reference
                element._changeHandler = (event) => {
                    handler(type, event.target.value);
                    
                    // Handle image display
                    const selectedOption = event.target.options[event.target.selectedIndex];
                    if (selectedOption.dataset.image) {
                        this.displayItemImage(element.parentElement, selectedOption.dataset.image);
                    }
                };
                
                // Add new listener
                element.addEventListener('change', element._changeHandler);
            }
        });
    }

    /**
     * Binds submit event handler to the checkout form
     * @param {Function} handler - Callback function to handle form submission
     */
    bindFormSubmit(handler) {
        this.checkoutForm.addEventListener('submit', event => {
            event.preventDefault();
            const customerInfo = {
                name: this.nameInput.value,
                phone: this.phoneInput.value,
                address: this.addressInput.value
            };
            handler(customerInfo);
        });
    }

    /**
     * Displays a success message to the user
     * @param {string} message - Message to display
     */
    showSuccess(message) {
        alert(message);
    }

    /**
     * Populates the customer information form with saved data
     * @param {Object} info - Customer information object
     */
    populateCustomerInfo(info) {
        if (info) {
            this.nameInput.value = info.name || '';
            this.phoneInput.value = info.phone || '';
            this.addressInput.value = info.address || '';
        }
    }

    /**
     * Redirects to order confirmation page
     * @param {Object} order - Current order details
     */
    redirectToConfirmation(order) {
        // Store order details for confirmation page
        sessionStorage.setItem('confirmedOrder', JSON.stringify(order));
        // Clear localStorage after successful order
        localStorage.removeItem('currentOrder');
        window.location.href = 'confirmation.html';
    }

    /**
     * Validates form input and shows appropriate feedback
     * @param {string} inputId - ID of input element to validate
     * @param {boolean} isValid - Whether input is valid
     * @param {string} message - Feedback message to display
     */
    showValidationFeedback(inputId, isValid, message) {
        const input = document.getElementById(inputId);
        const feedbackDiv = input.nextElementSibling || document.createElement('div');
        
        // Remove existing validation classes
        input.classList.remove('is-valid', 'is-invalid');
        feedbackDiv.classList.remove('valid-feedback', 'invalid-feedback');
        
        // Add appropriate validation classes
        input.classList.add(isValid ? 'is-valid' : 'is-invalid');
        feedbackDiv.classList.add(isValid ? 'valid-feedback' : 'invalid-feedback');
        
        // Set feedback message
        feedbackDiv.textContent = message;
        
        // Append feedback div if it doesn't exist
        if (!input.nextElementSibling) {
            input.parentNode.appendChild(feedbackDiv);
        }
    }

    /**
     * Binds input validation events
     * @param {Function} validator - Validation callback function
     */
    bindInputValidation(validator) {
        const inputs = {
            name: {
                element: this.nameInput,
                pattern: /^[A-Za-z\s]{2,}$/,
                format: 'Letters only, at least 2 characters'
            },
            phone: {
                element: this.phoneInput,
                pattern: /^\(\d{3}\) \d{3}-\d{4}$/,
                format: '(XXX) XXX-XXXX',
                formatInput: true
            },
            address: {
                element: this.addressInput,
                pattern: /^.{10,}$/,
                format: 'At least 10 characters'
            }
        };

        Object.entries(inputs).forEach(([inputId, config]) => {
            const input = config.element;
            if (!input) {
                console.error(`Input element not found: ${inputId}`);
                return;
            }

            // Remove existing listeners
            input.removeEventListener('input', input._inputHandler);
            input.removeEventListener('blur', input._blurHandler);

            // Create handlers
            input._inputHandler = (e) => {
                if (config.formatInput) {
                    this.formatPhoneNumber(e.target);
                }
                validator(inputId, e.target.value, config.pattern, config.format);
                this.onInputChange && this.onInputChange(inputId, e.target.value);
            };

            input._blurHandler = (e) => {
                validator(inputId, e.target.value, config.pattern, config.format);
                this.onInputChange && this.onInputChange(inputId, e.target.value);
            };

            // Add new listeners
            input.addEventListener('input', input._inputHandler);
            input.addEventListener('blur', input._blurHandler);
        });
    }

    /**
     * Binds input change handler for saving data
     * @param {Function} handler - Callback function to handle input changes
     */
    bindInputChange(handler) {
        this.onInputChange = handler;
    }

    /**
     * Formats phone number input as user types
     * @param {HTMLInputElement} input - Phone number input element
     */
    formatPhoneNumber(input) {
        let value = input.value.replace(/\D/g, '');
        if (value.length > 0) {
            value = value.match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
            input.value = !value[2] ? value[1] 
                       : !value[3] ? `(${value[1]}) ${value[2]}`
                       : `(${value[1]}) ${value[2]}-${value[3]}`;
        }
    }

    /**
     * Checks if the form is valid
     * @returns {boolean} Whether all required fields are valid
     */
    isFormValid() {
        const inputs = [this.nameInput, this.phoneInput, this.addressInput];
        return inputs.every(input => 
            input.value && 
            input.classList.contains('is-valid')
        );
    }

    /**
     * Displays browser compatibility status to the user
     * @param {boolean} isSupported - Whether browser supports all required features
     * @param {string} message - Feedback message to display
     */
    showBrowserSupport(isSupported, message) {
        // Create or get the support message container
        let supportMessage = document.getElementById('browserSupport');
        if (!supportMessage) {
            supportMessage = document.createElement('div');
            supportMessage.id = 'browserSupport';
            document.querySelector('.container').prepend(supportMessage);
        }

        // Style and populate the message
        supportMessage.className = `alert ${isSupported ? 'alert-success' : 'alert-danger'} mb-4`;
        supportMessage.innerHTML = `
            <h4 class="alert-heading">${isSupported ? 'Browser Compatible' : 'Browser Compatibility Issue'}</h4>
            <p class="mb-0">${message}</p>
            ${!isSupported ? '<hr><p class="mb-0">Please upgrade your browser for the best experience.</p>' : ''}
        `;

        // Disable form interactions if browser is not supported
        if (!isSupported) {
            const forms = document.querySelectorAll('form');
            const selects = document.querySelectorAll('select');
            [...forms, ...selects].forEach(element => {
                element.disabled = true;
            });
        }
    }
} 