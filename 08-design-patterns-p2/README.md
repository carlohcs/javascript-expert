# README

## Design Patterns

![Relationship between design patterns](https://startertutorials.com/patterns/wp-content/uploads/2013/11/design-pattern-relationships.jpg)

### Question

"Fala Erick, blz?

Cara, tenho uma dúvida em relação a overengineering, relacionado ao desenvolvimento de novas funcionalidades. Devo sempre tentar aplicar um padrão de projeto quando for possível, ou apenas quando for necessário?

Por exemplo:
Estou criando uma aplicação que integra com o chat do facebook, e futuramente a médio/longo prazo posso querer me integrar com o instagram (nada garantido). Devo já fazer essa integração inicial usando um strategy + adapter, mesmo sabendo que no momento teria apenas UM tipo de integração? Ou seria melhor primeiro eu fazer de uma forma básica e pensar em aplicar o strategy + adapter apenas quando fosse implementar novas integrações?"

### Answer

Minha opinião pessoal, quando eu vou desenvolver um projeto, eu tento reconhecer os padrões: o que a aplicação deve fazer, quais integrações deve ter e as regras de negócio. Com isso eu comparo com os padrões de projeto que conheço e julgo o que mais se aplica e se esta aplicação justifica o tempo e esforço em manutenção ao longo do tempo.

Sobre o seu exemplo, eu diria que:
1 - as primeiras semanas, eu tenho tendencia a gastar mais tempo implementando a melhor estrutura de pastas possível mesmo sabendo que podem demorar meses para aquela funcionalidade entrar
2 - se eu vejo que é algo muito para longo prazo, eu desenvolvo uma estrutura que seja fácil de mudar depois

Implementar um padrão ou não,vai muito da sua maturidade como dev e o tamanho da expectativa da vida util do software. Já vi projetos todos bagunçados entregando o minimo possível e projetos com uma excelencia técnica a termos de arquitetura apenas atrasando o time e tornando alterações inviáveis.

O que levaria em conscideração é sempre pensar no motivo de você implementar uma estrutura e fazer a auto análise sobre o beneficio e malefício de adicionar ao software.

Com uma resposta mais direta, eu diria que implementaria sim esses padrões (uma vez que não tomem tanto tempo) e prepare o software para o futuro. Minha experiencia, é que implementar um padrão de projeto em um produto que já está em produção geralmente é algo bem árdui e dificil de convencer o time, pois o software já está funcionando


Refs:

- https://www.startertutorials.com/patterns/select-design-pattern.html
- https://softwareengineering.stackexchange.com/a/227880
- https://www.startertutorials.com/patterns/select-design-pattern.html
- https://www.gofpatterns.com/design-patterns/module7/how-to-choose-designPattern.php
- https://en.wikipedia.org/wiki/Software_design_pattern