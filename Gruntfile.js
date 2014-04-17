var fs = require('fs');

module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);

    // AWS S3
    var accessKeyId = process.env.AWS_S3_ACCESS_KEY_ID;
    var secretAccessKey = process.env.AWS_S3_ACCESS_KEY_ID;

    // Find local aws s3 deploy keys
    var homePath = process.env[(process.platform === 'win32') ? 'USERPROFILE' : 'HOME'];
    var awsConfigPath = homePath + '/Dropbox/Dokumenter/Hjemmesider/aws-s3-keys/arkitektmn.json';
    if (fs.existsSync(awsConfigPath)) {
        var awsConfig = require(awsConfigPath);
        accessKeyId = awsConfig.accessKeyId;
        secretAccessKey = awsConfig.secretAccessKey;
    }

    var config = {
        app: {
            source: 'app',
            dist: 'dist'
        },
        pkg: require('./package.json'),
        s3: {
            options: {
                accessKeyId: accessKeyId,
                secretAccessKey: secretAccessKey,
                bucket: 'arkitektmn',
                headers: {
                    CacheControl: new Date().getTime() + 1000 * 60 * 60 * 24,
                    Expires: new Date(Date.now() + 1000 * 60 * 60 * 24).toUTCString()
                }
            },
            build: {
                cwd: 'dist/',
                src: '**'
            }
        },
        imagemin: {
            dist: {
                options: {
                    pngquant: true
                },
                files: [{
                    expand: true,
                    cwd: '.tmp/img',
                    src: '**/*.{gif,jpeg,jpg,png}',
                    dest: 'dist/img'
                }]
            }
        },
        responsive_images: {
            images: {
                options: {
                    sizes: [{
                        name: 'xs',
                        width: 400,
                        height: 267,
                        quality: 75
                    }, {
                        name: 's',
                        width: 600,
                        height: 400,
                        quality: 75
                    }, {
                        name: 'm',
                        width: 800,
                        height: 534,
                        quality: 75
                    }, {
                        name: 'l',
                        width: 1000,
                        height: 667,
                        quality: 75
                    }, {
                        name: 'xl',
                        width: 1200,
                        height: 800,
                        quality: 75
                    }],
                    aspectRatio: false
                },
                files: [{
                    expand: true,
                    src: ['**/*.{jpg,gif,png}'],
                    cwd: 'app/img/',
                    dest: '.tmp/img/'
                }]
            }
        }
    };

    grunt.initConfig(config);

    grunt.registerTask('build', [
        'responsive_images',
        'imagemin'
    ]);

    grunt.registerTask('deploy', [
        'build',
        's3'
    ]);
};
