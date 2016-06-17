Webpack Quotes plugin
===

Reached already the maximum speed of webpack? Try psychology.

Reduce the feeling of slow compilation by providing great meaningful quote to think about.

![Image of Webpack Quote](/assets/quote.png)

[![Build Status](https://travis-ci.org/Arturszott/webpack-patience.svg)](https://travis-ci.org/Arturszott/webpack-patience)

Instalation
---

In your webpack config you have to add a plugin to the configuration:

```
if (environment === 'dev') {
    config.plugins.push(new WebpackQuotesPlugin({ notifications: true }));
} 
```

Configuration
---

Plugin is instantiated by default with the following config which can be overwritten:

```
{
    notifications: false,
    additionalQuotes: []
    secondsToApology: 20
}
```

Parameter `secondsToApology` will be used to provide a time point after which webpack will add an apology for the long build.

![Image of Webpack Apology](/assets/ready.png)


Every additional quote should be listed in the following structure:

```
{
    "text": "“quote text”",
    "author": "quote author"
}
```

Contributions
---

If you have some more ideas how we can enrich the experience you're welcome to create the PR.

Have a nice day!
