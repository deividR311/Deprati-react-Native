import { useEffect, useState, useMemo } from 'react';
import {
  ComponentDto,
  PageDtoResponse
} from '../../../infrastucture/apis/api-presentation/services.dto';
import lodash from 'lodash';
import { relationPropertyGlobal } from '../../../presentation/common-components/relationProperty';
import { useComponentsMutation, usePageMutation } from './contentPage.api';
import { ContentPageRequest, ContentPageResponse } from './contentPage.type';
import { mapComponentUid } from '../../../application/utils/mapContent';
import { HybrisCmsServices } from '../api-presentation/services';

const SUFFIX_KEY = '_CATEGORY_CONTENT';

interface componentsChildModel {
  componentList: string[];
  relation: { [key: string]: string };
}

interface ComponentDtoContent extends ComponentDto {
  childrenComponentsList: null | string[];
  childrenComponents: {
    [any: string]: ComponentDtoContent;
  };
}

interface PageDtoContent {
  timestamp: number;
  components: {
    [any: string]: ComponentDtoContent;
  };
  slots: {
    [any: string]: string[];
  };
  [any: string]: any;
}

export const usePageContent = (
  relationProperty?: any = {},
  resync: boolean = false
): InfoHook => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [pageContent, setPageContent] = useState<PageDtoContent>();

  const [
    _getPage,
    {
      isLoading: isLoadingPage,
      isError: isErrorPage,
      data: dataPage,
      isSuccess: isSuccessPage
    }
  ] = usePageMutation();
  const [
    _getComponents,
    {
      isLoading: isLoadingComponent,
      isError: isErrorComponent,
      data: dataComponent
    }
  ] = useComponentsMutation();

  /* const [contentCache, setContentCache, status] = useLocalStorage(
    `${keyCategory}${SUFFIX_KEY}`,
    null,
  ) */

  const relationComponents = useMemo(() => {
    return { ...relationPropertyGlobal, ...relationProperty };
  }, [relationProperty]);

  let componentsChild: componentsChildModel[] = Array.from([0, 1, 2], x => ({
    componentList: [],
    relation: {}
  }));

  let levelComponents: number = 0;
  let hasChild: boolean = false;

  const pageAdapter = async (data: PageDtoResponse) => {
    if (data?.uid) {
      const {
        contentSlots: { contentSlot: sectionSlotDto },
        ...rest
      } = data;
      const slots = {};

      // join components, remove section slot
      const componentsList = lodash.reduce(
        sectionSlotDto,
        function (result, section) {
          const {
            components: { component }
          } = section;
          slots[section.position] = component.map(mapComponentUid);

          result.push(...component.map(componentAdapter));
          return result;
        },
        []
      );

      // get components by key(uid)
      const components = lodash.keyBy(componentsList, mapComponentUid);

      //componentsChild level 0
      while (hasChild && levelComponents < 3) {
        try {
          const { componentList, relation } = componentsChild[levelComponents];
          if (hasChild && componentList?.length > 0) {
            hasChild = false;

            const syncComponents = await HybrisCmsServices.getComponents({
              componentIds: componentList?.join(','),
              pageSize: componentList.length ?? 20
            });
            if (syncComponents?.status === 200) {
              const { component: childs } = syncComponents.data;
              levelComponents++;
              const componentChild =
                levelComponents < 2 ? childs.map(componentAdapter) : childs;
              componentChild.forEach(compt => {
                try {
                  let parentKey = relation[compt.uid];
                  if (levelComponents > 1) {
                    const { relation: relationParent } = componentsChild[0];
                    parentKey = relationParent[parentKey]
                      ? `${relationParent[parentKey]}.childrenComponents.${parentKey}`
                      : '';
                  }

                  const { childrenComponents } =
                    lodash.get(components, parentKey) ?? {};
                  childrenComponents[compt.uid] = compt;
                } catch (e) {}
              });
            }
          } else {
            hasChild = false;
          }
        } catch (error) {}
      }

      const timestamp = Date.now();
      let dataPage = {
        ...rest, // data
        timestamp,
        components,
        slots
      };
      setLoading(false);
      setError(false);
      setPageContent(dataPage);
    }
  };

  const componentAdapter = (component: ComponentDto) => {
    let childrenComponentsList = null;
    try {
      if (relationComponents[component.typeCode]) {
        if (!hasChild) hasChild = true;
        childrenComponentsList =
          component[relationComponents[component.typeCode]]?.split(' ') ?? [];
        let { componentList, relation } = componentsChild[levelComponents];
        componentList?.push(...childrenComponentsList);
        childrenComponentsList.forEach(child => {
          relation[child] = component.uid;
        });
      }
    } catch (err) {}

    return { ...component, childrenComponentsList, childrenComponents: {} };
  };

  useEffect(() => {
    if (!isLoadingPage) {
      if (isSuccessPage) {
        pageAdapter(dataPage);
      } else {
        setLoading(false);
      }
    }
  }, [isLoadingPage, isSuccessPage]);

  useEffect(() => {
    if (!isLoadingPage && isErrorPage) {
      setError(isErrorPage);
    }
  }, [isLoadingPage, isErrorPage]);

  const getDataContent = async (pageRequest: ContentPageRequest) => {
    setLoading(true);
    _getPage(pageRequest);
  };

  return {
    getDataContent,
    loading,
    error,
    pageContent
  };
};
export interface InfoHook<T> {
  loading: boolean;
  error: boolean;
  pageContent?: ContentPageResponse | null;
  getDataContent(pageRequest: ContentPageRequest): Promise<void>;
}

export default usePageContent;
