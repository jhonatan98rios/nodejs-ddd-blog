Para instalar o Docker e baixar a imagem do ECR no EC2 usando o Ansible, siga os seguintes passos:

1. Configure o grupo de hosts no arquivo de inventário do Ansible, especificando o endereço IP ou outro identificador do EC2. Por exemplo:

```
[ec2]
192.168.1.100
```

2. Crie um playbook do Ansible para executar as tarefas desejadas. Por exemplo:

```yaml
- hosts: ec2
  become: true
  tasks:
  - name: Instalar o Docker
    apt:
      name: docker.io
      update_cache: yes

  - name: Iniciar o serviço do Docker
    service:
      name: docker
      state: started

  - name: Baixar a imagem do ECR
    docker_login:
      username: "{{ ecr_username }}"
      password: "{{ ecr_password }}"
      registry_url: "{{ ecr_registry_url }}"

  - name: Rodar o container com a aplicação
    docker_container:
      name: minha_app
      image: "{{ ecr_repository_url }}:{{ ecr_tag }}"
      ports:
      - "80:8080"
      restart_policy: always
```

ou

```yaml
- hosts: ec2
  become: true
  tasks:
  - name: Instalar o Docker
    apt:
      name: docker.io
      update_cache: yes

  - name: Iniciar o serviço do Docker
    service:
      name: docker
      state: started

  - name: Download image from ECR
    hosts: ec2
    become: true
    tasks:
    - name: Login to ECR
    command: $(aws ecr get-login --no-include-email --region us-east-1)
    - name: Pull image from ECR
    command: docker pull my-ecr-repo/my-image:latest

  - name: Rodar o container com a aplicação
    docker_container:
      name: minha_app
      image: "{{ ecr_repository_url }}:{{ ecr_tag }}"
      ports:
      - "80:8080"
      restart_policy: always

```

3. Preencha as variáveis do playbook com os valores correspondentes. Por exemplo:

```yaml
vars:
ecr_username: "meu_username"
ecr_password: "minha_senha"
ecr_registry_url: "123456789012.dkr.ecr.us-east-1.amazonaws.com"
ecr_repository_url: "minha_app"
ecr_tag: "latest"
```

4. Execute o playbook com o comando `ansible-playbook`. Por exemplo:

```shell
ansible-playbook -i inventario.yml playbook.yml
```

Isso irá instalar o Docker no EC2, fazer o login no ECR, baixar a imagem da aplicação e rodar um container com a aplicação na porta 80 no EC2.

6. Configure o HTTPS no seu container. Uma opção é utilizar o serviço da AWS chamado Elastic Load Balancer (ELB) para fazer isso. O ELB pode gerar automaticamente um certificado SSL/TLS para a sua aplicação. Basta configurar o listener do ELB para redirecionar o tráfego HTTPS para o seu container.