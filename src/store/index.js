import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    artists: [
      { id: 1, name: 'K/DA' },
      { id: 2, name: 'League of Legends' },
    ],
    musics: [
      {
        id: 0,
        title: 'VILLAIN',
        image: 'https://songs.nekotiki.fr/thumbnails/KDA_VILLAIN.jpg',
        mp3: 'https://songs.nekotiki.fr/musics/KDA_VILLAIN.mp3',
        author: { id: 1, name: 'K/DA' },
        feat: ['Madison Beer', 'Kim Petras'],
      },
      {
        id: 1,
        title: 'MORE',
        image: 'https://songs.nekotiki.fr/thumbnails/KDA_MORE.jpg',
        mp3: 'https://songs.nekotiki.fr/musics/KDA_MORE.mp3',
        author: { id: 1, name: 'K/DA' },
        feat: ['Madison Beer', '(G)I-DLE', 'Lexie Liu', 'Jaira Burns', 'Seraphine'],
      },
      {
        id: 2,
        title: 'THE BADDEST',
        image: 'https://songs.nekotiki.fr/thumbnails/KDA_BADDEST.jpg',
        mp3: 'https://songs.nekotiki.fr/musics/KDA_BADDEST.mp3',
        author: { id: 1, name: 'K/DA' },
        feat: ['(G)I-DLE', 'Bea Miller', 'Wolftyla'],
      },
      {
        id: 3,
        title: 'POP/STARS',
        image: 'https://songs.nekotiki.fr/thumbnails/KDA_POP_STARS.jpg',
        mp3: 'https://songs.nekotiki.fr/musics/KDA_POP_STARS.mp3',
        author: { id: 1, name: 'K/DA' },
        feat: ['Madison Beer', '(G)I-DLE', 'Jaira Burns'],
      },
      {
        id: 4,
        title: 'WARRIORS',
        image: 'https://songs.nekotiki.fr/thumbnails/WARRIORS.jpg',
        mp3: 'https://songs.nekotiki.fr/musics/WARRIORS.mp3',
        author: { id: 2, name: 'League of Legends' },
        feat: ['Imagine Dragons'],
      },
      {
        id: 5,
        title: 'RISE',
        image: 'https://songs.nekotiki.fr/thumbnails/RISE.jpg',
        mp3: 'https://songs.nekotiki.fr/musics/RISE.mp3',
        author: { id: 2, name: 'League of Legends' },
        feat: ['The Glitch Mob', 'Mako', 'The Word Alive'],
      },
      {
        id: 6,
        title: 'LEGENDS NEVER DIE',
        image: 'https://songs.nekotiki.fr/thumbnails/LEGENDS_NEVER_DIE.jpg',
        mp3: 'https://songs.nekotiki.fr/musics/LEGENDS_NEVER_DIE.mp3',
        author: { id: 2, name: 'League of Legends' },
        feat: ['Against The Current'],
      },
      {
        id: 7,
        title: 'TRUE DAMAGE GIANTS',
        image: 'https://songs.nekotiki.fr/thumbnails/TRUE_DAMAGE_GIANTS.jpg',
        mp3: 'https://songs.nekotiki.fr/musics/TRUE_DAMAGE_GIANTS.mp3',
        author: { id: 2, name: 'League of Legends' },
        feat: ['Becky G', 'Keke Palmer', 'SOYEON', 'DUCKWRTH', 'Thutmose'],
      },
      {
        id: 8,
        title: 'GET JINXED',
        image: 'https://songs.nekotiki.fr/thumbnails/GET_JINXED.jpg',
        mp3: 'https://songs.nekotiki.fr/musics/GET_JINXED.mp3',
        author: { id: 2, name: 'League of Legends' },
        feat: [],
      },
      {
        id: 9,
        title: 'PHOENIX',
        image: 'https://songs.nekotiki.fr/thumbnails/PHOENIX.jpg',
        mp3: 'https://songs.nekotiki.fr/musics/PHOENIX.mp3',
        author: { id: 2, name: 'League of Legends' },
        feat: ['Cailin Russo', 'Chrissy Costanza'],
      },
      {
        id: 10,
        title: 'IGNITE',
        image: 'https://songs.nekotiki.fr/thumbnails/IGNITE.jpg',
        mp3: 'https://songs.nekotiki.fr/musics/IGNITE.mp3',
        author: { id: 2, name: 'League of Legends' },
        feat: ['Zedd'],
      },
      {
        id: 11,
        title: 'AWAKEN',
        image: 'https://songs.nekotiki.fr/thumbnails/AWAKEN.jpg',
        mp3: 'https://songs.nekotiki.fr/musics/AWAKEN.mp3',
        author: { id: 2, name: 'League of Legends' },
        feat: ['Valerie Broussard'],
      },
      {
        id: 12,
        title: 'WARRIORS',
        image: 'https://songs.nekotiki.fr/thumbnails/WARRIORS_CINEMATIC.jpg',
        mp3: 'https://songs.nekotiki.fr/musics/WARRIORS_CINEMATIC.mp3',
        author: { id: 2, name: 'League of Legends' },
        feat: ['2WEI', 'Edda Hayes'],
      },
      {
        id: 13,
        title: 'DRUM GO DUM',
        image: 'https://songs.nekotiki.fr/thumbnails/DRUM_GO_DUM.jpg',
        mp3: 'https://songs.nekotiki.fr/musics/DRUM_GO_DUM.mp3',
        author: { id: 2, name: 'League of Legends' },
        feat: ['Aluna', 'Wolftyla', 'Bekuh BOOM'],
      },
      {
        id: 14,
        title: 'I\'LL SHOW YOU',
        image: 'https://songs.nekotiki.fr/thumbnails/I-LL_SHOW_YOU.jpg',
        mp3: 'https://songs.nekotiki.fr/musics/I-LL_SHOW_YOU.mp3',
        author: { id: 1, name: 'K/DA' },
        feat: ['TWICE', 'Bekuh BOOM', 'Annika Wells'],
      },
    ],
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
