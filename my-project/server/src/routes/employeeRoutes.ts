import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getEmployees = async (req: Request, res: Response): Promise<void> => {
  try {
    const employees = await prisma.employee.findMany({
      orderBy: {
        id: 'asc',
      },
    });
    
    res.status(200).json(employees);
  } catch (error) {
    console.error('Error fetching employees:', error);
    res.status(500).json({ error: 'Failed to fetch employees' });
  }
};

export const createEmployee = async (req: Request, res: Response): Promise<void> => {
  try {
    const { firstName, lastName, groupName, role, expectedSalary, expectedDateOfDefense } = req.body;


    if (!firstName || !lastName) {
      res.status(400).json({ error: 'First name and last name are required' });
      return;
    }

    const newEmployee = await prisma.employee.create({
      data: {
        firstName,
        lastName,
        groupName,
        role,
        expectedSalary: parseFloat(expectedSalary.toString()) || 0,
        expectedDateOfDefense,
      },
    });

    res.status(201).json(newEmployee);
  } catch (error) {
    console.error('Error creating employee:', error);
    res.status(500).json({ error: 'Failed to create employee' });
  }
};

export const deleteEmployee = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const employeeId = parseInt(id);
    
    if (isNaN(employeeId)) {
      res.status(400).json({ error: 'Invalid employee ID' });
      return;
    }

    const employee = await prisma.employee.findUnique({
      where: { id: employeeId },
    });

    if (!employee) {
      res.status(404).json({ error: 'Employee not found' });
      return;
    }

    await prisma.employee.delete({
      where: { id: employeeId },
    });

    res.status(200).json({ message: 'Employee deleted successfully' });
  } catch (error) {
    console.error('Error deleting employee:', error);
    res.status(500).json({ error: 'Failed to delete employee' });
  }
};


export const updateEmployee = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id, firstName, lastName, groupName, role, expectedSalary, expectedDateOfDefense } = req.body;
    const employeeId = parseInt(id);
    
    if (isNaN(employeeId)) {
      res.status(400).json({ error: 'Invalid employee ID' });
      return;
    }

    const employee = await prisma.employee.findUnique({
      where: { id: employeeId },
    });

    if (!employee) {
      res.status(404).json({ error: 'Employee not found' });
      return;
    }

    if (!firstName || !lastName) {
      res.status(400).json({ error: 'First name and last name are required' });
      return;
    }

    const updatedEmployee = await prisma.employee.update({
      where: { id: employeeId },
      data: {
        firstName,
        lastName,
        groupName,
        role,
        expectedSalary: parseFloat(expectedSalary.toString()) || 0,
        expectedDateOfDefense,
      },
    });

    res.status(200).json(updatedEmployee);
  } catch (error) {
    console.error('Error updating employee:', error);
    res.status(500).json({ error: 'Failed to update employee' });
  }
};