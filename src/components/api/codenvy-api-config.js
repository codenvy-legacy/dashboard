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

import {CodenvyAPI} from './codenvy-api.factory';
import {CodenvyAccount} from './codenvy-account.factory';
import {CodenvyAnalytics} from './codenvy-analytics.factory';
import {CodenvySaas} from './codenvy-saas.factory';
import {CodenvyPayment} from './codenvy-payment.factory';
import {CodenvyFactory} from './codenvy-factory.factory';
import {CodenvyFactoryTemplate} from './codenvy-factory-template.factory';
import {CodenvyAnalyticsSession} from './codenvy-analytics-session.factory';

export class CodenvyApiConfig {

  constructor(register) {
    register.factory('codenvyAccount', CodenvyAccount);
    register.factory('codenvyAnalytics', CodenvyAnalytics);
    register.factory('codenvySaas', CodenvySaas);
    register.factory('codenvyPayment', CodenvyPayment);
    register.app.constant('clientTokenPath', '/');//is necessary for Braintree
    register.factory('codenvyFactory', CodenvyFactory);
    register.factory('codenvyFactoryTemplate', CodenvyFactoryTemplate);
    register.factory('codenvyAnalyticsSession', CodenvyAnalyticsSession);
    register.factory('codenvyAPI', CodenvyAPI);

  }
}
