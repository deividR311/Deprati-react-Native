//
//  Paymentez.swift
//  AppV2
//
//  Created by Crhistian David Vergara Gomez on 18/07/22.
//

import Foundation
//import PaymentSDK
import Accelerate

@objc(CustomPaymentezModule)
class CustomPaymentezModule: NSObject, RCTBridgeModule {

  @objc
  static func moduleName() -> String! {
    return "CustomPaymentezModule"
  }

  @objc
  static func requiresMainQueueSetup() -> Bool {
      return false
  }

  @objc
  func initializeSDK(
    _ isTestMode: Bool,
    clientAppCode: String,
    clientAppKey: String)
  {
    //PaymentSDKClient.setEnvironment(clientAppCode, secretKey: clientAppKey, testMode:isTestMode)
  }

  @objc
  func addCard(
    _ user:[String: Any],
    card:[String: Any],
    resolve: @escaping RCTPromiseResolveBlock,
    reject: @escaping RCTPromiseRejectBlock
  ){

    guard
      let uid = user["uid"] as? String,
      let email = user["email"] as? String,
      let cardHolder = card["cardHolder"] as? String,
      let cardNumber = card["cardNumber"] as? String,
      let cvc = card["cvc"] as? String,
      let expiryMonth = card["expMonth"] as? Int,
      let expiryYear = card["expYear"] as? Int
    else {
      let error = NSError(
        domain: "missing_arguments", code: 0,
        userInfo: [
          "user":user,
          "card": card
        ])
      reject("missing_arguments", "Has missing parameters.", error)
      return
    }

     /* PaymentCard.validate(cardNumber: cardNumber) {
      cardType, cardImageUrl, cvvLength, maskString, showOtp in

      guard let cardToSave = PaymentCard.createCard(
        cardHolder: cardHolder,
        cardNumber: cardNumber,
        expiryMonth: expiryMonth,
        expiryYear: expiryYear,
        cvc: cvc
      )
      else {
        let error = NSError(
          domain: "undefined_card", code: 1,
          userInfo: [
            "user": user,
            "card": card,
            "stage": "cardToSave"
          ])
        reject("undefined_card", "The values to verify card are invalid.", error)
        return
      }

      cardToSave.cardType = cardType
      cardToSave.bin = cardNumber.prefix(6).lowercased()

     
     PaymentSDKClient
        .add(cardToSave, uid: uid, email: email) {
          (error, cardAdded) in
  
          if let error = error {
            let userInfo: [String : Any] = [
              "error_type": error.type ?? "",
              "help": error.help ?? "",
              "description": error.descriptionData
            ]
            let _error = NSError(
              domain: "paymentez_error", code: 3,
              userInfo: userInfo
            )
            reject("paymentez_error", "Error in paymentez gateway.", _error)
            return
          }
  
          guard let cardAdded = cardAdded else {
            let error = NSError(
              domain: "undefined_card", code: 1,
              userInfo: [
                "user":user,
                "card": card,
                "stage": "cardAdded"
              ])
            reject("undefined_card", "The values to verify card are invalid.", error)
            return
          }
  
          let CARD_VALID_STATUSES = ["valid", "review", "pending"]
          if( !CARD_VALID_STATUSES.contains(cardAdded.status ?? "") ){

            let userInfo: [String : Any] = [
              "error_type": cardAdded.status ?? "",
              "help": "",
              "description": cardAdded.msg ?? ""
            ]
            let error = NSError(
              domain: "paymentez_error", code: 3,
              userInfo: userInfo
            )
            reject("paymentez_error", "The card status is not allow.", error)
            return
          }
  
          let userInfo: [String: Any?] = [
            "status":  cardAdded.status,
            "token":  cardAdded.token,
            "transaction_reference":  cardAdded.transactionId,
            "bin":  cardAdded.bin,
            "type":  cardAdded.type
          ]
          resolve(userInfo)
        }
    }  */
  } 
}
