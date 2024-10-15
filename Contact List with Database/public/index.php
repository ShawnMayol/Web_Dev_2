<!DOCTYPE html>
<html lang="en">

<!-- 
    Shawn Jurgen Mayol - Table Exercise with Database
-->

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Mayol Contact List</title>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
    <link rel="stylesheet" href="../src/css/style.css">
</head>

<body onload="getData()">
    <div class="container">
        <h1>Contact List</h1>
        <table id="contactTable">
            <thead>
                <tr>
                    <th>Last Name</th>
                    <th>First Name</th>
                    <th>Email Address</th>
                    <th>Contact Number</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody id="contactTableBody">
                <!-- Contacts will be displayed here -->
            </tbody>
        </table>
        <div class="pagination-wrapper">
            <div id="paginationControls"></div>
            <button id="addContactBtn">Add Contact</button>
        </div>
    </div>
    <?php 
        include('modal.php');
    ?>
    <script src="../src/js/script.js"></script>
</body>

</html>
