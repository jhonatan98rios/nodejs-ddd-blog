variable "region" {
  default = "us-east-1"
}

variable "name" {
  default = "blog_ec2"
}

variable "env" {
  default = "prod"
}

variable "ami" {
  default = "ami-005f9685cb30f234b"
}

variable "instance_type" {
  default = "t2.micro"
}

variable "key_pair" {
  default = "terraform-ec2-windows"
}