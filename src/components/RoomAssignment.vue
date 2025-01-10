<template>
  <div class="room-assignment">
    <h2>Asignación de Habitaciones</h2>
    
    <div class="assignment-form">
      <form @submit.prevent="handleSubmit" class="form-container">
        <div class="form-group">
          <label for="hotel">Hotel</label>
          <select 
            id="hotel" 
            v-model="formData.hotel_id" 
            required 
            class="form-control"
            :disabled="loading"
          >
            <option value="">Seleccione un hotel</option>
            <option v-for="hotel in hotels" :key="hotel.id" :value="hotel.id">
              {{ hotel.nombre }}
            </option>
          </select>
        </div>

        <div class="form-group">
          <label for="tipo">Tipo de Habitación</label>
          <select 
            id="tipo" 
            v-model="formData.tipo_habitacion" 
            required 
            class="form-control"
            :disabled="loading"
          >
            <option value="">Seleccione tipo</option>
            <option value="ESTANDAR">Estándar</option>
            <option value="JUNIOR">Junior</option>
            <option value="SUITE">Suite</option>
          </select>
        </div>

        <div class="form-group">
          <label for="acomodacion">Acomodación</label>
          <select 
            id="acomodacion" 
            v-model="formData.acomodacion" 
            required 
            class="form-control"
            :disabled="loading"
          >
            <option value="">Seleccione acomodación</option>
            <option value="SENCILLA">Sencilla</option>
            <option value="DOBLE">Doble</option>
            <option value="TRIPLE">Triple</option>
            <option value="CUADRUPLE">Cuádruple</option>
          </select>
        </div>

        <div class="form-group">
          <label for="cantidad">Cantidad de Habitaciones</label>
          <input 
            type="number" 
            id="cantidad" 
            v-model="formData.cantidad" 
            required 
            min="1" 
            class="form-control"
            :disabled="loading"
          >
        </div>

        <button 
          type="submit" 
          class="btn btn-primary submit-btn"
          :disabled="loading"
        >
          <i class="fas fa-bed"></i>
          {{ loading ? 'Procesando...' : 'Separar Habitación' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { roomService } from '@/services/roomService';
import { hotelService } from '@/services/hotelService';
import Swal from 'sweetalert2';

export default {
  name: 'RoomAssignment',
  data() {
    return {
      hotels: [],
      formData: {
        hotel_id: '',
        tipo_habitacion: '',
        acomodacion: '',
        cantidad: 1
      },
      loading: false
    };
  },
  computed: {
    selectedHotel() {
      return this.hotels.find(h => h.id === this.formData.hotel_id);
    }
  },
  async created() {
    await this.loadHotels();
  },
  methods: {
    async loadHotels() {
      try {
        const response = await hotelService.getHotels();
        console.log('🏨 Hoteles cargados:', response.data);
        this.hotels = response.data;
      } catch (error) {
        console.error('❌ Error cargando hoteles:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudieron cargar los hoteles'
        });
      }
    },
    async handleSubmit() {
      if (this.loading) return;

      console.log('📝 Datos del formulario a enviar:', this.formData);

      try {
        this.loading = true;
        const response = await roomService.assignRooms(this.formData);
        console.log('✅ Respuesta exitosa del servidor:', response);
        
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          text: response.message,
          html: `
            <div class="assignment-details">
              <p><strong>Hotel:</strong> ${response.info_hotel.nombre}</p>
              <p><strong>Tipo:</strong> ${response.data.tipo_habitacion}</p>
              <p><strong>Acomodación:</strong> ${response.data.acomodacion}</p>
              <p><strong>Cantidad:</strong> ${response.data.cantidad}</p>
              <hr>
              <p class="capacity-info">
                <strong>Capacidad Total:</strong> ${response.habitaciones_totales}<br>
                <strong>Capacidad Configurada:</strong> ${response.info_hotel.capacidad_configurada}
              </p>
            </div>
          `
        });

        // Limpiar formulario
        this.formData = {
          hotel_id: '',
          tipo_habitacion: '',
          acomodacion: '',
          cantidad: 1
        };
        console.log('🧹 Formulario limpiado');
      } catch (error) {
        console.error('❌ Error en la asignación:', {
          error,
          response: error.response?.data,
          status: error.response?.status
        });
        
        const errorMessage = error.response?.data?.error || error.message || 'Error al asignar habitaciones';
        
        Swal.fire({
          icon: 'error',
          title: 'Error en la asignación',
          text: errorMessage,
          confirmButtonColor: '#e74c3c',
          confirmButtonText: 'Entendido'
        });
      } finally {
        this.loading = false;
        console.log('🔄 Estado de loading finalizado');
      }
    }
  },
  watch: {
    // Agregar watchers para monitorear cambios en el formulario
    'formData.hotel_id'(newVal) {
      console.log('🏨 Hotel ID seleccionado:', newVal);
    },
    'formData.tipo_habitacion'(newVal) {
      console.log('🛏️ Tipo de habitación seleccionado:', newVal);
    },
    'formData.acomodacion'(newVal) {
      console.log('🔑 Acomodación seleccionada:', newVal);
    },
    'formData.cantidad'(newVal) {
      console.log('📊 Cantidad actualizada:', newVal);
    }
  }
};
</script>

<style scoped>
.room-assignment {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

.assignment-form {
  background: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.form-container {
  display: grid;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-control {
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.form-control:focus {
  border-color: #3498db;
  box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
  outline: none;
}

label {
  font-weight: 500;
  color: #2c3e50;
}

.submit-btn {
  background-color: #3498db;
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.3s ease;
  margin-top: 20px;
}

.submit-btn:hover {
  background-color: #2980b9;
  transform: translateY(-2px);
}

.submit-btn i {
  font-size: 1.1em;
}

/* Estilos para el mensaje de éxito en Swal */
:deep(.assignment-details) {
  text-align: left;
  margin-top: 15px;
  padding: 15px;
  background: #f8f9fa;
  border-radius: 8px;
}

:deep(.assignment-details p) {
  margin: 8px 0;
}

:deep(.assignment-details hr) {
  margin: 15px 0;
  border: none;
  border-top: 1px solid #dee2e6;
}

:deep(.capacity-info) {
  background-color: #e8f4fd;
  padding: 10px;
  border-radius: 6px;
  margin-top: 10px !important;
}

.submit-btn:disabled {
  background-color: #95a5a6;
  cursor: not-allowed;
  transform: none;
}

.form-control:disabled {
  background-color: #f5f6f7;
  cursor: not-allowed;
}

/* Animación de loading */
@keyframes pulse {
  0% { opacity: 1; }
  50% { opacity: 0.6; }
  100% { opacity: 1; }
}

.submit-btn:disabled {
  animation: pulse 1.5s infinite;
}
</style>
  