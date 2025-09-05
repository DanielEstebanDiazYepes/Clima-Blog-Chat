import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AuthRequest } from '../types';
import { query } from '../utils/database';

// MIDDLEWARE PARA AUTENTICAR EL TOKEN JWT

export const authenticateToken = async (
  req: AuthRequest, 
  res: Response, 
  next: NextFunction
): Promise<void> => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Formato: Bearer TOKEN

  if (!token) {
    res.status(401).json({ success: false, message: 'Token de acceso requerido' });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret') as { userId: number };
    const users = await query('SELECT id, username, email FROM users WHERE id = ?', [decoded.userId]);
    
    if (users.length === 0) {
      res.status(401).json({ success: false, message: 'Usuario no válido' });
      return;
    }

    req.user = users[0];
    next();
  } catch (error) {
    res.status(403).json({ success: false, message: 'Token no válido' });
  }
};