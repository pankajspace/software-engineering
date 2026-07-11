const express = require('express');
const router = express.Router();

const { Employee, Project, Allocation } = require('./company.model');

router.get('/insertAll', (req, res) => {
  try {
    Employee.insertMany([
      { id: 1, name: 'Amit', salary: 10000, department: 'IT' },
      { id: 2, name: 'Pankaj', salary: 20000, department: 'HR' },
      { id: 3, name: 'Sanjay', salary: 30000, department: 'IT' },
      { id: 4, name: 'Sachin', salary: 40000, department: 'HR' },
      { id: 5, name: 'Rahul', salary: 50000, department: 'Marketing' },
    ]);
  } catch (error) {
    console.log(error);
    res.send('Data insertion failed');
  }

  try {
    Project.insertMany([
      { id: 1, name: 'Project 1' },
      { id: 2, name: 'Project 2' },
      { id: 3, name: 'Project 3' },
      { id: 4, name: 'Project 4' },
      { id: 5, name: 'Project 5' },
    ]);
  } catch (error) {
    console.log(error);
    res.send('Data insertion failed');
  }

  try {
    Allocation.insertMany([
      { id: 1, eid: 1, pid: 1 },
      { id: 2, eid: 1, pid: 2 },
      { id: 3, eid: 2, pid: 3 },
      { id: 4, eid: 2, pid: 4 },
      { id: 5, eid: 3, pid: 5 },
    ]);
    res.send('Data inserted successfully');
  } catch (error) {
    console.log(error);
    res.send('Data insertion failed');
  }
});

// Get all employees with number of projects they are working on
router.get('/getAll', async (req, res) => {
  try {
    const employees = await Employee.find({}, { _id: 0, id: 1, name: 1 }); // 0 means exclude and 1 means include
    const projects = await Project.find({}, { _id: 0, id: 1, name: 1 });
    const allocations = await Allocation.find({}, { _id: 0, id: 1, eid: 1, pid: 1 });

    const employeeProjects = employees.map(employee => {
      const count = allocations.filter(allocation => allocation.eid === employee.id).length;
      return { ...employee._doc, projects: count };
    });

    res.send({ employeeProjects });
  } catch (error) {
    console.log(error);
    res.send('Data fetching failed');
  }
});

// Get the employee having third highest salary
router.get('/getThirdHighestSalary', async (req, res) => {
  try {
    // using aggregation
    const employee = await Employee.aggregate([
      { $sort: { salary: -1 } },
      { $skip: 2 },
      { $limit: 1 }
    ]);
    res.send(employee);

    // using find
    // const employee = await Employee.find({}, { _id: 0, id: 1, name: 1, salary: 1 }).sort({ salary: -1 }).skip(2).limit(1);
    // res.send(employee);
  } catch (error) {
    console.log(error);
    res.send('Data fetching failed');
  }
});

// Get the average salary of all employees in the company
router.get('/getAverageSalary', async (req, res) => {
  try {
    // using aggregation
    const averageSalary = await Employee.aggregate([{ $group: { _id: null, avgSalary: { $avg: '$salary' } } }]); // _id is null because we want to calculate average of all employees
    res.send(averageSalary);

    // using find
    // const employees = await Employee.find({}, { _id: 0, salary: 1 });
    // const totalSalary = employees.reduce((acc, employee) => acc + employee.salary, 0);
    // const averageSalary = totalSalary / employees.length;
    // res.send({ averageSalary });
  } catch (error) {
    console.log(error);
    res.send('Data fetching failed');
  }
});

// Get the average salary of employees in each department
router.get('/getAverageSalaryByDepartment', async (req, res) => {
  try {
    // using aggregation
    const averageSalary = await Employee.aggregate([
      { $group: { _id: '$department', avgSalary: { $avg: '$salary' } } } // _id is the field to group by and avgSalary is the field to calculate average
    ]);
    res.send(averageSalary);
  } catch (error) {
    console.log(error);
    res.send('Data fetching failed');
  }
});

router.get('/removeAll', async (req, res) => {
  try {
    await Employee.deleteMany();
    await Project.deleteMany();
    await Allocation.deleteMany();
    res.send('Data removed successfully');
  } catch (error) {
    console.log(error);
    res.send('Data removal failed');
  }
});

module.exports = router;