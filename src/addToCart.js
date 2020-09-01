import Swal from 'sweetalert2';

function addToCart(id) {
  const item = sessionStorage.getItem("carts");
  const carts = item === null ? [] : JSON.parse(item);
  // check if the existing carts has the same item
  if (carts.length < 1 || carts.findIndex((e) => e.id == id) === -1) {
    carts.push({ id, qty: 1 });
    sessionStorage.setItem("carts", JSON.stringify(carts));
  }
  return Swal.fire({
    icon: "success",
    title: "Added to cart",
    text: "Check it out now!",
    timer: 3500,
    position: "bottom-right",
    showCancelButton: true
  }).then(({isConfirmed}) => {
    if (isConfirmed)  window.location.href = "./cart.html"
  })
}

export { addToCart }
