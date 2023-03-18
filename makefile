# General
cert := /mnt/c/Users/Desktop/.ssh/terraform-ec2-windows.pem
dns := ec2-user@ec2-54-160-70-171.compute-1.amazonaws.com
hosts := /mnt/c/Users/Desktop/Projects/nodejs-ddd-blog/ansible/hosts

# Playbooks
docker_pb := /mnt/c/Users/Desktop/Projects/nodejs-ddd-blog/ansible/playbook-docker.yml
echo_pb := /mnt/c/Users/Desktop/Projects/nodejs-ddd-blog/ansible/playbook-echo.yml
github_pb := /mnt/c/Users/Desktop/Projects/nodejs-ddd-blog/ansible/playbook-github.yml

# Targets
connect:
	sudo ssh -i "$(cert)" $(dns)

echo_ansible:
	sudo ansible-playbook -u ec2-user --private-key $(cert) -i $(hosts) $(echo_pb)

docker_ansible:
	sudo ansible-playbook -u ec2-user --private-key $(cert) -i $(hosts) $(docker_pb)

docker_github:
	sudo ansible-playbook -u ec2-user --private-key $(cert) -i $(hosts) $(github_pb)