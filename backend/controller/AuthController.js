const express = require("express");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const authService = require("../service/AuthService");
const configureCreds = require("../config/securityConfig");
const refreshTokenService = require("../service/RefreshTokenService");

module.exports = {
  signup: async function (req, res, next) {
    try {
      await authService.signup(req.body);
      return res.status(201).json({ message: "User registration successful" });
    } catch (err) {
      next(err);
    }
  },

  verifyAccount: async function (req, res) {
    const result = await authService.verifyAccount(req.query.token);
    res.status(200);
    res.send(result);
  },

  login: async function (req, res, next) {
    try {
      const token = await authService.getLoginToken(req.body);
      return res.status(200).json(token);
    } catch (err) {
      next(err);
    }
  },
  validateRefreshToken: async function (req, res) {
    const response = await authService.validateRefreshToken(req.body);
    res.status(200).send(response);
  },
  logout: async function (req, res) {
    refreshTokenService.deleteRefreshToken(req.body.refreshToken);
    res.status(200).send("Refresh Token Deleted Successfully!");
  },
};
