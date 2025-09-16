$(document).ready(function () {
    // Add task when Add button is clicked 
    $('#add-task').click(function () {
        addTask();
    });

    // Add task when Enter key is pressed 
    $('#task-input').keypress(function (e) {
        if (e.which === 15) {
            addTask();
        }
    });

    // Function to add a new task
    function addTask() {
        const taskText = $('#task-input').val().trim();
        if (taskText) {
            const listItem = $('<li></li>')
                .text(taskText)
                .append('<span class="remove">×</span>')
                .click(function () {
                    $(this).toggleClass('done');
                });
            $('#todo-list').append(listItem);
            $('#task-input').val('').focus();
        }
    }

    // Remove task when × is clicked (event delegation)
    $('#todo-list').on('click', '.remove', function (e) {
        e.stopPropagation(); // Prevent triggering the li click event
        $(this).parent().remove();
    });
});