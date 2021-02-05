import { NextFunction, Router, Request, Response } from 'express';

interface RequestWithBody extends Request {
  body: {
    [key: string]: string | undefined;
  };
}

function requireAuth(req: Request, res: Response, next: NextFunction): void {
  if (req.session && req.session.loggedIn) {
    next();
    return;
  }

  res.status(403);
  res.send('not permitted');
}

const router = Router();

router.get('/login', (req: Request, res: Response) => {
  return res.send(`
  <form method="post">
  <div>
    <label>Email :</label>
    <input name="email"/>
  </div>    
  <div>
    <label>Password :</label>
    <input name="password" type="password"/>
  </div>
  <div>
    <button type="submit">Submit</button>
  </div>
  </form>
  `);
});

router.post('/login', (req: RequestWithBody, res: Response) => {
  const { email, password } = req.body;

  if (email && password && email === 'hi@hi.com' && password === 'password') {
    req.session = { loggedIn: true };
    res.redirect('/');
  } else {
    res.send('invalid');
  }
});

router.get('/', (req: RequestWithBody, res: Response) => {
  if (req.session && req.session.loggedIn) {
    res.send(`
      <div>
        <div>You are logged in</div>
        <a href="/logout">Log out</a>
      </div>
    `);
  } else {
    res.send(`
    <div>
      <div>You are NOT logged in</div>
      <a href="/login">Log in</a>
    </div>
  `);
  }
});

router.get('/logout', (req: RequestWithBody, res: Response) => {
  req.session = null;
  res.redirect('/');
});

router.get('/protected', requireAuth, (req: RequestWithBody, res: Response) => {
  res.send('welcome to protected route');
});

export { router };
