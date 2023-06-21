document.addEventListener('DOMContentLoaded', function() {
  var productContainer = document.getElementById('product-list');
  var selectedProductsContainer = document.getElementById('selected-products');
  var cartCount = document.getElementById('cart-count');
  var totalPriceElement = document.getElementById('total-price');
  var products = JSON.parse(localStorage.getItem('products')) || [];
  var selectedProducts = [];
  renderProducts();
  renderSelectedProducts();//Carga los productos al regresar a la tienda desde el pago

  function renderProducts() {
    productContainer.innerHTML = '';
      // Verificar si hay productos seleccionados en el LocalStorage
  var storedSelectedProducts = JSON.parse(localStorage.getItem('selectedProducts'));
  if (storedSelectedProducts && storedSelectedProducts.length > 0) {
    selectedProducts = storedSelectedProducts;
  }
    products.forEach(function(product) {
      var productElement = document.createElement('div');
      productElement.classList.add('product-item');
      productElement.innerHTML = '<h3>' + product.name + '</h3>' +
                                 '<p>' + product.description + '</p>' +
                                 '<p> Precio: $' + product.price + '</p>' +
                                 '<div class="product-image-container">' +
                                 '<img class="product-image" src="' + product.image + '" alt="Product Image">' +
                                 '</div>' +
                                 '<button class="add-to-cart" data-product-name="' + product.name + '">Agregar al carrito</button>';

      productElement.querySelector('.add-to-cart').addEventListener('click', function() {
        addToCart(product);
      });

      productContainer.appendChild(productElement);
    });

    updateTotalPrice();
  
    // Añadir evento al enlace "Carrito de compras"
    var cartLink = document.querySelector('#cart-link');
    cartLink.addEventListener('click', function(event) {
      event.preventDefault();
      showCart();
    });
  }
 
  function addToCart(product) {
    var existingProduct = selectedProducts.find(function(selectedProduct) {
      return selectedProduct.name === product.name;
    });

    if (existingProduct) {
      existingProduct.quantity++;
    } else {
      product.quantity = 1;
      selectedProducts.push(product);
    }
    // Obtener una referencia al elemento seleccionado del producto
  var selectedProductElement = document.getElementById('selected-products');
  // Guardar los productos seleccionados en el LocalStorage
  localStorage.setItem('selectedProducts', JSON.stringify(selectedProducts));
    renderSelectedProducts();
    showCart();
    updateCartCount();
    updateTotalPrice();

  }

  function renderSelectedProducts() {
    selectedProductsContainer.innerHTML = '';
    selectedProducts.forEach(function(product) {
      var selectedProductElement = document.createElement('div');

      selectedProductElement.classList.add('selected-product');
      selectedProductElement.innerHTML = '<div class="selected-product-info">' +
                                         '<div class="selected-product-image-wrapper">' +
                                         '<img class="selected-product-image" src="' + product.image + '" alt="Product Image">' +
                                         '</div>' +
                                         '<div class="selected-product-details">' +
                                         '<h3 class="selected-product-name">' + product.name + '</h3>' +
                                         '<p class="selected-product-description">' + product.description + '</p>' +
                                         '<p class="selected-product-price">Precio: $' + product.price + '</p>' +
                                         '</div>' +
                                         '</div>' +
                                         '<div class="selected-product-actions">' +
                                         '<button class="remove-from-cart">x</button>' +
                                         '<div class="product-quantity">' +
                                         '<button class="decrease-quantity">-</button>' +
                                         '<span class="quantity">' + product.quantity + '</span>' +
                                         '<button class="increase-quantity">+</button>' +
                                         '</div>' +
                                         '</div>';

      selectedProductElement.querySelector('.remove-from-cart').addEventListener('click', function() {
        removeFromCart(product);
      });

      selectedProductElement.querySelector('.decrease-quantity').addEventListener('click', function() {
        decreaseQuantity(product);
      });

      selectedProductElement.querySelector('.increase-quantity').addEventListener('click', function() {
        increaseQuantity(product);
      });

      selectedProductsContainer.appendChild(selectedProductElement);
    });
    
  // Calcular el precio total
  var totalPrice = selectedProducts.reduce(function(acc, product) {
    return acc + (product.price * product.quantity);
  }, 0);

  // Actualizar el precio total en el elemento <p> correspondiente
  var totalPriceElement = document.getElementById('total-price');
  totalPriceElement.textContent = 'Precio total: $' + totalPrice.toFixed(2);

  }

  function removeFromCart(product) {
    var index = selectedProducts.indexOf(product);
    if (index !== -1) {
      selectedProducts.splice(index, 1);
      renderSelectedProducts();
      updateCartCount();
      updateTotalPrice();
      
    // Guardar los productos seleccionados actualizados en el LocalStorage
    localStorage.setItem('selectedProducts', JSON.stringify(selectedProducts));
    }
  }

  function decreaseQuantity(product) {
    if (product.quantity > 1) {
      product.quantity--;
      renderSelectedProducts();
      updateTotalPrice();
    }
  }

  function increaseQuantity(product) {
    product.quantity++;
    renderSelectedProducts();
    updateTotalPrice();
  }

  function showCart() {
    var popup = document.getElementById('product-popup');
    popup.classList.remove('hidden');
    productContainer.classList.add('shifted');
   
  }

  function hideCart() {
    var popup = document.getElementById('product-popup');
    popup.classList.add('hidden');
    productContainer.classList.remove('shifted');
  }

  function updateCartCount() {
    var count = selectedProducts.reduce(function(acc, product) {
      return acc + product.quantity;
    }, 0);
    cartCount.innerText = count;
  }

  function updateTotalPrice() {
    var totalPrice = selectedProducts.reduce(function(acc, product) {
      return acc + product.price * product.quantity;
    }, 0);
    totalPriceElement.innerText = '$' + totalPrice.toFixed(2);
  }
  function redirectToPayment() {
    // Guardar los productos seleccionados en el LocalStorage
  localStorage.setItem('selectedProducts', JSON.stringify(selectedProducts));
    window.location.href = 'Pago.html';
  }
  var continueShoppingButton = document.getElementById('continue-shopping-button');
  var payButton = document.getElementById('pay-button');

  continueShoppingButton.addEventListener('click', function() {
    hideCart();
    updateCartCount();
  });

  payButton.addEventListener('click', function() {
    redirectToPayment();
    // Lógica para procesar el pago
  });
});

