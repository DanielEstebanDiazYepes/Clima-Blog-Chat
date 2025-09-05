//AQUI DEFINIMOS LOS TIPOS DE DATOS PARA LA APLICACIÓN

import { Request } from 'express';

export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  created_at: Date;
  updated_at: Date;
}

export interface Post {
  id: number;
  title: string;
  content: string;
  image_url?: string;
  user_id: number;
  created_at: Date;
  updated_at: Date;
}

export interface Friendship {
  id: number;
  user_id: number;
  friend_id: number;
  status: 'pending' | 'accepted' | 'rejected';
  created_at: Date;
  updated_at: Date;
}

export interface Message {
  id: number;
  sender_id: number;
  receiver_id: number;
  content: string;
  read: boolean;
  created_at: Date;
}

// Para las respuestas de la API
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

// Para las solicitudes de autenticación
export interface AuthRequest extends Request {
  user?: User;
}