$(document).ready(function() {

    // Function to fetch and display the list
    function fetchToDoList() {
        $.ajax({
            url: 'http://..../read.php', // API URL for reading the list
            method: 'GET',
            success: function(response) {
                if(response.status === 200) {
                    $('#toDoList').empty();
                    const todos = response.data;
                    for(let id in todos) {
                        const toDoItem = todos[id];
                        $('#toDoList').append(`
                            <li data-id="${toDoItem.id}">
                                ${toDoItem.firstName} ${toDoItem.lastName} 
                                <button class="editBtn">Edit</button>
                                <button class="deleteBtn">Delete</button>
                            </li>
                        `);
                    }
                }
            }
        });
    }

    // Call the function to load the to-do list on page load
    fetchToDoList();

    // Add a new To-Do
    $('#addToDo').click(function() {
        const newToDo = $('#newToDo').val();
        if(newToDo.trim()) {
            const [firstName, lastName] = newToDo.split(' ');
            $.ajax({
                url: 'http://..../add.php',
                method: 'POST',
                data: {
                    fname: firstName,
                    lname: lastName,
                    emailAdd: 'sample@example.com', // Temporary email and number
                    contactNum: '09123456789'
                },
                success: function(response) {
                    if(response.status === 200) {
                        fetchToDoList(); // Refresh list after adding
                    }
                }
            });
        }
    });

    // Delete To-Do
    $('#toDoList').on('click', '.deleteBtn', function() {
        const id = $(this).parent().data('id');
        $.ajax({
            url: 'http://..../delete.php',
            method: 'POST',
            data: { id: id },
            success: function(response) {
                if(response.status === 200) {
                    fetchToDoList(); // Refresh list after deletion
                }
            }
        });
    });

    // Edit To-Do
    $('#toDoList').on('click', '.editBtn', function() {
        const id = $(this).parent().data('id');
        const newName = prompt("Enter new name (FirstName LastName):");
        if(newName) {
            const [firstName, lastName] = newName.split(' ');
            $.ajax({
                url: 'http://..../edit.php',
                method: 'POST',
                data: {
                    id: id,
                    fname: firstName,
                    lname: lastName,
                    emailAdd: 'sample@example.com',
                    contactNum: '09123456789',
                    curEmail: 'sample@example.com'
                },
                success: function(response) {
                    if(response.status === 200) {
                        fetchToDoList(); // Refresh list after edit
                    }
                }
            });
        }
    });

});
