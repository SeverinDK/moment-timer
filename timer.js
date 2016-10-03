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
            return this.endTick - Date.now();
        }
    }

    return 0;
}

Timer.prototype.updateTicks = function() {
    this.startTick = Date.now();
    this.endTick = this.startTick + this.duration;

    return true;
}

Timer.prototype.updateTicksWithTicksRemaining = function() {
    this.startTick = Date.now();
    this.endTick = this.startTick + this.getRemainingDuration();

    return true;
}

Timer.prototype.clearTicks = function() {
    this.startTick = null;
    this.endTick = null;

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

        // Takes care of restarts. If the timer has been stopped, this will make sure the leftover duration is executed.
        if(this.timer.restart) {
            var self = this;
            setTimeout(function() {
                self.callback();
                return self.start();
            }, this.getRemainingDuration());

            this.timer.endTick = Date.now() + this.getRemainingDuration();
            this.timer.restart = false;
            return true;
        }

        var self = this;
        this.interval = setInterval(function(){
            self.timer.updateTicks();
            return self.callback();
        }, this.timer.duration);

        this.timer.updateTicks();
        this.timer.paused = false;
        this.looping = true;
        return true;
    }

    return false;
}

Interval.prototype.stop = function() {
    if(!this.timer.paused && this.looping) {
        this.inteval = clearInterval(this.interval);
        this.timer.updateTicksWithTicksRemaining();
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

        // Takes care of restarts. If the timer has been stopped, this will make sure the leftover duration is executed.
        if(this.timer.restart) {
            var self = this;
            setTimeout(function() {
                self.timer.clearTicks();
                return self.callback();
            }, this.getRemainingDuration());

            this.timer.endTick = Date.now() + this.getRemainingDuration();
            this.timer.restart = false;
            return true;
        }

        var self = this;
        this.timeout = setTimeout(function(){
            self.timer.clearTicks();
            return self.callback();
        }, this.timer.duration);

        this.timer.updateTicks();
        this.timer.paused = false;
        return true;
    }

    return false;
}

Timeout.prototype.stop = function() {
    if(!this.timer.paused) {
        this.timeout = clearTimeout(this.timeout);
        this.timer.updateTicksWithTicksRemaining();
        this.timer.paused = true;
        this.timer.restart = true;
        return true;
    }

    return false;
}

Timeout.prototype.getRemainingDuration = function() {
    return this.timer.getRemainingDuration();
}