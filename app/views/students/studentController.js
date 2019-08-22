'use strict';

angular.module('myApp.student', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/listStudents', {
            templateUrl: 'views/students/list.html',
            controller: 'StudentCtrl',
            resolve: {
                initialData: (studentFactory) => {
                    return studentFactory.getStudents();
                }
            }
            }).when('/login', {
                templateUrl: 'views/students/login.html',
                controller: 'LoginCtrl'
            }).when('/login2', {
                templateUrl: 'views/students/login2.html',
                controller: 'LoginCtrl'
            }).when('/forgotPw', {
                templateUrl: 'views/students/forgotPw.html',
                controller: 'forgot'
            }).when('/profile', {
                templateUrl: 'views/students/profile.html',
                controller: 'profile'
            })
            .when('/logout', {
                templateUrl: 'views/students/logout.html',
                controller: 'LogoutCtrl'
            }).when('/register', {
                templateUrl: 'views/students/register.html',
                controller: 'RegisterCtrl'
            })
            .when('/repassord', {
                templateUrl: 'views/students/repassword.html',
                controller: 're'
            })
    }])
    .controller('StudentCtrl', ['studentFactory', '$scope', function (studentFactory, $scope) {
        $scope.students2 = studentFactory.getSession();
        if ($scope.students2 == null) { $scope.students2 = studentFactory.getList(); }
    }])
    .controller('LoginCtrl', ['studentFactory', '$scope', '$location', function (studentFactory, $scope, $location) {
        $scope.loginForm = {};
        $scope.errorMessage = null;

        $scope.checkLogin = () => {
            studentFactory.checkLogin($scope.loginForm.username, $scope.loginForm.password).then(data => {
                if (data != null && data.length > 0) {
                    studentFactory.setIsLogin(true);
                    $location.path('/');
                    $scope.errorMessage = null;
                } else {
                    studentFactory.setIsLogin(false);
                    $scope.errorMessage = "Invalid username or password";
                }

            });
        };
        $scope.checkLogin2 = () => {
            var data = studentFactory.checkLogin2($scope.loginForm.username, $scope.loginForm.password);
            if (data != null && data.length > 0) {
                studentFactory.setIsLogin(true);
                alert('Đang nhập thành công!');
                $location.path('/listSubjects');
                $scope.errorMessage = null;
               
            } else {
                studentFactory.setIsLogin(false);
                $scope.errorMessage = "Invalid username or password";
            }
        };
    }])
    .controller('LogoutCtrl', ['studentFactory', '$scope', '$location', function (studentFactory, $scope, $location) {
        $scope.logout = () => {
            studentFactory.setIsLogin(false);
            $location.path('/');
        };
        $scope.cancelLogout = () => {
            $location.path('/');
        };
    }])
    .controller('RegisterCtrl', ['studentFactory', '$scope', '$http', '$location', function (studentFactory, $scope, $http, $location) {
        $scope.submitting = false;
        $scope.registerForm = {};
        $scope.errorMessage = null;
        $scope.students = studentFactory.getList();
        $scope.Register = () => {
            studentFactory.Register($scope.registerForm.username).then(
                data => {
                    if (data != null && data.length > 0) {
                        $scope.errorMessage = "Username is exited";
                    } else {
                        $scope.errorMessage = "You can use this Username";
                        var data1 = {
                            "username": $scope.registerForm.username,
                            "password": $scope.registerForm.password,
                            "fullname": $scope.registerForm.fullname,
                            "email": $scope.registerForm.email,
                            "gender": $scope.registerForm.gender,
                            "birthday": $scope.registerForm.birthday,
                            "schoolfee": $scope.registerForm.schoolfee,
                            "marks": "0"
                        };
                        // $scope.students.push(data1);
                        $scope.submitting = true;
                        if (studentFactory.getSession() == null) {
                            $scope.students = studentFactory.getList();
                        } else {
                            $scope.students = studentFactory.getSession();
                        }
                        $scope.students.push(data1);
                        sessionStorage.setItem('name', JSON.stringify($scope.students));

                        var retrievedData = sessionStorage.getItem("name");
                        var movies2 = JSON.parse(retrievedData);
                        console.log(movies2);
                        // sessionStorage.clear();
                        alert('Đăng ký thành công!');
                        window.location.href = "http://127.0.0.1:8000/index.html#!/login2";
                    }
                }
            )
        }

    }])
    .controller('forgot', ['studentFactory', '$scope', '$http', '$location', function (studentFactory, $scope, $http, $location) {
        $scope.fogotPwform = {};
        $scope.submitting = false;
        $scope.errorMessage = null;

        $scope.checkemail = () => {
            var data = studentFactory.checkemail($scope.fogotPwform.email);
            if (data != null && data.length > 0) {
                window.location.href = "http://127.0.0.1:8000/index.html#!/repassord";
            } else {

                $scope.errorMessage = "Email doean't register";
            }
        }
    }])
    .controller('re', ['studentFactory', '$scope', '$http', '$location', function (studentFactory, $scope, $http, $location) {
        $scope.fogotPwform = {};
        $scope.submitting = false;
        $scope.errorMessage = null;
        $scope.repassword = () => {
            var data = studentFactory.repassword($scope.fogotPwform.oldp, $scope.fogotPwform.newp);
            if (data != null && data.length > 0) {
                // $scope.errorMessage = "ok";

                alert('change passwoed success')
                window.location.href = "http://127.0.0.1:8000/index.html#!/login2";
            } else {

                $scope.errorMessage = "Pawword incorect";
            }
        }
    }])
    .controller('profile', ['studentFactory', '$scope', function (studentFactory, $scope) {
        $scope.students2 = studentFactory.getUser();
        console.log($scope.students2);
    }])

