#import "AppDelegate.h"
#import "RCTLinkingManager.h"
#import <RNGoogleSignin/RNGoogleSignin.h>
#import <React/RCTBridge.h>
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import <GoogleMaps/GoogleMaps.h>
#import <RNGoogleSignin/RNGoogleSignin.h>
#import <FBSDKCoreKit/FBSDKCoreKit.h>
#import <FBSDKLoginKit/FBSDKLoginKit.h>
#import <EmarsysSDK/Emarsys.h>
#import <EmarsysSDK/EMSConfig.h>
#import "ReactNativeConfig.h"
#import "RNFBMessagingModule.h"
#import <Firebase.h>
@import FirebaseCore;
#import <AppCenterReactNative.h>
#import <AppCenterReactNativeAnalytics.h>
#import <AppCenterReactNativeCrashes.h>

#ifdef FB_SONARKIT_ENABLED
  #import <FlipperKit/FlipperClient.h>
  #import <FlipperKitLayoutPlugin/FlipperKitLayoutPlugin.h>
  #import <FlipperKitUserDefaultsPlugin/FKUserDefaultsPlugin.h>
  #import <FlipperKitNetworkPlugin/FlipperKitNetworkPlugin.h>
  #import <SKIOSNetworkPlugin/SKIOSNetworkAdapter.h>
  #import <FlipperKitReactPlugin/FlipperKitReactPlugin.h>
  static void InitializeFlipper(UIApplication *application) {
    FlipperClient *client = [FlipperClient sharedClient];
    SKDescriptorMapper *layoutDescriptorMapper = [[SKDescriptorMapper alloc] initWithDefaults];
    [client addPlugin:[[FlipperKitLayoutPlugin alloc] initWithRootNode:application withDescriptorMapper:layoutDescriptorMapper]];
    [client addPlugin:[[FKUserDefaultsPlugin alloc] initWithSuiteName:nil]];
    [client addPlugin:[FlipperKitReactPlugin new]];
    [client addPlugin:[[FlipperKitNetworkPlugin alloc] initWithNetworkAdapter:[SKIOSNetworkAdapter new]]];
    [client start];
  }
#endif

static void ClearKeychainIfNecessary() {
    // Checks wether or not this is the first time the app is run
    if ([[NSUserDefaults standardUserDefaults] boolForKey:@"HAS_RUN_BEFORE"] == NO) {
        // Set the appropriate value so we don't clear next time the app is launched
        [[NSUserDefaults standardUserDefaults] setBool:YES forKey:@"HAS_RUN_BEFORE"];

        NSArray *secItemClasses = @[
            (__bridge id)kSecClassGenericPassword,
            //(__bridge id)kSecClassInternetPassword,
            //(__bridge id)kSecClassCertificate,
            //(__bridge id)kSecClassKey,
            //(__bridge id)kSecClassIdentity
        ];

        // Maps through all Keychain classes and deletes all items that match
        for (id secItemClass in secItemClasses) {
            NSDictionary *spec = @{(__bridge id)kSecClass: secItemClass};
            SecItemDelete((__bridge CFDictionaryRef)spec);
        }
    }
}

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
   NSString *keyMap = [ReactNativeConfig envFor:@"GOOGLE_MAPS_KEY"];
   [GMSServices provideAPIKey:keyMap];
   [[FBSDKApplicationDelegate sharedInstance] application:application didFinishLaunchingWithOptions:launchOptions];

  [AppCenterReactNative register];
  [AppCenterReactNativeAnalytics registerWithInitiallyEnabled:true];
  [AppCenterReactNativeCrashes registerWithAutomaticProcessing];

  #ifdef FB_SONARKIT_ENABLED
    InitializeFlipper(application);
  #endif

  NSString *emAppCode = [ReactNativeConfig envFor:@"EMARSYS_APPLICATION_CODE"];
  NSString *emMeID = [ReactNativeConfig envFor:@"EMARSYS_MERCHANTID"];
  EMSConfig *config = [EMSConfig makeWithBuilder:^(EMSConfigBuilder * builder) {
    [builder setMobileEngageApplicationCode:emAppCode];
    [builder setMerchantId:emMeID];
  }];

  [Emarsys setupWithConfig:config];

  ClearKeychainIfNecessary();
 
  RCTBridge *bridge = [[RCTBridge alloc] initWithDelegate:self launchOptions:launchOptions];
  // RCTRootView *rootView = [[RCTRootView alloc] initWithBridge:bridge
  //                                                  moduleName:@"AppV2"
  //                                           initialProperties:nil];

  NSDictionary *appProperties = [RNFBMessagingModule addCustomPropsToUserProps:nil withLaunchOptions:launchOptions];
  RCTRootView *rootView = [[RCTRootView alloc] initWithBridge:bridge
                                             moduleName:@"AppV2"
                                            initialProperties:appProperties];

  if (@available(iOS 13.0, *)) {
      rootView.backgroundColor = [UIColor systemBackgroundColor];
  } else {
      rootView.backgroundColor = [UIColor whiteColor];
  }

  [FIRApp configure];
  [FIRMessaging messaging].delegate = self;

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  return YES;
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

- (BOOL)application:(UIApplication *)application 
            openURL:(nonnull NSURL *)url
            options:(nonnull NSDictionary<NSString *,id> *)options {
  return [[FBSDKApplicationDelegate sharedInstance] application:application openURL:url options:options]
  || [RNGoogleSignin application:application openURL:url options:options] || [RCTLinkingManager application:application openURL:url options:options];
}

- (BOOL)application:(UIApplication *)application continueUserActivity:(nonnull NSUserActivity *)userActivity
 restorationHandler:(nonnull void (^)(NSArray<id<UIUserActivityRestoring>> * _Nullable))restorationHandler
{
 return [RCTLinkingManager application:application
                  continueUserActivity:userActivity
                    restorationHandler:restorationHandler];
}

- (void)messaging:(FIRMessaging *)messaging didReceiveRegistrationToken:(NSString *)fcmToken {
    NSLog(@"FCM registration token: %@", fcmToken);
    // Notify about received token.
    NSDictionary *dataDict = [NSDictionary dictionaryWithObject:fcmToken forKey:@"token"];
    [[NSNotificationCenter defaultCenter] postNotificationName:
     @"FCMToken" object:nil userInfo:dataDict];
    // TODO: If necessary send token to application server.
    // Note: This callback is fired at each app startup and whenever a new token is generated.
}

- (void)userNotificationCenter:(UNUserNotificationCenter *)center
       willPresentNotification:(UNNotification *)notification
         withCompletionHandler:(void (^)(UNNotificationPresentationOptions))completionHandler {
  NSDictionary *userInfo = notification.request.content.userInfo;

  [[FIRMessaging messaging] appDidReceiveMessage:userInfo];

  // Change this to your preferred presentation option
  completionHandler(UNNotificationPresentationOptionBadge | UNNotificationPresentationOptionAlert);
}

- (void)userNotificationCenter:(UNUserNotificationCenter *)center
didReceiveNotificationResponse:(UNNotificationResponse *)response
         withCompletionHandler:(void(^)(void))completionHandler {
  NSDictionary *userInfo = response.notification.request.content.userInfo;

  [[FIRMessaging messaging] appDidReceiveMessage:userInfo];
  NSLog(@">>> didReceiveNotificationResponse Receive Notification...");
  completionHandler();
}

- (void)application:(UIApplication *)application
didReceiveRemoteNotification:(NSDictionary *)userInfo
fetchCompletionHandler:(void (^)(UIBackgroundFetchResult result))completionHandler {
  [[FIRMessaging messaging] appDidReceiveMessage:userInfo];
  NSLog(@">>> didReceiveRemoteNotification Receive Notification...");
  completionHandler(UIBackgroundFetchResultNoData);
}

@end
