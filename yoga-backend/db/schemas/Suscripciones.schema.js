import mongoose from 'mongoose';
const { Schema, model, models } = mongoose;

const SuscripcionSchema = new Schema({
  id_membresia: { type: Schema.Types.ObjectId, ref: 'Membresia' },
  fecha_alta: { type: Date, default: Date.now },
  fecha_proximo_pago: { type: Date },
  activa: { type: Boolean, default: true }
}, { timestamps: true });  