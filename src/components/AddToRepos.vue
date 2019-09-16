<template>
  <div>
    <input type="text" placeholder="Search Repository" v-model="search" />
    <div class="row mb-10 mt-15">
      <div class="col-6">
        <p class="text-dark">
          Repositories
          <small>({{selectedRepositories.length}} Selected)</small>
        </p>
      </div>
      <div class="col-6 text-right">
        <i
          class="fas fa-sort-alpha-up text-primary cursor-pointer"
          @click="sortAlphaUp()"
          v-if="sort==='down' || sort==='not-sorted'"
        ></i>
        <i
          class="fas fa-sort-alpha-down text-primary cursor-pointer"
          @click="sortAlphaDown()"
          v-if="sort==='up'"
        ></i>
      </div>
    </div>

    <div class="repo-list-container mb-15">
      <div
        class="cursor-pointer bd-light border-radius-5 p-10 my-5"
        v-for="repository in repositories"
        :key="repository.name"
        @click="selectRepo(repository.name)"
      >
        <div class="row">
          <div class="col-10">{{repository.name}}</div>
          <div class="col-2 text-right">
            <i
              class="fas fa-lg fa-check-circle"
              :class="{
                'text-primary': selectedRepositories.includes(repository.name),
                'text-light': !selectedRepositories.includes(repository.name),
              }"
            ></i>
          </div>
        </div>
      </div>
    </div>
    <div class="is-center">
      <button class="button primary" @click="AddToRepos">Add</button>
    </div>
  </div>
</template>

<script>
import axios from "@/configAxios";

export default {
  name: "AddToRepos",
  components: {},
  props: ["collaborator", "hideModal", "alreadyCollaborator"],
  data() {
    return {
      search: "",
      sort: "not-sorted",
      repositoriesOriginal: [],
      repositories: [],
      selectedRepositories: []
    };
  },
  created() {
    axios.get("/repositories").then(res => {
      // Filter out the Repos user already has access to
      this.repositoriesOriginal = res.data.filter(repo => {
        for (let i = 0; i < this.$props.alreadyCollaborator.length; i++) {
          if (this.$props.alreadyCollaborator[i].name === repo.name)
            return false;
        }
        return true;
      });
      this.repositories = this.repositoriesOriginal;
    });
  },
  watch: {
    search() {
      if (this.search === "") {
        this.repositories = this.repositoriesOriginal;
      } else {
        this.repositories = this.repositoriesOriginal.filter(repo =>
          repo.name.toLowerCase().includes(this.search.toLowerCase())
        );
      }
    }
  },
  methods: {
    sortAlphaUp() {
      this.sort = "up";
      this.repositories = this.repositories.sort((repo1, repo2) => {
        if (repo1.name < repo2.name) return 1;
        if (repo1.name > repo2.name) return -1;
        return 0;
      });
    },
    sortAlphaDown() {
      this.sort = "down";
      this.repositories = this.repositories.sort((repo1, repo2) => {
        if (repo1.name < repo2.name) return -1;
        if (repo1.name > repo2.name) return 1;
        return 0;
      });
    },
    selectRepo(repo) {
      if (this.selectedRepositories.includes(repo)) {
        this.selectedRepositories = this.selectedRepositories.filter(
          repoName => repoName !== repo
        );
      } else {
        this.selectedRepositories.push(repo);
      }
    },
    addToRepos() {
      if (this.selectedRepositories.length > 0) {
        let data = {
          selectedRepositories: this.selectedRepositories
        };
        axios
          .put(`/collaborators/${this.$props.collaborator.login}`, data)
          .then(res => {
            this.$message.success({
              message: res.data.message,
              position: "bottom-right",
              showClose: true
            });
            this.$props.hideModal();
          });
      } else {
        this.$message.error({
          message: "Please select a Repository to Send Invitation",
          position: "bottom-right",
          showClose: true
        });
      }
    }
  }
};
</script>

<style lang="scss">
.repo-list-container {
  height: 300px;
  overflow-y: scroll;
}
</style>