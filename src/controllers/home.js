const homeController = (req, res, next) => {
  res.render('index', {page:'Home', menuId:'home'});
}

module.exports = {homeController};
