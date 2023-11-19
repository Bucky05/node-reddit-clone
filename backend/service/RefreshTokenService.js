const { v4: uuidv4 } = require('uuid');
const time = require('./time')
const { saveRefreshToken, getRefreshToken } = require('../db/queries')
const deleteRefreshTokenQuery = require('../db/queries').deleteRefreshToken
const pool = require('../db/connection');

module.exports = {
    generateRefreshToken: async function () {
        const refreshToken = {}
        refreshToken["token"] = uuidv4().toString()
        refreshToken["created_date"] = time.currentTime()

        await pool.query(saveRefreshToken, refreshToken)
        return refreshToken
    },
    validateRefreshToken: async function (token) {

        const rT = await pool.query(getRefreshToken, token)
        if (rT.length === 0)
            throw new Error('Invalid Refresh Token')


    },
    deleteRefreshToken: async function (token) {
        try {
            await pool.query(deleteRefreshTokenQuery, token)
        }
        catch (err) {
            console.log(err)
        }
    }
}