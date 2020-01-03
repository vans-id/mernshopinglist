const express = require('express')
const router = express.Router()

// item model
const Item = require('../../models/Item')

// @route GET api/items
// @desc Get All items
// @access public
router.get('/', (req, res) => {
  Item.find()
    .sort({ date: -1 })
    .then(items => res.send(items))
    .catch(err =>
      res.status(400).json(`Error: ${err}`)
    )
})

// @route POST api/items
// @desc Create an item
// @access public
router.post('/', (req, res) => {
  const newItem = new Item({
    name: req.body.name
  })

  newItem
    .save()
    .then(item => res.send(item))
    .catch(err =>
      res.status(400).json(`Error: ${err}`)
    )
})

// @route DELETE api/items/:id
// @desc Delete an item
// @access public
router.delete('/:id', (req, res) => {
  Item.findById(req.params.id)
    .then(item =>
      item
        .remove()
        .then(() => res.send({ success: true }))
    )
    .catch(err =>
      res.status(400).json({ success: false })
    )
})

module.exports = router
