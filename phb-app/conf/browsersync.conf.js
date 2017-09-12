const conf = require('./gulp.conf');

module.exports = function () {
  return {
    /*server: {
      baseDir: [
        conf.paths.tmp,
        conf.paths.src,
      ],
    },
    open: false*/
    proxy: 'localhost:4000',
    serveStatic: [{
      route: '/phb',
      dir: conf.paths.tmp,
    }]

  };
};
