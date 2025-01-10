<script setup>
import { RouterView } from 'vue-router';
</script>

<template>
  <div id="app">
    <!-- Encabezado -->
    <header>
      <h1>Gestión Hotelera - Decameron</h1>
      <nav>
        <ul>
          <li>
            <router-link to="/" class="nav-link" active-class="active">
              <i class="fas fa-home"></i> Inicio
            </router-link>
          </li>
          <li>
            <router-link to="/hoteles" class="nav-link" active-class="active">
              <i class="fas fa-hotel"></i> Hoteles
            </router-link>
          </li>
          <li>
            <router-link to="/habitaciones" class="nav-link" active-class="active">
              <i class="fas fa-bed"></i> Habitaciones
            </router-link>
          </li>
          <li>
            <router-link to="/hoteles/nuevo" class="nav-link" active-class="active">
              <i class="fas fa-plus-circle"></i> Registrar Hotel
            </router-link>
          </li>
        </ul>
      </nav>
    </header>

    <!-- Contenido principal -->
    <main>
      <router-view></router-view>
    </main>

    <!-- Pie de página -->
    <footer>
      <p>© 2025 Decameron. Todos los derechos reservados.</p>
    </footer>
  </div>
</template>

<style scoped>
/* Estilo general */
#app {
  font-family: 'Poppins', sans-serif;
  color: #333;
  margin: 0;
  padding: 0;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* Encabezado */
header {
  background-color: #ffa07a;
  color: #fff;
  padding: 1.5em 0;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

header h1 {
  margin: 0;
  font-size: 2.2em;
  font-weight: 600;
  text-align: center;
}

nav ul {
  list-style: none;
  padding: 0;
  display: flex;
  justify-content: center;
  gap: 2em;
  margin-top: 1em;
}

nav ul li {
  display: inline;
}

.nav-link {
  color: #fff;
  text-decoration: none;
  font-weight: bold;
  padding: 8px 16px;
  border-radius: 20px;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
}

.nav-link:hover {
  background-color: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
}

.nav-link.active {
  background-color: #ff7043;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

/* Contenido principal */
main {
  flex: 1;
  padding: 2em;
  background-color: #fffaf0;
}

/* Pie de página */
footer {
  background-color: #ff7043;
  color: white;
  padding: 1.5em;
  text-align: center;
  font-size: 0.9em;
}

footer p {
  margin: 0;
}

/* Efectos generales */
.nav-link i {
  font-size: 1.1em;
}

@media (max-width: 768px) {
  nav ul {
    flex-direction: column;
    align-items: center;
    gap: 1em;
  }

  .nav-link {
    width: 200px;
    justify-content: center;
  }
}
</style>
