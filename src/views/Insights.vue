<template>
  <div class="row">
    <Sidebar :show="true" />
    <div class="col-9-lg pt-70">
      <div class="px-20">
        <h1>Insights</h1>

        <div class="is-center h-70vh">
          <div class="text-center text-dark">
            <i class="fas fa-3x fa-paper-plane mb-10" />
            <h2>Coming Soon</h2>
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