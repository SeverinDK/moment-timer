/**
 * 2016
 * @summary     Rewrite og setInterval & setTimeout.
 *
 * @author      Søren Ernst <some12thing@gmail.com>
 * @link        https://github.com/SeverinDK/TimerJS
 */
 
/** jshint {inline configuration here} */

function Timer(duration) {
    this.duration = duration;
    this.paused = true;
    this.restart = false;
    this.startTick;
    this.endTick; 
}

Timer.prototype.getRemainingDuration = function() {
    if(this.startTick && this.endTick) {
        if(this.restart) {
            return this.endTick - this.startTick;
        } else {
            return this.endTick - new Date().getTime();
        }
    }

    return 0;
}

Timer.prototype.updateStartEndTick = function() {
    this.startTick = new Date().getTime();
    this.endTick = this.startTick + this.duration;

    return true;
}

Timer.prototype.updateResetStartEndTick = function() {
    this.startTick = new Date().getTime();
    this.endTick = this.startTick + this.getRemainingDuration();

    return true;
}

function Interval(callback, duration, autorun = true) {
    this.timer = new Timer(duration);
    this.callback = callback;
    this.looping = false;
    this.interval;

    if(autorun) {
        this.start();
    }
}

Interval.prototype.start = function() {
    if(this.timer.paused && !this.looping) {

        if(this.timer.restart) {
            var self = this;
            setTimeout(function() {
                self.callback();
                return self.start();
            }, this.getRemainingDuration());

            this.timer.endTick = new Date().getTime() + this.getRemainingDuration();
            this.timer.restart = false;
            return true;
        }

        var self = this;
        this.interval = setInterval(function(){
            self.timer.updateStartEndTick();
            return self.callback();
        }, this.timer.duration);

        this.timer.updateStartEndTick();
        this.timer.paused = false;
        this.looping = true;
        return true;
    }

    return false;
}

Interval.prototype.stop = function() {
    if(!this.timer.paused && this.looping) {
        this.inteval = clearInterval(this.interval);
        this.timer.updateResetStartEndTick();
        this.timer.paused = true;
        this.timer.restart = true;
        this.looping = false;
        return true;
    }

    return false;
}

Interval.prototype.getRemainingDuration = function() {
    return this.timer.getRemainingDuration();
}

function Timeout(callback, duration, autorun = true) {
    this.timer = new Timer(duration);
    this.callback = callback;
    this.timeout;

    if(autorun) {
        this.start();
    }
}

Timeout.prototype.start = function() {
    if(this.timer.paused) {

        if(this.timer.restart) {
            var self = this;
            setTimeout(function() {
                self.timer.startTick = null;
                self.timer.endTick = null;
                return self.callback();
            }, this.getRemainingDuration());

            this.timer.endTick = new Date().getTime() + this.getRemainingDuration();
            this.timer.restart = false;
            return true;
        }

        var self = this;
        this.timeout = setTimeout(function(){
            self.timer.startTick = null;
            self.timer.endTick = null;
            self.timeout = null;
            return self.callback();
        }, this.timer.duration);

        this.timer.updateStartEndTick();
        this.timer.paused = false;
        return true;
    }

    return false;
}

Timeout.prototype.stop = function() {
    if(!this.timer.paused) {
        this.timeout = clearTimeout(this.timeout);
        this.timer.updateResetStartEndTick();
        this.timer.paused = true;
        this.timer.restart = true;
        return true;
    }

    return false;
}

Timeout.prototype.getRemainingDuration = function() {
    return this.timer.getRemainingDuration();
}