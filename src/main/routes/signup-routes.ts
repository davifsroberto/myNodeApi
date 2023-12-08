import { Router } from 'express';

export default (router: Router): void => {
  router.post('/signup', (req, res) => {
    console.log(res);

    res.json({ ok: 'ok' });
  });
};
