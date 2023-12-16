const  UserDetailsService = require('../service/UserDetailsServiceImpl')
const userDetailsService = new UserDetailsService()

const configureCreds = async (form) => {
    return  await userDetailsService.loadByUsername(form)
}

module.exports = configureCreds