const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/authMiddleware')
const {createCapsule , getAllCapsule , getCapsuleById} = require('../controller/capsuleController')

router.get('/',authMiddleware, getAllCapsule)
router.post('/',authMiddleware,createCapsule)
router.get('/:id',authMiddleware,getCapsuleById)

module.exports = router