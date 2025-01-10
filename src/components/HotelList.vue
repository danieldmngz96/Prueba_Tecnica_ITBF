<template>
  <div class="hotel-list">
    <h2>Lista de Hoteles Disponibles</h2>
    <div v-if="loading" class="loading">Cargando...</div>
    <div v-if="error" class="error">{{ error }}</div>
    <ul v-if="!loading && !error" class="hotel-items">
      <li v-for="hotel in hotels" :key="hotel.id" class="hotel-item">
        <div class="hotel-info">{{ hotel.nombre }} - {{ hotel.ciudad }}</div>
        <div class="button-group" v-if="showActions">
          <!--
          -->
          <button @click="editHotel(hotel)" class="btn btn-edit">
            <i class="fas fa-edit"></i> Editar
          </button>
          <button @click="assignRoom(hotel)" class="btn btn-assign">
            <i class="fas fa-key"></i> Asignar Habitación
          </button>
          <button @click="deleteHotel(hotel.id)" class="btn btn-delete">
            <i class="fas fa-trash"></i> Eliminar
          </button>
        </div>
      </li>
    </ul>
    <button @click="addHotel" class="btn btn-add"><i class="fas fa-plus"></i> Agregar Hotel</button>
  </div>
</template>

<script>
import { hotelService } from '@/services/hotelService'
import Swal from 'sweetalert2'

export default {
  name: 'HotelList',
  props: {
    showActions: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      hotels: [],
      loading: false,
      error: null,
    }
  },
  async created() {
    await this.loadHotels()
  },
  methods: {
    async loadHotels() {
      this.loading = true
      this.error = null
      try {
        const response = await hotelService.getHotels()
        this.hotels = response.data
      } catch (error) {
        this.error = error.message
        console.error('Error cargando hoteles:', error)
      } finally {
        this.loading = false
      }
    },
    addHotel() {
      this.$emit('addHotel')
    },
    /*    editHotel(hotel) {
      this.$emit('editHotel', hotel)
    }, */
    editHotel(hotel) {
      // Creamos un formulario de edición usando SweetAlert2
      Swal.fire({
        title: 'Editar Hotel',
        html: `
      <label for="nombre">Nombre:</label>
      <input type="text" id="nombre" class="swal2-input" value="${hotel.nombre}">
      <label for="direccion">Dirección:</label>
      <input type="text" id="direccion" class="swal2-input" value="${hotel.direccion}">
      <label for="ciudad">Ciudad:</label>
      <input type="text" id="ciudad" class="swal2-input" value="${hotel.ciudad}">
      <label for="nit">NIT:</label>
      <input type="text" id="nit" class="swal2-input" value="${hotel.nit}">
      <label for="numero_habitaciones">Número de Habitaciones:</label>
      <input type="number" id="numero_habitaciones" class="swal2-input" value="${hotel.numero_habitaciones}">
    `,
        focusConfirm: false,
        preConfirm: () => {
          // Obtener los valores de los inputs
          const nombre = document.getElementById('nombre').value
          const direccion = document.getElementById('direccion').value
          const ciudad = document.getElementById('ciudad').value
          const nit = document.getElementById('nit').value
          const numero_habitaciones = document.getElementById('numero_habitaciones').value

          // Realizamos el PUT con los datos del formulario
          return {
            id: hotel.id,
            nombre,
            direccion,
            ciudad,
            nit,
            numero_habitaciones,
          }
        },
      }).then((result) => {
        if (result.isConfirmed) {
          const updatedHotel = result.value
          // Hacemos la llamada al API para actualizar el hotel
          this.updateHotel(updatedHotel)
        }
      })
    },
    assignRoom(hotel) {
      this.$router.push({
        name: 'room-assignment-hotel',
        params: { hotelId: hotel.id },
      })
    },
    async deleteHotel(id) {
      if (confirm('¿Está seguro de eliminar este hotel?')) {
        try {
          await hotelService.deleteHotel(id)
          await this.loadHotels() // Recargar la lista
        } catch (error) {
          this.error = error.message
        }
      }
    },
  },
}
</script>

<style scoped>
.hotel-list {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.hotel-items {
  list-style: none;
  padding: 0;
}

.hotel-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  margin-bottom: 10px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.hotel-item:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  transform: translateY(-2px);
}

.hotel-info {
  font-size: 1.1em;
  color: #333;
}

.button-group {
  display: flex;
  gap: 8px;
}

.btn {
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.3s ease;
}

.btn i {
  font-size: 0.9em;
}

.btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.btn-edit {
  background-color: #3498db;
  color: white;
}

.btn-edit:hover {
  background-color: #2980b9;
}

.btn-assign {
  background-color: #2ecc71;
  color: white;
}

.btn-assign:hover {
  background-color: #27ae60;
}

.btn-delete {
  background-color: #e74c3c;
  color: white;
}

.btn-delete:hover {
  background-color: #c0392b;
}

.btn-add {
  background-color: #9b59b6;
  color: white;
  margin-top: 20px;
  padding: 12px 24px;
  font-size: 1.1em;
}

.btn-add:hover {
  background-color: #8e44ad;
}

.error {
  color: #e74c3c;
  padding: 10px;
  border-radius: 6px;
  background-color: #fadbd8;
  margin: 10px 0;
}

.loading {
  text-align: center;
  padding: 20px;
  color: #7f8c8d;
  font-size: 1.1em;
}
</style>
