var init = function () {
  'use strict';
  window.cache = window.helpers.fetchFromDatabase('users', []);

  $('#registerForm').on('submit', function (e) {
    e.preventDefault();
    var $form = $(this);
    var $email = $form.find('[name="email"]');
    var $password = $form.find('[name="password"]');
    var $passwordConfirmation = $form.find('[name="passwordConfirmation"]');
    var info = checkPasswordStrength($password.val());
    if (info) {
      showMessage(info);
      return;
    }
    info = checkAllPresent($email.val(), $password.val(), $passwordConfirmation.val());
    if (info) {
      showMessage(info);
      return;
    }
    info = checkIfPasswordMatch($password.val(), $passwordConfirmation.val());
    if (info) {
      showMessage(info);
      return;
    }

    info = checkIfEmailIsValid($email.val());
    if (info) {
      showMessage(info);
      return;
    }
    save($email.val(), $password.val());
  });

  var checkPasswordStrength = function (password) {
    if (password.length < 8) {
      return 'Haslo musi posiadac przynajmniej 8 znakow';
    }
    var bigLetterCount = 0;
    for (var i = 1; i < password.length - 1; ++i) {
      var code = password.charCodeAt(i);
      if (code >= 65 && code <= 90) {
        ++bigLetterCount;
      }
    }
    if (bigLetterCount < 2) {
      return 'Haslo musi posiadac przynajmniej dwie wielkie litery, ale nie na poczatku ani na koncu.'
    }
    var numberCount = 0;
    var numberAtEnd = 0;
    for (var i = 0; i < password.length; ++i) {
      if (isNumber(password[i])) {
        ++numberCount;
        if (i === 0 || i === password.length - 1) {
          ++numberAtEnd
        }
      }
    }
    if (numberCount < 2 || numberAtEnd === 2) {
      return 'Haslo musi przynajmniej posiadac dwie liczby, ale tylko jedna moze byc na poczatku albo na koncu.'
    }
    return '';
  };

  var isNumber = function (a) {
    return Number(a) === Number(a);
  };

  var save = function (email, password) {
    var user = {
      email: email
      , password: password
    };
    var userExists = false;
    for (var i = 0; i < cache.length; ++i) {
      if (!userExists) {
        userExists = cache[i].email === email;
      }
    }
    if (userExists) {
      showMessage('Uzytkownik juz istnieje');
    } else {
      cache.push(user);
      localStorage.setItem('users', JSON.stringify(cache));
      navigateToLoginPage();
      showMessage('Stworzono nowego uzytkownika');
    }
  };
  var navigateToLoginPage = function () {
    $('#goToLogin').get(0).click();
  };

  var showMessage = function (textMessage) {
    $('#message').text(textMessage);
  };

  var checkIfEmailIsValid = function (email) {
    // var textMessage = 'Email nie jest poprawny';
    // for (var i = 0; i < email.length; i++) {
    //   var letter = email[i];
    //   if (letter === '@') {
    //     textMessage = '';
    //   }
    // }
    // return textMessage;
    if (email.indexOf('@') !== -1) {
      return ''
    } else {
      return 'Email nie jest poprawny';
    }
  };

  var checkIfPasswordMatch = function (password, passwordConfimation) {
    if (password !== passwordConfimation) {
      return 'Hasla sie roznia'
    }
    return '';
  };

  var checkIfPresent = function (str, context) {
    if (str) {
      return '';
    } else {
      return context + ' musi byc podany';
    }
  };


  var checkAllPresent = function (email, password, passwordConfimation) {
    if (!email) {
      return 'Email musi byc podany';
    }
    if (!password) {
      return 'Haslo musi byc podane';
    }
    if (!passwordConfimation) {
      return 'Potwierdzenie hasla musi byc podane';
    }
    return '';
  };
};


init();
