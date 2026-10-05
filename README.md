# Convite de casamento

Convite digital personalizado (React + Vite). Cada convidado recebe um link com um código de 4 números, vê o próprio nome, desata o laço, lê os detalhes e confirma presença. As respostas vão para uma planilha do Google.

## Rodar localmente

```bash
npm install
npm run dev
```

Abra `http://localhost:5173/?c=1234` (convite completo) ou `?c=5678` (só pizzaria).

## Antes de enviar os convites

1. **Dados do casamento:** edite `src/data/event.js` (nomes, data, horários, endereços, prazo). Depois mude `placeholder: false` para tirar o aviso "Dados de exemplo".
2. **Convidados:** edite `src/data/guests.js`. Cada código de 4 números é uma pessoa:
   - `type: 'completo'` mostra o cartório e a pizzaria.
   - `type: 'celebracao'` mostra só a pizzaria.
3. **Links:** o link de cada pessoa é `https://SEU-SITE/?c=CODIGO`.

> A lista de convidados vai junto no site publicado. Quem souber olhar o código-fonte consegue ver nomes e códigos. Para um convite de casamento isso costuma ser aceitável, mas vale saber.

## Planilha de confirmações (Google Sheets)

1. Crie uma planilha nova no Google Sheets.
2. Abra **Extensões → Apps Script**, apague o conteúdo e cole o arquivo `apps-script/Code.gs`.
3. Clique em **Implantar → Nova implantação**, escolha o tipo **App da Web**, com *Executar como: Eu* e *Quem pode acessar: Qualquer pessoa*. Autorize.
4. Copie a URL do App da Web e crie um arquivo `.env.local` na raiz do projeto:
   ```
   VITE_RSVP_ENDPOINT=https://script.google.com/macros/s/XXXX/exec
   ```
   Na Vercel ou Netlify, cadastre a mesma variável nas configurações do projeto.
5. As respostas aparecem na aba **Respostas** (uma linha por código; se a pessoa mudar a resposta, a linha é atualizada). A aba **Resumo** mostra quantas pessoas confirmaram.

Sem a variável configurada, o site simula o envio (bom para testar, mas nada é salvo).

## Publicar

```bash
npm run build
```

Envie a pasta `dist/` para a Vercel ou a Netlify (ou conecte o repositório; o comando de build é `npm run build` e a pasta de saída é `dist`).
