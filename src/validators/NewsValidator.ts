import Joi from 'joi';
import objectId from './custom.validator';

export const CreateNews = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    content: Joi.string().required(),
  }),
};

export const updateNews = {
  params: {
    newsId: Joi.custom(objectId).required(),
  },
};
