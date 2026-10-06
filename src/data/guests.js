// Lista de convidados. Cada código de 4 caracteres (letras maiúsculas e números) é uma pessoa.
// Evite 0, O, 1, I e L, que se confundem.
// type: 'completo'   → cartório + pizzaria
//       'celebracao' → só a pizzaria
// couple: true → convite de casal (um só código, textos no plural, conta 2 pessoas)
// O link de cada convite é: https://SEU-SITE/?c=CODIGO
export const guests = {
  // Cartório + rodízio
  'HBQ9': { name: 'Cristiane', type: 'completo' },
  'BK6A': { name: 'Miguel e Simone', type: 'completo', couple: true },
  '28X8': { name: 'Micaele e José', type: 'completo', couple: true },
  '53KD': { name: 'Nickson e Bella', type: 'completo', couple: true },
  'B4VF': { name: 'Misael', type: 'completo' },
  'W78V': { name: 'Samam', type: 'completo' },
  'H5KZ': { name: 'Laura', type: 'completo' },
  'F3MU': { name: 'Larissa', type: 'completo' },
  '3ZNR': { name: 'Thay', type: 'completo' },
  'P8EQ': { name: 'Fab', type: 'completo' },
  '5YX8': { name: 'Samuel', type: 'completo' },
  '82BP': { name: 'Natália e Velt', type: 'completo', couple: true },
  '7M3D': { name: 'Davi', type: 'completo' },

  // Só o rodízio
  'R39U': { name: 'Juliana e Eddie', type: 'celebracao', couple: true },
  '9KPV': { name: 'Moura e Elizalia', type: 'celebracao', couple: true },
  '6JYS': { name: 'Jorge', type: 'celebracao' },
  'D2JR': { name: 'Moisés', type: 'celebracao' },
  '5F4C': { name: 'Pedro e Marcela', type: 'celebracao', couple: true },
}
