<template>
  <div id="appPage">
    <v-app>
      <v-app-bar app>
        <v-btn text small @click="drawer = !drawer" class="mr-2">
          <v-icon>mdi-menu</v-icon>
        </v-btn>
        <h2>Service Cloud</h2>
        <!-- <nav>
          <router-link to="/">Home</router-link> |
          <router-link to="/login">Login</router-link> |
          <router-link to="/signup">Signup</router-link> |
          <router-link to="/table">Table</router-link> |
          <router-link to="/service">Service</router-link>
        </nav> -->
        <v-spacer></v-spacer>
        <v-btn icon class="mr-2">
          <v-icon>mdi-bell</v-icon>
        </v-btn>
        <LoginTag />
      </v-app-bar>
      <template>
        <v-navigation-drawer v-model="drawer" app persistent>
          <v-list class="text-center pa-1 my-2">
            <v-list-item-title class="text-h4">Hello User!</v-list-item-title>
          </v-list>
          <v-divider></v-divider>
          <v-list class="mx-4 mt-4">
            <v-list-item
              v-for="item in items"
              :key="item.title"
              link
              :to="item.path"
            >
              <v-list-item-action>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-action>

              <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item-content></v-list-item
            >
          </v-list>
        </v-navigation-drawer>
      </template>
      <v-main>
        <router-view />
      </v-main>
    </v-app>
  </div>
</template>

<script>
import LoginTag from "./components/LoginTag.vue";
export default {
  name: "App",
  components: {
    LoginTag,
  },

  data: () => ({
    drawer: false,
    items: [
      { title: "Home", icon: "mdi-home", path: "/" },
      { title: "Login", icon: "mdi-login", path: "/login" },
      { title: "Signup", icon: "mdi-plus", path: "/signup" },
      { title: "Service", icon: "mdi-forum", path: "/service" },
      { title: "Table", icon: "mdi-table", path: "/table" },
    ],
  }),
  // beforeCreate(){
  //   console.log('before create');
  // },
  // created(){
  //   console.log('created');
  // },
  // beforeMount(){
  //   console.log('before mount');
  // },
  // mounted(){
  //   console.log('mounted');
  // },
  // beforeUpdate() {
  //   console.log('before update');
  // },
  // updated() {
  //   console.log('updated');
  // },
};
</script>
