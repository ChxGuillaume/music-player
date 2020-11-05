<template>
  <div>
    <v-dialog width="400">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
            class="d-none d-md-block"
            color="primary"
            fixed
            fab
            small
            dark
            bottom
            left
            v-bind="attrs"
            v-on="on"
        >
          <v-icon>mdi-information-variant</v-icon>
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="headline text-center">
          <div class="mx-auto">Shortcuts</div>
        </v-card-title>

        <v-card-text class="text-center">
          <v-row class="my-2">
            <v-col cols="12" class="text-center py-1">
              <v-chip class="mx-1" color="primary" label outlined x-small>
                Ctrl
              </v-chip>
              +
              <v-chip class="mx-1" color="primary" label outlined x-small>
                Space
              </v-chip>
            </v-col>
            <v-col cols="12" class="py-1">
              Play/Pause music
            </v-col>
          </v-row>
          <v-divider />
          <v-row class="my-2">
            <v-col cols="12" class="text-center py-1">
              <v-chip class="mx-1" color="primary" label outlined x-small>
                Ctrl
              </v-chip>
              +
              <v-chip class="mx-1" color="primary" label outlined x-small>
                Left
              </v-chip>
            </v-col>
            <v-col cols="12" class="py-1">
              Previous music
            </v-col>
          </v-row>
          <v-divider />
          <v-row class="my-2">
            <v-col cols="12" class="text-center py-1">
              <v-chip class="mx-1" color="primary" label outlined x-small>
                Ctrl
              </v-chip>
              +
              <v-chip class="mx-1" color="primary" label outlined x-small>
                Right
              </v-chip>
            </v-col>
            <v-col cols="12" class="py-1">
              Next music
            </v-col>
          </v-row>
          <v-divider />
          <v-row class="my-2">
            <v-col cols="12" class="text-center py-1">
              <v-chip class="mx-1" color="primary" label outlined x-small>
                Ctrl
              </v-chip>
              +
              <v-chip class="mx-1" color="primary" label outlined x-small>
                Up
              </v-chip>
            </v-col>
            <v-col cols="12" class="py-1">
              Increase Volume
            </v-col>
          </v-row>
          <v-divider />
          <v-row class="my-2">
            <v-col cols="12" class="text-center py-1">
              <v-chip class="mx-1" color="primary" label outlined x-small>
                Ctrl
              </v-chip>
              +
              <v-chip class="mx-1" color="primary" label outlined x-small>
                Down
              </v-chip>
            </v-col>
            <v-col cols="12" class="py-1">
              Decrease Volume
            </v-col>
          </v-row>
          <v-divider />
          <v-row class="my-2">
            <v-col cols="12" class="py-1">
              <v-chip class="mx-1" color="primary" label outlined x-small>
                Ctrl
              </v-chip>
              +
              <v-chip class="mx-1" color="primary" label outlined x-small>
                Shift
              </v-chip>
              +
              <v-chip class="mx-1" color="primary" label outlined x-small>
                Right
              </v-chip>
            </v-col>
            <v-col cols="12" class="py-1">
              Seek +5 sec
            </v-col>
          </v-row>
          <v-divider />
          <v-row class="my-2">
            <v-col cols="12" class="py-1">
              <v-chip class="mx-1" color="primary" label outlined x-small>
                Ctrl
              </v-chip>
              +
              <v-chip class="mx-1" color="primary" label outlined x-small>
                Shift
              </v-chip>
              +
              <v-chip class="mx-1" color="primary" label outlined x-small>
                Left
              </v-chip>
            </v-col>
            <v-col cols="12" class="py-1">
              Seek -5 sec
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "MusicShortcuts",
}
</script>

<style scoped>

</style>
