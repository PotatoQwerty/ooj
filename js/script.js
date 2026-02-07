class Product {
  constructor(id, name, description, price, image) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.image = image;
  }
}

class ShoppingCartItem {
  constructor(quatnity = 0, product) {
    this._quantity = quatnity;
    this.product = product;
    this._liked = false;
  }
  get quantity() {
    return this._quantity;
  }
  increment(by = 1) {
    this._quantity += by;
  }

  decrement(by = 1) {
    this._quantity = Math.max(0, this._quantity - by);
  }

  getTotal() {
    return this._quantity * this.product.price;
  }

  toggleLike() {
    this._liked = !this._liked;
  }

  get liked() {
    return this._liked;
  }
}

class ShoppingCart {
  constructor() {
    this.items = [];
  }

  getProductById(id) {
    return this.items.find((item) => item.product.id === id);
  }

  AddItem(item) {
    const existingItem = this.getProductById(item.product.id);
    if (existingItem) {
      existingItem.increment(item.quantity);
    } else {
      this.items.push(item);
    }
  }

  removeItem(productId) {
    this.items = this.items.filter((item) => item.product.id !== productId);
  }

  getTotalItems() {
    return this.items.reduce((sum, it) => sum + it.quantity, 0);
  }

  getTotalPrice() {
    return this.items.reduce((sum, it) => sum + it.getTotal(), 0);
  }
}
const prodcutsContainer = document.getElementById("products-container");
const totalPrice = document.getElementById("total");

const products = [
  new Product(1, "Socks", "These are socks", 20, "/assets/socks.png"),
  new Product(2, "Baskets", "These are baskets", 50, "/assets/baskets.png"),
  new Product(3, "Bag", "This is a bag", 50, "/assets/bag.png"),
];

let cart = new ShoppingCart();

function updateTotalUI() {
  totalPrice.textContent = `$${cart.getTotalPrice().toFixed(2)}`;
}

products.forEach((product) => {
  const card = document.createElement("div");
  card.dataset.productId = String(product.id);
  card.classList.add("card-body");
  card.innerHTML = `
  <div class="card" style="width: 18rem">
              <img
                src="${product.image}"
                class="card-img-top"
                alt="baskets"
              />
              <div class="card-body">
                <h5 class="card-title">${product.name}</h5>
                <p class="card-text">${product.description}</p>
                <h4 class="unit-price">${product.price} $</h4>
                <div> 
                <button class="btn btn-primary add-to-cart-btn">
                 add to cart
                </button>
                </div>
                <div class="card-footer">
                <div>
                  <i class="fas fa-plus-circle"></i>
                  <span class="quantity">0</span>
                  <i class="fas fa-minus-circle"></i>
                </div>
                <div>
                  <i class="fas fa-trash-alt"></i>
                  <i class="fas fa-heart"></i>
                </div>
                </div>
              </div>
            </div>
  `;
  prodcutsContainer.appendChild(card);
  const plusBtn = card.querySelector(".fa-plus-circle");
  const addToCartBtn = card.querySelector(".add-to-cart-btn");
  const minusBtn = card.querySelector(".fa-minus-circle");
  const quantityEl = card.querySelector(".quantity");
  const heartEl = card.querySelector(".fa-heart");
  const deleteBtn = card.querySelector(".fa-trash-alt");

  const item = new ShoppingCartItem(0, product);
  const isInCart = () => cart.getProductById(product.id);

  if (!isInCart()) {
    card.querySelector(".card-footer").style.display = "none";
  }

  addToCartBtn.addEventListener("click", () => {
    if (!isInCart()) {
      cart.AddItem(item);
      item.increment(1);
      quantityEl.textContent = String(item.quantity);
      addToCartBtn.textContent = "Already in cart";
      addToCartBtn.disabled = true;
      card.querySelector(".card-footer").style.display = "flex";
      updateTotalUI();
    }
  });

  plusBtn.addEventListener("click", () => {
    item.increment(1);
    quantityEl.textContent = String(item.quantity);
    updateTotalUI();
  });
  minusBtn.addEventListener("click", () => {
    item.decrement(1);
    item.getTotal();
    quantityEl.textContent = String(item.quantity);

    if (item.quantity === 0) {
      cart.removeItem(product.id);
      card.remove();
    }

    updateTotalUI();
  });

  deleteBtn.addEventListener("click", () => {
    cart.removeItem(product.id);
    card.remove();
    updateTotalUI();
  });
  heartEl.addEventListener("click", () => {
    item.handleLike();
    heartEl.classList.toggle("liked", item.liked);
  });
});

updateTotalUI();
