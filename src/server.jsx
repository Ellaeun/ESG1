import express from 'express';
import mysql from 'mysql';

const app = express();
const PORT = 5000;


const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'enrollmentsystem',
})

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to the database.');
});


app.get('/api/data', (req, res) => {
  const query = 'SELECT * FROM enrollmentsystem';

  db.query(query, (error, results) => {
    if (error) {
      return res.status(500).json({ error: 'Database query failed' });
    }

    if (results.length === 0) {
      return res.json({ message: 'No data found' });
    }

    res.json(results);
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
