// Dados do casamento. Troque tudo aqui antes de enviar os convites.
// Enquanto `placeholder` for true, o convite mostra um aviso de "dados de exemplo".
export const event = {
  placeholder: true,

  couple: ['Samuel', 'Maria Eduarda'],
  date: 'Quinta-feira, 19 de novembro de 2026',
  dateShort: '19.11.2026', // aparece no selo de confirmação
  dateISO: '2026-11-19', // usado no botão de adicionar ao calendário
  rsvpBy: '15 de novembro',

  // Cerimônia civil (aparece só para convites do tipo "completo")
  cartorio: {
    time: '16h30',
    name: 'Sala Clássica do 5º Cartório de Registro Civil',
    address: 'CNA 03, Lote 02, Sala 102 · Taguatinga Norte, Brasília - DF, 72110-035',
    mapsUrl: 'https://maps.app.goo.gl/3VWUdnUXd1rgcwEfA', // opcional: se vazio, o link é montado a partir do endereço
    wazeUrl: 'https://waze.com/ul?ll=-15.8258543,-48.0566786&navigate=yes',
  },

  // Celebração (aparece para todos)
  pizzaria: {
    time: '18h30',
    name: 'Pizzaria Palato Brasilie',
    address: 'CLN 303, Bloco A, Loja 30 · Asa Norte, Brasília - DF, 70735-510',
    mapsUrl: 'https://maps.app.goo.gl/1FGhaKjFif3SBVT78',
    wazeUrl: 'https://waze.com/ul?ll=-15.7804369,-47.8846122&navigate=yes',
  },
}
