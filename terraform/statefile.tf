
terraform {
  backend "s3" {
    bucket = "cloudnativehub-terraform-state"
    key    = "cloudnativehub/terraform.tfstate"
    region = "ap-south-1"
  }
}
