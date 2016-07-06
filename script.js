angular.module('DemoApp', [])
.controller('MainCtrl', function($http,$scope) {
	this.ingredients = [];
	this.selectedIngredients = [];

	var self = this;
	$http.get('./ingredients.json').then(function(response) {
	    self.ingredients = response.data.ingredients;
	});

	$http.get('./recipes.json').then(function(response) {
	    self.recipes = response.data.recipes;
	});

	$scope.selectIngredients = function(id){
		if(id != false){
	    	self.selectedIngredients.push(id);
	    	myStyle={color:'red'};
	    	$(".selection").append("<div>"+id+"</div>")
	    }else{
	    	var result = document.getElementsByClassName(".ingredient");
	    	$(".ingredient div").css('color','black');
	    	$(".selection").html("");

	    }
		return myStyle;
	}

	$scope.showButton = function(){
		if (self.selectedIngredients.length == 3){
			return true;
		}else{
			return false;
		}
	}

	$scope.melanger = function(){
		self.selectedIngredients.sort().toString;
		$http.get('./recipes.json').then(function(response) {
	        self.recipes = response.data.recipes;
	        for (var i = 0; i < self.recipes.length; i++) {
	        	if (self.recipes[i].ingredients == self.selectedIngredients){
	        		alert("Potion : "+self.recipes[i].name);
	        		self.selectedIngredients = [];
	        		$scope.selectIngredients(false);
	        		return;

	        	}
	        };
	        alert("Recette incorrecte !");
	        self.selectedIngredients = [];
	        $scope.selectIngredients(false);
	    });

	}

});