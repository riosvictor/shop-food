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
  - 🆕 Mostra itens recém-adicionados.
  - ✅ Confirma os itens adicionados ao pedido.
  - 📊 Exibe o status dos itens.
  - 📈 Adiciona quantidade a um item selecionado.
  - 💰 Apresenta o preço do produto.

### 👩‍🍳 Tela 3 - Cozinha

- 🍴 Exibe itens pendentes de preparo ou entrega:
  - 🔄 Atualiza a lista com base na ordem dos eventos de criação de itens no Firebase.
- 🚚 Fornece uma opção para marcar um item como entregue:
  - ✅ Atualiza o status do item.

## Níveis de acesso

Para definir o nível de acesso, após o registro do usuário, vincula-se o UID do usuário ao nível de acesso desejado ('role') na coleção 'users' do Firestore.

## 🚀 Funcionalidades Futuras

Funcionalidades futuras estão descritas no documento [TODO.md](./TODO.md). Consulte-o para mais detalhes.
