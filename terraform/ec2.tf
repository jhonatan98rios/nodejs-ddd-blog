resource "aws_instance" "blog_ec2" {
  ami           = var.ami
  instance_type = var.instance_type
  key_name      = var.key_pair

  tags = {
    Name        = var.name
    Environment = var.env
    Provisioner = "Terraform"
  }

  vpc_security_group_ids = [
    aws_security_group.allow_ssh.id,
    aws_security_group.allow_http.id,
    aws_security_group.allow_https.id,
    aws_security_group.allow_download.id
  ]
}