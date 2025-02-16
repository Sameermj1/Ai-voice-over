// User Model
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: { type: DataTypes.STRING, unique: true },
    password: DataTypes.STRING,
    role: { type: DataTypes.STRING, defaultValue: 'user' },
    apiKey: DataTypes.STRING
  });
  return User;
};

// Video Model
module.exports = (sequelize, DataTypes) => {
  const Video = sequelize.define('Video', {
    userId: DataTypes.INTEGER,
    youtubeUrl: DataTypes.STRING,
    filePath: DataTypes.STRING,
    status: DataTypes.STRING,
    voiceOverPath: DataTypes.STRING
  });
  return Video;
};
