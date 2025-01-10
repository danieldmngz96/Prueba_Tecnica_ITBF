<template>
  <div>
    <h2>{{ isEditing ? 'Editar Hotel' : 'Agregar Hotel' }}</h2>
    <form @submit.prevent="saveHotel">
      <label>
        Nombre del Hotel:
        <input type="text" v-model="localHotel.nombre" required />
      </label>
      <label>
        Dirección:
        <input type="text" v-model="localHotel.direccion" required />
      </label>
      <label>
        Ciudad:
        <input type="text" v-model="localHotel.ciudad" required />
      </label>
      <label>
        NIT:
        <input type="text" v-model="localHotel.nit" required />
      </label>
      <label>
        Número de Habitaciones:
        <input type="number" v-model="localHotel.numero_habitaciones" required />
      </label>
      <button type="submit">Guardar</button>
      <button type="button" @click="$emit('cancel')">Cancelar</button>
    </form>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
import axios from 'axios'

export default {
  name: 'HotelForm',
  props: {
    hotel: Object,
  },
  data() {
    return {
      isEditing: !!this.hotel,
      localHotel: this.hotel || {
        nombre: '',
        direccion: '',
        ciudad: '',
        nit: '',
        numero_habitaciones: null,
      },
    }
  },
  methods: {
    async saveHotel() {
      try {
        const response = await axios.post('http://localhost:8000/api/v1/hoteles', this.localHotel)
        Swal.fire({
          icon: 'success',
          title: 'Hotel Guardado',
          html: `
            <pre>${JSON.stringify(response.data, null, 2)}</pre>
          `,
          confirmButtonText: 'Aceptar',
        })
        this.$emit('saveHotel', response.data)
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error al Guardar',
          text: error.response?.data?.message || 'Ocurrió un error inesperado.',
        })
      }
    },
  },
}
</script>

<style scoped>
/* Estilo del formulario */
form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

label {
  display: flex;
  flex-direction: column;
  font-size: 1rem;
  margin-bottom: 0.5rem;
}

button {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  cursor: pointer;
}

button[type='button'] {
  background: #ccc;
  color: #333;
}

button[type='submit'] {
  background: #007bff;
  color: #fff;
}
</style>
