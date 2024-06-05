function model(Sequelize, connection) {
    connection.define("board", {
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
        },
        address: {
            type: Sequelize.STRING
        },
        latitude: {
            type: Sequelize.DECIMAL(10, 8),
            allowNull: true
        },
        longitude: {
            type: Sequelize.DECIMAL(11, 8),
            allowNull: true
        }
    });

    connection.define("user", {
        no: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id: {
            type: Sequelize.STRING,
            unique: true
        },
        password: {
            type: Sequelize.STRING
        },
        name: {
            type: Sequelize.STRING
        },
        joinDate: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        }
    });

    connection.sync({
        alter: true
    });
}

module.exports = model;
