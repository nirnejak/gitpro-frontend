<template>
  <nav
    class="navbar"
    :class="{'is-fixed-top': ['faq'].includes($route.name)}"
    role="navigation"
    aria-label="main navigation"
  >
    <div class="navbar-brand">
      <router-link class="navbar-item" to="/">
        <img src="@/assets/logo_no_border.png" height="50" />
        <strong class="ml-10">GitPro</strong>
      </router-link>

      <a
        role="button"
        class="navbar-burger burger"
        :class="{'is-active': isActive}"
        @click="isActive = !isActive"
        aria-label="menu"
        aria-expanded="false"
        data-target="navbarGitPro"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="navbarGitPro" class="navbar-menu" :class="{'is-active': isActive}">
      <div class="navbar-start">
        <router-link to="/" class="navbar-item">Home</router-link>

        <router-link to="/faq" class="navbar-item">FAQ</router-link>

        <div class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link">More</a>

          <div class="navbar-dropdown">
            <a class="navbar-item">About</a>
            <a class="navbar-item">Contact</a>
            <hr class="navbar-divider" />
            <a
              class="navbar-item"
              href="https://docs.google.com/forms/d/e/1FAIpQLSe24lZ1ykY24mTfog59DlbOOFtrTTeaYoT0PNQ3cxmvl_o42w/viewform"
            >Submit Feedback</a>
            <a
              class="navbar-item"
              href="https://docs.google.com/forms/d/e/1FAIpQLSe24lZ1ykY24mTfog59DlbOOFtrTTeaYoT0PNQ3cxmvl_o42w/viewform"
            >Report an issue</a>
            <a
              class="navbar-item"
              href="https://docs.google.com/forms/d/e/1FAIpQLSe24lZ1ykY24mTfog59DlbOOFtrTTeaYoT0PNQ3cxmvl_o42w/viewform"
            >Request a Feature</a>
          </div>
        </div>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <router-link to="/login" class="button is-primary">
              <strong>Register</strong>
            </router-link>
            <router-link to="/login" class="button is-light">Log in</router-link>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {
      isActive: false
    };
  }
};
</script>