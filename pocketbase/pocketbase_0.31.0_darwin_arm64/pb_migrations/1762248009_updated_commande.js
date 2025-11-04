/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_782564964")

  // update field
  collection.fields.addAt(3, new Field({
    "hidden": false,
    "id": "select300686044",
    "maxSelect": 1,
    "name": "statut_commande",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "select",
    "values": [
      "panier",
      "payee",
      "annulee",
      "expediee"
    ]
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_782564964")

  // update field
  collection.fields.addAt(3, new Field({
    "hidden": false,
    "id": "select300686044",
    "maxSelect": 1,
    "name": "statut_commande",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "select",
    "values": [
      "panier, payee, annulee, expediee"
    ]
  }))

  return app.save(collection)
})
