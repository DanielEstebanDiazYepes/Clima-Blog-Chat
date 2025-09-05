import { Request, Response } from 'express';
import axios from 'axios';
import { ApiResponse } from '../types';

// Obtener el clima actual usando una API externa
export const getCurrentWeather = async (req: Request, res: Response): Promise<void> => {
  try {
    const { city } = req.query;
    
    if (!city) {
      const response: ApiResponse = {
        success: false,
        message: 'Se requiere el parámetro "city"'
      };
      res.status(400).json(response);
      return;
    }

    // Usar OpenWeatherMap API (necesitas registrarte para obtener una API key)
    const apiKey = process.env.OPENWEATHER_API_KEY || 'tu_api_key_aqui';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=es`;
    
    const weatherResponse = await axios.get(url);
    
    const response: ApiResponse = {
      success: true,
      message: 'Datos del clima obtenidos correctamente',
      data: weatherResponse.data
    };
    
    res.json(response);
  } catch (error) {
    console.error('Error fetching weather:', error);
    
    const response: ApiResponse = {
      success: false,
      message: 'Error al obtener los datos del clima',
      error: error.message
    };
    
    res.status(500).json(response);
  }
};