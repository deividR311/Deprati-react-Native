import BannerHome from './banner-home';
import CategoryHome from './category-home';
import StoriesHome from './stories-home';
import CarouselWelcome from '../screens/Welcome/components/CarouselWelcome';
import CategoryMain from '../screens/CategoryPage/components/CategoryMain';
import CategoryFeature from '../screens/CategoryPage/components/CategoryFeature';
import BannerCarousel from '../screens/CategoryPage/components/BannerCarousel';
import RecommendedProducts from './recommended-home/RecommendProducts';
import SimpleBanner from './banner-home/SimpleBanner';
import CMSParagraph from './CMSParagraph/CMSParagraph';
import CMSLinkButton from './CMSLinkButton/CMSLinkButton';
import DepratiBrandsRotatingImages from './DepratiBrandsRotatingImages/DepratiBrandsRotatingImages';
import BannerComponent from './banner-home/BannerComponent';
import DepratiDoubleResponsiveBanner from './DepratiDoubleResponsiveBanner/DepratiDoubleResponsiveBannerComponent';
import DepratiHomeRotatingImagesComponent from './DepratiHomeRotatingImagesComponent/DepratiHomeRotatingImagesComponent';
import { DepratiSimpleResponsiveBannerComponent } from '../screens/dashboard/PDP/components/DepratiSimpleResponsiveBannerComponent';
import ProductCarouselComponent from './productCarouselComponent';
import DepratiCloudflareVideoStreamBannerComponent from './DepratiCloudflareVideoStreamBannerComponent/DepratiCloudflareVideoStreamBannerComponent';

interface ComponentType {
  [key: string]: React.ReactNode;
}

// uid : Component
export const Components: ComponentType = {
  //Home component
  DepratiStoryContainerComponent: StoriesHome,
  SimpleBannerComponent: SimpleBanner,
  DepratiCategoryListComponent: CategoryHome,
  DepratiEmarsysProductCarouselComponent: RecommendedProducts,
  DepratiHomeRotatingImagesComponent: DepratiHomeRotatingImagesComponent,

  //Welcome Component
  DepratiWelcomeRotatingImagesComponent: CarouselWelcome,
  RotatingImagesComponent: CarouselWelcome,

  //Category Component
  DepratiCategoryFeatureCarouselComponent: CategoryMain,
  CategoryFeatureComponent: CategoryFeature,
  DepratiDoubleResponsiveBannerComponent: DepratiDoubleResponsiveBanner, //BannerCarousel
  DepratiSimpleResponsiveBannerComponent,
  CMSParagraphComponent: CMSParagraph,
  CMSLinkComponent: CMSLinkButton,
  DepratiBrandsRotatingImagesComponent: DepratiBrandsRotatingImages,
  BannerComponent: BannerComponent,
  DepratiCloudflareVideoStreamBannerComponent,
  SimpleResponsiveBannerComponent: SimpleBanner,
  //Corner
  ProductCarouselComponent
};
