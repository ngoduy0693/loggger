const User = require('./User');

class UserRepository {
    constructor(knex) {
        this.knex = knex;
    }

    async allUsers(name) {
        let allUsers = await this.knex.select('*').from('idtest').where('name', 'like', '%' + name + '%');
        return allUsers.map(result => new User(result.id, result.name));
    }

    async getUser(name) {
        let results = await this.knex.select('*').from('idtest').where('name', 'like', '%' + name + '%');
        return results.map(result => new User(result.id, result.name));
    }

    async checkUser(name) {
        let checkusers = await this.knex('idtest').where('name', '=', name);
        return checkusers;
    }

    async setUser(name) {
        let checkUsername = await this.checkUser(name);
        if(checkUsername[0]) {
            return false;
        } else {
            await this.knex('idtest').insert({name: name});
            return await this.allUsers(name);
        }
    }
}

module.exports = UserRepository;
