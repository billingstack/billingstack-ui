var proto = 'http'
var host = 'localhost';
var port = '9091';
var path = '/v1'

angular.element(document).ready(function() {
        billingstack.value('config', {
                endpoint : proto + '://' + host + '\\:' + port + path
        })
        angular.bootstrap(document, ['billingstack']);
});
