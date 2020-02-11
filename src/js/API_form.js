class APIForn {


  static addValidColor(elem) {    
    if (!elem.value.length){

      if (elem.required) {
        elem.style = 'border-color: orange;'
      } else {
        elem.style = 'border-color: deepskyblue;'
      };
    } else {

      if(elem.validity.valid) {
        elem.style = 'border-color: lawngreen;'
      } else {
        if (elem.required) {
          elem.style = 'border-color: red;'
        } else {
          elem.style = 'border-color: orange;'
        }
      };
    }
  }

  constructor(props) {
    this.elemForm = props.elemForm;

    this.headLineTelegram = props.headLineTelegram || `sent from the form located at ${window.location.href}`;

    this.elemPhoneNumber = props.elemPhoneNumber || this.elemForm.querySelector('input[type="tel"]') || false;
    this.elemEmail = props.elemEmail || this.elemForm.querySelector('input[type="email"]') || false;
    this.elemName = props.elemName || this.elemForm.querySelector('input[name="name"]') || false;
    this.elemCity = props.elemCity || this.elemForm.querySelector('input[name="city"]') || false;
    this.elemWarehouseIndex = props.elemWarehouseIndex || this.elemForm.querySelector('input[name="warehouseIndex"]') || false;
    this.elemDescription = props.elemDescription || this.elemForm.querySelector('textarea') || false;

    this.botTelegramToken = props.botTelegramToken || false;
    this.telegramChatId = props.telegramChatId || false;

    this.apiKeyNovaPoshta = props.apiKeyNovaPoshta || false;
    this.listWarehousesNP = [];
    this.listRefCities = [];

    this.inut();
  }

  addListnerOnPhoneNumber() {
    this.elemPhoneNumber.addEventListener('input', e => {
      if( e.inputType === 'deleteContentBackward'){

        if(this.phoneNumberValue[0] !== '_') {

          this.phoneNumberValue = this.phoneNumberValue.slice(0, this.phoneNumberValue.length - 1);
        }
      } else {
        if(!isNaN(e.data) && e.data !== ' ' && this.phoneNumberValue.length <= 9) {

          this.phoneNumberValue += e.data;
        }
      }
      this.changePhoneNumber();
      APIForn.addValidColor(this.elemPhoneNumber);
    });
  }

  changePhoneNumber() {
    const strFormat = this.phoneNumberValue + '__________';

    this.elemPhoneNumber.value = `+38 (${strFormat.slice(0, 3)}) ${strFormat.slice(3, 6)}-${strFormat.slice(6, 8)}-${strFormat.slice(8, 10)}`;
  }

  addListnerOnSubmit() {
    this.elemForm.addEventListener('submit', e => {
      e.preventDefault();
      let message = `____________________%0A`;
      if (this.elemPhoneNumber) message += `<b>${this.elemPhoneNumber.placeholder}:</b> ${this.elemPhoneNumber.value}%0A`;
      if (this.elemEmail) message += `<b>${this.elemEmail.placeholder}:</b> ${this.elemEmail.value}%0A`;
      if (this.elemName) message += `<b>${this.elemName.placeholder}:</b> ${this.elemName.value}%0A`;
      if (this.elemCity) message += `<b>${this.elemCity.placeholder}:</b> ${this.elemCity.value}%0A`;
      if (this.elemWarehouseIndex) message += `<b>${this.elemWarehouseIndex.placeholder}:</b> ${this.elemWarehouseIndex.value}%0A`;
      if (this.elemDescription) message += `<b>${this.elemDescription.placeholder}:</b> ${this.elemDescription.value}%0A`;

    console.log(message);
    
      fetch(`https://api.telegram.org/bot${this.botTelegramToken}/sendMessage?chat_id=${this.telegramChatId}&parse_mode=html&text=${message}`)
        .then((res) => {
          this.elemForm.innerHTML = `
          <h2 style="color: white;"> Дякую за оформлення заявки!</h2>
          <p>Наш менеджер зв'яжеться з Вами найближчим часом.</p>`;
        })
        .catch((error) => {
          this.elemForm.innerHTML = `
          <h2 style="color: white;">Вибачте, щось пішло не так </h2><br />
          <h3 style="color: white; font-size: 20px;">Спробуйте повторити спробу трохи пізніше або зв'язатися з нами за контактами</h3><br />
          <br />
          <h3>Kод ошибки: ${error.code}</h3>
          <p>${error}</p>`;
        });
    })
  }

  initiatoryStatePhoneNumber() {
    this.elemPhoneNumber.value = '+38 (___) ___-__-__';
    this.elemPhoneNumber.pattern = `\\+38\\s\\(0\\d{2}\\)\\s\\d{3}-\\d{2}-\\d{2}`;
    this.phoneNumberValue = '';
  }

  initiatoryStateEmail() {
    this.elemEmail.pattern = `.+@.+\\..+`;

    this.elemEmail.addEventListener('input', () => {
      APIForn.addValidColor(this.elemEmail);
    });
  }

  createElemListCity() {
    this.elemListCity = document.createElement('datalist');

    this.elemListCity.id = 'listCitiesNP';

    this.elemForm.appendChild(this.elemListCity);
  }

  createElemListWarehouses() {
    this.elemListWarehouses = document.createElement('datalist');

    this.elemListWarehouses.id = 'listWarehouseNP';

    this.elemForm.appendChild(this.elemListWarehouses);
  }

  updateListCity(listCitiesNP) {
    this.elemListCity.innerHTML = '';
    this.listRefCities = [];

    if (listCitiesNP.length === 1) {
      this.listRefCities = [listCitiesNP[0].DeliveryCity];

      this.elemCity.pattern = '[А-Яа-яЁё\s]+$';
      this.elemWarehouseIndex.disabled = false;
      return;
    }

    listCitiesNP.map(city => {
      const elemOption = document.createElement('option');
      elemOption.value = city.Present;

      this.listRefCities.push(city.DeliveryCity);


      this.elemListCity.appendChild(elemOption);
    });

    this.elemCity.pattern = '[^0-9A-Za-z]{1,3}\\.[^0-9A-Za-z]{2,}'
    this.elemWarehouseIndex.disabled = true;
  }

  updateListWarehouses(filterlistWarehouses) {
    this.elemListWarehouses.innerHTML = '';

    filterlistWarehouses.map(warehouse => {
      const elemOption = document.createElement('option');

      elemOption.value = warehouse.Description;

      this.elemListWarehouses.appendChild(elemOption);
    });
  };

  async getCitiesFromNP () {
    const data = {
      "apiKey": this.apiKeyNovaPoshta,
      "modelName": "Address",
      "calledMethod": "searchSettlements",
      "methodProperties": {
          "CityName": this.elemCity.value,
          "Limit": 20,
      }
    };
    
    const requestOptions = {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow',
      body: JSON.stringify(data),
    };

    await fetch('https://api.novaposhta.ua/v2.0/json/', requestOptions)
      .then(response => response.json())
      .then(result => result.data)
      .then(data => data[0].Addresses)
      .then(cities => cities.filter(city => city.Warehouses))
      .then(cities => this.updateListCity(cities))
      .catch(error => console.log('error', error));
  }

  async getWarehousesFromNP() {
    const data = {
      "apiKey": this.apiKeyNovaPoshta,
      "modelName": "Address",
      "calledMethod": "getWarehouses",
      "methodProperties": {
          "CityRef": this.listRefCities[0],
      }
    };
    
    const requestOptions = {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(data),
    };

    await fetch('http://testapi.novaposhta.ua/v2.0/json/Address/searchSettlements/', requestOptions)
      .then(response => response.json())
      .then(result => result.data)
      .then(result => this.listWarehousesNP = result)
      .catch(error => console.log('error', error));
  }

  filterWritelistWarehouses() {
    const filterlistWarehouses = this.listWarehousesNP.filter(warehouse => {
      const num = (warehouse.Number + '').slice(0, this.elemWarehouseIndex.value.length);

      return num === this.elemWarehouseIndex.value;
    })
    this.updateListWarehouses(filterlistWarehouses);
  }

  initiatoryStateCity() {
    this.elemCity.pattern = '[^0-9A-Za-z]{1,3}\\.[^0-9A-Za-z]{2,}';
    this.elemCity.title = 'Впишіть назву вашого населеного пункту і виберіть один із запропонованих варіантів';

    if (this.apiKeyNovaPoshta) { 
      this.createElemListCity();
      
      this.elemCity.addEventListener('input', async () => {
        const regexp = /[а-яё]+$/i;
        if (this.elemCity.value.length > 2 && regexp.test(this.elemCity.value)){
          await this.getCitiesFromNP();

          APIForn.addValidColor(this.elemCity);
        }
      });
    } 

    this.elemCity.addEventListener('input', () => {
      APIForn.addValidColor(this.elemCity);
    });
  }

  initiatoryStateName() {
    this.elemName.pattern = '[A-Za-zА-Яа-яЁё\\s]{2,}';

    this.elemName.addEventListener('input', () => {
      APIForn.addValidColor(this.elemName);
    });
  }

  initiatoryStateDescription() {
    this.elemDescription.addEventListener('input', () => {
      APIForn.addValidColor(this.elemDescription);
    });
  }

  initiatoryStateWarehouseIndex() {
    if (this.apiKeyNovaPoshta) {
      this.elemWarehouseIndex.title = 'Спочатку виберіть ваше місто, потім впишіть номер відділеннь нової пошти і оберіть один їх предложеннх варіантів';

      this.createElemListWarehouses();

      this.elemWarehouseIndex.addEventListener('focus', () => {
        if(this.listRefCities && this.listRefCities.length === 1) this.getWarehousesFromNP();
      });

      this.elemWarehouseIndex.addEventListener('input', () => {
        if(this.listWarehousesNP.length) this.filterWritelistWarehouses();
      });
    } 

    this.elemWarehouseIndex.addEventListener('input', () => {
      APIForn.addValidColor(this.elemWarehouseIndex);
    });
  }

  inut() {
    if (this.elemPhoneNumber) {
      this.initiatoryStatePhoneNumber();
      this.addListnerOnPhoneNumber();
    };
    if(this.telegramChatId && this.botTelegramToken) {
      this.addListnerOnSubmit();
    }
    if(this.elemEmail) {
      this.initiatoryStateEmail();
    }
    if(this.elemCity) {
      this.initiatoryStateCity();
    }
    if(this.elemName) {
      this.initiatoryStateName();
    }
    if(this.elemDescription) {
      this.initiatoryStateDescription();
    }
    if(this.elemWarehouseIndex) {
      this.initiatoryStateWarehouseIndex();
          this.elemWarehouseIndex.disabled = true;
    }
  }
}

const form = new APIForn({
  elemForm: document.getElementById('order_form'),
  botTelegramToken: '1045208272:AAF0mdAKIwIrKhzihkwjPcDYl4f0mxBWWdE',
  telegramChatId: '-1001368260472',
});

