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

import {ImsApiConfig} from './ims/imsapi-config';
import {CodenvyApiConfig} from './api/codenvy-api-config';

export class CodenvyComponentsConfig {

  constructor(register) {
    new ImsApiConfig(register);
    new CodenvyApiConfig(register);
  }
}
