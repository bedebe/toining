'use strict';
angular.module('myApp')
.factory('Records', function(API_URL, $resource){
	return $resource(API_URL+"record", {id: "@_id"}, {
		update: { method: "PUT", params: { id: "@id" }}
	})
})