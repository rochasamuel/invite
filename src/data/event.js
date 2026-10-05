// Dados do casamento. Troque tudo aqui antes de enviar os convites.
// Enquanto `placeholder` for true, o convite mostra um aviso de "dados de exemplo".
export const event = {
  placeholder: true,

  couple: ['Samuel', 'Maria Eduarda'],
  date: 'Sábado, 12 de dezembro de 2026',
  dateShort: '12.12.2026', // aparece no selo de confirmação
  rsvpBy: '15 de novembro',

  // Cerimônia civil (aparece só para convites do tipo "completo")
  cartorio: {
    time: '10h30',
    name: 'Cartório de Registro Civil',
    address: 'Rua do Cartório, 000 · Bairro, Cidade',
    mapsUrl: '', // opcional: se vazio, o link é montado a partir do endereço
    wazeUrl: '',
  },

  // Celebração (aparece para todos)
  pizzaria: {
    time: '12h30',
    name: 'Nome da Pizzaria',
    address: 'Rua da Pizzaria, 000 · Bairro, Cidade',
    mapsUrl: '',
    wazeUrl: '',
  },
}
