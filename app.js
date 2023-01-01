var timerConsole = document.createElement("div");
var timer = document.createElement("article");
timerConsole.appendChild(timer);
var addTimer = document.getElementById("addTimer");
var sw;
addTimer === null || addTimer === void 0 ? void 0 : addTimer.addEventListener("click", function () {
    new Timer();
});
var Timer = /** @class */ (function () {
    function Timer() {
        this._duration = 0;
        this._status = "stoped";
        render(this);
    }
    Timer.prototype.start = function () {
        var _this = this;
        if (this._status === "started") {
            throw alert("Timer is now started");
        }
        this._now = Date.now();
        this._status = "started";
        var liveTime = function () {
            _this._duration = Number(((Date.now() - _this._now) / 1000).toFixed(1));
            timer.innerHTML = String(_this._duration);
            sw = setInterval(liveTime, 100);
        };
        liveTime();
    };
    Timer.prototype.stop = function () {
        if (this._status === "stoped") {
            throw "Timer is now stoped";
        }
        clearInterval(sw);
        sw = null;
        this._duration = Number(((Date.now() - this._now) / 1000).toFixed(1));
        timer.innerHTML = String(this._duration);
        this._status = "stoped";
    };
    Timer.prototype.reset = function () {
        if (this._status === "started") {
            this.stop();
        }
        this._duration = 0;
        timer.innerHTML = String(this._duration);
    };
    return Timer;
}());
function render(stopWatch) {
    var start = document.createElement("button");
    start.textContent = "Start";
    start.addEventListener("click", function () {
        stopWatch.start();
    });
    var stop = document.createElement("button");
    stop.textContent = "Stop";
    stop.addEventListener("click", function () {
        stopWatch.stop();
    });
    var reset = document.createElement("button");
    reset.textContent = "Reset";
    reset.addEventListener("click", function () {
        stopWatch.reset();
    });
    timerConsole.appendChild(start);
    timerConsole.appendChild(stop);
    timerConsole.appendChild(reset);
    document.body.appendChild(timerConsole);
}
