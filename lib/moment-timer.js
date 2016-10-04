// define internal moment reference
var moment;

if (typeof require === "function") {
    try { moment = require('moment'); } 
    catch (e) {}
} 

if (!moment && this.moment) {
    moment = this.moment;
}

if (!moment) {
    throw "Moment Timer cannot find Moment.js";
}

(function(root, undefined) {

    function Timer(duration, loop, wait, start, callback) {
        this.duration = duration;
        this.callback = callback;
        this.loop = loop;
        this.paused = true;
        this.stopped = false;       // If stop() is called this variable will be used to finish the paused duration once it's started again.
        this.timer;
        this.startTick;
        this.endTick; 

        if(start) {
            if(wait > 0) {
                var self = this;
                setTimeout(function() {
                    self.start();
                }, wait);
            } else {
                this.start();
            }
        }
    }

    Timer.prototype.start = function() {
        if(this.paused) {

            var self = this;

            // Takes care of restarts. If the timer has been stopped, this will make sure the leftover duration is executed.
            if(this.stopped) {
                setTimeout(function() {
                    self.callback();
                    return self.start();
                }, this.getRemainingDuration());

                this.endTick = Date.now() + this.getRemainingDuration();
                this.stopped = false;
                return true;
            }

            if(this.loop) {
                this.timer = setInterval(function(){
                    self.updateTicks();
                    return self.callback();
                }, this.duration);
            } else {
                this.timer = setTimeout(function(){
                    self.paused = true;
                    return self.callback();
                }, this.duration);
            }
            
            this.updateTicks();
            this.paused = false;

            return true;
        }

        return false;
    }

    Timer.prototype.stop = function() {
        if(!this.paused) {
            if(this.loop) {
                this.timer = clearInterval(this.timer);
            } else {
                this.timer = clearTimeout(this.timer);
            }

            this.updateTicksWithTicksRemaining();
            this.paused = true;
            this.stopped = true;
            return true;
        }

        return false;
    }

    Timer.prototype.getRemainingDuration = function() {
        if(this.startTick && this.endTick) {
            if(this.stopped) {
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

    moment.duration.fn.timer = function(attributes, callback) {
        if(typeof attributes === "function") {
            callback = attributes;
            attributes = {
                wait: 0,
                loop: false,
                start: true
            };
        } else if(typeof attributes === "object" && typeof callback === "function") {
            if(attributes.start == null) {
                attributes.start = true;
            }
        } else {
            throw new Error("First argument must be of type function or object.");
        }
        
        return new Timer(this.asMilliseconds(), attributes.loop, attributes.wait, attributes.start, callback);
    };

})(this);
