const express = require('express');
const {check} = require('express-validator');
const { crearUsuario, loginUsuario, reValidarToken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJwt } = require('../middlewares/validar-jwt');
const router = express.Router();

router.post(
    '/new',
    [
      check('name', 'El nombre es obligatorio').not().isEmpty(),
      check('email', 'El email es obligatorio').isEmail(),
      check('password', 'La contraseña es obligatorio').isLength({min:6}),
      validarCampos
    ],
    crearUsuario);

router.post(
    '/', 
    [
      check('email', 'El email es obligatorio').isEmail(),
      check('password', 'La contraseña es obligatorio').isLength({min:6}),
      validarCampos
    ],
    loginUsuario);

router.get('/renew', validarJwt, reValidarToken);

module.exports = router;