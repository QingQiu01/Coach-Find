<template>
  <div>
    <base-dialog
      :show="!!error"
      title="error occurred!"
      @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <coach-filter
      @change-filter="setFilters"></coach-filter>
    <section>
      <base-card>
        <div class="controls">
          <base-button
            mode="outline"
            @click="loadCoaches(true)"
            >Refresh</base-button
          >
          <base-button
            link
            to="/auth?redirect=register"
            v-if="!isLoggedIn"
            >Login and Resign as a coach</base-button
          >
          <base-button
            link
            to="/register"
            v-if="!isCoached && isLoggedIn">
            register as coach
          </base-button>
        </div>
        <div v-if="isLoading">
          <base-spinner></base-spinner>
        </div>
        <ul v-if="hasCoaches">
          <coach-item
            v-for="coach in filterCoaches"
            :key="coach.id"
            :id="coach.id"
            :first-name="coach.firstName"
            :last-name="coach.lastName"
            :rate="coach.hourlyRate"
            :areas="coach.areas"></coach-item>
        </ul>
        <h3 v-else>No coaches found.</h3>
      </base-card>
    </section>
  </div>
</template>
<script>
import CoachItem from "../../components/coaches/CoachItem.vue";
import CoachFilter from "../../components/coaches/CoachFilter.vue";

export default {
  components: {
    CoachItem,
    CoachFilter,
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isAuthenticated;
    },
    filterCoaches() {
      const coaches =
        this.$store.getters["coaches/coaches"];
      const res = coaches.filter((coach) => {
        if (
          this.activeFilters.frontend === true &&
          [...coach.areas].includes("frontend")
        ) {
          // console.log([...coach.areas]);
          return true;
        }
        if (
          this.activeFilters.backend === true &&
          [...coach.areas].includes("backend")
        )
          return true;
        if (
          this.activeFilters.career === true &&
          [...coach.areas].includes("career")
        )
          return true;
      });
      // console.log(res);
      return res;
    },
    hasCoaches() {
      return (
        !this.isLoading &&
        this.$store.getters["coaches/hasCoaches"]
      );
    },
    isCoached() {
      return this.$store.getters["coaches/isCoach"];
    },
  },
  methods: {
    setFilters(newFilters) {
      this.activeFilters = newFilters;
      // console.log(this.activeFilters, newFilters);
    },
    async loadCoaches(refresh = false) {
      this.isLoading = true;
      try {
        await this.$store.dispatch("coaches/loadCoaches", {
          forceRefresh: refresh,
        });
      } catch (error) {
        this.error =
          error.message || "something went wrong";
      }

      this.isLoading = false;
    },
    handleError() {
      this.error = null;
    },
  },
  created() {
    this.loadCoaches();
  },
  data() {
    return {
      isLoading: false,
      error: null,
      activeFilters: {
        frontend: true,
        backend: true,
        career: true,
      },
    };
  },
};
</script>
<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
.controls {
  display: flex;
  justify-content: space-between;
}
</style>
