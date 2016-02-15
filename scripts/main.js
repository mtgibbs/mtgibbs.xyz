$(function() {

  var files = [
    'https://raw.githubusercontent.com/mtgibbs/chartist-plugin-labelclasses/master/src/scripts/chartist-plugin-labelclasses.js',
    'https://raw.githubusercontent.com/mtgibbs/gulp-less-branding-js/master/index.js',
    'https://raw.githubusercontent.com/mtgibbs/chartist-plugin-barlabels/master/src/scripts/chartist-plugin-barlabels.js',
    'https://raw.githubusercontent.com/mtgibbs/estudu/master/js/main.js',
    'https://raw.githubusercontent.com/mtgibbs/inkscape-stroke-to-path/master/stroke-to-path.ps1'
  ];


  $.get(files[Math.floor(Math.random() * files.length)]).done(function(response) {
    response = response.replace(/(\n)+/g, '   ');

    $('#typingThing').typed({
      strings: [response],
      typeSpeed: 1,
      contentType: 'text',
      onStringTyped: function() {
        var $elem = $('.code-typing-container');
        $elem.scrollTop($elem[0].scrollHeight);
      }
    });
  });
});
