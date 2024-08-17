const sharedButton = {
  rounded: "full",
  size: "lg",
  fontWeight: "normal",
  px: 6,
  colorScheme:"blue",
}

export const leftButton =   {
  ...sharedButton,
  bg:"blue.400",
  _hover: { bg: 'blue.500' }
}

export const rightButton = {
  ...sharedButton,
  variant: "outline"
}
