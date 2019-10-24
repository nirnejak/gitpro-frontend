<template>
  <footer>
    <div class="container">
      <div class="row py-70 mt-30">
        <div class="col-6">
          <div class="text-center py-30">
            <router-link to="/" class="text-high-contrast">
              <i class="fab fa-github fa-4x" />
              <h3>GitPro</h3>
            </router-link>
          </div>
        </div>
        <div class="col-3">
          <div>
            <strong>Quick Links</strong>
          </div>
          <br />
          <div>
            <router-link to="/faq" class="text-dark">FAQ</router-link>
          </div>
          <br />
          <div>
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSe24lZ1ykY24mTfog59DlbOOFtrTTeaYoT0PNQ3cxmvl_o42w/viewform"
              class="text-dark"
            >Submit Feedback</a>
          </div>
          <br />
          <div>
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSe24lZ1ykY24mTfog59DlbOOFtrTTeaYoT0PNQ3cxmvl_o42w/viewform"
              class="text-dark"
            >Request a Feature</a>
          </div>
        </div>
        <div class="col-3">
          <div>
            <strong>Contact</strong>
          </div>
          <br />
          <div>products@inkoop.io</div>
          <br />
          <div class="text-dark">
            Developed by
            <a href="https://inkoop.io" target="_blank">Inkoop.io</a>
          </div>
          <br />
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