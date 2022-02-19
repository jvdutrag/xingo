![Xingo](https://i.imgur.com/NRC0QJd.png "Xingo")
O [Xingo](https://xingo.site/) é um site brasileiro de advinhação diária de palavras, baseado no Wordle e no Lewdle. Porém todas as palavras são de baixo calão, vulgares e obscenas. Todos os dias uma nova palavra de baixo calão surge pra você advinhar em 6 tentativas.

### Tecnologias
É bacana ressaltar que o projeto foi criado do zero, porém inspirado pelas outras variantes do mesmo jogo. O jogo funciona 100% client-side, sem nenhuma comunicação com nenhum servidor. O armazenamento dos dados é feito em Local Storage. O único servidor existente é o responsável por renderizar a aplicação. As tecnologias utilizadas são React com TypeScript. 

### Banco de dados das palavras
A lista de palavras para cada dia estão em um arquivo ``.json`` e são criptografadas para dificultar _cheating_ no jogo. Embora a descriptografia seja simples, requer conhecimentos de programação, o que nem todos conseguem ter, dificultando _um pouco_ o _cheating_. Além de que simplesmente estraga a graça do jogo em saber qual é a palavra.

### Licença
Você pode fazer o que quiser com o código do Xingo! Só credite corretamente. :)
