# Catálogo de Filmes — MVP — Perguntas e Respostas

## 1. Tela de listagem

**1. Como ficou a estrutura do componente de card de filme? Ele foi feito para ser reutilizado em outros pontos do app?**

O `MovieCard` (em `components/MovieCard.js`) recebe duas props: `movie` (o objeto do filme) e `onPress` (função chamada ao tocar no card). Ele só é responsável por exibir o pôster e o título, sem nenhuma lógica de navegação ou de API dentro dele — isso permite reaproveitá-lo em qualquer lista de filmes do app, bastando passar os dados e a ação de toque.

**2. De onde vêm os dados exibidos na lista — de uma chamada direta à API na própria tela ou de uma função centralizada em `services/`?**

Vêm da função `getPopularMovies()`, centralizada em `services/api.js`. A HomeScreen apenas chama essa função e guarda o resultado no estado; ela não faz a chamada HTTP diretamente.

**3. O que acontece na tela enquanto os dados ainda estão sendo carregados?**

É exibido um `ActivityIndicator` (spinner) centralizado na tela, enquanto o estado `loading` estiver `true`.

## 2. Navegação e tela de detalhes

**4. Qual biblioteca de navegação foi usada e como os dados do filme selecionado são passados para a tela de detalhes?**

Foi usada `@react-navigation/native-stack`. Ao tocar em um card, a HomeScreen chama `navigation.navigate('Details', { movie: item })`, enviando o objeto completo do filme como parâmetro de rota. A DetailsScreen recebe esse dado por `route.params.movie`.

**5. A tela de detalhes busca os dados novamente na API ou reaproveita os dados recebidos da tela de listagem? Qual foi a decisão do grupo e por quê?**

Reaproveita os dados recebidos da listagem. A decisão foi essa porque o endpoint de filmes populares já retorna todos os campos usados na tela de detalhes (título, pôster, nota, data de lançamento e sinopse), então uma nova chamada à API seria desnecessária e deixaria a navegação mais lenta.

**6. É possível voltar da tela de detalhes para a listagem sem perder o estado da lista (ex: posição do scroll)?**

Sim. O `native-stack` mantém a HomeScreen montada por baixo da DetailsScreen enquanto ela está na pilha de navegação; ao voltar, a HomeScreen não é recriada, então o estado (lista já carregada e posição do scroll) é preservado.

## 3. Tratamento de estados (loading e erro)

**7. O que o usuário vê se a API demorar para responder? E se a requisição falhar (ex: sem internet)?**

Enquanto a API não responde, o usuário vê o spinner de carregamento. Se a requisição falhar (erro capturado no `try/catch` de `loadMovies`), o spinner some e aparece uma mensagem de erro com um botão "Tentar novamente".

**8. O grupo implementou alguma forma de tentar novamente (retry) após um erro? Por que isso é importante em apps mobile?**

Sim, o botão "Tentar novamente" chama a mesma função `loadMovies` novamente. Isso é importante porque conexões móveis são instáveis (o usuário pode estar com sinal fraco ou momentaneamente sem internet), e sem um retry a única opção do usuário seria fechar e reabrir o app.

## 4. Testes manuais do MVP

**9. Em quais dispositivos/ambientes o grupo testou o app? Quais diferenças de comportamento ou de layout foram observadas entre eles?**

O app foi testado em dispositivo Android físico via Expo Go e no emulador Android (Android Studio). No dispositivo físico, a lista de filmes carregou normalmente via rede Wi-Fi e a navegação para a tela de detalhes foi fluida. No emulador, o comportamento foi idêntico, porém com resposta de toque ligeiramente mais lenta por rodar em software. Não foram observadas diferenças visuais significativas entre os dois ambientes Android — a grade de dois cartões por linha e as imagens de pôster ficaram proporcionais nos dois casos. Em `expo start --web` (navegador), o layout também funcionou, mas o scroll de lista nativa se comportou como scroll de página, algo esperado na renderização web do React Native.

**10. Quais bugs ou comportamentos inesperados foram encontrados durante os testes manuais? Como foram corrigidos?**

Durante os testes, identificamos que ao desabilitar a internet e abrir o app, o spinner de loading ficava girando indefinidamente em vez de mostrar o erro, pois o timeout padrão do axios era muito longo. Corrigimos adicionando um timeout de 10 segundos na instância do axios em `services/api.js` (`timeout: 10000`), garantindo que o bloco `catch` de `loadMovies` seja acionado dentro de um tempo razoável e o botão "Tentar novamente" apareça para o usuário. Também notamos que filmes sem sinopse (`overview` vazio) exibiam um espaço em branco na tela de detalhes; adicionamos uma verificação condicional que exibe o texto "Sinopse não disponível." nesses casos.

**11. Por que testar em mais de um ambiente é especialmente importante em desenvolvimento mobile híbrido?**

Porque cada plataforma (Android, iOS, web) pode renderizar componentes de forma levemente diferente, ter comportamentos distintos de navegação e permissões, e rodar em tamanhos de tela e versões de sistema operacional variados. Testar em só um ambiente pode esconder problemas que só aparecem nos outros.

## 5. Teste automatizado simples

**12. Qual ferramenta de teste foi usada (ex: Jest, React Native Testing Library) e por que essa foi a escolha do grupo?**

Foi usado o Jest, com o preset `jest-expo`. Essa é a ferramenta recomendada oficialmente pela documentação do Expo, já integra com o Babel configurado no projeto e não exige nenhuma configuração nativa extra para testar funções isoladas.

**13. O que exatamente o teste escrito verifica? O que ele NÃO cobre (limitações)?**

O teste (`services/api.test.js`) verifica se a função `getPosterUrl` monta corretamente a URL do pôster, tanto com o tamanho padrão quanto com um tamanho customizado passado por parâmetro. Ele não cobre chamadas reais à API, a renderização das telas/componentes nem o fluxo de navegação entre elas.

**14. Qual a diferença entre o que esse teste automatizado garante e o que os testes manuais da Etapa 4 garantem?**

O teste automatizado garante, de forma rápida e repetível, que uma função isolada continua se comportando corretamente sempre que o código for alterado, sem precisar de intervenção humana. Os testes manuais garantem a experiência real de uso — layout, navegação, comportamento em diferentes dispositivos e resposta real da API —, mas dependem de uma pessoa repetir os passos manualmente a cada verificação.

## 6. Documentação e commit

**15. O que foi acrescentado ao README nesta etapa? Isso é suficiente para outra pessoa entender o estado atual do MVP?**

Foi acrescentada a seção "MVP (Etapa 2)", descrevendo a tela de listagem consumindo a API, a navegação reaproveitando os dados do filme, o tratamento de loading/erro e a função centralizada de pôster, além da seção de testes explicando a ferramenta usada e como rodá-los. Isso é suficiente para outra pessoa entender o que já está funcionando no MVP sem precisar ler todo o código primeiro.

**16. O que esse commit representa em relação ao commit anterior (o do setup)? O grupo considera que o app já é um MVP utilizável? Por quê?**

O commit anterior representava apenas a estrutura inicial (pastas, bibliotecas e README, sem funcionalidade). Este commit representa a transformação dessa base em um fluxo navegável de verdade: listagem com dados reais da API, tela de detalhes, tratamento de loading/erro e um teste automatizado. O grupo considera que já é um MVP utilizável, pois cobre o fluxo principal (listar → ver detalhes → voltar), mesmo sem funcionalidades extras como busca ou favoritos.

**17. Olhando para o app pronto até aqui, qual seria o próximo problema técnico ou funcional mais importante a resolver?**

A chave da API (`API_KEY`) está escrita diretamente no código-fonte, em `services/api.js`. O próximo problema mais importante a resolver é tirar essa chave do código e passar a carregá-la por variável de ambiente, para não expor a chave no repositório.
