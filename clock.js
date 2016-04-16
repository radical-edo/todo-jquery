var initClock = function () {
  var $clock = $('#clock');
  var showCurrentTime = function () {
    $clock.text(new Date().toLocaleString());
    setTimeout(function () {
      showCurrentTime();
    }, 1000);
  };
  showCurrentTime();
  //    setInterval(function () {
  //        showCurrentTime();
  //    }, 1000);
};
initClock();
