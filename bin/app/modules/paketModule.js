const access = require('../utils/access');
const models = require('../../models/index');
const paket = models.paket

//crud paket

class Paket {

  async store(req, res) {
    try {
      let granted = await access.admin(req)
      if (!granted.status) {
        return res.status(403).json(granted.message);
      }

      const data = {
        jenis: req.body.jenis,
        harga: req.body.harga
      }

      let result = await paket.create(data)
      return res.status(200).json({
        message: "success adding data paket",
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

      const param = {id_paket:req.params.id}
      const data = {
        jenis: req.body.jenis,
        harga: req.body.harga
      }

      let result = await paket.update(data, {where:param})
      return res.status(200).json({
        message: "success update data paket",
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

      const param = { id_paket: req.params.id }

      let result = await paket.destroy({ where: param })
      return res.status(200).json({
        message: "success delete data paket",
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

      let result = await paket.findAll()
      return res.status(200).json({
        message: "success get data paket",
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

module.exports = Paket