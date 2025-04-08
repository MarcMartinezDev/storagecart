# 🛒 StorageCart

A simple, type-safe shopping cart utility class that persists its data in `localStorage`. Ideal for frontend applications where you need to manage a cart without a backend.

---

## ✨ Features

- 🧠 Fully typed with generics
- 🔄 Persists cart data in `localStorage`
- ➕ Add, remove, and update items
- 💸 Apply discounts and taxes
- 🧹 Clear cart, check item existence, and get totals
- ⚡️ Lightweight and dependency-free

---

## 📦 Installation

```bash
npm install storagecart
```

## 📘 API Reference

### `new Cart<T>()`

Initializes the cart and loads any saved items from `localStorage`.

---

### `add(item: T): void`

Adds a new item to the cart or increases its quantity if it already exists.

- **item**: Object of type `T` with at least `id`, `price`, and `quantity` properties.

---

### `remove(id: string | number): void`

Removes an item from the cart by its ID.

- **id**: The ID of the item to remove.

---

### `less(id: string | number): void`

Decreases the quantity of an item by 1. Removes it if the quantity reaches 0.

- **id**: The ID of the item to decrement.

---

### `more(id: string | number): void`

Increases the quantity of an item by 1.

- **id**: The ID of the item to increment.

---

### `clear(): void`

Empties the entire cart and clears the saved data from `localStorage`.

---

### `discount(rate: number): void`

Applies a discount to all items in the cart.

- **rate**: A number between `0` and `1` (e.g., `0.2` for a 20% discount).

---

### `applyTax(rate: number): void`

Applies tax to all item prices in the cart.

- **rate**: A number between `0` and `1` (e.g., `0.21` for 21% VAT).

---

### `hasItem(id: string | number): boolean`

Checks whether an item exists in the cart.

- **id**: The ID of the item.

---

### `isEmpty(): boolean`

Returns `true` if the cart has no items, otherwise `false`.

---

### `getItems(): T[]`

Returns all current items in the cart.

---

### `getProductAmount(id: string | number): number`

Returns the total amount for a specific item (`quantity × price`).

- **id**: The ID of the item.

---

### `getProductQuantity(id: string | number): number`

Returns the quantity of a specific item in the cart.

- **id**: The ID of the item.

---

### `getTotalAmount(): number`

Returns the total cost of all items in the cart.

---

### `getTotalItemCount(): number`

Returns the total number of items (sum of all quantities) in the cart.

## ✅ Requirements

Modern browser environment (uses localStorage)

TypeScript support
