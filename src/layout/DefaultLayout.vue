<template>
  <v-app>
    <!-- App bar -->
    <HeaderComponent />
    <!-- Main content -->
    <v-main>
      <v-container>
        <router-view></router-view>
        <!-- Render page -->
      </v-container>
    </v-main>

    <!-- Footer -->
    <FooterComponent />
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import FooterComponent from "@/components/FooterComponent.vue";
import HeaderComponent from "@/components/HeaderComponent.vue";
export default Vue.extend({
  name: "MainLayout",
  components: {
    HeaderComponent,
    FooterComponent,
  },
});
</script>
