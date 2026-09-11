# Catálogo de Filmes — MVP — Perguntas e Respostas

## 1. Tela de listagem

**1. Como ficou a estrutura do componente de card de filme? Ele foi feito para ser reutilizado em outros pontos do app?**

O `MovieCard` (em `components/MovieCard.js`) recebe só duas props: `movie` (o objeto do filme) e `onPress` (a função chamada quando toca no card). Ele não tem nenhuma lógica de navegação nem de API dentro, só mostra o pôster e o título. Isso deixa ele fácil de reaproveitar em qualquer outra lista de filmes que o app venha a ter, é só passar os dados e a ação de toque.

**2. De onde vêm os dados exibidos na lista — de uma chamada direta à API na própria tela ou de uma função centralizada em `services/`?**

Vêm de `getPopularMovies()`, que fica em `services/api.js`. A HomeScreen só chama essa função e guarda o resultado no estado, ela não faz a chamada HTTP diretamente, isso fica todo dentro do services.

**3. O que acontece na tela enquanto os dados ainda estão sendo carregados?**

Aparece um `ActivityIndicator` (o spinner) no centro da tela enquanto `loading` estiver `true`.

## 2. Navegação e tela de detalhes

**4. Qual biblioteca de navegação foi usada e como os dados do filme selecionado são passados para a tela de detalhes?**

Usamos `@react-navigation/native-stack`. Quando o usuário toca num card, a HomeScreen chama `navigation.navigate('Details', { movie: item })`, mandando o filme inteiro como parâmetro de rota. A DetailsScreen pega esse dado por `route.params.movie`.

**5. A tela de detalhes busca os dados novamente na API ou reaproveita os dados recebidos da tela de listagem? Qual foi a decisão do grupo e por quê?**

Reaproveita os dados que já vieram da listagem. Decidimos assim porque o endpoint de filmes populares já traz todos os campos que a tela de detalhes precisa (título, pôster, nota, data de lançamento, sinopse) — fazer outra chamada à API ali seria só deixar a navegação mais lenta à toa.

**6. É possível voltar da tela de detalhes para a listagem sem perder o estado da lista (ex: posição do scroll)?**

Sim. O `native-stack` mantém a HomeScreen montada por baixo da DetailsScreen enquanto ela está na pilha — então quando volta, a HomeScreen não recarrega do zero, e a posição do scroll e a lista continuam do jeito que estavam.

## 3. Tratamento de estados (loading e erro)

**7. O que o usuário vê se a API demorar para responder? E se a requisição falhar (ex: sem internet)?**

Enquanto não responde, fica o spinner de carregamento na tela. Se der erro (capturado no `try/catch` de `loadMovies`), o spinner some e aparece uma mensagem de erro junto com o botão "Tentar novamente".

**8. O grupo implementou alguma forma de tentar novamente (retry) após um erro? Por que isso é importante em apps mobile?**

Sim, o botão "Tentar novamente" chama de novo a mesma `loadMovies`. É importante porque internet de celular falha bastante, sinal fraco, rede caindo por um instante, e sem esse retry a única saída do usuário seria fechar e abrir o app de novo, o que é bem chato.

## 4. Testes manuais do MVP

**9. Em quais dispositivos/ambientes o grupo testou o app? Quais diferenças de comportamento ou de layout foram observadas entre eles?**

Testamos em celular Android físico via Expo Go e também no emulador Android do Android Studio. No físico, a lista carregou tranquila pelo Wi-Fi e a navegação pra tela de detalhes ficou fluida. No emulador o comportamento foi basicamente igual, só o toque respondeu um pouquinho mais devagar por estar rodando em software mesmo. Entre os dois ambientes Android não notamos diferença visual grande, a grade de dois cards por linha e as imagens de pôster ficaram proporcionais nos dois. Testamos também `expo start --web` no navegador, e funcionou, mas o scroll da lista se comportou como scroll de página normal em vez do scroll nativo — algo esperado, já que é renderização web do React Native.

**10. Quais bugs ou comportamentos inesperados foram encontrados durante os testes manuais? Como foram corrigidos?**

Achamos um bug chato: desligando a internet e abrindo o app, o spinner ficava girando pra sempre em vez de mostrar erro, porque o timeout padrão do axios era grande demais. Resolvemos colocando um timeout de 10 segundos na instância do axios, em `services/api.js` (`timeout: 10000`), assim o `catch` do `loadMovies` dispara num tempo razoável e o "Tentar novamente" aparece pro usuário. Também reparamos que filme sem sinopse (`overview` vazio) deixava um espaço em branco esquisito na tela de detalhes, colocamos uma verificação que mostra "Sinopse não disponível." nesse caso.

**11. Por que testar em mais de um ambiente é especialmente importante em desenvolvimento mobile híbrido?**

Porque cada plataforma, Android, iOS, web — pode renderizar as coisas de um jeito um pouco diferente, ter comportamento distinto de navegação e permissão, e rodar em telas e versões de sistema bem variadas. Testando só num ambiente, dá pra passar batido por problema que só aparece nos outros.

## 5. Teste automatizado simples

**12. Qual ferramenta de teste foi usada (ex: Jest, React Native Testing Library) e por que essa foi a escolha do grupo?**

Jest, com o preset `jest-expo`. É a ferramenta que a própria documentação do Expo recomenda, já entra integrada com o Babel que já estava configurado no projeto, e não exige nenhuma configuração nativa extra só pra testar uma função isolada.

**13. O que exatamente o teste escrito verifica? O que ele NÃO cobre (limitações)?**

O teste, em `services/api.test.js`, verifica se `getPosterUrl` monta certo a URL do pôster, testando tanto o tamanho padrão quanto um tamanho customizado passado por parâmetro. Ele não testa chamada real à API, nem a renderização das telas, nem o fluxo de navegação entre elas.

**14. Qual a diferença entre o que esse teste automatizado garante e o que os testes manuais da Etapa 4 garantem?**

O teste automatizado garante, rápido e sem precisar de ninguém repetindo passo a passo, que aquela função isolada continua funcionando certo toda vez que o código muda. Já os testes manuais mostram a experiência de uso de verdade, layout, navegação, comportamento em aparelho diferente, resposta real da API —, mas só funcionam se alguém sentar e repetir os passos manualmente cada vez que quiser checar.

## 6. Documentação e commit

**15. O que foi acrescentado ao README nesta etapa? Isso é suficiente para outra pessoa entender o estado atual do MVP?**

Entrou a seção "MVP (Etapa 2)", contando sobre a tela de listagem consumindo a API, a navegação reaproveitando os dados do filme, o tratamento de loading/erro, a função centralizada de pôster, e a parte de testes explicando a ferramenta usada e como rodar. Dá pra dizer que sim, é suficiente pra outra pessoa entender o que já funciona sem precisar ler o código inteiro primeiro.

**16. O que esse commit representa em relação ao commit anterior (o do setup)? O grupo considera que o app já é um MVP utilizável? Por quê?**

O commit anterior era só a estrutura inicial, pastas, bibliotecas, README, nada funcionando de fato. Esse aqui transforma isso num fluxo navegável de verdade: listagem com dado real da API, tela de detalhes, loading/erro tratados, e um teste automatizado. Achamos que sim, já é um MVP utilizável, porque cobre o fluxo principal (listar → ver detalhes → voltar), mesmo sem coisas extras tipo busca ou favoritos ainda.

**17. Olhando para o app pronto até aqui, qual seria o próximo problema técnico ou funcional mais importante a resolver?**

A chave da API (`API_KEY`) está escrita direto no código, em `services/api.js`. O próximo passo mais importante é tirar isso de lá e carregar por variável de ambiente, pra chave não ficar exposta no repositório.
