var test = require('tape');
var sinon = require('sinon');
var notifier = require('node-notifier');

var WebpackQuotes = require('../');

function createPlugableObject () {
  return {
    plugin: function(eventName, action) {
      this[eventName] = action;
    }
  };
}

test('Webpack quotes display', function (t) {
  var webpackPlugin = new WebpackQuotes({});
  var mockedCompiler = createPlugableObject();

  t.plan(1);
  sinon.spy(console, 'log');

  webpackPlugin.apply(mockedCompiler);
  mockedCompiler.compile();

  t.same(console.log.callCount, 3);

  sinon.restore(console.log);
});

test('Webpack ready message display', function (t) {
  var webpackPlugin = new WebpackQuotes({});
  var mockedCompiler = createPlugableObject();
  var mockedCompilation = createPlugableObject();
  var callback = sinon.spy();

  t.plan(2);
  sinon.spy(console, 'log');

  webpackPlugin.apply(mockedCompiler);
  mockedCompiler['this-compilation'](mockedCompilation);
  mockedCompilation['optimize-assets'](null, callback);

  t.same(console.log.callCount, 1);
  t.same('\n\nWebpack: - Sir, your assets are ready!\n\n', console.log.firstCall.args[0]);

  sinon.restore(console.log);
});

test('Webpack ready message display with an apology', function (t) {
  var webpackPlugin = new WebpackQuotes({ secondsBeforeApology: 1 });
  var mockedCompiler = createPlugableObject();
  var mockedCompilation = createPlugableObject();
  var callback = sinon.spy();

  t.plan(3);
  sinon.spy(console, 'log');

  webpackPlugin.apply(mockedCompiler);
  mockedCompiler['this-compilation'](mockedCompilation);

  setTimeout(function () {
    mockedCompilation['optimize-assets'](null, callback);

    t.same(console.log.callCount, 1);
    t.same('\n\nWebpack: - Sir, your assets are ready! Sorry for the delay.\n\n', console.log.firstCall.args[0]);
    t.same(callback.callCount, 1);
    sinon.restore(console.log);
  }, 2000)
});

test('Webpack ready message display with notification', function (t) {
  var webpackPlugin = new WebpackQuotes({ notifications: true });
  var mockedCompiler = createPlugableObject();
  var mockedCompilation = createPlugableObject();
  var callback = sinon.spy();

  t.plan(2);
  sinon.spy(console, 'log');
  sinon.spy(notifier, 'notify');

  webpackPlugin.apply(mockedCompiler);
  mockedCompiler['this-compilation'](mockedCompilation);
  mockedCompilation['optimize-assets'](null, callback);

  t.same(callback.callCount, 1);
  t.same(notifier.notify.firstCall.args[0], {
    title: 'Webpack says:',
    message: '- Sir, your assets are ready!'
  });

  sinon.restore(console.log);
  sinon.restore(notifier.notify);
});
