import Joi from 'joi';
import pluck from 'lodash/collection/pluck';

import dates from '../lib/dates';
import validate from '../lib/validate';
import payoutMethods from '../ui/payout_methods';

/**
 * New expense schema
 */

const schema = Joi.object().keys({
  attachment: Joi.string().uri()
    .label('Photo')
    .allow(null),
  title: Joi.string().required()
    .label('Title'),
  amount: Joi.number().integer().min(1).required()
    .label('Amount'),
  vat: Joi.number().precision(2).min(0).allow(null)
    .label('VAT'),
  incurredAt: Joi.date().max(dates().tomorrow).required()
    .raw() // doesn't convert date into Date object
    .label('IncurredAt'),
  category: Joi.string().required()
    .label('Category'),
  payoutMethod: Joi.string().valid(pluck(payoutMethods, 'value'))
    .label('Payout method'),
  notes: Joi.string()
    .label('Notes')
    .allow(null),
});

export default (obj) => validate(obj, schema);
