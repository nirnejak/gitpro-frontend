<template>
  <footer>
    <div class="container">
      <div class="columns is-centered py-70 mt-30">
        <div class="column is-5">
          <div class="has-text-centered">
            <router-link to="/" class="text-high-contrast">
              <img src="@/assets/logo.svg" alt="GitPro Logo" width="30%" />
              <h3 class="is-size-5 m-0">GitPro</h3>
            </router-link>
          </div>
        </div>
        <div class="column is-3">
          <div>
            <div>
              <strong>Quick Links</strong>
            </div>
            <br />
            <div>
              <router-link to="/faq" class="has-text-dark">FAQ</router-link>
            </div>
            <br />
            <div>
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSe24lZ1ykY24mTfog59DlbOOFtrTTeaYoT0PNQ3cxmvl_o42w/viewform"
                class="has-text-dark"
              >Submit Feedback</a>
            </div>
            <br />
            <div>
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSe24lZ1ykY24mTfog59DlbOOFtrTTeaYoT0PNQ3cxmvl_o42w/viewform"
                class="has-text-dark"
              >Request a Feature</a>
            </div>
          </div>
        </div>
        <div class="column is-3 is-vertical-align">
          <div>
            <div>
              <strong>Contact</strong>
            </div>
            <br />
            <div>products@inkoop.io</div>
            <div class="has-text-dark">
              <a href="https://inkoop.io" target="_blank">https://inkoop.io</a>
            </div>
            <br />
            <div>
              <a
                href="https://www.producthunt.com/posts/gitpro?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-gitpro"
                target="_blank"
              >
                <img
                  src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=172272&theme=dark"
                  alt="GitPro - Github's developer activity tracking simplified | Product Hunt Embed"
                  style="width: 250px; height: 54px;"
                  width="250px"
                  height="54px"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "Footer"
};
</script>

<style>
</style>