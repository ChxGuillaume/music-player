<template>
  <v-main>
    <v-container fill-height fluid>
      <transition name="fade" mode="out-in">
        <div
            class="background"
            :style="{ backgroundImage: 'url(' + image + ')' }"
            :key="image"
        />
      </transition>
      <MusicPlayer
          :status="music_playing"
          :music="playingMusic"
          :volume="volume"
          :duration="duration"
          :currentTime="current_time"
          @start="initMusic"
          @resume="resume"
          @pause="pause"
          @volumechange="volumechange"
          @previous="previous"
          @next="next"
          @seeking="seeking"
          @like="like"
          @unlike="unlike"
          @open-drawer="$refs.drawer.toggleMenu()"
      />
      <MusicShortcuts/>
      <MusicDrawer
          :likes="likes"
          :index_playing="index_playing"
          :musics="musics"
          ref="drawer"
          @select-music="selectMusic"
      />
    </v-container>
  </v-main>
</template>

<script>
import MusicPlayer from "../components/MusicPlayer.vue";
import MusicShortcuts from "../components/MusicShortcuts.vue";
import MusicDrawer from "../components/MusicDrawer.vue";

export default {
  name: 'Home',
  components: {
    MusicDrawer,
    MusicShortcuts,
    MusicPlayer,
  },
  data() {
    return {
      index_playing: 0,
      likes: [],
      musics: [
        {
          id: 1,
          title: 'MORE',
          image: require('../assets/musics/images/KDA_MORE.jpg'),
          mp3: require('../assets/musics/KDA_MORE.mp3'),
          author: 'K/DA',
          feat: ['Madison Beer', '(G)I-DLE', 'Lexie Liu', 'Jaira Burns', 'Seraphine'],
        },
        {
          id: 2,
          title: 'THE BADDEST',
          image: require('../assets/musics/images/KDA_BADDEST.jpg'),
          mp3: require('../assets/musics/KDA_BADDEST.mp3'),
          author: 'K/DA',
          feat: ['(G)I-DLE', 'Bea Miller', 'Wolftyla'],
        },
        {
          id: 3,
          title: 'POP/STARS',
          image: require('../assets/musics/images/KDA_POP_STARS.jpg'),
          mp3: require('../assets/musics/KDA_POP_STARS.mp3'),
          author: 'K/DA',
          feat: ['Madison Beer', '(G)I-DLE', 'Jaira Burns'],
        },
      ],
      music: new Audio(),
      music_playing: -1,
      volume: 1,
      duration: 1,
      current_time: 0,
      menu: false,
    }
  },
  computed: {
    image() {
      return this.playingMusic.image;
    },
    playingMusic() {
      const music = this.musics[this.index_playing];
      return {
        ...music,
        liked: this.likes.includes(music.id),
      };
    },
  },
  methods: {
    initMusic() {
      if (this.music) {
        this.music.pause();
      }
      this.music.src = this.playingMusic.mp3;

      this.music.play();
      this.duration = this.music.duration;

      this.music_playing = 1;
    },
    selectMusic(id) {
      this.index_playing = this.musics.indexOf(this.musics.find(e => e.id === id)) || 0;
      this.initMusic();
    },
    resume() {
      this.music.play();
      this.music_playing = 1;
    },
    pause() {
      this.music.pause();
      this.music_playing = 0;
    },
    previous() {
      if (this.musics[this.index_playing - 1]) this.index_playing -= 1;
      else this.index_playing = this.musics.length - 1;

      this.initMusic();
    },
    next() {
      if (this.musics[this.index_playing + 1]) this.index_playing += 1;
      else this.index_playing = 0;

      this.initMusic();
    },
    volumechange(volume) {
      if (this.music) this.music.volume = volume;
    },
    seeking(seek) {
      if (this.music) this.music.currentTime = seek;
    },
    like() {
      if (!this.likes.includes(this.playingMusic.id)) this.likes.push(this.playingMusic.id)
    },
    unlike() {
      const index = this.likes.indexOf(this.playingMusic.id);
      this.likes.splice(index, 1);
    },
  },
  beforeDestroy() {
    if (this.music) this.music.pause();
  },
  mounted() {
    this.music.addEventListener('volumechange', () => {
      this.volume = this.music.volume;
    });

    this.music.addEventListener('timeupdate', () => {
      this.duration = Math.round(this.music.duration) || 0;
      this.current_time = this.music.currentTime;
    });

    this.music.addEventListener('ended', this.next);

    this.music.volume = 0.2;
  },
}
</script>

<style>
.background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  filter: blur(1rem);
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .3s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

.scrolling-text {
  width: fit-content;
  min-width: 100%;
  text-align: left;
  transition: .5s linear;
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
