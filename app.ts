let timer = document.createElement("div");
let addTimer = document.getElementById("addTimer");
addTimer?.addEventListener("click", () => {
  new Timer();
});

class Timer {
  private duration: number;
  private status: string;
  private now: number;
  constructor() {
    this.duration = 0;
    this.status = "stoped";
    render(this);
  }
  start() {
    if (this.status === "started") {
      throw alert("Timer is now started");
    }
    this.now = Date.now();
    this.status = "started";
    liveTime();
    function liveTime() {
      timer.innerHTML += ((Date.now() - this.now) / 1000).toFixed(1);
      setInterval(liveTime, 100);
    }
  }
  stop() {
    if (this.status === "stoped") {
      throw alert("Timer is now stoped");
    }
    this.duration = Number(((Date.now() - this.now) / 1000).toFixed(1));
    console.log(this.duration);
    this.status = "stoped";
  }
  reset() {
    if (this.status === "started") {
      this.stop();
    }
    this.duration = 0;
  }
}

function render(stopWatch) {
  let start = document.createElement("button");
  start.textContent = "Start";
  start.addEventListener("click", () => {
    stopWatch.start();
  });
  let stop = document.createElement("button");
  stop.textContent = "Stop";
  stop.addEventListener("click", () => {
    stopWatch.stop();
  });
  let reset = document.createElement("button");
  reset.textContent = "Reset";
  reset.addEventListener("click", () => {
    stopWatch.reset();
  });
  timer.appendChild(start);
  timer.appendChild(stop);
  timer.appendChild(reset);
  document.body.appendChild(timer);
}
