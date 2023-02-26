<template>
  <div>
    <base-dialog
      :show="!!error"
      title="An error occurred"
      @close="handleError">
      <p>{{ error }}</p></base-dialog
    >
    <base-dialog
      fixed
      :show="isLoading"
      title="Authenticating...">
      <p>Authenticating...</p>
      <base-spinner></base-spinner>
    </base-dialog>
    <base-card>
      <form action="" @click.prevent="submitForm">
        <div class="form-control">
          <label for="email">E-mail</label>
          <input
            type="email"
            id="email"
            v-model.trim="email" />
        </div>
        <div class="form-control">
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            v-model.trim="password" />
        </div>
        <p v-if="!formIsValid">
          Please enter a valid E-mail and set a password (at
          least 6 letters long)
        </p>

        <base-button>{{ submitBtnCaption }}</base-button>
        <base-button
          @click="switchAuthMode"
          type="button"
          mode="flat"
          >{{ switchModeBtnCaption }}</base-button
        >
      </form>
    </base-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      formIsValid: true,
      mode: "login",
      isLoading: false,
      error: null,
    };
  },
  computed: {
    submitBtnCaption() {
      if (this.mode === "login") return "Login";
      else return "Signup";
    },
    switchModeBtnCaption() {
      if (this.mode === "login") return "Signup";
      else return "Login";
    },
  },
  methods: {
    async submitForm() {
      this.formIsValid = true;
      if (
        this.email === "" ||
        !this.email.includes("@") ||
        this.password.length < 6
      ) {
        this.formIsValid = false;
        return;
      }
      this.isLoading = true;
      const actionPayload = {
        email: this.email,
        password: this.password,
      };
      try {
        if (this.mode === "login") {
          await this.$store.dispatch(
            "login",
            actionPayload
          );
        } else {
          // console.log(this.email);
          await this.$store.dispatch(
            "signup",
            actionPayload
          );
        }
        const redirectUrl =
          "/" + (this.$route.query.direct || "coaches");

        this.$router.replace(redirectUrl);
      } catch (err) {
        this.error =
          err.message || "Failed to authenticate,try later";
        console.log(this.error, this.isLoading);
      }
      this.isLoading = false;
    },
    switchAuthMode() {
      if (this.mode === "login") this.mode = "signup";
      else if (this.mode === "signup") this.mode = "login";
    },
    handleError() {
      this.error = null;
    },
  },
};
</script>
<style scoped>
form {
  margin: 1rem;

  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}
</style>
