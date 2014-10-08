function AssessmentsRoutes ($routeProvider) {
    $routeProvider.when('/assessments/:assessment_id', {
        templateUrl: 'modules/assessments/assessment_show.html',
        controller: 'AssessmentsCtrl'
    });
}

module.exports(AssessmentsRoutes);