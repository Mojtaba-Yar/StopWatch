let addTimer = document.getElementById("addTimer");
let addTimerSet = document.getElementById("addTimerSet");
addTimer?.addEventListener("click", () => {
  new Timer();
});

class Timer {
  protected _duration: number;
  protected _status: string;
  protected _now: number;
  protected _sw: number;
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
    let timerConsole = document.createElement("article");
    let timer = document.createElement("div");
    timer.innerHTML = "00:00:00";
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
    return `${strMin}:${strSec}:${mili}`;
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
  render(): void {
    let timerConsole = document.createElement("article");
    const setBox = document.createElement("input");
    setBox.setAttribute("value", "00:00:00");
    timerConsole.appendChild(setBox);
    let timer = document.createElement("div");
    timer.innerHTML = "00:00:00";
    timerConsole.appendChild(timer);
    let start = document.createElement("button");
    start.textContent = "Start";
    start.addEventListener("click", () => {
      this.start();

      this._duration = this._duration + convertTime(setBox.value);
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
}

function convertTime(val: string) {
  let timeIn = val.split(":");
  const min = Number(timeIn[0]);
  const sec = Number(timeIn[1]);
  const mili = Number(timeIn[2]);
  let timeAdd: number = 0;
  if (0 <= min && min < 59) {
    if (0 <= sec && sec < 59) {
      if (0 <= mili && mili < 99) {
        timeAdd = min * 60 + sec + mili * 0.01;
      } else
        alert(
          "invalid value enter time by this format min:sec:mili 'mili 0-99'"
        );
    } else
      alert("invalid value enter time by this format min:sec:mili 'sec 0-59'");
  } else
    alert("invalid value enter time by this format min:sec:mili 'min 0-59'");
  return timeAdd;
}
