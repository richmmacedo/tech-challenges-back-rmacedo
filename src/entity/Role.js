const EntitySchema = require('typeorm').EntitySchema

const Person = new EntitySchema({
    name: 'Role',
    tableName: 'role',
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true,
        },
        name: {
            type: "varchar",
        },
    },
    relations: {
        users: {
            type: 'many-to-many',
            inverseSide: 'role',
            target: 'person'
        }
    }
})

module.exports = Person