'use strict';

/**
 * shipment service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::shipment.shipment');
