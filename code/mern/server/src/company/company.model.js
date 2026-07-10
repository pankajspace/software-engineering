const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  id: Number,
  name: String,
  salary: Number,
  department: String,
}, { collection: 'employees' });

const Employee = mongoose.model('Employee', employeeSchema);

const projectSchema = new mongoose.Schema({
  id: Number,
  name: String,
}, { collection: 'projects' });

const Project = mongoose.model('Project', projectSchema);

const allocationSchema = new mongoose.Schema({
  id: Number,
  eid: Number,
  pid: Number,
}, { collection: 'allocations' });

const Allocation = mongoose.model('Allocation', allocationSchema);

module.exports = { Employee, Project, Allocation };