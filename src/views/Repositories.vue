<template>
  <div class="row">
    <Sidebar :show="true" />
    <div class="col-9-lg pt-70 h-100vh mb-0" style="overflow-y: auto;">
      <div class="px-20">
        <div class="row">
          <div class="col-8-lg">
            <h1>Repositories</h1>
          </div>
          <div class="col-4-lg pt-10">
            <input type="text" v-model="search" placeholder="Search Repository" class="pr-30" />
            <i class="fas fa-search pull-right position-relative r-10" style="top: -27px" />
          </div>
        </div>
        <div class="row" v-if="repositoriesLoading">
          <div class="col-3" v-for="i in 12" :key="i">
            <SkeletonLoader width="100%" height="70px" radius="5px" class="my-10" />
          </div>
        </div>

        <div class="row" v-if="starredRepositories.length > 0">
          <div class="col-3" v-for="repository in starredRepositories" :key="repository.name">
            <div class="bg-card border-radius-5 p-20 my-10">
              <div class="row">
                <div class="col-10 text-overflow-ellipsis">
                  <router-link :to="`/repositories/${repository.name}`" class="text-high-contrast">
                    <i class="fas fa-code-branch mr-5" />
                    {{repository.name}}
                  </router-link>
                </div>
                <div class="col-2 text-right">
                  <i
                    class="fa-star mt-5 cursor-pointer text-high-contrast"
                    :class="{'fas': repository.isFavourite, 'far': !repository.isFavourite}"
                    @click="starRepo(repository.name, !repository.isFavourite)"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <hr class="my-30" v-if="starredRepositories.length > 0" />

        <div class="row">
          <div class="col-3" v-for="repository in repositories" :key="repository.name">
            <div class="bg-card border-radius-5 p-20 my-10">
              <div class="row">
                <div class="col-10 text-overflow-ellipsis">
                  <router-link :to="`/repositories/${repository.name}`" class="text-high-contrast">
                    <i class="fas fa-code-branch mr-5" />
                    {{repository.name}}
                  </router-link>
                </div>
                <div class="col-2 text-right">
                  <i
                    class="fa-star mt-5 cursor-pointer text-high-contrast"
                    :class="{'fas': repository.isFavourite, 'far': !repository.isFavourite}"
                    @click="starRepo(repository.name, !repository.isFavourite)"
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
    async starRepo(repository, isFavourite) {
      const res = await axios.put(`/repositories/${repository}`, {
        isFavourite
      });
      this.repositoriesOriginal = this.repositoriesOriginal.map(repo => {
        if (repo.name === res.data.name) {
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