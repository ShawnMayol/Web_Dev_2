<?php
include_once("db_connect.php");

$status = 400;
$data = [];
$perPage = 3;

$page = isset($_GET['page']) ? intval($_GET['page']) : 1;
$offset = ($page - 1) * $perPage;

$totalCountQuery = "SELECT COUNT(*) AS total FROM contact";
$result = $con->query($totalCountQuery);
$totalContacts = $result->fetch_assoc()['total'];

$query = "SELECT * FROM contact ORDER BY lastName ASC LIMIT ? OFFSET ?";
$stmt = $con->prepare($query);
$stmt->bind_param("ii", $perPage, $offset);
$stmt->execute();
$contactsResult = $stmt->get_result();

while ($row = $contactsResult->fetch_assoc()) {
    $data[] = $row;
}

$stmt->close();

$response = [
    'status' => 200,
    'data' => $data,
    'total' => $totalContacts
];

echo json_encode($response);
?>
