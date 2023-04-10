const dashboard = (req, res) => {
  const LuckyNum = Math.floor(Math.random() * 100);

  res.status(200).json({
    msg: `Hello , ${req.user.username}`,
    secret: `Your Auth Data is ${LuckyNum}`,
  });
};

module.exports = dashboard;
