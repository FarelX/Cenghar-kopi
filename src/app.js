document.addEventListener("alpine:init", () => {
  Alpine.data("products", () => ({
    items: [
      {
        id: 1,
        name: "Robusta Brazil",
        img: "1.jpg",
        price: 20000,
        description: "Rich and full-bodied coffee with hints of chocolate.",
      },
      {
        id: 2,
        name: "Arabica Blend",
        img: "2.jpg",
        price: 25000,
        description: "Smooth and aromatic blend of premium Arabica beans.",
      },
      {
        id: 3,
        name: "Primo Passo",
        img: "3.jpg",
        price: 30000,
        description:
          "Medium roast with a perfect balance of acidity and sweetness.",
      },
      {
        id: 4,
        name: "Aceh Gayo",
        img: "4.jpg",
        price: 35000,
        description:
          "Organic coffee from the highlands of Aceh, known for its unique flavor.",
      },
      {
        id: 5,
        name: "Sumatra Mandheling",
        img: "5.jpg",
        price: 40000,
        description: "Bold and earthy coffee with a deep, rich flavor.",
      },
    ],
    showDetails(item) {
      document.querySelector("#modal-img").src = `img/products/${item.img}`;
      document.querySelector("#modal-title").innerText = item.name;
      document.querySelector("#modal-description").innerText = item.description;
      document.querySelector("#modal-price").innerText = rupiah(item.price);
      Alpine.store("modal").isActive = true; // Aktifkan modal
    },
  }));

  Alpine.store("cart", {
    items: [],
    total: 0,
    quantity: 0,
    add(newItem) {
      const cartItem = this.items.find((item) => item.id === newItem.id);
      if (!cartItem) {
        this.items.push({ ...newItem, quantity: 1, total: newItem.price });
        this.quantity++;
        this.total += newItem.price;
      } else {
        this.items = this.items.map((item) => {
          if (item.id !== newItem.id) {
            return item;
          } else {
            item.quantity++;
            item.total = item.price * item.quantity;
            this.quantity++;
            this.total += item.price;
            return item;
          }
        });
      }
    },
    remove(id) {
      const cartItem = this.items.find((item) => item.id === id);
      if (cartItem.quantity > 1) {
        this.items = this.items.map((item) => {
          if (item.id !== id) {
            return item;
          } else {
            item.quantity--;
            item.total = item.price * item.quantity;
            this.quantity--;
            this.total -= item.price;
            return item;
          }
        });
      } else if (cartItem.quantity === 1) {
        this.items = this.items.filter((item) => item.id !== id);
        this.quantity--;
        this.total -= cartItem.price;
      }
    },
  });

  Alpine.store("modal", {
    isActive: false,
  });
});

// Konversi ke rupiah
const rupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number);
};
