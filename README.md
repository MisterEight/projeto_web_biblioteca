# Projeto Biblioteca

Este repositório contém um exemplo simples de configuração de banco de dados para o sistema de biblioteca.

## Estrutura

- `init.sql` – script SQL responsável por criar as tabelas `usuarios`, `livros` e `emprestimos`.
- `docker-compose.yml` – configuração para iniciar um container Postgres e executar o script de inicialização.

## Como executar

É necessário ter o Docker e o Docker Compose instalados. Para iniciar o banco de dados basta executar:

```bash
docker-compose up -d
```

O serviço ficará disponível na porta padrão `5432` com as seguintes credenciais:

- **Usuário:** `biblioteca`
- **Senha:** `biblioteca`
- **Banco:** `biblioteca`

O script `init.sql` será executado automaticamente na primeira inicialização para criar as tabelas.

