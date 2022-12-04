import { body } from "express-validator";

export const loginValidator = [
  body('email', 'неверный формат почты').isEmail(),
  body('password', 'Пароль должен быть минимум 5 символов').isLength({ min: 5 }),
]

export const registerValidator = [
  body('email', 'неверный формат почты').isEmail(),
  body('password', 'Пароль должен быть минимум 5 символов').isLength({ min: 5 }),
  body('fullName', 'Укажите имя').isLength({ min: 3 }),
  body('avatarUrl', 'Неверная ссыслка на аватарку').optional().isURL(),
]

export const postCreateValidator = [
  body('title', 'Введите заголовок статьи').isLength({ min: 3 }).isString(),
  body('text', 'Введите текст статьи').isLength({ min: 3 }).isString(),
  body('tags', 'неверный формат тэгов (укажите массив)').optional().isString(),
  body('imageUrl', 'Неверная ссыслка на изображение').optional().isString(),
]

