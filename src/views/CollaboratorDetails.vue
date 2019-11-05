<template>
  <div class="columns">
    <Sidebar :show="true" />
    <Modal :showModal="showModal" :hideModal="hideModal" modalTitle="Add to Repository">
      <AddToRepos
        :collaborator="collaborator"
        :hideModal="hideModal"
        :alreadyCollaborator="collaborator.repositories"
      />
    </Modal>

    <div class="column is-9 pt-70 h-100vh mb-0" style="overflow-y: auto;">
      <div class="px-20">
        <div class="columns">
          <div class="column is-2">
            <SkeletonLoader
              width="100%"
              height="150px"
              radius="10px"
              v-if="collaboratorDetailsLoading"
            />
            <div
              class="box border-radius-10 bg-cover w-100"
              :style="`background-image: url(${collaborator.avatar_url}); padding-top: 100%;`"
              v-else
            />
          </div>
          <div class="column is-6 is-vertical-align">
            <div class="ml-10">
              <h1 class="title is-size-2 m-0">{{collaborator.name}}</h1>
              <SkeletonLoader
                width="100%"
                height="30px"
                radius="5px"
                v-if="collaboratorDetailsLoading"
              />
              <h3 class="is-size-4 m-0 text-dark">{{$route.params.login}}</h3>
            </div>
          </div>
          <div class="column is-4 has-text-right">
            <p href="#" class="text-error cursor-pointer pr-20" @click="removeCollaborator">
              <i class="fas fa-user-times" />&nbsp;
              Remove Collaborator
            </p>
            <br />
            <a :href="`http://github.com/${$route.params.login}`" class="pr-20" target="_blank">
              <i class="fas fa-external-link-alt" />&nbsp;
              View on GitHub
            </a>
          </div>
        </div>
        <div class="columns mt-30">
          <div class="column is-4">
            <h2 class="title is-size-3">Repositories</h2>
          </div>
          <div class="column is-8 has-text-right">
            <button
              type="submit"
              class="button is-light is-danger mx-10"
              v-if="selectedRepositories.length > 0"
              @click="revokeAccess()"
            >
              <span class="icon is-small">
                <i class="fas fa-times" />
              </span>
              <span>Revoke Access</span>
            </button>
            <button class="button is-success is-light mx-10" @click="refreshData">
              <span class="icon is-small">
                <i class="fas fa-sync-alt" />
              </span>
              <span>Refresh Data</span>
            </button>
            <button type="submit" class="button is-link is-light mx-10" @click="showModal = true">
              <span class="icon is-small">
                <i class="fas fa-plus" />
              </span>
              <span>Add to Repos</span>
            </button>
          </div>
        </div>

        <div class="columns" v-if="collaboratorDetailsLoading">
          <div class="column is-4" v-for="i in 4" :key="i">
            <SkeletonLoader width="100%" height="70px" radius="5px" />
          </div>
        </div>

        <div class="columns" v-if="collaborator">
          <div
            class="column is-4"
            v-for="repository in myRepositories"
            :key="`${repository.owner}/${repository.name}`"
          >
            <input
              type="checkbox"
              :name="repository.name"
              :id="repository.name"
              class="d-none"
              @change="addRemoveRepo(repository.name)"
            />
            <label :for="repository.name" class="repo-checkbox">
              <div class="box border-radius-5 p-20">
                <div class="columns">
                  <div class="column is-6 text-overflow-ellipsis">
                    <i class="fas fa-check-circle text-light mt-5 mr-10" />
                    <!-- <i class="fas fa-code-branch" /> -->
                    {{repository.name}}
                  </div>
                  <div class="column is-6 has-text-right-tablet">
                    <router-link
                      :to="`/activities/?collaborator=${collaborator.login}&repository=${repository.name}&owner=${repository.owner}`"
                      class="text-primary"
                    >View Activity</router-link>
                  </div>
                </div>
              </div>
            </label>
          </div>
          <div class="column" v-if="myRepositories.length === 0 && !collaboratorDetailsLoading">
            <p class="has-text-centered">
              You haven't added {{collaborator.name || collaborator.login}} to any of your repositories
              <br />
              <button
                type="submit"
                class="button is-primary is-light my-10"
                @click="showModal = true"
              >Add to Repos</button>
            </p>
          </div>
        </div>

        <div class="columns mt-30">
          <div class="column is-6">
            <h2 class="title is-size-3">Common Repositories</h2>
          </div>
          <div class="column is-6 has-text-right">
            <p class="text-dark">
              Repositories shared with you and
              <strong>{{$route.params.login}}</strong>
            </p>
          </div>
        </div>

        <div class="columns" v-if="collaboratorDetailsLoading">
          <div class="column is-4" v-for="i in 3" :key="i">
            <SkeletonLoader width="100%" height="70px" radius="5px" />
          </div>
        </div>

        <div class="columns" v-if="collaborator">
          <div
            class="column is-4"
            v-for="repository in commonRepositories"
            :key="`${repository.owner}/${repository.name}`"
          >
            <input type="checkbox" :name="repository.name" :id="repository.name" class="d-none" />
            <label :for="repository.name" class="repo-checkbox"></label>
            <div class="box border-radius-5 p-20">
              <div class="columns">
                <div class="column is-10 text-overflow-ellipsis">
                  <i class="fas fa-code-branch" />
                  {{repository.owner}}/{{repository.name}}
                </div>
                <div class="column is-2">
                  <router-link
                    :to="`/activities/?collaborator=${collaborator.login}&repository=${repository.name}&owner=${repository.owner}`"
                    title="View Activity"
                  >
                    <i class="fas fa-eye pull-right text-high-contrast mt-5" />
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="column" v-if="commonRepositories.length === 0 && !collaboratorDetailsLoading">
          <p class="has-text-centered">
            There are no common repositories between you and {{collaborator.name || collaborator.login}}.
            <br />
            <button
              type="submit"
              class="button is-primary is-light my-10"
              @click="showModal = true"
            >Add to Repos</button>
          </p>
        </div>

        <div class="columns mt-30">
          <div class="column is-4">
            <h2 class="title is-size-3">Today's Activity</h2>
          </div>
          <div class="column is-8 has-text-right">
            <p class="text-dark">
              <i class="fas fa-sm fa-star" />
              Showing for Favourite Repositories only
            </p>
          </div>
        </div>

        <div class="columns" v-if="activitiesLoading">
          <div class="column">
            <SkeletonLoader width="100%" height="300px" radius="5px" class="my-20" />
          </div>
        </div>

        <div class="columns mb-30">
          <div class="column" v-if="!activitiesLoading && activityStats.length === 0">
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
        </div>

        <div class="columns">
          <div class="column">
            <div
              class="box border-radius-5 p-20 my-20"
              v-for="activityStat in activityStats"
              :key="activityStat.repository"
            >
              <div class="columns">
                <div class="column is-8">
                  <h4 class="is-size-5">{{activityStat.repository}}</h4>
                </div>
                <div class="column is-4 has-text-right-tablet pt-10">
                  <router-link
                    :to="`/activities/?collaborator=${collaborator.login}&repository=${activityStat.repository}&owner=${activityStat.owner}`"
                  >View Full Activity</router-link>
                </div>
              </div>
              <div class="my-20" v-if="activityStat.contributions.length === 0">
                <h4 class="is-size-5 has-text-centered text-dark">No Contributions Today</h4>
              </div>
              <div
                v-for="(commit, index) in activityStat.contributions"
                :key="commit.hash"
                class="my-10"
              >
                <hr v-if="index !== 0" />
                <div class="columns my-10">
                  <div class="column is-5 text-primary">{{commit.commitMessage}}</div>
                  <div class="column is-2 has-text-centered">
                    <i class="fas fa-code-branch mr-5" />
                    {{commit.branch}}
                  </div>
                  <div class="column is-5 has-text-right-tablet">
                    <a
                      :href="`http://github.com/${user.login}/${activityStat.repository}/commit/${commit.hash}`"
                      class="text-high-contrast"
                      target="_blank"
                      title="View Commit on GitHub"
                    >
                      {{commit.hash}}
                      <i class="fas fa-sm fa-external-link-alt" />
                    </a>
                  </div>
                </div>
                <div
                  class="columns text-dark my-5"
                  v-for="(fileStat, index) in commit.files"
                  :key="index"
                >
                  <div class="column is-10">
                    <p>
                      {{fileStat.from}}
                      <i class="fas fa-long-arcolumns-alt-right mx-10" />
                      {{fileStat.to}}
                    </p>
                  </div>
                  <div class="column is-2 has-text-centered">
                    <span
                      class="tag text-success border-radius-5"
                      title="Additions"
                    >+ {{fileStat.additions}}</span>
                    <span
                      class="tag text-error border-radius-5"
                      title="Deletions"
                    >- {{fileStat.deletions}}</span>
                  </div>
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
import { Diff2Html } from "diff2html";
import "diff2html/dist/diff2html.min.css";

import axios from "@/configAxios";

import Sidebar from "@/components/Sidebar";
import SkeletonLoader from "@/components/UI/SkeletonLoader";
import Modal from "@/components/UI/Modal";
import AddToRepos from "@/components/AddToRepos";

export default {
  name: "CollaboratorDetails",
  components: { Sidebar, SkeletonLoader, Modal, AddToRepos },
  data() {
    return {
      user: { login: localStorage.login },
      collaborator: {},
      collaboratorDetailsLoading: true,
      myRepositories: [],
      selectedRepositories: [],
      commonRepositories: [],
      showModal: false,
      activityStats: [],
      activitiesLoading: true
    };
  },
  created() {
    axios.get(`/collaborators/${this.$route.params.login}`).then(res => {
      this.collaboratorDetailsLoading = false;
      this.collaborator = res.data;

      this.myRepositories = this.collaborator.repositories.filter(
        repo => repo.owner === this.user.login
      );
      this.commonRepositories = this.collaborator.repositories.filter(
        repo => repo.owner !== this.user.login
      );

      if (this.collaborator.repositories.length > 0) {
        let before = new Date();
        let after = new Date();
        after.setDate(after.getDate() - 1);

        let promises = [];
        this.collaborator.repositories
          .filter(repo => repo.isFavourite)
          .forEach(repository => {
            let params = {
              repository: repository.name,
              owner: repository.owner,
              after: moment(after).format("YYYY-MM-DD"),
              before: moment(before).format("YYYY-MM-DD")
            };
            promises.push(
              axios.get(`/activities/${this.$route.params.login}`, { params })
            );
          });
        Promise.all(promises).then(response => {
          this.activitiesLoading = false;
          let activities = response.map(res => res.data);

          this.activityStats = activities.map(activity => {
            let contributions = [];
            activity.contributions.forEach(commit => {
              let contribution = {
                commitMessage: commit.commitMessage,
                hash: commit.hash,
                branch: commit.branch,
                files: parse(commit.diff)
              };
              contributions.push(contribution);
            });
            return {
              repository: activity.repository,
              owner: activity.owner,
              contributions
            };
          });
        });
      }
    });
  },
  methods: {
    prettyHtml(diff) {
      return Diff2Html.getPrettyHtml(diff, {
        inputFormat: "diff",
        showFiles: true,
        matching: "lines",
        outputFormat: "side-by-side"
      });
    },
    revokeAccess() {
      let confirm = window.confirm(
        "Are you sure you want to remove the collaborator from these repos?"
      );
      if (confirm) {
        this.selectedRepositories.forEach((repo, index) => {
          axios
            .put(`/collaborators/${this.collaborator.login}?repo=${repo}`)
            .then(res => {
              if (index === this.selectedRepositories.length - 1) {
                this.collaborator.repositories = this.collaborator.repositories.filter(
                  repo => !this.selectedRepositories.includes(repo.name)
                );
                this.selectedRepositories = [];
                this.$message.success({
                  message: res.data.message,
                  position: "bottom-right",
                  showClose: true
                });
              }
            })
            .catch(err => console.log(err));
        });
      }
    },
    addRemoveRepo(repoName) {
      if (this.selectedRepositories.includes(repoName)) {
        this.selectedRepositories = this.selectedRepositories.filter(
          repo => repo !== repoName
        );
      } else {
        this.selectedRepositories.push(repoName);
      }
    },
    hideModal() {
      this.showModal = false;
    },
    refreshData() {
      axios.get("/fetch/repositories/").then(res => {
        this.$message.success({
          message: res.data.message,
          position: "bottom-right",
          showClose: true
        });
      });
    },
    removeCollaborator() {
      let confirm = window.confirm(
        "Removing collaborator will revoke his/her access from all the repositories. Are you sure you want to remove collaborator?"
      );
      if (confirm) {
        axios.delete(`/collaborators/${this.collaborator.login}`).then(res => {
          this.$message.success({
            message: res.data.message,
            position: "bottom-right",
            showClose: true
          });
          this.$router.push("/collaborators");
        });
      }
    }
  }
};
</script>

<style lang="scss">
label.repo-checkbox {
  cursor: pointer;
  & > div {
    border: white 1px solid;
  }
}

input[type="checkbox"]:checked + label.repo-checkbox > div {
  border: var(--color-primary) 1px solid;
  & > div > div > i.fa-check-circle {
    color: var(--color-primary) !important;
  }
}

.activity-container {
  td {
    padding: 0.1rem 0.4rem;
  }
}
</style>