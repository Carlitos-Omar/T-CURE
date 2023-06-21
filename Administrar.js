document.addEventListener('DOMContentLoaded', function() {
  var productContainer = document.getElementById('product-list');
  var products = JSON.parse(localStorage.getItem('products')) || [];

  renderProducts();

  var toggleButton = document.getElementById('toggle-button');
  toggleButton.addEventListener('click', toggleProductList);

  function renderProducts() {
    productContainer.innerHTML = '';
    products.forEach(function(product, index) {
      var productElement = document.createElement('div');
      productElement.classList.add('product-item');

      var productName = document.createElement('h3');
      productName.innerText = product.name;
      productElement.appendChild(productName);

      var productDescription = document.createElement('p');
      productDescription.innerText = product.description;
      productElement.appendChild(productDescription);

      var productPrice = document.createElement('p');
      productPrice.innerText = 'Precio: $' + product.price;
      productElement.appendChild(productPrice);

      var imageElement = document.createElement('img');
      imageElement.src = product.image; // Asigna la cadena base64 directamente al atributo src
      productElement.appendChild(imageElement);

      var editButton = document.createElement('button');
      editButton.innerText = 'Editar';
      editButton.classList.add('edit-btn');
      editButton.dataset.index = index;
      productElement.appendChild(editButton);

      var deleteButton = document.createElement('button');
      deleteButton.innerText = 'Eliminar';
      deleteButton.classList.add('delete-btn');
      deleteButton.dataset.index = index;
      productElement.appendChild(deleteButton);

      productContainer.appendChild(productElement);
    });

    addEventListeners();
  }

  function addEventListeners() {
    var editButtons = document.getElementsByClassName('edit-btn');
    var deleteButtons = document.getElementsByClassName('delete-btn');

    Array.from(editButtons).forEach(function(button) {
      button.addEventListener('click', editProduct);
    });

    Array.from(deleteButtons).forEach(function(button) {
      button.addEventListener('click', deleteProduct);
    });
  }

  function editProduct(event) {
    var index = parseInt(event.target.dataset.index);
    var productElement = event.target.parentNode;
    var product = products[index];

    if (productElement.querySelector('.edit-product')) {
      return;
    }

    var productName = productElement.querySelector('h3');
    var productDescription = productElement.querySelector('p');
    var productPrice = productElement.querySelector('p:nth-child(3)');

    var productNameInput = document.createElement('input');
    productNameInput.type = 'text';
    productNameInput.value = product.name;
    productNameInput.classList.add('edit-product');
    productElement.insertBefore(productNameInput, productName.nextSibling);

    var productDescriptionInput = document.createElement('textarea');
    productDescriptionInput.value = product.description;
    productDescriptionInput.classList.add('edit-product');
    productElement.insertBefore(productDescriptionInput, productDescription.nextSibling);

    var productPriceInput = document.createElement('input');
    productPriceInput.type = 'number';
    productPriceInput.value = product.price;
    productPriceInput.classList.add('edit-product');
    productElement.insertBefore(productPriceInput, productPrice.nextSibling);

    var saveButton = document.createElement('button');
    saveButton.innerText = 'Guardar Cambios';
    saveButton.classList.add('save-btn');
    saveButton.dataset.index = index;
    productElement.appendChild(saveButton);

    disableButtons(index);
    saveButton.addEventListener('click', saveProduct);
  }

  function deleteProduct(event) {
    var index = parseInt(event.target.dataset.index);
    products.splice(index, 1);
    localStorage.setItem('products', JSON.stringify(products));
    renderProducts();
  }

  function saveProduct(event) {
    var index = parseInt(event.target.dataset.index);
    var productElement = event.target.parentNode;
    var product = products[index];

    var productNameInput = productElement.querySelector('input[type="text"]');
    var productDescriptionInput = productElement.querySelector('textarea');
    var productPriceInput = productElement.querySelector('input[type="number"]');

    product.name = productNameInput.value;
    product.description = productDescriptionInput.value;
    product.price = parseFloat(productPriceInput.value);

    localStorage.setItem('products', JSON.stringify(products));
    renderProducts();
  }

  function disableButtons(index) {
    var editButtons = document.getElementsByClassName('edit-btn');
    var deleteButtons = document.getElementsByClassName('delete-btn');

    Array.from(editButtons).forEach(function(button) {
      button.disabled = true;
    });

    Array.from(deleteButtons).forEach(function(button) {
      button.disabled = true;
    });

    editButtons[index].disabled = false;
    deleteButtons[index].disabled = false;
  }

  function toggleProductList() {
    if (productContainer.style.display === 'none') {
      productContainer.style.display = 'block';
      toggleButton.innerText = 'Ocultar Productos';
    } else {
      productContainer.style.display = 'none';
      toggleButton.innerText = 'Mostrar Productos';
    }

    // Agrega este código adicional para restablecer el estilo
    if (productContainer.style.display === 'block') {
      productContainer.style.display = 'flex';
      productContainer.style.flexWrap = 'wrap';
      productContainer.style.justifyContent = 'flex-start';
    }
  }

  document.getElementById('product-form').addEventListener('submit', submitHandler);

  function submitHandler(e) {
    e.preventDefault();

    var nameInput = document.getElementById('name');
    var descriptionInput = document.getElementById('description');
    var priceInput = document.getElementById('price');
    var imageInput = document.getElementById('image');

    // Convierte la imagen a una cadena base64
    var reader = new FileReader();
    reader.onload = function(event) {
      var product = {
        name: nameInput.value,
        description: descriptionInput.value,
        price: parseFloat(priceInput.value),
        image: event.target.result // Asigna la cadena base64 al objeto del producto
      };

      var existingProduct = products.find(function(p) {
        return p.name.toLowerCase() === product.name.toLowerCase();
      });

      if (existingProduct) {
        alert('Ya existe un producto con el mismo nombre.');
        return;
      }

      products.push(product);
      localStorage.setItem('products', JSON.stringify(products));

      nameInput.value = '';
      descriptionInput.value = '';
      priceInput.value = '';
      imageInput.value = '';

      renderProducts();
    };

    reader.readAsDataURL(imageInput.files[0]);
  }
});
