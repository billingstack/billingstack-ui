billingstack.factory("Token", ['config','$resource', function (config, $resource) {
	return $resource(config.endpoint + '/tokens',{},{})
}])
billingstack.factory("Language", ['config','$resource', function (config, $resource) {
	return $resource(config.endpoint + '/languages/:name',{'name':'@id'},{})
}])
billingstack.factory("Currency", ['config','$resource', function (config, $resource) {
	return $resource(config.endpoint + '/currencies/:name',{'name':'@id'},{})
}])
billingstack.factory("PaymentGatewayProvider", ['config','$resource', function (config, $resource) {
	return $resource(config.endpoint + '/payment-gateway-providers/:id',{'id' : '@id'},{});
}])
billingstack.factory("Merchant", ['config','$resource', function (config, $resource) {
	return $resource(config.endpoint + '/merchants/:id',{'id' : '@id'},{});
}])
billingstack.factory("PaymentGatewayConfiguration", ['config','$resource', function (config, $resource) {
	return $resource(config.endpoint + '/merchants/:merchant/payment-gateways/:id',{'id' : '@id'},{});
}])
billingstack.factory("Product", ['config','$resource', function (config, $resource) {
	return $resource(config.endpoint + '/merchants/:merchant/products/:id',{'id' : '@id'},{
		update : {method:'PUT'}
	})
}])
billingstack.factory("Plan", ['config','$resource', function (config, $resource) {
	return $resource(config.endpoint + '/merchants/:merchant/plans/:id',{'id' : '@id'},{
		update : {method:'PUT'}
	})
}])
billingstack.factory("PlanItem", ['config','$resource', function (config, $resource) {
	return $resource(config.endpoint + '/merchants/:merchant/plans/:plan/items/:id',{'id' : '@id'},{
		create : {method:'PUT'},
		update : {method:'PATCH'}
	})
}])
billingstack.factory("Customer", ['config','$resource', function (config, $resource) {
	return $resource(config.endpoint + '/merchants/:merchant/customers/:id',{'id' : '@id'},{
		update : {method:'PATCH'}
	})
}])
billingstack.factory("CustomerAction", ['config','$resource', function (config, $resource) {
	return $resource(config.endpoint + '/merchants/:merchant/customers/:customer/action',{},{
		action : {method:'POST'}
	})
}])
billingstack.factory("PaymentMethod", ['config','$resource', function (config, $resource) {
	return $resource(config.endpoint + '/merchants/:merchant/customers/:customer/payment-methods/:id',{'id' : '@id'},{});
}])
billingstack.factory("Subscription", ['config','$resource', function (config, $resource) {
	return $resource(config.endpoint + '/merchants/:merchant/subscriptions/:id',{'id' : '@id'},{});
}])
billingstack.factory("Usage", ['config','$resource', function (config, $resource) {
	return $resource(config.endpoint + '/merchants/:merchant/usage/:id',{'id' : '@id'},{});
}])
billingstack.factory("Invoice", ['config','$resource', function (config, $resource) {
	return $resource(config.endpoint + '/merchants/:merchant/invoices/:id',{'id' : '@id'},{
		update : {method:'PUT'}
	})
}])
billingstack.factory("InvoiceLine", ['config','$resource', function (config, $resource) {
	return $resource(config.endpoint + '/merchants/:merchant/invoices/:invoice/lines/:id',{'id' : '@id'},{
		update : {method:'PATCH'}
	})
}])
billingstack.factory("Transaction", ['config','$resource', function (config, $resource) {
	return $resource(config.endpoint + '/merchants/:merchant/transactions/:id',{'id' : '@id'},{});
}])