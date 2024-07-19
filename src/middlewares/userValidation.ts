import { body } from "express-validator";

const registerValidate = () => {
  return [
    body("name")
      .isString()
      .withMessage("O nome é obrigatório.")
      .isLength({ min: 3 })
      .withMessage("O nome precisa ter no mínimo 3 caracteres."),
    body("email")
      .isString()
      .withMessage("O e-mail é obrigatório.")
      .isEmail()
      .withMessage("Insira um e-mail valido."),
    body("password")
      .isString()
      .withMessage("A senha é obrigatório.")
      .isLength({ min: 5 })
      .withMessage("A senha precisa ter no mínimo 3 caracteres."),
    body("confirmpassword")
      .isString()
      .withMessage("A confirmação de senha é obrigatório.")
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error("As senha precisam ser iguais.");
        }

        return true;
      }),
  ];
};

const loginValite = () => {
  return [
    body("email")
      .isString()
      .withMessage("O e-mail é obrigatório.")
      .isEmail()
      .withMessage("Insira um e-mail valido."),
    body("password")
      .isString()
      .withMessage("A senha é obrigatório.")
      .isLength({ min: 5 })
      .withMessage("A senha precisa ter no mínimo 3 caracteres."),
  ];
};

const updateValite = () => {
  return [
    body("name")
      .optional()
      .isString()
      .isLength({ min: 3 })
      .withMessage("O nome precisa ter no mínimo 3 caracteres."),
    body("imageProfile").optional().isString(),
    body("currentBalance")
      .optional()
      .isNumeric()
      .withMessage("O valor deve ser um número."),
    body("lastBalanceEntry")
      .optional()
      .isNumeric()
      .withMessage("O valor deve ser um número."),
    body("lastBalanceExit")
      .optional()
      .isNumeric()
      .withMessage("O valor deve ser um número."),
  ];
};
export { registerValidate, loginValite, updateValite };
