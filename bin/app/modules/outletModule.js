const md5 = require('md5');
const models = require('../../models/index');
const outlet = models.outlet

class Outlet {

  async store(req, res) {
    try {
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
      let result = await outlet.findAll()
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

      const param = { id_user: req.params.id }

      let result = await outlet.findAll({ where: param })
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