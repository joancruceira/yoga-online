import mongoose from 'mongoose';
const { Schema, model, models } = mongoose;

const ProgresoClaseSchema = new Schema({
  id_usuario: { type: Schema.Types.ObjectId, ref: 'Usuario' },
  id_clase: { type: Schema.Types.ObjectId, ref: 'Clase' },
  vista: { type: Boolean, default: false },
  fecha_visto: Date
}, { timestamps: true });
