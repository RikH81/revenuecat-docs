---
title: "Account Security"
slug: "security"
excerpt: "Enabling two-factor authentication for your RevenueCat account"
hidden: false
metadata: 
  title: "Two-factor authentication | RevenueCat"
  description: "You can make things a little bit safer by enabling two-factor authentication in your RevenueCat account settings. Once you do, you'll need a code generated on your mobile device any time you log in to your RevenueCat account."
  image: 
    0: "https://files.readme.io/671d56e-Reddit__E.jpg"
    1: "Reddit – E.jpg"
    2: 1200
    3: 630
    4: "#fbabaf"
createdAt: "2019-12-20T21:05:57.489Z"
updatedAt: "2021-12-22T16:37:46.880Z"
---
It's a dangerous world out there! But you can make things a little bit safer by enabling two-factor authentication in your RevenueCat account settings.

Once you do, you'll need a code generated on your mobile device any time you log in to your RevenueCat account. 
[block:api-header]
{
  "title": "Enabling Two-Factor Authentication"
}
[/block]
##Step 1 - Set up
Navigate to your [**Account > Security**](https://app.revenuecat.com/settings/security) settings in the RevenueCat dashboard and click **Set up** under Two-factor Authentication to begin the setup process.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/f10a2a5-Screen_Shot_2019-12-20_at_1.08.08_PM.png",
        "Screen Shot 2019-12-20 at 1.08.08 PM.png",
        840,
        636,
        "#f5f6f6"
      ]
    }
  ]
}
[/block]
## Step 2 - Scan barcode
You'll be prompted to re-enter your password. Once re-authenticated you'll be presented with a QR code that you should scan with an authenticator app such as [Authy](https://authy.com/features/setup/) or [Google Authenticator](https://apps.apple.com/app/id388497605).  

## Step 3 - Enter two-factor code
Enter the two-factor code from the authenticator app then click **Enable**.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/7ef38f8-Screen_Shot_2021-12-22_at_8.34.27_AM.png",
        "Screen Shot 2021-12-22 at 8.34.27 AM.png",
        539,
        534,
        "#e9e8e7"
      ]
    }
  ]
}
[/block]
##Step 4 - Save recovery codes
Save your recovery codes. You'll only be shown these codes once, and are required if you ever lose access to your authenticator app. Some authenticator apps, like Authy, also provide their own backups in case you lose your phone.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/2d3f2f0-Screen_Shot_2019-12-20_at_1.19.27_PM.png",
        "Screen Shot 2019-12-20 at 1.19.27 PM.png",
        512,
        347,
        "#dfe5ea"
      ]
    }
  ]
}
[/block]

[block:callout]
{
  "type": "danger",
  "title": "Save recovery codes in a safe place",
  "body": "If you ever lose access to your two-factor code from your authenticator app (e.g. you got a new phone) the recovery codes are required to access RevenueCat.\n\nFor security reasons, RevenueCat Support may not be able to restore access to accounts with two-factor authentication enabled if you lose your two-factor authentication credentials or lose access to your account recovery codes."
}
[/block]

[block:api-header]
{
  "title": "Disabling Two-Factor Authentication"
}
[/block]
To disable two-factor authentication vavigate to your [**Account > Security**](https://app.revenuecat.com/settings/security) settings in the RevenueCat dashboard and click **Disable** under Two-factor Authentication.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/01715b0-Screen_Shot_2019-12-20_at_1.23.07_PM.png",
        "Screen Shot 2019-12-20 at 1.23.07 PM.png",
        763,
        228,
        "#f6f5f5"
      ]
    }
  ]
}
[/block]

[block:api-header]
{
  "title": "Audit Two-Factor Setup"
}
[/block]
If you have invited collaborators to your app, you can check if they've enabled two-factor authentication for their account under the [Collaborators view](doc:collaborators) .