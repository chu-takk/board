function model(Sequelize, connection) {
    /*
    {
        no: 1,
        title: "제목1",
        viewCount: 100,
        writer: "홍길동",
        writeDate: "2021-01-01"
    },*/
    var Board = connection.define("board", {
        no: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: Sequelize.STRING,
        },
        content: {
            type: Sequelize.TEXT
        },
        viewCount: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        writer: {
            type: Sequelize.STRING
        },
        writeDate: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        }
    })

    var User =connection.define("user",{
        no:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id:{
            type: Sequelize.STRING,
            uniqe: true
        },
        password:{
            type: Sequelize.STRING
        },
        name: { 
            type: Sequelize.STRING
        },
        joinDate: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        }

    })
    User.hasMany(Board,{
        as:"boards",
        foreignKey:"writerId"
    })
    Board.belongsTo(User,{
        as:"writerUser",
        foreignKey: "writerId"
    })



    connection.sync({
        alter: true
    })
}

module.exports = model;