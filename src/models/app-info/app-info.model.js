'use strict';

const ModelClass = require('../model.model.js');
const appInfoSchema = require('./app-info.schema.js');

/**
 * @param schema {object} Mongoose schema
 */
class AppInfoModel extends ModelClass {}

module.exports = new AppInfoModel(appInfoSchema);
