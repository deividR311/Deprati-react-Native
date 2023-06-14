import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import {
  Modal,
  TouchableOpacity,
  View,
  Text,
  Animated,
  Platform,
  SafeAreaView,
  Keyboard,
  Pressable,
  KeyboardAvoidingView
} from 'react-native';
import { PopupProps } from '.';
import {
  Styles,
  stylesModalLoading,
  stylesModalLogin,
  stylesToast
} from './poppup.stylesheet';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { FontStyles } from '../../../application/common/fonts';
import Button, { ButtonText, MainButton } from '../buttons/Button';
import layout from '../../../application/common/layout';
import SignIn from '../../screens/SignIn/SignIn';
import IconCommunity from './IconCommunity';
import { COLORS } from '../../../application/common';
import ModalLoading from '../modal/ModalLoading';
import { stylesModal } from '../modal/stylesModal';
import { ActivityIndicator } from 'react-native-paper';
import { testProps } from '../../../application/utils/accessibleId';

export const Popup: React.FC<PopupProps> = props => {
  const [open, setPopUpOpen] = React.useState(false);
  const [finished, setFinished] = useState(false);
  const [toastBottom, setToastOpen] = useState(false);
  const animationScaleValue = useRef(new Animated.Value(0)).current;
  const animationAlphaValue = useRef(new Animated.Value(0)).current;
  const animationTranslationX = useRef(
    new Animated.Value(layout.window.width)
  ).current;

  useLayoutEffect(() => {
    if (props?.visible === undefined) return;
    if (props.visible !== open) _toggleModal(props?.visible);
  }, [props?.visible]);

  useEffect(() => {
    if (props?.isToastBottom) {
      setToastOpen(true);
    }
  }, [props?.isToastBottom]);

  const _toggleModal = (state: boolean) => {
    const animationDuration = 100;
    const durationTranslationX = 400;
    if (state) {
      setPopUpOpen(true);
      handleAnimationStart(animationDuration, durationTranslationX);
    }

    if (!state) {
      handleAnimationEnd(durationTranslationX);
    }
  };

  const handleAnimationStart = (durationS: number, durationT: number) => {
    if (!props.isToast) {
      return Animated.parallel([
        Animated.timing(animationAlphaValue, {
          toValue: 1,
          useNativeDriver: true,
          delay: durationS
        }),
        Animated.spring(animationScaleValue, {
          toValue: 1,
          useNativeDriver: true,
          delay: durationS,
          tension: 50
        })
      ]).start();
    }

    return Animated.timing(animationTranslationX, {
      toValue: 0,
      duration: durationT,
      useNativeDriver: true,
      delay: durationT
    }).start(() => handleHide());
  };

  const handleAnimationEnd = (durationT: number) => {
    if (!props.isToast) {
      return Animated.parallel([
        Animated.timing(animationAlphaValue, {
          toValue: 0,
          useNativeDriver: true,
          duration: 200
        }),
        Animated.spring(animationScaleValue, {
          toValue: 0,
          useNativeDriver: true,
          tension: 20
        })
      ]).start(state => {
        setPopUpOpen(false);
        setTimeout(() => {
          if (state?.finished) {
            props?.onCloseRequest?.();
          }
        }, 100);
      });
    }
    return Animated.timing(animationTranslationX, {
      toValue: layout.window.width,
      duration: durationT,
      useNativeDriver: true
    }).start(state => {
      setToastOpen(false);
      setPopUpOpen(false);
      if (state?.finished) {
        props?.onCloseRequest?.();
      }
    });
  };

  const handleHide = () => {
    setTimeout(() => {
      closeAction();
    }, props?.delayHideToast ?? 3000);
  };

  const closeAction = () => {
    props?.closeAction?.();
  };

  const buttonAction = () => {
    props?.buttonAction?.();
  };

  if (props?.hasInput) {
    return (
      <Modal
        transparent
        animationType="fade"
        visible={open}
        onDismiss={() => {
          //console.log('event onDismiss')
          props?.onDismiss?.();
        }}>
        <SafeAreaView style={[Styles.container, { ...props?.containerStyle }]}>
          <KeyboardAvoidingView behavior={'position'}>
            <Animated.View
              style={[
                Styles.content,
                props?.contentStyle,
                {
                  transform: [{ scale: animationScaleValue }],
                  opacity: animationAlphaValue
                }
              ]}>
              {props && props?.modalContent ? (
                props.modalContent()
              ) : (
                <>
                  {props?.showCloseButton && (
                    <Pressable onPress={() => Keyboard.dismiss()}>
                      <View style={Styles.header} accessible>
                        <TouchableOpacity
                          {...testProps('close_modal')}
                          onPress={closeAction}
                          style={Styles.closeButton}>
                          <Icon
                            name="close"
                            size={20}
                            color={FontStyles.DarkColor.color}
                          />
                        </TouchableOpacity>
                      </View>
                    </Pressable>
                  )}

                  {props.icon && typeof props.icon === 'string' && (
                    <Icon
                      name={props?.icon}
                      size={72}
                      color={props?.iconColor}
                      style={Styles.icon}
                      onPress={() => Keyboard.dismiss()}
                    />
                  )}

                  {props.icon && typeof props.icon !== 'string' && (
                    <View style={Styles.icon}>{props.icon}</View>
                  )}

                  {props?.title && (
                    <Text
                      onPress={() => Keyboard.dismiss()}
                      style={[
                        FontStyles.H6_Headline,
                        Styles.title,
                        { ...props?.titleStyle }
                      ]}>
                      {props?.title}
                    </Text>
                  )}

                  {props?.textContent && (
                    <Text
                      style={[
                        FontStyles.Body_1,
                        { ...props?.textContentStyle }
                      ]}>
                      {props?.textContent}
                    </Text>
                  )}

                  {props?.textComponent?.(props) ?? null}

                  {!props?.hideButton &&
                    (props.buttonType === 'full' ? (
                      <Button
                        onPress={buttonAction}
                        marginTop={6}
                        showActivityIndicator={props?.buttonLoading}
                        icon={props?.iconButton}
                        linkName={props?.buttonText || 'ACEPTAR'}
                        disabled={props?.buttonDisabled}
                        backgroundColor={COLORS.BRAND}
                        textColor={COLORS.WHITE}
                      />
                    ) : !props?.doubleButton ? (
                      <ButtonText
                        onPress={buttonAction}
                        title={props?.buttonText || 'ACEPTAR'}
                        styleText={[Styles.button_short__text]}
                      />
                    ) : (
                      <View
                        style={[
                          Styles.containerButtons,
                          props?.containerButtonsStyle
                        ]}>
                        <ButtonText
                          onPress={closeAction}
                          title={props?.buttonText || 'CANCELAR'}
                          styleText={[
                            Styles.button_short__text,
                            props?.buttonTextStyle
                          ]}
                        />
                        <ButtonText
                          onPress={buttonAction}
                          title={props?.secondButtonText || 'ACEPTAR'}
                          styleText={[
                            Styles.button_short__text,
                            props?.secondButtonTextStyle
                          ]}
                        />
                      </View>
                    ))}
                  {props && props.bodyComponent
                    ? props.bodyComponent?.()
                    : null}
                </>
              )}
            </Animated.View>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </Modal>
    );
  }

  if (!props.isToast && !props.isLoginModal && !props.isModalLoading) {
    return (
      <Modal
        transparent
        animationType="fade"
        visible={open}
        onDismiss={() => {
          //console.log('event onDismiss')
          props?.onDismiss?.();
        }}>
        <SafeAreaView style={[Styles.container, { ...props?.containerStyle }]}>
          <Animated.View
            style={[
              Styles.content,
              props?.contentStyle,
              {
                transform: [{ scale: animationScaleValue }],
                opacity: animationAlphaValue
              }
            ]}>
            {props && props?.modalContent ? (
              props.modalContent()
            ) : (
              <>
                {props?.showCloseButton && (
                  <Pressable onPress={() => Keyboard.dismiss()}>
                    <View style={Styles.header} accessible>
                      <TouchableOpacity
                        {...testProps('close_modal')}
                        onPress={closeAction}
                        style={Styles.closeButton}>
                        <Icon
                          name="close"
                          size={20}
                          color={FontStyles.DarkColor.color}
                        />
                      </TouchableOpacity>
                    </View>
                  </Pressable>
                )}

                {props.icon && typeof props.icon === 'string' && (
                  <Icon
                    name={props?.icon}
                    size={72}
                    color={props?.iconColor}
                    style={Styles.icon}
                    onPress={() => Keyboard.dismiss()}
                  />
                )}

                {props.icon && typeof props.icon !== 'string' && (
                  <View style={Styles.icon}>{props.icon}</View>
                )}

                {props?.title && (
                  <Text
                    onPress={() => Keyboard.dismiss()}
                    style={[
                      FontStyles.H6_Headline,
                      Styles.title,
                      { ...props?.titleStyle }
                    ]}>
                    {props?.title}
                  </Text>
                )}

                {props?.textContent && (
                  <Text
                    style={[FontStyles.Body_1, { ...props?.textContentStyle }]}>
                    {props?.textContent}
                  </Text>
                )}

                {props?.textComponent?.(props) ?? null}

                {!props?.hideButton &&
                  (props.buttonType === 'full' ? (
                    <Button
                      onPress={buttonAction}
                      marginTop={6}
                      showActivityIndicator={props?.buttonLoading}
                      icon={props?.iconButton}
                      linkName={props?.buttonText || 'ACEPTAR'}
                      disabled={props?.buttonDisabled}
                      backgroundColor={COLORS.BRAND}
                      textColor={COLORS.WHITE}
                    />
                  ) : !props?.doubleButton ? (
                    <ButtonText
                      onPress={buttonAction}
                      title={props?.buttonText || 'ACEPTAR'}
                      styleText={[Styles.button_short__text]}
                    />
                  ) : (
                    <View
                      style={[
                        Styles.containerButtons,
                        props?.containerButtonsStyle
                      ]}>
                      <ButtonText
                        onPress={closeAction}
                        title={props?.buttonText || 'CANCELAR'}
                        styleText={[
                          Styles.button_short__text,
                          props?.buttonTextStyle
                        ]}
                      />
                      <ButtonText
                        onPress={buttonAction}
                        title={props?.secondButtonText || 'ACEPTAR'}
                        styleText={[
                          Styles.button_short__text,
                          props?.secondButtonTextStyle
                        ]}
                      />
                    </View>
                  ))}
                {props && props.bodyComponent ? props.bodyComponent?.() : null}
              </>
            )}
          </Animated.View>
        </SafeAreaView>
      </Modal>
    );
  }

  if (props.isToast) {
    return (
      <Modal
        transparent
        animationType={'fade'}
        visible={open && props.visible}
        onDismiss={props?.onDismiss}>
        <Animated.View
          style={[
            toastBottom ? stylesToast.containerBottom : stylesToast.container,
            props?.styleToast,
            {
              transform: [
                {
                  translateX: animationTranslationX
                  // translateY: 100,
                }
              ]
            }
          ]}>
          <View
            style={[
              toastBottom ? stylesToast.contentBottom : stylesToast.content,
              props?.styleContentToast
            ]}>
            <View
              style={[stylesToast.content__text, props?.styleContentTextToast]}>
              {props?.textContent && (
                <Text style={[stylesToast.text, props?.styleTextToast]}>
                  {props?.textContent}
                </Text>
              )}
            </View>
            <View
              style={[
                stylesToast.content__button,
                props?.styleContentButtonToast
              ]}>
              <MainButton
                testID={`button_toast_action${props?.identifier ?? ''}`}
                title={props?.buttonText || 'ACEPTAR'}
                disabled={props?.buttonDisabled}
                style={[stylesToast.button, props?.styleButtonToast]}
                onPress={buttonAction}
              />
            </View>
          </View>
        </Animated.View>
      </Modal>
    );
  }

  if (props.isModalLoading)
    return (
      <Modal
        visible={open}
        animationType="slide"
        transparent
        style={{ margin: 0, backgroundColor: '#7a716e' }}>
        <View style={[stylesModalLoading.overlay, { height: '100%' }]} />
        <View style={stylesModal.modal}>
          <ActivityIndicator size="large" color={COLORS.BRAND} />
        </View>
      </Modal>
    );

  return (
    <Modal
      style={{
        flex: 1
      }}
      onDismiss={props?.onDismiss}
      visible={open}>
      <Animated.View
        style={[
          // Styles.container,

          { transform: [{ scale: animationScaleValue }], flex: 1 }
        ]}>
        <SafeAreaView>
          <View style={stylesModalLogin.content}>
            <IconCommunity name="arrow-left" size={26} onPress={closeAction} />
            {props?.title && (
              <Text style={[stylesModalLogin.title, props?.titleStyle]}>
                {props?.title}
              </Text>
            )}
          </View>

          <SignIn
            isModal={props?.isLoginModal ?? false}
            onPressLogin={buttonAction}
            onCloseAction={closeAction}
          />
        </SafeAreaView>
      </Animated.View>
    </Modal>
  );
};
