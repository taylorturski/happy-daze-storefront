"use client";

import {useState, useEffect} from "react";

type CartItem = {
  id: string;
  title: string;
  price: string;
  image: string;
};

export default function Cart() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCart() {
      const res = await fetch("/api/cart");
      const data = await res.json();
      setCart(data);
      setLoading(false);
    }

    fetchCart();
  }, []);

  const handleRemoveItem = (id: string) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
  };

  const handleCheckout = () => {
    alert("Proceeding to checkout...");
  };

  if (loading) return <p>Loading cart...</p>;

  return (
    <div style={{padding: "2rem"}}>
      <h3>My Cart</h3>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div>
          {cart.map((item) => (
            <div
              key={item.id}
              style={{
                borderBottom: "1px solid #ddd",
                marginBottom: "1rem",
                paddingBottom: "1rem",
              }}>
              <img
                src={item.image}
                alt={item.title}
                style={{width: "50px", height: "50px", marginRight: "1rem"}}
              />
              <span>{item.title}</span>
              <span>{item.price}</span>
              <button
                onClick={() => handleRemoveItem(item.id)}
                style={{marginLeft: "1rem"}}>
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
      <button onClick={handleCheckout} style={{marginTop: "1rem"}}>
        Proceed to Checkout
      </button>
    </div>
  );
}
