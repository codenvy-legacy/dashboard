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
 * This class is handling the service for the nag message
 * @author Oleksii Orel
 */
export class NagMessageService {

  /**
   * Default constructor that is using resource injection
   * @ngInject for Dependency injection
   */
  constructor($document, $compile) {
    this.$document = $document;
    this.$compile = $compile;

    this.nagMessageId = 'codenvy-nag-message';
  }

  /**
   * Create a license nag message element
   */
  createLicenseMessage() {
    if (this.nagMessageElement) {
      return;
    }
    // create nag message element
    let item = angular.element('<cdvy-nag-message></cdvy-nag-message>');
    item.attr('id', this.nagMessageId);
    // compile
    this.nagMessageElement = this.$compile(item)(angular.element(this.$document.find('body')[0]).scope());
  }

  /**
   * Show nag message
   * @returns {boolean} - true if successful
   */
  showLicenseMessage() {
    //the parent of the new element
    let parentElement = this.$document.find('body');
    let itemId = this.nagMessageElement.attr('id');

    if (!itemId) {
      return false;
    }

    let oldItem = this.$document[0].getElementById(itemId);
    if (oldItem) {
      oldItem.remove();
    } else {
      parentElement.addClass('license-message-indent');
    }

    parentElement.append(this.nagMessageElement);
    return true;
  }


  /**
   * hide nag message
   * @returns {boolean} - true if successful
   */
  hideLicenseMessage() {
    let findElement = this.$document[0].getElementById(this.nagMessageId);

    if (findElement) {
      findElement.remove();
      this.$document.find('body').removeClass('license-message-indent');
      return true;
    }

    return false;
  }

}
