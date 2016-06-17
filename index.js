'use strict';

var chalk = require('chalk'),
    notifier = require('node-notifier'),
    defaultQuotes = require('./data/quotes.json');

function pickRandomQuote(quotes) {
    return quotes[Math.floor(Math.random() * quotes.length)];
}

function displayQuote (allQuotes) {
    var webpackStartMessage = '- I\'m compiling the assets, have you ever thought about the following words?\n',
        quote = pickRandomQuote(allQuotes);

    console.log(chalk.bold.white('\n\nWebpack: ') + chalk.white(webpackStartMessage));
    console.log(chalk.gray('   ' + quote.text));
    console.log(chalk.gray('  ― ' + chalk.underline(quote.author) + '\n\n'));
}

function createAssetsReadyMessage (compilationStartTime, secondsBeforeApology) {
    var secondsElapsed = (Date.now() - compilationStartTime) / 1000;

    return '- Sir, your assets are ready!' + (secondsElapsed > secondsBeforeApology ? ' Sorry for the delay.' : '');
}

function displayAssetsReadiness (notificationsOn, webpackMessage, done) {
    if (notificationsOn) {
        notifier.notify({
            title: 'Webpack says:',
            message: webpackMessage
        });
    }

    console.log(chalk.bold.white('\n\nWebpack: ') + chalk.white(webpackMessage) + '\n\n');

    done();
}

function WebpackQuotes(customConfig) {
    var config = customConfig || {};

    this.defaultQuotes = defaultQuotes.patience;
    this.additionalQuotes = config.additionalQuotes || [];
    this.secondsBeforeApology = config.secondsBeforeApology || 20;
    this.notificationsOn = config.notifications || false;
}

WebpackQuotes.prototype.apply = function (compiler) {
    var additionalQuotes = this.additionalQuotes,
        secondsBeforeApology = this.secondsBeforeApology,
        notificationsOn = this.notificationsOn,
        allQuotes = this.defaultQuotes.concat(additionalQuotes);

    compiler.plugin('compile', function () {
        displayQuote(allQuotes);
    });

    compiler.plugin('this-compilation', function (compilation) {
        var compilationStartTime = Date.now();

        compilation.plugin('optimize-assets', function (_, done) {
            var webpackMessage = createAssetsReadyMessage(compilationStartTime, secondsBeforeApology);

            displayAssetsReadiness(notificationsOn, webpackMessage, done);
        });
    });
};

module.exports = WebpackQuotes;
