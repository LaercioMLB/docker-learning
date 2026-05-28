# Docker Learning

Este repositório tem fins acadêmicos e reúne exemplos práticos de criação de imagens Docker para casos de uso específicos.

A proposta é que cada branch apresente um cenário diferente, com explicações passo a passo sobre como o `Dockerfile` funciona, como criar a imagem, como executar o container e como acessar ou testar o resultado.

Em vez de concentrar todos os exemplos em uma única branch, este repositório organiza os conteúdos por branches. Assim, cada caso fica mais simples de estudar, comparar e executar.

## Objetivo Do Repositório

O objetivo deste repositório é ajudar no aprendizado de Docker por meio de exemplos pequenos, diretos e explicados.

Cada exemplo busca mostrar:

- qual imagem base foi escolhida;
- como os arquivos do projeto são copiados para dentro da imagem;
- quais portas precisam ser expostas;
- quais comandos são executados quando o container inicia;
- como criar a imagem com `docker build`;
- como executar o container com `docker run`;
- como acessar a aplicação ou serviço publicado.

## Como Usar Este Repositório

Escolha a branch que mais se aproxima do caso de uso que você quer estudar.

Para listar as branches disponíveis:

```powershell
git branch -a
```

Para trocar para uma branch específica:

```powershell
git checkout nome-da-branch
```

Exemplo:

```powershell
git checkout container-nginx
```

Depois de entrar na branch desejada, leia o `README.md` daquela branch e siga o passo a passo.

## Branches Disponíveis

### `main`

Branch principal do repositório.

Ela serve como ponto de entrada e explica o caráter geral do projeto. Use esta branch para entender a organização do repositório e decidir qual exemplo estudar.

### `container-nginx`

Exemplo de criação de uma imagem Docker usando Nginx para publicar um site estático.

Esta branch é útil para estudar:

- uso da imagem oficial do Nginx;
- cópia de arquivos HTML, CSS, JavaScript e assets para dentro do container;
- configuração de servidor web;
- publicação de conteúdo estático;
- mapeamento de portas entre máquina local e container.

### `container-tomcat`

Exemplo de criação de uma imagem Docker usando Apache Tomcat para executar uma aplicação Java empacotada em `.war`.

Esta branch é útil para estudar:

- uso da imagem oficial do Tomcat;
- uso de Java dentro do container;
- cópia de arquivo `.war` para a pasta `webapps`;
- publicação da aplicação como `ROOT.war`;
- execução de aplicações Java web em container.


## Qual Branch Escolher?

Use este guia rápido:

```text
Quero publicar um site estático
-> container-nginx

Quero executar uma aplicação Java .war
-> container-tomcat

Quero entender a organização geral do repositório
-> main
```

## Pré-Requisitos Gerais

Para executar os exemplos, é recomendado ter instalado:

- Docker Desktop;
- Git;
- terminal PowerShell, Prompt de Comando, Git Bash ou equivalente;
- navegador web, quando o exemplo publicar uma aplicação acessível por HTTP.

Docker Desktop:

```text
https://www.docker.com/products/docker-desktop/
```

Git:

```text
https://git-scm.com/
```

Após instalar o Docker, verifique se ele está funcionando:

```powershell
docker --version
```

Também é possível verificar se o serviço está ativo:

```powershell
docker ps
```

## Fluxo Geral De Estudo

Uma forma recomendada de usar este repositório é:

1. Acessar a branch `main`.
2. Escolher o caso de uso desejado.
3. Trocar para a branch correspondente.
4. Ler o `README.md` da branch.
5. Conferir o `Dockerfile`.
6. Criar a imagem Docker.
7. Executar o container.
8. Testar o resultado.
9. Comparar com outras branches para entender as diferenças.

## Comandos Git Úteis

### Ver Branch Atual

```powershell
git branch --show-current
```

### Listar Branches Locais

```powershell
git branch
```

### Listar Branches Locais E Remotas

```powershell
git branch -a
```

### Trocar De Branch

```powershell
git checkout nome-da-branch
```

Exemplo:

```powershell
git checkout container-tomcat
```

### Atualizar Informações Do Repositório Remoto

```powershell
git fetch
```

## Comandos Docker Mais Comuns

Os comandos exatos podem variar conforme a branch, mas normalmente os exemplos seguem este padrão:

```powershell
docker build -t nome-da-imagem .
```

```powershell
docker run -d -p porta-local:porta-container --name nome-do-container nome-da-imagem
```

Para listar containers em execução:

```powershell
docker ps
```

Para parar um container:

```powershell
docker stop nome-do-container
```

Para remover um container parado:

```powershell
docker rm nome-do-container
```

Para ver logs:

```powershell
docker logs nome-do-container
```

## Observação

Cada branch foi pensada como um exemplo independente. Por isso, arquivos, portas, nomes de imagens e comandos podem mudar de uma branch para outra.

Sempre leia o `README.md` da branch escolhida antes de executar os comandos.
