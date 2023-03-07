<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-img
          :src="require('../assets/logo.svg')"
          class="my-3"
          contain
          height="200"
        />
      </v-col>

      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3">Welcome to Vuetify</h1>
      </v-col>

      <v-col class="mb-5" cols="12">
        <h2 class="headline font-weight-bold mb-3">Custom Component</h2>
        <newPage pop="Utkarsh" />
      </v-col>
    </v-row>
    <v-row class="justify-center">
      <counter />
    </v-row>
  </v-container>
</template>

<script>
import newPage from "./newPage.vue";
import counter from "./counter.vue";
export default {
  name: "HelloWorld",
  components: {
    newPage,
    counter,
  },
  data: () => ({}),
};
</script>
