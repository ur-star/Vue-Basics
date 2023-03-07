<template>
  <div>
    <v-card class="text-center" dark>
      <v-card-title primary-title class="justify-center">
        <h2>{{ name  | upCase}}</h2>
      </v-card-title>
      <v-icon x-large>mdi-clock</v-icon>
      <v-card-title primary-title class="justify-center">
        <h3>{{ count }}</h3>
      </v-card-title>
      <v-card-actions class="justify-center">
        <!-- To call action use 'dispatch' and to call mutation use 'commit' -->

        <!-- <v-btn color="error" @click="$store.commit('decCounter')"><v-icon>mdi-minus</v-icon></v-btn> -->
        <v-btn color="error" @click="decCounter"
          ><v-icon>mdi-minus</v-icon></v-btn
        >

        <!-- <v-btn color="success" @click="$store.commit('incCounter')"><v-icon>mdi-plus</v-icon></v-btn> -->
        <v-btn color="success" @click="incCounter"
          ><v-icon>mdi-plus</v-icon></v-btn
        >
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import testMixin from './mixins/testMixin';
export default {
  name: "counter",
  computed: {
    count() {
      return this.$store.state.counter;
    },
  },
  data() {
    return {
        name:'random counter',
    }
  },
  methods: {
    incCounter() {
      this.$store.dispatch("incCounter");
    },
    decCounter() {
      this.$store.dispatch("decCounter");
    },
  },
  beforeCreate(){
    console.log('before create');
  },
  created(){
    console.log('created');
  },
  beforeMount(){
    console.log('before mount');
  },
  mounted(){
    console.log('mounted');
  },
  beforeUpdate() {
    console.log('before update');
  },
  updated() {
    console.log('updated');
  },
  mixins:[testMixin]
};
</script>
