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

/**
 * This class is handling the controller for the add user
 * @author Oleksii Orel
 */
export class AdminsAddUserCtrl {

  /**
   * Default constructor.
   * @ngInject for Dependency injection
   */
  constructor($mdDialog, cheAPI, cheNotification) {
    'ngInject';

    this.$mdDialog = $mdDialog;
    this.cheAPI = cheAPI;
    this.cheNotification = cheNotification;
  }

  /**
   * Callback of the cancel button of the dialog.
   */
  abort() {
    this.$mdDialog.hide();
  }

  /**
   * Callback of the add button of the dialog(create new user).
   */
  createUser() {
    //TODO should add user name in future
    let promise = this.cheAPI.getUser().createUser(this.newUserEmail, null, this.newUserPassword);

    promise.then(() => {
      this.$mdDialog.hide();
      this.callbackController.updateUsers();
      this.cheNotification.showInfo('User successfully created.');
    }, (error) => {
      this.cheNotification.showError(error.data.message ? error.data.message : '.');
    });
  }

}
