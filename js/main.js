$(document).ready(function () {

    let data = (localStorage.getItem('todoList')) ? JSON.parse(localStorage.getItem('todoList')) : {
        todo: [],
        completed: []
    };

    renderList();

    $('#showAddTodo').on('click', function () {
        if ($('.addTodoInput').hasClass('d-none')) {
            $('.addTodoInput').removeClass('d-none');
            if (!$('.searchTodoInput').hasClass('d-none')) {
                $('#showSearchTodo').children('i').addClass('fa-search');
                $('#showSearchTodo').children('i').removeClass('fa-times');
                $('.searchTodoInput').addClass('d-none');
            }
            $(this).children('i').removeClass('fa-plus');
            $(this).children('i').addClass('fa-times');
        } else {
            $('.addTodoInput').addClass('d-none');
            $(this).children('i').addClass('fa-plus');
            $(this).children('i').removeClass('fa-times');
        }
    });
    $('#showSearchTodo').on('click', function () {
        if ($('.searchTodoInput').hasClass('d-none')) {
            $('.searchTodoInput').removeClass('d-none');
            if (!$('.addTodoInput').hasClass('d-none')) {
                $('.addTodoInput').addClass('d-none');
                $('#showAddTodo').children('i').addClass('fa-plus');
                $('#showAddTodo').children('i').removeClass('fa-times');
            }
            $(this).children('i').removeClass('fa-search');
            $(this).children('i').addClass('fa-times');
        } else {
            $('.searchTodoInput').addClass('d-none');
            $(this).children('i').addClass('fa-search');
            $(this).children('i').removeClass('fa-times');
        }
    });
    $('#addTodo').on('click', addTodo);
    $('#todo-list, #todo-list-completed').on('click', '.completeButton', completeTodo);
    $('#todo-list, #todo-list-completed').on('click', '.deleteButton', deleteTodo);
    $('#todo-list, #todo-list-completed').on('click', '.editButton', editTodo);
    $('#todo-list, #todo-list-completed').on('click', '.saveEdit', stopEditTodo);
    $('#newTodo').on('keypress', function (event) {
        if (event.keyCode === 13) {
            addTodo();
            event.preventDefault();
        }
    });

    function renderList() {
        if (!data.todo.length && !data.completed.length)
            return;

        for (let i = 0; i < data.todo.length; i++) {
            let value = data.todo[i];
            $('#todo-list').append(
                    `<div class="card mt-3 p-3 border-0 border">
                    <span class="todoText">`
                    + value +
                    `</span>
                    <div class="formEdit">
                        <div class="input-group mb-3">
                            <input type="text" class="form-control editText">
                            <div class="input-group-append">
                                <button type="button" class="btn btn-primary saveEdit mb-2 ml-auto"><i class="fas fa-check"></i></button>
                            </div>
                        </div>
                    </div>
                    <div class="d-block">
                        <div class="float-right">
                            <i class="fas fa-check-circle mr-2 completeButton"></i>
                            <i class="far fa-edit mr-2 editButton"></i>
                            <i class="fas fa-trash-alt deleteButton"></i>
                        </div>
                    </div>
                </div>`
                    );
        }

        for (let j = 0; j < data.completed.length; j++) {
            let value = data.completed[j];
            $('#todo-list-completed').append(
                    `<div class="card mt-3 p-3 border-0 border">
                    <span class="todoText">`
                    + value +
                    `</span>
                    <div class="formEdit">
                        <div class="input-group mb-3">
                            <input type="text" class="form-control editText">
                            <div class="input-group-append">
                                <button type="button" class="btn btn-primary saveEdit mb-2 ml-auto"><i class="fas fa-check"></i></button>
                            </div>
                        </div>
                    </div>
                    <div class="d-block">
                        <div class="float-right">
                            <i class="fas fa-check-circle mr-2 completeButton"></i>
                            <i class="far fa-edit mr-2 editButton"></i>
                            <i class="fas fa-trash-alt deleteButton"></i>
                        </div>
                    </div>
                </div>`
                    );
        }
    }
    ;

    function dataUpdate() {
//        console.log(JSON.stringify(data));
        localStorage.setItem('todoList', JSON.stringify(data));
        console.log(data);
    }
    ;

    function addTodo() {
        let newTodoText = $('#newTodo').val();
        if (newTodoText) {
            $('#todo-list').append(
                    `<div class="card mt-3 p-3 border-0 border">
                    <span class="todoText">`
                    + newTodoText +
                    `</span>
                    <div class="formEdit">
                        <div class="input-group mb-3">
                            <input type="text" class="form-control editText">
                            <div class="input-group-append">
                                <button type="button" class="btn btn-primary saveEdit mb-2 ml-auto"><i class="fas fa-check"></i></button>
                            </div>
                        </div>
                    </div>
                    <div class="d-block">
                        <div class="float-right">
                            <i class="fas fa-check-circle mr-2 completeButton"></i>
                            <i class="far fa-edit mr-2 editButton"></i>
                            <i class="fas fa-trash-alt deleteButton"></i>
                        </div>
                    </div>
                </div>`
                    );
            $('#newTodo').val("");

            data.todo.push(newTodoText);

            dataUpdate();

//            console.log(data);
        }
    }
    ;

    function completeTodo() {
//        $(this).closest('.card').toggleClass('complete borderComplete borderActive');
        let id = $(this).closest('.card').parent().attr('id'),
                value = $(this).closest('.card').children('.todoText').text();

        if (id === 'todo-list') {
            data.todo.splice(data.todo.indexOf(value), 1);
            data.completed.push(value);
        } else {
            data.completed.splice(data.completed.indexOf(value), 1);
            data.todo.push(value);
        }

        if (id === 'todo-list') {
            $(this).closest('.card').appendTo('#todo-list-completed');
        } else {
            $(this).closest('.card').appendTo('#todo-list');
        }

        dataUpdate();

//        console.log(data);
    }
    ;

    function editTodo() {
        let currentText = $(this).closest('.card').find('.todoText').text();
        $(this).closest('.card').find('.editText').val(currentText);
        $(this).closest('.card').find('.formEdit').show();
        $(this).closest('.card').find('.todoText').hide();
    }
    ;

    function stopEditTodo() {
        let newValue = $(this).closest('.card').find('.editText').val();
        $(this).closest('.card').find('.formEdit').hide();
        $(this).closest('.card').find('.todoText').text(newValue);
        $(this).closest('.card').find('.todoText').show();
    }
    ;

    function deleteTodo() {
        let id = $(this).closest('.card').parent().attr('id'),
                value = $(this).closest('.card').children('.todoText').text();

//console.log(value);
        if (id === 'todo-list') {
            data.todo.splice(data.todo.indexOf(value), 1);
        } else {
            data.completed.splice(data.completed.indexOf(value), 1);
        }

//        console.log(data);

        $(this).closest('.card').remove();

        dataUpdate();
    }
    ;


    $("#searchInput").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("#todoList .card").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
        });
    });

});