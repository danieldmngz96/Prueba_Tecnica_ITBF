<template>
    <div>
      <h2>{{ isEditing ? "Editar Hotel" : "Agregar Hotel" }}</h2>
      <form @submit.prevent="saveHotel">
        <label>
          Nombre del Hotel:
          <input type="text" v-model="hotel.name" required />
        </label>
        <label>
          Datos Tributarios:
          <input type="text" v-model="hotel.taxData" required />
        </label>
        <button type="submit">Guardar</button>
        <button @click="$emit('cancel')">Cancelar</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    name: "HotelForm",
    props: {
      hotel: Object,
    },
    data() {
      return {
        isEditing: !!this.hotel,
        localHotel: this.hotel || { name: "", taxData: "" },
      };
    },
    methods: {
      saveHotel() {
        this.$emit("saveHotel", this.localHotel);
      },
    },
  };
  </script>
  