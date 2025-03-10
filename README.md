# Gourmet Express - Restaurant Ordering System

## Description

Gourmet Express is a restaurant ordering system designed to provide a seamless and efficient way for customers to place orders online. The system features a user-friendly interface, real-time form validation, and local storage persistence to enhance the user experience. The project follows the Model-View-Controller (MVC) architectural pattern to ensure a clean separation of concerns and maintainability.

## Features

- **Quick Delivery**: Fresh food delivered within 30 minutes of ordering.
- **Quality First**: Premium ingredients and expert preparation.
- **Safe & Hygienic**: Strict adherence to food safety standards.
- **Real-time Form Validation**: Immediate feedback on input validity.
- **Local Storage Persistence**: Saves order data between sessions.
- **Responsive Design**: Optimized for both desktop and mobile devices.

## Technologies Used

- HTML5
- CSS3 (Bootstrap 5)
- JavaScript (ES6 Modules)
- Modernizr
- LocalStorage

## Project Structure

```
Burgeray/
├── index.html
├── confirmation.html
├── styles/
│   └── main.css
├── scripts/
│   ├── main.js
│   ├── confirmation.js
│   ├── modules/
│   │   ├── Model.js
│   │   ├── View.js
│   │   └── Controller.js
│   └── data/
│       └── menuData.js
│   └── vendor/
│       └── modernizr-custom.js
└── .vscode/
    └── settings.json
```

## Setup Instructions

1. **Clone the repository:**
   ```sh
   git clone https://github.com/yourusername/Burgeray.git
   cd Burgeray
   ```

2. **Open the project in Visual Studio Code:**
   ```sh
   code .
   ```

3. **Install Live Server extension for Visual Studio Code:**
   - Go to the Extensions view by clicking the Extensions icon in the Sidebar or pressing `Ctrl+Shift+X`.
   - Search for "Live Server" and install it.

4. **Start the Live Server:**
   - Right-click on `index.html` and select "Open with Live Server".
   - The application will open in your default web browser.

## Usage

1. **Home Page:**
   - Welcome message and information about the restaurant.
   - Features section highlighting the benefits of using Gourmet Express.

2. **Order Page:**
   - Select your meal from the dropdown menus.
   - Fill in your customer information.
   - Review your order summary.
   - Place your order.

3. **Confirmation Page:**
   - Displays the confirmed order details.
   - Option to return to the home page.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For any inquiries, please contact us at:
- Email: info@gourmetexpress.com
- Phone: (555) 123-4567

Follow us on social media:
- [Facebook](#)
- [Twitter](#)
- [Instagram](#)
