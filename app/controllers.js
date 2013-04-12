billingstack
	.controller('SignUpController', ['$scope','$location','config','Merchant',function($scope, $location, config, Merchant) {
		
		sessionStorage.setItem('billingstack.session', "{}")
		delete config.merchant
		
		$scope.merchant = {
			name : '',
			language : '',
			currency : ''
		}
		
		$scope.sign_up = function() {
			new Merchant($scope.merchant).$save(function() {
				$location.path('/sign-in')
			});
		}
		
	}])
	.controller('SignInController', ['$scope','$location','config','Token',function($scope, $location, config, Token) {
		
		sessionStorage.setItem('billingstack.session', "{}")
		delete config.merchant
		
		$scope.authentication = {
			merchant : ''
		}
		
		$scope.sign_in = function() {
			//new Merchant($scope.merchant).$save();
			new Token($scope.authentication).$save(function(data) {
				var sessionJson = sessionStorage.getItem('billingstack.session')
				var session = JSON.parse(sessionJson)
				session.merchant = data.merchant
				sessionStorage.setItem('billingstack.session', JSON.stringify(session))
				config.merchant = data.merchant
				$location.path('/customers');	
			})
		}
		
	}])
	.controller('PaymentGatewayConfigurationController', ['$scope','$location','PaymentGatewayConfiguration',function($scope, $location, PaymentGatewayConfiguration) {
		
		$scope.paymentGatewayConfiguration = {
			name : ''
		}
		
		$scope.save = function() {
			new PaymentGatewayConfiguration($scope.paymentGatewayConfiguration).$save({merchant:config.merchant.id}, function() {
				$location.path('/payment-gateways')
			});
		}
		
	}])
	.controller('ProductsController', ['$scope','config','Product',function($scope, config, Product) {
		
		$scope.refresh = function() {
			$scope.products = Product.query({merchant:config.merchant.id});
		}
		$scope.remove = function(id) {
			new Product().$delete({'merchant':config.merchant.id,id:id}, function() {
				$scope.refresh();
			});
		}
	}])
	.controller('ProductController', ['$scope','$location','$routeParams','Product',function($scope, $location, $routeParams, Product) {
		
		if($routeParams.product_id) {
			
			Product.get({merchant : $scope.config.merchant.id, id : $routeParams.product_id}, function(data) {
				var properties = []
				angular.forEach(data.properties, function(key, value) {
					properties.push({key : key, value : value});
				})
				data.properties = properties;
				$scope.product = data;
			})
			
			$scope.save = function() {
					var product = new Product($scope.product)
					var properties = {}
					angular.forEach(product.properties, function(property) {
						properties[property.key] = property.value
					});
					
					product.properties = properties
					product.$update({merchant : $scope.config.merchant.id});
			}
			
			$scope.remove = function() {
				new Product({'merchant':$scope.config.merchant.id,id : $scope.product.id }).$delete(function() {
					scope.refresh();
				});
			}

		} else {
			
			$scope.product = {
				name : '',
				title : '',
				description : '',
				properties : []
			}
			
			$scope.save = function() {
				var product = new Product($scope.product)
				var properties = {}
				angular.forEach(product.properties, function(property) {
					properties[property.key] = property.value
				});
				
				product.properties = properties
				product.$save({merchant : $scope.config.merchant.id}, function() {
					$location.path('/products')
				});
			}
			
		}

	}])
	.controller('PlansController', ['$scope','config','Plan',function($scope, config, Plan) {
		
		$scope.refresh = function() {
			$scope.plans = Plan.query({'merchant':config.merchant.id});
		}
		$scope.remove = function(id) {
			new Plan().$delete({'merchant':config.merchant.id,id:id}, function() {
				$scope.refresh();
			});
		}
	}])
	.controller('PlanController', ['$scope','$location','$routeParams','config','Product','Plan','PlanItem',function($scope, $location, $routeParams, config, Product, Plan, PlanItem) {
		
		if($routeParams.plan_id) {
			
			$scope.remove = function() {
				new Plan().$delete({merchant : config.merchant.id,id:$scope.plan.id}, function() {
					$location.path('/plans');
				});
			}
			
			$scope.save = function() {
					//$scope.plan.$update();
					angular.forEach($scope.plan.items, function(item) {
						new PlanItem(item).$update({merchant : config.merchant.id, plan : $routeParams.plan_id, id : item.product_id})
					})
			}

			$scope.reset = function() {
				$scope.products = Product.query({merchant : config.merchant.id});
				$scope.plan = Plan.get({merchant : $scope.config.merchant.id, id : $routeParams.plan_id})
			}
					
			$scope.reset();

		} else {
			
			$scope.plan = {
				name : '',
				title : '',
				description : ''
			}
			
			$scope.save = function() {
				new Plan($scope.plan).$save({merchant : $scope.config.merchant.id}, function() {
					$location.path('/plans')
				});
			}
			
		}
		
	}])
	.controller('CustomersController', ['$scope','config','Customer','CustomerAction',function($scope, config, Customer, CustomerAction) {

		$scope.refresh = function() {
			$scope.customers = Customer.query({'merchant':config.merchant.id});
		}
		$scope.remove = function(id) {
			new Customer().$delete({'merchant':config.merchant.id,id:id}, function() {
				$scope.refresh();
			});
		}
		$scope.bill = function(id) {
			new CustomerAction({bill:{}}).$action({merchant:config.merchant.id,customer:id}, function() {
				
			});
		}
	}])
	.controller('CustomerController', ['$scope','$location','$routeParams','config','Customer',function($scope, $location, $routeParams, config, Customer) {
		
		if($routeParams.customer_id) {
			
			$scope.remove = function() {
				new Custome().$delete({merchant : config.merchant.id,id:$scope.customer.id}, function() {
					$location.path('/customers');
				});
			}
			
			$scope.save = function() {
					$scope.customer.$update({merchant : config.merchant.id,id:$scope.customer.id});
			}

			$scope.reset = function() {
				$scope.customer = Customer.get({merchant : $scope.config.merchant.id, id : $routeParams.customer_id})
			}
					
			$scope.reset();

		} else {

			$scope.customer = {
				name : '',
				title : '',
				language : '',
				currency : '',
				description : ''
			}

			$scope.save = function() {
				new Customer($scope.customer).$save({merchant : config.merchant.id}, function() {
					$location.path('/customers')
				});
			}
			
		}
		
	}])
	.controller('PaymentMethodsController', ['$scope','$location','$routeParams','config','PaymentMethod',function($scope, $location, $routeParams, config, PaymentMethod) {
		
		$scope.refresh = function() {
			$scope.paymentMethods = PaymentMethod.query({merchant:config.merchant.id, customer : $routeParams.customer_id});
		}
		
		$scope.refresh();
		
	}])
	.controller('PaymentMethodController', ['$scope','$location','$routeParams','config','PaymentMethod',function($scope, $location, $routeParams, config, PaymentMethod) {
		
		$scope.paymentMethod = {
			name : ''
		}
		
		$scope.save = function() {
			new PaymentMethod($scope.paymentMethod).$save({merchant:config.merchant.id, customer : $routeParams.customer_id},function() {
				$location.path('/customers/'+$routeParams.customer_id+'/payment-methods')
			});
		}
		
	}])
	.controller('SubscriptionsController', ['$scope','$routeParams','config','Subscription',function($scope, $routeParams, config, Subscription) {
		$scope.refresh = function() {
			if($routeParams.customer_id) {
				$scope.subscriptions = Subscription.query({
					'merchant':config.merchant.id,
					'q.field':'customer_id',
					'q.op':'eq',
					'q.value':$routeParams.customer_id
				});
			} else {
				$scope.subscriptions = Subscription.query({'merchant':config.merchant.id});
			}
		}
		$scope.remove = function(id) {
			new Subscription().$delete({'merchant':config.merchant.id,id:id}, function() {
				$scope.refresh();
			});
		}
	}])
	.controller('SubscriptionController', ['$scope','$location','$routeParams','config','PaymentMethod','Plan','Subscription',function($scope, $location, $routeParams, config, PaymentMethod, Plan, Subscription) {
		
		$scope.plans = Plan.query({merchant : config.merchant.id})
		$scope.paymentMethods = PaymentMethod.query({merchant : config.merchant.id, customer : $routeParams.customer_id})
		
		if($routeParams.subscription_id) {
			
			$scope.remove = function() {
				new Subscription({'merchant':config.merchant.id, id : scope.s.id }).$delete(function() {
					$location.path('/subscriptions')
				});
			}
			
			$scope.reset = function() {
				$scope.subscription = Subscription.get({merchant : $scope.config.merchant.id, id : $routeParams.subscription_id})
			}
					
			$scope.reset();
			
		} else {
			
			$scope.subscription = {
				plan_id : '',
				customer_id : $routeParams.customer_id
			}

			$scope.save = function() {
				new Subscription($scope.subscription).$save({merchant : config.merchant.id}, function() {
					$location.path('/subscriptions')
				});

			}
		}
		
	}])
	.controller('UsageListController', ['$scope','$routeParams','config','Usage',function($scope, $routeParams, config, Usage) {
		
		$scope.refresh = function() {
			if($routeParams.customer_id) {
				$scope.usage = Usage.query({
					'merchant':config.merchant.id,
					'q.field':'customer_id',
					'q.op':'eq',
					'q.value':$routeParams.customer_id
				});
			} else {
				$scope.usage = Usage.query({'merchant':config.merchant.id});
			}
		}
		$scope.remove = function(id) {
			new Usage().$delete({'merchant':config.merchant.id,id:id}, function() {
				$scope.refresh();
			});
		}
	}])
	.controller('UsageController', ['$scope','$location','$routeParams','config','Usage',function($scope, $location, $routeParams, config, Usage) {
		
		if($routeParams.usage_id) {
			
		} else {
			
			$scope.usage = {
				subscription_id : $routeParams.subscription_id
			}
			
			$scope.save = function() {
				new Usage($scope.usage).$save({merchant : config.merchant.id}, function() {
					$location.path('/usage')
				});
			}
			
		}
		
	}])
	.controller('InvoicesController', ['$scope','$routeParams','config','Invoice',function($scope, $routeParams, config, Invoice) {
		
		$scope.refresh = function() {
			if($routeParams.customer_id) {
				$scope.invoices = Invoice.query({
					'merchant':config.merchant.id,
					'q.field':'customer_id',
					'q.op':'eq',
					'q.value':$routeParams.customer_id
				});
			} else {
				$scope.invoices = Invoice.query({'merchant':config.merchant.id});
			}
		}
		$scope.remove = function(id) {
			new Invoice().$delete({'merchant':config.merchant.id,id:id}, function() {
				$scope.refresh();
			});
		}
	}])
	.controller('InvoiceController', ['$scope','$location','$routeParams','config','Invoice','InvoiceLine',function($scope, $location, $routeParams, config, Invoice, InvoiceLine) {
		
		if($routeParams.invoice_id) {
			
			$scope.invoice = Invoice.get({'merchant':config.merchant.id, id : $routeParams.invoice_id})
			
			$scope.save = function() {
					var lines = $scope.invoice.lines
					$scope.invoice.$update({'merchant':config.merchant.id}, function() {
						$scope.invoice.lines = []
						angular.forEach(lines, function(line) {
							if(!line.id) {
								new InvoiceLine(line).$save({merchant : config.merchant.id, invoice : $routeParams.invoice_id},function(data) {
									$scope.invoice.lines.push(data)
								});
							} else {
								new InvoiceLine(line).$update({merchant : config.merchant.id, invoice : $routeParams.invoice_id},function(data) {
									$scope.invoice.lines.push(data)
								});
							}
						})
					});
					
			}
			
			$scope.remove = function() {
				new Invoice({'merchant':config.merchant.id, id : $scope.invoice.id }).$delete(function() {
					$scope.refresh();
				});
			}

		} else {
			
			$scope.invoice = {
				customer_id : $routeParams.customer_id,
				lines : []
			}
			
			$scope.save = function() {
					var lines = $scope.invoice.lines
					new Invoice($scope.invoice).$save({merchant : config.merchant.id}, function(data) {
						angular.forEach(lines, function(line) {
							new InvoiceLine(line).$save({merchant : config.merchant.id, invoice : data.id},function() {
								
							});
						})
					});
					$location.path('/invoices')
			}
			
		}
		
		$scope.addLine = function() {
			$scope.invoice.lines.push({});
		}
		
		$scope.removeLine = function(index) {
			$scope.invoice.lines.splice(index,1);
		}
		
	}])
	.controller('TransactionsController', ['$scope','config','$routeParams','Transaction',function($scope, config, $routeParams, Transaction) {
		
		$scope.refresh = function() {
			if($routeParams.customer_id) {
				$scope.transactions = Transaction.query({
					'merchant':config.merchant.id,
					'q.field':'customer_id',
					'q.op':'eq',
					'q.value':$routeParams.customer_id
				});
			} else {
				$scope.transactions = Transaction.query({'merchant':config.merchant.id});
			}
			
		}
		$scope.remove = function(id) {
			new Transaction().$delete({'merchant':config.merchant.id,id:id}, function() {
				$scope.refresh();
			});
		}
	}])
	.controller('TransactionController', ['$scope','$location','$routeParams','config','Invoice','Transaction',function($scope, $location, $routeParams, config, Invoice, Transaction) {
		
		$scope.invoices = Invoice.query({merchant:config.merchant.id, customer: $routeParams.customer_id});
		
		$scope.transaction = {
			customer_id : $routeParams.customer_id
		}
		
		$scope.save = function() {
			new Transaction($scope.transaction).$save({'merchant':config.merchant.id}, function() {
				$location.path('/transactions')
			});
			
		}
		
		$scope.remove = function() {
			new Transaction({'merchant':config.merchant.id, id : scope.t.id }).$delete(function() {
				$scope.refresh();
			});
		}
		
	}])