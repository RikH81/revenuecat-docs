---
title: "Non-Subscription Purchases"
slug: "non-subscriptions"
excerpt: "Using RevenueCat beyond subscriptions"
hidden: false
metadata: 
  title: "Non-Subscription Purchases – RevenueCat"
  description: "Although RevenueCat is commonly used to handle complex subscription logic, all types of purchases, including consumables, are tracked by the Purchases SDK. This makes it easy to use RevenueCat’s powerful revenue reporting features to track all of the purchases your app supports."
  image: 
    0: "https://files.readme.io/ea5553d-60993e3c40039b67596bcc8c_slack-preview.png"
    1: "60993e3c40039b67596bcc8c_slack-preview.png"
    2: 1200
    3: 627
    4: "#f45476"
createdAt: "2020-06-04T17:15:44.078Z"
updatedAt: "2021-12-06T03:17:47.268Z"
---
Although RevenueCat is commonly used to handle complex subscription logic, all types of purchases, including consumables, are tracked by the Purchases SDK. This makes it easy to use RevenueCat’s powerful revenue reporting features to track all of the purchases your app supports.

There are a few things to note while using non-subscription IAPs with RevenueCat's Offerings and Entitlements features.

# Definitions

**Consumable** In-App Purchase: a purchase that unlocks content that can be "consumed," for example coins or gems in a game.

**Non-consumable** IAP: a purchase that permanently unlocks content, for example unlocking a specific coloring book in a coloring app.

**Non-renewing subscriptions**: a purchase that unlocks content for a specific period of time. For example, unlocking access to a magazine for 1 month, after which the subscription will not be renewed.

# Entitlements

Entitlements are used to unlock access to content after a user purchases a product tied to a specific entitlement. This means: if you add a consumable product to an entitlement, RevenueCat will report that entitlement as unlocked (forever), even after one purchase. This is because there is no expiration date for consumables, like there is for a subscription. This may work for some use-cases, but generally, you wouldn't add a consumable product to an entitlement meant to be unlocked by a subscription.
[block:callout]
{
  "type": "info",
  "body": "It's important to note that even if consumables aren't attached to an entitlement, they can still be purchased the same way as other offerings and packages. This will allow you to take advantage of RevenueCat's powerful revenue reporting features."
}
[/block]
If you wanted to add a **Lifetime Unlock** purchase option to your app, it is recommended to create a new **non-consumable** IAP, add the product to your offering, and add the product to your entitlement. This works well in many contexts, such as alongside other subscription packages, or just as a standalone package in your offering.

For more information, read our guide on [Entitlements](https://docs.revenuecat.com/docs/entitlements).

# Offerings

Offerings are typically associated with different subscription options, but they can be used to display any kind of in-app purchase.

## Example

Let's say we are building a game where we can offer multiple coin packages. First, we need to create a new offering called "coins." Go to your project settings in the RevenueCat dashboard, select the **Offerings** tab under **Product Setup**, and select the **+ New** button to add a new offering.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/59a55e0-Screen_Shot_2021-12-05_at_7.12.06_PM.png",
        "Screen Shot 2021-12-05 at 7.12.06 PM.png",
        1344,
        807,
        "#fafbfb"
      ],
      "sizing": "80",
      "border": true
    }
  ]
}
[/block]
Great! Select **Add**, and we're on to setting up packages.

Each package should contain a different quantity of coins. For our example, let's assume we'll offer the following options: 100 coins, 250 coins, 600 coins, and 1400 coins. Go ahead and add those packages, and your offering page should now look like the following:

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/d11bae4-Screen_Shot_2021-12-05_at_7.16.12_PM.png",
        "Screen Shot 2021-12-05 at 7.16.12 PM.png",
        1872,
        1074,
        "#fbfbfb"
      ],
      "sizing": "80",
      "border": true
    }
  ]
}
[/block]

[block:callout]
{
  "type": "info",
  "body": "If you haven't already, you'll need to set up products in the respective app stores on which you intend to ship your app. For more information on setting up products and adding them to RevenueCat, check out the [Configuring Products](https://docs.revenuecat.com/docs/entitlements#configuration) guide."
}
[/block]
Attach your products to each package, and you're ready to use to Purchases SDK to display your offering. On iOS, you could fetch the offering like this:

```swift
Purchases.shared.offerings { (offerings, error) in
	if let coinOffering = offerings?["coins"] {
		let packages = coinOffering.availablePackages
		// `packages` should contain each coin package with an identifier like 'coins-100'
	}
}
```

For more information displaying products, check out the [Displaying Products](doc:displaying-products) guide.

When you're ready to purchase one of the coin packages, pass the package object to the Purchases SDK, like the following:

```swift
Purchases.shared.purchasePackage(package) { (transaction, purchaserInfo, error, userCancelled)
	if let purchaserInfo = purchaserInfo, error == nil {
		// validate the purchase with your server, and display content
	}
}
```
[block:callout]
{
  "type": "warning",
  "body": "It's important to note that at the moment, logic for keeping track of consumable redemptions must be handled outside of RevenueCat. We recommend your server is set up to receive [Webhook](https://docs.revenuecat.com/docs/webhooks) events for `NON_RENEWING_PURCHASE` to appropriately provide consumable content for your users.\n\nFor example: RevenueCat can track a consumable coin purchase and include it in the `PurchaserInfo`, but cannot track if you've granted a user the appropriate number of coins for that purchase."
}
[/block]
For more information on making purchases, check out the [Making Purchases](doc:making-purchases) guide.

### Sales, alternative packages, and more

With this structure for Offerings, creating a sale offering is easy and can be accomplished in the same way as the above steps:

1. Create a new offering called **coins-sale**
2. Create new packages for the offering with appropriate coin identifiers
3. Create the sale IAPs in respective app stores
4. Fetch the new **coins-sale** offering from the Purchases SDK

## Conclusion

It's important to note that the above example is just that- an example. Your specific app may require a different implementation. This guide is meant as a way to understand the different ways you can use RevenueCat's powerful features for in-app purchases.