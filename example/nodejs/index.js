const requirejs = require("../vendor/r.js")

requirejs.config({
  packages: [{
    name: 'moment',
    location: '../vendor',
    main: 'moment'
  }]
})

let moment = requirejs('moment')
let timer = requirejs("../../lib/moment-timer.js")

let timeoutStartTick = new Date().getTime();
let timeout = moment.duration(1000).timer({
    loop: false
  }, 
  function() { 
    console.log(`Timeout Callback fired ${(new Date().getTime() - timeoutStartTick)} ms after script was started.`);
  });

  let limit = 10
  let intervalStartTick = new Date().getTime();
  let interval = moment.duration(1, "seconds").timer({
      loop: true,
      wait: 2500,
      executeAfterWait: true
    }, 
    function() {
      limit --;
      if (limit == 0) { interval.stop() }
      console.log(`Interval Callback fired ${(new Date().getTime() - intervalStartTick)} ms after script was started.`); 
    });