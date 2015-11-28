const _ = require('lodash')

const TreeBuilder = module.exports = {

  getApiTree (api) {
    return {
      label: 'API',
      nodes: [
        TreeBuilder.getControllerTree(api.controllers),
        TreeBuilder.getServiceTree(api.services),
        { label: 'Models', nodes: _.keys(_.omit(api.models, 'inspect')) },
        { label: 'Policies', nodes: _.keys(_.omit(api.policies, 'inspect')) }
      ]
    }
  },

  getModelTree (models) {
    return {
      label: 'Models',
      nodes: _.map(_.omit(models, 'inspect'), (model, modelName) => {
        console.log(model)
        return {
          label: modelName,
          nodes: _.keys(model.attributes)
        }
      })
    }
  },

  getPoliciesTree (policies) {
    return _.keys(_.omit(policies, 'inspect'))
  },

  getControllerTree (controllers) {
    return {
      label: 'Controllers',
      nodes: _.map(_.omit(controllers, 'inspect'), (controller, controllerName) => {
        return {
          label: controllerName,
          nodes: _.functions(controller)
        }
      })
    }
  },

  getServiceTree (services) {
    return {
      label: 'Services',
      nodes: _.map(_.omit(services, 'inspect'), (service, serviceName) => {
        return {
          label: serviceName,
          nodes: _.functions(service)
        }
      })
    }
  }
}
