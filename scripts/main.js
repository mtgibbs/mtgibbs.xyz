$(function() {
  var files = [
    'https://raw.githubusercontent.com/mtgibbs/chartist-plugin-labelclasses/master/src/scripts/chartist-plugin-labelclasses.js',
    'https://raw.githubusercontent.com/mtgibbs/gulp-less-branding-js/master/index.js',
    'https://raw.githubusercontent.com/mtgibbs/chartist-plugin-barlabels/master/src/scripts/chartist-plugin-barlabels.js',
    'https://raw.githubusercontent.com/mtgibbs/estudu/master/js/main.js',
  ];

  $.get(files[Math.floor(Math.random() * files.length)]).done(function(response) {
    response = response.replace(/(\n)+/g, '   ');

    $('#typingThing').typed({
      strings: [response],
      typeSpeed: 1,
      contentType: 'text'
    });
  });
});
