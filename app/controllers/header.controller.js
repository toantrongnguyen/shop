(function () {
    'use strict';

    angular
        .module('gApp.shared')
        .controller('HeaderController', HeaderController);

    HeaderController.$inject = ['$state', '$location', '$stateParams', '$localStorage', 'categoryService'];

    function HeaderController($state, $location, $stateParams, $localStorage, categoryService) {
        var vm = this;
		
		vm.subMenu = [];
        vm.categoryId = (typeof $location.search().categoryId !== 'undefined' ?  $location.search().categoryId : '');
		
		getSubMenu();
        function getSubMenu() {
            return categoryService.getAllCategories().then(function (response) {
                vm.subMenu = response.data;
                $localStorage.subMenu = vm.subMenu;
				if(vm.categoryId) {
					vm.subMenu = [];
					for(var i = 0; i < vm.subMenu.length; i++){
						var tmpSub = vm.subMenu[i];
						if(vm.categoryId == tmpSub.id) {
							vm.subMenu = tmpSub.children;
							break;
						}
					}
                }
                return;
            });
        }
		
        vm.gotoCatPage = function (catId, typeId) {
            if (typeof typeId !== 'undefined' && typeId != '0') {
				if (typeof $localStorage.provinceId === 'undefined') {
					$state.go("provinces", {categoryId: catId, typeId: typeId});
				} else {
					if(typeId == 1) {
						$state.go("deals", {categoryId: catId});
					} else {
						$state.go("suppliers", {categoryId: catId});
					}
                }
            } else {
                $state.go("products", {categoryId: catId});
            }
        };
		
        vm.openLogin = function(){
            $state.go('login');
        };

        vm.openRegister = function(){
            $state.go('register');
        };

        vm.openCart = function(){
            $state.go('cart');
        };

        vm.openDetail = function(productId){
            $state.go('productsDetail',{productId: productId});
        };

        vm.openCategory = function(catId){
            $state.go('products',{categoryId: catId});
        };

        vm.openHome = function(){
            $state.go('home');
        };

    }

})();