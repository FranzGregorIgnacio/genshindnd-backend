import mongoose from 'mongoose';

const CharacterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  vision: {
    type: String,
    enum: ['Anemo', 'Geo', 'Electro', 'Dendro', 'Hydro', 'Pyro', 'Cryo'],
    required: true
  },
  weapon: { type: String },
  backstory: { type: String },
  description: { type: String },

  abilities: [
    {
      name: { type: String, required: true },
      description: String,
      cooldown: Number,
      rechargeDice: Number,
      used: { type: Boolean, default: false }
    }
  ],

  inventory: {
    items: [
      {
        name: { type: String, required: true },
        quantity: { type: Number, default: 1 }
      }
    ],
    mora: { type: Number, default: 0 }
  },

  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

export default mongoose.model('Character', CharacterSchema);
