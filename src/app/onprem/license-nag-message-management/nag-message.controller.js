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

/**
 * This class is handling the controller for the nag message
 * @author Oleksii Orel
 */
export class NagMessageCtrl {

  /**
   * Default constructor.
   * @ngInject for Dependency injection
   */
  constructor($scope, cheAPI, codenvyAPI, imsLicenseApi, nagMessageService, imsArtifactApi) {
    this.cheAPI = cheAPI;
    this.codenvyAPI = codenvyAPI;
    this.imsLicenseApi = imsLicenseApi;
    this.nagMessageService = nagMessageService;

    this.ims = imsArtifactApi.getIms();

    //returns an unregister function
    var unregister = $scope.$watch(()=> {
      return this.ims.isAvailable;
    }, (isAvailable)=> {
      if (!isAvailable) {
        return;
      }
      this.updateLicense();
      unregister();
    });

  }


  /**
   * Update license's properties
   */
  updateLicense() {
    this.currentLicense = this.imsLicenseApi.getLicense();

    if (!this.currentLicense || !this.currentLicense.properties) {
      let promise = this.imsLicenseApi.fetchLicenseProperties();

      promise.then(() => {
        this.checkLicenseStatus();
      }, () => { //if no license
        // check the number of allowed user
        this.checkNumberOfUsers();
      });
    } else {
      this.checkLicenseStatus();
    }
  }

  /**
   * Check the number of allowed user
   */
  checkNumberOfUsers() {
    let numberOfAllowedUsers = this.imsLicenseApi.getNumberOfAllowedUsers();

    // if admin
    if (this.cheAPI.getUser().isAdmin()) {
      // check number of allowed user
      this.codenvyAPI.getUser().fetchUsers(1, numberOfAllowedUsers + 1).then((remoteUsers) => {
        if (remoteUsers.length > 0) {
          this.nagMessageService.showLicenseMessage();
        } else {
          this.nagMessageService. hideLicenseMessage();
        }
      });
    }
    //TODO: add check for users
  }

  /**
   * Check the license status
   */
  checkLicenseStatus() {
    let properties = this.currentLicense ? this.currentLicense.properties : null;
    //if no license
    if (!properties) {
      this.checkNumberOfUsers();
      return;
    }
    //if license expired
    if (properties.isExpired === 'true') {
      this.nagMessageService.showLicenseMessage();
      return;
    }
    //if valid license
    this.checkNumberOfUsers();
  }
}
