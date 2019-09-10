<template>
  <div class="row">
    <Sidebar />
    <div class="col-9-lg pt-70">
      <div class="px-20">
        <h1>Dashboard</h1>
        <div class="row">
          <div class="col-4 p-5">
            <div class="bg-white border-radius-10 p-20">
              <i class="fas fa-code-branch mr-5"></i>
              {{user.total_repositories}}
              Total Repositories
            </div>
          </div>
          <div class="col-4 p-5">
            <div class="bg-white border-radius-10 p-20">
              <i class="fas fa-user mr-5"></i>
              {{user.total_collaborators}}
              Total Collaborators
            </div>
          </div>
          <div class="col-4 p-5">
            <div class="bg-white border-radius-10 p-20">
              <i class="fas fa-user mr-5"></i>
              {{user.total_collaborators}}
              Total Collaborators
            </div>
          </div>
        </div>
        <div class="row mt-30" v-if="collaborators">
          <div class="col-12">
            <h2>Collaborators</h2>
          </div>
          <div class="col-12" v-if="collaboratorLoading">
            <Loader width="80%" height="40px" radius="50px" />
            <br />
            <br />
            <Loader width="60%" height="30px" radius="30px" />
            <br />
            <Loader width="60%" height="30px" radius="30px" />
          </div>
          <div
            class="col-2 p-5 collaborator-avatar-container"
            v-for="collaborator in collaborators"
            :key="collaborator.login"
          >
            <router-link :to="`/collaborators/${collaborator.login}`">
              <div class="is-center">
                <div class="collaborator-avatar position-relative">
                  <div
                    class="bg-white rounded-circle bg-cover"
                    :style="`background-image: url(${collaborator.avatar_url}); width: var(--avatar-dimension); padding-top: var(--avatar-dimension);`"
                  ></div>
                  <div class="overlay rounded-circle"></div>
                </div>
              </div>
              <p class="is-text-center mt-10 text-black">{{collaborator.name}}</p>
              <small class="is-text-center text-dark is-center">{{collaborator.login}}</small>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "@/configAxios";

import Sidebar from "@/components/Sidebar";
import Loader from "@/components/Loader";

export default {
  name: "Dashboard",
  components: { Sidebar, Loader },
  data() {
    return {
      user: {
        total_repositories: 0,
        total_collaborators: 0
      },
      collaborators: [],
      collaboratorLoading: true
    };
  },
  created() {
    axios.get(`/users/${localStorage.login}`).then(res => {
      this.user.total_repositories = res.data.total_repositories;
      this.user.total_collaborators = res.data.total_collaborators;
    });
    axios.get("/collaborators").then(res => {
      this.collaboratorLoading = false;
      this.collaborators = res.data;
    });
  }
};
</script>

<style lang="scss">
</style>