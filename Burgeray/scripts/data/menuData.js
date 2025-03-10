/**
 * Menu Data Configuration
 * 
 * Defines the complete menu structure for the restaurant ordering system.
 * 
 * Data Structure:
 * - Organized by dish categories (main, side, dessert)
 * - Each item contains:
 *   - id: Unique identifier
 *   - name: Display name
 *   - price: Cost in USD
 *   - image: Path to item image
 * 
 * Image Requirements:
 * - Images stored in category-specific folders
 * - Recommended size: 800x600px
 * - Format: WebP/JPG
 * - Organized in folders:
 *   /images/main/
 *   /images/side/
 *   /images/dessert/
 */

export const menuData = {
    mainDish: [
        { 
            id: 1, 
            name: 'mcburger', 
            price: 12.99, 
            image: './images/main/main1.webp'
        },
        { 
            id: 2, 
            name: 'mcchicken', 
            price: 15.99, 
            image: './images/main/main2.webp'
        },
        { 
            id: 3, 
            name: 'mccheeseburger', 
            price: 13.99, 
            image: './images/main/main3.webp'
        }
    ],
    sideDish: [
        { 
            id: 1, 
            name: 'salad', 
            price: 4.99, 
            image: './images/side/side1.webp'
        },
        { 
            id: 2, 
            name: 'fries', 
            price: 5.99, 
            image: './images/side/side2.webp'
        },
        { 
            id: 3, 
            name: 'mcsalad', 
            price: 3.99, 
            image: './images/side/side3.webp'
        }
    ],
    dessert: [
        { 
            id: 1, 
            name: 'Ice Cream coco', 
            price: 6.99, 
            image: './images/dessert/dessert1.webp'
        },
        { 
            id: 2, 
            name: 'Ice Cream strawberry', 
            price: 7.99, 
            image: './images/dessert/dessert2.webp'
        },
        { 
            id: 3, 
            name: 'Ice Cream caramel', 
            price: 5.99, 
            image: './images/dessert/dessert3.webp'
        }
    ]
}; 