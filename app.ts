let addTimer = document.getElementById("addTimer");
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
    this._now = 0;
    this.render();
  }
  start() {
    if (this._status === "started") {
      throw alert("Timer is now started");
    }
    this._now = Date.now();
    this._status = "started";
  }

  stop() {
    if (this._status === "stoped") {
      throw "Timer is now stoped";
    }
    this._duration = Number(
      ((Date.now() - this._now) / 1000 + this._duration).toFixed(1)
    );
    this._status = "stoped";
  }
  reset() {
    if (this._status === "started") {
      this.stop();
    }
    this._duration = 0;
  }
  render() {
    let sw: number;
    let timerConsole = document.createElement("div");
    let timer = document.createElement("article");
    timerConsole.appendChild(timer);
    let start = document.createElement("button");
    start.textContent = "Start";
    start.addEventListener("click", () => {
      this.start();
      sw = setInterval(() => {
        timer.innerHTML = (
          (Date.now() - this._now) / 1000 +
          this._duration
        ).toFixed(1);
      }, 100);
    });
    let stop = document.createElement("button");
    stop.textContent = "Stop";
    stop.addEventListener("click", () => {
      this.stop();
      clearInterval(sw);
      sw = 0;
      timer.innerHTML = String(this._duration);
    });
    let reset = document.createElement("button");
    reset.textContent = "Reset";
    reset.addEventListener("click", () => {
      this.reset();
      timer.innerHTML = String(this._duration);
    });
    timerConsole.appendChild(start);
    timerConsole.appendChild(stop);
    timerConsole.appendChild(reset);
    document.body.appendChild(timerConsole);
  }
}
