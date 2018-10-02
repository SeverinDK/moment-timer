# moment-timer

[![NPM version][npm-version-image]][npm-url] [![NPM downloads][npm-downloads-image]][npm-url] [![MIT License][license-image]][license-url]

---

## Synopsis
This is a Moment.js plugin that allows the use of timers, which offer much more control than the native JavaScript timers. It's basically a rewrite of JavaScripts own setInterval and setTimeout. For an example, see the example folder or read the Usage section below.

---

## Installation

### Npm
```
npm install moment-timer
```

### Bower
```
bower install moment-timer
```

### CDN
```
<script src="https://cdn.jsdelivr.net/npm/moment-timer/lib/moment-timer.js"></script>
```

### Browser
```
<script src="path/to/moment-timer.js"></script>
```
When using this plugin in the browser, be sure to include moment.js on your page first.

---

## Attributes

### (bool) start
```js
new moment.duration(1000).timer({ start: true }, callback);
```
Setting this attribute to true will cause the timer to start once instantiated.

---

### (bool) loop
```js
new moment.duration(1000).timer({ loop: true }, callback);
```
Setting this attribute to true will cause the timer to loop/restart once a duration is complete.

---

### (int | moment.duration) wait
```js
new moment.duration(1000).timer({ wait: 5000 }, callback);
```
```js
new moment.duration(1000).timer({ wait: moment.duration(5, 'seconds') }, callback);
```
Setting this attribute will cause the timer to wait for a specified amount of time before starting it's duration. This is kind of an extra first duration. Imagine a timer that runs every second. Setting the wait attribute to 5000 / 5 seconds, means it waits that long and then starts acting like a normal timer would. Notice that this attribute accepts both int and moment.duration .

---

### (bool) executeAfterWait
```js
new moment.duration(1000).timer({ wait: 5000, executeAfterWait: true }, callback);
```
Setting this attribute to true will cause the callback function to be called after the wait duration has ended. This is a way to make sure the callback is executed even before the timer starts.

---

## Functions
### .start()
```js
let timer = new moment.duration(1000).timer(callback);
timer.start();
```
This function will cause the timer to start. It can be used if the start attribute has not been set or if the timer has been stopped.

---

### .stop()
```js
let timer = new moment.duration(1000).timer({ start: true }, callback);
timer.stop();
```
This function will cause the timer to stop. It can be used if timer has been started to halt it.

---

### .duration(int | moment.duration)
```js
let timer = new moment.duration(1000).timer(callback);
timer.duration(5000);
timer.duration(moment.duration(5, "seconds");
```
This function can be used to change the duration the timer was instantiated with.

---

### .getDuration()
```js
let timer = new moment.duration(1000).timer(callback);
timer.getDuration();
```
This function will return the current duration of a timer. In this case it will return 1000.

---

### .getRemainingDuration()
```js
let timer = new moment.duration(1000).timer(callback);
timer.getRemainingDuration();
```
This function will return the remaining duration of a timers cycle. In this case, imagine that the timer has been running for 500ms and we call .getRemainingDuration() on it, in this example it will return 500, since half of the cycle has completed.

---

### .isStopped()

```js
let timer = new moment.duration(1000).timer(callback);
timer.start();
timer.isStopped();  // false
timer.stop();
timer.isStopped();  // true
```
This function can be used to see if the timer has been stopped by the .stop() function.

---

### .isStarted()

```js
let timer = new moment.duration(1000).timer(callback);
timer.start();
timer.isStarted();  // true
timer.stop();
timer.isStarted();  // false
```
This function can be used to see if the timer has been started by the .start() function. If this function is called on a timer that has reached the end of it's duration and does not loop, it will also return false as if the timer has not yet been started.

---

Feel free to [open a new issue](https://github.com/SeverinDK/moment-timer/issues/new) or [create a pull request](https://github.com/SeverinDK/moment-timer/pulls) if you can think of other useful attributes or functions.

---

## Changelog
#### v1.3.0
Fixed issue where .stop() would not stop the timer. See https://github.com/SeverinDK/moment-timer/issues/20
#### v1.2.3
[Relaxed moment dependency.](https://github.com/SeverinDK/moment-timer/pull/13)
#### v1.2.2
Removed debug console.log
#### v1.2.1
Updated readme with better documentation and added a new isStarted function.
#### v1.2.0
Added module loading!
#### v1.1.5
Added getDuration and executeAfterWait attribute.
#### v1.1.4
Added isStopped function.
#### v1.1.3:
...
#### v1.1.2:
Fixed stop function. It still had an old unused paused variable instead of the new stopped variable. Fixing this will ensure that stopping and starting the timer will not cause any problems.
#### v1.1.1:
Cleaned up some things, fixed a remainingDuration bug and added an internal clearTimer function.
#### v1.1.0:
Changed setDuration to duration and added actual moment.duration support to it.
Deprecated error message on setDuration will be removed in next release.
#### v1.0.0:
Initial Release.

---

## Contributing

You are always welcome to contribute to this repository. Create your own branch, make the changes you wish to see and create a pull request that we can have a look at. If the changes make sense and the quality of code is good enough, then it will be merged into the master branch so other people can use it.

A full list of contributers for moment-timer.js can be found [here.](https://github.com/SeverinDK/moment-timer/graphs/contributors)

---

## License

Moment-timer.js is freely distributable under the terms of the [MIT license](https://github.com/SeverinDK/moment-timer/blob/master/LICENSE).

---

[npm-url]: https://npmjs.org/package/moment-timer
[npm-version-image]: http://img.shields.io/npm/v/moment-timer.svg?style=flat
[npm-downloads-image]: http://img.shields.io/npm/dm/moment-timer.svg?style=flat
[license-image]: http://img.shields.io/badge/license-MIT-blue.svg?style=flat
[license-url]: LICENSE
