var fs = require('fs');

module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);

    // AWS S3
    var awsS3 = {
        accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY
    };

    // Find local aws s3 deploy keys
    var homePath = process.env[(process.platform === 'win32') ? 'USERPROFILE' : 'HOME'];
    var awsConfigPath = homePath + '/Dropbox/Dokumenter/Hjemmesider/aws-s3-keys/arkitektmn.json';
    if (fs.existsSync(awsConfigPath)) {
        awsS3 = require(awsConfigPath);
    }

    var config = {
        app: {
            source: 'app',
            dist: 'dist'
        },
        pkg: require('./package.json'),
        s3: {
            options: {
                accessKeyId: new Buffer(awsS3.accessKeyId, 'base64').toString('ascii'),
                secretAccessKey: new Buffer(awsS3.secretAccessKey, 'base64').toString('ascii'),
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
            'images': {
                options: {
                    sizes: [{
                        name: 'portrait-x-small',
                        width: 320,
                        height: 480,
                        quality: 85,
                        aspectRatio: false
                    }, {
                        name: 'portrait-small',
                        width: 768,
                        height: 1136,
                        quality: 75,
                        aspectRatio: false
                    }, {
                        name: 'portrait-x-large',
                        width: 1536,
                        height: 2048,
                        quality: 60,
                        aspectRatio: false
                    }, {
                        name: 'landscape-x-small',
                        width: 480,
                        height: 320,
                        quality: 85,
                        aspectRatio: false
                    }, {
                        name: 'landscape-small',
                        width: 1136,
                        height: 768,
                        quality: 75,
                        aspectRatio: false
                    }, {
                        name: 'landscape-medium',
                        width: 1366,
                        height: 1024,
                        quality: 75,
                        aspectRatio: false
                    }, {
                        name: 'landscape-large',
                        width: 1920,
                        height: 1200,
                        quality: 60,
                        aspectRatio: false
                    }, {
                        name: 'landscape-x-large',
                        width: 2048,
                        height: 1536,
                        quality: 60,
                        aspectRatio: false
                    }]
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
