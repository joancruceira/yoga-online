import mongoose from 'mongoose';
const { Schema, model, models } = mongoose;


const UsuariosSchema = new Schema({

    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    fecha_nacimiento: { type: Date },
    ciudad: {type: String, required: true},
    provincia: {type: String, required: true},
    pais: {type: String, required: true},
    foto_perfil: { type: String, default: '/img/avatar-usuario.png' },
    suscripciones: [{ type: Schema.Types.ObjectId, ref: 'Suscripcion' }]
}, { timestamps: true });



const Usuario=models.usuario || model('usuario', UsuariosSchema);
export default Usuario;
