// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Get all cart items
    const cartItems = document.querySelectorAll('.cart-item');
    const totalPriceElement = document.querySelector('.total-price');
    
    // Function to update total price
    function updateTotalPrice() {
        let total = 0;
        
        // Loop through all cart items that are still in the DOM
        document.querySelectorAll('.cart-item').forEach(item => {
            const price = parseFloat(item.dataset.price);
            const quantity = parseInt(item.querySelector('.quantity').textContent);
            total += price * quantity;
        });
        
        // Update total price display (format to 2 decimal places)
        totalPriceElement.textContent = '$' + total.toFixed(2);
    }
    
    // Function to handle quantity increase
    function increaseQuantity(button) {
        const cartItem = button.closest('.cart-item');
        const quantitySpan = cartItem.querySelector('.quantity');
        let quantity = parseInt(quantitySpan.textContent);
        quantity++;
        quantitySpan.textContent = quantity;
        
        // Update total price
        updateTotalPrice();
    }
    
    // Function to handle quantity decrease
    function decreaseQuantity(button) {
        const cartItem = button.closest('.cart-item');
        const quantitySpan = cartItem.querySelector('.quantity');
        let quantity = parseInt(quantitySpan.textContent);
        
        // Prevent quantity from going below 1
        if (quantity > 1) {
            quantity--;
            quantitySpan.textContent = quantity;
            
            // Update total price
            updateTotalPrice();
        }
    }
    
    // Function to handle like button
    function toggleLike(button) {
        button.classList.toggle('liked');
        
        // Change heart color (if using Font Awesome)
        const heartIcon = button.querySelector('i');
        if (button.classList.contains('liked')) {
            heartIcon.style.color = '#e74c3c'; // Red color for liked
        } else {
            heartIcon.style.color = '#ccc'; // Gray color for unliked
        }
    }
    
    // Function to handle delete item
    function deleteItem(button) {
        const cartItem = button.closest('.cart-item');
        
        // Add fade-out animation
        cartItem.style.transition = 'opacity 0.3s ease';
        cartItem.style.opacity = '0';
        
        // Remove after animation
        setTimeout(() => {
            cartItem.remove();
            
            // Update total price after item is removed
            updateTotalPrice();
            
            // Check if cart is empty
            if (document.querySelectorAll('.cart-item').length === 0) {
                showEmptyCartMessage();
            }
        }, 300);
    }
    
    // Function to show empty cart message
    function showEmptyCartMessage() {
        const cartContainer = document.querySelector('.cart-items');
        const emptyMessage = document.createElement('div');
        emptyMessage.className = 'empty-cart-message';
        emptyMessage.style.textAlign = 'center';
        emptyMessage.style.padding = '40px';
        emptyMessage.style.color = '#999';
        emptyMessage.innerHTML = '<i class="fas fa-shopping-cart" style="font-size: 48px; margin-bottom: 20px;"></i><br>Your cart is empty';
        cartContainer.appendChild(emptyMessage);
    }
    
    // Add event listeners to all initial cart items
    cartItems.forEach(item => {
        // Get buttons for this item
        const plusBtn = item.querySelector('.plus');
        const minusBtn = item.querySelector('.minus');
        const likeBtn = item.querySelector('.like-btn');
        const deleteBtn = item.querySelector('.delete-btn');
        
        // Add event listeners
        plusBtn.addEventListener('click', function(e) {
            increaseQuantity(e.target.closest('.plus'));
        });
        
        minusBtn.addEventListener('click', function(e) {
            decreaseQuantity(e.target.closest('.minus'));
        });
        
        likeBtn.addEventListener('click', function(e) {
            toggleLike(e.target.closest('.like-btn'));
        });
        
        deleteBtn.addEventListener('click', function(e) {
            deleteItem(e.target.closest('.delete-btn'));
        });
    });
    
    // Initial total price calculation
    updateTotalPrice();
    
    // Optional: Add keyboard support for quantity
    document.addEventListener('keydown', function(e) {
        // If focusing on quantity, allow manual input? (bonus feature)
        // This would require additional implementation
    });
    
});
