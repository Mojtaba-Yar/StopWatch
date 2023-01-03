var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var addTimer = document.getElementById("addTimer");
var addTimerSet = document.getElementById("addTimerSet");
addTimer === null || addTimer === void 0 ? void 0 : addTimer.addEventListener("click", function () {
    new Timer();
});
var Timer = /** @class */ (function () {
    function Timer() {
        this._duration = 0.0;
        this._status = "stoped";
        this._now = 0;
        this._sw = 0;
        this.render();
    }
    Timer.prototype.start = function () {
        if (this._status === "started") {
            alert("Timer is now started");
        }
        this._now = Date.now();
        this._status = "started";
    };
    Timer.prototype.stop = function () {
        if (this._status === "stoped") {
            alert("Timer is now stoped");
        }
        clearInterval(this._sw);
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
        var timerConsole = document.createElement("article");
        var timer = document.createElement("div");
        timer.innerHTML = "00:00:00";
        timerConsole.appendChild(timer);
        var start = document.createElement("button");
        start.textContent = "Start";
        start.addEventListener("click", function () {
            _this.start();
            _this._sw = setInterval(function () {
                timer.innerHTML = _this.timeFormat(Number(((Date.now() - _this._now) / 1000 + _this._duration).toFixed(2)));
            }, 100);
        });
        var stop = document.createElement("button");
        stop.textContent = "Stop";
        stop.addEventListener("click", function () {
            _this.stop();
            clearInterval(_this._sw);
            _this._sw = 0;
            timer.innerHTML = _this.timeFormat(_this._duration);
        });
        var reset = document.createElement("button");
        reset.textContent = "Reset";
        reset.addEventListener("click", function () {
            _this.reset();
            timer.innerHTML = _this.timeFormat(_this._duration);
        });
        timerConsole.appendChild(start);
        timerConsole.appendChild(stop);
        timerConsole.appendChild(reset);
        document.body.appendChild(timerConsole);
    };
    Timer.prototype.timeFormat = function (time) {
        var second = Math.floor(time % 60);
        var minute = Math.floor(time / 60);
        var str = String(time);
        var float = str.split(".");
        var mili = float[1];
        if (mili === undefined)
            mili = "0";
        var strSec = second < 10 ? "0".concat(second) : String(second);
        var strMin = minute < 10 ? "0".concat(minute) : String(minute);
        return "".concat(strMin, ":").concat(strSec, ":").concat(mili);
    };
    return Timer;
}());
addTimerSet === null || addTimerSet === void 0 ? void 0 : addTimerSet.addEventListener("click", function () {
    new TimerSet();
});
var TimerSet = /** @class */ (function (_super) {
    __extends(TimerSet, _super);
    function TimerSet() {
        var _this = _super.call(this) || this;
        _this._accurancy = 2;
        return _this;
    }
    TimerSet.prototype.stop = function () {
        if (this._status === "stoped") {
            alert("Timer is now stoped");
        }
        clearInterval(this._sw);
        this._duration = Number(((Date.now() - this._now) / 1000 + this._duration).toFixed(this._accurancy));
        this._status = "stoped";
    };
    TimerSet.prototype.render = function () {
        var _this = this;
        var timerConsole = document.createElement("article");
        var setBox = document.createElement("input");
        setBox.setAttribute("value", "00:00:00");
        timerConsole.appendChild(setBox);
        var accPannel = document.createElement("div");
        var acc01 = document.createElement("input");
        acc01.type = "radio";
        acc01.name = "accur";
        accPannel.innerHTML += "Accuracy 0.1";
        accPannel.appendChild(acc01);
        var acc001 = document.createElement("input");
        acc001.type = "radio";
        acc001.name = "accur";
        accPannel.innerHTML += "Accuracy 0.01";
        accPannel.appendChild(acc001);
        timerConsole.appendChild(accPannel);
        var timer = document.createElement("section");
        timer.innerHTML = "00:00:00";
        timerConsole.appendChild(timer);
        var start = document.createElement("button");
        start.textContent = "Start";
        if (acc01.checked) {
            this._accurancy = 1;
        }
        start.addEventListener("click", function () {
            _this._duration = _this._duration + convertTime(setBox.value);
            _this.start();
            _this._sw = setInterval(function () {
                timer.innerHTML = _this.timeFormat(Number(((Date.now() - _this._now) / 1000 + _this._duration).toFixed(_this._accurancy)));
            }, 100);
        });
        var stop = document.createElement("button");
        stop.textContent = "Stop";
        stop.addEventListener("click", function () {
            _this.stop();
            clearInterval(_this._sw);
            _this._sw = 0;
            timer.innerHTML = _this.timeFormat(_this._duration);
        });
        var reset = document.createElement("button");
        reset.textContent = "Reset";
        reset.addEventListener("click", function () {
            _this.reset();
            timer.innerHTML = _this.timeFormat(_this._duration);
        });
        timerConsole.appendChild(start);
        timerConsole.appendChild(stop);
        timerConsole.appendChild(reset);
        document.body.appendChild(timerConsole);
    };
    return TimerSet;
}(Timer));
function convertTime(val) {
    var timeIn = val.split(":");
    var min = Number(timeIn[0]);
    var sec = Number(timeIn[1]);
    var mili = Number(timeIn[2]);
    var timeAdd = 0;
    if (0 <= min && min <= 59) {
        if (0 <= sec && sec <= 59) {
            if (0 <= mili && mili <= 99) {
                timeAdd = min * 60 + sec + mili * 0.01;
            }
            else
                throw new Error("enter time by this format min:sec:mili 'mili 0-99'");
        }
        else
            throw new Error("enter time by this format min:sec:mili 'sec 0-59'");
    }
    else
        throw new Error("enter time by this format min:sec:mili 'min 0-59'");
    return timeAdd;
}
