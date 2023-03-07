<template>
  <div id="app">
    <v-toolbar flat class="mt-8">
      <v-toolbar-title class="text-h4 mx-6 my-8">Posts</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn color="black" dark class="mb-2 mx-6" @click="drawer = true">
        <v-icon class="pr-2">mdi-plus</v-icon>

        New Post
      </v-btn>
    </v-toolbar>
    <!-- Dialoge Box for deletion -->
    <v-dialog v-model="deleteDialog" max-width="500px">
      <v-card class="pa-2 py-2" light>
        <v-card-title class="text-h6">Delete Group</v-card-title>
        <v-card-text> Are you sure you want to delete the post </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="black "
            class="mb-2 font-weight-medium"
            text
            @click="deleteDialog = false"
            >Cancel</v-btn
          >
          <v-btn
            color="black"
            dark
            class="mb-2 font-weight-medium"
            @click="deleteItemConfirm"
            >Delete</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Table to show posts -->
    <v-card class="mx-6">
      <v-data-table
        :headers="headers"
        :items="posts"
        loading="true"
        class="mt-2"
      >
        <template v-slot:item.action="{ item }">
          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn v-on="on" rounded text>
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item @click="editPost(item)">
                <v-icon class="mr-2">mdi-pencil</v-icon>
                <v-list-item-title>Edit</v-list-item-title>
              </v-list-item>
              <v-list-item @click="deletePost(item)">
                <v-icon class="mr-2">mdi-delete</v-icon>
                <v-list-item-title>Delete</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </template>
      </v-data-table>
    </v-card>
    <!-- Navigation Drawer To Add and edit Posts -->
    <v-navigation-drawer
      v-model="drawer"
      right
      absolute
      temporary
      hide-overlay
      width="30%"
    >
      <v-form ref="form" v-model="valid">
        <v-row dense class="pa-4">
          <v-col cols="12">
            <h2>{{ formTitle }} Post</h2>
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="title"
              label="Title"
              :rules="[
                (v) => !!v || 'Name is required',
                (v) =>
                  (v && v.length <= 10) ||
                  'Name must be less than 10 characters',
              ]"
              outlined
              required
            />
          </v-col>
          <v-col cols="12">
            <v-textarea
              v-model="body"
              label="Body"
              :rules="[(v) => !!v || 'Body is required']"
              outlined
              required
            />
          </v-col>
        </v-row>
      </v-form>

      <v-row>
        <v-col class="mx-6">
          <v-btn :disabled="!valid" @click="createPost()"> Confirm </v-btn>

          <v-btn text @click="drawer = false"> Cancel </v-btn>
        </v-col>
      </v-row>
    </v-navigation-drawer>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      headers: [
        { text: "Id", value: "id" },
        { text: "User Id", value: "userId" },
        { text: "Title", value: "title" },
        {
          text: "Body",
          value: "body",
        },
        {
          text: "Actions",
          value: "action",
        },
      ],
      posts: [],
      drawer: false,
      deleteDialog: false,
      name: "",
      formTitle: "Create",
      valid: false,
      title: "",
      body: "",
      postURL: null,
      postId: null,
    };
  },
  mounted() {
    this.getPosts();
  },

  methods: {
    deletePost(post) {
      this.deleteDialog = true;
      this.postId = post.id;
    },
    editPost(post) {
      this.formTitle = post.id ? "Edit" : "Create";
      this.postId = post.id;
      this.drawer = true;

      if (post.id) {
      
        this.getPost(post.id);
      }
    },

    getPosts() {
      axios
        .get("https://jsonplaceholder.typicode.com/posts")
        .then((res) => {
          this.posts = res.data;
        })
        .catch((err) => window.alert(err));
    },
    getPost(postId) {
     
      axios({
        method: "get",
        url: `https://jsonplaceholder.typicode.com/posts/${postId}`,
      })
        .then((response) => {
          console.log("response :" + JSON.stringify(response));
          this.title = response.data.title;
          this.body = response.data.body;
        })
        .catch((err) => window.alert(err.message));
    },
    /*Create / Edit */
    createPost() {
      // console.log("post id", this.postId);

      this.postUrl = this.postId
        ? `https://jsonplaceholder.typicode.com/posts/${this.postId}`
        : `https://jsonplaceholder.typicode.com/posts`;
      axios({
        method: this.postId ? "PUT" : "POST",
        url: this.postUrl,
        body: JSON.stringify({
          title: this.title,
          body: this.body,
          userId: 1,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((res) => {
          console.log("post response :" + JSON.stringify(res));
          this.drawer = false;
          this.getPosts();
        })
        .catch((err) => window.alert(err.message));
    },
   
    deleteItemConfirm() {
      axios({
        method: "DELETE",
        url: `https://jsonplaceholder.typicode.com/posts/${this.postId}`,
      })
        .then((response) => {
          console.log("post response :" + JSON.stringify(response));
          this.deleteDialog = false;
          this.getPosts();
        })
        .catch((err) => window.alert(err.message));
    },
    resetData() {
      this.title = null;
      this.body = null;
      this.postId = null;
      this.$refs.form.reset();
    },
  },
  watch:{
    drawer(newVal,oldVal){
      if (!newVal) {
        this.resetData();
      }

    }
  }
};
</script>
