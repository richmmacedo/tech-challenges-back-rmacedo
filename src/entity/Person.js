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
    relations: {
        roles: {
            name: 'roles',
            type: 'many-to-many',
            target: 'role',
            joinTable: {
                name: 'persons_roles',
                joinColumn: {
                    name: 'person_id'
                },
                inverseJoinColumn: {
                    name: 'role_id'
                },
            },
            inverseSide: 'person',
            cascade: true
        },
    },
})

module.exports = Person