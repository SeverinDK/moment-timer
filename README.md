# moment-timers

###Synopsis
This is Moment.js plugin that offers a rewrite of JavaScripts <b>setInterval</b> & <b>setTimeout</b>.

I wrote this to get more control over timers in JavaScript. Like any other web developer I use timers for a lot of different tasks. Sadly, many times when I have worked with timers in my time as a web developer, I don't feel like I have the enough control over the timers. That's why I decided to rewrite the timers, so they work exactly as I would expect timers to work. Someone suggested that I made it a moment plugin, which also made sense to me.

I will continue to update on this script for a little while yet, until it fully covers my needs.

<hr>

###Installation

#####Node.js
```
npm install moment-timers
```

#####Bower
```
bower install moment-timers
```

#####Browser
```
<script src="path/to/moment-timers.js"></script>
```
When using this plugin in the browser, be sure to include moment.js on your page first.

<hr>

###Usage

#### In this example a Interval and a Timeout are created. By default they will autorun.
```javascript
var interval = moment().interval(function() { 
  //Callback 
}, 10000);

var timeout =  moment().timeout(function() { 
  //Callback 
}, 10000);
```

#### Example of disable autorun and start function.
```javascript
var interval = moment().interval(function() { 
  //Callback 
}, 10000, true);
inteval.start();

var timeout =  moment().timeout(function() { 
  //Callback 
}, 10000, true);
timeout.start();
```
Setting the third parameter to true will cause the timer to wait for start().

#### Example of disabling autorun and start/stop functions.
```javascript
var interval = moment().interval(function() { 
  //Callback 
}, 10000, true);
inteval.start();
inteval.stop();
inteval.start();

var timeout =  moment().timeout(function() { 
  //Callback 
}, 10000, true);
timeout.start();
timeout.stop();
timeout.start();
```
Stopping a timer will cause it to stop and wait to be started again. Once its started again it will pick up where it left off.

#### Example of getRemainingDuration.
```javascript
var interval = moment().interval(function() { 
  //Callback 
}, 10000, true);
inteval.start();
inteval.stop();
inteval.start();
var remainingDuration = interval.getRemainingDuration(); // >> Remaining duration in milliseconds.

var timeout =  moment().timeout(function() { 
  //Callback 
}, 10000, true);
timeout.start();
timeout.stop();
timeout.start();
var remainingDuration = timeout.getRemainingDuration(); // >> Remaining duration in milliseconds.
```

<hr>

###Motivation
My motivation for makning this script is to prevent any annoyance in the future when working with JavaScript timers. With these tools, I know that I will prevent a lot of the problems I have had through time.
But ofc, the biggest motivation is simply making the idea come alive and enjoying the result. Every completed idea is a new lesson learned!

<hr>

###License
MIT - Go ahead and do whatever you want! I doooon't caaare! ;-)

<hr>
