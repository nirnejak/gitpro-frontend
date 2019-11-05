<template>
  <div>
    <autocomplete
      placeholder="Search for a User on Github"
      :search="searchMethod"
      :get-result-value="getResultValue"
    >
      <template v-slot:result="{result, props}">
        <li v-bind="props" class>
          <div class="columns cursor-pointer no-gutters">
            <div class="column is-2 is-center">
              <div
                class="rounded-circle bg-cover"
                :style="`background-image: url(${result.avatar_url}); width: 50px; padding-top: 50px;`"
              />
            </div>
            <div class="column is-10">
              <p class="m-0 p-0">{{result.login}}</p>
              <small class="has-text-dark" v-html="result.type" />
            </div>
          </div>
        </li>
      </template>
    </autocomplete>

    <div class="columns mb-10 mt-15">
      <div class="column is-6">
        <p class="has-text-dark">
          Repositories
          <small>({{selectedRepositories.length}} Selected)</small>
        </p>
      </div>
      <div class="column is-6 has-text-right-tablet">
        <i
          class="fas fa-sort-alpha-up text-primary cursor-pointer"
          @click="sortAlphaUp()"
          v-if="sort==='down' || sort==='not-sorted'"
        />
        <i
          class="fas fa-sort-alpha-down text-primary cursor-pointer"
          @click="sortAlphaDown()"
          v-if="sort==='up'"
        />
      </div>
    </div>

    <div class="field">
      <div class="control has-icons-right mb-10">
        <input class="input" type="text" placeholder="Search Repository" v-model="search" />
        <span class="icon is-small is-right">
          <i class="fas fa-search" />
        </span>
      </div>
    </div>

    <div class="list is-hoverable repo-list-container mb-15">
      <div
        class="list-item cursor-pointer py-10"
        v-for="repository in repositories"
        :key="repository.name"
        @click="selectRepo(repository.name)"
      >
        <div class="columns">
          <div class="column is-10">{{repository.name}}</div>
          <div class="column is-2 has-text-right-tablet">
            <i
              class="fas fa-lg fa-check-circle"
              :class="{
                'text-primary': selectedRepositories.includes(repository.name),
                'text-light': !selectedRepositories.includes(repository.name),
              }"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="is-center">
      <button class="button is-primary" @click="addToRepos">Create</button>
    </div>
  </div>
</template>

<script>
import Autocomplete from "@trevoreyre/autocomplete-vue";
import "@trevoreyre/autocomplete-vue/dist/style.css";

import axios from "@/configAxios";

export default {
  name: "AddCollaborator",
  props: ["showModal", "hideModal"],
  components: { Autocomplete },
  data() {
    return {
      user: {
        login: localStorage.login
      },
      selectedUser: {},
      search: "",
      sort: "not-sorted",
      repositoriesOriginal: [],
      repositories: [],
      selectedRepositories: []
    };
  },
  created() {
    axios.get("/repositories").then(res => {
      this.repositoriesOriginal = res.data.filter(
        repo => repo.owner === this.user.login
      );
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
    searchMethod(input) {
      return new Promise(resolve => {
        if (input.length < 3) {
          return resolve([]);
        } else {
          axios.get(`/fetch/users?q=${encodeURI(input)}`).then(res => {
            resolve(res.data);
          });
        }
      });
    },
    getResultValue(result) {
      this.selectedUser = result;
      return result.login;
    },

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
      if (this.selectedRepositories.length > 0 && this.selectedUser) {
        let data = {
          ...this.selectedUser,
          repositories: this.selectedRepositories
        };
        axios.post(`/collaborators/`, data).then(res => {
          if (res.data.success) {
            this.$message.success({
              message: res.data.message,
              position: "bottom-right",
              showClose: true
            });
            this.$props.hideModal();
          } else {
            this.$message.error({
              message: res.data.message,
              position: "bottom-right",
              showClose: true
            });
          }
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
input.autocomplete-input {
  padding-left: 45px !important;
  background-color: transparent;
}
.autocomplete-result {
  background-image: none;
  padding: 12px;
}
.repo-list-container {
  height: 300px;
  overflow-y: scroll;
}
</style>