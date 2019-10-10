<template>
  <div class="home-container">
    <!-- <div class="nav" style="height: 50px;">
      <div class="nav-left">
        <div class="nav-brand px-20">
          <h4>GitPro</h4>
        </div>
      </div>
      <div class="nav-right">
        <router-link to="/login" class="button primary">
          Login
          <i class="fas fa-xs fa-arrow-right" />
        </router-link>
      </div>
    </div>-->
    <div class="container">
      <div class="row">
        <div class="col-6-lg">
          <div class="is-vertical-align" style="height: calc(100vh - 30px)">
            <div class="p-20">
              <h3>GitPro</h3>
              <h1 class="error-code" style="line-height: 7rem;">
                <span></span>
                <br />simplified
              </h1>
              <p
                class="text-dark mt-30"
              >A platform to make repository management and developer activity tracking easier.</p>
              <a :href="loginUrl" class="button primary get-started ml-20 mt-50">
                <i class="fab fa-sm fa-github" />&nbsp;
                Get Started
                <i class="fas fa-sm fa-arrow-right" />
              </a>
            </div>
          </div>
        </div>
        <div class="col-6-lg">
          <div class="is-vertical-align" style="height: calc(100vh - 30px)">
            <img src="@/assets/version_control.svg" alt width="80%" />
          </div>
        </div>
      </div>

      <div class="is-center" style="height: 30px;">
        <i
          class="fas fa-arrow-down cursor-pointer"
          v-scroll-to="{
            el: '#featuresSection',
            duration: 2000,
            easing: [.6, .80, .30, 1.9],
            offset: 200
          }"
        />
      </div>

      <div class="row py-100" id="featuresSection">
        <div class="col-4">
          <div class="card card-shadow border-radius-10 p-30 mx-20">
            <h3 class="text-center">Manage Contributors</h3>
            <p
              class="text-dark text-left"
            >Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint magnam eos corrupti pariatur rem! Itaque repudiandae quidem amet vitae nam nemo nisi id! Aperiam, harum delectus! Facere et adipisci accusamus.</p>
          </div>
        </div>
        <div class="col-4">
          <div class="card card-shadow border-radius-10 p-30 mx-20">
            <h3 class="text-center">See Activity</h3>
            <p
              class="text-dark text-left"
            >Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint magnam eos corrupti pariatur rem! Itaque repudiandae quidem amet vitae nam nemo nisi id! Aperiam, harum delectus! Facere et adipisci accusamus.</p>
          </div>
        </div>
        <div class="col-4">
          <div class="card card-shadow border-radius-10 p-30 mx-20">
            <h3 class="text-center">Feature Three</h3>
            <p
              class="text-dark text-left"
            >Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint magnam eos corrupti pariatur rem! Itaque repudiandae quidem amet vitae nam nemo nisi id! Aperiam, harum delectus! Facere et adipisci accusamus.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Typed from "typed.js";
import HeroImage from "@/assets/version_control.svg";

export default {
  name: "home",
  components: {},
  data() {
    return {
      options: {
        strings: ["Collaboration", "Repo Management", "Activity Tracking"],
        typeSpeed: 100,
        loop: true
      },
      loginUrl: ""
    };
  },
  created() {
    if (process.env.NODE_ENV === "production") {
      this.loginUrl = "https://api.gitpro.app/auth/github";
    } else {
      this.loginUrl = "http://localhost:5000/auth/github";
    }
  },
  mounted() {
    const typed = new Typed("span", this.options);
  }
};
</script>

<style lang="scss" scoped>
h1.error-code {
  font-size: 6rem;
  margin-top: 0px;
  margin-bottom: 0px;
}

.button.get-started {
  transform: scale(1.2);
}

.fa-arrow-down {
  animation: 2s upDown infinite;
}

@keyframes upDown {
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
  100% {
    transform: translateY(0px);
  }
}

.home-container {
  background-image: radial-gradient(
    circle farthest-corner at 10% 20%,
    rgba(239, 246, 249, 1) 0%,
    rgba(206, 239, 253, 1) 90%
  );
  // background-image: radial-gradient(
  //   circle farthest-corner at 18.7% 37.8%,
  //   rgba(250, 250, 250, 1) 0%,
  //   rgba(225, 234, 238, 1) 90%
  // );
}

// background-image: linear-gradient( 319.6deg,  rgba(243,0,79,1) 20.5%, rgba(255,236,68,1) 110.9% );
// background-image: radial-gradient( circle farthest-corner at 10% 20%,  rgba(87,108,117,1) 0%, rgba(37,50,55,1) 100.2% );
</style>