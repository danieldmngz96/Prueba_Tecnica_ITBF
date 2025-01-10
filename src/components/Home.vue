<template>
  <div>
    <h1>Sistema de Gestión Hotelera</h1>
    <HotelList
      :hotels="hotels"
      @addHotel="showHotelForm"
      @editHotel="editHotel"
      @assignRoom="assignRoom"
    />

    <!-- Formulario para agregar o editar hoteles -->
    <HotelForm v-if="showForm" :hotel="selectedHotel" @saveHotel="saveHotel" @cancel="cancelForm" />

    <!-- Componente para asignar habitaciones -->
    <RoomAssignment
      v-if="showRoomAssignment"
      :hotel="selectedHotel"
      @assignRoom="saveRoomAssignment"
    />
  </div>
</template>

<script>
import HotelList from './HotelList.vue'
import HotelForm from './HotelForm.vue'

import RoomAssignment from './RoomAssignment.vue'

export default {
  name: 'HomeComponent',
  components: {
    HotelList,
    HotelForm,
    RoomAssignment,
  },
  data() {
    return {
      hotels: [], // Lista de hoteles
      selectedHotel: null, // Hotel seleccionado para editar o asignar habitaciones
      showForm: false, // Mostrar el formulario de hotel
      showRoomAssignment: false, // Mostrar el componente de asignación de habitaciones
    }
  },
  methods: {
    showHotelForm() {
      this.selectedHotel = null
      this.showForm = true
      this.showRoomAssignment = false
    },
    editHotel(hotel) {
      this.selectedHotel = { ...hotel }
      this.showForm = true
      this.showRoomAssignment = false
    },
    saveHotel(hotel) {
      if (hotel.id) {
        // Editar hotel existente
        const index = this.hotels.findIndex((h) => h.id === hotel.id)
        if (index !== -1) {
          this.hotels[index] = hotel
        }
      } else {
        // Agregar nuevo hotel
        hotel.id = Date.now() // Generar un ID único
        this.hotels.push(hotel)
      }
      this.cancelForm()
    },
    cancelForm() {
      this.showForm = false
      this.selectedHotel = null
    },
    assignRoom(hotel) {
      this.selectedHotel = hotel
      this.showForm = false
      this.showRoomAssignment = true
    },
    saveRoomAssignment(data) {
      const { hotel, roomType, accommodation } = data
      const index = this.hotels.findIndex((h) => h.id === hotel.id)
      if (index !== -1) {
        if (!this.hotels[index].rooms) {
          this.hotels[index].rooms = []
        }
        this.hotels[index].rooms.push({ roomType, accommodation })
      }
      this.showRoomAssignment = false
      this.selectedHotel = null
    },
  },
}
</script>
