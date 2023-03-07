<template>
  <v-row class="my-8">
    <v-col cols="8" class="mx-auto">
      <h1>Signup Form</h1>

      <v-form ref="form" outlined v-model="valid">
        <v-text-field
          v-model="name"
          :counter="10"
          label="Name"
          :rules="nameRules"
          outlined
          required
        ></v-text-field>

        <v-text-field
          v-model="email"
          label="E-mail"
          :rules="emailRules"
          outlined
          required
        ></v-text-field>

        <v-text-field
          v-model="phone"
          label="Phone Number"
          :rules="phoneRule"
          type="number"
          :counter="true"
          required
          outlined
        ></v-text-field>

        <v-select
          v-model="select"
          :items="profession"
          :rules="[(v) => !!v || 'Item is required']"
          label="Profession"
          required
          outlined
        ></v-select>

        <v-checkbox
          v-model="checkbox"
          label="Do you agree?"
          :rules="[(v) => !!v || 'You must agree to continue!']"
          required
        ></v-checkbox>

        <v-btn
          outlined
          color="success"
          class="mr-4"
          :disabled="!valid"
          @click="validate"
        >
          Submit
        </v-btn>

        <v-btn color="error" class="mr-4" @click="reset"> Reset Form </v-btn>
        <v-btn color="warning" @click="resetValidation">
          Reset Validation
        </v-btn>
      </v-form>

      <v-card class="mt-12 pa-2" elevation="7">
        <v-data-table
          :headers="headers"
          :items="tableData"
          hide-default-footer
        >
        <template v-slot:item.actions="{ item }">
        <v-icon
          small
          class="mr-2"
          @click="editItem(item)"
        >
          mdi-pencil
        </v-icon>
        <v-icon
          small
          @click="deleteItem(item)"
        >
          mdi-delete
        </v-icon>
      </template>
    </v-data-table>
        <v-btn
          color="red"
          outlined
          @click="clearTable"
          :disabled="tableData.length < 1"
          >Clear Table</v-btn
        >
      </v-card>
    </v-col>
  </v-row>
</template>

<!-- <script>
  export default {
    data: () => ({
      name: '',
      
      email: '',
      
      select: null,
      profession: [
        'Student',
        'Working',
        'Business',
        'Scientist',
      ],
      checkbox: false,
      phone:'',
      showData:false
    }),

    methods: {
      submmit:function (){
        this.showData = true;
      },
      clear:function(){
        this.showData=false;
        this.name='',
        this.email='',
        this.select='',
        this.phone=''
      }
    },
  }
</script> -->
<script>
export default {
  data: () => ({
    valid: true,
    name: "",
    nameRules: [
      (v) => !!v || "Name is required",
      (v) => (v && v.length <= 10) || "Name must be less than 10 characters",
    ],
    email: "",
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
    select: null,
    profession: ["Student", "Working", "Business", "Scientist"],
    phone: "",
    phoneRule: [
      (v) => !!v || "Phone number is required",
      (v) => (v && v.length <= 10) || "Number must be atmost 10 characters",
    ],
    checkbox: false,
    headers: [
      {
        text: "Name",
        align: "start",
        sortable: true,
        value: "name",
      },
      { text: "Profession", value: "Profession" },
      { text: "Phone", value: "Phone" },
      { text: "Email", value: "Email" },
      { text: 'Actions', value: 'actions', sortable: false },

      
    ],
    tableData: [],
  }),

  methods: {
    validate() {
      this.$refs.form.validate();
      if (this.valid) {
        this.tableData.push({
          name: this.name,
          Profession: this.select,
          Phone: this.phone,
          Email: this.email,
        });
      } else {
        console.error("fill form correctly");
      }
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
    clearTable() {
      this.tableData = [];
    },
    deleteItem(item){
        let index = this.tableData.indexOf(item);
        this.tableData.splice(index,1);
    },
    editItem(item){
        console.log();
    }
  },
};
</script>
