/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_340737475")

  // remove field
  collection.fields.removeById("number438371369")

  // add field
  collection.fields.addAt(5, new Field({
    "hidden": false,
    "id": "select1396272600",
    "maxSelect": 1,
    "name": "largeur_pont",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "select",
    "values": [
      "15",
      "17",
      "19",
      "21"
    ]
  }))

  // add field
  collection.fields.addAt(9, new Field({
    "hidden": false,
    "id": "select4105839681",
    "maxSelect": 1,
    "name": "taille_verre",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "select",
    "values": [
      "48",
      "52",
      "57",
      "60"
    ]
  }))

  // update field
  collection.fields.addAt(4, new Field({
    "hidden": true,
    "id": "number1396272600",
    "max": null,
    "min": null,
    "name": "largeur_ponts",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_340737475")

  // add field
  collection.fields.addAt(5, new Field({
    "hidden": false,
    "id": "number438371369",
    "max": null,
    "min": null,
    "name": "taille_verres",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  // remove field
  collection.fields.removeById("select1396272600")

  // remove field
  collection.fields.removeById("select4105839681")

  // update field
  collection.fields.addAt(4, new Field({
    "hidden": false,
    "id": "number1396272600",
    "max": null,
    "min": null,
    "name": "largeur_pont",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  return app.save(collection)
})
