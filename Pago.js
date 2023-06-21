document.addEventListener('DOMContentLoaded', function() {
  var selectedProductsContainer = document.getElementById('selected-products');

  renderSelectedProducts();

  function renderSelectedProducts() {
    var selectedProducts = JSON.parse(localStorage.getItem('selectedProducts')) || [];

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
      return acc + product.price * product.quantity;
    }, 0);

    // Actualizar el precio total en el elemento <p> correspondiente
    var totalPriceElement = document.getElementById('total-price');
    totalPriceElement.textContent = 'Precio total: $' + totalPrice.toFixed(2);
  }

  function removeFromCart(product) {
    var selectedProducts = JSON.parse(localStorage.getItem('selectedProducts')) || [];
    var index = selectedProducts.findIndex(function(p) {
      return p.name === product.name;
    });

    if (index !== -1) {
      selectedProducts.splice(index, 1);
      localStorage.setItem('selectedProducts', JSON.stringify(selectedProducts));
      renderSelectedProducts();
    }
  }

  function decreaseQuantity(product) {
    var selectedProducts = JSON.parse(localStorage.getItem('selectedProducts')) || [];
    var selectedProduct = selectedProducts.find(function(p) {
      return p.name === product.name;
    });
    if (selectedProduct && selectedProduct.quantity > 1) {
      selectedProduct.quantity--;
      localStorage.setItem('selectedProducts', JSON.stringify(selectedProducts));
      renderSelectedProducts();
    }
  }

  function increaseQuantity(product) {
    var selectedProducts = JSON.parse(localStorage.getItem('selectedProducts')) || [];
    var selectedProduct = selectedProducts.find(function(p) {
      return p.name === product.name;
    });
    if (selectedProduct) {
      selectedProduct.quantity++;
      localStorage.setItem('selectedProducts', JSON.stringify(selectedProducts));
      renderSelectedProducts();
    }
  }

  document.getElementById('payment-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar el envío del formulario

    // Aquí puedes agregar la lógica para validar los campos del formulario si es necesario

    // Mostrar la ventana emergente de compra exitosa
    var productPopup = document.getElementById('success-popup');
    productPopup.classList.remove('ocultar');
  });

  // Función para ocultar la ventana emergente de compra exitosa
  function hideCart() {
    var productPopup = document.getElementById('success-popup');
    productPopup.classList.add('ocultar');
    // Limpiar el formulario
    document.getElementById('payment-form').reset();
  }

  document.getElementById('ok-button').addEventListener('click', function() {
    var selectedProducts = JSON.parse(localStorage.getItem('selectedProducts')) || [];
    var message = "¡Hola! Estoy interesado en los siguientes productos:\n\n";
    var customerName = document.getElementById('name').value + ' ' + document.getElementById('lastname').value;

    message += 'Cliente: ' + customerName + '\n\n';

    // Recorrer los productos seleccionados y agregarlos al mensaje
    selectedProducts.forEach(function(product) {
      message += "- " + product.name + " - Cantidad: " + product.quantity + " - Precio: $" + product.price.toFixed(2) + "\n";
    });

    var totalPrice = selectedProducts.reduce(function(acc, product) {
      return acc + product.price * product.quantity;
    }, 0);

    message += "\nPrecio total: $" + totalPrice.toFixed(2);

    var phoneNumber = "+51951705863"; // Reemplaza con tu número de teléfono

    var whatsappWebLink = "https://web.whatsapp.com/send?phone=" + encodeURIComponent(phoneNumber) + "&text=" + encodeURIComponent(message);

    // Redirigir al enlace de WhatsApp
    window.location.href = whatsappWebLink;
  });
});
