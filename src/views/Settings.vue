<template>
  <div class="row">
    <Sidebar />
    <div class="col-9-lg pt-70">
      <div class="px-20">
        <h1>Settings</h1>
        <div class="row">
          <div class="col-12">
            <div class="bg-white border-radius-10 p-20">
              <div class="row">
                <div class="col-9">Include Public Repositories</div>
                <div class="col-3 is-right">
                  <ToggleButton />
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
import Sidebar from "@/components/Sidebar";
import ToggleButton from "@/components/ToggleButton";

export default {
  name: "Settings",
  components: { Sidebar, ToggleButton }
};
</script>