const _ = require('lodash')
const ConsoleTree = require('big-tree-cli')
const lib = require('./')

module.exports = {
  configurePacks (packs) {
    packs.inspect = () => {
      return ConsoleTree(lib.TreeBuilder.getTrailpackTree(packs))
    }
  },

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
  },

  configureApp (app) {
    app.inspect = () => {
      return `
        Trails Application
        ---------------------------------------------------------------
        Basic Info
          Name              : ${app.pkg.name}
          Version           : ${app.pkg.version}
          Environment       : ${process.env.NODE_ENV}

        API Info
          Models            : ${_.keys(_.omit(app.api.models, 'inspect'))}
          Controllers       : ${_.keys(_.omit(app.api.controllers, 'inspect'))}
          Services          : ${_.keys(_.omit(app.api.services, 'inspect'))}
          Policies          : ${_.keys(_.omit(app.api.policies, 'inspect'))}
        ---------------------------------------------------------------
      `
    }
  }
}
