
const EventoSchema = require('../models/Evento');
const UsuarioSchema = require('../models/Usuario');

const getEventos = async(req, res) => {

  let eventos = await EventoSchema.find()
                                  .populate('user', 'name');

  return res.status(201).json({
    ok: true,
    msg: 'getEventos',
    eventos
  })
}

const crearEvento = async(req, res) => {

  // const {email, password} = req.body;

  const {email, password} = req.body;
  try {
    evento = EventoSchema(req.body);
    evento.user = req.uid;
    const eventoGuradado = await evento.save();

    return res.status(201).json({
      ok: true,
      msg: 'crearEventos',
      evento: eventoGuradado
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Por favor hable con el administrador',
    })
  }
}

const actualizarEvento = async(req, res) => {

  const {id} = req.params;
  const uid = req.uid;

  try {

    const evento = await EventoSchema.findById(id);

    if(!evento){
      return res.status(404).json({
        ok: false,
        msg: 'El evento existe con ese correo',
      });
    }

    if(evento.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: 'No tiene privilegio de editar este evento',
      });
    }

    const nuevoEvento = {
      ...req.body,
      user: uid
    };
    
    const eventoActualizado = await EventoSchema.findByIdAndUpdate(id, nuevoEvento, {new: true});

    return res.status(201).json({
      ok: true,
      msg: 'actualizarEvento',
      evento: eventoActualizado
    })
    
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Por favor hable con el administrador',
    })
  }
}

const eliminarEvento = async(req, res) => {

  const {id} = req.params;
  const uid = req.uid;

  try {

    console.log('id', id);
    const evento = await EventoSchema.findById(id);

    

    if(!evento){
      return res.status(404).json({
        ok: false,
        msg: 'El evento existe con ese correo',
      });
    }

    if(evento.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: 'No tiene privilegio de editar este evento',
      });
    }

    await EventoSchema.findByIdAndDelete(id);

    return res.status(201).json({
      ok: true,
      msg: 'eliminarEvento'
    })
    
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Por favor hable con el administrador',
    })
  }
}

module.exports = {
  getEventos,
  crearEvento,
  actualizarEvento,
  eliminarEvento
}