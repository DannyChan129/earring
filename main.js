require.config({
    baseUrl: './lib',
    paths: {
        jquery: 'https://s0.babyfs.cn/m/template/common/jquery.min',
        imgpreload: 'https://s0.babyfs.cn/m/template/common/jquery.imgpreload.min',
        setScreenHoriz: "https://s0.babyfs.cn/m/template/common/setScreenHoriz",
        myApp: '../app',
        useImgPreload: 'useImgPreload',
        common: 'common',
        request: '../RequestData',
        map: 'https://s0.babyfs.cn/op/arch/1/53a65261cefa46c1842de75b16977ed7/_commonjs/map',
        gameCountDown: '../js/gameCountDown',
        starts:'https://s0.babyfs.cn/op/arch/1/341b738c45ef47f49ba0af5278426a92/starts',
        preload:'preload'
    },
    shim: {
        'imgpreload': {
            deps: ['jquery'],
            exports: 'imgpreload'
        }
    }
})

require(['myApp'])
