jQuery(function($) {
  var Home = {
    init: function() {
      if (!(sessionStorage.isLogin || localStorage.isLogin)) {
        location.href = '/login.html';
      }
    }
  };

  Home.init();
})