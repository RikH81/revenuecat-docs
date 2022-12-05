---
title: "Subscription Status"
slug: "purchaserinfo"
excerpt: "Determining the subscription status for a user."
hidden: false
createdAt: "2019-08-15T21:15:19.421Z"
updatedAt: "2019-09-04T01:22:09.112Z"
---
RevenueCat makes it easy to determine subscription status and more with the *Purchases SDK* and [REST API](https://docs.revenuecat.com/reference). 
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/8aa5ecd-Screen_Shot_2019-08-19_at_8.44.10_AM.png",
        "Screen Shot 2019-08-19 at 8.44.10 AM.png",
        509,
        844,
        "#e6dfde"
      ]
    }
  ]
}
[/block]

[block:api-header]
{
  "title": "Get User Information"
}
[/block]
The `PurchaserInfo` object contains all of the purchase and subscription data available about the user. This object is updated whenever a purchase or restore occurs and periodically throughout the lifecycle of your app. The latest information can always be retrieved by calling `getPurchaserInfo()`:
[block:code]
{
  "codes": [
    {
      "code": "Purchases.shared.purchaserInfo { (purchaserInfo, error) in\n    // access latest purchaserInfo\n}",
      "language": "swift"
    },
    {
      "code": "[[RCPurchases sharedPurchases] purchaserInfoWithCompletionBlock:^(RCPurchaserInfo * purchaserInfo, NSError * error) {\n     // access latest purchaserInfo\n}];",
      "language": "objectivec"
    },
    {
      "code": "Purchases.sharedInstance.getPurchaserInfoWith({ error -> /* Optional error handling */ }) { purchaserInfo ->\n  // access latest purchaserInfo\n}",
      "language": "kotlin"
    },
    {
      "code": "Purchases.getSharedInstance().getPurchaserInfo(new ReceivePurchaserInfoListener() {\n  @Override\n  public void onReceived(@NonNull PurchaserInfo purchaserInfo) {\n    // access latest purchaserInfo\n  }\n  \n  @Override\n  public void onError(@NonNull PurchasesError error) {\n\n  }\n});",
      "language": "java"
    },
    {
      "code": "try {\n  const purchaserInfo = await Purchases.getPurchaserInfo();\n  // access latest purchaserInfo\n} catch (e) {\n // Error fetching purchaser info\n}",
      "language": "javascript",
      "name": "React Native"
    },
    {
      "code": "Purchases.getPurchaserInfo(\n  info => {\n    // access latest purchaserInfo\n  },\n  error => {\n    // Error fetching purchaser info\n  }\n);",
      "language": "javascript",
      "name": "Cordova"
    },
    {
      "code": "try {\n  PurchaserInfo purchaserInfo = await Purchases.getPurchaserInfo();\n  // access latest purchaserInfo\n} on PlatformException catch (e) {\n  // Error fetching purchaser info\n}",
      "language": "javascript",
      "name": "Flutter"
    }
  ]
}
[/block]
It's safe to call `getPurchaserInfo()` frequently throughout your app. Since the *Purchases SDK* updates and caches the latest `PurchaserInfo` when the app becomes active, the completion block won't need to make a network request in most cases. 

The `PurchaserInfo` object gives you access to the following information about a user:
[block:parameters]
{
  "data": {
    "h-0": "Name",
    "h-1": "Description",
    "7-0": "Entitlements",
    "7-1": "`EntitlementInfo` objects that contain information about the user's entitlements, such as subscription state. See more [below](doc:purchaserinfo#section-get-entitlement-information).",
    "1-0": "Original App User Id",
    "1-1": "The original app user id recorded for this user. May be the same as their current app user id. See our [guide on user ids](doc:user-ids) for more information.",
    "2-0": "First Seen",
    "2-1": "The date this user was first seen in RevenueCat. This is the install date in most cases",
    "0-0": "Request Date",
    "0-1": "The server date when the current `PurchaserInfo` object was fetched. This should be used for date comparison operators instead of relying on the device time.",
    "6-0": "Active Subscriptions",
    "6-1": "An array of subscription product identifiers that are active. You should be using [entitlement](doc:entitlements) though.",
    "3-0": "Original Application Version",
    "3-1": "The version number for the first version of the app this user downloaded. Will be `nil` unless a receipt has been recorded for the user through a purchase, restore, or import.",
    "4-0": "All Purchased Product Identifiers",
    "4-1": "An array of product identifiers purchased by the user regardless of expiration.",
    "5-0": "Non Consumable Purchases",
    "5-1": "An array of all the non-consumable product identifiers purchased by the user."
  },
  "cols": 2,
  "rows": 8
}
[/block]

[block:api-header]
{
  "title": "Get Entitlement Information"
}
[/block]
The `EntitlementInfo` object gives you access to all of the information about the status of a users entitlements.
[block:parameters]
{
  "data": {
    "h-0": "Name",
    "h-1": "Description",
    "0-0": "Identifier",
    "0-1": "The entitlement identifier configured in the RevenueCat dashboard.",
    "2-0": "Is Active",
    "2-1": "Whether or not the user has access to this entitlement.",
    "3-0": "Will Renew",
    "3-1": "Whether or not the entitlement is set to renew at the end of the current period. \n\nNote there may be a multiple hour delay between the value of this property and the actual state in the App Store / Play Store.",
    "4-0": "Period Type",
    "4-1": "The period type this entitlement is in, can be one of:\n- Trial: In a free trial period\n- Intro: In an introductory price period\n- Normal: In the default period",
    "5-0": "Latest Purchase Date",
    "5-1": "The latest purchase or renewal date for this entitlement.",
    "6-0": "Original Purchase Date",
    "6-1": "The first date this entitlement was purchased. May be the same as the latest purchase date.",
    "7-0": "Expiration Date",
    "7-1": "The expiration date for the entitlement, can be null for lifetime access. If the period type is trial then this is the trial expiration date.",
    "8-0": "Store",
    "8-1": "The store that unlocked this entitlement, can be one of:\n- App Store\n- Mac App Store\n- Play Store\n- Stripe\n- Promotional (RevenueCat)",
    "1-0": "Product Identifier",
    "1-1": "The underlying product identifier that unlocked this entitlement.",
    "9-0": "Is Sandbox",
    "9-1": "Whether this entitlement was unlocked from a sandbox or production purchase.",
    "10-0": "Unsubscribe Detected At",
    "10-1": "The date an unsubscribe was detected. An unsubscribe **does not** mean that the entitlement is inactive.\n\n\nNote there may be a multiple hour delay between the value of this property and the actual state in the App Store / Play Store.",
    "11-0": "Billing Issue Detected At",
    "11-1": "The date a billing issue was detected, will be null again once billing issue resolved. A billing issue **does not** mean that the entitlement is inactive.\n\n\nNote there may be a multiple hour delay between the value of this property and the actual state in the App Store / Play Store."
  },
  "cols": 2,
  "rows": 12
}
[/block]

[block:api-header]
{
  "title": "Checking If A User Is Subscribed"
}
[/block]
The subscription status for a user can easily be determined with the `PurchaserInfo` and `EntitlementInfo` objects.

For most apps that only have one entitlement, the `isActive` status can be quickly checked for your entitlement Id. 
[block:code]
{
  "codes": [
    {
      "code": "if purchaserInfo.entitlements[\"your_entitlement_id\"]?.isActive == true {\n  // user has access to \"your_entitlement_id\"                \n}",
      "language": "swift"
    },
    {
      "code": "if (purchaserInfo.entitlements[@\"your_entitlement_id\"].isActive) {\n  // user has access to \"your_entitlement_id\"\n}",
      "language": "objectivec"
    },
    {
      "code": "if (purchaserInfo.entitlements[\"your_entitlement_id\"]?.isActive == true) {\n\t// user has access to \"your_entitlement_id\"                \n}",
      "language": "kotlin"
    },
    {
      "code": "if (purchaserInfo.getEntitlements().get(\"your_entitlement_id\").isActive()) {\n\t// user has access to \"your_entitlement_id\"\n}",
      "language": "java"
    },
    {
      "code": "if(typeof purchaserInfo.entitlements.active.your_entitlement_id !== \"undefined\") {\n\t// user has access to \"your_entitlement_id\"\n}",
      "language": "javascript",
      "name": "React Native"
    },
    {
      "code": "if(typeof purchaserInfo.entitlements.active.your_entitlement_id !== \"undefined\") {\n\t// user has access to \"your_entitlement_id\"\n}",
      "language": "javascript",
      "name": "Cordova"
    },
    {
      "code": "if (purchaserInfo.entitlements.all[\"your_entitlement_id\"].isActive) {\n  // user has access to \"your_entitlement_id\"\n}",
      "language": "javascript",
      "name": "Flutter"
    }
  ]
}
[/block]
If your app has multiple entitlements and you need to check if a user is subscribed to at least one you can also check for the entitlement Id in the `active` dictionary of `EntitlementInfo` objects.
[block:code]
{
  "codes": [
    {
      "code": "if !purchaserInfo.entitlements.active.isEmpty {\n    //user has access to some entitlement\n}",
      "language": "swift"
    },
    {
      "code": "if ([purchaserInfo.entitlements.active count] > 0) {\n    //user has access to some entitlement\n}",
      "language": "objectivec"
    },
    {
      "code": "if (purchaserInfo.entitlements.active.isNotEmpty()) {\n  //user has access to some entitlement\n}",
      "language": "kotlin"
    },
    {
      "code": "if (!purchaserInfo.getEntitlements().getActive().isEmpty()) {\n\t//user has access to some entitlement\n}",
      "language": "java"
    },
    {
      "code": "if(typeof purchaserInfo.entitlements.active.your_entitlement_id !== \"undefined\") {\n\t// user has access to \"your_entitlement_id\"\n}",
      "language": "javascript",
      "name": "React Native"
    },
    {
      "code": "if(typeof purchaserInfo.entitlements.active.your_entitlement_id !== \"undefined\") {\n\t// user has access to \"your_entitlement_id\"\n}",
      "language": "javascript",
      "name": "Cordova"
    },
    {
      "code": "if (!purchaserInfo.entitlements.active.isEmpty) {\n\t//user has access to some entitlement\n}",
      "language": "javascript",
      "name": "Flutter"
    }
  ]
}
[/block]

[block:api-header]
{
  "title": "Web Apps"
}
[/block]
If you also have a web app, or need to get a user's subscription status from outside of the *Purchases SDK*, you should use the REST API. You can read the full API reference [here](https://docs.revenuecat.com/reference).
[block:code]
{
  "codes": [
    {
      "code": "curl --request GET \\\n  --url https://api.revenuecat.com/v1/subscribers/app_user_id \\\n  --header 'content-type: application/json'",
      "language": "curl"
    }
  ]
}
[/block]

[block:api-header]
{
  "title": "Next Steps"
}
[/block]
* Once you're ready to test your integration, you can follow our guides on [testing and debugging :fa-arrow-right:](doc:debugging)