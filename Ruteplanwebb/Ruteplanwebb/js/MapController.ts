﻿///<reference path="../ts/typings/angularjs/angular.d.ts"/>
///<reference path="../ts/typings/openlayers/openlayers.d.ts"/>
///<reference path="helpers/OpenLayers.Awsome.Icon.d.ts"/>
///<reference path="app.ts"/>
///<reference path="domain.ts"/>
///<reference path="scopes.ts"/>

/* The MapController, holds functionality for the map implementation (autocomplete, searching, routing,...)*/
class MapController {
    constructor(private $scope: IMapControllerScope, private $http: ng.IHttpService, routingService: any) {

        $scope.getLocations = (val) => {
            return routingService.getLocationsSk(val);
        };

        $scope.doRouteCalculation = () => {
            $scope.routeLayer.removeAllFeatures();

            routingService.calculateRoute($scope.fromAddress.location, $scope.toAddress.location,
                (bounds, features, directions) => {
                    $scope.directions = directions;

                    // scale bounds to better fit the map
                    $scope.map.zoomToExtent(bounds.scale(1.1));

                    // apply styles to features
                    var styles = [
                        {
                            graphicZIndex: 2,
                            strokeOpacity: 1,
                            strokeColor: "#008CFF",
                            strokeWidth: 5
                        },
                        {
                            graphicZIndex: 1,
                            strokeOpacity: 1,
                            strokeColor: "#858585",
                            strokeWidth: 5
                        }
                    ];

                    var style = 0;
                    angular.forEach(features, feature => {
                        feature.style = styles[style];
                        if (style < styles.length - 1) style++;
                    });

                    // add features to map
                    $scope.routeLayer.addFeatures(features);
                }
            );
        };

        $scope.updateMarkers = () => {
            $scope.markerLayer.clearMarkers();

            if ($scope.fromAddress != null) {
                var faicon = new OpenLayers.AwsomeIcon('play', 'green', 'white', 'fa');
                $scope.markerLayer.addMarker(new OpenLayers.Marker($scope.fromAddress.location, faicon));
            }
            if ($scope.toAddress != null) {
                var fato= new OpenLayers.AwsomeIcon('stop', 'red', 'white', 'fa');
                $scope.markerLayer.addMarker(new OpenLayers.Marker($scope.toAddress.location, fato));
            }
            //If both from and to are set, do route calculculation automatically
            if ($scope.fromAddress != null && $scope.toAddress != null) {
                $scope.doRouteCalculation();
            }

        };

        $scope.contextMenuSetFrom = (loc:any) => {
            $scope.fromAddress = new AddressItem("Punkt i kartet", $scope.map.getLonLatFromPixel(loc));
            $scope.updateMarkers();
        };

        $scope.contextMenuSetTo = (loc: any) => {
            $scope.toAddress = new AddressItem("Punkt i kartet", $scope.map.getLonLatFromPixel(loc));
            $scope.updateMarkers();
        };
        
    }

}
