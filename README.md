# 🛒 Shop Food

## 🌟 Funcionalidades do Aplicativo

### 🪑 Tela 1 - Mesas

- 📋 Exibe mesas de forma ordenada.
- ➕ Adiciona uma mesa (com numeração incremental).
- 🔄 Atualiza automaticamente as telas de mesas.
- 📝 Adiciona pedidos a uma mesa.

### 🍽️ Tela 2 - Pedidos

- 🔍 Exibe informações sobre o pedido selecionado.
- ➕ Adiciona itens:
  - 🆕 Mostra itens escolhidos antes da confirmação, para fazer uma dupla verificação com o cliente.
    - ✅ Confirma os itens adicionados ao pedido.
    - Permite remover itens antes da confirmação.
  - 📊 Exibe o status dos itens, de forma bem intuitiva. Evidenciando para o cliente o status de cada item.
  - 📈 Adiciona quantidade a um item selecionado.
  - 💰 Apresenta o preço do produto.
  - Possui uma lista de produtos com busca, tornando a experiência mais dinâmica.

### 👩‍🍳 Tela 3 - Cozinha

- 🍴 Exibe itens pendentes de preparo ou entrega:
  - 🔄 Atualiza a lista com base na ordem dos eventos de criação de itens no Firebase.
  - A lista está no formato de tabela, evidenciando a ordem de entrada dos itens. Isso ajuda a evitar que os itens sejam entregues fora de ordem, levando uma melhor experiência ao cliente.
- 🚚 Fornece uma opção para marcar um item como entregue:
  - Tem um passo de confirmação da entrega, evitando cliques acidentais.
  - ✅ Atualiza o status do item.

## Níveis de acesso

Para definir o nível de acesso, após o registro do usuário, vincula-se o UID do usuário ao nível de acesso desejado ('role') na coleção 'users' do Firestore.

## 🚀 Funcionalidades Futuras

Funcionalidades futuras estão descritas no documento [TODO.md](./TODO.md). Consulte-o para mais detalhes.
