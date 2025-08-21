export async function getCartItems() {
  const res = await fetch(`${process.env.API_URL}/cart_items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return;
}
