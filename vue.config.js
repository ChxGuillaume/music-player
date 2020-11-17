module.exports = {
    "transpileDependencies": [
        "vuetify"
    ],
    chainWebpack: config => {
        config
            .plugin('html')
            .tap(args => {
                args[0].title = "League of Legends Songs";
                return args;
            })
    },
    pwa: {
        name: 'League of Legends Songs',
        themeColor: 'rgb(194, 143, 44)',
        msTileColor: '#000000',
        appleMobileWebAppCapable: 'yes',
        appleMobileWebAppStatusBarStyle: 'black',

        iconPaths: {
            msTileImage: 'img/icons/mstile-150x150.png'
        },

        // configure the workbox plugin
        // workboxPluginMode: 'InjectManifest',
        // workboxOptions: {
        //     // swSrc is required in InjectManifest mode.
        //     swSrc: 'dev/sw.js',
        //     // ...other Workbox options...
        // }
    }
}