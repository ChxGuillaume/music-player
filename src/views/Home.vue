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
          :music="musics[index_playing]"
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
      />
      <MusicShortcuts/>
    </v-container>
  </v-main>
</template>

<script>
import MusicPlayer from "../components/MusicPlayer.vue";
import MusicShortcuts from "../components/MusicShortcuts.vue";

export default {
  name: 'Home',
  components: {
    MusicShortcuts,
    MusicPlayer,
  },
  data() {
    return {
      index_playing: 0,
      musics: [
        {
          title: 'K/DA - MORE, avec Madison Beer, (G)I-DLE, Lexie Liu, Jaira Burns, Séraphine',
          image: require('../assets/musics/images/KDA_MORE.jpg'),
          mp3: require('../assets/musics/KDA_MORE.mp3'),
        },
        {
          title: 'K/DA - THE BADDEST ft. (G)I-DLE, Bea Miller, Wolftyla (clip officiel de paroles)',
          image: require('../assets/musics/images/KDA_BADDEST.jpg'),
          mp3: require('../assets/musics/KDA_BADDEST.mp3'),
        },
        {
          title: 'K/DA - POP/STARS (ft. Madison Beer, (G)I-DLE, Jaira Burns)',
          image: require('../assets/musics/images/KDA_POP_STARS.jpg'),
          mp3: require('../assets/musics/KDA_POP_STARS.mp3'),
        },
      ],
      music: new Audio(),
      music_playing: -1,
      volume: 1,
      duration: 1,
      current_time: 0,
      shortcuts_event: undefined,
    }
  },
  computed: {
    image() {
      return this.playingMusic.image;
    },
    playingMusic() {
      return this.musics[this.index_playing];
    }
  },
  methods: {
    initMusic() {
      if (this.music) {
        this.music.pause();
      }
      this.music.src = this.playingMusic.mp3;

      this.music.play();
      this.duration = this.music.duration;

      this.music.addEventListener('ended', this.next);

      this.music_playing = 1;
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
  },
  beforeDestroy() {
    if (this.music) this.music.pause();
    document.removeEventListener('keydown', this.shortcuts_event);
  },
  mounted() {
    this.music.addEventListener('volumechange', () => {
      this.volume = this.music.volume;
    });

    this.music.addEventListener('timeupdate', () => {
      this.duration = Math.round(this.music.duration) || 0;
      this.current_time = this.music.currentTime;
    })

    this.shortcuts_event = document.body.addEventListener('keydown', (ev) => {
      if (ev.shiftKey && ev.ctrlKey && ev.code === 'ArrowRight') {
        if (this.music) {
          this.music.currentTime += 5;
        }
      } else if (ev.shiftKey && ev.ctrlKey && ev.code === 'ArrowLeft') {
        if (this.music) {
          this.music.currentTime -= 5;
        }
      } else if (ev.ctrlKey && ev.code === 'ArrowRight') {
        this.next()
      } else if (ev.ctrlKey && ev.code === 'ArrowLeft') {
        this.previous()
      } else if (ev.ctrlKey && ev.code === 'ArrowDown') {
        if (this.music && this.music.volume > 0) this.music.volume -= Math.min(this.music.volume, 0.1);
      } else if (ev.ctrlKey && ev.code === 'ArrowUp') {
        if (this.music && this.music.volume < 1) this.music.volume += Math.min(1 - this.music.volume, 0.1);
      } else if (ev.ctrlKey && ev.code === 'Space') {
        if (this.music_playing === -1) this.initMusic();
        else if (this.music_playing === 0) this.resume();
        else if (this.music_playing === 1) this.pause();
      }
    })
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
</style>
