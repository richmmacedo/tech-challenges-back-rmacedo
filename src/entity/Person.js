const EntitySchema = require('typeorm').EntitySchema

const Person = new EntitySchema({
    name: 'Person',
    tableName: 'person',
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true,
        },
        first_name: {
            type: "varchar",
        },
        last_name: {
            type: "varchar",
        },
        email: {
            type: "varchar",
        },
    },
})

module.exports = Person