/// <reference path="../typings/index.d.ts" />

import amqplib = require('amqplib');

async () => {
  const connection: callback_api.Connection = await amqplib.connect('');
}

import callback_api = require('amqplib/callback_api');

callback_api.connect((err: Error, connection: callback_api.Connection) => {});
