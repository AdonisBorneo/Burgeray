/**
 * Confirmation page script
 * Displays the confirmed order details
 */
document.addEventListener('DOMContentLoaded', () => {
    const orderDetails = document.getElementById('orderDetails');
    const confirmedOrder = JSON.parse(sessionStorage.getItem('confirmedOrder'));

    if (confirmedOrder) {
        let html = `
            <h2 class="h4 mb-4">Order Details</h2>
            <div class="row">
        `;

        // Add selected items with images
        if (confirmedOrder.mainDish) {
            html += createItemHtml('Main Dish', confirmedOrder.mainDish);
        }
        if (confirmedOrder.sideDish) {
            html += createItemHtml('Side Dish', confirmedOrder.sideDish);
        }
        if (confirmedOrder.dessert) {
            html += createItemHtml('Dessert', confirmedOrder.dessert);
        }

        html += `</div>
            <div class="mt-4">
                <h3 class="h5">Delivery Information</h3>
                <p>Name: ${confirmedOrder.customerInfo.name}</p>
                <p>Phone: ${confirmedOrder.customerInfo.phone}</p>
                <p>Address: ${confirmedOrder.customerInfo.address}</p>
            </div>
        `;

        orderDetails.innerHTML = html;
    } else {
        orderDetails.innerHTML = '<p>No order details found.</p>';
    }
});

function createItemHtml(type, item) {
    return `
        <div class="col-md-4 mb-3">
            <div class="card h-100">
                <img src="${item.image}" class="card-img-top" alt="${item.name}">
                <div class="card-body">
                    <h5 class="card-title">${type}</h5>
                    <p class="card-text">${item.name}</p>
                    <p class="card-text">$${item.price}</p>
                </div>
            </div>
        </div>
    `;
} 