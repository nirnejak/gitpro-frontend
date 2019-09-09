<template>
  <div class="centered-container">
    <div class="card bg-white is-text-center p-20 px-100">
      <div v-if="$route.params.code === '404'">
        <h1 class="error-code">404</h1>
        <p class="text-dark">Not Found</p>
      </div>
      <div v-if="$route.params.code === '0'">
        <h1>Not Connected</h1>
        <p class="text-dark">Unable to Connect to the Server</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Error"
};
</script>

<style lang="scss" scoped>
h1.error-code {
  font-size: 10rem;
  margin-top: 0px;
  margin-bottom: 0px;
}
</style>