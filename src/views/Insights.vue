<template>
  <div class="columns">
    <Sidebar :show="true" />
    <div class="column is-9 pt-70">
      <div class="px-20">
        <h1 class="title is-size-3">Insights</h1>

        <div class="columns is-vcentered is-centered h-70vh">
          <div class="has-text-centered has-text-dark">
            <i class="fas fa-3x fa-paper-plane mb-10" />
            <h2 class="title is-size-4">Coming Soon</h2>
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