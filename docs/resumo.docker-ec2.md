## Para instalar o Docker em um EC2 na AWS, siga as seguintes etapas:

1. Conecte-se ao seu EC2 via SSH.
2. Execute o comando abaixo para atualizar os pacotes instalados:

```shell
sudo yum update -y
```

3. Execute o comando abaixo para instalar o Docker:

```shell
sudo amazon-linux-extras install docker -y
```

4. Execute o comando abaixo para inicializar o serviço Docker:

```shell
sudo service docker start
```

5. Execute o comando abaixo para adicionar o usuário que está executando o SSH ao grupo Docker:

```shell
sudo usermod -a -G docker ec2-user
```

6. Faça logout e login novamente para aplicar as alterações.

7. Execute o comando abaixo para verificar se o Docker foi instalado corretamente:

```shell
docker run hello-world
```

## Assim que o Docker estiver instalado, você pode baixar a imagem do ECR e iniciar um container com sua aplicação.

1. Execute o comando abaixo para fazer login no ECR:

```shell
aws ecr get-login-password --region | docker login --username AWS --password-stdin .dkr.ecr..amazonaws.com
```

Substitua `` pelo código da região da sua conta AWS (por exemplo, `us-east-1`) e `` pelo ID da sua conta AWS.

2. Execute o comando abaixo para baixar a imagem do ECR:

```shell
docker pull .dkr.ecr..amazonaws.com/:
```

Substitua ``, ``, `` e `` pelo nome do repositório e a tag da imagem que você criou no ECR.

3. Execute o comando abaixo para iniciar um container com a sua aplicação:

```shell
docker run -p 3000:3000 .dkr.ecr..amazonaws.com/:
```

O parâmetro `-p 3000:3000` mapeia a porta 3000 do container para a porta 3000 do host.

Pronto! Agora você tem a sua aplicação rodando em um container na sua instância EC2 da AWS.