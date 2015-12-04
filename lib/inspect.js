const _ = require('lodash')
const createConsoleTree = require('big-tree-cli')
const lib = require('./')

module.exports = {

  configurePacks (packs) {
    packs.inspect = () => {
      return createConsoleTree(lib.TreeBuilder.getTrailpackTree(packs))
    }

    _.each(packs, pack => {
      pack.inspect = () => {
        return `
      ---------------------------------------------------------------
        Trailpack:
          Name            : ${pack.name}
          Version         : ${pack.pkg.version}
          Description     : ${pack.pkg.description}
      ---------------------------------------------------------------`
      }
    })
  },

  configureApi (api) {
    api.controllers.inspect = () => {
      return createConsoleTree(lib.TreeBuilder.getControllerTree(api.controllers))
    }
    api.services.inspect = () => {
      return createConsoleTree(lib.TreeBuilder.getServiceTree(api.services))
    }
    api.models.inspect = () => {
      return createConsoleTree(lib.TreeBuilder.getModelTree(api.models))
    }
    api.policies.inspect = () => {
      return createConsoleTree(lib.TreeBuilder.getPoliciesTree(api.policies))
    }
    api.inspect = () => {
      return createConsoleTree(lib.TreeBuilder.getApiTree(api))
    }
  },

  configureApp (app) {
    app.inspect = () => {
      return `
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
