var addTimer = document.getElementById("addTimer");
addTimer === null || addTimer === void 0 ? void 0 : addTimer.addEventListener("click", function () {
    new Timer();
});
var Timer = /** @class */ (function () {
    function Timer() {
        this._duration = 0;
        this._status = "stoped";
        this._now = 0;
        render(this);
    }
    Timer.prototype.start = function () {
        if (this._status === "started") {
            throw alert("Timer is now started");
        }
        this._now = Date.now();
        this._status = "started";
    };
    Timer.prototype.stop = function () {
        if (this._status === "stoped") {
            throw "Timer is now stoped";
        }
        this._duration = Number(((Date.now() - this._now) / 1000).toFixed(1));
        this._status = "stoped";
    };
    Timer.prototype.reset = function () {
        if (this._status === "started") {
            this.stop();
        }
        this._duration = 0;
    };
    Object.defineProperty(Timer.prototype, "getNow", {
        get: function () {
            return this._now;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Timer.prototype, "getDuration", {
        get: function () {
            return this._duration;
        },
        enumerable: false,
        configurable: true
    });
    return Timer;
}());
function render(stopWatch) {
    var sw;
    var timerConsole = document.createElement("div");
    var timer = document.createElement("article");
    timerConsole.appendChild(timer);
    var start = document.createElement("button");
    start.textContent = "Start";
    start.addEventListener("click", function () {
        stopWatch.start();
        sw = setInterval(function () {
            timer.innerHTML = String(Number((Date.now() - stopWatch.getNow / 1000).toFixed(1)));
        }, 100);
    });
    var stop = document.createElement("button");
    stop.textContent = "Stop";
    stop.addEventListener("click", function () {
        stopWatch.stop();
        clearInterval(sw);
        sw = 0;
        timer.innerHTML = String(stopWatch.getDuration);
    });
    var reset = document.createElement("button");
    reset.textContent = "Reset";
    reset.addEventListener("click", function () {
        stopWatch.reset();
        timer.innerHTML = String(stopWatch.getDuration);
    });
    timerConsole.appendChild(start);
    timerConsole.appendChild(stop);
    timerConsole.appendChild(reset);
    document.body.appendChild(timerConsole);
}
