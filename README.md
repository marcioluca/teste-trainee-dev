# Relatório Técnico - Márcio Lucas do Santos

## Visão Geral da Solução

Este projeto foi recebido em um estado não funcional, com múltiplos erros que impediam sua inicialização, além de uma lista extensa de bugs de funcionalidade e de interface. O trabalho realizado focou em estabilizar a aplicação, corrigir sistematicamente todos os bugs reportados pela equipe de QA e refatorar o código para seguir boas práticas de desenvolvimento em Angular, resultando em uma aplicação estável, funcional e com código limpo e organizado.

## Como Executar a Aplicação

Para executar a aplicação localmente, siga os passos abaixo:

1.  **Clonar o repositório:**
    ```bash
    git clone [https://github.com/marcioluca/teste-trainee-dev](https://github.com/marcioluca/teste-trainee-dev)
    ```
2.  **Navegar para a pasta do projeto:**
    ```bash
    cd nome-da-pasta
    ```
3.  **Instalar as dependências:**
    ```bash
    npm install
    ```
4.  **Iniciar o servidor de desenvolvimento:**
    ```bash
    npm start
    ```
    A aplicação estará disponível em `http://localhost:4200/`.

## Correção dos Erros Iniciais (npm start)

A aplicação não iniciava devido a uma série de erros de configuração e código. As seguintes correções foram aplicadas:

1.  **Script `start` Ausente:** O arquivo `package.json` não possuía o script `start`. Foi adicionado `"start": "ng serve"` para permitir a execução padrão.
2.  **Dependência Faltando:** A biblioteca `@fortawesome/fontawesome-free` era referenciada nos estilos do `angular.json` mas não estava listada no `package.json`, causando um erro de compilação. A dependência foi adicionada.
3.  **Erro de Compilação de Componentes:**
    * **HeaderComponent:** Havia um erro de digitação no nome da classe (`HeadeComponent`), o que impedia sua importação correta. O nome foi corrigido.
    * **NewTaskComponent:** A classe não possuía o decorator `@Component`, impedindo o Angular de reconhecê-la como um componente. O decorator foi adicionado.

## Relatório de Correção de Bugs

Todos os 13 bugs reportados na lista do QA foram corrigidos. Abaixo, o detalhamento de cada um:

**1. Tarefa adicionada duas vezes:**
* **Causa Raiz:** O método `addTask()` no `new-task.component.ts` chamava o serviço `addTodo()` duas vezes seguidas.
* **Solução:** A chamada duplicada ao serviço foi removida.

**2. Só era possível salvar uma tarefa na primeira vez:**
* **Causa Raiz:** Havia uma lógica incorreta com uma variável `count` que bloqueava a execução da função `addTask()` após o primeiro clique.
* **Solução:** A lógica de bloqueio com a variável `count` foi completamente removida.

**3. Texto do botão de limpar não estava em português:**
* **Causa Raiz:** O texto do botão "Limpar Tudo" vinha de uma propriedade `get labelClearAll()` no `todo.component.ts` que retornava "Clear All".
* **Solução:** O retorno da propriedade foi traduzido para "Limpar Tudo".

**4 e 5. Comportamento invertido dos botões "Exibir/Ocultar Tarefas Concluídas":**
* **Causa Raiz:** A lógica do texto no template `todo.component.html` estava invertida, e a forma de filtrar os todos era ineficiente.
* **Solução:** A lógica de texto do botão foi corrigida com o operador ternário. A filtragem foi refatorada para usar uma propriedade `get filteredTodos()` no componente, tornando o código mais limpo e reativo.

**6. Limpar tarefas concluídas sem confirmação:**
* **Causa Raiz:** O método `clearCompletedTasks()` no `todo.component.ts` não possuía um diálogo de confirmação.
* **Solução:** Foi adicionada uma chamada `if (confirm(...))` para solicitar a confirmação do usuário antes de executar a ação, seguindo o padrão do botão "Limpar Tudo".

**7. "Limpar Tarefas Concluídas" removia as não concluídas:**
* **Causa Raiz:** No `todo.service.ts`, o método `.filter()` estava com a lógica invertida (`.filter(t => t.completed === true)`), mantendo as tarefas concluídas em vez de removê-las.
* **Solução:** A lógica do filtro foi corrigida para `.filter(t => !t.completed)`, preservando apenas as tarefas não concluídas.

**8. Botão "Editar" não funcional:**
* **Causa Raiz:** Não havia nenhuma implementação para a funcionalidade de edição.
* **Solução:** Foi implementada uma comunicação entre os componentes `todo-item` e `new-task` através de um `BehaviorSubject` no `TodoService`. Isso permite que, ao clicar em "Editar", o formulário entre em "modo de edição", preenchendo o campo de texto com os dados da tarefa e alterando o botão para "Atualizar". A lógica do formulário agora suporta tanto a criação quanto a atualização de tarefas.

**9 e 10. Botão "Editar" desalinhado e botão "Remover" sem cor vermelha:**
* **Causa Raiz:** O botão "Remover" possuía um estilo inline (`style="color: black"`) que sobrepunha o CSS. A estrutura flexbox separava os botões.
* **Solução:** O estilo inline foi removido, permitindo que o CSS (`color: red`) fosse aplicado. Os botões de ação foram agrupados em uma `div` própria com `display: flex` para garantir o alinhamento correto.

**11. Lista sem barra de rolagem:**
* **Causa Raiz:** O container da lista no `todo.component.css` possuía a propriedade `overflow-y: hidden`.
* **Solução:** A propriedade foi alterada para `overflow-y: auto`, permitindo que a barra de rolagem apareça quando o conteúdo exceder a altura do container.

**12 e 13. Salvar tarefas em branco ou com espaços:**
* **Causa Raiz:** O método `addTask()` não validava o conteúdo do campo de texto antes de criar a tarefa.
* **Solução:** Foi adicionada uma verificação no início da função (`if (!this.newTaskTitle || !this.newTaskTitle.trim())`) para impedir a criação de tarefas com título inválido.

## Relatório de Débito Técnico
Devido à priorização da correção de todos os bugs existentes e da estabilização da aplicação, a implementação das **novas funcionalidades/melhorias** solicitadas não foi iniciada. Elas permanecem como débito técnico a ser abordado em uma próxima fase do projeto.

## Relatório de Melhorias
Para evoluir o sistema, sugiro as seguintes melhorias futuras:
* **Animações na Lista:** Adicionar animações sutis ao adicionar ou remover tarefas para uma experiência mais fluida.
* **Categorias/Tags:** Permitir que o usuário categorize tarefas com tags coloridas.
* **Datas de Vencimento:** Adicionar um campo de data para definir prazos para as tarefas.
* **Persistência de Dados no Backend:** Substituir o `localStorage` por uma API real para persistência de dados.