<template>
  <div class="columns">
    <div class="column is-7 bg-gradienta">
      <div class="hero is-fullheight">
        <div class="hero-body">
          <div class="columns is-centered is-vcentered">
            <div class="column is-8">
              <div class="p-20">
                <h1 class="title is-size-3 lead-title text-left" style="line-height: 3rem;">
                  <span class="has-text-primary">Continue</span>
                  <br />with GitHub
                </h1>
                <br />
                <p class="has-text-dark">
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
          </div>
        </div>
      </div>
    </div>
    <div class="column is-5 bg-card">
      <div class="hero is-fullheight">
        <div class="hero-body">
          <div class="columns is-centered is-vcentered w-100">
            <div class="column is-11 has-text-centered">
              <div class="p-20">
                <a :href="loginUrl" class="button is-dark continue-github">
                  <i class="fab fa-sm fa-github mr-5" />
                  Register with GitHub
                </a>

                <div class="columns my-10">
                  <div class="column is-5">
                    <hr />
                  </div>
                  <div class="column is-2">or</div>
                  <div class="column is-5">
                    <hr />
                  </div>
                </div>

                <a :href="loginUrl" class="button is-dark continue-github">
                  <i class="fab fa-sm fa-github mr-5" />
                  Login with GitHub
                </a>
              </div>

              <div class="columns is-centered">
                <div class="mt-70 has-text-dark has-text-left">
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