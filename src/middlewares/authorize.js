function authorize(permissoes) {
  return function (req, res, next) {
    if (!req.user || !permissoes.includes(req.user.perfil)) {
      return res.status(403).json({ message: 'Acesso negado' });
    }
    next();
  };
}

module.exports = authorize;
