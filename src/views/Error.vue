<template>
  <div class="centered-container">
    <div class="card bg-card text-center p-0 py-100">
      <div v-if="$route.params.code === '404'">
        <img src="@/assets/404.svg" alt width="50%" />
        <h1 class="text-dark mt-40 mb-0">Page not found</h1>
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