Para configurar o ELB (Elastic Load Balancer) para uma instância EC2 utilizando o Ansible, siga os seguintes passos:

1. Crie um arquivo de inventário do Ansible com as informações das suas instâncias EC2. Por exemplo, em um arquivo chamado "hosts.ini", adicione o seguinte conteúdo:

```
[webservers]
ec2-instance-name ansible_host=ec2-instance-public-ip ansible_user=ec2-user
```

Substitua "ec2-instance-name" pelo nome da sua instância EC2 e "ec2-instance-public-ip" pelo seu endereço IP público. Certifique-se de ter a chave SSH correta para a instância.

2. Crie um playbook do Ansible para configurar o ELB. Por exemplo, em um arquivo chamado "playbook.yml", adicione o seguinte conteúdo:

```yaml
- hosts: webservers
  tasks:
  - name: Set up EC2 instance with ELB
    ec2_elb:
    aws_access_key: "{{ aws_access_key }}"
    aws_secret_key: "{{ aws_secret_key }}"
    region: "{{ region }}"
    name: my-elb
    state: present
    subnets: subnet-12345678,subnet-98765432
    security_groups: sg-12345678
    listeners:
  - protocol: http
    lb_port: 80
    instance_port: 80
    instances:
  - id: "{{ ec2_instance_id }}"
```

Substitua os valores de "aws_access_key" e "aws_secret_key" pelas suas credenciais da AWS. Substitua também "region" pela região da sua instância EC2, "my-elb" pelo nome que você deseja dar ao seu ELB, "subnet-12345678,subnet-98765432" pelos IDs das suas sub-redes e "sg-12345678" pelo ID do seu grupo de segurança. Certifique-se de substituir "ec2_instance_id" pelo ID da sua instância EC2.

3. Execute o playbook com o comando "ansible-playbook playbook.yml -i hosts.ini".

Após a execução do playbook, o ELB deve estar configurado para a sua instância EC2. Você pode acessá-lo pelo DNS fornecido pela AWS ou pelo console de gerenciamento da AWS. Certifique-se de que as suas portas estejam abertas no grupo de segurança para que o ELB possa se comunicar com a sua instância.