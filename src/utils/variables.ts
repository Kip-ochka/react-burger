const BASE_URL = `https://norma.nomoreparties.space/api`
export const WS_URL = 'wss://norma.nomoreparties.space/';
const INACTIVE_COLOR = `text_color_inactive`
const TEXT = 'text'
const INGRIDIENT_TYPES = [
  { name: 'Булки', type: 'bun' },
  { name: 'Соусы', type: 'sauce' },
  { name: 'Начинка', type: 'main' },
]
enum TypografyTheme {
  default = 'text_type_main-default',
  large = 'text_type_main-large',
  medium = 'text_type_main-medium',
  small = 'text_type_main-small',
  digitsDefault = 'text_type_digits-default',
  digitsMedium = 'text_type_digits-medium',
  digitsLarge = 'text_type_digits-large',
}
const bunImage = 'https://code.s3.yandex.net/react/code/bun-02.png'

export {
  BASE_URL,
  INACTIVE_COLOR,
  TEXT,
  TypografyTheme,
  INGRIDIENT_TYPES,
  bunImage,
}
