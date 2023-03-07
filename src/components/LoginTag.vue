<template>
    <div>
        <v-menu offset-y transition="slide-y-transition" bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn text v-bind="attrs" v-on="on">
              <v-icon class="mr-2">mdi-account</v-icon>
              <h4>Sam Jones</h4>
            </v-btn>
          </template>
          <v-list>
            <v-list-item>
              <v-list-item-title>Settings</v-list-item-title>
            </v-list-item>
            <v-list-item dense>
              <v-list-item-title>Logout</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
    </div>
</template>

<script>
export default {
    name:'LoginTag'
}
</script>