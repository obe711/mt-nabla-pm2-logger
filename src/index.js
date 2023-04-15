#!/usr/bin/env node

/*!
 * mt-nabla-pm2-logger
 * Copyright(c) 2023 Obediah Benjamin Klopfenstein <obe711@gmail.com>
 * MIT Licensed
 */

"use strict";

const os = require("node:os");
const path = require("node:path");
const Tail = require('tail').Tail;
const config = require("./config/config");
const logger = require("./config/logger");
const NablaTx = require("mt-nabla-tx");

const nablaTx = new NablaTx({ logger, port: config.nablaPort });


(async () => {

  const userHomeDir = os.homedir();

  /* Follow Out Log */
  const pm2OutLogPath = path.join(userHomeDir, ".pm2", "logs", config.pm2.outLogFile);
  const outLogTail = new Tail(pm2OutLogPath, { logger });
  /* Logfile change */
  outLogTail.on("line", handleLogFile);
  /* Error event */
  outLogTail.on('error', (err) => {
    logger.error(err);
  });

  /* Follow Error Log */
  const pm2ErrorLogPath = path.join(userHomeDir, ".pm2", "logs", config.pm2.errorLogFile);
  const errorLogTail = new Tail(pm2ErrorLogPath, { logger });
  /* Logfile change */
  errorLogTail.on("line", handleLogFile);
  /* Error event */
  errorLogTail.on('error', (err) => {
    logger.error(err);
  });

  // logger.info(`Logging - ${logPath}`);

  /**
   * Log PM2 Api data to nabla hub
   * 
   * @param {string} data 
   */
  async function handleLogFile(data) {
    const newLog = JSON.parse(data.trim())[0];
    logger.info(`${newLog}`);
    nablaTx.pm2Log(config.siteName, newLog);
  }
})();