<!-- eslint-disable vue/no-parsing-error -->
<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <v-app dark>
    <v-card class="overflow-hidden">
      <v-app-bar
        absolute
        color="#000000"
        dark
        shrink-on-scroll
        prominent
        src="01.jpg"
        fade-img-on-scroll
        scroll-target="#scrolling-techniques-3"
      >
        <template #img="{ props }">
          <v-img
            v-bind="props"
            gradient="to top right, rgba(100,87,150,.7), rgba(25,32,72,.7)"
          ></v-img>
        </template>

        <v-spacer></v-spacer>

        <v-btn icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>

        <v-btn icon>
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>

        <template #extension>
          <v-tabs align-with-title>
            <v-tab to="/">Home</v-tab>
            <v-tab to="/customers">Customers</v-tab>
            <v-tab to="/orders">Orders</v-tab>
            <v-tab to="/shipments">Shipments</v-tab>
          </v-tabs>
        </template>
      </v-app-bar>
      <v-sheet
        id="scrolling-techniques-3"
        class="overflow-y-auto"
        max-height="224"
      >
        <v-container style="height: 1000px"></v-container>
      </v-sheet>
    </v-card>
    <v-main>
      <Nuxt />
    </v-main>
    <LayoutFooter />
  </v-app>
</template>

<script>
export default {
  name: 'LayoutDefault',
}
</script>
