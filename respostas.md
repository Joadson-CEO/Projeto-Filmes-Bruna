# Catálogo de Filmes — Perguntas e Respostas

## 1. Pesquisa de bibliotecas

**Quais bibliotecas o grupo escolheu para cada uma dessas três necessidades?**

- Navegação entre telas: `@react-navigation/native` + `@react-navigation/native-stack`
- Consumo de API: `axios`
- Ícones: `@expo/vector-icons`

**Por que escolheram cada uma delas, em vez de outras opções encontradas na pesquisa?**

- React Navigation é a biblioteca de navegação mais usada e recomendada oficialmente pela documentação do Expo, tem suporte nativo a stack navigation (que é exatamente o fluxo lista → detalhes do app) e é mais simples de configurar em projetos Expo do que alternativas como react-native-navigation, que exige mais configuração nativa.
- Axios foi escolhido em vez do fetch nativo por ter uma sintaxe mais simples para tratar erros e configurar requisições (ex: baseURL e params padrão), e em vez de bibliotecas como React Query porque o projeto não precisa de cache avançado, apenas de chamadas simples à API.
- @expo/vector-icons foi escolhido por já vir integrada ao Expo, sem necessidade de linking nativo, diferente do react-native-vector-icons, que exige configuração manual em projetos que não usam o Expo gerenciado.

**Alguma dessas bibliotecas precisa ser instalada com `npx expo install` em vez de `npm install`? Por quê?**

Sim. `react-native-screens` e `react-native-safe-area-context`, que são dependências nativas exigidas pelo React Navigation, precisam ser instaladas com `npx expo install`, pois esse comando garante que a versão instalada seja compatível com a versão do SDK do Expo usada no projeto. O `axios` é uma biblioteca 100% JavaScript, então pode ser instalado normalmente com `npm install`. O `@expo/vector-icons` já vem incluído no Expo, não precisando de instalação separada.

**Essas bibliotecas são bem mantidas e documentadas? Como o grupo verificou isso?**

Sim. O grupo verificou consultando a documentação oficial de cada uma (reactnavigation.org, axios-http.com, docs.expo.dev/guides/icons), além de checar no npm a frequência de atualizações e o número de downloads semanais, e no GitHub o número de estrelas e a frequência de commits/issues resolvidas.

**Existe alguma limitação ou ponto de atenção já identificado sobre alguma delas?**

- React Navigation exige que todo o app esteja envolvido pelo `NavigationContainer`, senão a navegação não funciona.
- Axios adiciona um pouco mais de peso ao bundle final do que usar o fetch nativo.
- @expo/vector-icons possui vários conjuntos de ícones (Ionicons, MaterialIcons, FontAwesome etc.), então é preciso escolher o conjunto certo para cada ícone usado.

## 2. Arquitetura do projeto

**6. Quais telas o app vai ter e o que cada uma exibe?**

- **HomeScreen**: lista de filmes, exibindo o pôster e o título de cada um.
- **DetailsScreen**: informações completas do filme selecionado — pôster, título, nota, data de lançamento e sinopse.

**7. Como os dados vão fluir entre a tela de listagem e a tela de detalhes?**

A HomeScreen busca a lista de filmes na API através do `services/api.js` e renderiza um MovieCard para cada filme. Ao tocar em um filme, os dados desse filme são enviados como parâmetro de navegação (`route.params`) para a DetailsScreen, que os exibe.

**8. Por que separar o código em `screens/`, `components/` e `services/` em vez de deixar tudo em um único arquivo?**

Separar o código facilita a manutenção e a leitura, permite reaproveitar componentes e funções em diferentes partes do app, facilita encontrar e corrigir bugs, e permite que os integrantes do grupo trabalhem em partes diferentes do projeto ao mesmo tempo sem gerar tantos conflitos.

**9. Quais componentes reutilizáveis o grupo já consegue identificar que vai precisar (ex: card de filme, botão)?**

- MovieCard (card com pôster e título, usado na listagem)
- Indicador de carregamento (loading)
- Botão genérico, caso seja necessário em outras telas futuras

**10. Onde ficará centralizada a lógica de comunicação com a API? Por que isso é uma boa prática?**

Ficará centralizada em `services/api.js`. Isso é uma boa prática porque, se a URL da API ou a forma de fazer as requisições mudar, só é preciso alterar em um único lugar, evita duplicar código de requisição em várias telas e facilita a manutenção e futuros testes.

## 3. Setup do projeto

**11. O projeto rodou sem erros após a instalação das bibliotecas? Se não, o que precisou ser ajustado?**

Sim, o projeto rodou sem erros. As dependências nativas do React Navigation foram instaladas com `npx expo install`, que já ajusta automaticamente as versões corretas para o SDK do Expo usado, evitando problemas de compatibilidade.

**12. Alguma biblioteca gerou conflito de versão com o SDK do Expo? Como o grupo resolveu (ou pretende resolver)?**

Não houve conflito, justamente por termos usado `npx expo install` para as bibliotecas com código nativo (react-native-screens e react-native-safe-area-context), que instala a versão compatível com o SDK do Expo do projeto. Caso algum conflito apareça futuramente, a solução é rodar `npx expo install --check` para o Expo apontar e corrigir as versões incompatíveis.

## 4. README.md

**13. Por que documentar as decisões do projeto (bibliotecas, arquitetura) desde o início é importante para o grupo?**

Porque evita que o grupo esqueça o motivo de cada escolha, facilita a retomada do projeto depois de um tempo parado, e garante que todos os integrantes sigam o mesmo padrão de organização e as mesmas bibliotecas ao longo do desenvolvimento.

**14. Se outra pessoa entrasse no projeto agora, o README atual seria suficiente para ela entender o que foi decidido? Por quê?**

Sim, porque o README já lista os integrantes, as bibliotecas escolhidas para cada necessidade e a estrutura de pastas com a função de cada uma, o que dá a uma pessoa nova uma visão geral de como o projeto está organizado antes mesmo de abrir o código.

## 5. Primeiro commit

**15. O que esse primeiro commit representa dentro do desenvolvimento do projeto?**

Representa o ponto de partida oficial do projeto: a estrutura de pastas definida, as bibliotecas escolhidas e documentadas, e o README explicando as decisões tomadas — uma base organizada para o desenvolvimento das próximas funcionalidades.

**16. Por que é importante começar o versionamento desde já, e não só quando o app estiver "pronto"?**

Porque o versionamento permite acompanhar o histórico de mudanças desde o início, reverter alterações problemáticas, trabalhar em paralelo sem perder código e ter um registro de como e quando cada decisão/funcionalidade foi implementada, em vez de perder esse histórico ao esperar o app "ficar pronto".

**17. Quais arquivos ou pastas vocês decidiram (ou vão decidir) manter fora do controle de versão, e por quê?**

- `node_modules/`: pasta gerada pela instalação das dependências, pode ser recriada com `npm install` e não deve ser versionada por ser muito grande.
- `.expo/`: pasta de cache/configuração local gerada pelo Expo.
- `dist/` e `web-build/`: pastas geradas em builds, não fazem parte do código-fonte.
- Arquivos de chaves/certificados (`*.jks`, `*.p8`, `*.p12`, `*.key`, `*.mobileprovision`): são informações sensíveis usadas para assinar builds.
