const UsuarioSchema = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');
const crearUsuario = async(req, res) => {

  const {email, password} = req.body;
  try {

    let usuario = await UsuarioSchema.findOne({email});

    if(usuario){
      return res.status(400).json({
        ok: true,
        msg: 'Un usuario existe con ese correo',
      })
    }

    //Encriptar contraseña
    const salt = bcrypt.genSaltSync();
    usuario = UsuarioSchema(req.body);
    usuario.password = bcrypt.hashSync(password, salt);
    await usuario.save();

    res.status(201).json({
      ok: true,
      uid: usuario.id,
      name: usuario.name
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: true,
      msg: 'Por favor hable con el administrador',
    })
  }
}

const loginUsuario = async(req, res) => {
  const { email, password} = req.body;
  
  try {

    const usuario = await UsuarioSchema.findOne({email});

    if(!usuario){
      return res.status(400).json({
        ok: false,
        msg: 'El usuario no existe',
      })
    }

    //Confirmar password
    const validPassword = bcrypt.compareSync(password, usuario.password);

    if( ! validPassword){
      return res.status(400).json({
        ok: false,
        msg: 'Password incorrecto ',
      })
    }

    const token = await generarJWT(usuario.id, usuario.name);

    return res.status(201).json({
      ok: true,
      msg: 'Exito',
      token,
      uid: usuario.id,
      name: usuario.name
    })
    
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: true,
      msg: 'Por favor hable con el administrador',
    })
  }
}

const reValidarToken = async(req, res) => {

  const {uid, name} = req;

  const token = await generarJWT(uid, name);

  res.json({
    ok: true,
    msg: 'token re validado correctamente',
    token
  })
}

module.exports = {
  crearUsuario,
  loginUsuario,
  reValidarToken
};