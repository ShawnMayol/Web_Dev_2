<div id="contactModal" class="modal">
    <div class="modal-content">
        <span class="close" onclick="closeModal()">&times;</span>
        <h2>Contact</h2>
        <form id="contactForm">
            <label for="firstName">First Name:</label>
            <input type="text" id="firstName" required maxlength="50">
            <label for="lastName">Last Name:</label>
            <input type="text" id="lastName" required maxlength="50">
            <label for="email">Email:</label>
            <small id="emailHelp" style="color: #ddd;">Only letters, numbers, '@', and '.' are allowed.</small>
            <input type="email" id="email" required maxlength="50" pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}">
            <label for="contactNumber">Contact Number:</label>
            <small id="contactNumberHelp" style="color: #ddd;">Must be 11 digits long, start with '09', and contain only numbers.</small>
            <input type="text" id="contactNumber" required pattern="09[0-9]{9}" maxlength="11">

            <button type="submit">Save Contact</button>
        </form>
    </div>
</div>
