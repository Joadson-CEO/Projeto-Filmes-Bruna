# Catálogo de Filmes

App mobile que lista filmes e mostra os detalhes de cada um. Feito com Expo (React Native).

## Integrantes do grupo

- [Joadson Breno Neves Pereira]
- [João Pedro Souza Ceo]
- [Gabriel Borges Luz Guedes]
- [Igor Sena Hagge]

## Bibliotecas escolhidas

| Necessidade | Biblioteca |
|---|---|
| Navegação entre telas | `@react-navigation/native` + `@react-navigation/native-stack` |
| Consumo de API | `axios` |
| Ícones | `@expo/vector-icons` |

As dependências nativas do React Navigation (`react-native-screens` e `react-native-safe-area-context`) foram instaladas com `npx expo install`, pra garantir a versão certa pro SDK do Expo que estamos usando. O resto instalamos normal, com `npm install`.

## Arquitetura do projeto

```
catalogo-de-filmes/
├── App.js
├── assets/
├── components/
│   └── MovieCard.js
├── screens/
│   ├── HomeScreen.js
│   └── DetailsScreen.js
└── services/
    └── api.js
```

- **screens/**: as telas do app (HomeScreen e DetailsScreen).
- **components/**: componentes que se repetem entre telas, como o MovieCard.
- **services/**: onde fica toda a parte de comunicação com a API.
- **assets/**: imagens e ícones do app.

### Telas

- **HomeScreen**: lista os filmes (pôster + título) que vêm da API. Tocando em um filme, abre a DetailsScreen.
- **DetailsScreen**: mostra tudo sobre o filme escolhido, pôster, título, nota, data de lançamento e sinopse. Esses dados chegam pelos parâmetros de navegação, não são buscados de novo.

## MVP (Etapa 2)

- Tela de listagem usando `getPopularMovies()` do `services/api.js` e renderizando o `MovieCard`.
- Navegação pra tela de detalhes reaproveita os dados que já vieram na listagem, sem precisar chamar a API de novo.
- Loading com spinner e tratamento de erro na requisição, com botão "Tentar novamente".
- `getPosterUrl()` ficou centralizada em `services/api.js` e é usada tanto pelo `MovieCard` quanto pela `DetailsScreen`.

### Testes

- Teste com **Jest** (preset `jest-expo`) em `services/api.test.js`, testando a função `getPosterUrl`.
- Pra rodar: `npm test`.
- Os testes manuais do fluxo listagem → detalhes → voltar estão documentados no `respostas-mvp.md`.
