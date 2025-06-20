import mongoose from 'mongoose';
const { Schema, model, models } = mongoose;

const ClaseSchema = new Schema({
  titulo: { type: String, required: true },
  descripcion: { type: String, required: true },
  video: { type: String, required: true }, // dirección de ytube
  orden: { type: Number, required: true }, // orden del curso
  recursos: [{ type: String }], // pdfs
  bloqueada: { type: Boolean, default: true }, // desbloqueo para el avance del curso (autoevaluaciones, etc)
  duracion_aprox: { type: Number }, // minutos
  visible: { type: Boolean, default: true }, // ocultar sin borrar
}, { timestamps: true });

const Clase = models.Clase || model('Clase', ClaseSchema);
export default Clase;