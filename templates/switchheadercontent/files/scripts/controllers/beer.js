/*global <%= _.camelize(appname) %>*/

<%= _.camelize(appname) %>.Controllers = <%= _.camelize(appname) %>.Controllers || {};

(function () {
    'use strict';

    <%= _.camelize(appname) %>.Controllers.BeerController = M.Controller.extend({

        _beerView: null,

        applicationStart: function() {
            this._initLayout();
        },

        show: function() {
            this._setViews();
            <%= _.camelize(appname) %>.getLayout().startTransition();
        },

        _initLayout: function() {
            var _layout = M.SwitchHeaderContentLayout.design(this, null, true);
            <%= _.camelize(appname) %>.setLayout(_layout);
            this._setViews();
        },

        _setViews: function() {
            if(!this._beerView) {
                this._beerView = <%= _.camelize(appname) %>.Views.BeerView.create(this);
            }
            <%= _.camelize(appname) %>.getLayout().applyViews({
                content: this._beerView
            });
        }
    });

})();
