- [ ] **Pedidos**

  - [ ] Poder remover pedidos antes de confirmar
  - [ ] Melhorar a apresentação dos status dos itens
    - Atualmente está mostrando somente uma descrição, precisa mostrar um ícone ou cor para facilitar a visualização

- [ ] **Cozinha**

  - [ ] Apresentar itens em uma lista e não em cards, para deixar a ordem de entrada mais clara
    - é preciso validar de a ordem de entrada é mantida, pois caso não seja será necessário adicionar um campo de timestamp ao item, e ordenar a lista por ele
  - [ ] Ter a opção de "em preparo" - para que o cliente saiba disso (será que é necessário mesmo?)
  - [ ] Ter a opção de "entregue"

- [ ] **Pedido**

  - [ ] Adicionar botão de fechar pedido
    - [ ] Realizar o cálculo do pedido
    - [ ] Fechar o pedido
    - [ ] Filtrar os pedidos das mesas (para apresentar somente os em aberto do dia corrente)
    - [ ] Adicionar data no pedido (DD/MM/YYYY)

> Fim da versão 1.0 (uso dos garçons)

---

- Pedido

  - [ ] Criar uma lógica para que um usuário anônimo, possa fazer um pedido

    - Garantir que uma pessoa não possa ver o pedido de outra
    - Garantir que o pedido seja feito para a mesa correta
    - Garantir que uma pessoa que não esteja no restaurante não possa fazer um pedido
    - Garantir que o pedido seja feito para o dia correto

    - Sugestão:

      - Usuário acessa o sistema
      - O sistema gera um código de acesso
      - O usuário informa o código de acesso
      - Um funcionário do restaurante confirma o código de acesso
      - O usuário é redirecionado para a tela de pedidos
      - O usuário faz o pedido

      (O código de acesso pode ser um código QR, ou um código numérico)

- [ ] **Resumo**
  - [ ] Pedidos por dia
  - [ ] Pedidos por mesa
  - [ ] Criar documento de fechamento
    - [ ] Total de lucro por dia
    - [ ] Total de produtos por dia
