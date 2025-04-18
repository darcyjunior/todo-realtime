# Lista de Tarefas Local-First (Expo + Legend-State + Supabase)

<p>
  <img alt="Suporta Expo iOS" src="https://img.shields.io/badge/iOS-4630EB.svg?style=flat-square&logo=APPLE&labelColor=999999&logoColor=fff" />
  <img alt="Suporta Expo Android" src="https://img.shields.io/badge/Android-4630EB.svg?style=flat-square&logo=ANDROID&labelColor=A4C639&logoColor=fff" />
</p>

Aplicativo local-first desenvolvido com [Expo](https://expo.dev/), [Legend-State](https://legendapp.com/open-source/state/v3/) e [Supabase](https://supabase.com/), inspirado no artigo oficial da Supabase.

---

## 📒 Sumário
- [Setup e Instalação](#setup-e-instalação)
- [Arquitetura e Decisões Técnicas](#arquitetura-e-decisões-técnicas)
- [Riscos e Melhorias Futuras](#riscos-e-melhorias-futuras)
- [Referências](#referências)
- [English version below](#expo-app-with-legend-state-and-supabase-realtime)

---

## Setup e Instalação

1. **Pré-requisitos:**
   - Conta no Supabase ([crie aqui](https://database.new))
   - Node.js 18+
   - Yarn ou npm
   - Expo CLI (`npm install -g expo-cli`)

2. **Configuração:**
   - Clone o repositório.
   - Copie `.env.local.example` para `.env` e preencha com as chaves do Supabase:
     ```env
     EXPO_PUBLIC_SUPABASE_URL=...
     EXPO_PUBLIC_SUPABASE_ANON_KEY=...
     ```
   - Instale as dependências:
     ```sh
     yarn install
     # ou
     npm install
     ```

3. **Rodando o app:**
   - Execute:
     ```sh
     npx expo start
     ```
   - Use o QR code para rodar no celular ou pressione `w` para rodar no navegador.

4. **Banco de dados:**
   - Execute as migrações com `supabase db push`.
   - Acesse o painel do Supabase para gerenciar os dados.

---

## Arquitetura e Decisões Técnicas

- **Local-First:**
  - O app funciona offline, salvando dados localmente e sincronizando com o Supabase quando online.
- **Legend-State:**
  - Gerencia o estado dos todos com reatividade e sincronização automática.
- **Supabase:**
  - Backend para autenticação, persistência e realtime.
- **Sincronização:**
  - Conflitos resolvidos por último update.
  - Soft delete: itens deletados são marcados, não removidos fisicamente.
- **Design:**
  - Layout moderno, inspirado no shadcn/ui, responsivo para mobile e web.
- **Segurança:**
  - Chaves sensíveis via `.env`.
  - Regras de acesso configuradas no Supabase.

---

## Riscos e Melhorias Futuras

- **Riscos:**
  - Conflitos de sincronização em múltiplos dispositivos.
  - Limitações do realtime em grandes volumes de dados.
  - Suporte parcial a recursos web-only (ex: boxShadow).
- **Melhorias Futuras:**
  - Autenticação de usuários.
  - Filtros, busca e ordenação de tarefas.
  - Notificações push.
  - Dark mode.
  - Testes automatizados.
  - Melhor UX para resolução de conflitos offline/online.

---

## Referências
- Artigo Supabase: https://supabase.com/blog/local-first-expo-legend-state
- Exemplo oficial: https://github.com/expo/examples/tree/master/with-legend-state-supabase
- Expo docs: https://docs.expo.dev/guides/local-first/
- Legend-State docs: https://legendapp.com/open-source/state/
- shadcn/ui: https://ui.shadcn.com/

---

# Expo App with Legend-State and Supabase Realtime

<p>
  <!-- iOS -->
  <img alt="Supports Expo iOS" longdesc="Supports Expo iOS" src="https://img.shields.io/badge/iOS-4630EB.svg?style=flat-square&logo=APPLE&labelColor=999999&logoColor=fff" />
  <!-- Android -->
  <img alt="Supports Expo Android" longdesc="Supports Expo Android" src="https://img.shields.io/badge/Android-4630EB.svg?style=flat-square&logo=ANDROID&labelColor=A4C639&logoColor=fff" />
</p>

Local-first Expo App with [Legend-State](https://legendapp.com/open-source/state/v3/) and [Supabase](https://supabase.com/).

- [Read the detailed tutorial](https://supabase.link/local-first-expo-legend-state)
- [Watch the video guide](https://supabase.link/local-first-expo-legend-state-yt)

## Setup

- Create Supabase account at [database.new](https://database.new).
- Create `.env.local` file by running `cp .env.local.example .env.local`.
- Add your credentials from the [Supabase Dashboard](https://supabase.com/dashboard/project/_/settings/api).
- Run `supabase link` to link your local project to your Supabase project.
- Run `supabase db push` to apply the [init migration](./supabase/migrations/20240902202009_init.sql) to your Supabase database.

## 🚀 How to run locally

- Run `yarn` or `npm install`.
- Run `yarn start` or `npm run start` to try it out.
  - Press a │ open Android
  - Press i │ open iOS simulator
  - Press w │ open web

## How to generate types

```bash
supabase start
supabase gen types --lang=typescript --local > utils/database.types.ts
```
