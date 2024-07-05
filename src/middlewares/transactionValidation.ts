import { body } from "express-validator";

const createValidate = () => {
  return [
    body("title")
      .isString()
      .withMessage("O titulo é obrigatório.")
      .isLength({ min: 3 })
      .withMessage("O nome precisa ter no mínimo 3 caracteres."),
    body("amount")
      .isNumeric()
      .withMessage("A quantia é obrigatório")
      .isLength({ min: 1 })
      .withMessage("A quantia deve ter no mínimo 1 dígito."),
    body("status").isString().withMessage("O status é obrigatório."),
    body("date").isDate().withMessage("A data é obrigatório."),
  ];
};

export { createValidate };
