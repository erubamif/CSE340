const showHomePage = async (req, res) => {
    const title = 'Home';

    const isLoggedIn = !!(req.session && req.session.user);
    const user = req.session ? req.session.user : null;

    res.render('home', {
        title,
        isLoggedIn,
        user
    });
};

export { showHomePage };