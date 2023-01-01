var addTimer = document.getElementById("addTimer");
var sw;
addTimer === null || addTimer === void 0 ? void 0 : addTimer.addEventListener("click", function () {
    new Timer();
});
var Timer = /** @class */ (function () {
    function Timer() {
        this._duration = 0;
        this._status = "stoped";
        this._now = 0;
        this.render();
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
            throw alert("Timer is now stoped");
        }
        clearInterval(sw);
        this._duration = Number(((Date.now() - this._now) / 1000 + this._duration).toFixed(2));
        this._status = "stoped";
    };
    Timer.prototype.reset = function () {
        if (this._status === "started") {
            this.stop();
        }
        this._duration = 0;
    };
    Timer.prototype.render = function () {
        var _this = this;
        var timerConsole = document.createElement("div");
        var timer = document.createElement("article");
        timerConsole.appendChild(timer);
        var start = document.createElement("button");
        start.textContent = "Start";
        start.addEventListener("click", function () {
            _this.start();
            sw = setInterval(function () {
                timer.innerHTML = timeFormat(Number(((Date.now() - _this._now) / 1000 + _this._duration).toFixed(2)));
            }, 100);
        });
        var stop = document.createElement("button");
        stop.textContent = "Stop";
        stop.addEventListener("click", function () {
            _this.stop();
            clearInterval(sw);
            sw = 0;
            timer.innerHTML = String(_this._duration);
        });
        var reset = document.createElement("button");
        reset.textContent = "Reset";
        reset.addEventListener("click", function () {
            _this.reset();
            timer.innerHTML = String(_this._duration);
        });
        timerConsole.appendChild(start);
        timerConsole.appendChild(stop);
        timerConsole.appendChild(reset);
        document.body.appendChild(timerConsole);
    };
    return Timer;
}());
function timeFormat(time) {
    var mili = time - Math.floor(time);
    var second = Math.floor(time % 60);
    var minute = Math.floor(time / 60);
    return "".concat(minute, ":").concat(second, ":").concat(mili);
}
