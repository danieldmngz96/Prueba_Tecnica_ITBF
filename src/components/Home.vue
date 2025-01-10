<template>
  <div>
    <h1>Sistema de Gestión Hotelera</h1>

    <!-- Lista de hoteles -->
    <div v-if="hotels.length > 0">
      <h2>Lista de Hoteles</h2>
      <ul>
        <li v-for="hotel in hotels" :key="hotel.id">
          <strong>{{ hotel.nombre }}</strong> - {{ hotel.ubicacion }}
        </li>
      </ul>
    </div>
    <p v-else>Cargando hoteles o no hay hoteles disponibles.</p>
  </div>
</template>

<script>
import { hotelService } from '@/services/hotelService.js'

export default {
  name: 'HomeComponent',
  data() {
    return {
      hotels: [], // Lista de hoteles
      loading: false, // Estado de carga
      error: null, // Estado de error
    }
  },
  async mounted() {
    this.loading = true
    try {
      const response = await hotelService.getHotels()
      this.hotels = response.data // Accede a los hoteles dentro de 'data'
      console.log('Hoteles cargados:', this.hotels) // Verifica que los hoteles estén bien
    } catch (err) {
      this.error = err.message || 'Error al cargar los hoteles'
      console.error(this.error)
    } finally {
      this.loading = false
    }
  },
}
</script>

<style scoped>
h1 {
  color: #333;
  font-size: 2em;
  margin-bottom: 1em;
}

h2 {
  color: #555;
  margin-bottom: 0.5em;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin: 0.5em 0;
  background-color: #f9f9f9;
  padding: 0.5em;
  border: 1px solid #ddd;
  border-radius: 5px;
}

p {
  color: #888;
  font-style: italic;
}
</style>
