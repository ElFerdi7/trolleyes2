/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


'use strict';

moduloCarrito.controller('CarritoRemove2Controller',
        ['$scope', '$routeParams', 'serverCallService', '$location', 'sessionService', 'constantService','objectService',
            function ($scope, $routeParams, serverCallService, $location, sessionService, constantService,objectService) {
                $scope.ob = "carrito";
                $scope.op = "remove";
                $scope.profile = 2;
                //---
                $scope.status = null;
                $scope.debugging = constantService.debugging();
                $scope.url = $scope.ob + '/' + $scope.profile + '/' + $scope.op;
                //---
                $scope.id = $routeParams.id;
                //---
                $scope.objectService = objectService;
                //---
                serverCallService.getOne($scope.ob, $scope.id).then(function (response) {
                    if (response.status == 200) {
                        if (response.data.status == 200) {
                            $scope.status = null;
                            $scope.bean = response.data.json;
                        } else {
                            $scope.status = "Error en la recepción de datos del servidor 1";
                        }
                    } else {
                        $scope.status = "Error en la recepción de datos del servidor 2";
                    }
                }).catch(function (data) {
                    $scope.status = "Error en la recepción de datos del servidor 3";
                });
                $scope.remove = function () {
                    serverCallService.remove($scope.ob, $scope.id).then(function (response) {
                        if (response.status == 200) {
                            if (response.data.status == 200) {
                                if (response.data.json == 1) {
                                    $scope.status = "El registro con id=" + $scope.id + " se ha eliminado.";
                                } else {
                                    $scope.status = "Error en el borrado de datos del servidor 4";
                                }
                            } else {
                                $scope.status = "Error en la recepción de datos del servidor 5";
                            }
                        } else {
                            $scope.status = "Error en la recepción de datos del servidor 6";
                        }
                    }).catch(function (data) {
                        $scope.status = "Error en la recepción de datos del servidor 7";
                    });
                }
                $scope.back = function () {
                    window.history.back();
                };
                $scope.close = function () {
                    $location.path('/home');
                };
            }]);