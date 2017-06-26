const createConsoleTree = require('big-tree-cli')
const lib = require('./')

module.exports = {

  configurePacks (packs = { }) {
    Object.defineProperty(packs, 'inspect', {
      enumerable: false,
      configurable: true,
      value () {
        return createConsoleTree(lib.TreeBuilder.getTrailpackTree(packs))
      }
    })

    Object.entries(packs).forEach(([ packName, pack ]) => {
      Object.defineProperty(pack, 'inspect', {
        enumerable: false,
        configurable: true,
        value () {
          return `
        ---------------------------------------------------------------
          Trailpack:
            Name            : ${pack.name}
            Version         : ${pack.pkg.version}
            Description     : ${pack.pkg.description}
        ---------------------------------------------------------------`
        }
      })
    })
  },

  unconfigurePacks (packs = { }) {
    delete packs.inspect
    Object.entries(packs).forEach(([ packName, pack ]) => delete pack.inspect)
  },

  configureApi (api) {
    Object.defineProperty(api.controllers, 'inspect', {
      enumerable: false,
      configurable: true,
      value () {
        return createConsoleTree(lib.TreeBuilder.getControllerTree(api.controllers))
      }
    })
    Object.defineProperty(api.services, 'inspect', {
      enumerable: false,
      configurable: true,
      value () {
        return createConsoleTree(lib.TreeBuilder.getServiceTree(api.services))
      }
    })
    Object.defineProperty(api.models, 'inspect', {
      enumerable: false,
      configurable: true,
      value () {
        return createConsoleTree(lib.TreeBuilder.getModelTree(api.models))
      }
    })
    Object.defineProperty(api.policies, 'inspect', {
      enumerable: false,
      configurable: true,
      value () {
        return createConsoleTree(lib.TreeBuilder.getPoliciesTree(api.policies))
      }
    })
    Object.defineProperty(api, 'inspect', {
      enumerable: false,
      configurable: true,
      value () {
        return createConsoleTree(lib.TreeBuilder.getApiTree(api))
      }
    })
  },

  unconfigureApi (api) {
    delete api.controllers.inspect
    delete api.services.inspect
    delete api.models.inspect
    delete api.policies.inspect
    delete api.inspect
  },

  configureApp (app) {
    Object.defineProperty(app, 'inspect', {
      enumerable: false,
      configurable: true,
      value () {
        return `
        ---------------------------------------------------------------
          Basic Info
            Name              : ${app.pkg.name}
            Version           : ${app.pkg.version}
            Environment       : ${process.env.NODE_ENV}

          API Info
            Models            : ${Object.keys(app.api.models)}
            Controllers       : ${Object.keys(app.api.controllers)}
            Services          : ${Object.keys(app.api.services)}
            Policies          : ${Object.keys(app.api.policies)}
        ---------------------------------------------------------------
      `
      }
    })
  },

  unconfigureApp (app) {
    delete app.inspect
  }
}

