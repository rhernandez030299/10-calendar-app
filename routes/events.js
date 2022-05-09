const express = require('express');
const { check } = require('express-validator');
const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require('../controllers/events');
const { isDate } = require('../helpers/isDate');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJwt } = require('../middlewares/validar-jwt');
const router = express.Router();

router.use(validarJwt);

router.get('/', getEventos);

router.post(
  '/', 
  [
    check('title', 'El título es obligatorio').not().isEmpty(),
    check('start', 'La fecha inicial es obligatoria').custom( isDate ),
    check('end', 'La fecha inicial es obligatoria').custom( isDate ),
    validarCampos
  ],
  crearEvento);

router.put(
  '/:id', 
  [
    check('title', 'El título es obligatorio').not().isEmpty(),
    check('start', 'La fecha inicial es obligatoria').custom( isDate ),
    check('end', 'La fecha inicial es obligatoria').custom( isDate ),
    validarCampos
  ],
  actualizarEvento);

router.delete('/:id', eliminarEvento);

module.exports = router;