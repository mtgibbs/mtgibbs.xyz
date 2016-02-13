$(function() {


  $.get('https://raw.githubusercontent.com/mtgibbs/gulp-less-branding-js/master/index.js').done(function(response) {
    response = response.replace(/(\n)+/g, '<br />');
    var strings = [];

    strings.push(response);
    $('#typingThing').typed({
      strings: strings,
      typeSpeed: 1
    });
  });
});
