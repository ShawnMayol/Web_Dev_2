document.addEventListener('DOMContentLoaded', () => {
    const contactTableBody = document.querySelector('#contactTable tbody');
    const modal = document.getElementById('contactModal');
    const addContactBtn = document.getElementById('addContactBtn');
    const closeModalBtn = document.querySelector('.close');
    const contactForm = document.getElementById('contactForm');
    const paginationControls = document.getElementById('paginationControls');

    let currentPage = 1;
    let totalContacts = 0;
    const contactsPerPage = 3;

    function getData(page = 1) {
        $.ajax({
            type: 'GET',
            url: '../src/php/read.php',
            data: { page: page },
            success: function(response) {
                const res = JSON.parse(response);
                if (res.status === 200) {
                    totalContacts = res.total;
                    renderTable(res.data);
                    renderPagination(page);
                } else {
                    console.error("Error fetching contacts.");
                }
            },
            error: function() {
                console.error("Error with the API request.");
            }
        });
    }

    function renderTable(contacts) {
        contactTableBody.innerHTML = '';
    
        contacts.sort((a, b) => a.lastName.localeCompare(b.lastName)).forEach(contact => {
            const row = document.createElement('tr');
            row.setAttribute('data-id', contact.id);
            
            row.innerHTML = `
                <td>${contact.lastName}</td>
                <td>${contact.firstName}</td>
                <td>${contact.email}</td>
                <td>${contact.number}</td>
                <td>
                    <button class="editBtn">Edit</button>
                    <button class="deleteBtn">Delete</button>
                </td>
            `;
            contactTableBody.appendChild(row);
        });
    }

    function renderPagination(page) {
        paginationControls.innerHTML = '';
        const pageCount = Math.ceil(totalContacts / contactsPerPage);

        for (let i = 1; i <= pageCount; i++) {
            const pageBtn = document.createElement('button');
            pageBtn.innerText = i;
            pageBtn.classList.add('pageBtn');
            if (i === page) pageBtn.classList.add('active');

            pageBtn.addEventListener('click', () => {
                currentPage = i;
                getData(i);
            });

            paginationControls.appendChild(pageBtn);
        }
    }

    addContactBtn.addEventListener('click', () => {
        modal.style.display = 'block';
        contactForm.reset();
        contactForm.removeAttribute('data-original-email');
    });

    closeModalBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) modal.style.display = 'none';
    });

    contactTableBody.addEventListener('click', (event) => {
        const row = event.target.closest('tr');
        const contactId = row.getAttribute('data-id');
        
        if (event.target.classList.contains('editBtn')) {
            const cells = row.querySelectorAll('td');
            const lastName = cells[0].textContent;
            const firstName = cells[1].textContent;
            const email = cells[2].textContent;
            const contactNumber = cells[3].textContent;
    
            document.getElementById('lastName').value = lastName;
            document.getElementById('firstName').value = firstName;
            document.getElementById('email').value = email;
            document.getElementById('contactNumber').value = contactNumber;
    
            contactForm.setAttribute('data-original-email', email);
            contactForm.setAttribute('data-contact-id', contactId);
    
            modal.style.display = 'block';
        }
    });

    contactForm.addEventListener('submit', (event) => {
        event.preventDefault();
        
        const lastName = document.getElementById('lastName').value.trim();
        const firstName = document.getElementById('firstName').value.trim();
        const email = document.getElementById('email').value.trim();
        const contactNumber = document.getElementById('contactNumber').value.trim();
        const originalEmail = contactForm.getAttribute('data-original-email');
        const contactId = contactForm.getAttribute('data-contact-id');
    
        // Validation checks
        if (!lastName || !firstName || !email || !contactNumber) {
            alert("All fields are required.");
            return;
        }
        if (lastName.length > 50 || firstName.length > 50 || email.length > 50) {
            alert("Fields cannot exceed 50 characters.");
            return;
        }
        if (!/^[0-9]{11}$/.test(contactNumber) || !contactNumber.startsWith('09')) {
            alert("Contact number must be 11 digits starting with '09'.");
            return;
        }
        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
            alert("Invalid email format.");
            return;
        }
    
        // Handle Add/Edit logic
        $.ajax({
            type: 'POST',
            url: originalEmail ? '../src/php/edit.php' : '../src/php/add.php',
            data: {
                id: contactId,
                fname: firstName,
                lname: lastName,
                emailAdd: email,
                contactNum: contactNumber,
                curEmail: originalEmail
            },
            success: function(response) {
                const res = JSON.parse(response);
                if (res.status === 200) {
                    getData(currentPage); // Refresh the contact list
                    modal.style.display = 'none'; // Close modal
                    contactForm.reset(); // Clear form
                } else {
                    alert(res.message);
                }
            },
            error: function() {
                console.error("Error with the API request.");
            }
        });
    });

    contactTableBody.addEventListener('click', (event) => {
        const row = event.target.closest('tr');
        const contactId = row.getAttribute('data-id');
    
        if (event.target.classList.contains('deleteBtn')) {
            if (confirm('Are you sure you want to delete this contact?')) {
                $.ajax({
                    type: 'POST',
                    url: '../src/php/delete.php',
                    data: { id: contactId },
                    success: function(response) {
                        const res = JSON.parse(response);
                        if (res.status === 200) {
                            getData(currentPage);
                        } else {
                            alert(res.message);
                        }
                    },
                    error: function() {
                        console.error("Error with the API request.");
                    }
                });
            }
        }
    });

    getData(currentPage);
});
