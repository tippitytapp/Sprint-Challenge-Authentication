const db = require('../database/dbConfig.js')


function findById(id){
    return db('users')
            .where({id})
            .first()
}

async function add(user){
    try{
        const [id] = await db('users')
                            .insert(user, "id")
                        return findById(id)
    } catch(error){
        throw error;
    }
}

function findUsersBy(filter){
    // console.log(filter)
       return db('users as u')
            .where(filter)
}

module.exports = {
    add,
    findUsersBy
}