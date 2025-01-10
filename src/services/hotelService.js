import axios from 'axios'

const API_URL = 'http://localhost:8000/api/v1'

export const hotelService = {
  async getHotels() {
    try {
      const response = await axios.get(`${API_URL}/hoteles`)
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al obtener hoteles')
    }
  },

  async createHotel(hotelData) {
    try {
      const response = await axios.post(`${API_URL}/hoteles`, hotelData)
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al crear hotel')
    }
  },

  async updateHotel(id, hotelData) {
    try {
      // Realiza la solicitud PUT para actualizar el hotel con el ID correspondiente
      const response = await axios.put(`${API_URL}/hoteles/${id}`, hotelData)
      return response.data
    } catch (error) {
      // Mejor manejo de errores para proporcionar información más detallada
      const errorMessage = error.response?.data?.message || 'Error al actualizar el hotel'
      console.error('Error al actualizar el hotel:', errorMessage)
      throw new Error(errorMessage)
    }
  },

  async deleteHotel(id) {
    try {
      await axios.delete(`${API_URL}/hoteles/${id}`)
      return true
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al eliminar hotel')
    }
  },

  async getHotelById(id) {
    try {
      const response = await axios.get(`${API_URL}/hoteles/${id}`)
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al obtener hotel')
    }
  },
}
