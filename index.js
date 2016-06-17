'use strict';

var chalk = require('chalk'),
    notifier = require('node-notifier'),
    defaultQuotes = require('./data/quotes.json');

function pickRandomQuote(quotes) {
    return quotes[Math.floor(Math.random() * quotes.length)];
}

function WebpackQuotes(config) {
    this.additionalQuotes = config.additionalQuotes || [];
    this.secondsBeforeApology = config.secondsBeforeApology || 20;
}

WebpackQuotes.prototype.apply = function (compiler) {
    var welcomeMessage = '- I\'m compiling the assets, have you ever thought about the following words?\n',
        additionalQuotes = this.additionalQuotes,
        secondsBeforeApology = this.secondsBeforeApology,
        allQuotes = defaultQuotes.patience.concat(additionalQuotes);

    compiler.plugin('compile', function () {
        var quote = pickRandomQuote(allQuotes);

        console.log(chalk.bold.white('\n\nWebpack: ') + chalk.white(welcomeMessage));
        console.log(chalk.gray('   ' + quote.text));
        console.log(chalk.gray('  ― ' + chalk.underline(quote.author) + '\n\n'));
    });

    compiler.plugin('this-compilation', function (compilation) {
        var start = Date.now();

        compilation.plugin('optimize-assets', function (assets, callback) {
            var secondsElapsed = (Date.now() - start) / 1000,
                apology = secondsElapsed > secondsBeforeApology ? ' Sorry for the delay.' : '',
                webpackQuote = '- Sir, your assets are ready!' + apology;

            notifier.notify({
                title: 'Webpack says:',
                message: webpackQuote
            });

            console.log(chalk.bold.white('\n\nWebpack: ') + chalk.white(webpackQuote) + '\n\n');

            callback();
        });
    });
};

module.exports = WebpackQuotes;
