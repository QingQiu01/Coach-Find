<template>
  <form action="" @submit.prevent="submitForm">
    <div
      class="form-control"
      :class="{ invalid: !firstName.isValid }">
      <label for="first-name">First name</label>
      <input
        type="text"
        id="first-name"
        v-model="firstName.value"
        @blur="clearValidity('firstName')" />
    </div>
    <p v-if="!firstName.isValid">
      At least input one letter as your firstName please!
    </p>
    <div
      class="form-control"
      :class="{ invalid: !lastName.isValid }">
      <label for="last-name">Last name</label>
      <input
        type="text"
        id="last-name"
        v-model="lastName.value"
        @blur="clearValidity('lastName')" />
    </div>
    <p v-if="!lastName.isValid">
      At least input one letter as your lastName please!
    </p>
    <div
      class="form-control"
      :class="{
        invalid: !description.isValid,
      }">
      <label for="description">Description</label>
      <textarea
        name=""
        id="description"
        cols="30"
        rows="5"
        v-model="description.value"
        @blur="clearValidity('description')"></textarea>
    </div>
    <p v-if="!description.isValid">
      description should not be empty
    </p>
    <div
      class="form-control"
      :class="{ invalid: !rate.isValid }">
      <label for="rate">Hourly Rate</label>
      <input
        type="number"
        id="rate"
        v-model.number="rate.value"
        @blur="clearValidity('rate')" />
    </div>
    <div
      class="form-control"
      :class="{ invalid: !areas.isValid }">
      <h3>Areas of Expertise</h3>
      <div>
        <input
          type="checkbox"
          id="frontend "
          value="frontend"
          v-model="areas.value"
          @blur="clearValidity('areas')" />
        <label for="frontend">Frontend</label>
      </div>
      <div>
        <input
          type="checkbox"
          id="backend "
          value="backend"
          v-model="areas.value"
          @blur="clearValidity('areas')" />
        <label for="backend">Backend</label>
      </div>
      <div>
        <input
          type="checkbox"
          id="career "
          value="career"
          v-model="areas.value"
          @blur="clearValidity('areas')" />
        <label for="career">Career</label>
      </div>
    </div>
    <p v-if="!areas.isValid">please check at least one!</p>
    <p v-if="!formIsValid">
      Please fix tge above errors and submit again;
    </p>
    <base-button>Register</base-button>
  </form>
</template>
<script>
export default {
  emits: ["save-data"],
  data() {
    return {
      firstName: {
        value: "",
        isValid: true,
      },
      lastName: {
        value: "",
        isValid: true,
      },
      description: {
        value: "",
        isValid: true,
      },
      rate: {
        value: "",
        isValid: true,
      },
      areas: {
        value: [],
        isValid: true,
      },
      formIsValid: true,
    };
  },
  methods: {
    clearValidity(input) {
      this[input].isValid = true;
    },
    validateForm() {
      this.formIsValid = true;
      if (this.firstName.value === "") {
        this.firstName.isValid = false;
        this.formIsValid = false;
      }
      if (this.lastName.value === "") {
        this.lastName.isValid = false;
        this.formIsValid = false;
      }
      if (this.description.value === "") {
        this.description.isValid = false;
        this.formIsValid = false;
      }
      if (!this.rate.value || this.rate.value < 0) {
        this.rate.isValid = false;
        this.formIsValid = false;
      }
      if (this.areas.value.length === 0) {
        this.areas.isValid = false;
        this.formIsValid = false;
      }
    },
    submitForm() {
      this.validateForm();
      if (!this.formIsValid) return;
      const formData = {
        first: this.firstName.value,
        last: this.lastName.value,
        desc: this.description.value,
        rate: this.rate.value,
        areas: this.areas.value,
      };
      // console.log(formData);
      this.$emit("save-data", formData);
    },
  },
};
</script>
<style scoped>
.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input[type="checkbox"] + label {
  font-weight: normal;
  display: inline;
  margin: 0 0 0 0.5rem;
}

input,
textarea {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
}

input:focus,
textarea:focus {
  background-color: #f0e6fd;
  outline: none;
  border-color: #3d008d;
}

input[type="checkbox"] {
  display: inline;
  width: auto;
  border: none;
}

input[type="checkbox"]:focus {
  outline: #3d008d solid 1px;
}

h3 {
  margin: 0.5rem 0;
  font-size: 1rem;
}

.invalid label {
  color: red;
}

.invalid input,
.invalid textarea {
  border: 1px solid red;
}
</style>
