const express = require('express');
const fs = require('fs');

const app = express();
const PORT = 3000;
const PAGE_SIZE = 10;

const dataFile = fs.readFileSync('data.json');
const studentData = JSON.parse(dataFile).data;

// Middleware to parse JSON request bodies
app.use(express.json());

// Pagination endpoint
app.get('/students', (req, res) => {
  const { page = 1 } = req.query;
  const startIndex = (page - 1) * PAGE_SIZE;
  const endIndex = page * PAGE_SIZE;
  const paginatedData = studentData.slice(startIndex, endIndex);

  res.json({ data: paginatedData });
});

// Filtering endpoint
app.post('/students/filter', (req, res) => {
  const { id, name } = req.body;
  let filteredData = [];

  if (id) {
    const student = studentData.find((student) => student.id === id);
    if (student) {
      filteredData.push(student);
    }
  } else if (name) {
    filteredData = studentData.filter((student) =>
      student.name.toLowerCase().includes(name.toLowerCase())
    );
  }

  res.json({ data: filteredData });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
