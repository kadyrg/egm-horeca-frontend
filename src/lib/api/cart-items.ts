export async function getCartItems(){

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cart_items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    }
  })
  return;
};
