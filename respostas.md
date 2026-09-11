# Catálogo de Filmes — Perguntas e Respostas

## 1. Pesquisa de bibliotecas

**Quais bibliotecas o grupo escolheu para cada uma dessas três necessidades?**

- Navegação entre telas: `@react-navigation/native` + `@react-navigation/native-stack`
- Consumo de API: `axios`
- Ícones: `@expo/vector-icons`

**Por que escolheram cada uma delas, em vez de outras opções encontradas na pesquisa?**

React Navigation acabou sendo meio óbvio: é a que a própria documentação do Expo recomenda, já tem stack navigation pronta (que é basicamente o fluxo lista → detalhes que a gente precisava) e não dá tanto trabalho pra configurar quanto o react-native-navigation, que mexe com código nativo. Pra API a gente ficou entre fetch e axios, e no fim preferimos axios porque tratar erro e configurar baseURL/params fica bem mais direto. Cogitamos React Query também, mas achamos exagero pro que o app precisa, não tem cache complicado nem nada do tipo, só chamadas simples. E o @expo/vector-icons entrou porque já vem junto com o Expo, sem precisar de linking nativo (diferente do react-native-vector-icons, que dá mais dor de cabeça fora do Expo gerenciado).

**Alguma dessas bibliotecas precisa ser instalada com `npx expo install` em vez de `npm install`? Por quê?**

Sim, duas: `react-native-screens` e `react-native-safe-area-context`. Essas são dependências nativas do React Navigation, e o `npx expo install` garante que a versão instalada bate com o SDK do Expo do projeto, evita ficar com versão incompatível e dando erro estranho depois. Já o `axios` é só JS puro, então instala normal com `npm install`. E o `@expo/vector-icons` nem precisa instalar separado, já vem com o Expo.

**Essas bibliotecas são bem mantidas e documentadas? Como o grupo verificou isso?**

Sim. A gente foi na documentação oficial de cada uma (reactnavigation.org, axios-http.com e docs.expo.dev/guides/icons) e também deu uma olhada no npm pra ver com que frequência elas são atualizadas e quantos downloads semanais têm. No GitHub olhamos número de estrelas e se as issues estavam sendo respondidas/fechadas com alguma regularidade — isso ajuda a ter uma ideia se o projeto ainda está vivo.

**Existe alguma limitação ou ponto de atenção já identificado sobre alguma delas?**

O React Navigation só funciona se o app inteiro estiver dentro do `NavigationContainer` esquecer isso quebra a navegação toda. O axios pesa um pouco mais no bundle final do que usar fetch nativo, mas achamos que compensa pela praticidade. E o @expo/vector-icons tem vários conjuntos de ícone diferentes (Ionicons, MaterialIcons, FontAwesome...), então é preciso prestar atenção pra usar o conjunto certo em cada ícone.

## 2. Arquitetura do projeto

**6. Quais telas o app vai ter e o que cada uma exibe?**

- **HomeScreen**: a lista de filmes, com pôster e título de cada um.
- **DetailsScreen**: os detalhes completos do filme que foi tocado — pôster, título, nota, data de lançamento e sinopse.

**7. Como os dados vão fluir entre a tela de listagem e a tela de detalhes?**

A HomeScreen busca a lista de filmes através do `services/api.js` e renderiza um MovieCard pra cada um. Quando o usuário toca num filme, a gente manda os dados dele como parâmetro de navegação (`route.params`) direto pra DetailsScreen, que só exibe o que recebeu.

**8. Por que separar o código em `screens/`, `components/` e `services/` em vez de deixar tudo em um único arquivo?**

Porque fica muito mais fácil de mexer depois. Se tudo estivesse num arquivo só, ia virar bagunça rápido, assim dá pra reaproveitar componente e função em outro lugar, achar bug mais rápido, e cada um do grupo consegue trabalhar numa parte diferente sem ficar toda hora dando conflito no mesmo arquivo.

**9. Quais componentes reutilizáveis o grupo já consegue identificar que vai precisar (ex: card de filme, botão)?**

- MovieCard (o card com pôster e título que aparece na listagem)
- Algum indicador de carregamento (loading)
- Talvez um botão genérico, se aparecer necessidade em outras telas mais pra frente

**10. Onde ficará centralizada a lógica de comunicação com a API? Por que isso é uma boa prática?**

Em `services/api.js`. Se um dia a URL da API mudar ou a forma de fazer a requisição precisar de ajuste, só mexe nesse arquivo em vez de caçar chamada de API espalhada em várias telas. Também deixa mais fácil de testar depois.

## 3. Setup do projeto

**11. O projeto rodou sem erros após a instalação das bibliotecas? Se não, o que precisou ser ajustado?**

Rodou de primeira, sem erro. Como usamos `npx expo install` pras dependências nativas do React Navigation, ele já ajustou sozinho as versões certas pro SDK do Expo, então não tivemos que ficar caçando incompatibilidade manualmente.

**12. Alguma biblioteca gerou conflito de versão com o SDK do Expo? Como o grupo resolveu (ou pretende resolver)?**

Não teve conflito de novo, por causa do `npx expo install` nas bibliotecas com código nativo (react-native-screens e react-native-safe-area-context). Se algum dia aparecer algum conflito, a ideia é rodar `npx expo install --check`, que o próprio Expo já aponta e corrige as versões que não batem.

## 4. README.md

**13. Por que documentar as decisões do projeto (bibliotecas, arquitetura) desde o início é importante para o grupo?**

Pra não esquecer depois por que cada escolha foi feita, principalmente se o projeto ficar um tempo parado. Também ajuda a manter todo mundo do grupo seguindo o mesmo padrão em vez de cada um fazer diferente.

**14. Se outra pessoa entrasse no projeto agora, o README atual seria suficiente para ela entender o que foi decidido? Por quê?**

Dá pra dizer que sim, o README lista quem tá no grupo, quais bibliotecas foram escolhidas e pra quê, e como as pastas estão organizadas. Não cobre tudo (não tem, por exemplo, todas as decisões de design), mas já dá pra alguém novo entender o básico antes de abrir o código.

## 5. Primeiro commit

**15. O que esse primeiro commit representa dentro do desenvolvimento do projeto?**

É o ponto de partida oficial: estrutura de pastas definida, bibliotecas escolhidas e o README explicando o porquê de cada decisão. Uma base organizada pra começar a construir o resto em cima.

**16. Por que é importante começar o versionamento desde já, e não só quando o app estiver "pronto"?**

Porque dá pra acompanhar o histórico desde o começo, voltar atrás se alguma mudança quebrar algo, e trabalhar em paralelo sem perder código de ninguém. Esperar o app "ficar pronto" pra começar a versionar significa perder todo esse histórico do meio do caminho.

**17. Quais arquivos ou pastas vocês decidiram (ou vão decidir) manter fora do controle de versão, e por quê?**

- `node_modules/`: é gerada pelo `npm install`, é gigante e não precisa ir pro repositório.
- `.expo/`: cache e configuração local do Expo.
- `dist/` e `web-build/`: pastas de build, não são código-fonte.
- Arquivos de chave/certificado (`*.jks`, `*.p8`, `*.p12`, `*.key`, `*.mobileprovision`): são sensíveis, usados pra assinar builds, não podem vazar no repositório.
