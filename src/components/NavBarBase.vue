<!-- <template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container">
      <a class="navbar-brand" href="#">Logo</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link to="/" class="nav-link">Inicio</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/tags" class="nav-link">Etiquetas</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/tasks" class="nav-link">Tareas</router-link>
          </li>
          
        </ul>
      </div>
    </div>
  </nav>
</template> -->

<!--desde aqui intentamos hacer el otro nav bar-->
<template>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">To Do List :D</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link to="/" class="nav-link">Salir</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/tasks" class="nav-link">Tareas</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/tasks/Completado" class="nav-link">Tareas completadas</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/tasks/Pendiente" class="nav-link">Tareas Pendientes</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/tags" class="nav-link">Etiquetas</router-link>
            <!-- <a class="nav-link" href="#">Etiquetas</a> -->
          </li>

        </ul>
      </div>
    </div>
  </nav>
</template>
<!--hasta aqui estamos  -->


  
  <script>
  export default {
    name: "NavbarBase",
  };
  </script>
  
  <style>
  /* Estilos comunes de tu barra de navegación */
  .navbar {
    background-color: #333;
    color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
  }
  
  .logo {
    font-size: 24px;
    font-weight: bold;
  }
  
  .menu {
    display: flex;
    gap: 20px;
  }
  
  .router-link {
    color: white;
    text-decoration: none;
    transition: color 0.3s;
  }
  
  .router-link:hover {
    color: #f5a623;
  }
  </style>
  