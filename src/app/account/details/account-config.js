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

import {AddCreditcardCtrl} from './creditcard/add-creditcard.controller';
import {AddCreditcard} from './creditcard/add-creditcard.directive';
import {CreditcardCtrl} from './creditcard/creditcard.controller';
import {AccountProfile} from './profile/account-profile.directive';
import {AccountProfileCtrl} from './profile/account-profile.controller';
import {AccountDelete} from './account-delete.directive';
import {AccountDeleteCtrl} from './account-delete.controller';
import {AccountUpdatePassword} from './account-update-password.directive';
import {AccountCtrl} from './account.controller';


export class AccountConfig {

  constructor(register) {
    register.controller('CreditcardCtrl', CreditcardCtrl);

    register.controller('AddCreditcardCtrl', AddCreditcardCtrl);
    register.directive('addCreditcard', AddCreditcard);

    register.directive('accountUpdatePassword', AccountUpdatePassword);

    register.controller('AccountProfileCtrl', AccountProfileCtrl);
    register.directive('accountProfile', AccountProfile);

    register.controller('AccountDeleteCtrl', AccountDeleteCtrl);
    register.directive('accountDelete', AccountDelete);

    register.controller('AccountCtrl', AccountCtrl);

    // config routes
    register.app.config(function ($routeProvider) {
      let locationProvider = {
        templateUrl: 'app/account/details/account.html',
        controller: 'AccountCtrl',
        controllerAs: 'accountCtrl'
      };

      $routeProvider.accessWhen('/account', locationProvider)
        .accessWhen('/account/:tabName', locationProvider);
    });
  }
}
