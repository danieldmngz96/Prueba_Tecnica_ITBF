import axios from 'axios';

const API_URL = 'http://localhost:8000/api/v1';

export const roomService = {
    async assignRooms(roomData) {
        console.log('🚀 Iniciando petición al servidor:', {
            url: `${API_URL}/hotel-habitaciones`,
            data: roomData
        });

        try {
            const response = await axios.post(`${API_URL}/hotel-habitaciones`, roomData);
            console.log('📨 Respuesta del servidor:', response.data);
            return response.data;
        } catch (error) {
            console.error('❌ Error en el servicio:', {
                error,
                response: error.response?.data,
                status: error.response?.status
            });
            throw error;
        }
    }
}; 