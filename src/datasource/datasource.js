const typeorm = require("typeorm")

const AppDataSource = new typeorm.DataSource({
    type: 'better-sqlite3',
    database: './src/main.sql',
    synchronize: true,
    entities: [require("../entity/Person"), require("../entity/Role")],
})

AppDataSource.initialize()
    .then(() => {
        console.log('Data Source has been initialized!')
    })
    .catch((err) => {
        console.error('Error during Data Source initialization', err)
    })

module.exports = AppDataSource