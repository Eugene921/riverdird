class APIslider {
  constructor(props) {
    this.viewPort = props.viewPort;
    this.sliderBar = props.sliderBar;
    this.anchorBar = props.anchorBar;

    this.position = 0;

    this.classForShowImg = props.classForShowImg;

    this.init();
  }

  goTo(position) {
    if(isNaN(position)) return;
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

  addListenerForanchorBar() {
    for (let i = 0; i < this.anchorBar.length; i++) {
      this.anchorBar[i].addEventListener('mouseenter', e => {
        this.goTo(e.target.id.slice(-1));
      });
    };
  }

  init(){
    if(this.anchorBar) this.addListenerForanchorBar();
    this.replaseImgInVeivport();
    this.addListenerForBar();
    this.goTo(this.position);
  }
}

const sliderSpecifications = new APIslider({
  viewPort: document.getElementById('specifications_viev_port'),
  sliderBar: document.getElementById('specifications_bar').children,
  classForShowImg: 'slider_view',
})

const sliderAccessories = new APIslider({
  viewPort: document.getElementById('accessories_viev_port'),
  sliderBar: document.getElementById('accessories_bar').children,
  anchorBar: [
    document.getElementById('go_to_slide_accessories_1'),
    document.getElementById('go_to_slide_accessories_4'),
    document.getElementById('go_to_slide_accessories_6'),
  ],
  classForShowImg: 'slider_view',
})

const sliderDescription = new APIslider({
  viewPort: document.getElementById('description_viev_port'),
  sliderBar: document.getElementById('description_bar').children,
  anchorBar: [
    document.getElementById('go_to_slide_0'),
    document.getElementById('go_to_slide_1'),
    document.getElementById('go_to_slide_3'),
    document.getElementById('go_to_slide_4'),
    document.getElementById('go_to_slide_5'),
  ],
  classForShowImg: 'slider_view',
})
