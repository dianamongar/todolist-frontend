<template>
    <div class="navbar">
      <!-- Aquí va la estructura común de tu barra de navegación -->
      <div class="logo">Logo</div>
      <div class="menu">
        <router-link to="/">Inicio</router-link>
        <router-link to="/tags">Etiquetas</router-link>
        <router-link to="/tasks">Tareas</router-link>
        <!-- Puedes agregar más enlaces según tus necesidades -->
      </div>
    </div>
  </template>
  
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
  