var init = function () {
  window.cache = window.helpers.fetchFromDatabase('users', []);
  
  $('#loginForm').on('submit', function (e) {
    e.preventDefault();
    var $form = $(this);
    var $email = $form.find('[name="email"]');
    var $password = $form.find('[name="password"]');
    var user = findUser($email.val(), $password.val());
    if (user == null) {
      showMessage('Nie poprawne haslo albo email');
    } else {
      login(user);
      navigateToTasks();
    }
  });
  
  var showMessage = function (textMessage) {
    $('#message').text(textMessage);
  };

  var findUser = function (email, password) {
    var user = null;
    cache.forEach(function (cachedUser) {
      if (email === cachedUser.email && cachedUser.password === password) {
        user = cachedUser;
      }
    });
    return user;
  };
  
  var login = function (user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
  };
  
  var navigateToTasks = function () {
    $('#goToTasks').get(0).click();
  };
  
};

init();
