# Docker Learning

Este repositório tem fins acadêmicos e demonstra como usar Docker para publicar um site estático com Nginx.

O projeto contém uma pasta `site-exemplo/` com arquivos HTML, CSS, JavaScript e assets já gerados. O Docker é usado para empacotar esses arquivos dentro de um container com Nginx, permitindo que o site seja executado da mesma forma em qualquer máquina que tenha Docker instalado.

## Estrutura Do Projeto

```text
docker-learning/
├── Dockerfile
├── nginx.conf
├── .gitignore
└── site-exemplo/
    ├── index.html
    ├── 404.html
    ├── assets/
    ├── search/
    └── demais páginas HTML
```

## Como O Projeto Funciona

O funcionamento geral é:

1. O Docker usa uma imagem oficial do Nginx.
2. A configuração padrão do Nginx é removida.
3. Uma configuração personalizada é copiada para dentro do container.
4. Os arquivos padrão do Nginx são apagados.
5. Os arquivos do site em `site-exemplo/` são copiados para o diretório público do Nginx.
6. A porta `80` é exposta.
7. O Nginx é iniciado para servir o site.

## Dockerfile Explicado

Arquivo utilizado pelo projeto:

```dockerfile
# Usa a imagem oficial do Nginx
FROM nginx:alpine

# Remove configuração padrão
RUN rm /etc/nginx/conf.d/default.conf

# Copia o nginx.conf customizado
COPY nginx.conf /etc/nginx/nginx.conf

# Remove os arquivos padrão do nginx
RUN rm -rf /usr/share/nginx/html/*

# Copia os arquivos estáticos da pasta "site"
COPY site-exemplo/ /usr/share/nginx/html/

# Expõe a porta padrão
EXPOSE 80

# Inicia o nginx
CMD ["nginx", "-g", "daemon off;"]
```

### `FROM nginx:alpine`

Define a imagem base usada para criar a imagem do projeto.

Neste caso:

- `nginx` é a imagem oficial do servidor Nginx.
- `alpine` é uma versão mais leve da imagem, baseada no Alpine Linux.

Exemplo alternativo:

```dockerfile
FROM nginx
```

Esse exemplo também funcionaria, mas normalmente geraria uma imagem maior.

### `RUN rm /etc/nginx/conf.d/default.conf`

Executa um comando durante a criação da imagem.

Neste projeto, remove a configuração padrão do Nginx.

O comando `RUN` é usado para preparar a imagem, por exemplo:

- instalar pacotes;
- remover arquivos;
- criar diretórios;
- alterar permissões;
- executar comandos necessários antes do container iniciar.

Exemplo:

```dockerfile
RUN mkdir /app
```

### `COPY nginx.conf /etc/nginx/nginx.conf`

Copia o arquivo `nginx.conf` do repositório para dentro da imagem Docker.

Formato geral:

```dockerfile
COPY origem destino
```

No projeto:

```dockerfile
COPY nginx.conf /etc/nginx/nginx.conf
```

Isso substitui a configuração principal do Nginx dentro do container.

### `RUN rm -rf /usr/share/nginx/html/*`

Remove os arquivos HTML padrão que vêm com a imagem oficial do Nginx.

Sem esse comando, o container poderia exibir a página padrão do Nginx em vez do site do projeto.

### `COPY site-exemplo/ /usr/share/nginx/html/`

Copia todos os arquivos da pasta `site-exemplo/` para o diretório público do Nginx.

Dentro do container, o Nginx serve arquivos a partir de:

```text
/usr/share/nginx/html/
```

Ou seja, o arquivo:

```text
site-exemplo/index.html
```

passa a ser servido como:

```text
/usr/share/nginx/html/index.html
```

### `EXPOSE 80`

Informa que o container utiliza a porta `80`.

Importante: `EXPOSE` apenas documenta a porta usada pelo container. Ele não libera automaticamente essa porta na máquina local.

Para acessar o site pelo navegador, é necessário mapear a porta com `-p` no comando `docker run`.

Exemplo:

```powershell
docker run -p 8080:80 site-exemplo
```

Nesse exemplo:

- `8080` é a porta da máquina do aluno;
- `80` é a porta interna do container.

### `CMD ["nginx", "-g", "daemon off;"]`

Define o comando executado quando o container inicia.

Neste projeto, o comando inicia o Nginx.

O parâmetro:

```text
daemon off;
```

mantém o Nginx rodando em primeiro plano. Isso é necessário porque o Docker mantém o container ativo enquanto o processo principal estiver em execução.

## nginx.conf Explicado

Arquivo usado pelo projeto:

```nginx
events {}

http {
    include /etc/nginx/mime.types;

    server {
        listen 80;
        server_name localhost;

        root /usr/share/nginx/html;
        index index.html;

        location / {
            try_files $uri $uri/ /index.html;
        }
    }
}
```

### `events {}`

Bloco obrigatório da configuração do Nginx.

Neste projeto ele está vazio, pois não há necessidade de configurações específicas de eventos.

### `http`

Define as configurações relacionadas ao protocolo HTTP.

```nginx
http {
    include /etc/nginx/mime.types;
}
```

A linha `include /etc/nginx/mime.types;` permite que o Nginx reconheça corretamente tipos de arquivos como HTML, CSS, JavaScript, imagens e fontes.

### `server`

Define um servidor web.

```nginx
server {
    listen 80;
    server_name localhost;
}
```

Neste projeto, o servidor escuta na porta `80` e usa `localhost` como nome do servidor.

### `root`

Define o diretório onde estão os arquivos do site.

```nginx
root /usr/share/nginx/html;
```

Esse caminho é o mesmo usado no `Dockerfile` ao copiar os arquivos da pasta `site-exemplo/`.

### `index`

Define o arquivo inicial do site.

```nginx
index index.html;
```

Quando o usuário acessa a raiz do site, o Nginx carrega o arquivo `index.html`.

### `location /`

Define como o Nginx deve responder às requisições feitas para o site.

```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

O comando `try_files` tenta encontrar:

1. o arquivo solicitado;
2. uma pasta correspondente;
3. o arquivo `index.html`, caso os anteriores não existam.

Esse comportamento é comum em sites estáticos e aplicações que usam navegação pelo lado do cliente.

## Pré-Requisitos

Antes de executar o projeto, o aluno precisa ter instalado:

- Docker Desktop;
- terminal PowerShell, Prompt de Comando, Git Bash ou outro terminal equivalente;
- navegador web.

Docker Desktop:

```text
https://www.docker.com/products/docker-desktop/
```

Após instalar, verifique se o Docker está funcionando:

```powershell
docker --version
```

Também é possível verificar se o serviço está ativo:

```powershell
docker ps
```

## Passo A Passo Para Executar

### 1. Acessar A Pasta Do Projeto

No terminal, entre na pasta do repositório:

```powershell
cd caminho\para\docker-learning
```

Exemplo:

```powershell
cd C:\Users\Aluno\Documents\GitHub\docker-learning
```

### 2. Criar A Imagem Docker

Execute:

```powershell
docker build -t site-exemplo .
```

Explicação dos parâmetros:

- `docker build`: cria uma imagem Docker a partir de um `Dockerfile`;
- `-t site-exemplo`: define o nome da imagem como `site-exemplo`;
- `.`: indica que o Docker deve usar a pasta atual como contexto de build.

### 3. Executar O Container

Execute:

```powershell
docker run -d -p 8080:80 --name meu-site site-exemplo
```

Explicação dos parâmetros:

- `docker run`: cria e inicia um container;
- `-d`: executa o container em segundo plano;
- `-p 8080:80`: mapeia a porta `8080` da máquina para a porta `80` do container;
- `--name meu-site`: define o nome do container como `meu-site`;
- `site-exemplo`: informa qual imagem será usada.

### 4. Acessar O Site

Abra o navegador e acesse:

```text
http://localhost:8080
```

## Comandos Úteis Do Docker

### Listar Containers Em Execução

```powershell
docker ps
```

### Listar Todos Os Containers

```powershell
docker ps -a
```

### Parar O Container

```powershell
docker stop meu-site
```

### Iniciar O Container Novamente

```powershell
docker start meu-site
```

### Remover O Container

Antes de remover, o container precisa estar parado.

```powershell
docker rm meu-site
```

### Remover A Imagem

```powershell
docker rmi site-exemplo
```

### Ver Logs Do Container

```powershell
docker logs meu-site
```

### Executar O Container Sem Segundo Plano

```powershell
docker run -p 8080:80 site-exemplo
```

Nesse modo, os logs aparecem diretamente no terminal.

Para parar a execução, use `Ctrl + C`.

## Principais Parâmetros Usados

### `docker build`

```powershell
docker build -t site-exemplo .
```

Parâmetros:

- `-t`: define nome e, opcionalmente, tag da imagem;
- `.`: define o contexto de build.

Exemplo com tag:

```powershell
docker build -t site-exemplo:v1 .
```

### `docker run`

```powershell
docker run -d -p 8080:80 --name meu-site site-exemplo
```

Parâmetros:

- `-d`: executa em segundo plano;
- `-p`: publica uma porta do container na máquina local;
- `--name`: define um nome para o container.

Outros exemplos:

```powershell
docker run --rm -p 8080:80 site-exemplo
```

O parâmetro `--rm` remove o container automaticamente quando ele é encerrado.

```powershell
docker run -d -p 3000:80 --name site-porta-3000 site-exemplo
```

Nesse exemplo, o site será acessado em:

```text
http://localhost:3000
```

## Fluxo Completo

Para executar do zero:

```powershell
docker build -t site-exemplo .
docker run -d -p 8080:80 --name meu-site site-exemplo
```

Acesse:

```text
http://localhost:8080
```

Para parar e remover:

```powershell
docker stop meu-site
docker rm meu-site
```

