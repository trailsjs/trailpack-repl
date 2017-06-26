const omit = require('lodash.omit')
const functions = require('lodash.functions')

const TreeBuilder = module.exports = {

  getTrailpackTree (packs) {
    return {
      label: 'Trailpacks',
      nodes: Object.keys(omit(packs, 'inspect'))
    }
  },

  getApiTree (api) {
    return {
      label: 'API',
      nodes: [
        TreeBuilder.getControllerTree(api.controllers),
        TreeBuilder.getServiceTree(api.services),
        {label: 'Models', nodes: Object.keys(omit(api.models, 'inspect'))},
        {label: 'Policies', nodes: Object.keys(omit(api.policies, 'inspect'))}
      ]
    }
  },

  getModelTree (models) {
    return {
      label: 'Models',
      nodes: omit(models, 'inspect').map((model, modelName) => {
        return {
          label: modelName,
          nodes: Object.keys(model.attributes)
        }
      })
    }
  },

  getPoliciesTree (policies) {
    return Object.keys(omit(policies, 'inspect'))
  },

  getControllerTree (controllers) {
    return {
      label: 'Controllers',
      nodes: omit(controllers, 'inspect').map((controller, controllerName) => {
        return {
          label: controllerName,
          nodes: functions(controller)
        }
      })
    }
  },

  getServiceTree (services) {
    return {
      label: 'Services',
      nodes: omit(services, 'inspect').map((service, serviceName) => {
        return {
          label: serviceName,
          nodes: functions(service)
        }
      })
    }
  }
}
