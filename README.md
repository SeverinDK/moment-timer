# moment-timer

###Synopsis
This is a Moment.js plugin that allows the use of timers, which offer much more control than the native JavaScript timers. It's basically a rewrite of JavaScripts own setInterval and setTimeout. For an example, see the example folder or read the Usage section below.

<hr>

###Installation

#### Node.js
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

###Usage

#### How to use moment-timer. This will create a timeout like timer that runs after five seconds.
```javascript
var timer = moment.duration(5, "seconds").timer(function() { 
  // Callback 
});
```

#### In this example we will create a interval like timer. Simply set the <b>loop</b> attribute.
```javascript
var timer = moment.duration(5, "seconds").timer({loop: true}, function() { 
  // Callback 
});
```

#### Prevent the timer from starting on creation, by using the <b>start</b> attribute, so we can start it later.
```javascript
var timer = moment.duration(5, "seconds").timer({loop: true, start: false}, function() { 
  // Callback 
});
timer.start();
```

#### Delaying a timer can be done by using the <b>wait</b> attribute.
```javascript
var timer = moment.duration(5, "seconds").timer({
  wait: moment.duration(1, "hour"), // Will cause the timer to wait for an hour before it starts.
  loop: true, 
}, function() { 
  // Callback 
});
```

#### Getting the remaining duration of a timer.(How long until it ends or loops again)
```javascript
var timer = moment.duration(5, "seconds").timer({
  wait: moment.duration(1, "hour"), // Will cause the timer to wait for an hour before it starts.
  loop: true, 
}, function() { 
  // Callback 
});

var remainingDuration = timer.getRemainingDuration();
```

<hr>

###Motivation
My motivation for makning this script is to prevent any annoyance in the future when working with JavaScript timers. With these tools, I know that I will prevent a lot of the problems I have had through time.
But ofc, the biggest motivation is simply making the idea come alive and enjoying the result. Every completed idea is a new lesson learned!

<hr>

###License
MIT - Go ahead and do whatever you want! I doooon't caaare! ;-)

<hr>
