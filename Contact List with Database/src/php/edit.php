<?php
include_once("db_connect.php");

$response = array('status' => 400, 'message' => 'Update failed.');

$id = trim($_POST['id']);
$fname = trim($_POST['fname']);
$lname = trim($_POST['lname']);
$emailAdd = trim($_POST['emailAdd']);
$contactNum = trim($_POST['contactNum']);
$curEmail = trim($_POST['curEmail']);

if (empty($id) || empty($fname) || empty($lname) || empty($emailAdd) || empty($contactNum)) {
    $response['message'] = 'All fields are required.';
    echo json_encode($response);
    exit;
}

if ($emailAdd !== $curEmail) {
    $stmt = $con->prepare("SELECT * FROM contact WHERE email = ?");
    $stmt->bind_param("s", $emailAdd);
    $stmt->execute();
    $result = $stmt->get_result();
    $stmt->close();
    if ($result->num_rows > 0) {
        $response['message'] = 'Email already exists.';
        echo json_encode($response);
        exit;
    }
}

// Update contact
$stmt = $con->prepare("UPDATE contact SET firstName = ?, lastName = ?, email = ?, number = ? WHERE id = ?");
$stmt->bind_param("ssssi", $fname, $lname, $emailAdd, $contactNum, $id);
if ($stmt->execute()) {
    $response['status'] = 200;
    $response['message'] = 'Contact updated successfully.';
} else {
    $response['message'] = 'Error updating contact.';
}
$stmt->close();

echo json_encode($response);
?>
