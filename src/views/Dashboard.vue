<template>
  <div class="row">
    <Sidebar :show="true" />
    <SnackBar :show="showSnakeBar" :message="message" type="primary" :hideSnackBar="hideSnackBar" />
    <div class="col-9-lg pt-70">
      <div class="px-20">
        <div class="row">
          <div class="col-6">
            <h1>Dashboard</h1>
          </div>
          <div class="col-6">
            <button class="button clear text-dark px-10" @click="refreshData">
              <i class="fas fa-sync-alt" />&nbsp;
              Refresh Data
            </button>
          </div>
        </div>
        <div class="row" v-if="userLoading">
          <div class="col-4" v-for="i in 3" :key="i">
            <SkeletonLoader width="100%" height="70px" radius="10px" class="my-10" />
          </div>
        </div>
        <div class="row">
          <div class="col-4" v-if="!userLoading">
            <div class="bg-card border-radius-10 p-20">
              <i class="fas fa-code-branch mr-5" />
              {{user.total_repositories}}
              Total Repositories
            </div>
          </div>
          <div class="col-4" v-if="!userLoading">
            <div class="bg-card border-radius-10 p-20">
              <i class="fas fa-user mr-5" />
              {{user.total_collaborators}}
              Total Collaborators
            </div>
          </div>
          <div class="col-4" v-if="!userLoading">
            <div class="bg-card border-radius-10 p-20">
              <i class="fas fa-code mr-5" />
              {{activities.length}}
              Repositories with Activity
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
          <div class="col-12" v-if="collaborators.length">
            <div class="row">
              <div
                class="col-2 p-5"
                v-for="collaborator in collaborators"
                :key="collaborator.login"
              >
                <div class="collaborator-avatar-container">
                  <router-link :to="`/collaborators/${collaborator.login}`">
                    <div class="is-center">
                      <div class="collaborator-avatar position-relative">
                        <div
                          class="bg-card rounded-circle bg-cover"
                          :style="`background-image: url(${collaborator.avatar_url}); width: var(--avatar-dimension); padding-top: var(--avatar-dimension);`"
                        />
                        <div class="overlay rounded-circle" />
                      </div>
                    </div>
                    <p class="text-center mt-10 text-high-contrast">{{collaborator.name}}</p>
                    <small class="text-center text-dark is-center">{{collaborator.login}}</small>
                  </router-link>
                </div>
              </div>
              <div class="col-2 p-5">
                <div class="collaborator-avatar-container">
                  <router-link to="/collaborators/">
                    <div
                      class="bg-light rounded-circle bg-cover is-center"
                      style="width: var(--avatar-dimension); height: var(--avatar-dimension);"
                    >
                      <span class="text-high-contrast">View All</span>
                    </div>
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="row mt-30">
          <div class="col-6">
            <h2>Today's Activities</h2>
          </div>
          <div class="col-6 text-right text-dark pt-10">For Favourite Repositories</div>
        </div>

        <div class="row mb-20" v-if="activitiesLoading">
          <div class="col-4 my-20" v-for="i in 3" :key="i">
            <SkeletonLoader width="100%" height="200px" radius="10px" />
          </div>
        </div>

        <div class="row mb-30">
          <div class="col-12" v-if="!activitiesLoading && activities.length === 0">
            <h3 class="text-center text-dark my-20">
              <br />No Activity
            </h3>
            <p class="text-dark text-center">
              This section only shows already fetched/processed activities. To fetch/process more activities, goto
              <router-link to="activities">Activities</router-link>section.
            </p>
          </div>

          <div class="col-4 my-20" v-for="(activity, index) in activities" :key="index">
            <div class="bg-card border-radius-10 p-20">
              <div class="row">
                <div class="col-6">
                  <i class="fas fa-code-branch mr-5" />
                  {{activity.repository}}
                </div>
                <div class="col-6 text-right">
                  <i class="far fa-user mr-5" />
                  {{activity.author}}
                </div>
              </div>
              <div class="row mt-15">
                <div class="col-12" v-for="commit in activity.contributions" :key="commit.hash">
                  <div class="row">
                    <div class="col-9 text-primary">{{commit.commitMessage}}</div>
                    <div class="col-3 text-right text-dark">{{commit.files.length}} Files</div>
                  </div>
                  <hr />
                </div>
              </div>
              <div class="row mt-5">
                <div class="col-12 text-center">
                  <router-link
                    :to="`/activities/?collaborator=${activity.author}&repository=${activity.repository}&owner=${activity.owner}`"
                    class="text-dark"
                  >View Full Activity</router-link>
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
import moment from "moment";
import parse from "parse-diff";

import axios from "@/configAxios";

import Sidebar from "@/components/Sidebar";
import SkeletonLoader from "@/components/UI/SkeletonLoader";
import SnackBar from "@/components/UI/SnackBar";
import { setTimeout } from "timers";

export default {
  name: "Dashboard",
  components: { Sidebar, SkeletonLoader, SnackBar },
  data() {
    return {
      user: {
        login: localStorage.login,
        total_repositories: 0,
        total_collaborators: 0
      },
      collaborators: [],
      collaboratorLoading: true,
      userLoading: true,
      message: "Welcome to GitPro",
      showSnakeBar: false,
      favourite_repositories: [],

      activities: [],
      activitiesLoading: true
    };
  },
  async created() {
    axios.get(`/users/${localStorage.login}?stats=true`).then(res => {
      this.userLoading = false;
      this.favourite_repositories = res.data.favourite_repositories;
      this.user.total_repositories = res.data.total_repositories;
      this.user.total_collaborators = res.data.total_collaborators;

      if (this.favourite_repositories.length === 0) {
        this.activitiesLoading = false;
      } else {
        let before = new Date();
        let after = new Date();
        after.setDate(after.getDate() - 1);

        let activityFetchPromises = [];
        this.favourite_repositories.forEach(repository => {
          let params = {
            repository: repository.name,
            after: moment(after).format("YYYY-MM-DD"),
            before: moment(before).format("YYYY-MM-DD")
          };
          activityFetchPromises.push(axios.get("/activities", { params }));
        });

        Promise.all(activityFetchPromises).then(responses => {
          this.activitiesLoading = false;
          responses = responses.map(res => res.data).filter(res => res.length);
          let activities = [];
          responses.forEach(res => {
            activities = [...activities, ...res];
          });

          activities = activities.map(activity => {
            activity.contributions = activity.contributions.map(commit => {
              commit["files"] = parse(commit.diff);
              return commit;
            });
            return activity;
          });

          this.activities = activities;
        });
      }
    });
    axios.get("/collaborators").then(res => {
      this.collaboratorLoading = false;
      this.collaborators = res.data.filter((collaborator, index) => index < 5);
    });

    setTimeout(() => (this.showSnakeBar = true), 2000);
  },
  methods: {
    hideSnackBar() {
      this.showSnakeBar = false;
    },
    refreshData() {
      axios.get("/fetch/repositories/").then(res => {
        this.$message.success({
          message: res.data.message,
          position: "bottom-right",
          showClose: true
        });
      });
    }
  }
};
</script>

<style lang="scss">
</style>