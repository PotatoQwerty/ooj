class Product {
  constructor(id, name, price) {
    this.name = name;
    this.id = id;
    this.price = price;
  }
}

class ShoppingCartItem {
  constructor(quatnity, product) {
    this.quantity = quatnity;
    this.product = product;
  }
  getTotal() {
    return this.quantity * this.product.price;
  }
}

class ShoppingCart {
  constructor() {
    this.items = [];
  }
  getTotalItems() {
    return this.items.length;
  }
  getTotalPrice(){
    return this.items.reduce((this.items) => this.items+super(ShoppingCartItem), 0)
  }
  AddItem(itemId) {
    this.items.push(itemId);
  }
  RemoveItem(itemId) {
    return this.items.filter((itemId) => itemId !== this.items);
  }
}

