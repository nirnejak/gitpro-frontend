<template>
  <div class="columns">
    <Sidebar :show="true" />
    <div class="column is-9 pt-70">
      <div class="px-20">
        <h1 class="is-size-2">Insights</h1>

        <div class="is-center h-70vh">
          <div class="has-text-centered text-dark">
            <i class="fas fa-3x fa-paper-plane mb-10" />
            <h2 class="is-size-3">Coming Soon</h2>
            <p>
              Anything you'd like to see?
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSe24lZ1ykY24mTfog59DlbOOFtrTTeaYoT0PNQ3cxmvl_o42w/viewform"
                target="_blank"
              >Tell Us</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from "@/components/Sidebar";

export default {
  name: "Insights",
  components: { Sidebar }
};
</script>