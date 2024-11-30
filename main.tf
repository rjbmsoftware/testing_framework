terraform {
  required_providers {
    aws = {
       source = "hashicorp/aws"
       version = "-> 5.78.0"
    }
  }

  required_version = ">= 1.2.0"
}

provider "aws" {
    region = "eu-west-2"
}

resource "aws_codepipeline" "codepipeline" {
  name = "test_framework_codepipelime"
  role_arn = ""

  artifact_store {
    location = 
  }
}