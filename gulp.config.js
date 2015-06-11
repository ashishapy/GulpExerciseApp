'use strict';

module.exports = function () {
    var client = './src/client/',
        clientApp = client + 'app/',
        server = './src/server/',
        temp = './.temp/',
        root = './';
    
    var config = {
        
        alljs: [
            './src/**/*.js',
            './*.js'
        ],
        build: './build/',
        client: client,
        css: temp + 'styles.css',
        fonts: './bower_components/font-awesome/fonts/**/*.*',
        html: clientApp + '**/*.html',
        htmltemplates: clientApp + '**/*.html',
        images: client + 'images/**/*.*',   
        index: client + 'index.html',
        js: [
            clientApp + '**/*.module.js',
            clientApp + '**/*.js',
            '!' + clientApp + '**/*.spec.js'
        ],
        
        less: client + 'styles/styles.less',
        root: root,
        server: server,
        temp: temp,
        
        /*
        * Optimized files
        */
        optimized: {
            app: 'app.js',
            lib: 'lib.js'
        },
        
        /**
        * template cache
        */
        templateCache: {
            file: 'templates.js',
            options: {
                module: 'app.core',
                standalone: false,
                root: 'app/'
            }
        },
        
        /**
        * browser sync
        */
        browserReloadDelay: 1000,
        
        /**
        * Bower and NPM locations
        */
        bower: {
            json: require('./bower.json'),
            directory: './bower_components/',
            ignorePath: '../..'
        },
        packages: [
            './package.json',
            './bower.json'
        ],
        
        /**
        *   Node settings
        */
        defaultPort: 7203,
        nodeServer: server + 'app.js',
    };
    
    config.getWiredepDefaultOptions = function() {
        var options = {
            bowerJson: config.bower.json,
            directory: config.bower.directory,
            ignorePath: config.bower.ignorePath
        };
        return options;
    };
    return config;
};
