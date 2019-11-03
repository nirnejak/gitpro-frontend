<template>
  <div class="columns">
    <Sidebar :show="true" />
    <SnackBar :show="showSnakeBar" :message="message" type="primary" :hideSnackBar="hideSnackBar" />
    <div class="column is-9 pt-70">
      <div class="px-20">
        <div class="columns">
          <div class="column is-6">
            <h1 class="is-size-2">Dashboard</h1>
          </div>
          <div class="column is-6 has-text-right-tablet">
            <button class="button is-outlined text-dark px-10" @click="refreshData">
              <i class="fas fa-sync-alt" />&nbsp;
              Refresh Data
            </button>
          </div>
        </div>
        <div class="columns" v-if="userLoading">
          <div class="column is-4" v-for="i in 3" :key="i">
            <div class="m-10">
              <SkeletonLoader width="100%" height="70px" radius="10px" />
            </div>
          </div>
        </div>
        <div class="columns">
          <div class="column is-4" v-if="!userLoading">
            <router-link to="/repositories" class="bg-card border-radius-10 p-20 m-10">
              <i class="fas fa-code-branch mr-5" />
              {{user.total_repositories}}
              Total Repositories
            </router-link>
          </div>
          <div class="column is-4" v-if="!userLoading">
            <router-link to="/collaborators" class="bg-card border-radius-10 p-20 m-10">
              <i class="fas fa-user mr-5" />
              {{user.total_collaborators}}
              Total Collaborators
            </router-link>
          </div>
          <div class="column is-4" v-if="!userLoading">
            <router-link to="/activities" class="bg-card border-radius-10 p-20 m-10">
              <i class="fas fa-code mr-5" />
              {{activities.length}}
              Repositories with Activity
            </router-link>
          </div>
        </div>
        <div class="columns mt-30">
          <div class="column">
            <h2 class="is-size-3">Collaborators</h2>
          </div>
          <div class="column" v-if="collaboratorLoading">
            <div class="columns">
              <div class="column is-2 p-5" v-for="i in 6" :key="i">
                <div class="is-center">
                  <SkeletonLoader width="150px" height="150px" radius="50%" />
                </div>
              </div>
            </div>
          </div>
          <div class="column" v-if="collaborators.length">
            <div class="columns">
              <div
                class="column is-2 p-5"
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
                    <p class="has-text-centered mt-10 text-high-contrast">{{collaborator.name}}</p>
                    <small class="has-text-centered text-dark is-center">{{collaborator.login}}</small>
                  </router-link>
                </div>
              </div>
              <div class="column is-2 p-5">
                <div class="collaborator-avatar-container">
                  <router-link to="/collaborators/">
                    <div class="is-center">
                      <div
                        class="bg-card rounded-circle bg-cover"
                        style="width: var(--avatar-dimension); height: var(--avatar-dimension);"
                      >
                        <span class="text-high-contrast is-center pt-60">View All</span>
                      </div>
                    </div>
                  </router-link>
                </div>
              </div>
            </div>
          </div>
          <div class="column" v-if="!collaboratorLoading && !collaborators.length">
            <div class="has-text-centered">
              <p>No Collaborators</p>
            </div>
          </div>
        </div>

        <div class="columns mt-30">
          <div class="column is-6">
            <h2 class="mb-0">Today's Activities</h2>
            <div class="text-dark">
              <small>(in Favourite Repositories)</small>
            </div>
          </div>
        </div>

        <div class="columns mb-20" v-if="activitiesLoading">
          <div class="column is-4 my-20" v-for="i in 3" :key="i">
            <SkeletonLoader width="100%" height="200px" radius="10px" />
          </div>
        </div>

        <div class="columns mb-30">
          <div class="column" v-if="!activitiesLoading && activities.length === 0">
            <h3 class="is-size-4 has-text-centered text-dark my-20">
              <br />No Activity
            </h3>
            <br />
            <p class="has-text-centered">
              This section only shows already fetched/processed activities on favourite repositories.
              <br />To fetch/process more activities, goto
              <router-link to="activities">Activities</router-link>&nbsp;section or
              <router-link to="repositories">Add Favourite Repositories</router-link>
            </p>
          </div>

          <div class="column is-4" v-for="(activity, index) in activities" :key="index">
            <div class="bg-card border-radius-10 p-20 m-10">
              <div class="columns">
                <div class="column is-6">
                  <i class="fas fa-code-branch mr-5" />
                  {{activity.repository}}
                </div>
                <div class="column is-6 has-text-right-tablet">
                  <i class="far fa-user mr-5" />
                  {{activity.author}}
                </div>
              </div>
              <div class="columns mt-15">
                <div class="column" v-for="commit in activity.contributions" :key="commit.hash">
                  <div class="columns">
                    <div class="column is-9 text-primary">{{commit.commitMessage}}</div>
                    <div class="column is-3 has-text-right-tablet text-dark">{{commit.files.length}} Files</div>
                  </div>
                  <hr />
                </div>
              </div>
              <div class="columns mt-5">
                <div class="column has-text-centered">
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
      activitiesLoading: true,

      refreshCount: 0
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
      this.refreshCount += 1;
      if (this.refreshCount > 1) {
        let confirm = window.confirm(
          "Refreshing data will count against your API Quota. Do you still want to continue?"
        );
        if (!confirm) return;
      }
      axios.get("/fetch/repositories/").then(res => {
        this.$message.success({
          message: res.data.message,
          position: "bottom-right",
          showClose: true
        });
        setTimeout(() => {
          this.$router.go();
        }, 5000);
      });
    }
  }
};
</script>

<style lang="scss">
</style>