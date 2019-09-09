<template>
  <nav class="nav">
    <div class="nav-left">
      <router-link to="/">GitHub Supreme</router-link>
    </div>
    <div class="nav-right">
      <router-link to="/login" class="button primary">Login</router-link>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navbar"
};
</script>