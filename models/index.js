import mongoose from 'mongoose';

const db = {};
db.mongoose = mongoose;
db.url = process.env.MONGODB;

const gradesSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  value: {
    type: Number,
    required: true,
    // Valida se a nota inserida é menor o que zero
    validate(value) {
      if (value < 0) throw new Error('Valor negativo para nota não permitido');
    },
  },
  lastModified: {
    type: Date,
    default: Date.now,
  },
});

gradesSchema.method('toJSON', function () {
  const { _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

const gradesModel = mongoose.model('desafio', gradesSchema, 'desafio');

export { db, gradesModel };
