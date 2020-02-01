class APIslider {
  constructor(props) {
    this.viewPort = props.viewPort;
    this.sliderBar = props.sliderBar;

    this.position = 0;

    this.classForShowImg = props.classForShowImg;

    this.init();
  }

  goTo(position) {
    this.viewPort.children[this.position].classList.remove(this.classForShowImg);

    this.position = position;

    this.viewPort.children[this.position].classList.add(this.classForShowImg);
  }

  replaseImgInVeivport(){
    for (let i = 0; i < this.sliderBar.length; i++) {
      this.viewPort.appendChild(this.sliderBar[i].firstChild.cloneNode(false));
    }
  }

  addListenerForBar() {
    for (let i = 0; i < this.sliderBar.length; i++) {
      this.sliderBar[i].firstChild.addEventListener('click', e => {
        this.goTo(e.target.title);
      });
    };
  }

  init(){
    this.replaseImgInVeivport();
    this.addListenerForBar();
    this.goTo(this.position);
  }
}

const slider = new APIslider({
  viewPort: document.getElementById('specifications_viev_port'),
  sliderBar: document.getElementById('specifications_bar').children,
  classForShowImg: 'slider_view',
})

const sliderSeconr = new APIslider({
  viewPort: document.getElementById('accessories_viev_port'),
  sliderBar: document.getElementById('accessories_bar').children,
  classForShowImg: 'slider_view',
})

const sliderThird = new APIslider({
  viewPort: document.getElementById('description_viev_port'),
  sliderBar: document.getElementById('description_bar').children,
  classForShowImg: 'slider_view',
})
