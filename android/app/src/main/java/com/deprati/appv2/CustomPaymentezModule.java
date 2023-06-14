package com.deprati.appv2;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;
import com.paymentez.android.Paymentez;
import com.facebook.react.bridge.Promise;
import com.paymentez.android.model.Card;
import com.paymentez.android.rest.PaymentezClient;
import com.paymentez.android.rest.TokenCallback;
import com.paymentez.android.rest.model.PaymentezError;
import com.paymentez.android.util.CardUtils;
import com.paymentez.android.util.PaymentezUtils;

import android.graphics.BitmapFactory;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuItem;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.HashMap;

import kotlin.jvm.Throws;

public class CustomPaymentezModule extends ReactContextBaseJavaModule {
    CustomPaymentezModule(ReactApplicationContext context) {
        super(context);
    }

    @Override
    public String getName() {
        return "CustomPaymentezModule";
    }

    @ReactMethod
    public void initializeSDK(boolean environment, String client_app_code, String client_app_key) {
        Paymentez.setEnvironment(environment, client_app_code, client_app_key);
    }

    @ReactMethod
    public void addCard(ReadableMap user, ReadableMap card, Promise promise) {
        WritableMap userInfo = Arguments.createMap();
        Bundle userBundle = Arguments.toBundle(user);
        Bundle cardBundle = Arguments.toBundle(card);
        WritableMap userMap = Arguments.fromBundle(userBundle);
        WritableMap cardMap = Arguments.fromBundle(cardBundle);
        userInfo.putMap("user", userMap);
        userInfo.putMap("card", cardMap);
        try {
            if (
                    !user.hasKey("uid") ||
                            !user.hasKey("email") ||
                            !user.hasKey("uid") ||
                            !card.hasKey("cardNumber") ||
                            !card.hasKey("expMonth") ||
                            !card.hasKey("expYear") ||
                            !card.hasKey("cvc") ||
                            !card.hasKey("cardHolder")
            ) {
                promise.reject(
                    "missing_arguments",
                    "Has missing parameters.",
                    userInfo
                );
                return;
            }
            String uid = user.getString("uid");
            String email = user.getString("email");
            Card cardToSave = new Card(
                card.getString("cardNumber"),
                card.getInt("expMonth"),
                card.getInt("expYear"),
                card.getString("cvc"),
                card.getString("cardHolder")
            );

            Paymentez
                    .addCard(
                            this.getCurrentActivity().getApplicationContext(),
                            uid,
                            email,
                            cardToSave,
                            new TokenCallback() {
                                public void onSuccess(Card _card) {
                                    if (_card.equals(null)) {
                                        promise.reject(
                                                "undefined_card",
                                                "The values to verify card are invalid.",
                                                userInfo
                                        );
                                        return;
                                    }
                                    ;
                                    List<String> CARD_VALID_STATUSES = Arrays.asList("valid", "review", "pending");

                                    if (!CARD_VALID_STATUSES.contains(_card.getStatus())) {
                                        WritableMap userInfo = Arguments.createMap();
                                        userInfo.putString("error_type", _card.getStatus());
                                        userInfo.putString("help", "");
                                        userInfo.putString("description", _card.getMessage());
                                        promise.reject(
                                                "paymentez_error",
                                                "The card status is not allow.",
                                                userInfo
                                        );
                                        return;
                                    }
                                    WritableMap response = Arguments.createMap();
                                    response.putString("status", _card.getStatus());
                                    response.putString("token", _card.getToken());
                                    response.putString("transaction_reference", _card.getTransactionReference());
                                    response.putString("bin", _card.getBin());
                                    response.putString("type", _card.getType());
                                    promise.resolve(response);
                                }

                                public void onError(PaymentezError error) {
                                    WritableMap userInfo = Arguments.createMap();
                                    userInfo.putString("error_type", error.getType());
                                    userInfo.putString("help", error.getHelp());
                                    userInfo.putString("description", error.getDescription());
                                    promise.reject("paymentez_error", "Error in payment gateway.", userInfo);
                                }

                            });
        } catch (Exception e) {
            promise.reject(
                    "unexpected_error",
                    e.getMessage(),
                    userInfo
            );
        }
    }
}