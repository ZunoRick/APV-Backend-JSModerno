import Paciente from "../models/Paciente.js";

const agregarPaciente = async (req, res) => {
  const paciente = new Paciente(req.body);
  paciente.veterinario = req.veterinario._id;

  try {
    const pacienteAlmacenado = await paciente.save();
    res.json(pacienteAlmacenado);
  } catch (error) {
    console.log(error);
  }
}

const obtenerPacientes = async (req, res) => {
  const pacientes = await Paciente.find().where('veterinario').equals(req.veterinario);
  res.json(pacientes);
}

const obtenerPaciente = async (req, res) => {
  const { id } = req.params;

  try {
    const paciente = await Paciente.findById(id);

    if(paciente.veterinario._id.toString() !== req.veterinario._id.toString()){
      return res.json({ msg: 'Acción no válida' });
    }

    res.json(paciente);
  } catch (error) {
    console.log(error);
    return res.status(404).json({ msg: 'No Encontrado' });
  }
}

const actualizarPaciente = async (req, res) =>{
  const { id } = req.params;

  try {
    const paciente = await Paciente.findById(id);

    if(paciente.veterinario._id.toString() !== req.veterinario._id.toString()){
      return res.json({ msg: 'Acción no válida' });
    }
    
    //Actualizar paciente
    paciente.nombre = req.body.nombre || paciente.nombre;
    paciente.propietario = req.body.propietario || paciente.propietario;
    paciente.email = req.body.email || paciente.email;
    paciente.fecha = req.body.fecha || paciente.fecha;
    paciente.sintomas = req.body.sintomas || paciente.sintomas;

    const pacienteActualizado = await paciente.save();
    res.json(pacienteActualizado);
  } catch (error) {
    console.log(error);
    return res.status(404).json({ msg: 'No Encontrado' });
  }
}

const eliminarPaciente = async (req, res) =>{
  const { id } = req.params;

  try {
    const paciente = await Paciente.findById(id);

    if(paciente.veterinario._id.toString() !== req.veterinario._id.toString()){
      return res.json({ msg: 'Acción no válida' });
    }

    await paciente.delete();
    res.json({ msg: 'Paciente Eliminado' });
  } catch (error) {
    console.log(error);
    return res.status(404).json({ msg: 'No Encontrado' });
  }
}

export{
  agregarPaciente,
  obtenerPacientes,
  obtenerPaciente,
  actualizarPaciente,
  eliminarPaciente
}
