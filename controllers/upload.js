app.controller('upload', function ($scope, $timeout, $filter) {
	$scope.header="Upload Your Ride!";
	
	$scope.uploadComplete = function (content, completed) {
		if (completed && content.length > 0) {
			$scope.response = (content); // Presumed content is a json string!
			console.log(content);
		}
	};
});
