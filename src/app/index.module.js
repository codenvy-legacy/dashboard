/*
 * Copyright (c) 2015-2016 Codenvy, S.A.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *   Codenvy, S.A. - initial API and implementation
 */
'use strict';

import {CodenvyNavbarConfig} from './navbar/navbar-config';
import {CodenvyAccountConfig} from './account/account-config';
import {Register} from './utils/register';
import {CodenvyComponentsConfig} from '../components/components-config';
import {FactoryConfig} from './factories/factories-config';

import {LoginCtrl} from './login/login.controller';

import {ResetServerPropsCtrl} from './onprem/admin/reset-server-properties/reset-server-properties.controller';
import {OnPremisesConfig} from './onpremises/onpremises-config';

let initModule = angular.module('codenvyDashboard', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'braintree-angular', 'gavruk.card',
  'ngResource', 'ngRoute', 'ngPasswordStrength', 'ui.gravatar', 'userDashboard']);
//initModule.controller('DashboardCtrl', DashboardCtrl);


var DEV = true;

// and setup controllers
initModule.controller('LoginCtrl', LoginCtrl);



// config routes
initModule.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    .accessWhen('/login', {
      templateUrl: 'app/login/login.html',
      controller: 'LoginCtrl',
      controllerAs: 'loginCtrl'
    })
    .accessOtherWise({
      redirectTo: '/projects'
    });

}]);

// add interceptors
initModule.factory('AuthInterceptor', function ($window, $cookies, $q, $location, $log) {
  return {
    request: function(config) {
      //remove prefix url
      if (config.url.indexOf('https://codenvy.com/api') === 0) {
        config.url = config.url.substring('https://codenvy.com'.length);
      }

      //Do not add token on auth login
      if (config.url.indexOf('/api/auth/login') === -1 && config.url.indexOf('api/') !== -1 && $window.sessionStorage['codenvyToken']) {
        config.params = config.params || {};
        angular.extend(config.params, {token: $window.sessionStorage['codenvyToken']});
      }
      return config || $q.when(config);
    },
    response: function(response) {
      return response || $q.when(response);
    },
    responseError: function (rejection) {
      // handle only api call
      if (rejection.config) {
        if (rejection.config.url.indexOf('localhost') > 0 || rejection.config.url.startsWith('/api/user') > 0) {
          if (rejection.status === 401 || rejection.status === 403) {
            $log.info('Redirect to login page.');
            $location.path('/login');

          }
        }
      }
      return $q.reject(rejection);
    }
  };
});

initModule.config(['$routeProvider', '$locationProvider', '$httpProvider', function ($routeProvider, $locationProvider, $httpProvider) {

  if (DEV) {
    console.log('adding auth interceptor');
    $httpProvider.interceptors.push('AuthInterceptor');
  }
}]);



angular.module('ui.gravatar').config(['gravatarServiceProvider', function(gravatarServiceProvider) {
  gravatarServiceProvider.defaults = {
    size     : 43,
    default: 'mm'  // Mystery man as default for missing avatars
  };

  // Use https endpoint
  gravatarServiceProvider.secure = true;

}
]);


var instanceRegister = new Register(initModule);
new CodenvyNavbarConfig(instanceRegister);
new CodenvyComponentsConfig(instanceRegister);
new CodenvyAccountConfig(instanceRegister)
new FactoryConfig(instanceRegister);
new OnPremisesConfig(instanceRegister);
