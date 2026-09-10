# Catálogo de Filmes

Aplicativo mobile que lista filmes e exibe os detalhes de cada um, desenvolvido com Expo (React Native).

## Integrantes do grupo

- [Nome do integrante 1]
- [Nome do integrante 2]
- [Nome do integrante 3]

## Bibliotecas escolhidas

| Necessidade | Biblioteca |
|---|---|
| Navegação entre telas | `@react-navigation/native` + `@react-navigation/native-stack` |
| Consumo de API | `axios` |
| Ícones | `@expo/vector-icons` |

Dependências nativas do React Navigation (`react-native-screens` e `react-native-safe-area-context`) instaladas com `npx expo install` para garantir compatibilidade com o SDK do Expo. As demais, com `npm install`.

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

- **screens/**: telas do app (HomeScreen e DetailsScreen).
- **components/**: componentes reutilizáveis entre as telas (ex: MovieCard).
- **services/**: lógica centralizada de comunicação com a API.
- **assets/**: imagens e ícones estáticos do app.

### Telas

- **HomeScreen**: lista os filmes (pôster + título) buscados na API. Ao tocar em um filme, navega para a DetailsScreen.
- **DetailsScreen**: exibe as informações completas do filme selecionado (pôster, título, nota, data de lançamento e sinopse), recebidas via parâmetros de navegação.

## MVP (Etapa 2)

- Tela de listagem consumindo `getPopularMovies()` de `services/api.js` e renderizando o componente `MovieCard`.
- Navegação para a tela de detalhes reaproveitando os dados do filme já recebidos na listagem (sem nova chamada à API).
- Tratamento de estado de carregamento (spinner) e de erro na requisição, com botão "Tentar novamente".
- Função `getPosterUrl()` centralizada em `services/api.js`, usada por `MovieCard` e `DetailsScreen`.

### Testes

- Teste automatizado com **Jest** (preset `jest-expo`) em `services/api.test.js`, cobrindo a função `getPosterUrl`.
- Para rodar: `npm test`.
- Testes manuais do fluxo listagem → detalhes → voltar documentados em `respostas-mvp.md`.
