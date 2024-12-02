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

resource "aws_s3_bucket" "pipeline_s3_bucket" {
  bucket = var.pipeline_s3_bucket
  force_destroy = true

  tags = var.pipeline_tags
}

resource "aws_codepipeline" "codepipeline" {
  name = "test_framework_image_builder"
  role_arn = ""
  tags = var.pipeline_tags

  artifact_store {
    type = s3
    location = var.pipeline_s3_bucket
  }

  stage {
    name = "Build"
  }

  stage {
    name = "Deploy"
  }
}