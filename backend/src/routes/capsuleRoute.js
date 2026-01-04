const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/authMiddleware')
const {createCapsule , getAllCapsule , getCapsuleById , deleteCapsule , updateCapsule} = require('../controller/capsuleController')

router.get('/',authMiddleware, getAllCapsule)
router.post('/',authMiddleware,createCapsule)
router.get('/:id',authMiddleware,getCapsuleById)
router.put('/:id',authMiddleware, updateCapsule)
router.delete('/:id',authMiddleware,deleteCapsule)

module.exports = router

//router