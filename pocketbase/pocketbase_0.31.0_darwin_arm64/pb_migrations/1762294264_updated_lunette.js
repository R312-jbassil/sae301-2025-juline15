/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_340737475")

  // remove field
  collection.fields.removeById("relation2414000814")

  // remove field
  collection.fields.removeById("relation35494866412")

  // add field
  collection.fields.addAt(7, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_1486587212",
    "hidden": false,
    "id": "relation416669013",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "materiau",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_340737475")

  // add field
  collection.fields.addAt(7, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_714137357",
    "hidden": false,
    "id": "relation2414000814",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "materiau_monture",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  // add field
  collection.fields.addAt(8, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_3456065716",
    "hidden": false,
    "id": "relation35494866412",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "materiau_branche",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  // remove field
  collection.fields.removeById("relation416669013")

  return app.save(collection)
})
