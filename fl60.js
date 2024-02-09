(g => {
  let frameLenArr = [ ";" ];

  function fl60(callback) {
    let generator,
        getInterval,
        loop,
        now,
        c;

    generator = (function*() {
      for (;;) {
        yield 16;
        yield 17;
        yield 17;
      }
    })();

    getInterval = () => generator.next().value;
    frameLenArr = Array(60).fill(0).map(x => getInterval());

    loop = (callback, prevInt) => {
      let int,
          d;

      d     = Date.now() - now;
      now  += d;

      frameLenArr.shift();
      frameLenArr.push(d);

      d    -= prevInt;
      int   = getInterval() - d;
      int   = Math.max(int, 4);

      callback();
      setTimeout(loop, int, callback, int);
    };

    c    = getInterval();
    fl60 = () => void 0;
    now  = Date.now() - c;
    loop(callback, c);
  }

  function getFPS() {
    let i,
        t = 0;

    for (i = 59; i >= 0 && t < 1000; --i)
      t += frameLenArr[i];

    return (59 - i) * 1000 / t;
  }

  Object.assign(g, { fl60, getFPS });
})(this);
