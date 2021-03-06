"use strict";

const mongoose = require('mongoose');

var config = require('./config');

/**
 * @author aaron
 * 定义某个产品规格的库存
 * 比如 衬衫A-白-大号：库存100件
 */
const specQtySchema = {
	_id: mongoose.Schema.ObjectId,
	qty: {type: Number},
	product: {type: mongoose.Schema.Types.ObjectId, ref: 'StrProduct'},

	color: {type: mongoose.Schema.Types.ObjectId, ref: 'StrSpec'},
	size: {type: mongoose.Schema.Types.ObjectId, ref: 'StrSpec'}
}

module.exports = mongoose.Schema(specQtySchema, config.schemaOptions);
