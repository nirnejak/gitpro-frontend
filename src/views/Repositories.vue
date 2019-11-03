<template>
  <div class="columns">
    <Sidebar :show="true" />
    <div class="column is-9 pt-70 h-100vh mb-0" style="overflow-y: auto;">
      <div class="columns -4">
        <div class="column is-8">
          <h1 class="is-size-2">Repositories({{repositoriesOriginal.length}})</h1>
        </div>
        <div class="column is-4 pt-10">
          <input type="text" v-model="search" placeholder="Search Repository" class="pr-30" />
          <i class="fas fa-search pull-right position-relative r-10" style="top: -27px" />
        </div>
      </div>
      <div class="columns" v-if="repositoriesLoading">
        <div class="column is-4" v-for="i in 12" :key="i">
          <div class="m-10">
            <SkeletonLoader width="100%" height="70px" radius="5px" />
          </div>
        </div>
      </div>

      <div class="columns" v-if="starredRepositories.length > 0">
        <div
          class="column is-4"
          v-for="repository in starredRepositories"
          :key="`${repository.owner}/${repository.name}`"
        >
          <div class="bg-card border-radius-5 p-20 m-10">
            <div class="columns">
              <div class="column is-10 text-overflow-ellipsis">
                <router-link
                  :to="`/repositories/${repository.owner}/${repository.name}`"
                  class="text-high-contrast"
                >
                  <i class="fas fa-code-branch mr-5" />
                  {{repository.owner}}/{{repository.name}}
                </router-link>
              </div>
              <div class="column is-2 has-text-right-tablet">
                <i
                  class="fa-star mt-5 cursor-pointer text-high-contrast"
                  :class="{'fas': repository.isFavourite, 'far': !repository.isFavourite}"
                  @click="starRepo(repository.name, repository.owner, !repository.isFavourite)"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <hr class="my-30" v-if="starredRepositories.length > 0" />

      <div class="columns">
        <div
          class="column is-4"
          v-for="repository in repositories"
          :key="`${repository.owner}/${repository.name}`"
        >
          <div class="bg-card border-radius-5 p-20 m-10">
            <div class="columns">
              <div class="column is-10 text-overflow-ellipsis">
                <router-link
                  :to="`/repositories/${repository.owner}/${repository.name}`"
                  class="text-high-contrast"
                >
                  <i class="fas fa-code-branch mr-5" />
                  {{repository.owner}}/{{repository.name}}
                </router-link>
              </div>
              <div class="column is-2 has-text-right-tablet">
                <i
                  class="fa-star mt-5 cursor-pointer text-high-contrast"
                  :class="{'fas': repository.isFavourite, 'far': !repository.isFavourite}"
                  @click="starRepo(repository.name, repository.owner , !repository.isFavourite)"
                />
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
import SkeletonLoader from "@/components/UI/SkeletonLoader";

export default {
  name: "Repositories",
  components: { Sidebar, SkeletonLoader },
  data() {
    return {
      search: "",
      repositories: [],
      repositoriesLoading: true,
      repositoriesOriginal: [],
      starredRepositories: []
    };
  },
  created() {
    axios.get(`/repositories/`).then(res => {
      this.repositoriesLoading = false;
      this.repositories = res.data;
      this.repositoriesOriginal = res.data;
      this.starredRepositories = this.repositories.filter(
        repo => repo.isFavourite
      );
      this.repositories = this.repositoriesOriginal.filter(
        repo => !repo.isFavourite
      );
    });
  },
  watch: {
    search() {
      if (this.search === "") {
        this.repositories = this.repositoriesOriginal;
        this.starredRepositories = this.repositories.filter(
          repo => repo.isFavourite
        );
        this.repositories = this.repositories.filter(repo => !repo.isFavourite);
      } else {
        this.repositories = this.repositoriesOriginal.filter(repo =>
          repo.name.toLowerCase().includes(this.search.toLowerCase())
        );
        this.starredRepositories = this.repositories.filter(
          repo => repo.isFavourite
        );
        this.repositories = this.repositories.filter(repo => !repo.isFavourite);
      }
    }
  },
  methods: {
    async starRepo(repository, owner, isFavourite) {
      const res = await axios.put(
        `/repositories/${repository}?owner=${owner}`,
        { isFavourite }
      );
      this.repositoriesOriginal = this.repositoriesOriginal.map(repo => {
        if (repo.name === res.data.name && repo.owner === res.data.owner) {
          repo.isFavourite = res.data.isFavourite;
          return repo;
        }
        return repo;
      });
      this.repositories = this.repositoriesOriginal;
      this.starredRepositories = this.repositories.filter(
        repo => repo.isFavourite
      );
      this.repositories = this.repositoriesOriginal.filter(
        repo => !repo.isFavourite
      );
      this.search = "";
    }
  }
};
</script>