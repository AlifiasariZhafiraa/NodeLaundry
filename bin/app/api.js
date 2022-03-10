const Member = require('./modules/memberModule');
const Outlet = require('./modules/outletModule');
const Paket = require('./modules/paketModule');
const Transaksi = require('./modules/transaksiModule');
const User = require('./modules/userModule')

const user = new User
const member = new Member
const paket = new Paket
const outlet = new Outlet
const transaksi = new Transaksi

const jwtAuth = require('./auth/auth')

const routes = async (server) => {
  // server.use()

  // user endpoint
  server.post("/api/user/login", user.login);
  server.post("/api/user", jwtAuth.authVerify, user.store);
  server.put("/api/user/:id", jwtAuth.authVerify, user.update);
  server.delete("/api/user/:id", jwtAuth.authVerify, user.delete);
  server.get("/api/user", jwtAuth.authVerify, user.index);

  server.post("/api/member", jwtAuth.authVerify, member.store);
  server.put("/api/member/:id", jwtAuth.authVerify, member.update);
  server.delete("/api/member/:id",jwtAuth.authVerify, member.delete);
  server.get("/api/member",jwtAuth.authVerify, member.index);
  server.get("/api/member/:id",jwtAuth.authVerify, member.show);

  server.post("/api/paket",jwtAuth.authVerify, paket.store);
  server.put("/api/paket/:id",jwtAuth.authVerify, paket.update);
  server.delete("/api/paket/:id",jwtAuth.authVerify, paket.delete);
  server.get("/api/paket",jwtAuth.authVerify, paket.index);

  server.post("/api/outlet",jwtAuth.authVerify, outlet.store);
  server.put("/api/outlet/:id",jwtAuth.authVerify, outlet.update);
  server.delete("/api/outlet/:id",jwtAuth.authVerify, outlet.delete);
  server.get("/api/outlet",jwtAuth.authVerify, outlet.index);

  server.get("/api/outlet/owner/:id",jwtAuth.authVerify, outlet.show);

  server.post("/api/transaksi",jwtAuth.authVerify, transaksi.store);
  server.get("/api/transaksi",jwtAuth.authVerify, transaksi.index);
  server.get("/api/transaksi/:id",jwtAuth.authVerify, transaksi.show);
  server.put("/api/transaksi/bayar/:id",jwtAuth.authVerify, transaksi.updateBayar);
  server.put("/api/transaksi/status/:id",jwtAuth.authVerify, transaksi.updateStatus);

}

module.exports = { routes };
