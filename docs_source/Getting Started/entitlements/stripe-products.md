---
title: Stripe Product Setup
slug: stripe-products
excerpt: Setting up products in the Stripe Dashboard
hidden: false
---
To set up products for Stripe, start by logging into the Stripe Dashboard. This guide assumes basic knowledge of Stripe and the Stripe Dashboard. For more information, visit Stripe's [documentation and guides for the Dashboard](https://stripe.com/docs/dashboard).

# Create a new Product

To create a new product, click on products in the sidebar of the Stripe Dashboard, then click **Add Product**.
![](https://files.readme.io/d29e8f9-Screen_Shot_2020-06-26_at_12.53.37_PM.png "Screen_Shot_2020-06-26_at_12.53.37_PM.png")

![](https://files.readme.io/8a94be7-Screen_Shot_2020-06-26_at_12.53.57_PM.png "Screen_Shot_2020-06-26_at_12.53.57_PM.png")
Enter details about the product, including name and price information, and click 'Save'.
![](https://files.readme.io/4426cb9-Screen_Shot_2020-07-01_at_3.59.51_PM.png "Screen_Shot_2020-07-01_at_3.59.51_PM.png")
The ID of the new product is a unique identifier that is automatically generated by Stripe, prefixed with `prod_`. This is the identifier that you'll need later to [setup products in RevenueCat](doc:entitlements).
[block:callout]
{
  "type": "warning",
  "title": "Important",
  "body": "Only **Package Pricing** and **Standard Pricing** subscription plans with **per unit** pricing are supported. Metered usage and tiers are currently not supported."
}
[/block]
# Integrate with RevenueCat

If you're ready to integrate your new Stripe product with RevenueCat, continue our [product setup guide :fa-arrow-right:](doc:entitlements).