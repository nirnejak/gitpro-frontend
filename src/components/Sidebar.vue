<template>
  <div class="col-3 bg-card h-100vh mb-0" v-if="show">
    <div class="pr-50 pl-50 pt-50 pb-10 is-horizontal-align">
      <div
        class="bg-card rounded-circle bg-cover w-70"
        :style="`background-image: url(${user.avatar_url}); padding-top: 70%;`"
      />
    </div>
    <div>
      <h4 class="is-center mb-0">{{user.name}}</h4>
      <p class="text-dark is-center">{{user.login}}</p>
    </div>
    <div class="sidebar-links p-50" style="padding-top: 30px !important;">
      <router-link to="/dashboard" class="sidebar-link" active-class="active">
        <i class="fas fa-chart-line" />
        Dashboard
      </router-link>
      <!-- <router-link to="/teams" class="sidebar-link" active-class="active">
        <i class="fas fa-users" />
        Teams
      </router-link>-->
      <router-link to="/collaborators" class="sidebar-link" active-class="active">
        <i class="fas fa-user" />
        Collaborators
      </router-link>
      <router-link to="/repositories" class="sidebar-link" active-class="active">
        <i class="fas fa-code-branch" />
        Repositories
      </router-link>
      <router-link to="/activities" class="sidebar-link" active-class="active">
        <i class="fas fa-columns" />
        Activities
      </router-link>
      <router-link to="/settings" class="sidebar-link" active-class="active">
        <i class="fas fa-cog" />
        Settings
      </router-link>
      <router-link to="/logout" class="sidebar-link" active-class="active">
        <i class="fas fa-sign-out-alt" />
        Logout
      </router-link>
    </div>
    <div class="sidebar-footer">
      <div class="row pb-10">
        <div class="col-3 is-center">
          <small class="text-dark">Developed by <a href="https://inkoop.io" target="_blank">Inkoop.io</a></small>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "@/configAxios";

export default {
  name: "Sidebar",
  props: ["show"],
  data() {
    return {
      user: {
        name: localStorage.name,
        login: localStorage.login,
        avatar_url: localStorage.avatar_url
      }
    };
  },
  async created() {
    if (!localStorage.name || !localStorage.login || !localStorage.avatar_url) {
      axios
        .get(`/users/${localStorage.login}`)
        .then(res => {
          this.user = res.data;
          localStorage.name = res.data.name;
          localStorage.login = res.data.login;
          localStorage.avatar_url = res.data.avatar_url;
        })
        .catch(error => error);
    }
  },
  methods: {}
};
</script>

<style lang="scss">
.sidebar-links {
  .sidebar-link {
    display: block;
    width: 100%;
    border-radius: 5px;

    margin: 5px 0px;
    padding: 7px 15px;

    background: transparent;
    color: var(--color-primary);
    &:hover {
      transition: 0.3s ease;
      background: var(--sidebar-hover);
    }
    i {
      margin-right: 5px;
    }
  }
  .sidebar-link.active {
    background: var(--color-primary);
    color: white;
  }
}

.sidebar-footer {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
}
</style>