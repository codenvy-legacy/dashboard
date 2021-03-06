/*
 *  [2015] - [2016] Codenvy, S.A.
 *  All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Codenvy S.A. and its suppliers,
 * if any.  The intellectual and technical concepts contained
 * herein are proprietary to Codenvy S.A.
 * and its suppliers and may be covered by U.S. and Foreign Patents,
 * patents in process, and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Codenvy S.A..
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
