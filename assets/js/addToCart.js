function addToCart(id) {
  const item = sessionStorage.getItem("carts");
  const carts = item === null ? [] : JSON.parse(item);
  // check if the existing carts has the same item
  if (carts.length > 0 && carts.findIndex((e) => e.id == id) !== -1) {
    return false;
  }
  carts.push({ id, qty: 1 });
  sessionStorage.setItem("carts", JSON.stringify(carts));
  return true;
}
