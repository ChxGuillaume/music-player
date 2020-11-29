<template>
  <v-row class="my-auto">
    <v-col>
      <v-card
          :loading="loading"
          class="mx-auto"
          max-width="400"
          elevation="15"
          style="margin-bottom: 100px;"
      >
        <div style="height: 224px; border-radius: 4px;">
          <transition :name="nextTrack ? 'to-right' : 'to-left'">
            <v-img
                class="image"
                height="224"
                :src="music.image"
                :key="music.title"
                style="border-radius: 4px"
            />
          </transition>
        </div>

        <v-btn
            absolute
            top
            right
            icon
            @click="music.liked ? $emit('unlike') : $emit('like')"
        >
          <transition name="like">
            <v-icon class="like-btn" key="like" v-if="music.liked">mdi-heart</v-icon>
            <v-icon class="like-btn" key="unlike" v-else>mdi-heart-outline</v-icon>
          </transition>
        </v-btn>

        <v-card-text class="text-left text--primary">
          <div class="text-h6">{{ music.title }}</div>
          <div class="caption grey--text">{{ music.author }}</div>
          <div v-if="music.feat.length" class="caption grey--text">ft. {{ music.feat.join(', ') }}</div>
        </v-card-text>

        <v-card-actions class="justify-center">
          <v-row>
            <v-col cols="12" md="6" class="px-0">
              <v-btn color="primary" text @click="previous">
                <v-icon>mdi-skip-previous</v-icon>
              </v-btn>

              <v-btn color="primary" text @click="$emit('start')" v-if="status === -1">
                <v-icon>mdi-play-pause</v-icon>
              </v-btn>
              <v-btn
                  :loading="loading"
                  color="primary"
                  text
                  @click="$emit('resume')"
                  v-else-if="status === 0"
              >
                <v-icon>mdi-play</v-icon>
              </v-btn>
              <v-btn
                  :loading="loading"
                  color="primary"
                  text
                  @click="$emit('pause')"
                  v-else
              >
                <v-icon>mdi-pause</v-icon>
              </v-btn>

              <v-btn color="primary" text @click="next">
                <v-icon>mdi-skip-next</v-icon>
              </v-btn>
            </v-col>
            <v-col cols="12" md="6">
              <v-slider
                  class="d-block"
                  :value="volume"
                  color="primary"
                  min="0"
                  max="1"
                  step=".01"
                  @input="$emit('volumechange', $event)"
                  hide-details
              />
            </v-col>
          </v-row>
        </v-card-actions>

        <v-card-actions>
          {{ seekTime|formatTime }}
          <v-slider
              class="d-block mx-2"
              :value="seekTime"
              color="white"
              min="0"
              :max="duration"
              @mousedown="mouseDown"
              @mouseup="mouseUp"
              @input="seek"
              hide-details
          />
          {{ duration|formatTime }}
        </v-card-actions>

        <v-btn
            text
            height="48px"
            width="100%"
            color="primary"
            @click="$emit('open-drawer')"
        >
          <v-icon left>mdi-music</v-icon>
          My Music
        </v-btn>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
function addZero(val) {
  return val < 10 ? '0' + val : val;
}

export default {
  name: "MusicPlayer",
  props: {
    volume: {
      type: Number,
      required: true,
    },
    status: {
      type: Number,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    currentTime: {
      type: Number,
      required: true,
    },
    music: {
      type: Object,
      required: true,
    },
    loading: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      mouse_down: false,
      seek_time: 0,
      seek_sent: true,
      nextTrack: true,
      shortcuts_event: undefined,
    }
  },
  computed: {
    seekTime() {
      return this.mouse_down ? this.seek_time : Math.floor(this.currentTime);
    },
  },
  methods: {
    previous() {
      this.nextTrack = false;
      this.$emit('previous');
      setTimeout(() => {
        this.nextTrack = true;
      }, 100);
    },
    next() {
      this.nextTrack = true;
      this.$emit('next');
    },
    mouseDown() {
      this.mouse_down = true;
      this.seek_sent = false;
    },
    mouseUp() {
      this.mouse_down = false;
      this.seek(this.seek_time);
    },
    seek(ev) {
      if (!this.mouse_down && !this.seek_sent) {
        this.$emit('seeking', this.seek_time);
        this.seek_sent = true;
      } else {
        this.seek_time = ev;
      }
    },
  },
  filters: {
    formatTime(time) {
      if (!time) time = 0;

      const sec = addZero(time % 60);
      const min = addZero(Math.floor(time / 60));

      return `${min}:${sec}`
    },
  },
  beforeDestroy() {
    document.removeEventListener('keydown', this.shortcuts_event);
  },
  mounted() {
    this.shortcuts_event = document.body.addEventListener('keydown', (ev) => {
      if (ev.shiftKey && ev.ctrlKey && ev.code === 'ArrowRight') {
        this.mouse_down = false;
        this.seek_sent = false;
        this.seek_time = this.currentTime + 5;
        this.seek(this.seek_time);
      } else if (ev.shiftKey && ev.ctrlKey && ev.code === 'ArrowLeft') {
        this.mouse_down = false;
        this.seek_sent = false;
        this.seek_time = this.currentTime - 5;
        this.seek(this.seek_time);
      } else if (ev.ctrlKey && ev.code === 'ArrowRight') {
        this.next();
      } else if (ev.ctrlKey && ev.code === 'ArrowLeft') {
        this.previous();
      } else if (ev.ctrlKey && ev.code === 'ArrowDown') {
        const volume = this.volume - Math.min(this.volume, 0.1);
        this.$emit('volumechange', volume);
      } else if (ev.ctrlKey && ev.code === 'ArrowUp') {
        const volume = this.volume + Math.min(1 - this.volume, 0.1);
        this.$emit('volumechange', volume);
      } else if (ev.ctrlKey && ev.code === 'Space') {
        if (this.status === -1) this.$emit('start');
        else if (this.status === 0) this.$emit('resume');
        else if (this.status === 1) this.$emit('pause');
      }
    })
  },
}
</script>

<style scoped>
.image {
  position: absolute;
}

.to-left-enter-active, .to-left-leave-active,
.to-right-enter-active, .to-right-leave-active {
  transition: .3s ease;
}

.to-left-enter {
  transform: translate(100%) scale(.2);
}

.to-left-leave-to {
  transform: translate(-100%) scale(.2);
}

.to-right-enter {
  transform: translate(-100%) scale(.2);
}

.to-right-leave-to {
  transform: translate(100%) scale(.2);
}

.like-btn {
  position: absolute;
}

.like-enter-active, .like-leave-active {
  transition: .3s ease;
}

.like-enter {
  opacity: 0;
  transform: rotate(-135deg) scale(.3);
}

.like-leave-to {
  opacity: 0;
  transform: rotate(135deg) scale(.3);
}
</style>
