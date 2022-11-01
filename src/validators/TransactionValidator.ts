import Joi from 'joi';

export const creditMember = {
  body: Joi.object().keys({
    amount: Joi.number().required(),
    description: Joi.string().required(),
    account: Joi.string().required(),
  }),
};
