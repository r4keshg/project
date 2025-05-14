const express = require('express');
const path = require('path');
const db = require('./db');

const router = express.Router();

// Home Page
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Login Page
router.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/login.html'));
});

// Signup Handler
router.post('/signup', async (req, res) => {
  const { name, pan_aadhar, vehicle_type, vehicle_no, purpose, intime, duration, date_of_visit } = req.body;
  try {
    await db.query(
      `INSERT INTO visitors (name, pan_aadhar, vehicle_type, vehicle_no, purpose, intime, duration, date_of_visit)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
      [name, pan_aadhar, vehicle_type, vehicle_no, purpose, intime, duration, date_of_visit]
    );
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error saving visitor');
  }
});

// Admin Login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  if (username === 'admin' && password === '123') {
    req.session.isAdmin = true;
    res.redirect('/dashboard');
  } else {
    res.send('Invalid credentials');
  }
});

// Admin Dashboard
router.get('/dashboard', async (req, res) => {
  if (!req.session.isAdmin) return res.redirect('/login');
  const result = await db.query('SELECT * FROM visitors ORDER BY id DESC');

  let html = `
  <html><head><link rel="stylesheet" href="/style.css" /></head><body>
  <h2 style="text-align:center;">Admin Dashboard</h2>
  <table class="admin-table">
    <tr>
      <th>ID</th><th>Name</th><th>Vehicle</th><th>Purpose</th><th>Date</th><th>Status</th><th>Approved</th><th>Actions</th>
    </tr>`;

  result.rows.forEach(v => {
    html += `
    <tr>
      <td>${v.id}</td>
      <td>${v.name}</td>
      <td>${v.vehicle_type} ${v.vehicle_no}</td>
      <td>${v.purpose}</td>
      <td>${v.date_of_visit}</td>
      <td>
        <form method="POST" action="/update-status">
          <input type="hidden" name="id" value="${v.id}">
          <select name="status" onchange="this.form.submit()">
            <option ${v.status === 'not complete' ? 'selected' : ''}>not complete</option>
            <option ${v.status === 'complete' ? 'selected' : ''}>complete</option>
          </select>
        </form>
      </td>
      <td>${v.approved ? '✅' : '❌'}</td>
      <td>
        <form method="POST" action="/approve" style="display:inline;">
          <input type="hidden" name="id" value="${v.id}">
          <button type="submit">Approve</button>
        </form>
        <form method="POST" action="/remove" style="display:inline;">
          <input type="hidden" name="id" value="${v.id}">
          <button type="submit" class="delete">Remove</button>
        </form>
      </td>
    </tr>`;
  });

  html += `</table></body></html>`;
  res.send(html);
});

// Status Update
router.post('/update-status', async (req, res) => {
    const { id, status } = req.body;
    await db.query('UPDATE visitors SET status = $1 WHERE id = $2', [status, id]);
    res.redirect('/dashboard');  // 🔄 redirect back to dashboard
  });

  
// Approve Visitor
router.post('/approve', async (req, res) => {
    await db.query('UPDATE visitors SET approved = true WHERE id = $1', [req.body.id]);
    res.redirect('/dashboard');  // 🔄 stay on dashboard
  });
  
  
// Remove Visitor
router.post('/remove', async (req, res) => {
await db.query('DELETE FROM visitors WHERE id = $1', [req.body.id]);
await db.query(`SELECT setval('visitors_id_seq', COALESCE((SELECT MAX(id) FROM visitors), 1), false)`);
res.redirect('/dashboard');

});

module.exports = router;
