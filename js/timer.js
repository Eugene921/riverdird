document.addEventListener('DOMContentLoaded', () => {
  const time = document.getElementById('timer');
  class Timer {
    constructor(options) {
      this.onChange = options.onChange;
      this.finalDate = new Date(2020, 0, 30);
      this.timer = null;
    }
  
    timeFormat(nam) {
      return ('' + nam).length === 1 ? '0' + nam : nam;
    }
  
    start() {
      if (!this.timer) {
        this.timer = setInterval(() => {
          const t = Date.parse(this.finalDate) - Date.parse(new Date());
          const seconds = this.timeFormat(Math.floor((t / 1000) % 60));
          const minutes = this.timeFormat(Math.floor((t / 1000 / 60) % 60));
          const hours = this.timeFormat(Math.floor((t / (1000 * 60 * 60)) % 24));
  
          this.onChange(`${0} &ensp;${hours} : ${minutes} : ${seconds}`);
        }, 1000);
      }
    }
  
    stop() {
      clearInterval(this.timer);
      this.timer = null;
    }
  }
  const timer = new Timer({
    onChange: (counter) => {
      time.innerHTML = counter;
    },
  });
  timer.start();
});
