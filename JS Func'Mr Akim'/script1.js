$(document).ready(function () {
    // Load tasks from localStorage
    function loadTasks() {
        var tasks = JSON.parse(localStorage.getItem('todoList')) || [];
        tasks.forEach(function (task) {
            $('#todo-list').append('<li title="'+ task.text +'"><span class="through ' + (task.done ? 'done' : '') + '">' + task.text + '</span> <span class="remove">✕</span></li>');
        });
    }

    // Save tasks to localStorage
    function saveTasks() {
        var tasks = [];
        $('#todo-list li').each(function () {
            var text = $(this).find('.through').text();
            var done = $(this).find('.through').hasClass('done');
            tasks.push({ text: text, done: done });
        });
        localStorage.setItem('todoList', JSON.stringify(tasks));
    }

    // Initialize tasks
    loadTasks();

    // Storing in the innerHtml
    $('#add-task').click(function () {
        var task = $('#task-input').val();
        if (task) {
            $('#todo-list').append('<li><span class="through" title="'+ task +'">' + task + '</span> <span class="remove">✕</span></li>');
            $('#task-input').val('');
            saveTasks();
        } else {
            alert('Please enter a task!');
        }
    });

    $('#task-input').keypress(function (e) {
        if (e.which === 13) { // Enter key pressed
            $('#add-task').click();
        }
    });

    $('#todo-list').on('click', '.through', function () {
        $(this).toggleClass('done');
        saveTasks();
    });

    $('#todo-list').on('click', '.remove', function (e) {
        e.stopPropagation(); // Prevent the event from bubbling up to the li element
        $(this).parent().remove();
        saveTasks();
    });
});