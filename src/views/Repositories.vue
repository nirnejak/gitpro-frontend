<template>
  <div class="row">
    <Sidebar />
    <div class="col-9-lg pt-70 h-100vh mb-0" style="overflow-y: auto;">
      <div class="px-20">
        <h1>Repositories</h1>
        <div class="row" v-if="repositoriesLoading">
          <div class="col-3" v-for="i in 12" :key="i">
            <SkeletonLoader width="100%" height="70px" radius="5px" class="my-5"/>
          </div>
        </div>
        <div class="row">
          <div class="col-3" v-for="repository in repositories" :key="repository.name">
            <div class="bg-white border-radius-5 p-20 my-5">
              <router-link :to="`/repositories/${repository.name}`" class="text-black">
                <div class="row">
                  <div class="col-10 text-overflow-ellipsis">
                    <i class="fas fa-code-branch mr-5"></i>
                    {{repository.name}}
                  </div>
                  <div class="col-2">
                    <i class="fas fa-eye pull-right mt-5"></i>
                  </div>
                </div>
              </router-link>
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
import SkeletonLoader from "@/components/SkeletonLoader";

export default {
  name: "Repositories",
  components: { Sidebar, SkeletonLoader },
  data() {
    return {
      repositories: [],
      repositoriesLoading: true
    };
  },
  created() {
    axios.get(`/repositories/`).then(res => {
      this.repositoriesLoading = false;
      this.repositories = res.data;
    });
  }
};
</script>