const EntitySchema = require('typeorm').EntitySchema

const Role = new EntitySchema({                                                // Mudar nome do schema a ser exportado para correto uso no app 
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

module.exports = Role                                                          // Exportar módulo correto - mudança de Person para Role