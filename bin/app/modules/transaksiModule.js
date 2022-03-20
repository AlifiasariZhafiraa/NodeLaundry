const moment = require('moment');
const access = require('../utils/access');
const models = require('../../models/index');
const transaksi = models.transaksi
const detail = models.detail
const paket = models.paket


class Transaksi {

  async store(req, res) {
    try {
      let granted = await access.adminKasir(req)
      if (!granted.status) {
        return res.status(403).json(granted.message);
      }

      let date = moment()
      let batas = moment(date).add('days', 4)

      const dataTransaksi = {
        id_member: req.body.id_member,
        id_user: req.body.id_user,
        id_outlet: req.body.id_outlet,
        tgl_diterima: date,
        batas_waktu: batas
      }

      const listPaket = req.body.list_paket

      // custom payload for response
      let result = {}

      // insert transaksi
      let insertTransaksi = await transaksi.create(dataTransaksi)
      result = insertTransaksi.dataValues
      result.detail = []
      result.total = 0

      // insert detail transaksi
      for (let i = 0; i < listPaket.length; i++) {
        let detailItem = {
          id_transaksi: insertTransaksi.id_transaksi,
          id_paket: listPaket[i]['id_paket'],
          qty: listPaket[i]['qty']
        }

        let insertDetail = await detail.create(detailItem)
        result.detail.push(insertDetail.dataValues)

        // get total price
        let param = { id_paket: insertDetail.id_paket }
        let getPaket = await paket.findOne({ where: param })
        let price = insertDetail.qty * getPaket.harga
        result.total += price
      }


      return res.status(200).json({
        message: "success adding data transaksi",
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
      let result = await transaksi.findAll({
        include: [
          'member',
          'user',
          'outlet',
          'detail',
          {
            model: detail,
            as: 'detail',
            include: ['paket']
          }
        ]
      })

      return res.status(200).json({
        message: "success get all data transaksi",
        data: result
      });



    } catch (error) {
      console.log(error)
      return res.status(500).json({
        message: "Internal error",
        err: null
      });
    }
  }

  async show(req, res) {
    try {
      let param = { id_transaksi: req.params.id }
      let dataTransaksi = await transaksi.findOne({
        where: param,
        include: [
          'member',
          'user',
          'outlet',
          'detail',
          {
            model: detail,
            as: 'detail',
            include: ['paket']
          }
        ]
      })

      // custom payload for response
      let result = {}

      result = dataTransaksi.dataValues
      result.total = 0

      // insert total transaksi
      const details = result.detail
      details.map(detail => {
        const total = detail.qty * detail.paket.harga
        result.total += total
      })

      return res.status(200).json({
        message: "success get data transaksi",
        data: result
      });

    } catch (error) {
      return res.status(500).json({
        message: "Internal error",
        err: error
      });
    }
  }

  async updateBayar(req, res) {
    try {
      let granted = await access.adminKasir(req)
      if (!granted.status) {
        return res.status(403).json(granted.message);
      }

      const param = { id_transaksi: req.params.id }
      const date = moment()

      const data = {
        tgl_bayar: date,
        dibayar: "dibayar"
      }

      let result = await transaksi.update(data, { where: param })

      return res.status(200).json({
        message: "success update status bayar transaksi",
        data: result
      });

    } catch (error) {
      return res.status(500).json({
        message: "Internal error",
        err: error
      });
    }
  }

  async updateStatus(req, res) {
    try {
      let granted = await access.adminKasir(req)
      if (!granted.status) {
        return res.status(403).json(granted.message);
      }

      const param = { id_transaksi: req.params.id }

      const data = {
        status: req.body.status
      }

      let result = await transaksi.update(data, { where: param })

      return res.status(200).json({
        message: "success update status transaksi",
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

module.exports = Transaksi