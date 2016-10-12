(function(root, undefined) {

    function Timer(duration, loop, wait, start, callback) {
        this.timerDuration = duration;
        this.callback = callback;
        this.loop = loop;
        this.started = false;
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
        if(!this.started) {

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
                    self.updateStartEndTickFromDuration();
                    return self.callback();
                }, this.timerDuration);
            } else {
                this.timer = setTimeout(function(){
                    self.started = false;
                    return self.callback();
                }, this.timerDuration);
            }
            
            this.updateStartEndTickFromDuration();
            this.started = true;

            return true;
        }

        return false;
    }

    Timer.prototype.stop = function() {
        if(this.started) {
            if(this.loop) {
                this.timer = clearInterval(this.timer);
            } else {
                this.timer = clearTimeout(this.timer);
            }

            this.updateStartEndTickFromDuration(this.getRemainingDuration());
            this.paused = true;
            this.started = false;
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

    Timer.prototype.updateStartEndTickFromDuration = function(duration) {
        this.startTick = Date.now();
        this.endTick = this.startTick + duration;

        return true;
    }

    Timer.prototype.duration = function() {
        if(arguments.length > 0) {
            this.timerDuration = moment.duration(arguments[0], arguments[1]).asMilliseconds();
            this.stop();
            this.start();
            return true;
        }
        
        return false;
    }

    // Remove in next release.
    Timer.prototype.setDuration = function() {
        throw new Error("setDuration() has been deprecated and will be removed in next release. Please use duration() instead.");
    }

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
