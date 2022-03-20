const jsonwebtoken = require('jsonwebtoken');
const md5 = require('md5');
const access = require('../utils/access');
const models = require('../../models/index');
const user = models.user
const SECRET_KEY = "inisecret"

class User {
  async login(req, res) {
    try {

      const param = {
        username: req.body.username,
        password: md5(req.body.password)
      }

      let findUser = await user.findOne({ where: param })
      if(findUser == null) {
        return res.status(404).json({
          message: "username or password doesn't match",
          err: error
        });
      }

      // generate jwt token
      let tokenPayload = {
        id_user: findUser.id_user,
        username: findUser.username,
        role: findUser.role
      }
      tokenPayload = JSON.stringify(tokenPayload)
      let token = await jsonwebtoken.sign(tokenPayload, SECRET_KEY)

      // let result
      return res.status(200).json({
        message: "success login",
        data: {
          token: token,
          id_user: findUser.id_user,
          role: findUser.role
        }
      });

    } catch (error) {
      console.log(error)
      return res.status(500).json({
        message: "Internal error",
        err: error
      });
    }
  }

  async store(req, res) {
    try {
      let granted = await access.admin(req)
      if (!granted.status) {
        return res.status(403).json(granted.message);
      }

      const data = {
        nama_user: req.body.nama_user,
        username: req.body.username,
        password: md5(req.body.password),
        role: req.body.role
      }

      let result = await user.create(data)
      return res.status(200).json({
        message: "success adding data user",
        data: result
      });

    } catch (error) {
      return res.status(500).json({
        message: "Internal error",
        err: error
      });
    }
  }

  async update(req, res) {
    try {
      let granted = await access.admin(req)
      if (!granted.status) {
        return res.status(403).json(granted.message);
      }

      const param = { id_user: req.params.id }
      const data = {
        nama_user: req.body.nama_user,
        username: req.body.username,
        role: req.body.role
      }

      let result = await user.update(data, { where: param })
      return res.status(200).json({
        message: "success update data user",
        data: result
      });

    } catch (error) {
      return res.status(500).json({
        message: "Internal error",
        err: error
      });
    }
  }

  async delete(req, res) {
    try {
      let granted = await access.admin(req)
      if (!granted.status) {
        return res.status(403).json(granted.message);
      }

      const param = { id_user: req.params.id }

      let result = await user.destroy({ where: param })
      return res.status(200).json({
        message: "success delete data user",
        data: result
      });

    } catch (error) {
      return res.status(500).json({
        message: "Internal error",
        err: error
      });
    }
  }

  async index(req, res) {
    try {
      let granted = await access.adminKasir(req)
      if (!granted.status) {
        return res.status(403).json(granted.message);
      }
      
      let result = await user.findAll()
      return res.status(200).json({
        message: "success delete data user",
        data: result
      });

    } catch (error) {
      return res.status(500).json({
        message: "Internal error",
        err: error
      });
    }
  }
}

module.exports = User