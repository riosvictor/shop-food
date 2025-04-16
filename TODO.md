### Funcionalidades Testadas

> - não implementadas ainda

| Funcionalidade                                   | Testada com Cypress |
| ------------------------------------------------ | ------------------- |
| Login com usuário inválido                       | ✅                  |
| Login com usuário válido                         | ✅                  |
| Logout                                           | ✅                  |
| Restringir acesso a menus de acordo com a role\* |                     |
| ---------------------------                      | ---------           |
| Adicionar nova mesa                              |                     |
| Adicionar pedido a mesa                          |                     |
| Remover mesa\*                                   |                     |
| Listagem correta das mesas                       |                     |
| ---------------------------                      | ---------           |
| Pedidos                                          |                     |
| Cozinha                                          |                     |

- Resumo da Versão 1.0 (uso dos garçons)

### Funcionalidades Resumidas

- **Tela 1 - Mesas**:

  - Exibição e gerenciamento de mesas.
  - Adição de novas mesas com numeração incremental.
  - Atualização automática das informações.
  - Inclusão de pedidos vinculados às mesas.

- **Tela 2 - Pedidos**:

  - Visualização detalhada de pedidos.
  - Adição de itens com confirmação prévia.
  - Controle de status dos itens.
  - Busca dinâmica de produtos.
  - Finalização de pedidos com resumo detalhado e valor total.

- **Tela 3 - Cozinha**:
  - Exibição de itens pendentes em ordem de criação.
  - Atualização em tempo real.
  - Confirmação e atualização de status de itens entregues.

---

## Funcionalidades Futuras

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
