import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import prisma from '../prisma/client';
import { generateToken } from '../utils/jwt';
import { ApiResponse, AuthResponse, LoginRequest, RegisterRequest } from '../types/api.types';

export const register = async (req: Request, res: Response): Promise<void> => {
  const { name, email, password }: RegisterRequest = req.body;
  console.log("hocam", name, email, password)
  try {
    if (!name || !email || !password) {
      res.status(400).json({
        success: false,
        message: 'Name, email and password are required',
        error: 'Missing required fields'
      } as ApiResponse);
      return;
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      res.status(400).json({
        success: false,
        message: 'User already exists with this email',
        error: 'Email already in use'
      } as ApiResponse);
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    // Generate token
    const token = generateToken(user.id);
    
    const authData: AuthResponse = {
      user: { 
        id: user.id, 
        name: user.name, 
        email: user.email 
      }, 
      token 
    };

    res.status(201).json({
      success: true,
      data: authData,
      message: 'User registered successfully'
    } as ApiResponse<AuthResponse>);

  } catch (err) {
    console.error('hocam, Registration error:', err);
    res.status(500).json({
      success: false,
      message: 'Registration failed',
      error: err instanceof Error ? err.message : 'Unknown error'
    } as ApiResponse);
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password }: LoginRequest = req.body;

  try {
    if (!email || !password) {
      res.status(400).json({
        success: false,
        message: 'Email and password are required',
        error: 'Missing required fields'
      } as ApiResponse);
      return;
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      res.status(401).json({
        success: false,
        message: 'Invalid credentials',
        error: 'User not found'
      } as ApiResponse);
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401).json({
        success: false,
        message: 'Invalid credentials',
        error: 'Incorrect password'
      } as ApiResponse);
      return;
    }

    const token = generateToken(user.id);
    
    const authData: AuthResponse = {
      user: { 
        id: user.id, 
        name: user.name, 
        email: user.email 
      }, 
      token 
    };

    res.status(200).json({
      success: true,
      data: authData,
      message: 'Login successful'
    } as ApiResponse<AuthResponse>);

  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({
      success: false,
      message: 'Login failed',
      error: err instanceof Error ? err.message : 'Unknown error'
    } as ApiResponse);
  }
};