import Joi from "joi";

const userScheme = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  location: Joi.string().min(3).max(30).required(),
  skills: Joi.string().min(3).max(30).required(),
  github: Joi.string().uri().optional(),
  linkedIn: Joi.string().uri().optional(),
  password: Joi.string().min(8).max(15).required()
});

export const validateUser = (req, res, next) => {
  const { error } = userScheme.validate(req.body);
  if (error) {
    return res.status(400).json({
      status: 400,
      message: error.details[0].message,
    });
  }
  next();
};

export default validateUser;