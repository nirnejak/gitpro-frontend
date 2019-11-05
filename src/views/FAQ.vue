<template>
  <div>
    <Navbar />
    <div class="container pt-100 px-30">
      <div class="columns">
        <div class="column">
          <h1 class="title">Frequently Asked Questions</h1>
          <hr />
        </div>
      </div>

      <div class="columns">
        <div class="column">
          <p>
            <strong>
              <i class="fas fa-question-circle fa-sm mr-5"/>What is GitPro?
            </strong>
          </p>
          <p>GitPro is a platform to make repository management and developer activity tracking easier. It works with GitHub(we’re working on BitBucket and GitLab Integration). You can manage your repositories and it’s collaborators through GitPro. You can also see and track developer activities.</p>
        </div>
      </div>
      
      <div class="columns">
        <div class="column">
          <p>
            <strong>
              <i class="fas fa-question-circle fa-sm mr-5"/>How does it make repository management easy?
            </strong>
          </p>
          <p>On GitPro you can see all the collaborators at glance. You can see what repositories they have access to. Change the access or invite a new collaborator. Similarly, you can see a repository. See it’s collaborators. Remove a collaborator or Invite a new Collaborator.</p>
        </div>
      </div>

      <div class="columns">
        <div class="column">
          <p>
            <strong>
              <i class="fas fa-question-circle fa-sm mr-5"/>How does your platform track developer activity?
            </strong>
          </p>
          <p>In simple terms, activity is what a developer has done in a day. There are certain ways you can see and track it.</p>
        </div>
      </div>

      <div class="columns">
        <div class="column">
          <p>
            <strong>
              <i class="fas fa-question-circle fa-sm mr-5"/>What type of activities I can see?
            </strong>
          </p>
          <p>There are different ways you can see the activities of a developer.
            <ul class="ml-10">
              <li>On the dashboard, you can get a summary developer’s contributions to your favourite repositories.</li>
              <li>You can go to a developer’s profile and see all the work they have done on that day. There you will get a  summarised view of their activity. Which shows commits, files changed, additions and deletions for your favourite repositories.</li>
              <li>You can go to the activities section and see a detailed commit diff of the repository by a particular contributor. This will give you detailed information on what a developer/contributor has done on a particular day.</li>
            </ul>
          </p>
        </div>
      </div>
      
      <div class="columns">
        <div class="column">
          <p>
            <strong>
              <i class="fas fa-question-circle fa-sm mr-5"/>How much do I have to Pay?
            </strong>
          </p>
          <p>Nothing, It’s absolutely free.</p>
        </div>
      </div>
      
      <div class="columns">
        <div class="column">
          <p>
            <strong>
              <i class="fas fa-question-circle fa-sm mr-5"/>What about my data?
            </strong>
          </p>
          <p>We are only storing the data essential to do the task. Your fetched repositories are instantly deleted after processing the developer activity. Your data is safe, secure and private to you. No Ads or Tracking of any kind.</p>
        </div>
      </div>

      <div class="columns">
        <div class="column">
          <p>
            <strong>
              <i class="fas fa-question-circle fa-sm mr-5"/>If you’re fetching data from GitHub then how are you making sure it’s updated?
            </strong>
          </p>
          <p>A periodic worker automatically updates the data stored on our servers. And in case you recently made some changes and want to get the updates, there’s a fetch latest option. Which will instantly run the worker and your data will be updated.</p>
        </div>
      </div>
    </div>
    
    <Footer />
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default {
  name: "FAQ",
  components: { Footer, Navbar },
  created() {
    window.scrollTo(0,0)
  }
};
</script>

<style>
</style>