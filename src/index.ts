export default class Cart<
  T extends { id: number | string; quantity: number; price: number }
> {
  private _items: Map<string | number, T>;
  private _updateLocalStorage(): void {
    localStorage.setItem(
      "cartItems",
      JSON.stringify(Array.from(this._items.entries()))
    );
  }

  constructor() {
    if (typeof window === "undefined" || typeof localStorage === "undefined") {
      throw new Error(
        "Cart can only be used in a browser environment with localStorage."
      );
    }
    const savedItems = localStorage.getItem("cartItems");
    this._items = savedItems ? new Map(JSON.parse(savedItems)) : new Map();
  }

  /**
   * Adds an item to the cart or increments its quantity if it already exists.
   * The updated cart is then saved to local storage.
   *
   * @param item - The item to be added to the cart. It must conform to type T,
   *               which extends an object with id, quantity, and price properties.
   * @returns void - This function doesn't return a value, it modifies the cart state internally.
   */
  add(item: T): void {
    if (!item.id || !item.price || item.quantity <= 0) {
      throw new Error("Invalid item passed to add method");
    }
    const existingItem = this._items.get(item.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this._items.set(item.id, { ...item });
    }
    this._updateLocalStorage();
  }

  /**
   * Removes an item from the cart and updates the local storage.
   *
   * @param id - The unique identifier of the item to be removed from the cart.
   *             This can be either a number or a string.
   * @returns void - This function doesn't return a value, it modifies the cart state internally.
   */
  remove(id: number | string): void {
    this._items.delete(id);
    this._updateLocalStorage();
  }

  /**
   * Decreases the quantity of an item in the cart by 1 and updates local storage.
   * If the item's quantity becomes 0, it is automatically removed from the cart.
   *
   * @param id - The unique identifier of the item to decrease. Can be either a string or a number.
   * @returns void - This function doesn't return a value, it modifies the cart state internally.
   */
  less(id: string | number): void {
    const existingItem = this._items.get(id);
    if (existingItem) {
      if (existingItem.quantity > 1) {
        existingItem.quantity -= 1;
      } else {
        this.remove(id);
        return;
      }
    }
    this._updateLocalStorage();
  }

  /**
   * Increases the quantity of an item in the cart by 1 and updates local storage.
   *
   * @param id - The unique identifier of the item to increase. Can be either a string or a number.
   * @returns void - This function doesn't return a value, it modifies the cart state internally.
   */
  more(id: string | number): void {
    const existingItem = this._items.get(id);
    if (existingItem) {
      existingItem.quantity += 1;
    }
    this._updateLocalStorage();
  }

  /**
   * Clears all _items from the cart and removes the saved cart from local storage.
   *
   * @returns void - This function doesn't return a value. It resets the cart state and clears local storage.
   */
  clear(): void {
    this._items.clear();
    localStorage.removeItem("cartItems");
    console.log("Cart has been cleared");
  }

  /**
   * Applies a discount to all _items in the cart by reducing their price.
   * The discount should be a value between 0 and 1 (e.g., 0.1 for a 10% discount).
   *
   * @param discount - The discount rate to apply, where 0 is no discount and 1 is a 100% discount.
   *                   It must be a value between 0 and 1.
   * @returns void - This function doesn't return a value. It modifies the cart state internally and updates local storage.
   */
  discount(discount: number): void {
    if (discount < 0 || discount > 1) return;
    this._items.forEach((item) => {
      item.price -= item.price * discount;
    });
    this._updateLocalStorage();
  }

  /**
   * Checks if the cart contains an item with the given ID.
   *
   * @param id - The unique identifier of the item to check.
   * @returns True if the item exists in the cart; otherwise, false.
   */
  hasItem(id: number | string): boolean {
    return this._items.has(id);
  }

  /**
   * Applies a tax rate to all _items in the cart by increasing their price.
   * The tax rate should be a value between 0 and 1 (e.g., 0.2 for a 20% tax).
   *
   * @param taxRate - The tax rate to apply, where 0 is no tax and 1 is a 100% increase.
   * @returns void - This function doesn't return a value. It modifies the cart state and updates local storage.
   */
  applyTax(taxRate: number): void {
    if (taxRate < 0 || taxRate > 1) return;
    this._items.forEach((item) => {
      item.price += item.price * taxRate;
    });
    this._updateLocalStorage();
  }

  /**
   * Checks if the cart is empty.
   *
   * @returns True if the cart contains no _items; otherwise, false.
   */
  isEmpty(): boolean {
    return this._items.size === 0;
  }

  /* Getters */

  /**
   * Retrieves all _items currently in the cart.
   *
   * @returns An array of _items representing the current cart contents.
   */
  getItems(): T[] {
    return Array.from(this._items.values());
  }

  /**
   * Calculates the total amount (quantity * price) for a specific product in the cart.
   *
   * @param id - The unique identifier of the product to calculate the total for. Can be either a string or a number.
   * @returns The total amount for the specified product if it exists in the cart; otherwise, returns 0.
   */
  getProductAmount(id: number | string): number {
    const existingItem = this._items.get(id);
    return existingItem ? existingItem.quantity * existingItem.price : 0;
  }

  /**
   * Retrieves the quantity of a specific product in the cart.
   *
   * @param id - The unique identifier of the product.
   * @returns The quantity of the product if it exists in the cart; otherwise, returns 0.
   */
  getProductQuantity(id: number | string): number {
    const item = this._items.get(id);
    return item ? item.quantity : 0;
  }

  /**
   * Calculates the total amount of all _items in the cart.
   *
   * @returns The total amount for all _items in the cart.
   */
  getTotalAmount(): number {
    let total = 0;
    this._items.forEach((item) => {
      total += item.quantity * item.price;
    });
    return total;
  }

  /**
   * Calculates the total number of _items in the cart (sum of all quantities).
   *
   * @returns The total quantity of all _items in the cart.
   */
  getTotalItemCount(): number {
    let total = 0;
    this._items.forEach((item) => {
      total += item.quantity;
    });
    return total;
  }
}
