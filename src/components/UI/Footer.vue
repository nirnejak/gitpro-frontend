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
            <router-link to="/faq" class="text-dark">FAQ</router-link>
          </div>
          <br />
          <div>
            <a href="#" class="text-dark">Submit Feedback</a>
          </div>
          <br />
          <div>
            <a href="#" class="text-dark">Request a Feature</a>
          </div>
        </div>
        <div class="col-3">
          <div>
            <a href="#" class="text-dark">&copy; Inkoop</a>
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