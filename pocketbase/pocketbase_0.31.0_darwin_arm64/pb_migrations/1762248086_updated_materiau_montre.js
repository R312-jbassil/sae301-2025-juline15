/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_714137357")

  // update collection data
  unmarshal({
    "name": "materiau_monture"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_714137357")

  // update collection data
  unmarshal({
    "name": "materiau_montre"
  }, collection)

  return app.save(collection)
})
