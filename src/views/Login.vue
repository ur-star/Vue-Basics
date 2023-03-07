<template>
  <div>
  <v-row>
    <v-col cols="6" class="mx-auto mt-8">
      <v-card outlined elevation="6">
        <v-card-title class="text-h4"> Login Form </v-card-title>
        <v-form v-model="valid">
          <v-card-text>
            <v-form  v-model="valid">
              <v-text-field
                label="Email"
                required
                :rules="[(v) => !!v || 'Email is required']"
                v-model="email"
                prepend-icon="mdi-email"
              ></v-text-field>
              <v-text-field
                label="Password"
                type="password"
                :rules="[(v) => !!v || 'Please enter the password',
                            (v)=> /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]/.test(v) || 'Password must contain a digit and a number',
                            (v) => (v && v.length > 8) || 'Password must be atleast 8 characters']"
                v-model="password"
                prepend-icon="mdi-lock"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <!-- <v-spacer></v-spacer> -->
            <v-btn class="ml-2" color="primary" :disabled="!valid" @click="show = !show">Login</v-btn>
          </v-card-actions>
        </v-form>
        <v-card-title  v-if="show">
          {{ password | caps}}
        </v-card-title>
      </v-card>
    </v-col>
    
  
  </v-row>
  <v-row>
    <v-col  cols="6" class="mx-auto my-8"><counter/></v-col>
  </v-row>
  </div>
</template>

<script>
import counter from '@/components/counter.vue';
export default {
  // name:Login,
  data() {
    return {
      valid: true,
      email: "",
      password: "",
      show:false
    };
  },
  components:{
    counter,
  },
  filters:{
    caps: function (value) {
       if (value) {
          value = value.toString();
          return value[0].toUpperCase()+value.slice(1);
       }
    }
  }
};
</script>
