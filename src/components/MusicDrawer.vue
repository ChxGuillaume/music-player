<template>
  <v-navigation-drawer
      v-model="menu"
      fixed
      right
      temporary
      width="300"
  >
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="text-h4">
          {{ drawerTitle }}
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>

    <v-list
        dense
        nav
    >
      <v-list-item
          :class="{ playing: item.id === music_id }"
          v-for="(item) in displayMusics"
          :key="item.id"
          link
          @click="$emit('select-music', item.id)"
          @click.right="chooseMusic($event, item.id)"
      >
        <v-list-item-icon class="mr-2">
          <v-icon :color="item.id === music_id ? 'primary' : ''">mdi-music-note-eighth</v-icon>
        </v-list-item-icon>

        <v-list-item-content class="scrolling-text-container">
          <v-list-item-title class="scrolling-text">
            <div>{{ item.title }} <span class="grey--text">by {{ item.author }}</span></div>
            <div class="grey--text" v-if="item.feat.length">ft. {{ item.feat.join(', ') }}</div>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <template v-slot:append>
      <v-bottom-navigation
          v-model="sub_menu"
          color="primary"
          horizontal
          mandatory
          grow
          shift
          style="box-shadow: none;"
      >
        <v-btn value="musics">
          <span>Musics</span>
          <v-icon class="mx-auto">mdi-music</v-icon>
        </v-btn>

        <v-btn value="likes">
          <span>Likes</span>
          <v-icon class="mx-auto">mdi-heart</v-icon>
        </v-btn>

        <v-btn disabled>
          <v-icon class="mx-auto">mdi-playlist-music</v-icon>
        </v-btn>
      </v-bottom-navigation>
    </template>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "MusicDrawer",
  props: {
    likes: {
      type: Array,
      required: true,
    },
    musics: {
      type: Array,
      required: true,
    },
    music_id: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      menu: false,
      sub_menu: undefined,
    }
  },
  computed: {
    drawerTitle() {
      switch (this.sub_menu) {
        case 'likes':
          return 'Likes'
        default:
          return 'Musics'
      }
    },
    displayMusics() {
      if (this.sub_menu === 'likes') {
        return this.musics.filter(e => this.likes.includes(e.id))
      }

      return this.musics
    },
  },
  methods: {
    toggleMenu() {
      this.menu = !this.menu;
    },
    chooseMusic(ev, id) {
      ev.preventDefault();
      this.$emit('select-music', id);
    },
  },
}
</script>

<style scoped>
.playing {
  background: rgba(33, 150, 243, .24);
}
</style>
