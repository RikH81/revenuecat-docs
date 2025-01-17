import 'dart:io' show Platform;

//...

Future<void> initPlatformState() async {
  await Purchases.setDebugLogsEnabled(true);
  
  PurchasesConfiguration configuration;
  if (Platform.isAndroid) {
    configuration = PurchasesConfiguration(<public_google_sdk_key>);
    if (buildingForAmazon) { 
      // use your preferred way to determine if this build is for Amazon store
      // checkout our MagicWeather sample for a suggestion
      configuration = AmazonConfiguration(<public_amazon_sdk_key>);
    }
  } else if (Platform.isIOS) {
    configuration = PurchasesConfiguration(<public_ios_sdk_key>);
  }
  await Purchases.configure(configuration);
}