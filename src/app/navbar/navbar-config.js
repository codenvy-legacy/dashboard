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

import {CodenvyNavBarCtrl} from './navbar.controller';
import {CodenvyNavBar} from './navbar.directive';
import {LogoutCtrl} from './logout/logout.controller';
import {LogoutWidget} from './logout/logout.directive';


export class CodenvyNavbarConfig {

  constructor(register) {
    register.controller('CodenvyNavBarCtrl', CodenvyNavBarCtrl);
    register.directive('codenvyNavBar', CodenvyNavBar);

    register.controller('LogoutCtrl', LogoutCtrl);
    register.directive('logoutWidget', LogoutWidget);

  }
}
