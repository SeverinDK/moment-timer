# moment-timer

### Synopsis
This is a Moment.js plugin that allows the use of timers, which offer much more control than the native JavaScript timers. It's basically a rewrite of JavaScripts own setInterval and setTimeout. For an example, see the example folder or read the Usage section below.

<hr>

### Installation

#### Npm
```
npm install moment-timer
```

#### Bower
```
bower install moment-timer
```

#### Browser
```
<script src="path/to/moment-timer.js"></script>
```
When using this plugin in the browser, be sure to include moment.js on your page first.

<hr>

### Usage

#### How to use moment-timer. This will create a timeout like timer that runs after five seconds.
```javascript
var timer = moment.duration(5, "seconds").timer(function() { 
  // Callback 
});
```

#### In this example we will create an interval like timer. Simply set the <b>loop</b> attribute.
```javascript
var timer = moment.duration(5, "seconds").timer({
  loop: true
}, function() { 
  // Callback 
});
```

#### Prevent the timer from starting on creation, by using the <b>start</b> attribute, so we can start it later.
```javascript
var timer = moment.duration(5, "seconds").timer({
  loop: true, 
  start: false
}, function() { 
  // Callback 
});
timer.start();
```

#### Stopping a timer can be done by using the stop() function. After the timer has been stopped, the start function can be used to start it again.
```javascript
var timer = moment.duration(5, "seconds").timer({
  loop: true, 
  start: true
}, function() { 
  // Callback 
});
timer.stop();
timer.start();
```

#### See if a timer has been stopped.
```javascript
var timer = moment.duration(5, "seconds").timer({
  loop: true, 
  start: true
}, function() { 
  // Callback 
});
timer.stop();
timer.isStopped(); // True

timer.start();
timer.isStopped(); // False
```

#### Delaying a timer can be done by using the <b>wait</b> attribute. In the example below, the timer will wait for an hour and five seconds before it executes.
```javascript
var timer = moment.duration(5, "seconds").timer({
  wait: moment.duration(1, "hour"),
  loop: true,
}, function() { 
  // Callback 
});
```

#### Having the timer execute after waiting, can be done by using the <b>executeAfterWait</b> attribute. In the example below, the timer will wait for an hour, then execute and do so again after another five seconds.
```javascript
var timer = moment.duration(5, "seconds").timer({
  wait: moment.duration(1, "hour"),
  executeAfterWait: true,
  loop: true,
}, function() { 
  // Callback 
});
```

#### Setting the duration of a timer. This will override the duration set when the timer was created.
```javascript
var timer = moment.duration(5, "seconds").timer({
  loop: true, 
}, function() { 
  // Callback 
});

timer.duration(2000);
timer.duration("2", "seconds");
timer.duration({seconds: 2});
```

#### Getting the duration of a timer.
```javascript
var timer = moment.duration(5, "seconds").timer({
  loop: true, 
}, function() { 
  // Callback 
});

var duration = timer.getDuration();
```

#### Getting the remaining duration of a timer. (How long until it ends or loops again)
```javascript
var timer = moment.duration(5, "seconds").timer({
  loop: true, 
}, function() { 
  // Callback 
});

var remainingDuration = timer.getRemainingDuration();
```

#### In this example we an see that a "timeout like timer" can be reused. If you run this example, you will notice it executing the callback twice. This is to show that even if you use the timer like a timeout, it can be reused, unlike JavaScripts native setTimeout that will only function once.
```javascript
var timer = moment.duration().timer({
}, function() { 
  // Callback 
});

timer.start();
```

<hr>

### Motivation
My motivation for making this script is to prevent any annoyance in the future when working with JavaScript timers. With these tools, I know that I will prevent a lot of the problems I have had through time.
But ofc, the biggest motivation is simply making the idea come alive and enjoying the result. Every completed idea is a new lesson learned!

<hr>

### License
MIT - Go ahead and do whatever you want! I doooon't caaare! ;-)

<hr>
