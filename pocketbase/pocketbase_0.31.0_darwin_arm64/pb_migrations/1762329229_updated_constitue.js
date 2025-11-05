/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3459027961")

  // remove field
  collection.fields.removeById("relation1818816383")

  // add field
  collection.fields.addAt(2, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_1486587212",
    "hidden": false,
    "id": "relation2831090566",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "libelle_materiau",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3459027961")

  // add field
  collection.fields.addAt(2, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_714137357",
    "hidden": false,
    "id": "relation1818816383",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "libelle_materiau_monture",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  // remove field
  collection.fields.removeById("relation2831090566")

  return app.save(collection)
})
