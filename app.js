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
        this.duration = 0;
        this.status = "stoped";
        render(this);
    }
    Timer.prototype.start = function () {
        var _this = this;
        if (this.status === "started") {
            throw alert("Timer is now started");
        }
        this.now = Date.now();
        this.status = "started";
        var liveTime = function () {
            _this.duration = Number(((Date.now() - _this.now) / 1000).toFixed(1));
            timer.innerHTML = String(_this.duration);
            sw = setInterval(liveTime, 100);
        };
        liveTime();
    };
    Timer.prototype.stop = function () {
        if (this.status === "stoped") {
            throw "Timer is now stoped";
        }
        clearInterval(sw);
        sw = null;
        this.duration = Number(((Date.now() - this.now) / 1000).toFixed(1));
        timer.innerHTML = String(this.duration);
        this.status = "stoped";
    };
    Timer.prototype.reset = function () {
        if (this.status === "started") {
            this.stop();
        }
        this.duration = 0;
        timer.innerHTML = String(this.duration);
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
