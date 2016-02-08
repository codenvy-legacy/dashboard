/*
 * CODENVY CONFIDENTIAL
 * __________________
 *
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
 * This class is handling the license API retrieval
 * @author Oleksii Orel
 */
export class ImsLicenseApi {

  /**
   * Default constructor that is using resource
   * @ngInject for Dependency injection
   */
  constructor($resource, $q, $document, $compile) {
    // keep resource
    this.$resource = $resource;
    this.$q = $q;
    this.$document = $document;
    this.$compile = $compile;

    // remote call
    this.remoteLicenseAPI = this.$resource('/im/license', {}, {
      getProperties: {method: 'GET', url: '/im/license/properties'}
    });

    // current license
    this.currentLicense = {
      key: null,
      properties: null
    };

    // default number of allowed users
    this.defaultNumberOfUsers = 10;
  }

  /**
   * Gets the number of allowed users
   * @returns {Number}
   */
  getNumberOfAllowedUsers() {
    //if no license
    if (!this.currentLicense.properties) {
      return this.defaultNumberOfUsers;
    }
    //if license expired
    if (this.currentLicense.properties.isExpired === 'true') {
      return 0;
    }
    //if valid license
    return parseInt(this.currentLicense.properties.users, 10) | 0;
  }

  /**
   * Gets the current license properties
   * @returns {}
   */
  getLicense() {
    return this.currentLicense;
  }

  /**
   * Delete current license.
   * @returns {*} the promise
   */
  deleteLicense() {
    let promise = this.remoteLicenseAPI.delete().$promise;

    // check if was OK or not
    promise.then(() => {
      //update current license
      this.currentLicense.key = null;//remove license key
      this.currentLicense.properties = null;//remove license properties
    });

    return promise;
  }

  /**
   * Ask for loading the users license (key and properties)
   * @returns {*} the promise
   */
  fetchLicense() {
    let deferred = this.$q.defer();

    this.fetchLicenseKey().then(()=> {
      this.fetchLicenseProperties().then(()=> {
        deferred.resolve(this.currentLicense);
      }, (error) => {
        deferred.reject(error);
      });
    }, (error) => {
      deferred.reject(error);
    });

    return deferred.promise;
  }

  /**
   * Ask for loading the users license key in asynchronous way
   * If there are no changes, it's not updated
   * @returns {*} the promise
   */
  fetchLicenseKey() {
    let deferred = this.$q.defer();

    let promise = this.remoteLicenseAPI.get().$promise;

    // check if was OK or not
    promise.then((licenseKey) => {
      //update current license key
      this.currentLicense.key = licenseKey;//set key
      deferred.resolve(licenseKey);
    }, (error) => {
      if (error.status === 304) {
        deferred.resolve(this.currentLicense.key);
      } else {
        deferred.reject(error);
      }
    });

    return deferred.promise;
  }

  /**
   * Ask for loading the users license properties in asynchronous way
   * If there are no changes, it's not updated
   * @returns {*} the promise
   */
  fetchLicenseProperties() {
    let deferred = this.$q.defer();

    let promise = this.remoteLicenseAPI.getProperties().$promise;

    // check if was OK or not
    promise.then((properties) => {
      //update current license properties
      this.currentLicense.properties = properties;//set properties
      deferred.resolve(properties);
    }, (error) => {
      if (error.status === 304) {
        deferred.resolve(this.currentLicense.properties);
      } else {
        deferred.reject(error);
      }
    });

    return deferred.promise;
  }

}
