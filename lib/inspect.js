module.exports = {
  configureApi (api) {
    api.controllers.inspect = () => {
      return ConsoleTree(lib.TreeBuilder.getControllerTree(api.controllers))
    }
    api.services.inspect = () => {
      return ConsoleTree(lib.TreeBuilder.getServiceTree(api.services))
    }
    api.models.inspect = () => {
      return ConsoleTree(lib.TreeBuilder.getModelTree(api.models))
    }
    api.policies.inspect = () => {
      return ConsoleTree(lib.TreeBuilder.getPoliciesTree(api.policies))
    }
    api.inspect = () => {
      return ConsoleTree(lib.TreeBuilder.getApiTree(api))
    }
  }
}
