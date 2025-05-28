const checkRoles = (allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !req.user.role || !req.user.role.name) {
      return res.status(403).json({ error: "Нет доступа к данному ресурсу" });
    }

    if (!allowedRoles.includes(req.user.role.name)) {
      return res.status(403).json({ error: "Недостаточно прав" });
    }
    next();
  };
};

module.exports = checkRoles;
