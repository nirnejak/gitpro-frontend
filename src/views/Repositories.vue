<template>
  <div class="row">
    <Sidebar />
    <div class="col-9-lg pt-70 h-100vh mb-0" style="overflow-y: auto;">
      <div class="px-20">
        <h1>Repositories</h1>
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
import Sidebar from "@/components/Sidebar";

export default {
  name: "Repositories",
  components: { Sidebar },
  data() {
    return {
      repositories: []
    };
  },
  created() {
    
  }
};
</script>