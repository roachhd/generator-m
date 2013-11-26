/*global $, M*/


(function(global) {
    'use strict';

    global.<%= _.camelize(appname) %> = M.Application.extend().create(m_config);

    $(document).ready(function() {

        global.<%= _.camelize(appname) %>.start({
            routing: {
                routes: {
                    '': 'absintheController',
                    'beer': 'beerController'
                },
                absintheController: global.<%= _.camelize(appname) %>.Controllers.AbsintheController.create(),
                beerController: global.<%= _.camelize(appname) %>.Controllers.BeerController.create()
            }
        });
    });

})(this);