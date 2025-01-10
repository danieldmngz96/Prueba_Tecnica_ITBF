import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/components/Home.vue'
import HotelForm from '@/components/HotelForm.vue'
import HotelList from '@/components/HotelList.vue'
import RoomAssignment from '@/components/RoomAssignment.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/hoteles/nuevo',
    name: 'hotel-form',
    component: HotelForm,
  },
  {
    path: '/hoteles',
    name: 'hotel-list',
    component: HotelList,
  },
  {
    path: '/habitaciones',
    name: 'room-assignment',
    component: RoomAssignment,
    children: [
      {
        path: ':hotelId',
        name: 'room-assignment-hotel',
        component: RoomAssignment,
        props: true,
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
