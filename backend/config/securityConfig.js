const  UserDetailsService = require('../service/UserDetailsServiceImpl')
const userDetailsService = new UserDetailsService()

const configureCreds = (form) => {
    return  userDetailsService.loadByUsername(form)
}

module.exports = configureCreds