'use strict';

// Ionic MobiStore App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'mobistore' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'mobistore.services' is found in services
// 'mobistore.controllers' is found in controllers
angular.module('mobistore', ['ngResource', 'ionic', 'ngCookies', 
                             'mobistore.utils', 'mobistore.filters', 'mobistore.models', 'mobistore.controllers', 'mobistore.services', 'mobistore.directives'])

  .run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);
        

      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleLightContent();
      }
    });
    
  })

  .config(function ($stateProvider, $urlRouterProvider, $provide, $httpProvider, $ionicConfigProvider) {
    $ionicConfigProvider.platform.android.tabs.position('bottom');
    //$ionicConfigProvider.views.maxCache(0);
    $ionicConfigProvider.views.transition('none');

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    
    $stateProvider
	.state('signon', {
	    url: '/signon',
	    templateUrl: 'templates/signon.html',
	    controller: 'ClientCtrl'
	  })

      // setup an abstract state for the tabs directive
      .state('tab', {
        url: '/tab',
        abstract: true,
        templateUrl: 'templates/tabs.html',
        controller: 'TabCtrl'
      })

      // Each tab has its own nav history stack:
      .state('tab.home', {
        url: '/home',
        cache: false,
        views: {
          'tab-home': {
            templateUrl: 'templates/home.html',
            controller: 'HomeCtrl'
          }
        }
      })
      
      .state('tab.products', {
        url: '/products',
        cache: false,
        views: {
            'tab-home': {
                templateUrl: 'templates/product/list.html',
                controller: 'ProductsCtrl'
            }
        }
      })
      .state('tab.product', {
        url: '/product/:productId',
        cache: false,
        views: {
          'tab-home': {
            templateUrl: 'templates/product/detail.html',
            controller: 'ProductCtrl'
          }
        }
      })

      .state('tab.find', {
        url: '/find',
        cache: false,
        views: {
          'tab-find': {
            templateUrl: 'templates/find.html',
            controller: 'FindCtrl'
          }
        }
      })
      .state('tab.shoppingcart', {
        url: '/shoppingcart',
        cache: false,
        views: {
          'tab-shoppingcart': {
            templateUrl: 'templates/shoppingcart/shoppingcart.html',
            controller: 'ShoppingcartCtrl'
          }
        }
      })
      .state('tab.mine', {
        url: '/mine',
        cache: false,
        views: {
          'tab-mine': {
            templateUrl: 'templates/mine.html',
            controller: 'MineCtrl'
          }
        }
      })
      .state('tab.orders', {
        url: '/orders',
        cache: false,
        views: {
          'tab-mine': {
            templateUrl: 'templates/order/list.html',
            controller: 'OrdersCtrl'
          }
        }
      })
      .state('tab.order', {
        url: '/order/:orderId',
        cache: false,
        views: {
          'tab-mine': {
            templateUrl: 'templates/order/detail.html',
            controller: 'OrderCtrl'
          }
        }
      })
      .state('msg', {
        url: '/msg/:error',
        cache: false,
        templateUrl: 'templates/msg.html',
        controller: 'MsgCtrl'
      });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/tab/home');

    // register the interceptor as a service
    $provide.factory('myHttpInterceptor', ['$rootScope', '$cookies', '$q', '$location', '$injector', 'Constant', 'Util',  
                                           function($rootScope, $cookies, $q, $location, $injector, Constant, Util) {
      return {
        'request': function(config) {
          $injector.get('$ionicLoading').show({template: '加载中...'});
        
          if (!config.params) {
        	  config.params = {};
          }
          
          if (config.url.indexOf('/api/') > -1 && config.params) {
//        	  console.log(config);
        	  config.params.pageSize = Constant.PageSize;
        	  config.params.token = $cookies.get('userToken');
          }
          
          return config || $q.when(config);
        },

        'requestError': function(rejection) {
        	$injector.get('$ionicLoading').hide();
          // do something on error
          //if (canRecover(rejection)) {
          //  return responseOrNewPromise
          //}

          return $q.reject(rejection);
        },

        'response': function(response) {
        	$injector.get('$ionicLoading').hide();
        	
        	var code = response.data.code;
//        	console.log(response);
        	if (code === -100) {
        		$location.path("/signon");
        	} else if (code < 0){
        		$location.path("/msg/" + code);
        	}
            return response;
        },

        'responseError': function(rejection) {
        	$injector.get('$ionicLoading').hide();
        	
          console.log('responseError');
          $location.path("/signon");
          return $q.reject(rejection);
        }
      };
    }]);

    $httpProvider.interceptors.push('myHttpInterceptor');
    
    
  });
