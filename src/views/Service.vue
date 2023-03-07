<template>
  <div>
    <template>
      <v-toolbar flat class="mt-4">
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card class="pa-2"
          light>
            <v-card-title class="text-h6"
              >Delete Group</v-card-title
            >
            <v-card-text>
              Are you sure you want to delete the group ({{ name }}) 
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="black " class="mb-2 font-weight-medium" text @click="closeDelete"
                >Cancel</v-btn
              >
              <v-btn color="black" dark class="mb-2 font-weight-medium" @click="deleteItemConfirm"
                >Delete</v-btn
              >
             
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-toolbar-title class="text-h4 mx-6">Groups</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn color="black" dark class="mb-2 mx-6" @click="drawer = !drawer">
          <v-icon class="pr-2">mdi-plus</v-icon>

          New Group
        </v-btn>
      </v-toolbar>
      <template>
        <v-navigation-drawer
          v-model="drawer"
          app
          right
          temporary
          absolute
          width="40%"
        >
          <v-list class="mx-4">
            <v-list-item-title class="text-h4 my-5 font-weight-medium"
              >{{ formTitle }}</v-list-item-title
            >
            <v-list-item-subtitle class="subtitle-1"
              >Provide the following details to create a new
              group.</v-list-item-subtitle
            >
          </v-list>
          <v-list class="mx-4 mt-4">
            <v-form v-model="valid" ref="form">
              <v-text-field
                outlined
                label="Group Name"
                v-model="editedItem.name"
                :rules="[(v) => !!v || 'Item is required']"
                class="my-2"
              ></v-text-field>

              <v-textarea
                outlined
                label="Description"
                height="120"
                v-model="editedItem.description"
                :rules="[(v) => !!v || 'Item is required']"
                rows="6"
                row-height="30"
                class="my-2"
              ></v-textarea>

              <v-select
                v-model="editedItem.agents"
                :items="agents"
                :rules="[(v) => !!v || 'Item is required']"
                label="Agent"
                required
                class="my-2"
                outlined
              ></v-select>

              <v-select
                v-model="editedItem.service"
                :items="service"
                :rules="[(v) => !!v || 'Item is required']"
                label="Service Hour"
                required
                class="my-2"
                outlined
              ></v-select>
            </v-form>
            <v-list-item>
              <v-btn :disabled="!valid" @click="validate">{{ buttonTitle }}</v-btn>
              <v-spacer></v-spacer>
              <v-btn @click="closeDrawer">Cancel</v-btn>
            </v-list-item>
          </v-list>
        </v-navigation-drawer>
      </template>
    </template>
    <v-data-table
      :headers="headers"
      :items="tableData"
      class="elevation-1 my-8 mx-6"
      elevation="6"
    >
      <template v-slot:item.actions="{ item }">
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn v-bind="attrs" rounded v-on="on" text>
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>

          <v-list>
            <v-list-item @click="edited(item)">
              <v-icon class="mr-2">mdi-pencil</v-icon>
              <v-list-item-title>Edit</v-list-item-title>
            </v-list-item>
            <v-list-item @click="deleted(item)">
              <v-icon class="mr-2">mdi-delete</v-icon>
              <v-list-item-title>Delete</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </template>
    </v-data-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      valid: true,
      name: "",
      // description: "",
      agents: ["agent1", "agent2", "agent2"],
      // agentSelect: null,
      service: ["service1", "sevice2"],
      // serviceSelect: null,
      headers: [
        {
          text: "Group Name",
          align: "start",
          sortable: true,
          value: "name",
        },
        { text: "Description", value: "description" },
        { text: "Agents", value: "agents" },
        { text: "Service Hours", value: "service" },
        { text: "Actions", value: "actions", sortable: false },
      ],

      drawer: false,
      items: [
        { title: "Home", icon: "mdi-view-dashboard" },
        { title: "About", icon: "mdi-forum" },
      ],
      tableData: [
        {
          name: "utkarsh",
          description: "Consistent",
          agents: "agent4",
          service: "Test service",
        },
        {
          name: "Siddharth",
          description: "Consistent",
          agents: "agent3",
          service: "Test service",
        },
        {
          name: "Ayush",
          description: "Consistent",
          agents: "agent3",
          service: "Test service",
        },
      ],

      defaultItem: {
        name: "",
        description: "",
        agents: null,
        service: null,
      },

      editedItem: {
        name: "",
        description: "",
        agents: null,
        service: null,
      },
      deleteIndex: -1,
      editedIndex: -1,
      dialogDelete: false,
    };
  },
  computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Group' : 'Edit Group'
      },
      buttonTitle(){
        return this.editedIndex === -1 ? 'Save' : 'Done'
      }
    },
  methods: {
    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.tableData[this.editedIndex], this.editedItem);
        this.$refs.form.resetValidation();
      } else {
        this.tableData.push(this.editedItem);
        //console.log(this.editedItem);
        this.$refs.form.resetValidation();
      }
      this.closeDrawer();
    },
    validate() {
      this.$refs.form.validate();
      if (this.valid) {
        // console.log(this.editedItem);
        this.save();
      } else {
        console.error("fill form correctly");
      }
    },

    closeDrawer() {
      this.drawer = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
      this.$refs.form.resetValidation();
    },
    edited(item) {
      // console.log("item has been edited", item);
      this.editedIndex = this.tableData.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.drawer = true;
    },
    deleted(item) {
      this.dialogDelete = !this.dialogDelete;
      this.deleteIndex = this.tableData.indexOf(item);
      this.name= item.name;
    },

    deleteItemConfirm() {
      this.tableData.splice(this.deleteIndex, 1);
      // console.log("item has been deleted ", item);
      this.closeDelete();
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
      
    },
  },
};
</script>
