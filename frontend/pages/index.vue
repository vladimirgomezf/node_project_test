<template>
  <v-carousel>
    <v-carousel-item
      v-for="(item, i) in items"
      :key="i"
      :src="item.src"
      reverse-transition="fade-transition"
      transition="fade-transition"
    ></v-carousel-item>
  </v-carousel>
</template>
<script>
import LayoutDefault from '../layouts/default.vue'
export default {
  name: 'IndexPage',
  components: {
    // eslint-disable-next-line vue/no-unused-components
    LayoutDefault,
  },
  data() {
    return {
      items: [
        {
          src: 'carrusel/01.jpg',
        },
        {
          src: 'carrusel/02.jpg',
        },
        {
          src: 'carrusel/03.jpg',
        },
        {
          src: 'carrusel/04.jpg',
        },
      ],
    }
  },
}
</script>
