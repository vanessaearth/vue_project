module.exports = app => {
  const mongoose = app.mongoose;
  const userSchema = new mongoose.Schema({
    mobile: { type: String, unique: true, require: true },
    password: { type: String, require: true },
    realName: { type: String, require: true },
    avatar: { type: String, default: '' },
    extra: { type: mongoose.Schema.Types.Mixed },
    createdAt: { type: Date, default: Date.now },
  });
  return mongoose.model('User', userSchema);
};
