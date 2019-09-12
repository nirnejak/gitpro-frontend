<template>
  <div class="row">
    <Sidebar />
    <SnackBar :show="showMessage" :message="message" type="primary" />
    <div class="col-9-lg pt-70">
      <div class="px-20">
        <h1>Dashboard</h1>
        <div class="row" v-if="userLoading">
          <div class="col-4" v-for="i in 3" :key="i">
            <SkeletonLoader width="100%" height="70px" radius="10px" class="my-10" />
          </div>
        </div>
        <div class="row">
          <div class="col-4 p-5" v-if="!userLoading">
            <div class="bg-white border-radius-10 p-20">
              <i class="fas fa-code-branch mr-5"></i>
              {{user.total_repositories}}
              Total Repositories
            </div>
          </div>
          <div class="col-4 p-5" v-if="!userLoading">
            <div class="bg-white border-radius-10 p-20">
              <i class="fas fa-user mr-5"></i>
              {{user.total_collaborators}}
              Total Collaborators
            </div>
          </div>
          <div class="col-4 p-5" v-if="!userLoading">
            <div class="bg-white border-radius-10 p-20">
              <i class="fas fa-user mr-5"></i>
              {{user.total_collaborators}}
              Total Collaborators
            </div>
          </div>
        </div>
        <div class="row mt-30">
          <div class="col-12">
            <h2>Collaborators</h2>
          </div>
          <div class="col-12" v-if="collaboratorLoading">
            <div class="row">
              <div class="col-2 p-5" v-for="i in 6" :key="i">
                <div class="is-center">
                  <SkeletonLoader width="150px" height="150px" radius="50%" />
                </div>
              </div>
            </div>
          </div>
          <div class="col-12" v-if="collaborators">
            <div class="row">
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
    </div>
  </div>
</template>

<script>
import axios from "@/configAxios";

import Sidebar from "@/components/Sidebar";
import SkeletonLoader from "@/components/SkeletonLoader";
import SnackBar from "@/components/SnackBar";
import { setTimeout } from "timers";

export default {
  name: "Dashboard",
  components: { Sidebar, SkeletonLoader, SnackBar },
  data() {
    return {
      user: {
        total_repositories: 0,
        total_collaborators: 0
      },
      collaborators: [],
      collaboratorLoading: true,
      userLoading: true,
      message: "",
      showMessage: false
    };
  },
  created() {
    axios.get(`/users/${localStorage.login}?stats=true`).then(res => {
      this.userLoading = false;
      this.user.total_repositories = res.data.total_repositories;
      this.user.total_collaborators = res.data.total_collaborators;
    });
    axios.get("/collaborators").then(res => {
      this.collaboratorLoading = false;
      this.collaborators = res.data;
    });

    setTimeout(() => {
      this.message = "Welcome to GitSupreme";
      this.showMessage = true;
    }, 2000);
  }
};
</script>

<style lang="scss">
</style>