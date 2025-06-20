import mongoose from 'mongoose';
const { Schema, model, models } = mongoose;

const CursoSchema = new Schema({
  titulo: { type: String, required: true },
  descripcion: { type: String, required: true },
  imagen_portada: { type: String }, // URL o path local
  categoria: { type: String, enum: ['clases', 'formacion'], required: true },
  precio: { type: Number, required: true },
  clases: [{ type: Schema.Types.ObjectId, ref: 'Clase' }],
  beneficios: [String], // Lista de beneficios que se muestran en el frontend
  visible: { type: Boolean, default: true }, // Para ocultar cursos si hace falta
  destacado: { type: Boolean, default: false }, // Para destacar en la portada
}, { timestamps: true });

const Curso = models.Curso || model('Curso', CursoSchema);
export default Curso;
