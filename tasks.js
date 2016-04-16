var init = function () {
  var taskList = $('#taskList');
  
  taskList.on('click', 'button', function (ev) {
    ev.preventDefault();
    var $btn = $(this);
    removeTaskFromUserTasks($btn.data('id'));
    //removeTaskFromDatabase(id);
    showTasks();
  });
  
  var removeTaskFromUserTasks = function (id) {
    return userTasks.filter(function (task) {
      return task.id !== id;
    });
  };

  
  // definiujemy obiekt cacheujacy, ktory bedzie ptrzetzymywal obecny stan naszej bazy danych
  window.cache = {
    currentUser: window.helpers.fetchFromDatabase('currentUser', {}), // obecny uzytkownik
    tasks: window.helpers.fetchFromDatabase('tasks', []) // lista taskow
  };

  var tasks = window.cache.tasks;
  var userTasks = tasks.filter(function (task) {
    return task.owner.email === window.cache.currentUser.email;
  });

  $('#toDoForm').on('submit', function (e) {
    e.preventDefault(); // zatrzymujey domyslne zachowanie formularza
    var form = $(this);
    var $title = form.find('[name="title"]');
    var $priority = form.find('[name="priority"]');
    var task = createNewTask($title.val(), $priority.val()); // tworzymy nowy `task`
    if (task == null) {
    } else {
      save(task);
      showTasks();
      $title.val("");
    }
  });

  var createNewTask = function (title, priority) {
    var task = null;
    if (title) { // obiekt `task` jest poprawny w momencie gdy podano jego `title`, zawsze title bedzie stirngiem
      task = {
        id: generateId(),
        title: title
        , priority: Number(priority), // kowertujemy nasz priorytet do liczby, gdyz jest stringiem
        owner: window.cache.currentUser // przypisujemy do taska jego obecnego uzytkowniak, to nam posluzy do filtracji taskow (opisane wyzej)
      };
    }
    return task;
  };

  var save = function (task) {
    userTasks.push(task);
    window.cache.tasks.push(task); // najpierw trzeba dodac do tablicy przetrzymywanej w pamieci nowy task
    localStorage.setItem('tasks', JSON.stringify(window.cache.tasks)); // zapisujemy wszystkie taski do bazy danych
  };
  
  // funkcja wystwietlajaca taski w przegladrce
  var showTasks = function () {
    taskList.empty();
    userTasks.forEach(function (task) {
      taskList.append($('<li/>', {
        "class":'tasks-list-item'
      })
      .append($('<span/>', {
        html: task.title
      }))
      .append($('<span/>', {
        html: task.priority,
        "class": 'tasks-item-priority'
      }))
      .append($('<button/>', {
        html: 'Remove',
        "data-id": task.id
      })));
    });
  };

  var generateId = function () {
    return (Date.now()/1000 + Math.random()).toString(36);
  };

  showTasks();

  console.log(window.cache);
};

init();
