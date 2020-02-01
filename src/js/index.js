document.addEventListener('DOMContentLoaded', () => {
  window.onload = () => {
    setTimeout(() => {
      document.getElementById('preloader').classList.remove('preloader');
    }, 200);
  }
//   const form = document.getElementById('order_form');

//   const productQuantityAdd = document.getElementById('product_quantity_add');
//   productQuantityAdd.addEventListener('click', () => productQuantity.add() )

//   const productQuantityRemove = document.getElementById('product_quantity_remove');
//   productQuantityRemove.addEventListener('click', () => productQuantity.remove() )

//   const formBuy = document.getElementById('form_for_buy');
//   const blockThanks = document.getElementById('block_thanks');

//   const token = '1044259808:AAF0EFWvyOUOPGBv69Jvpix1bexbzMLB9aY';
//   const chatId = "-336008217";

//   form.addEventListener('submit', e => {
//     e.preventDefault();
//     const message = `__________________________%0AУ товарища возник вопрос %0A<b>Имя:</b> ${e.target.name.value}%0A<b>Номер телефона:</b> ${e.target.phone.value}%0A__________________________`;

//     fetch(`https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&parse_mode=html&text=${message}`)
//       .then((res) => {
//         console.log(res.json());
//       })
//       .catch((error) => {
//         console.log(error);
//       });
      
//   });



//   class ProductQuantity {
//     constructor(option) {
//       this.onChange = option.onChange;
//       this.onChangeSelectSize = option.onChangeSelectSize;
//       this.onChangeSelectSizePants = option.onChangeSelectSizePants;

//       this.quantity = 1;

//       this.listSize = ['S', 'M', 'L', 'XL'];
//       this.chosenSize = [];
//       this.chosenSizePants = [];

//       this.selectSize = this.selectSize.bind(this);
//       this.selectSizePants = this.selectSizePants.bind(this);

//       option.drawListSize(this.listSize);
//       option.addListenerOnList(this.selectSize, this.selectSizePants);
//     }

//     selectSizePants(size) {
//       this.chosenSizePants.unshift(size);

//       this.chosenSizePants = this.chosenSizePants.slice(0, this.quantity);

//       this.onChangeSelectSizePants(this.chosenSizePants);
//     }

//     selectSize(size) {
//       this.chosenSize.unshift(size);

//       this.chosenSize = this.chosenSize.slice(0, this.quantity);

//       this.onChangeSelectSize(this.chosenSize);
//     }

//     add() {
//       this.quantity += 1;
//       this.saveCheange();
//     }

//     remove() {
//       this.quantity -= this.quantity - 1 ? 1 : 0;

//       this.chosenSizePants.pop();
//       this.chosenSize.pop();

//       this.saveCheange();
//     }

//     saveCheange() {
//       this.onChange(this.quantity);

//       this.onChangeSelectSizePants(this.chosenSizePants);
//       this.onChangeSelectSize(this.chosenSize);
//     }
//   }

//   const elemListSize = document.getElementById('form_list_size');
//   const elemListSizePants = document.getElementById('form_list_size_pants');

//   const elemQuantity = document.getElementById('product_quantity');
//   const formPrice = document.getElementById('form_price');
//   const sectionBuy = document.getElementById('section_buy');


//   document.getElementById('btn_buy').addEventListener('click', () => {
//     sectionBuy.classList.add('section_buy_active');
//     formBuy.classList.remove('form_for_buy_none');
//   })

//   document.getElementById('form_buy_btn_closse').addEventListener('click', () => {
//     sectionBuy.classList.remove('section_buy_active');
//   })

//   const productQuantity = new ProductQuantity({
//     onChange: (quantity) => {
//       elemQuantity.innerHTML = quantity;
//       formPrice.innerHTML = quantity * 699;
//     },
//     drawListSize: (listSize) => {
//       listSize.forEach((elem) => {
//         elemListSize.innerHTML += `<li>${elem}</li>`;
//         elemListSizePants.innerHTML += `<li>${elem}</li>`;
//       });
//     },
//     addListenerOnList: (func, funcPants) => {
//         for (let i = 0; i < elemListSize.children.length; i++) {
//         elemListSize.children[i].addEventListener('click', e => func(e.target.innerHTML));
//         elemListSizePants.children[i].addEventListener('click', e => funcPants(e.target.innerHTML));;
//       }
//     },
//     onChangeSelectSize: arrSelect => {
//       for (let i = 0; i < elemListSize.children.length; i++) {
//         elemListSize.children[i].classList.remove('form_item_size_active');
//       }

//       arrSelect.forEach(elem => {
//         for (let i = 0; i < elemListSize.children.length; i++) {
//           const elemItemSize = elemListSize.children[i];

//           if(elemItemSize.innerHTML === elem) {
//             elemItemSize.classList.add('form_item_size_active');
//           };
//         }
//       });

//     },
//     onChangeSelectSizePants: arrSelect => {
//       for (let i = 0; i < elemListSizePants.children.length; i++) {
//         elemListSizePants.children[i].classList.remove('form_item_size_active');
//       }

//       arrSelect.forEach(elem => {
//         for (let i = 0; i < elemListSizePants.children.length; i++) {
//           const elemItemSize = elemListSizePants.children[i];

//           if(elemItemSize.innerHTML === elem) {
//             elemItemSize.classList.add('form_item_size_active');
//           };
//         }
//       });

//     }
//   });


//   formBuy.addEventListener('submit', e => {
//     e.preventDefault();
//     const message = `__________________________%0A<b>Имя Фамилия:</b> ${e.target.buy_name.value}%0A<b>Номер телефона:</b> ${e.target.bay_phone.value}%0A<b>Город:</b> ${e.target.city.value}%0A<b>Отделение НП:</b> ${e.target.indexWarehouse.value}%0A<b>Количество:</b> ${productQuantity.quantity}%0A<b>Размер худи:</b> ${productQuantity.chosenSize.toString()}%0A<b>Размер штанов:</b> ${productQuantity.chosenSizePants.toString()}%0A<b>Стоимость:</b> ${formPrice.innerText}%0A_______________________________`;

//     fetch(`https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&parse_mode=html&text=${message}`)
//       .then((res) => {
//         formBuy.classList.add('form_for_buy_none');
//         blockThanks.classList.remove('block_thanks_none');
//         document.getElementById('block_thanks_massage').innerHTML = `
//               Имя Фамилия:&emsp; <big>${e.target.buy_name.value}</big> <br>
//               Номер телефона:&emsp; <big>${e.target.bay_phone.value}</big> <br>
//               Город:&emsp; <big>${e.target.city.value}</big> <br>
//               № Отделение Новой Почты:&emsp; <big>${e.target.indexWarehouse.value}</big> <br>
//               Количество:&emsp; <big>${productQuantity.quantity}</big> <br>
//               Размер штанов:&emsp; <big>${productQuantity.chosenSizePants.toString()}</big> <br>
//               Размер худи:&emsp; <big>${productQuantity.chosenSize.toString()}</big> <br>
//               Стоимость:&emsp; <big>${formPrice.innerText} грн</big> <br>`;

//           document.getElementById('block_thanks_closse').addEventListener('click', () => {
//             blockThanks.classList.add('block_thanks_none');
//             document.getElementById('section_buy').classList.remove('section_buy_active');
//           })

//           document.getElementById('return').addEventListener('click', () => {
//             blockThanks.classList.add('block_thanks_none');
//             formBuy.classList.remove('form_for_buy_none');
//           })
//       })
//       .catch((error) => {
//         alert(error);
//       });
      
//   });

// document.getElementById('body').addEventListener('click', (e) => {
//   if(e.target.id === 'phone_menu' || e.target.id === 'btn_phone_menu' ) {
//   } else {
//     console.log('closse');
//     phoneMenu.classList.remove('phone_menu_active');
//     btnMenu.classList.remove('btn_phone_menu_active');
//   };
// });

// section_buy{

  // console.dir(window.innerHeight);
  // console.dir(window.outerHeight);
  // console.dir(window.clientHeight);

  // console.dir(elem);
  // console.log(elem.clientHeight);
  // console.log(elem.offsetTop);
  // console.log(elem.classList);
  // console.log(elem.id);
  // console.log((elem.clientHeight + elem.offsetTop) - (window.scrollY + 81));
  // console.log(window.scrollY + window.innerHeight - elem.offsetTop);
  // console.log('             ');
  const
      headlineQuestion = document.getElementById('headline_question'),
      orderForm = document.getElementById('order_form'),
      description = document.getElementById('description'),
      headline = document.getElementById('headline'),
      accessories = document.getElementById('accessories'),
      specifications = document.getElementById('specifications');

  const isVisible = (elem) => {
  const 
      up = (elem.clientHeight + elem.offsetTop) - (window.scrollY + 81) > 100,
      down = window.scrollY + window.innerHeight - elem.offsetTop > 250;

  if (up && down) {
      elem.classList.add(`${elem.id}_active`);
  } else {
      elem.classList.remove(`${elem.id}_active`);
  }

  return up && down;
}

window.onscroll = () => {
    isVisible(headlineQuestion);
    isVisible(description);
    isVisible(headline);
    isVisible(orderForm);
    isVisible(accessories);
    isVisible(specifications);
}


// phone_btn_order
// btn_order

// section_buy
const btnAsk = document.getElementById('btn_ask');
const btnBuy = document.getElementById('btn_order');

const postAlert = () => {
  let check = true;

  const call = (func, delay) => {
    setTimeout(() => {
      if(check) func();
    }, delay);
  }

  const timerStart = () => {
    call(() => btnAsk.classList.add('btn_ask_alert'), 2000);
    call(() => btnAsk.classList.remove('btn_ask_alert'), 7000);
    call(() => btnBuy.classList.add('btn_order_alert'), 12000);
    call(() => btnBuy.classList.remove('btn_order_alert'), 17000);
    setTimeout(timerStart, 40000);
  };
  timerStart();

  btnAsk.addEventListener('mouseover', () => {
    btnBuy.classList.remove('btn_order_alert');
    btnAsk.classList.add('btn_ask_alert');
    check = false;
  });

  btnAsk.addEventListener('mouseout', () => {
    btnAsk.classList.remove('btn_ask_alert');
    check = true;
  });

  btnBuy.addEventListener('mouseover', () => {
    btnAsk.classList.remove('btn_ask_alert');
    btnBuy.classList.add('btn_order_alert');
      check = false;
    });
  
  btnBuy.addEventListener('mouseout', () => {
    btnBuy.classList.remove('btn_order_alert');
    check = true;
  });
}

postAlert();



//###################### section buy ##############################
const sectionBuy = document.getElementById('section_buy');
const phoneBtnBuy = document.getElementById('phone_btn_order');
const btnClosseBuy = document.getElementById('form_buy_btn_closse');

phoneBtnBuy.addEventListener('click', () => {
  sectionBuy.classList.remove('section_buy_closse');
})

btnBuy.addEventListener('click', () => {
  sectionBuy.classList.remove('section_buy_closse');
})

btnClosseBuy.addEventListener('click', () => {
  sectionBuy.classList.add('section_buy_closse');
})

//###################### phone menu ##############################

  const btnMenu = document.getElementById('btn_phone_menu')
  const phoneMenu = document.getElementById('phone_menu');
  const listNavPhoneMenu = phoneMenu.children[0].children;

  for (let i = 0; i < listNavPhoneMenu.length; i++) {
    listNavPhoneMenu[i].addEventListener('click', () => {
      phoneMenu.classList.remove('phone_menu_active');
    })
  }

  btnMenu.addEventListener('click', () => {
    btnMenu.classList.toggle('btn_phone_menu_active');
    phoneMenu.classList.toggle('phone_menu_active');
  });

});

import './slider';
import './API_form';
import '../style/base.scss';