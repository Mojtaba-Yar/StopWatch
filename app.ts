let addTimer = document.getElementById("addTimer");
let addTimerSet = document.getElementById("addTimerSet");
addTimer?.addEventListener("click", () => {
  new Timer();
});

class Timer {
  protected _duration: number;
  private _status: string;
  private _now: number;
  private _sw: number;
  constructor() {
    this._duration = 0.0;
    this._status = "stoped";
    this._now = 0;
    this._sw = 0;
    this.render();
  }
  start() {
    if (this._status === "started") {
      alert("Timer is now started");
    }
    this._now = Date.now();
    this._status = "started";
  }

  stop() {
    if (this._status === "stoped") {
      alert("Timer is now stoped");
    }
    clearInterval(this._sw);
    this._duration = Number(
      ((Date.now() - this._now) / 1000 + this._duration).toFixed(2)
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
    let timerConsole = document.createElement("div");
    let timer = document.createElement("article");
    timerConsole.appendChild(timer);
    let start = document.createElement("button");
    start.textContent = "Start";
    start.addEventListener("click", () => {
      this.start();
      this._sw = setInterval(() => {
        timer.innerHTML = this.timeFormat(
          Number(((Date.now() - this._now) / 1000 + this._duration).toFixed(2))
        );
      }, 100);
    });
    let stop = document.createElement("button");
    stop.textContent = "Stop";
    stop.addEventListener("click", () => {
      this.stop();
      console.log(this);
      clearInterval(this._sw);
      this._sw = 0;
      timer.innerHTML = this.timeFormat(this._duration);
    });
    let reset = document.createElement("button");
    reset.textContent = "Reset";
    reset.addEventListener("click", () => {
      this.reset();
      timer.innerHTML = this.timeFormat(this._duration);
    });
    timerConsole.appendChild(start);
    timerConsole.appendChild(stop);
    timerConsole.appendChild(reset);
    document.body.appendChild(timerConsole);
  }
  timeFormat(time: number) {
    const second = Math.floor(time % 60);
    const minute = Math.floor(time / 60);
    const str = String(time);
    const float = str.split(".");
    let mili: string = float[1];
    if (mili === undefined) mili = "0";
    let strSec: string = second < 10 ? `0${second}` : String(second);
    let strMin: string = minute < 10 ? `0${minute}` : String(minute);
    let strMili: string = Number(mili) < 10 ? `0${mili}` : String(mili);
    return `${strMin}:${strSec}:${strMili}`;
  }
}

addTimerSet?.addEventListener("click", () => {
  new TimerSet();
});
class TimerSet extends Timer {
  private _startTime: number;
  constructor() {
    super();
    this._startTime = 0;
  }
  start(): void {
    super.start();
  }
  render(): void {
    super.render();
    const setBox = document.createElement("input");
    setBox.setAttribute("type", "text");
    setBox.setAttribute("value", "0");
    let timerConsoles = document.getElementsByName("div");
    const length = timerConsoles.length;
    let timerConsole = timerConsoles[length];
    timerConsole.appendChild(setBox);
    this._startTime = Number(setBox.value);
    this._duration += this._startTime;
  }
}
