---
title: "Identifying Customers"
slug: "user-ids"
excerpt: "How RevenueCat handles user identity"
hidden: false
metadata: 
  title: "Identifying users – RevenueCat"
  description: "RevenueCat provides a source of truth for a subscriber's status across different platforms. To do this, each subscriber has an App User ID that uniquely identifies them within your application."
  image: 
    0: "https://files.readme.io/f9d72a3-RevenueCat_Docs_OG.png"
    1: "RevenueCat Docs OG.png"
    2: 1200
    3: 627
    4: "#f7f5f5"
createdAt: {}
updatedAt: "2022-11-07T20:24:22.689Z"
---
RevenueCat provides a source of truth for a subscriber's status across different platforms. To do this, each subscriber has an App User ID that uniquely identifies them within your application. 

User identity is one of the most important components of many mobile applications, and it's extra important to make sure the subscription status RevenueCat is tracking gets associated with the correct user.

The *Purchases SDK* allows you to specify your own user identifiers or use anonymous identifiers generated by RevenueCat. Some apps will use a combination of their own identifiers and RevenueCat anonymous IDs - that's okay!

# Anonymous App User IDs

If you don't provide an App User ID when instantiating the Purchases SDK, RevenueCat will generate a new random App User ID for you and cache it on the device. In the event that the user deletes and reinstalls the app, a new random App User ID will be generated.
[block:code]
{
  "codes": [
    {
      "code": "Purchases.configure(withAPIKey: \"my_api_key\")",
      "language": "swift"
    },
    {
      "code": "[RCPurchases configureWithAPIKey:@\"my_api_key\"];",
      "language": "objectivec"
    },
    {
      "code": "Purchases.configure(PurchasesConfiguration.Builder(this, \"api_key\").build())",
      "language": "kotlin"
    },
    {
      "code": "Purchases.configure(new PurchasesConfiguration.Builder(context, \"api_key\").build());",
      "language": "java"
    },
    {
      "code": "await Purchases.configure(PurchasesConfiguration(\"public_sdk_key\"));",
      "language": "javascript",
      "name": "Flutter"
    },
    {
      "code": "Purchases.configure({apiKey: \"public_sdk_key\"});",
      "language": "javascript",
      "name": "React Native"
    },
    {
      "code": "Purchases.setup(\"public_sdk_key\");",
      "language": "javascript",
      "name": "Cordova"
    },
    {
      "code": "// The SDK can be configured through the Unity Editor. \n// See Unity installation instructions https://docs.revenuecat.com/docs/unity\n\n// If you'd like to do it programmatically instead, \n// make sure to check \"Use runtime setup\" in the Editor and then: \n\nPurchases.PurchasesConfiguration.Builder builder = Purchases.PurchasesConfiguration.Builder.Init(\"api_key\");\nPurchases.PurchasesConfiguration purchasesConfiguration = builder.Build();\npurchases.Configure(purchasesConfiguration);",
      "language": "csharp",
      "name": "Unity"
    }
  ]
}
[/block]

[block:callout]
{
  "type": "info",
  "body": "Anonymous App User IDs are always prefixed with `$RCAnonymousID:` for SDK versions 3+. This can be useful for working with anonymous users on your server."
}
[/block]
# Logging In with a Custom App User ID

Setting your own App User ID will allow you to reference users in the RevenueCat dashboard, via the API, as well as in the [webhooks](doc:webhooks) and other integrations.

Using an externally managed App User ID also provides a mechanism by which to restore purchases in a few scenarios: 
* When a user deletes and reinstalls your app - using the same App User ID will ensure they still have access to subscriptions previously started without requiring a [restore](doc:restoring-purchases) .
* When the user logs in on multiple devices - you can honor a subscription that was purchased on one device across any other platform.
[block:callout]
{
  "type": "info",
  "title": "",
  "body": "App User IDs are case-sensitive."
}
[/block]
## Provide App User ID on configuration
[block:callout]
{
  "type": "danger",
  "title": "iOS 15+ Prewarming",
  "body": "In certain cases, iOS may [prewarm](https://developer.apple.com/documentation/uikit/app_and_environment/responding_to_the_launch_of_your_app/about_the_app_launch_sequence?language=objc) your app - this essentially means your app will be launched silently in the background to improve app launch times for your users.\n\nIf you are **not** using RevenueCat's anonymous IDs as described above, and are instead providing your own app user ID on configuration, **do not** call `configure` in `application:didFinishLaunchingWithOptions:`. Instead, call the `configure` method in your root view controller's initialization method."
}
[/block]
If you have your own App User IDs at app launch, you can pass those on instantiation to *Purchases*.
[block:code]
{
  "codes": [
    {
      "code": "Purchases.configure(withAPIKey: \"my_api_key\", appUserID: \"my_app_user_id\")",
      "language": "swift"
    },
    {
      "code": "[RCPurchases configureWithAPIKey:@\"my_api_key\" appUserID:@\"my_app_user_id\"];",
      "language": "objectivec"
    },
    {
      "code": "Purchases.configure(PurchasesConfiguration.Builder(this, \"api_key\").appUserID(\"my_app_user_id\").build())",
      "language": "kotlin"
    },
    {
      "code": "Purchases.configure(new PurchasesConfiguration.Builder(context, \"api_key\").appUserID(\"my_app_user_id\").build());",
      "language": "java"
    },
    {
      "code": "await Purchases.configure(\n    PurchasesConfiguration(\"public_sdk_key\")\n      ..appUserID = \"my_app_user_id\"\n);",
      "language": "javascript",
      "name": "Flutter"
    },
    {
      "code": "Purchases.configure({apiKey: \"public_sdk_key\", appUserID: \"my_app_user_id\"});",
      "language": "javascript",
      "name": "React Native"
    },
    {
      "code": "Purchases.setup(\"public_sdk_key\", \"my_app_user_id\");",
      "language": "javascript",
      "name": "Cordova"
    },
    {
      "code": "// The appUserID can be set through the Unity Editor. \n// See Unity installation instructions https://docs.revenuecat.com/docs/unity\n\n// If you'd like to do it programmatically instead, \n// make sure to check \"Use runtime setup\" in the Editor and then: \n\nPurchases.PurchasesConfiguration.Builder builder = Purchases.PurchasesConfiguration.Builder.Init(\"api_key\");\nPurchases.PurchasesConfiguration purchasesConfiguration =\n    builder.SetUserDefaultsSuiteName(\"user_default\")\n    .SetDangerousSettings(new Purchases.DangerousSettings(false))\n    .SetObserverMode(true)\n    .SetUseAmazon(false)\n    .SetAppUserId(appUserId)\n    .Build();\npurchases.Configure(purchasesConfiguration);",
      "language": "csharp",
      "name": "Unity"
    }
  ]
}
[/block]
Often times, you may not have your own App User IDs until later in the application lifecycle. In these cases, you can pass the App User ID  later through the `.logIn()` method.

## Provide App User ID after configuration

If your app doesn't receive its own App User ID until later in its lifecycle, you can set (or change) the App User ID at any time by calling `.logIn()`. If the logged in identity does not already exist in RevenueCat, it will be created automatically. 
[block:code]
{
  "codes": [
    {
      "code": "// Configure Purchases on app launch\nPurchases.configure(withAPIKey: \"my_api_key\")\n\n//...\n\n// Later log in provided user Id\nPurchases.shared.logIn(\"my_app_user_id\") { (customerInfo, created, error) in\n    // customerInfo updated for my_app_user_id\n}",
      "language": "swift"
    },
    {
      "code": "// Configure Purchases on app launch\n[RCPurchases configureWithAPIKey:@\"my_api_key\"];\n\n//...\n\n// Later log in provided user Id\n[[RCPurchases sharedPurchases] logIn:@\"my_app_user_id\" completion:^(RCCustomerInfo *customerInfo, BOOL created, NSError *error) {\n    // purchaserInfo updated for my_app_user_id\n}];",
      "language": "objectivec"
    },
    {
      "code": "// Configure Purchases on app launch\nPurchases.configure(PurchasesConfiguration.Builder(this, \"api_key\").build())\n  \n//...\n\n// Later log in provided user Id\nPurchases.sharedInstance.loginWith(\"my_app_user_id\", ::showError) { customerInfo, created ->\n  // customerInfo updated for my_app_user_id\n}",
      "language": "kotlin"
    },
    {
      "code": "// Configure Purchases on app launch\nPurchases.configure(new PurchasesConfiguration.Builder(context, \"api_key\").build());\n\n//...\n\n// Later log in provided user Id\nPurchases.getSharedInstance().logIn(\"my_app_user_id\", new LogInCallback() {\n\t@Override\n\tpublic void onReceived(@NotNull CustomerInfo customerInfo, boolean created) {\n\t\t// customerInfo updated for my_app_user_id\n\t}\n  \n  @Override\n  public void onError(@NotNull PurchasesError error) {\n\n  }\n});",
      "language": "java"
    },
    {
      "code": "// Configure Purchases on app launch\nawait Purchases.configure(PurchasesConfiguration(\"public_sdk_key\"));\n\n//...\n\n// Later log in provided user Id\nLogInResult result = await Purchases.logIn(\"my_app_user_id\");",
      "language": "javascript",
      "name": "Flutter"
    },
    {
      "code": "// Configure Purchases on app launch\nPurchases.configure({apiKey: \"public_sdk_key\"});\n\n//...\n\n// Later log in provided user Id\nconst { purchaserInfo, created } = await Purchases.logIn(\"my_app_user_id\");\n// purchaserInfo updated for my_app_user_id",
      "language": "javascript",
      "name": "React Native"
    },
    {
      "code": "// Configure Purchases on app launch\nPurchases.setup(\"public_sdk_key\");\n\n//...\n\n// Later log in provided user Id\n\nPurchases.logIn(\n  \"my_app_user_id\", \n  ({ customerInfo, created }) => {\n    // customerInfo updated for my_app_user_id\n  },\n  error => {\n  }\n);",
      "language": "javascript",
      "name": "Cordova"
    },
    {
      "code": "// configure the SDK either through the Editor or through \n// programmatic setup (see section above), then:\n\n\nvar purchases = GetComponent<Purchases>();\npurchases.LogIn(\"myAppUserUD\", (customerInfo, created, error) =>\n{\n    if (error != null)\n    {\n        // show error\n    }\n    else\n    {\n        // show customerInfo\n    }\n});",
      "language": "csharp",
      "name": "Unity"
    }
  ]
}
[/block]
#### `logIn()` method alias behavior

When going from an Anonymous ID to a custom App User ID RevenueCat will decide whether the identities should be merged (aliased) into the same <<glossary:CustomerInfo>> object or not depending on the state of the custom App User ID and if it already has an anonymous alias.

[block:parameters]
{
  "data": {
    "h-0": "Current App User ID",
    "h-1": "Provided App User ID already exists?",
    "h-2": "Provided App User ID has anonymous alias?",
    "0-0": "Anonymous",
    "0-1": "No",
    "1-1": "Yes",
    "1-0": "Anonymous",
    "3-0": "Non-anonymous",
    "3-1": "Any",
    "0-2": "N/A",
    "3-2": "Any",
    "1-2": "No",
    "h-3": "Result",
    "0-3": "Anonymous ID is aliased with Provided ID, CustomerInfo merged.",
    "1-3": "Anonymous ID is aliased with Provided ID, CustomerInfo merged.",
    "2-0": "Anonymous",
    "3-3": "CustomerInfo changes to Provided ID, no aliases created.",
    "2-1": "Yes",
    "2-2": "Yes",
    "2-3": "CustomerInfo changes to Provided ID, no aliases created."
  },
  "cols": 4,
  "rows": 4
}
[/block]
# Logging Out

When an identified user logs out you should call the `logOut()` method - this generates a new Anonymous App User ID for the logged out state.

## Logging back in

To log in a new user, the provided App User ID should be set again with `.logIn()`.

## Switching accounts

If you need to switch from one provided App User ID to another, it's okay to call the `.logIn()` method directly - you do not need to call `logOut()` first.

# Sharing Subscriptions Across Apps and Platforms

Apps within the same RevenueCat [Project](doc:projects) share the same App User ID namespace, which means that they also share subscriptions. A user logged in to the same user ID in different apps of the same Project will have access to the same entitlements. This allows sharing of subscription status between different apps, even on different platforms. 

Note that anonymous App User IDs are not able to share subscription status across apps and platforms, so you'll need to identify with a custom App User ID via your own authentication system.
[block:callout]
{
  "type": "info",
  "body": "A user can only [manage their subscription](doc:managing-subscriptions) on the platform it was purchased from.",
  "title": "Managing Subscriptions"
}
[/block]
# Tips for Setting App User IDs
[block:parameters]
{
  "data": {
    "h-0": "ℹ️ App User IDs Should Not Be Guessable",
    "0-0": "RevenueCat provides subscription status via the public API, having App User IDs that are easily guessed is not good. It is recommended to use a non-guessable pseudo-random ID."
  },
  "cols": 1,
  "rows": 1
}
[/block]

[block:parameters]
{
  "data": {
    "h-0": "ℹ️ Keep App User IDs shorter than 100 characters",
    "0-0": "App User IDs should not be longer than 100 characters."
  },
  "cols": 1,
  "rows": 1
}
[/block]

[block:parameters]
{
  "data": {
    "h-0": "⚠️ Don't set emails as App User IDs",
    "0-0": "For the above reasons about guessability, and GDPR compliance, we don't recommend using email addresses as App User IDs"
  },
  "cols": 1,
  "rows": 1
}
[/block]

[block:parameters]
{
  "data": {
    "h-0": "⚠️ Don't set IDFA as App User IDs",
    "0-0": "Advertising identifiers should not be used as App User IDs since they can be easily rotated and are not unique across users if limit ad tracking is enabled."
  },
  "cols": 1,
  "rows": 1
}
[/block]

[block:parameters]
{
  "data": {
    "h-0": "🚨 Don't hardcode strings as App User IDs",
    "0-0": "You should never hardcode a string as an App User ID, since every install will be treated as the same user in RevenueCat. **This will create problems and could unlock entitlements for users that haven't actually purchased.**\n\n**Every app user ID must be unique per user.** If you don't have your own user IDs for some of your users, you should not pass any value for the App User ID on configuration which will rely on the anonymous IDs created by RevenueCat."
  },
  "cols": 1,
  "rows": 1
}
[/block]

[block:parameters]
{
  "data": {
    "h-0": "🚨 Don't use blocked App User IDs",
    "0-0": "Certain App User IDs are blocked in RevenueCat. This is by design to help developers that may be unintentionally passing non-unique strings as user identifiers. The current block-list is:\n`'no_user'`, `'null'`, `'none'`, `'nil'`, `'(null)'`, `'\\x00'`(`NULL` character), `''`(empty string), `'unidentified'`, `'undefined'`, `'unknown'`, `'anonymous'`, and `'guest'`."
  },
  "cols": 1,
  "rows": 1
}
[/block]
# Next Steps

* Enrich your app by [reacting to the user's current subscription status :fa-arrow-right:](doc:purchaserinfo)
* If you're moving to RevenueCat from another system, see our guide on [migrating your existing subscriptions :fa-arrow-right:](doc:migrating-existing-subscriptions)
* Once you're ready to test your integration, you can follow our guides on [testing and debugging :fa-arrow-right:](doc:debugging)