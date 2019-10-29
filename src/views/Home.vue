<template>
  <div>
    <div class="home-container">
      <div class="container">
        <div class="row">
          <div class="col-6-md">
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
          <div class="col-6-md">
            <div class="is-vertical-align is-center" style="height: calc(100vh - 30px)">
              <img src="@/assets/version_control.svg" alt width="80%" />
            </div>
          </div>
        </div>
      </div>
      <div class="is-center" style="height: 30px;">
        <i
          class="fas fa-arrow-down cursor-pointer"
          v-scroll-to="{
            el: '#manageContributorsSection',
            duration: 2000,
            // offset: -50
            // easing: [.6, .80, .30, 1.9],
          }"
        />
      </div>
    </div>
    <div class="bg-card">
      <div class="container">

        <div class="row py-150">
          <div class="col-6">
            <div class="is-vertical-align is-center">
              <img src="@/assets/developer_activity.svg" alt width="80%" />
            </div>
          </div>
          <div class="col-6">
            <div class="is-vertical-align is-center">
              <div class="p-40">
                <h1>See Activity</h1>
                <p>See developer's contributions on your repositories. Goto their page for a daily summary or jump to Activitiy section for full git diff of their contributions.</p>
                <br />
                <a :href="loginUrl">
                  Get Started
                  <i class="fas fa-arrow-right ml-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div class="row py-100" id="manageContributorsSection">
          <div class="col-6">
            <div class="is-vertical-align is-center">
              <div class="p-40">
                <h1>Manage Contributors</h1>
                <p>Easily add or remove collaborators from a repository. Do bulk operations by adding to or removing from multiple repositories, or add an existing collaborator to other repositories.</p>
                <br />
                <a :href="loginUrl">
                  Get Started
                  <i class="fas fa-arrow-right ml-5" />
                </a>
              </div>
            </div>
          </div>
          <div class="col-6">
            <div class="is-vertical-align is-center">
              <img src="@/assets/collaboration.svg" alt width="80%" />
            </div>
          </div>
        </div>

        <div class="row py-150">
          <div class="col-6">
            <div class="is-vertical-align is-center">
              <img src="@/assets/insights.svg" alt width="80%" />
            </div>
          </div>
          <div class="col-6">
            <div class="is-vertical-align is-center">
              <div class="p-40">
                <h1>Get Insights</h1>
                <p>How are your developers doing? How is their coding pattern. Are they maintaining code standards and quality? Know it all here/</p>
                <br />
                <a :href="loginUrl">
                  Get Started
                  <i class="fas fa-arrow-right ml-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Footer />
  </div>
</template>

<script>
import Typed from "typed.js";
import HeroImage from "@/assets/version_control.svg";
import Footer from "@/components/UI/Footer";

export default {
  name: "home",
  components: { Footer },
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
    window.scrollTo(0, 0);
    if (process.env.NODE_ENV === "production") {
      this.loginUrl = "https://aws.gitpro.app/auth/github";
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

.fa-arrow-right {
  animation: 1.5s leftRight infinite;
}

@keyframes upDown {
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-15px);
  }
  100% {
    transform: translateY(0px);
  }
}

@keyframes leftRight {
  0% {
    transform: translateX(-3px);
  }
  50% {
    transform: translateX(5px);
  }
  100% {
    transform: translateX(-3px);
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