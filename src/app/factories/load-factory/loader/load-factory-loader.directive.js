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
 * Defines a directive for displaying loader
 * @author Oleksii Kurinnyi
 */
export class CodenvyLoader {
  /**
   * Default constructor that is using resource
   * @ngInject for Dependency injection
   */
  constructor () {
    this.restrict = 'E';
    this.templateUrl = 'app/factories/load-factory/loader/load-factory-loader.html';

    // scope values
    this.scope = {
      model: '=cdvyModel'
    };
  }

  link ($scope, element) {
    let craneEl = element.find('.loader'),
      cargoEl = element.find('#load'),
      workingLogEl = element.find('.working-log'),
      oldSteps = [],
      newStep;
    $scope.$watch(() => {return $scope.model.getCurrentProgressStep();}, (newVal,oldVal) => {
      oldSteps.push(oldVal);
      newStep = newVal;

      // animation initialization
      if (newVal===1){
        craneEl.addClass('step-' + newVal);
        cargoEl.addClass('layer-' + newVal);
      }

      if (oldVal===newVal) {
        return;
      }
      let stages = element.find('.stage'),
        outputs = stages.parent();

      stages.removeClass('active');
      outputs.find('.stage-' + newVal).addClass('active');

      if (workingLogEl.hasClass('untouched')) {
        stages.removeClass('opened');
        outputs.find('.stage-' + newVal).addClass('opened');
      }
    });

    // event fires on animation iteration end
    element.find('.anim.trolley-block').bind('animationiteration', () => {
      for (let i=0; i<oldSteps.length; i++) {
        craneEl.removeClass('step-'+oldSteps[i]);
        cargoEl.removeClass('layer-'+oldSteps[i]);
      }
      oldSteps.length = 0;

      craneEl.addClass('step-'+newStep);
      cargoEl.addClass('layer-'+newStep);
    });

    // manual switching stages
    workingLogEl.bind('click', (event) => {
      let targetEl = angular.element(event.target);
      if (!targetEl.hasClass('stage-title')) {
        return false;
      }
      let selectedStageEl = targetEl.parent(),
        stages = workingLogEl.find('.stage');
      workingLogEl.removeClass('untouched');
      stages.removeClass('opened');
      selectedStageEl.addClass('opened');
    });

    $scope.downloadLogs = (str) => {
      let str2 = str.replace(new RegExp("'", 'g'), '\'');
      window.open('data:text/csv,' + encodeURIComponent(str2));
    };

    $scope.backToDashboard = () => {
      $scope.model.restoreMenuAndFooter();
      window.location = '#/factory/' + $scope.model.factory.id;
    };
  }
}
