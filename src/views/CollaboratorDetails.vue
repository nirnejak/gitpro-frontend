<template>
  <div class="row">
    <Sidebar :show="true" />
    <Modal :showModal="showModal" :hideModal="hideModal" modalTitle="Add to Repository">
      <AddToRepos
        :collaborator="collaborator"
        :hideModal="hideModal"
        :alreadyCollaborator="collaborator.repositories"
      />
    </Modal>

    <div class="col-9-lg pt-70 h-100vh mb-0" style="overflow-y: auto;">
      <div class="px-20">
        <div class="row">
          <div class="col-2-lg">
            <SkeletonLoader
              width="100%"
              height="150px"
              radius="10px"
              v-if="collaboratorDetailsLoading"
            />
            <div
              class="bg-card border-radius-10 bg-cover w-100"
              :style="`background-image: url(${collaborator.avatar_url}); padding-top: 100%;`"
              v-else
            />
          </div>
          <div class="col-6-lg is-vertical-align">
            <div class="ml-10">
              <h1 class="m-0">{{collaborator.name}}</h1>
              <SkeletonLoader
                width="100%"
                height="30px"
                radius="5px"
                v-if="collaboratorDetailsLoading"
              />
              <h3 class="m-0 text-dark">{{$route.params.login}}</h3>
            </div>
          </div>
          <div class="col-4-lg is-vertical-align is-right">
            <div>
              <span href="#" class="text-error cursor-pointer pr-20" @click="removeCollaborator">
                <i class="fas fa-user-times" />&nbsp;
                Remove Collaborator
              </span>
              <br />
              <br />
              <a :href="`http://github.com/${$route.params.login}`" class="pr-20" target="_blank">
                <i class="fas fa-external-link-alt" />&nbsp;
                View on GitHub
              </a>
            </div>
          </div>
        </div>
        <div class="row mt-30">
          <div class="col-4-lg">
            <h2>Repositories</h2>
          </div>
          <div class="col-8-lg is-right">
            <button
              type="submit"
              class="button clear text-error px-10"
              v-if="selectedRepositories.length > 0"
              @click="revokeAccess()"
            >
              <i class="fas fa-times" />&nbsp;
              Revoke Access
            </button>
            <button class="button clear text-dark px-10" @click="refreshData">
              <i class="fas fa-sync-alt" />&nbsp;
              Refersh Data
            </button>
            <button type="submit" class="button clear px-10" @click="showModal = true">
              <i class="fas fa-plus" />&nbsp;
              Add to Repos
            </button>
          </div>
        </div>

        <div class="row" v-if="collaboratorDetailsLoading">
          <div class="col-3" v-for="i in 4" :key="i">
            <SkeletonLoader width="100%" height="70px" radius="5px" class="my-10" />
          </div>
        </div>

        <div class="row" v-if="collaborator">
          <div class="col-3" v-for="repository in collaborator.repositories" :key="repository.name">
            <input
              type="checkbox"
              :name="repository.name"
              :id="repository.name"
              class="d-none"
              @change="addRemoveRepo(repository.name)"
            />
            <label :for="repository.name" class="repo-checkbox my-10">
              <div class="bg-card p-20" style="border-top-right-radius: 5px; border-top-left-radius: 5px;">
                <div class="row">
                  <div class="col-10 text-overflow-ellipsis">
                    <i class="fas fa-code-branch" />
                    {{repository.name}}
                  </div>
                  <div class="col-2">
                    <i class="fas fa-check-circle text-light pull-right mt-5" />
                  </div>
                </div>
              </div>
            </label>
            <div class="bg-primary text-white text-center" style="border-bottom-right-radius: 5px; border-bottom-left-radius: 5px; padding: 2px 0px;">
              <router-link :to="`/activities/?collaborator=${collaborator.login}&repository=${repository.name}`">
                <small class="text-center text-white is-center">View Activity</small>
              </router-link>
            </div>
          </div>
        </div>

        <div class="row mt-30">
          <div class="col-4-lg">
            <h2>Today's Activity</h2>
          </div>
          <div class="col-8-lg is-right">
            <p class="text-dark">
              <i class="fas fa-sm fa-star"/>
              Showing for Favourite Repositories only
            </p>
            <!-- <p class="text-dark">{{ Date() | formatDate }}</p> -->
          </div>
        </div>

        <div class="row" v-if="activitiesLoading">
          <div class="col-12">
            <SkeletonLoader width="100%" height="300px" radius="5px" class="my-20" />
          </div>
        </div>

        <div class="row">
          <div class="col-12">
            <div
              class="bg-card border-radius-5 p-20 my-20"
              v-for="activityStat in activityStats"
              :key="activityStat.repository"
            >
              <div class="row">
                <div class="col-8">
                  <h4>{{activityStat.repository}}</h4>
                </div>
                <div class="col-4 text-right pt-10">
                  <router-link
                    :to="`/activities/?collaborator=${collaborator.login}&repository=${activityStat.repository}`"
                  >View Full Activity</router-link>
                </div>
              </div>
              <div
                v-for="(commit, index) in activityStat.contributions"
                :key="commit.hash"
                class="my-10"
              >
                <hr v-if="index !== 0" />
                <div class="row my-10">
                  <div class="col-6 text-primary">{{commit.commitMessage}}</div>
                  <div class="col-6 text-right">
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
                  class="row text-dark my-5"
                  v-for="(fileStat, index) in commit.files"
                  :key="index"
                >
                  <div class="col-10-lg">
                    <p>
                      {{fileStat.from}}
                      <i class="fas fa-long-arrow-alt-right mx-10" />
                      {{fileStat.to}}
                    </p>
                  </div>
                  <div class="col-2-lg text-center">
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
      selectedRepositories: [],
      showModal: false,
      activityStats: [],
      activitiesLoading: true
    };
  },
  created() {
    axios.get(`/collaborators/${this.$route.params.login}`).then(res => {
      this.collaboratorDetailsLoading = false;
      this.collaborator = res.data;
      if (this.collaborator.repositories.length > 0) {
        let before = new Date();
        let after = new Date();
        after.setDate(after.getDate() - 1);

        let promises = [];
        this.collaborator.repositories.filter(repo => repo.isFavourite).forEach(repository => {
          let params = {
            repository: repository.name,
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
                files: parse(commit.diff)
              };
              contributions.push(contribution);
            });
            return {
              repository: activity.repository,
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