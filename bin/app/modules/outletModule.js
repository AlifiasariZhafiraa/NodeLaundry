const access = require('../utils/access');
const models = require('../../models/index');
const outlet = models.outlet

//crud outlet

class Outlet {

  async store(req, res) {
    try {
      let granted = await access.admin(req)
      if (!granted.status) {
        return res.status(403).json(granted.message);
      }

      const data = {
        id_user: req.body.id_user,
        alamat: req.body.alamat
      }

      let result = await outlet.create(data)
      return res.status(200).json({
        message: "success adding data outlet",
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

      const param = {id_outlet:req.params.id}
      const data = {
        id_user: req.body.id_user,
        alamat: req.body.alamat
      }

      let result = await outlet.update(data, {where:param})
      return res.status(200).json({
        message: "success update data outlet",
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

      const param = { id_outlet: req.params.id }

      let result = await outlet.destroy({ where: param })
      return res.status(200).json({
        message: "success delete data outlet",
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

      let result = await outlet.findAll({include: ['user']})
      return res.status(200).json({
        message: "success delete data outlet",
        data: result
      });

    } catch (error) {
      return res.status(500).json({
        message: "Internal error",
        err: error
      });
    }
  }

  async show(req, res) {
    try {
      let granted = await access.adminKasir(req)
      if (!granted.status) {
        return res.status(403).json(granted.message);
      }

      const param = { id_user: req.params.id }

      let result = await outlet.findAll({ where: param, include: ['user'] })
      return res.status(200).json({
        message: "success get data by owner outlet",
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

module.exports = Outlet