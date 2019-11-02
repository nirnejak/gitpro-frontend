<template>
  <div class="hero-container">
    <div class="row">
      <div class="col-7-md">
        <div class="is-vertical-align h-100vh">
          <h1 class="text-center">Secure Login</h1>
        </div>
      </div>
      <div class="col-5-md bg-card offset-1">
        <div class="is-vertical-align is-center h-100vh">
          <div class="text-center">
            <h1>Login/SignUp</h1>
            <button class="button dark continue-github">
              <i class="fab fa-sm fa-github" />
              Continue with GitHub
            </button>

            <div>
              <div class="mt-70 text-dark">
                <p class="text-left">
                  <i class="fas fa-user-lock mr-5" />
                  Secure login with GitHub
                </p>
                <p class="text-left">
                  <i class="fas fa-shield-alt mr-10" />
                  All your data is secure
                </p>
                <p class="text-left">
                  <i class="fas fa-user-shield mr-5" />
                  User privacy, no tracking
                </p>
                <p class="text-left">
                  <i class="fas fa-trash mr-10" />
                  Deleted after processing
                </p>
              </div>
            </div>
          </div>
        </div>
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
.button.continue-github {
  transform: scale(1.2);
}
</style>