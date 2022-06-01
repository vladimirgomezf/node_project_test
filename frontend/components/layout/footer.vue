<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <v-footer padless>
    <v-row justify="center" no-gutters>
      <v-btn
        v-for="link in links"
        :key="link"
        color="white"
        text
        rounded
        class="my-2"
      >
        {{ link }}
      </v-btn>
      <v-col class="py-4 text-center white--text" cols="12">
        {{ new Date().getFullYear() }} — <strong>UNISS</strong>
      </v-col>
    </v-row>
  </v-footer>
</template>
<script>
export default {
  name: 'FooterComponent',
  data: () => ({
    links: [
      'Home',
      'About Us',
      'Customers',
      'Orders',
      'Shipments',
      'Contact Us',
    ],
  }),
}
</script>
