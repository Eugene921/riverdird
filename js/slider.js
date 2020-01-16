document.addEventListener('DOMContentLoaded', () => {
  const slider = document.getElementById('slider');
  const viveport = document.getElementById('viveport');

  for (let i = 0; i < slider.children.length; i++) {
    slider.children[i].addEventListener('click', () => {
      const selectImage = slider.children[i].firstChild;

      viveport.firstChild.src = selectImage.src;
    });
  }

  let indexSlide = 0;
  sendFoto = () => {
    viveport.firstChild.src = slider.children[indexSlide].firstChild.src;
  }
  sendFoto();

  const stopSlide = setInterval(() => {
    indexSlide++;
    if(indexSlide === slider.children.length) indexSlide = 0;
    sendFoto()
  }, 3000)

  slider.addEventListener('click', () => {
    clearInterval(stopSlide);
  })
})
