"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
var express_1 = require("express");
function requireAuth(req, res, next) {
    if (req.session && req.session.loggedIn) {
        next();
        return;
    }
    res.status(403);
    res.send('not permitted');
}
var router = express_1.Router();
exports.router = router;
router.get('/login', function (req, res) {
    return res.send("\n  <form method=\"post\">\n  <div>\n    <label>Email :</label>\n    <input name=\"email\"/>\n  </div>    \n  <div>\n    <label>Password :</label>\n    <input name=\"password\" type=\"password\"/>\n  </div>\n  <div>\n    <button type=\"submit\">Submit</button>\n  </div>\n  </form>\n  ");
});
router.post('/login', function (req, res) {
    var _a = req.body, email = _a.email, password = _a.password;
    if (email && password && email === 'hi@hi.com' && password === 'password') {
        req.session = { loggedIn: true };
        res.redirect('/');
    }
    else {
        res.send('invalid');
    }
});
router.get('/', function (req, res) {
    if (req.session && req.session.loggedIn) {
        res.send("\n      <div>\n        <div>You are logged in</div>\n        <a href=\"/logout\">Log out</a>\n      </div>\n    ");
    }
    else {
        res.send("\n    <div>\n      <div>You are NOT logged in</div>\n      <a href=\"/login\">Log in</a>\n    </div>\n  ");
    }
});
router.get('/logout', function (req, res) {
    req.session = null;
    res.redirect('/');
});
router.get('/protected', requireAuth, function (req, res) {
    res.send('welcome to protected route');
});
