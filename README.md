# timer.js

###Synopsis
I wrote this script to get more control over timers in JavaScript. Like any other web developer I use timers for a lot of different tasks. Sadly, many times when I have worked with timers in my time as a web developer, I don't feel like I have the enough control over the timers. That's why I decided to rewrite the timers, so they work exactly as I would expect timers to work. These are rewrites of JavaScripts <b>setInterval</b> & <b>setTimeout</b> I will continue to update on this script for a little while yet, until it fully covers my needs.

###Live Demo
CodePen Demo: http://codepen.io/SeverinDK/pen/ALQJqo

Each timer in this example has a duration of 10000ms. Both timers in the example are stopped after 1000ms, to show that they an be paused.

The Timeout will only fire once, as a Timeout should, but for the examples sake, start() will be called on it again after it has been fired.
This is being done to show that the Timeout can be reused after it has completed.

In case you are wondering, the cool part about this timer, is that you can start/stop it whenever you want, and get the remaining duration.
This can be useful when doing animations that are stopped and needs to pick up where they left off later. 

As with most timers, it's not accurate to the millisecond, but accurate enough to handle most tasks. It's based on JavaScripts own setTimeout/setInterval.


###Code Example

#### In this example a Interval and a Timeout are created. By default they will autorun.
```javascript
var interval = new Interval(function() { 
  //Callback 
}, 10000);

var timeout = new Timeout(function() { 
  //Callback 
}, 10000);
```

#### Example of disable autorun and start function.
```javascript
var interval = new Interval(function() { 
  //Callback 
}, 10000, false);
inteval.start();

var timeout = new Timeout(function() { 
  //Callback 
}, 10000, false);
timeout.start();
```
Setting the third parameter to false will prevent the timer from autorunning. It can then be started by using the start() function.

#### Example of disable autorun and start/stop functions.
```javascript
var interval = new Interval(function() { 
  //Callback 
}, 10000, false);
inteval.start();
inteval.stop();
inteval.start();

var timeout = new Timeout(function() { 
  //Callback 
}, 10000, false);
timeout.start();
timeout.stop();
timeout.start();
```
Stopping a timer will cause it to stop and wait to be started again. Once its started again it will pick up where it left off.

#### Example of getRemainingDuration.
```javascript
var interval = new Interval(function() { 
  //Callback 
}, 10000, false);
inteval.start();
inteval.stop();
inteval.start();
var remainingDuration = interval.getRemainingDuration(); // >> Remaining duration in milliseconds.

var timeout = new Timeout(function() { 
  //Callback 
}, 10000, false);
timeout.start();
timeout.stop();
timeout.start();
var remainingDuration = timeout.getRemainingDuration(); // >> Remaining duration in milliseconds.
```

###Motivation
My motivation for makning this script is to prevent any annoyance in the future when working with JavaScript timers. With these tools, I know that I will prevent a lot of the problems I have had through time.
But ofc, the biggest motivation is simply making the idea come alive and enjoying the result. Every completed idea is a new lesson learned!

###License
MIT - Go ahead and do whatever you want! I doooon't caaare! ;-)
