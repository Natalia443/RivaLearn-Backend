import Joi from "joi";

export const validate = (user) => {
  const userSchema = Joi.object({
    username: Joi.string().min(3).max(50).alphanum().required(),
    password: Joi.string().min(8).max(50).required(),
    email: Joi.string().email().max(100).required(),
  });

  const { error } = userSchema.validate(user);
  if (error) {
    return { result: false, error };
  }
  return { result: true };
};
