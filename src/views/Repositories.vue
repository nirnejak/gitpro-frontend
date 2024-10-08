<template>
  <div class="columns">
    <Sidebar :show="true" />
    <div class="column is-9 pt-70 h-100vh mb-0" style="overflow-y: auto;">
      <div class="px-30">
        <div class="columns mb-30">
          <div class="column is-8">
            <h1 class="title is-size-3 has-text-black">Repositories({{repositoriesOriginal.length}})</h1>
          </div>
          <div class="column is-4 pt-10">
            <p class="control has-icons-right">
              <input class="input" type="text" v-model="search" placeholder="Search Repository" />
              <span class="icon is-small is-right">
                <i class="fas fa-search" />
              </span>
            </p>
          </div>
        </div>
        <div class="columns is-multiline" v-if="repositoriesLoading">
          <div class="column is-4" v-for="i in 12" :key="i">
            <SkeletonLoader width="100%" height="70px" radius="5px" />
          </div>
        </div>

        <div class="columns is-multiline" v-if="starredRepositories.length > 0">
          <div
            class="column is-4"
            v-for="repository in starredRepositories"
            :key="`${repository.owner}/${repository.name}`"
          >
            <div class="box border-radius-5 p-20">
              <div class="columns is-mobile">
                <div class="column is-10 text-overflow-ellipsis">
                  <router-link
                    :to="`/repositories/${repository.owner}/${repository.name}`"
                    class="text-high-contrast"
                  >
                    <i class="fas fa-code-branch mr-5" />
                    {{repository.owner}}/{{repository.name}}
                  </router-link>
                </div>
                <div class="column is-2 has-text-right">
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

        <hr class="my-30 has-background-grey" v-if="starredRepositories.length > 0" />

        <div class="columns is-multiline">
          <div
            class="column is-4"
            v-for="repository in repositories"
            :key="`${repository.owner}/${repository.name}`"
          >
            <div class="box border-radius-5 p-20">
              <div class="columns is-mobile">
                <div class="column is-10 text-overflow-ellipsis">
                  <router-link
                    :to="`/repositories/${repository.owner}/${repository.name}`"
                    class="text-high-contrast"
                  >
                    <i class="fas fa-code-branch mr-5" />
                    {{repository.owner}}/{{repository.name}}
                  </router-link>
                </div>
                <div class="column is-2 has-text-right">
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