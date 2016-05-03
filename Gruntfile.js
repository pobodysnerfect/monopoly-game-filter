module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            files: ['public/styles/**', 'public/js/**'],
            tasks: ['build']
        },
        concat: {
            options: {
                separator: '/** file break */'
            },
            dist: {
                src: ['node_modules/bootswatch/paper/bootstrap.min.css', 'public/styles/**/*.css'],
                dest: 'public/dist/<%= pkg.name %>.css'
            }
        },
        webpack: {
            build: {},
            options: {
                entry: [
                    "./public/js/index.js"
                ],
                output: {
                    path: "./public/dist",
                    filename: "<%= pkg.name %>.js"
                },
                module: {
                    loaders: [
                        {
                            test: /\.jsx?$/,
                            exclude: /(node_modules|bower_components)/,
                            loader: 'babel-loader',
                            query: {
                                presets: ['babel-preset-es2015'],
                                plugins: [
                                    ['transform-es2015-classes', {loose: true}]
                                ]
                            }
                        }
                    ]
                },
                resolve: {
                    root: './public/js',
                    modulesDirectories: ['node_modules'],
                    extensions: ['', '.js', '.jsx']
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-webpack');
    grunt.registerTask('build', ['concat', 'webpack:build']);
    grunt.registerTask('default', ['build', 'watch']);

};
