<template>
  <div>
    <section>
      <base-card>
        <h2>{{ fullName }}</h2>
        <h3>${{ rate }}/hour</h3>
      </base-card>
    </section>
    <section>
      <base-card>
        <header>
          <h2>Interested? Reach out now!</h2>
          <base-button link :to="contactLink"
            >Contact</base-button
          >
        </header>
      </base-card>
      <router-view> </router-view>
    </section>
    <base-card>
      <base-badge
        v-for="area in areas"
        :key="area"
        :type="area"
        :title="area"></base-badge>
      <p>{{ selectedCoach.description }}</p>
    </base-card>
  </div>
</template>

<script>
export default {
  props: ["id"],
  data() {
    return {
      selectedCoach: null,
    };
  },

  created() {
    this.selectedCoach = this.$store.getters[
      "coaches/coaches"
    ].find((coach) => coach.id === this.id);
  },
  computed: {
    rate() {
      return this.selectedCoach.hourlyRate;
    },
    areas() {
      return this.selectedCoach.areas;
    },
    fullName() {
      return `${this.selectedCoach.firstName} ${this.selectedCoach.lastName}`;
    },
    contactLink() {
      return this.$route.path + "/" + "contact";
    },
  },
};
</script>
