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
 * This class is handling the service for the nag message
 * @author Oleksii Orel
 */
export class NagMessageService {

  /**
   * Default constructor that is using resource injection
   * @ngInject for Dependency injection
   */
  constructor($document, $compile, cheBodyInjectorSvc) {
    this.$document = $document;
    this.$compile = $compile;
    this.cheBodyInjectorSvc = cheBodyInjectorSvc;

  }

  /**
   * Create a license nag message element
   */
  createLicenseMessage() {
    if (this.nagMessageElement) {
      return;
    }
    // create nag message element
    let item = angular.element('<cdvy-nag-message  id="codenvy-nag-message"></cdvy-nag-message>');
    // compile
    this.nagMessageElement = this.$compile(item)(angular.element(this.$document.find('body')[0]).scope());
  }

  /**
   * Show nag message
   */
  showLicenseMessage() {
    this.$document.find('body').addClass('license-message-indent');
    this.cheBodyInjectorSvc.addElement(this.nagMessageElement);
  }

  /**
   * hide nag message
   */
  hideLicenseMessage() {
    this.cheBodyInjectorSvc.removeElement(this.nagMessageElement);
    this.$document.find('body').removeClass('license-message-indent');
  }

}
