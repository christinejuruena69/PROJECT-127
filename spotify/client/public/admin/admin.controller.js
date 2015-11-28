'use strict';

(function(){
	angular
		.module("app")
		.controller("AdminCtrl", AdminCtrl); //this is a part of a module called app (yung nasa taas)
	AdminCtrl.$inject = ["$scope", "$location", "AdminService"]; // angularjs na property 
	//HomeCtrl may dependencies or gagamit ng other modules/services 
	//angularsj construct
	//$scope =angularjs service na parang require

	function AdminCtrl($scope, $location, AdminService){
	var user = {};
	$scope.users = [];
	$scope.accounts={};
	
	AdminService.GetAll().then(function(data){
				$('body').css('display', 'none');
				$scope.accounts = data;
				$scope.users = data;
				isLoggedIn();
				$('body').css('display', '');
		});
		
	$scope.logout = function(){
		document.cookie ="user=\"\"";
		var cookie = document.cookie.split(";");
		console.log(cookie[0]);
		document.cookie = cookie[0];
		isLoggedIn();
	}
	
	$scope.makeAdmin = function(account){
		account.user_role = 2;
		AdminService.update(account)
				.then(function(data){
					alert("Make admin success");
					console.log(data);
			});
		isLoggedIn();
	};
	
	$scope.approveUser = function(account){
		account.user_role = 1;
		AdminService.update(account)
				.then(function(data){
					alert("User approved");
					console.log(data);
			});
		isLoggedIn();
	};
	
	$scope.unauthorizeUser = function(account){
		account.user_role = null;
		AdminService.update(account)
				.then(function(data){
					alert("Restricted User");
					console.log(data);
			});
		isLoggedIn();
	};
	
	//login and riderecting
		function goSignUp(){
			$location.url("/sign-up");
			console.log($location);
		}
		function goLogin(){
			$location.url("/sign-in");
			console.log($location);
		}
		
		function goLoginHome(){
			$location.url("/home");
			console.log($location);
		}
		
		function goLoginAdmin(){
			$location.url("/admin");
			console.log($location);
		}
		
		function isLoggedIn(){
			try{
				user = $.parseJSON(document.cookie.substring(5));
				console.log(user);	
				var pathname = $(location).attr('href');
				pathname = pathname.split("#");
				console.log(pathname[1]);
				
					if(user.user_role != null){
						if(user.user_role == 1){
							//alert("Standard");
							goLoginHome();
						} else {
							//alert("Admin");
							goLoginAdmin();
						}
					} else if(user=="" && pathname[1]=="/sign-up"){
						document.cookie = "user=\"\"";
						goSignUp();
					} else if(user==""){
						document.cookie = "user=\"\"";
						goLogin();
					} else {
						alert("Unauthorized user");
						document.cookie = "user=\"\"";
						goLogin();
					}
					
			}catch(err){
				//alert("No user is logged in");
				//alert(err.message); //this thing works
				document.cookie = "user=\"\"";
				goLogin();
			}
		}
	
	}
})();
// Anonymouse function
