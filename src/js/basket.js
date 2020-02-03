let basket = {
  kayak: {
    name: 'Байдарка',
    cost: 16500,
    quantity: 0,
  },
  paddle: {
    name: 'Весла',
    cost: 100,
    quantity: 0,
  },
  hermeticBag70: {
    name: 'Гермомішок 70л',
    cost: 10,
    quantity: 0,
  },
  hermeticBag10: {
    name: 'Гермомішок 10л',
    cost: 1,
    quantity: 0,
  }
};

if(localStorage.getItem('basket') === null) {
  localStorage.basket = JSON.stringify(basket);
} else {
  basket = JSON.parse(localStorage.basket);
}
const quantity = basket.kayak.quantity + basket.paddle.quantity + basket.hermeticBag70.quantity + basket.hermeticBag10.quantity;
  if(quantity !== 0) {
    document.getElementById('basket_quantity').style = "display: block;"
    document.getElementById('basket_quantity').innerHTML = quantity;
  }

const updateCost = () => {
  const temporarilyBasket = JSON.parse(localStorage.basket);

  let cost = 0;

  for (const key in temporarilyBasket) {
    cost += temporarilyBasket[key].quantity * temporarilyBasket[key].cost
  }

  document.getElementById('form_price').innerHTML = cost;
}
updateCost();

const updateBasket = () => {
  localStorage.basket = JSON.stringify(basket);

  if(document.getElementById('list_buy_accessories')) updateListAccessories();
  updateCost();
  const quantity = basket.kayak.quantity + basket.paddle.quantity + basket.hermeticBag70.quantity + basket.hermeticBag10.quantity;
  if(quantity !== 0) {
    document.getElementById('basket_quantity').style = "display: block;"
    document.getElementById('basket_quantity').innerHTML = quantity;
  }
}

const updateListAccessories = () => {
  document.getElementById('product_quantity').innerHTML = basket.kayak.quantity;
  document.getElementById('product_paddle_quantity').innerHTML = basket.paddle.quantity;
  document.getElementById('product_hermeticBag70_quantity').innerHTML = basket.hermeticBag70.quantity;
  document.getElementById('product_hermeticBag10_quantity').innerHTML = basket.hermeticBag10.quantity;

  document.getElementById('product_kayak_cost').innerHTML = basket.kayak.quantity === 0 ? basket.kayak.cost : basket.kayak.quantity * basket.kayak.cost;
  document.getElementById('product_paddle_cost').innerHTML = basket.paddle.quantity === 0 ? basket.paddle.cost : basket.paddle.quantity * basket.paddle.cost;
  document.getElementById('product_hermeticBag70_cost').innerHTML = basket.hermeticBag70.quantity === 0 ? basket.hermeticBag70.cost : basket.hermeticBag70.quantity * basket.hermeticBag70.cost;
  document.getElementById('product_hermeticBag10_cost').innerHTML = basket.hermeticBag10.quantity === 0 ? basket.hermeticBag10.cost : basket.hermeticBag10.quantity * basket.hermeticBag10.cost;
}

document.getElementById('btn_add_paddle').addEventListener('click', () => {
  basket.paddle.quantity += 1;
  updateBasket();
});
document.getElementById('product_paddle_add').addEventListener('click', () => {
  basket.paddle.quantity += 1;
  updateBasket();
});
document.getElementById('product_paddle_remove').addEventListener('click', () => {
  if(basket.paddle.quantity > 0) basket.paddle.quantity -= 1;
  updateBasket();
});


document.getElementById('btn_add_hermeticBag70').addEventListener('click', () => {
  basket.hermeticBag70.quantity += 1;
  updateBasket();
});
document.getElementById('product_hermeticBag70_add').addEventListener('click', () => {
  basket.hermeticBag70.quantity += 1;
  updateBasket();
});
document.getElementById('product_hermeticBag70_remove').addEventListener('click', () => {
  if(basket.hermeticBag70.quantity > 0) basket.hermeticBag70.quantity -= 1;
  updateBasket();
});

const btnAddHermeticBag10 = document.getElementById('btn_add_hermeticBag10')
btnAddHermeticBag10.addEventListener('click', () => {
  basket.hermeticBag10.quantity += 1;
  
  btnAddHermeticBag10.classList.add('click');
  setTimeout(() => btnAddHermeticBag10.classList.remove('click'), 2000);
  updateBasket();
});
document.getElementById('product_hermeticBag10_add').addEventListener('click', () => {
  basket.hermeticBag10.quantity += 1;
  updateBasket();
});
document.getElementById('product_hermeticBag10_remove').addEventListener('click', () => {
  if(basket.hermeticBag10.quantity > 0) basket.hermeticBag10.quantity -= 1;
  updateBasket();
});


// document.getElementById('form_for_buy').addEventListener('submit', () => {
//   localStorage.removeItem('basket');
//   updateBasket();
// });

document.getElementById('btn_order').addEventListener('click', () => {
  if(basket.kayak.quantity === 0) basket.kayak.quantity = 1;
  updateBasket();
});
document.getElementById('product_quantity_add').addEventListener('click', () => {
  basket.kayak.quantity += 1;
  updateBasket();
});
document.getElementById('product_quantity_remove').addEventListener('click', () => {
  if(basket.kayak.quantity > 0) basket.kayak.quantity -= 1;
  updateBasket();
});
