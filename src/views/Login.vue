<template>
  <div class="hero-container">
    <div class="row">
      <div class="col-7-md">
        <div class="is-vertical-align is-center h-100vh">
          <div class="row">
            <div class="col-2"></div>
            <div class="col-8">
              <div class="p-20">
                <h1 class="lead-title text-left">
                  <span class="text-primary">Continue</span>
                  <br />with GitHub
                </h1>
                <br />
                <p class="text-dark">
                  <i class="fas fa-exclamation-circle fa-sm" />
                  We are only storing the data essential to do the task.
                  Your fetched data and repositories are instantly deleted
                  after processing the developer activity.
                  <br />
                  <br />Your data is safe, secure and private
                  to you. No Ads or Tracking of any kind.
                </p>
              </div>
            </div>
            <div class="col-2"></div>
          </div>
        </div>
      </div>
      <div class="col-5-md bg-card offset-1">
        <div class="is-vertical-align is-center h-100vh">
          <div class="text-center">
            <a :href="loginUrl" class="button dark continue-github">
              <i class="fab fa-sm fa-github mr-5" />
              Register with GitHub
            </a>

            <div class="row my-30">
              <div class="col-5">
                <hr />
              </div>
              <div class="col-2">or</div>
              <div class="col-5">
                <hr />
              </div>
            </div>

            <a :href="loginUrl" class="button dark continue-github">
              <i class="fab fa-sm fa-github mr-5" />
              Login with GitHub
            </a>

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
                  Data deleted after use
                </p>
                <p class="text-left">
                  <i class="fas fa-ad mr-10" />
                  No Ads or Tracking
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
h1.lead-title {
  line-height: 6rem;
  font-size: 5rem;
  margin-top: 0px;
  margin-bottom: 0px;
}
</style>