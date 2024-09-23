const express = require('express');
const router = express.Router();

// In-memory storage for users
const users = [
    { id: 1, name: "John Doe", email: "john.doe@example.com" },
    { id: 2, name: "Jane Smith", email: "jane.smith@example.com" },
    { id: 3, name: "Alice Johnson", email: "alice.johnson@example.com" }
];

// Get all users
router.get('/', (req, res) => {
    res.json(users);
});

module.exports = router;
