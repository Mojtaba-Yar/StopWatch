let timerConsole = document.createElement("div");
let timer = document.createElement("article");
timerConsole.appendChild(timer);
let addTimer = document.getElementById("addTimer");
let sw;
addTimer?.addEventListener("click", () => {
  new Timer();
});

class Timer {
  private _duration: number;
  private _status: string;
  private _now: number;
  constructor() {
    this._duration = 0;
    this._status = "stoped";
    render(this);
  }
  start() {
    if (this._status === "started") {
      throw alert("Timer is now started");
    }
    this._now = Date.now();
    this._status = "started";
    const liveTime = () => {
      this._duration = Number(((Date.now() - this._now) / 1000).toFixed(1));
      timer.innerHTML = String(this._duration);
      sw = setInterval(liveTime, 100);
    };
    liveTime();
  }
  stop() {
    if (this._status === "stoped") {
      throw "Timer is now stoped";
    }
    clearInterval(sw);
    sw = null;
    this._duration = Number(((Date.now() - this._now) / 1000).toFixed(1));
    timer.innerHTML = String(this._duration);
    this._status = "stoped";
  }
  reset() {
    if (this._status === "started") {
      this.stop();
    }
    this._duration = 0;
    timer.innerHTML = String(this._duration);
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
