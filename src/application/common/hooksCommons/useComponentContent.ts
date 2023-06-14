import { useEffect, useState, useMemo } from 'react';
import { HybrisCmsServices } from '../../../infrastucture/apis/api-presentation/services';
import { ComponentDto } from '../../../infrastucture/apis/api-presentation/services.dto';
import useLocalStorage, { StatusEnum } from './useLocalStorage';
import { validTimeCache } from '../../utils/cache';
import { relationPropertyGlobal } from '../../../presentation/common-components/relationProperty';

const SUFFIX_KEY = '_CONTENT_COMPNT';

const useComponentContent = (
  keyComponent?: string = '',
  relationProperty?: any,
  resync: boolean = false
) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [componentContent, setComponentContent] = useState();
  const [keyComponentState, setKeyComponentState] =
    useState<string>(keyComponent);
  const [contentCache, setContentCache, status] = useLocalStorage(
    `${keyComponentState}${SUFFIX_KEY}`,
    null
  );

  const relationComponents = useMemo(() => {
    return { ...relationPropertyGlobal, ...relationProperty };
  }, [relationProperty]);

  const mapComponent = async (responseComponent: any) => {
    let result = {};
    let componentList: string[] = [];
    let childrenComponents = {};
    try {
      const [component] = responseComponent.component as ComponentDto;
      const childs = relationComponents[component.typeCode];
      if (component[childs]?.length > 0) {
        componentList = component[childs].split(' ');
        const componentIds = componentList.join(',');
        const response = await HybrisCmsServices.getComponents({
          componentIds,
          pageSize: componentIds.length ?? 20
        });
        if (response?.status === 200) {
          const { component } = response.data;
          component?.forEach(cmpt => {
            childrenComponents[cmpt.uid] = cmpt;
          });
        }
      }
      const timestamp = Date.now();
      result = {
        ...component,
        timestamp,
        componentList,
        childrenComponents
      };
    } catch (error) {}
    setComponentContent(result);
    return result;
  };

  const getContent = content => {
    try {
      if (content) {
        const { timestamp } = content;
        const validContent = validTimeCache(timestamp);
        return validContent ? content : null;
      }
    } catch (error) {}
    return null;
  };

  const getContentComponent = async (keyUid: string) => {
    if (keyUid) {
      setKeyComponentState(keyUid);
      if (status === StatusEnum.success && !resync) {
        const content = getContent(contentCache);
        if (content) {
          setComponentContent(content);
          return content;
        } else {
          try {
            const response = await HybrisCmsServices.getComponents({
              componentIds: keyUid
            });
            const result = await mapComponent(response.data);
            return result;
          } catch (error) {
            setError(true);
          }
        }
      }
      return null;
    }
  };

  useEffect(() => {
    if (keyComponent) {
      if (status === StatusEnum.success && !resync) {
        const content = getContent(contentCache);
        if (content) {
          setComponentContent(content);
        } else {
          HybrisCmsServices.getComponents({ componentIds: keyComponent })
            .then(res => mapComponent(res.data))
            .catch(error => setError(true));
        }
      }
    }
  }, [status]);

  useEffect(() => {
    if (componentContent) {
      setContentCache(componentContent);
      setLoading(false);
    }
  }, [componentContent]);

  return {
    loading,
    error,
    componentContent,
    getContentComponent
  };
};
export default useComponentContent;
