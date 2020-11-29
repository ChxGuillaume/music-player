<template>
  <v-main>
    <v-container class="align-content-center" fill-height fluid>
      <transition name="fade" mode="out-in">
        <div
            class="background"
            :style="{ backgroundImage: 'url(' + image + ')' }"
            :key="image"
        />
        <!-- Background Youtube IDEA -->
        <!-- <iframe width="560" height="315"-->
        <!--         src="https://www.youtube.com/embed/3VTkBuxU4yk?autoplay=1&controls=0&mute=1"-->
        <!--         frameborder="0"-->
        <!--         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"-->
        <!--         allowfullscreen-->
        <!--         style="z-index: 100"-->
        <!-- />-->
      </transition>
      <MusicPlayer
          :status="music_playing"
          :music="playingMusic"
          :volume="volume"
          :duration="duration"
          :currentTime="current_time"
          :loading="music_loading"
          @start="next"
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

      <router-view></router-view>

      <MusicShortcuts
          :volume="volume"
          @volumechange="volumechange"
      />
      <MusicDrawer
          :likes="likes"
          :musics="musics"
          :music_id="playingMusic.id"
          ref="drawer"
          @select-music="selectMusic"
          @add-to-queue="addToQueue"
          @like="likeId"
      />
    </v-container>
  </v-main>
</template>

<script>
import MusicPlayer from "../components/MusicPlayer.vue";
import MusicShortcuts from "../components/MusicShortcuts.vue";
import MusicDrawer from "../components/MusicDrawer.vue";
import { mapState } from 'vuex'

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
      playing_list: [],
      played_list: [],
      music: new Audio(),
      music_playing: -1,
      music_loading: false,
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
    ...mapState({
      musics: state => state.musics,
    })
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
      this.music_loading = true;
    },
    selectMusic(id) {
      const music_index = this.musics.findIndex(e => e.id === id);

      if (music_index > -1) {
        this.played_list.push(this.playingMusic.id);
        this.index_playing = music_index;
      }

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
      const previous_music = this.played_list.pop();
      this.playing_list.unshift(this.playingMusic.id);

      const previous_music_index = this.musics.findIndex(e => e.id === previous_music);
      if (previous_music_index > -1) this.index_playing = previous_music_index;

      this.initMusic();
    },
    next() {
      const next_music = this.playing_list.shift();
      this.played_list.push(this.playingMusic.id);

      this.index_playing = this.musics.findIndex(e => e.id === next_music);
      if (!this.playing_list.includes(next_music)) this.playing_list.push(next_music);

      this.initMusic();
    },
    addToQueue(id) {
      this.playing_list.unshift(id);
    },
    volumechange(volume) {
      if (this.music) this.music.volume = volume;
    },
    seeking(seek) {
      if (this.music) this.music.currentTime = seek;
    },
    likeId(id) {
      if (!this.likes.includes(id)) this.likes.push(id);
      this.saveLikes();
    },
    like() {
      if (!this.likes.includes(this.playingMusic.id)) this.likes.push(this.playingMusic.id);
      this.saveLikes();
    },
    unlike() {
      const index = this.likes.indexOf(this.playingMusic.id);
      this.likes.splice(index, 1);
      this.saveLikes();
    },
    saveLikes() {
      localStorage.setItem('liked_songs', JSON.stringify(this.likes));
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

    this.music.addEventListener('loadeddata', () => {
      this.music_loading = false;
    });

    this.music.addEventListener('play', () => {
      this.music_playing = 1;
    });

    this.music.addEventListener('pause', () => {
      this.music_playing = 0;
    });

    this.music.addEventListener('ended', this.next);

    this.music.volume = 0.2;

    this.likes = JSON.parse(localStorage.getItem('liked_songs')) || [];

    this.playing_list = this.musics.map(e => e.id);
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
