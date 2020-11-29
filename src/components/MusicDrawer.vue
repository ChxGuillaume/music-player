<template>
  <div>
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
            @click.right="contextMenu($event, item.id)"
            :long-press="300"
            @long-press-start="contextMenu($event, item.id)"
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
        <v-text-field
            class="my-2 px-3"
            v-model="search_input"
            label="Search"
            clearable
            hide-details
        />
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
    <v-bottom-sheet inset max-width="450" v-model="bottom_modal">
      <v-list>
        <v-list-item
            @click="playEvent"
        >
          <v-list-item-avatar>
            <v-icon>mdi-play</v-icon>
          </v-list-item-avatar>
          <v-list-item-title>Play Now</v-list-item-title>
        </v-list-item>
        <v-list-item
            @click="addToQueueEvent"
        >
          <v-list-item-avatar>
            <v-icon>mdi-plus-box-multiple</v-icon>
          </v-list-item-avatar>
          <v-list-item-title>Add to Queue</v-list-item-title>
        </v-list-item>
        <v-list-item
            @click="likeEvent"
        >
          <v-list-item-avatar>
            <v-icon>mdi-heart</v-icon>
          </v-list-item-avatar>
          <v-list-item-title>Like</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-bottom-sheet>
  </div>
</template>

<script>
import LongPress from 'vue-directive-long-press'

export default {
  name: "MusicDrawer",
  directives: {
    'long-press': LongPress
  },
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
      search_input: '',
      bottom_modal: false,
      modal_music_id: -1
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
      const musics = this.musics.filter(e => {
        const regex = /[^A-Za-z0-9]/g
        const search_input = this.search_input.toLowerCase().replace(regex, '');
        const title = e.title.toLowerCase().replace(regex, '');
        const author = e.author.toLowerCase().replace(regex, '');
        const feats = e.feat.join('').toLowerCase().replace(regex, '');

        return ((title.includes(search_input)) || (author.includes(search_input)) || (feats.includes(search_input)))
      });

      if (this.sub_menu === 'likes') {
        return musics.filter(e => this.likes.includes(e.id))
      }

      return musics
    },
  },
  methods: {
    toggleMenu() {
      this.menu = !this.menu;
    },
    contextMenu(ev, id) {
      ev.preventDefault();
      this.bottom_modal = true;
      this.modal_music_id = id;
    },
    playEvent() {
      this.bottom_modal = false;
      this.$emit('select-music', this.modal_music_id);
    },
    addToQueueEvent() {
      this.bottom_modal = false;
      this.$emit('add-to-queue', this.modal_music_id);
    },
    likeEvent() {
      this.bottom_modal = false;
      this.$emit('like', this.modal_music_id);
    },
  },
}
</script>

<style scoped>
.playing {
  background: rgba(33, 150, 243, .24);
}

.scrolling-text {
  display: table;
  width: fit-content;
  min-width: 100%;
  text-align: left;
  transition: .5s linear;
  overflow: visible;
}

.scrolling-text-container:hover .scrolling-text {
  animation: linear scroll-text 8s infinite;
}

@keyframes scroll-text {
  0% {
    transform: translate(0%);
  }
  55% {
    transform: translate(-100%);
  }
  55.01% {
    transform: translate(100%);
  }
  75% {
    transform: translate(0%);
  }
}
</style>
