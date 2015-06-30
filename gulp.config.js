'use strict';

module.exports = function () {
    var client = './src/client/',
        clientApp = client + 'app/',
        report = './report/',
        root = './',
        server = './src/server/',
        specRunnerFile = 'specs.html',
        temp = './.temp/',
        wiredep = require('wiredep'),
        bowerFiles = wiredep({devDependencies: true})['js'];

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
        report: report,
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
        * spec.html, our HTML spec runner
        */
        specRunner: client + specRunnerFile,
        specRunnerFile: specRunnerFile,
        testlibraries: [
            'node_modules/mocha/mocha.js',
            'node_modules/chai/chai.js',
            'node_modules/mocha-clean/index.js',
            'node_modules/sinon-chai/lib/sinon-chai.js'
        ],
        specs: [clientApp + '**/*.spec.js'],
        /*
        * Karma and testing settings
        */
        specHelpers: [client + 'test-helpers/*.js'],
        serverIntegrationSpecs: [client + 'tests/server-integration/**/*.spec.js'],
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
    config.karma = getKarmaOptions();
    return config;
    ///////////////////////
    function getKarmaOptions() {
        var options = {
            files: [].concat(
                bowerFiles,
                config.specHelpers,
                client + '**/*.module.js',
                client + '**/*.js',
                temp + config.templateCache.file,
                config.serverIntegrationSpecs
            ),
            exclude: [],
            coverage: {
                dir: report + 'coverage',
                reporters: [
                    {type: 'html', subdir: 'report-html'},
                    {type: 'lcov', subdir: 'report-lcov'},
                    {type: 'text-summary'}
                ]
            },
            preprocessors: {}
        };
        options.preprocessors[clientApp + '**/!(*.spec)+(.js)'] = ['coverage'];
        return options;
    }
};
