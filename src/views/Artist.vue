<template>
  <v-row class="text-center" style="z-index: 1;">
    <v-col cols="12">
      <v-card
          class="mx-auto"
          max-width="400"
      >
        <v-list-item-title>
          <h1 class="white--text">Musics by</h1>
          <h2 class="subtitle-1 white--text">{{ artist.name }}</h2>
        </v-list-item-title>

        <v-list-item
            v-for="(music) in artistMusics"
            :key="music.id"
        >
          <v-list-item-content>
            <v-list-item-title class="grey--text">{{ music.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-card-actions class="justify-center">
          <v-btn outlined color="red" @click="$router.push({ name: 'home' })">
            <v-icon left>mdi-close</v-icon>
            Close List
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: 'artist',
  computed: {
    artist() {
      return this.artists.find(e => e.id === parseInt(this.$route.params.id));
    },
    artistMusics() {
      return this.musics.filter(e => e.author.id === parseInt(this.$route.params.id))
    },
    ...mapState({
      artists: state => state.artists,
      musics: state => state.musics,
    })
  },
}
</script>