<template>
  <div class="centered-container">
    <div class="is-text-center p-20 px-100">
      <div>
        <p class="text-dark">Welcome to</p>
        <h1 class="error-code">GitHub Supreme</h1>
        <br />
        <router-link to="/login" class="button primary">Login</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "home",
  components: {}
};
</script>

<style lang="scss" scoped>
h1.error-code {
  font-size: 5rem;
  margin-top: 0px;
  margin-bottom: 0px;
}

.button {
  transform: scale(1.2);
}
</style>