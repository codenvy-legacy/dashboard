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

import {AccountConfig} from './details/account-config';
import {BillingConfig} from './billing/billing-config';
import {SubscriptionConfig} from './subscriptions/subscription-config';
import {TeamConfig} from './team/team-config';

export class CodenvyAccountConfig {

  constructor(register) {
    new AccountConfig(register);
    new BillingConfig(register);
    new SubscriptionConfig(register);
    new TeamConfig(register);
  }
}
