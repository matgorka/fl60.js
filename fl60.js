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
    c           = getInterval();
    now         = Date.now() - c;

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

    loop(callback, c);
    fl60 = () => void 0;
  }

  function getFPS() {
    return 60000 / frameLenArr.reduce((acc, x) => acc + x, 0);
  }

  Object.assign(g, { fl60, getFPS });
})(this);
