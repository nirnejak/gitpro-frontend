<template>
  <div>
    <input type="text" placeholder="Search Repo" v-model="search" />

    <br />
    <div class="row">
      <div class="col-6">
        <p class="text-dark">
          Repositories
          <small>({{selectedRepositories.length}} Selected)</small>
        </p>
      </div>
      <div class="col-6 is-text-right">
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
    <br />

    <div class="repo-list-container">
      <div
        class="repo-item cursor-pointer bd-light border-radius-5 p-10 my-5"
        v-for="repository in repositories"
        :key="repository.name"
        @click="selectRepo(repository.name)"
      >
        <div class="row">
          <div class="col-10">{{repository.name}}</div>
          <div class="col-2 is-text-right">
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
    <br />
    <div class="is-center">
      <button class="button primary">Add</button>
    </div>
  </div>
</template>

<script>
import axios from "@/configAxios";

export default {
  name: "RepoAdd",
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
      this.repositories = res.data;
      this.repositoriesOriginal = res.data;
    });
  },
  watch: {
    search() {
      if (this.search === "") {
        this.repositories = this.repositoriesOriginal;
      } else {
        this.repositories = this.repositories.filter(repo =>
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
          repository => repository.name !== repo
        );
      } else {
        this.selectedRepositories.push(repo);
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