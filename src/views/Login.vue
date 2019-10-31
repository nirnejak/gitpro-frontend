<template>
  <div class="hero-container">
    <div class="container h-100vh">
      <div class="row">
        <h1>Login</h1>

        <i class="fab fa-sm fa-github" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      loginUrl: ""
    };
  },
  created() {
    window.scrollTo(0, 0);
    if (process.env.NODE_ENV === "production") {
      this.loginUrl = "https://aws.gitpro.app/auth/github";
    } else {
      this.loginUrl = "http://localhost:5000/auth/github";
    }
  }
};
</script>

<style>
</style>