var timer = document.createElement("div");
var addTimer = document.getElementById("addTimer");
addTimer === null || addTimer === void 0 ? void 0 : addTimer.addEventListener("click", function () {
    render();
});
var Timer = /** @class */ (function () {
    function Timer() {
        this.duration = 0;
        this.status = "stoped";
    }
    Timer.prototype.start = function () {
        if (this.status === "started") {
            throw alert("Timer is now started");
        }
        this.now = Date.now();
        this.status = "started";
        liveTime();
        function liveTime() {
            timer.innerHTML = ((Date.now() - this.now) / 1000).toFixed(1);
            setInterval(liveTime, 100);
        }
    };
    Timer.prototype.stop = function () {
        if (this.status === "stoped") {
            throw alert("Timer is now stoped");
        }
        this.duration = Number(((Date.now() - this.now) / 1000).toFixed(1));
        console.log(this.duration);
        this.status = "stoped";
    };
    Timer.prototype.reset = function () {
        if (this.status === "started") {
            this.stop();
        }
        this.duration = 0;
    };
    return Timer;
}());
var stopWatch1 = new Timer();
function render() {
    var start = document.createElement("button");
    start.textContent = "Start";
    start.addEventListener("click", function () {
        stopWatch1.start();
    });
    var stop = document.createElement("button");
    stop.textContent = "Stop";
    stop.addEventListener("click", function () {
        stopWatch1.stop();
    });
    var reset = document.createElement("button");
    reset.textContent = "Reset";
    reset.addEventListener("click", function () {
        stopWatch1.reset();
    });
    timer.appendChild(start);
    timer.appendChild(stop);
    timer.appendChild(reset);
    document.body.appendChild(timer);
}
