const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize("board", "root", "root", {
  host: "localhost",
  dialect: "mysql"
});

const User = sequelize.define("user", {
  no: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id: {
    type: DataTypes.STRING,
    unique: true
  },
  password: {
    type: DataTypes.STRING
  },
  name: {
    type: DataTypes.STRING
  },
  joinDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  grade: {
    type: DataTypes.STRING,
    defaultValue: 'basic'
  }
});

const Board = sequelize.define("board", {
  no: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING,
  },
  content: {
    type: DataTypes.TEXT
  },
  viewCount: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  writer: {
    type: DataTypes.STRING
  },
  writeDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  address: {
    type: DataTypes.STRING
  },
  latitude: {
    type: DataTypes.DECIMAL(10, 8),
    allowNull: true
  },
  longitude: {
    type: DataTypes.DECIMAL(11, 8),
    allowNull: true
  }
});

const Comment = sequelize.define("comment", {
  no: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  writer: {
    type: DataTypes.STRING,
    allowNull: false
  },
  boardId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Board,
      key: 'no'
    }
  }
});

Board.hasMany(Comment, { foreignKey: 'boardId' });
Comment.belongsTo(Board, { foreignKey: 'boardId' });

sequelize.sync({
  alter: true
});

module.exports = {
  sequelize,
  User,
  Board,
  Comment
};
