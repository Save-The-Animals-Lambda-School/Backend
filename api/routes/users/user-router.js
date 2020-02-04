const express = require("express")
const Users = require("./user-model")
const router = express.Router()

router.get("/", async (req, res, next) => {
  try {
    const users = await Users.find()
   
    res.json(users)
  } catch (err) {
    console.log(err, 'get all users')
    next(err)
  }
})

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params
    const user = await Users.findById(id)
    return res.json(user)
  } catch (err) {
    next(err)
  }
})

router.post("/", async (req, res, next) => {
  try {
    const [id] = await db("users").insert(req.body)
    const newUser = await db("users").where('id', id).first()
    return res.status(201).json(newUser)
  } catch (err) {
    next(err)
  }
})

router.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params
    const updates = req.body

    await Users.update(id, updates)

    const updatedUser = await Users.findById(id)
    return res.status(200).json(updatedUser)
  } catch (error) {
    next(error)
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    await Users.remove(req.params.id)
    return res.status(200).json({ message: "User successfully deleted!" })
  } catch(error) {
    next(error)
  }
})

module.exports = router;