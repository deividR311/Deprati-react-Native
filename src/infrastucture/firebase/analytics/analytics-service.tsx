import React, { useEffect } from 'react';
import { AnalyticEvent } from './analitics.interfaces';
import { useAnalytics } from './useAnalytics';
import { Platform } from 'react-native';

export const AnalyticsService = () => {
  const { trackEvent } = useAnalytics();
  useEffect(() => {
    trackEvent(AnalyticEvent.start_app, { app: Platform.OS });
  }, []);
  return null;
};

export default AnalyticsService;
