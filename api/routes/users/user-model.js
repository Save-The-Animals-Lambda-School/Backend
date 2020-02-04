const bcrypt = require('bcryptjs')
const db = require('../../../data/db-config')

function find() {
  return db("users").select("id", "email", "username", "first_name", "last_name")
}

function findBy(filter) {
  return db("users").where(filter).select("id", "email", "username", "first_name", "last_name")
}

async function add(user) {
  user.password = await bcrypt.hash(user.password, 14)
  return db("users").insert(user).returning("*")
}

function findById(id) {
  return db("users").where({ id }).first("id", "username", "email", "first_name", "last_name")
}

function update(id, changes) {
  return db("users")
    .where({ id })
    .update(changes)
    .returning("*")
}

function remove(id) {
  return db("users")
    .where({ id })
    .del()
}

module.exports = {
  add, 
  find, 
  findBy, 
  findById,
  remove,
  update
}