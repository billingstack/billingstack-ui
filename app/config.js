angular.element(document).ready(function() {
	billingstack.value('config', {
		endpoint : 'http://localhost\\:8080/billingstack-api'
	})
	angular.bootstrap(document, ['billingstack']);
});