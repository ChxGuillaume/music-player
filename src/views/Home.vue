<template>
  <v-main>
    <v-container fill-height fluid>
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
      <MusicShortcuts/>
      <MusicDrawer
          :likes="likes"
          :musics="musics"
          :music_id="playingMusic.id"
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
          id: 0,
          title: 'VILLAIN',
          image: 'https://songs.nekotiki.fr/thumbnails/KDA_VILLAIN.jpg',
          mp3: 'https://songs.nekotiki.fr/musics/KDA_VILLAIN.mp3',
          author: 'K/DA',
          feat: ['Madison Beer', 'Kim Petras'],
        },
        {
          id: 1,
          title: 'MORE',
          image: 'https://songs.nekotiki.fr/thumbnails/KDA_MORE.jpg',
          mp3: 'https://songs.nekotiki.fr/musics/KDA_MORE.mp3',
          author: 'K/DA',
          feat: ['Madison Beer', '(G)I-DLE', 'Lexie Liu', 'Jaira Burns', 'Seraphine'],
        },
        {
          id: 2,
          title: 'THE BADDEST',
          image: 'https://songs.nekotiki.fr/thumbnails/KDA_BADDEST.jpg',
          mp3: 'https://songs.nekotiki.fr/musics/KDA_BADDEST.mp3',
          author: 'K/DA',
          feat: ['(G)I-DLE', 'Bea Miller', 'Wolftyla'],
        },
        {
          id: 3,
          title: 'POP/STARS',
          image: 'https://songs.nekotiki.fr/thumbnails/KDA_POP_STARS.jpg',
          mp3: 'https://songs.nekotiki.fr/musics/KDA_POP_STARS.mp3',
          author: 'K/DA',
          feat: ['Madison Beer', '(G)I-DLE', 'Jaira Burns'],
        },
        {
          id: 4,
          title: 'WARRIORS',
          image: 'https://songs.nekotiki.fr/thumbnails/WARRIORS.jpg',
          mp3: 'https://songs.nekotiki.fr/musics/WARRIORS.mp3',
          author: 'League of Legends',
          feat: ['Imagine Dragons'],
        },
        {
          id: 5,
          title: 'RISE',
          image: 'https://songs.nekotiki.fr/thumbnails/RISE.jpg',
          mp3: 'https://songs.nekotiki.fr/musics/RISE.mp3',
          author: 'League of Legends',
          feat: ['The Glitch Mob', 'Mako', 'The Word Alive'],
        },
        {
          id: 6,
          title: 'LEGENDS NEVER DIE',
          image: 'https://songs.nekotiki.fr/thumbnails/LEGENDS_NEVER_DIE.jpg',
          mp3: 'https://songs.nekotiki.fr/musics/LEGENDS_NEVER_DIE.mp3',
          author: 'League of Legends',
          feat: ['Against The Current'],
        },
        {
          id: 7,
          title: 'TRUE DAMAGE GIANTS',
          image: 'https://songs.nekotiki.fr/thumbnails/TRUE_DAMAGE_GIANTS.jpg',
          mp3: 'https://songs.nekotiki.fr/musics/TRUE_DAMAGE_GIANTS.mp3',
          author: 'League of Legends',
          feat: ['Becky G', 'Keke Palmer', 'SOYEON', 'DUCKWRTH', 'Thutmose'],
        },
        {
          id: 8,
          title: 'GET JINXED',
          image: 'https://songs.nekotiki.fr/thumbnails/GET_JINXED.jpg',
          mp3: 'https://songs.nekotiki.fr/musics/GET_JINXED.mp3',
          author: 'League of Legends',
          feat: [],
        },
        {
          id: 9,
          title: 'PHOENIX',
          image: 'https://songs.nekotiki.fr/thumbnails/PHOENIX.jpg',
          mp3: 'https://songs.nekotiki.fr/musics/PHOENIX.mp3',
          author: 'League of Legends',
          feat: ['Cailin Russo', 'Chrissy Costanza'],
        },
        {
          id: 10,
          title: 'IGNITE',
          image: 'https://songs.nekotiki.fr/thumbnails/IGNITE.jpg',
          mp3: 'https://songs.nekotiki.fr/musics/IGNITE.mp3',
          author: 'League of Legends',
          feat: ['Zedd'],
        },
        {
          id: 11,
          title: 'AWAKEN',
          image: 'https://songs.nekotiki.fr/thumbnails/AWAKEN.jpg',
          mp3: 'https://songs.nekotiki.fr/musics/AWAKEN.mp3',
          author: 'League of Legends',
          feat: ['Valerie Broussard'],
        },
        {
          id: 12,
          title: 'WARRIORS',
          image: 'https://songs.nekotiki.fr/thumbnails/WARRIORS_CINEMATIC.jpg',
          mp3: 'https://songs.nekotiki.fr/musics/WARRIORS_CINEMATIC.mp3',
          author: 'League of Legends',
          feat: ['2WEI', 'Edda Hayes'],
        },
        {
          id: 13,
          title: 'DRUM GO DUM',
          image: 'https://songs.nekotiki.fr/thumbnails/DRUM_GO_DUM.jpg',
          mp3: 'https://songs.nekotiki.fr/musics/DRUM_GO_DUM.mp3',
          author: 'League of Legends',
          feat: ['Aluna', 'Wolftyla', 'Bekuh BOOM'],
        },
        {
          id: 14,
          title: 'I\'LL SHOW YOU',
          image: 'https://songs.nekotiki.fr/thumbnails/I-LL_SHOW_YOU.jpg',
          mp3: 'https://songs.nekotiki.fr/musics/I-LL_SHOW_YOU.mp3',
          author: 'K/DA',
          feat: ['TWICE', 'Bekuh BOOM', 'Annika Wells'],
        },
      ],
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
    volumechange(volume) {
      if (this.music) this.music.volume = volume;
    },
    seeking(seek) {
      if (this.music) this.music.currentTime = seek;
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
