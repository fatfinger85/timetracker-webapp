const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

const PASSWORD_FILE = './admin_password.json';
const EMPLOYEE_FILE = './employees.json';
const LOGS_FILE = './logs.json';

if (!fs.existsSync(PASSWORD_FILE)) {
  fs.writeFileSync(PASSWORD_FILE, JSON.stringify({ password: "1234" }));
}
if (!fs.existsSync(EMPLOYEE_FILE)) {
  fs.writeFileSync(EMPLOYEE_FILE, JSON.stringify([]));
}
if (!fs.existsSync(LOGS_FILE)) {
  fs.writeFileSync(LOGS_FILE, JSON.stringify([]));
}

app.get('/admin-password', (req, res) => {
  const data = JSON.parse(fs.readFileSync(PASSWORD_FILE));
  res.json(data);
});

app.post('/admin-password', (req, res) => {
  const { password } = req.body;
  fs.writeFileSync(PASSWORD_FILE, JSON.stringify({ password }));
  res.sendStatus(200);
});

app.get('/employees', (req, res) => {
  const data = JSON.parse(fs.readFileSync(EMPLOYEE_FILE));
  res.json(data);
});

app.post('/employees', (req, res) => {
  const data = JSON.parse(fs.readFileSync(EMPLOYEE_FILE));
  const nuevo = { ...req.body, id: Date.now() };
  data.push(nuevo);
  fs.writeFileSync(EMPLOYEE_FILE, JSON.stringify(data, null, 2));
  res.status(201).json(nuevo);
});

app.get('/logs', (req, res) => {
  const data = JSON.parse(fs.readFileSync(LOGS_FILE));
  res.json(data);
});

app.post('/logs', (req, res) => {
  const data = JSON.parse(fs.readFileSync(LOGS_FILE));
  const newLog = { ...req.body, timestamp: new Date().toISOString() };
  data.push(newLog);
  fs.writeFileSync(LOGS_FILE, JSON.stringify(data, null, 2));
  res.status(201).json(newLog);
});

app.get('/logs/csv', (req, res) => {
  const data = JSON.parse(fs.readFileSync(LOGS_FILE));
  const header = 'ID,Empleado,Proyecto,Tipo,Fecha y Hora\n';
  const csv = header + data.map(log =>
    `${log.employeeId},${log.employeeName},${log.project},${log.type},${log.timestamp}`
  ).join('\n');
  const filePath = path.join(__dirname, 'logs.csv');
  fs.writeFileSync(filePath, csv);
  res.download(filePath, 'registro_tiempos.csv');
});

app.listen(PORT, () => console.log(`✅ Backend corriendo en http://localhost:${PORT}`));
