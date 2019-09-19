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
            ></div>
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
                <i class="fas fa-user-times"></i>&nbsp;
                Remove Collaborator
              </span>
              <br />
              <br />
              <a :href="`http://github.com/${$route.params.login}`" class="pr-20" target="_blank">
                <i class="fas fa-external-link-alt"></i>&nbsp;
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
              class="button primary outline text-error bd-error"
              v-if="selectedRepositories.length > 0"
              @click="revokeAccess()"
            >
              <i class="fas fa-times"></i>&nbsp;
              Revoke Access
            </button>
            <button class="button dark outline" @click="refreshData">
              <i class="fas fa-sync-alt"></i>&nbsp;
              Refersh Data
            </button>
            <button type="submit" class="button primary outline" @click="showModal = true">
              <i class="fas fa-plus"></i>&nbsp;
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
            <label :for="repository.name" class="repo-checkbox">
              <div class="bg-card border-radius-5 p-20 my-10">
                <div class="row">
                  <div class="col-10 text-overflow-ellipsis">
                    <i class="fas fa-code-branch"></i>
                    {{repository.name}}
                  </div>
                  <div class="col-2">
                    <i class="fas fa-check-circle text-light pull-right mt-5"></i>
                  </div>
                </div>
              </div>
            </label>
          </div>
        </div>

        <div class="row mt-30">
          <div class="col-4-lg">
            <h2>Today's Activity</h2>
          </div>
          <div class="col-8-lg is-right">
            <p class="text-dark">{{ Date() | formatDate }}</p>
          </div>
        </div>

        <div class="row">
          <div class="col-12">
            <div
              class="bg-card border-radius-5 p-20 my-20"
              v-for="(activity, index) in activities"
              :key="index"
            >
              <h3 class="text-dark">Repository: {{activity.repository}}</h3>
              <div
                class="activity-container"
                v-for="(diff, index) in activity.diffs"
                :key="index"
                v-html="prettyHtml(diff)"
              ></div>
              <div v-if="activity.diffs.length === 0 && activitiesLoading === false">
                <h4 class="text-center text-dark py-20">
                  No Activity
                </h4>
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
      activities: [],
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

        this.collaborator.repositories.forEach(repository => {
          let params = {
            repository: repository.name,
            after: moment(after).format("YYYY-MM-DD"),
            before: moment(before).format("YYYY-MM-DD")
          };
          axios
            .get(`/activities/${this.$route.params.login}`, { params })
            .then(res => {
              this.activitiesLoading = false;
              this.activities = [...this.activities, res.data];
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