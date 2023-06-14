//
//  RCTCustomPaymentezModule.m
//  AppV2
//
//  Created by Crhistian David Vergara Gomez on 18/07/22.
//

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(CustomPaymentezModule, NSObject)

+ (BOOL)requiresMainQueueSetup
{
  return FALSE;
}

RCT_EXTERN_METHOD(
                  initializeSDK:
                    (BOOL *)isTestMode
                    clientAppCode:(NSString *)clientAppCode
                    clientAppKey:(NSString *)clientAppKey
                  )

RCT_EXTERN_METHOD(
                  addCard:
                      (NSDictionary *)user
                      card:(NSDictionary *)card
                      resolve:(RCTPromiseResolveBlock)resolve
                      reject:(RCTPromiseRejectBlock)reject
                )
@end
