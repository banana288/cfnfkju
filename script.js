document.addEventListener('DOMContentLoaded', function() {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartItemsList = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    const checkoutButton = document.getElementById('checkout-button'); // Get the checkout button

    let cart = JSON.parse(localStorage.getItem('cart')) || []; // Load cart from localStorage

    // Function to update the cart display
    function updateCartDisplay() {
        cartItemsList.innerHTML = '';
        let total = 0;

        cart.forEach(item => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <span>${item.name} - ${item.price} руб.</span>
                <button class="remove-item" data-id="${item.id}">Удалить</button>
            `;
            cartItemsList.appendChild(listItem);
            total += item.price;
        });

        cartTotalElement.textContent = total;
        attachRemoveListeners();
        localStorage.setItem('cart', JSON.stringify(cart)); // Save cart to localStorage
    }

    // Function to attach event listeners to remove buttons
    function attachRemoveListeners() {
        const removeButtons = document.querySelectorAll('.remove-item');
        removeButtons.forEach(button => {
            button.addEventListener('click', function() {
                const itemId = this.dataset.id;
                cart = cart.filter(item => item.id != itemId);
                updateCartDisplay();
            });
        });
    }

    // Add to cart functionality
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const itemId = button.dataset.id;
            const itemName = button.dataset.name;
            const itemPrice = parseFloat(button.dataset.price);

            cart.push({ id: itemId, name: itemName, price: itemPrice });
            updateCartDisplay();
        });
    });

  //Checkout Button
     checkoutButton.addEventListener('click', function() {

         alert('Спасибо за заказ!'); //Display success
          cart = []; //Clear the cart
          updateCartDisplay();//Update the display
     });
    updateCartDisplay();
});