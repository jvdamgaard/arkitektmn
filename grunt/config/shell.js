/**
 * Run shell tasks
 */

module.exports = {
    doxx: {
        command: 'doxx --source <%= app.source %>/scripts --target .tmp/js --template <%= app.docs %>/lib/doxx-template.jade'
    }
};
