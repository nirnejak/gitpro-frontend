<template>
  <div class="row">
    <Sidebar :show="true" />
    <div class="col-9 pt-70">
      <div class="px-20">
        <h1>Teams</h1>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from "@/components/Sidebar";

export default {
  name: "Teams",
  components: { Sidebar }
};
</script>