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
                        name: 'portrait-phone',
                        width: 320,
                        height: 480,
                        quality: 80
                    }, {
                        name: 'portrait-phone-retina',
                        width: 640,
                        height: 1136,
                        quality: 60
                    }, {
                        name: 'portrait-tablet',
                        width: 768,
                        height: 1024,
                        quality: 80
                    }, {
                        name: 'portrait-tablet-retina',
                        width: 1536,
                        height: 2048,
                        quality: 50
                    }, {
                        name: 'landscape-phone',
                        width: 480,
                        height: 320,
                        quality: 80
                    }, {
                        name: 'landscape-phone-retina',
                        width: 1136,
                        height: 640,
                        quality: 60
                    }, {
                        name: 'landscape-tablet',
                        width: 1024,
                        height: 768,
                        quality: 80
                    }, {
                        name: 'landscape-desktop',
                        width: 1366,
                        height: 1024,
                        quality: 75
                    }, {
                        name: 'landscape-desktop-large',
                        width: 1920,
                        height: 1200,
                        quality: 75
                    }, {
                        name: 'landscape-tablet-retina',
                        width: 2048,
                        height: 1536,
                        quality: 50
                    }],
                    aspectRatio: false,
                    upscale: true,
                    engine: 'im'
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
};
