var WebpackQuotes = require('../');
var test = require('tape');

test('Webpack quotes defaults', function (t) {
  var webpackPlugin = new WebpackQuotes({});

  t.plan(4);
  t.same(webpackPlugin.additionalQuotes, []);
  t.same(webpackPlugin.notificationsOn, false);
  t.same(webpackPlugin.secondsBeforeApology, 20);
  t.same(webpackPlugin.defaultQuotes.length, 19);
});

test('Webpack quotes additionalQuotes', function (t) {
  var webpackPlugin = new WebpackQuotes({
    additionalQuotes: [ 'one', 'two' ]
  });

  t.plan(1);
  t.same(webpackPlugin.additionalQuotes, [ 'one', 'two']);
});

test('Webpack quotes secondsBeforeApology', function (t) {
  var webpackPlugin = new WebpackQuotes({
    secondsBeforeApology: 30
  });

  t.plan(1);
  t.same(webpackPlugin.secondsBeforeApology, 30);
});

test('Webpack quotes notificationsOn', function (t) {
  var webpackPlugin = new WebpackQuotes({
    notifications: true
  });

  t.plan(1);
  t.same(webpackPlugin.notificationsOn, true);
});