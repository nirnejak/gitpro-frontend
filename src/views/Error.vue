<template>
  <div class="centered-container">
    <div class="card bg-card has-text-centered p-0 py-100">
      <div v-if="$route.params.code === '404'">
        <img src="@/assets/404.svg" alt width="50%" />
        <h1 class="is-size-2 text-dark mt-40 mb-0">Page not found</h1>
        <p>
          Goto
          <router-link to="/dashboard" v-if="user.login">Dashboard</router-link>
          <router-link to="/" v-else>Home</router-link>
        </p>
      </div>
      <div v-if="$route.params.code === '0'" class="px-100">
        <h1 class="is-size-2">Not Connected</h1>
        <p class="text-dark">Unable to Connect to the Server</p>
        <p>
          Goto
          <router-link to="/dashboard" v-if="user.login">Dashboard</router-link>
          <router-link to="/" v-else>Home</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Error",
  data() {
    return {
      user: {
        login: localStorage.login
      }
    };
  }
};
</script>

<style lang="scss" scoped>
h1.error-code {
  font-size: 10rem;
  margin-top: 0px;
  margin-bottom: 0px;
}
</style>