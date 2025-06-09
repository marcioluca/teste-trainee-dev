Relatório Técnico - Márcio Lucas

## Visão Geral da Solução

Este projeto foi recebido em um estado não funcional e com uma lista extensa de bugs. O trabalho realizado focou em três frentes principais:

1.  **Estabilização:** Correção de múltiplos erros de compilação, configuração e dependências que impediam a inicialização da aplicação.
2.  **Correção de Bugs:** Resolução de todos os bugs de funcionalidade e interface reportados pela equipe de QA, resultando em uma aplicação estável e confiável.
3.  **Implementação de Melhorias:** Desenvolvimento e integração de todas as novas funcionalidades solicitadas, elevando a qualidade e a experiência de uso da aplicação.

O resultado é uma aplicação robusta, funcional e moderna, com código limpo e seguindo as boas práticas de desenvolvimento em Angular.

## Como Executar a Aplicação

Para executar a aplicação localmente, siga os passos abaixo:

1.  **Clonar o repositório:**
    ```bash
    git clone https://github.com/marcioluca/teste-trainee-dev
    ```
2.  **Navegar para a pasta do projeto:**
    ```bash
    cd teste-trainee-dev
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

A aplicação não iniciava devido a uma série de erros. As seguintes correções foram aplicadas para estabilizar o ambiente:
* **Script `start` Ausente:** Adicionado `"start": "ng serve"` ao `package.json`.
* **Dependência Faltando:** Adicionada a dependência `@fortawesome/fontawesome-free` ao `package.json`.
* **Erro de Compilação de Componentes:** Corrigido erro de digitação na classe `HeaderComponent`, adicionado o decorator `@Component` ao `NewTaskComponent`.

## Relatório de Correção de Bugs

Todos os 13 bugs reportados na lista do QA foram corrigidos. O histórico de commits detalha cada correção individualmente.

## Relatório de Implementação de Melhorias

Todas as 6 melhorias solicitadas foram implementadas com sucesso:

1.  **Ordenar de A a Z:** Foi adicionado um botão e um método `sortAlphabetically()` que utiliza `Array.prototype.sort` com `localeCompare` para uma ordenação alfabética robusta. A referência do array de tarefas é atualizada para garantir que o Angular atualize a interface.

2.  **Adicionar com a Tecla Enter:** A tag `<input>` no formulário de nova tarefa foi atualizada para capturar o evento `(keydown.enter)`, permitindo que o usuário adicione tarefas de forma mais rápida e intuitiva.

3.  **Adicionar Múltiplas Tarefas:** O método de adicionar tarefa foi aprimorado para detectar o caractere `|`. Se presente, a string é dividida (`split('|')`) e um loop é executado para adicionar cada tarefa individualmente, ignorando entradas vazias.

4.  **Filtro de Palavras Obscenas:** A biblioteca `bad-words` foi instalada e integrada. Uma verificação `isProfane()` foi adicionada para bloquear o cadastro de tarefas com conteúdo impróprio e exibir um alerta ao usuário.

5.  **Exportar para PDF:** Utilizando a biblioteca `jsPDF`, foi criado um botão "Exportar para PDF". A funcionalidade gera um documento contendo a lista de tarefas visíveis na tela, formatadas com seu status (concluída/pendente), e o oferece para download.

6.  **Alertas Modernos com SweetAlert:** Todos os `confirm()` nativos do navegador foram substituídos por chamadas à biblioteca `SweetAlert2`, proporcionando diálogos de confirmação mais elegantes, informativos e com uma experiência de usuário superior.
