angular.module('app', ['ngAnimate'])
    //.config(function($httpProvider){
    //    $httpProvider.defaults.useXDomain = true;
    //    delete $httpProvider.defaults.headers.common['X-Requested-With'];
    //})
    .controller('MainController', ['$http', '$sce', function ($http, $sce) {
        var vm = this;
        vm.results = [];
        vm.loading = false;

        vm.search = function () {
            vm.loading = true;
            vm.notify = 'Searching Instagram for photos tagged with "' + vm.data.q + '"';
            callInstaAPI(vm.data.q);
            resetForm();
        };

        vm.trustSrc = function (src) {
            return $sce.trustAsResourceUrl(src);
        };

        //reset the search form
        function resetForm(){
            vm.data.q = '';
            vm.searchForm.$setPristine();
        }

        function callInstaAPI(tag) {
            var request = {
                client_id: '7b45f25eec0f4e74bf6c0721bd018a69',
                callback: 'JSON_CALLBACK'
            };
            $http.jsonp('https://api.instagram.com/v1/tags/'+tag+'/media/recent', {
                params: request
            }).then(function (response) {
                vm.results = response.data.data;
                vm.notify = 'We have found ' + vm.results.length + ' results for "' + tag + '"';
                vm.loading = false;
                //console.dir(vm.results);
            }, function (error) {
                vm.notify = 'Sorry there is some error while searching tag "' + tag + '"';
                vm.loading = false;
                console.dir(error);
            });
        };
    }]);