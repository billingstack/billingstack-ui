billingstack
	.directive('paymentGatewayProviders', ['PaymentGatewayProvider',function(PaymentGatewayProvider) {
		return {
			restrict : 'C',
			link : function(scope, element, attrs) {
				
				scope.refresh = function() {
					scope.paymentGatewayProviders = PaymentGatewayProvider.query();
				}
				
				scope.refresh();
				
			}
		}
	}])
	.directive('paymentGateways', ['PaymentGateway',function(PaymentGateway) {
		return {
			restrict : 'C',
			link : function(scope, element, attrs) {
				
				scope.refresh = function() {
					scope.paymentGateways = PaymentGateway.query({'merchant':config.merchant.id});
				}
				
				scope.refresh();
				
			}
		}
	}])
	.directive('merchants', ['Merchant',function(Merchant) {
		return {
			restrict : 'C',
			link : function(scope, element, attrs) {
				
				scope.refresh = function() {
					scopre.merchants = Merchant.query();
				}
				
				scope.refresh();
				
			}
		}
	}])
	.directive('merchant', ['Merchant',function(Merchant) {
		return {
			restrict : 'C',
			link : function(scope, element, attrs) {
				
				scope.remove = function() {
					new Merchant({id : scope.m.id }).$delete(function() {
						scope.refresh();
					});
				}
				
			}
		}
	}])
	.directive('paymentGatewayConfigurations', ['PaymentGatewayConfiguration',function(PaymentGatewayConfiguration) {
		return {
			restrict : 'C',
			link : function(scope, element, attrs) {
				
				scope.refresh = function() {
					scope.paymentGatewayConfigurations = PaymentGatewayConfiguration.query({'merchant':config.merchant.id});
				}
				
				scope.refresh();
				
			}
		}
	}])
	.directive('paymentGatewayConfiguration', ['PaymentGatewayConfiguration',function(PaymentGatewayConfiguration) {
		return {
			restrict : 'C',
			link : function(scope, element, attrs) {
				
				scope.remove = function() {
					new PaymentGatewayConfiguration({'merchant':config.merchant.id,id : scope.p.id }).$delete(function() {
						scope.refresh();
					});
				}
				
			}
		}
	}])
	.directive('plan', ['$routeParams','config','Plan','PlanItem',function($routeParams, config, Plan, PlanItem) {
		return {
			restrict : 'C',
			link : function(scope, element, attrs) {
				
				if($routeParams.plan_id) {
					
					scope.ifContainsProduct = function(p) {
						var contains = false;
						angular.forEach(scope.plan.items, function(item) {
							if(item.product_id == p.id) {
								contains = true;
							}
						});
						return contains;
					}
					
					scope.onClickProduct = function(p) {
						if(p.checked) {
							new PlanItem().$create({'merchant':config.merchant.id, plan : $routeParams.plan_id, id : p.id}, function(data) {
								scope.plan.items.push({product_id : p.id, title : p.title, pricing : []})
							})
						} else {
							new PlanItem().$delete({'merchant':config.merchant.id,plan : $routeParams.plan_id, id : p.id}, function(data) {
								scope.plan.items = _.filter(scope.plan.items, function(item) { return item.product_id != p.id })
							})
							
						}
					}

				}

			}
		}
	}])
	.directive('planItem', [function() {
		return {
			restrict : 'C',
			link : function(scope, element, attrs) {
				
				scope.addRule = function() {
					var newRule = {
						"type" : scope.rule_type,
					}
					if(scope.rule_type != 'fixed') {
						newRule.tiers = []
					}
					scope.item.pricing.push(newRule)
				}
				
				scope.removeRule = function(index) {
					scope.item.pricing.splice(index,1)
				}
				
				scope.remove = function() {
					new Plan({'merchant':config.merchant.id,id : scope.p.id }).$delete(function() {
						scope.refresh();
					});
				}
				
			}
		}
	}])
	.directive('tieredPricing', [function() {
		return {
			restrict : 'C',
			link : function(scope, element, attrs) {
				
				scope.addTier = function() {
					scope.rule.tiers.push({"from" : "0", "to" : "0", "price" : "0.00"})
				}
				
				scope.removeTier = function(index) {
					scope.rule.tiers.splice(index,1)
				}
				
			}
		}
	}])
	.directive('customer', ['Customer',function(Customer) {
		return {
			restrict : 'C',
			link : function(scope, element, attrs) {
				
				scope.remove = function() {
					new Customer({'merchant':config.merchant.id,id : scope.c.id }).$delete(function() {
						scope.refresh();
					});
				}
				
			}
		}
	}])
	.directive('paymentMethod', ['PaymentMethod',function(PaymentMethod) {
		return {
			restrict : 'C',
			link : function(scope, element, attrs) {
				
				scope.remove = function() {
					new PaymentMethod().$delete({'merchant':config.merchant.id,customer : scope.p.customer, id : scope.p.id},function() {
						scope.refresh();
					});
				}
				
			}
		}
	}])
	.directive('properties', [function() {
		return {
			restrict : 'C',
			scope : {
				properties: '=bind'
			},
			templateUrl : 'app/templates/common/properties.html',
			link : function(scope, element, attrs) {
				
				scope.addProperty = function() {
					scope.properties.push({key : '', value : ''});
				}
				
				scope.removeProperty = function(index) {
					scope.properties.splice(index, 1);
				}
				
			}
		}
	}])
	.directive('selectLanguages', ['Language',function(Language) {
		return {
			restrict : 'C',
			scope : {
				model: '=bind'
			},
			template : '<select ng-model="model" ng-options="l.name as l.title + \' (\' + l.name + \')\' for l in languages"></select>',
			replace : true,
			link : function(scope, element, attrs) {
				
				scope.languages = Language.query(function(languages) {
					scope.model = languages[0].name
				});
				
			}
		}
	}])
	.directive('selectCurrencies', ['Currency',function(Currency) {
		return {
			restrict : 'C',
			scope : {
				model: '=bind'
			},
			template : '<select ng-model="model" ng-options="c.name as c.title + \' (\' + c.name + \')\' for c in currencies"></select>',
			replace : true,
			link : function(scope, element, attrs) {
				
				scope.currencies = Currency.query(function(currencies) {
					scope.model = currencies[0].name
				});
				
			}
		}
	}])