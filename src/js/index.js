document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('preloader').classList.remove('preloader');

const botTelegramToken = '1045208272:AAF0mdAKIwIrKhzihkwjPcDYl4f0mxBWWdE';
const telegramChatId = '-1001368260472';
const formForBuy = document.getElementById('form_for_buy');

formForBuy.addEventListener('submit', e => {
  e.preventDefault();
  const deliveryMethod = [];
  document.querySelectorAll('input[name="deliveryMethod"]').forEach(input => {
    input.checked ? deliveryMethod.push({methodNP: input.id === 'deliveryMethodNP' ? true : false, value: input.labels[0].innerText}) : null ;
  })

  let paymentMethod = '';
  document.querySelectorAll('input[name="payment_method"]').forEach(input => {
    input.checked ? paymentMethod = input.labels[0].innerText : null ;
  })

  const inputCityValue = e.target.children[2].children.wraper_for_user_data.children[0].children[1].value;
  const inputWarehouseValue = e.target.children[2].children.wraper_for_user_data.children[1].children[1].value;
  const city = document.getElementById('form_react_city');
  const warehouse = document.getElementById('form_react_warehouse');
  const name = document.getElementById('form_react_name');
  const tel = document.getElementById('form_react_tel');
  const email = document.getElementById('form_react_email');
  const price = document.getElementById('form_price');

  const basket = JSON.parse(localStorage.basket);

  const deliveryText = `__________________________%0A${deliveryMethod[0].value}%0A${deliveryMethod[0].methodNP ? `<b>Город:</b> ${city !== null ? city.innerText : inputCityValue}%0A` : ''}${deliveryMethod[0].methodNP ? `<b>Отделение НП:</b> ${warehouse !== null ? warehouse.innerText : inputWarehouseValue}%0A%0A` : ''}`
  const deliveryUser = `<b>Имя Фамилия:</b> ${name.value}%0A<b>Номер телефона:</b> ${tel.value}%0A<b>Email:</b> ${email.value}%0A%0A`
  const deliveryBasket = `${basket.kayak.quantity !== 0 ? `<b>${basket.kayak.name}:</b> ${basket.kayak.quantity} - ${basket.kayak.cost * basket.kayak.quantity} грн %0A` : '' }${basket.paddle.quantity !== 0 ? `<b>${basket.paddle.name}:</b> ${basket.paddle.quantity} - ${basket.paddle.cost * basket.paddle.quantity} грн %0A` : '' }${basket.hermeticBag70.quantity !== 0 ? `<b>${basket.hermeticBag70.name}:</b> ${basket.hermeticBag70.quantity} - ${basket.hermeticBag70.cost * basket.hermeticBag70.quantity} грн %0A` : '' }${basket.hermeticBag10.quantity !== 0 ? `<b>${basket.hermeticBag10.name}:</b> ${basket.hermeticBag10.quantity} - ${basket.hermeticBag10.cost * basket.hermeticBag10.quantity} грн %0A%0A` : '' }`
  const deliveryPrise = `<b>Общая Стоимость:</b> ${price.innerText} грн %0A<b>Способ оплаты:</b> ${paymentMethod} %0A_______________________________`;
  
  const message = deliveryText + deliveryUser + deliveryBasket + deliveryPrise;
  // const message = `__________________________%0A
  // ${deliveryMethod[0].value}%0A
  // ${deliveryMethod[0].methodNP ? `<b>Город:</b> ${city !== null ? city.innerText : inputCityValue}%0A` : ''}
  // ${deliveryMethod[0].methodNP ? `<b>Отделение НП:</b> ${warehouse !== null ? warehouse.innerText : inputWarehouseValue}%0A` : ''}

  // <b>Имя Фамилия:</b> ${name.value}%0A
  // <b>Номер телефона:</b> ${tel.value}%0A
  // <b>Email:</b> ${email.value}%0A
  // <b>Заказ на:</b>%0A
  // ${basket.kayak.quantity !== 0 ? `<b>${basket.kayak.name}:</b> ${basket.kayak.quantity} - ${basket.kayak.cost * basket.kayak.quantity} грн %0A` : '' }
  // ${basket.paddle.quantity !== 0 ? `<b>${basket.paddle.name}:</b> ${basket.paddle.quantity} - ${basket.paddle.cost * basket.paddle.quantity} грн %0A` : '' }
  // ${basket.hermeticBag70.quantity !== 0 ? `<b>${basket.hermeticBag70.name}:</b> ${basket.hermeticBag70.quantity} - ${basket.hermeticBag70.cost * basket.hermeticBag70.quantity} грн %0A` : '' }
  // ${basket.hermeticBag10.quantity !== 0 ? `<b>${basket.hermeticBag10.name}:</b> ${basket.hermeticBag10.quantity} - ${basket.hermeticBag10.cost * basket.hermeticBag10.quantity} грн %0A` : '' }

  // <b>Общая Стоимость:</b> ${price.innerText} грн %0A
  // <b>Способ оплаты:</b> ${paymentMethod} %0A
  // _______________________________`;

  fetch(`https://api.telegram.org/bot${botTelegramToken}/sendMessage?chat_id=${telegramChatId}&parse_mode=html&text=${message.replace(/\r?\n/g, "")}`)
    .then((res) => {
      formForBuy.classList.add('form_for_buy_none');
      const blockThanks = document.getElementById('block_thanks');
      blockThanks.classList.remove('block_thanks_none');
      document.getElementById('block_thanks_massage').innerHTML = `
            </big>${deliveryMethod[0].value}</big> <br>
            ${deliveryMethod[0].methodNP ? `<big>${city !== null ? city.innerText : inputCityValue}</big> <br>` : ''}
            ${deliveryMethod[0].methodNP ? `<big>${warehouse !== null ? warehouse.innerText : inputWarehouseValue}</big> <br>` : ''}

            Прізвище Ім'я:&emsp; <big>${name.value}</big> <br>
            Номер телефону:&emsp; <big>${tel.value}</big> <br>
            Email:&emsp; <big>${email.value}</big> <br>
            <hr/>

            ${basket.kayak.quantity !== 0 ? `<big>${basket.kayak.name}:</big>&emsp; <br/>
            <br/>
            Байдарка Riverbіrd комплект: <br>
                Байдарка <br>
                Насос <br>
                Три сидіння <br>
                Сумка-чохол <br>
                Рем. комплект <br>

            Кількість:&emsp; <big>${basket.kayak.quantity}</big>
            Bартість:&emsp; <big>${basket.kayak.cost * basket.kayak.quantity} грн </big><hr/>` : '' }

            ${basket.paddle.quantity !== 0 ? `<big>${basket.paddle.name}:</big> <br/>
            Кількість:&emsp; <big>${basket.paddle.quantity}</big> <br/>
            Bартість:&emsp; <big>${basket.paddle.cost * basket.paddle.quantity} грн </big><hr/>` : '' }

            ${basket.hermeticBag70.quantity !== 0 ? `<big>${basket.hermeticBag70.name}:</big> <br/>
            Кількість:&emsp; <big>${basket.hermeticBag70.quantity}</big> <br/>
            Bартість:&emsp; <big>${basket.hermeticBag70.cost * basket.hermeticBag70.quantity} грн </big><hr/>` : '' }

            ${basket.hermeticBag10.quantity !== 0 ? `<big>${basket.hermeticBag10.name}:</big> <br/>
            Кількість:&emsp; <big>${basket.hermeticBag10.quantity}</big> <br/>
            Bартість:&emsp; <big>${basket.hermeticBag10.cost * basket.hermeticBag10.quantity} грн </big><hr/>` : '' }
            <br/>
            Загальна вартість:&emsp; <big>${price.innerText} грн</big> <br>
            Способ оплаты:&emsp; <big>${paymentMethod}</big> <br>`;

        document.getElementById('block_thanks_closse').addEventListener('click', () => {
          blockThanks.classList.add('block_thanks_none');
          formForBuy.classList.remove('form_for_buy_none');
          document.getElementById('section_buy').classList.add('section_buy_closse');
        })

        document.getElementById('return').addEventListener('click', () => {
          blockThanks.classList.add('block_thanks_none');
          formForBuy.classList.remove('form_for_buy_none');
        })

        localStorage.removeItem('basket');
    })
    .catch((error) => {
      alert(error);
    });
});

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
    isVisible(headline);
    isVisible(orderForm);
}

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

  const btnMenu = document.getElementById('btn_phone_menu');
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


  document.getElementById('deliveryMethodNP').addEventListener('change', e => {
    const listInput = document.getElementById('wraper_for_user_data').children;
    listInput[0].style = 'display: block;';
    listInput[1].style = 'display: block;';
    document.getElementById('payment_methodCOD').style = 'display: block;';
  });
  document.getElementById('deliveryMethodSelf').addEventListener('change', e => {
    const listInput = document.getElementById('wraper_for_user_data').children;
    listInput[0].style = 'display: none;';
    listInput[1].style = 'display: none;';
    document.getElementById('payment_methodCOD').style = 'display: none;';
  });
  document.getElementById('deliveryMethodOther').addEventListener('change', e => {
    const listInput = document.getElementById('wraper_for_user_data').children;
    listInput[0].style = 'display: none;';
    listInput[1].style = 'display: none;';
    document.getElementById('payment_methodCOD').style = 'display: none;';
  });
});

import './slider';
import './API_form';
import '../style/base.scss';
import '../../index';
import './basket';