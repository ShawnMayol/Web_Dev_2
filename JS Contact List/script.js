const contactForm = document.getElementById('contactForm');
const contactTable = document.getElementById('contactTable').getElementsByTagName('tbody')[0];

let contacts = [];
let editIndex = null;

// Add contact event
contactForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const contactNumber = document.getElementById('contactNumber').value;

    if (!/^09\d{9}$/.test(contactNumber)) {
        alert('Contact number must start with "09" and be 11 digits long.');
        return;
    }

    const contact = {
        firstName,
        lastName,
        email,
        contactNumber
    };

    if (editIndex !== null) {
        contacts[editIndex] = contact;
        editIndex = null;
    } else {
        contacts.push(contact);
    }

    renderTable();
    contactForm.reset();

    const modal = bootstrap.Modal.getInstance(document.getElementById('contactModal'));
    modal.hide();
});

// Render table
function renderTable() {
    contactTable.innerHTML = '';

    contacts.forEach((contact, index) => {
        const row = contactTable.insertRow();

        row.insertCell(0).innerText = contact.firstName;
        row.insertCell(1).innerText = contact.lastName;
        row.insertCell(2).innerText = contact.email;
        row.insertCell(3).innerText = contact.contactNumber;

        const actionsCell = row.insertCell(4);
        const editButton = document.createElement('button');
        editButton.classList.add('btn', 'btn-warning', 'me-2');
        editButton.innerText = 'Edit';
        editButton.onclick = function() {
            editContact(index);
        };

        const deleteButton = document.createElement('button');
        deleteButton.classList.add('btn', 'btn-danger');
        deleteButton.innerText = 'Delete';
        deleteButton.onclick = function() {
            deleteContact(index);
        };

        actionsCell.appendChild(editButton);
        actionsCell.appendChild(deleteButton);
    });
}

// Edit contact
function editContact(index) {
    const contact = contacts[index];

    document.getElementById('firstName').value = contact.firstName;
    document.getElementById('lastName').value = contact.lastName;
    document.getElementById('email').value = contact.email;
    document.getElementById('contactNumber').value = contact.contactNumber;

    editIndex = index;

    const modal = new bootstrap.Modal(document.getElementById('contactModal'));
    modal.show();
}

// Delete contact
function deleteContact(index) {
    const confirmDelete = confirm("Are you sure you want to delete this contact?");
    if (confirmDelete) {
        contacts.splice(index, 1);
        renderTable();
    }
}

// Restrict input to numbers only for contact number
document.getElementById('contactNumber').addEventListener('input', function (e) {
    let value = e.target.value;
    
    value = value.replace(/\D/g, '');

    if (value.length > 11) {
        value = value.slice(0, 11);
    }
    if (!value.startsWith('09')) {
        value = '09' + value.replace(/^09/, '');
    }

    e.target.value = value;
});

// Prevent non-numeric input
document.getElementById('contactNumber').addEventListener('keydown', function (e) {
    const allowedKeys = ['Backspace', 'Tab', 'ArrowLeft', 'ArrowRight', 'Delete'];
    if (allowedKeys.indexOf(e.key) === -1 && (e.key < '0' || e.key > '9')) {
        e.preventDefault();
    }
});
