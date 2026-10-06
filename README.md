# Convite de casamento

Convite digital personalizado (React + Vite). Cada convidado recebe um link com um código de 4 letras e números, vê o próprio nome, desata o laço, lê os detalhes e confirma presença. As respostas ficam salvas no próprio site e aparecem em `/admin`.

## Rodar localmente

```bash
npm install
npm run dev
```

Abra `http://localhost:5173/?c=HBQ9` (convite completo) ou `?c=R39U` (só pizzaria).

## Antes de enviar os convites

1. **Dados do casamento:** edite `src/data/event.js` (nomes, data, horários, endereços, prazo). Depois mude `placeholder: false` para tirar o aviso "Dados de exemplo".
2. **Convidados:** edite `src/data/guests.js`. Cada código de 4 letras e números é um convite (uma pessoa, ou um casal com `couple: true`):
   - `type: 'completo'` mostra o cartório e a pizzaria.
   - `type: 'celebracao'` mostra só a pizzaria.
3. **Links:** o link de cada convite é `https://SEU-SITE/?c=CODIGO`.

> A lista de convidados vai junto no site publicado. Quem souber olhar o código-fonte consegue ver nomes e códigos. Para um convite de casamento isso costuma ser aceitável, mas vale saber.

## Confirmações (Vercel + Redis)

As respostas ficam guardadas num banco Redis (Upstash) e o casal acompanha tudo em **`/admin`**.

1. Na Vercel, abra o projeto → **Storage** → **Create Database** → **Upstash for Redis** (plano gratuito) e conecte ao projeto. As variáveis do banco são criadas sozinhas.
2. Em **Settings → Environment Variables**, crie `ADMIN_PASSWORD` com a senha da página de confirmações.
3. Faça um novo deploy.
4. Abra `https://SEU-SITE/admin`, digite a senha e veja: pessoas confirmadas (casais contam 2), quem vem, quem não vem e quem ainda não respondeu.

O site só aceita respostas de códigos que estão em `src/data/guests.js`. Responder de novo substitui a resposta anterior.

Em `npm run dev` o envio é simulado e nada é salvo. Para testar com o banco de verdade, use `vercel dev` com as variáveis puxadas por `vercel env pull`.

## Publicar

```bash
npm run build
```

Conecte o repositório na Vercel (o comando de build é `npm run build` e a pasta de saída é `dist`). As funções em `api/` são publicadas junto.
