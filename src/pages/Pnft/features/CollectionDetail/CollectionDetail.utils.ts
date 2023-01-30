import { appName } from './CollectionDetail.route';

const getSearchURL = ({ slug }: { slug: string }) => {
  return `/papps/${appName}/${slug}`;
};

export { getSearchURL };
