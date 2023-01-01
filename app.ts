let timerConsole = document.createElement("div");
let timer = document.createElement("article");
timerConsole.appendChild(timer);
let addTimer = document.getElementById("addTimer");
let sw;
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
    const liveTime = () => {
      this.duration = Number(((Date.now() - this.now) / 1000).toFixed(1));
      timer.innerHTML = String(this.duration);
      sw = setInterval(liveTime, 100);
    };
    liveTime();
  }
  stop() {
    if (this.status === "stoped") {
      throw "Timer is now stoped";
    }
    clearInterval(sw);
    sw = null;
    this.duration = Number(((Date.now() - this.now) / 1000).toFixed(1));
    timer.innerHTML = String(this.duration);
    this.status = "stoped";
  }
  reset() {
    if (this.status === "started") {
      this.stop();
    }
    this.duration = 0;
    timer.innerHTML = String(this.duration);
  }
}

function render(stopWatch: Timer) {
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
  timerConsole.appendChild(start);
  timerConsole.appendChild(stop);
  timerConsole.appendChild(reset);
  document.body.appendChild(timerConsole);
}
