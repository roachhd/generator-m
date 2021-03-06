/*global describe:true, beforeEach:true, it:true */
'use strict';
var path    = require('path');
var helpers = require('yeoman-generator').test;
var assert  = require('assert');


// XXX With current API, (prior v2), that's a complete mess to setup generators
// if they differ from the standard lib/generators layout.
//
// Even for workarounds, the API is awful and doesn't let you do anything.
//
// With the new API, it will be much easier to manually register one or a set
// of generators, and manage multiple environments.
//
// Something like:
//
//    generators()
//      .register(require('../app'), 'm:app')
//      .register(require('../view'), 'm:view')
//      .register(require('../router'), 'm:router')
//      .register(require('../model'), 'm:model')
//      .register(require('../collection'), 'm:collection')
//      .register(require('../controller'), 'm:controller')
//      .register(require('../layout'), 'm:layout')
//      .register(require('../i18n'), 'm:i18n')
//
// Or for the lazy guy:
//
//    generators()
//      .lookup('*:*', path.join(__dirname, '..'))
//

describe('The-M-Project generator test', function () {
  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, './temp'), function (err) {
      if (err) {
        return done(err);
      }
      this.themproject = {};
      this.themproject.app = helpers.createGenerator('m:app', [
        '../../app', [
          helpers.createDummyGenerator(),
          'mocha:app'
        ]
      ]);
      this.themproject.app.options['skip-install'] = true;

      helpers.mockPrompt(this.themproject.app, {
        //features: ['compassBootstrap'],
        compass: true,
        includeRequireJS: false
      });

      done();
    }.bind(this));

  });

  it('every generator can be required without throwing', function () {
    // not testing the actual run of generators yet
    this.app = require('../app');
    this.collection = require('../collection');
    this.model = require('../model');
    this.router = require('../router');
    this.view = require('../view');
    this.controller = require('../controller');
    this.layout = require('../layout');
  });

  it('creates expected files', function (done) {
    var expected = [
      ['bower.json', /"name": "temp"/],
      ['package.json', /"name": "temp"/],
      'Gruntfile.js',
      'grunt.config.js',
      'app/icons/favicon.png',
      'app/icons/android-l.png',
      'app/icons/android-m.png',
      'app/icons/android-s.png',
      'app/icons/apple-ipad-retina.png',
      'app/icons/apple-ipad.png',
      'app/icons/apple-iphone.png',
      'app/icons/apple-iphone-retina.png',
      'app/splash/apple-splash-iphone.png',
      'app/splash/apple-splash-iphone-retina.png',
      'app/splash/apple-splash-ipad-portrait.png',
      'app/splash/apple-splash-ipad-landscape.png',
      'app/splash/apple-splash-ipad-portrait-retina.png',
      'app/splash/apple-splash-ipad-landscape-retina.png',
      'app/index.html',
      '.gitignore',
      '.gitattributes',
      '.bowerrc',
      '.jshintrc',
      '.editorconfig',
      'Gruntfile.js',
      'package.json',
      ['app/scripts/config.js', /\/\/m:i18n/],
      'app/scripts/main.js',
      'app/styles/main.scss',
      ['app/index.html', /<!-- m:models -->/],
      ['app/index.html', /<!-- m:collections -->/],
      ['app/index.html', /<!-- m:views -->/],
      ['app/index.html', /<!-- m:layouts -->/],
      ['app/index.html', /<!-- m:controllers -->/],
      ['app/index.html', /<!-- m:routes -->/]
    ];

    this.themproject.app.run({}, function () {
      helpers.assertFiles(expected);
      done();
    });

  });

  describe('The-M-Project Model', function () {
    it('creates themproject model', function (done) {
      var model = helpers.createGenerator('m:model', ['../../model'], ['foo']);

      this.themproject.app.run({}, function () {
        model.run([], function () {
          helpers.assertFiles([
            ['app/scripts/models/foo.js',
              /Models.FooModel = M.Model.extend\(\{/]
          ]);
        });
        done();
      });
    });
  });

  describe('The-M-Project Collection', function () {
    it('creates themproject collection', function (done) {
      var collection = helpers.createGenerator('m:collection', ['../../collection'], ['foo']);

      this.themproject.app.run({}, function () {
        collection.run([], function () {
          helpers.assertFiles([
            ['app/scripts/collections/foo.js', /Collections.FooCollection = M.Collection.extend\(\{/]
          ]);
        });
        done();
      });
    });
  });

  describe('The-M-Project Router', function () {
    it('creates themproject router', function (done) {
      var router = helpers.createGenerator('m:router', ['../../router'], ['foo']);

      this.themproject.app.run({}, function () {
        router.run([], function () {
          helpers.assertFiles([
            ['app/scripts/routes/foo.js', /Routers.FooRouter = M.Router.extend\(\{/]
          ]);
        });
        done();
      });
    });
  });

  describe('The-M-Project View', function () {
    it('creates themproject view', function (done) {
      var view = helpers.createGenerator('m:view', ['../../view'], ['foo']);

      this.themproject.app.run({}, function () {
        view.run([], function () {
          helpers.assertFiles([
            ['app/scripts/views/foo.js', /Views.FooView = M.View.extend\(\{/]
          ]);
        });
        done();
      });
    });
  });

  describe('The-M-Project Controller', function () {
    it('creates themproject controller', function (done) {
      var controller = helpers.createGenerator('m:controller', ['../../controller'], ['foo']);

      this.themproject.app.run({}, function () {
        controller.run([], function () {
          helpers.assertFiles([
            ['app/scripts/controllers/foo.js', /Controllers.FooController = M.Controller.extend\(\{/]
          ]);
        });
        done();
      });
    });
  });

  describe('The-M-Project I18N', function () {
    it('creates themproject i18n', function (done) {
      var i18n = helpers.createGenerator('m:i18n', ['../../i18n'], ['foo']);

      this.themproject.app.run({}, function () {
        i18n.run([], function () {
          helpers.assertFiles([
            ['app/i18n/foo.json', /{\n    "global.button.save": "Save document/]
          ]);
        });
        done();
      });
    });
  });

  describe('The-M-Project Layout', function () {
    it('creates themproject layout', function (done) {
      var layout = helpers.createGenerator('m:layout', ['../../layout'], ['foo']);

      this.themproject.app.run({}, function () {
        layout.run([], function () {
          helpers.assertFiles([
            ['app/scripts/layouts/foo.js', /Layouts.FooLayout = M.Layout.extend\(\{/]
          ]);
        });
        done();
      });
    });
  });
});
