//previlege user

const deniedMessage = {
  message: "Access Denied",
  err: null
}

const kasir = async (req) => {
  const role = req.userData.role
  if (role !== "kasir") {
    return ({
      status: false,
      message: deniedMessage
    })
  }

  return ({
    status: true,
    message: "granted"
  })
}

const admin = async (req) => {
  const role = req.userData.role
  if (role !== "admin") {
    return ({
      status: false,
      message: deniedMessage
    })
  }

  return ({
    status: true,
    message: "granted"
  })
}

const adminKasir = async (req) => {
  const role = req.userData.role
  if (role === "admin" || role === "kasir") {
    return ({
      status: true,
      message: "granted"
    })
  }

  return ({
    status: false,
    message: deniedMessage
  })

}

const adminOwner = async (req) => {
  const role = req.userData.role
  if (role === "admin" || role === "owner") {
    return ({
      status: true,
      message: "granted"
    })
  }

  return ({
    status: false,
    message: deniedMessage
  })

}

module.exports = {
  kasir,
  admin,
  adminKasir,
  adminOwner
}