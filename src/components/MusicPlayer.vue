<template>
  <v-row class="my-auto">
    <v-col>
      <v-card
          class="mx-auto"
          max-width="400"
          elevation="15"
      >
        <div style="height: 224px; border-radius: 4px;">
          <transition name="fade">
            <v-img
                class="image"
                height="224"
                :src="music.image"
                :key="music.title"
            />
          </transition>
        </div>

        <v-card-text class="text--primary">
          <div>{{ music.title }}</div>
        </v-card-text>

        <v-card-actions class="justify-center">
          <v-row>
            <v-col cols="12" md="6" class="px-0">
              <v-btn color="primary" text @click="$emit('previous')">
                <v-icon>mdi-skip-previous</v-icon>
              </v-btn>

              <v-btn color="primary" text @click="$emit('start')" v-if="status === -1">
                <v-icon>mdi-play-pause</v-icon>
              </v-btn>
              <v-btn color="primary" text @click="$emit('resume')" v-else-if="status === 0">
                <v-icon>mdi-play</v-icon>
              </v-btn>
              <v-btn color="primary" text @click="$emit('pause')" v-else>
                <v-icon>mdi-pause</v-icon>
              </v-btn>

              <v-btn color="primary" text @click="$emit('next')">
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
              ></v-slider>
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
  },
  data() {
    return {
      mouse_down: false,
      seek_time: 0,
      seek_sent: true,
    }
  },
  computed: {
    seekTime() {
      return this.mouse_down ? this.seek_time : Math.floor(this.currentTime);
    },
  },
  methods: {
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
}
</script>

<style scoped>
.image {
  position: absolute;
}
.fade-enter-active, .fade-leave-active {
  transition: .3s ease;
}
.fade-enter {
  transform: translate(-100%) scale(.2);
}
.fade-leave-to {
  transform: translate(100%) scale(.2);
}
</style>
