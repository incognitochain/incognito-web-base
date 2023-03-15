import SelectedPrivacy from 'models/model/SelectedPrivacyModel';
import { useSelector } from 'react-redux';

import { getFollowTokenSelectedTokenSelector } from '../state/followTokenSelected.selectors';

interface ObjectLiteral {
  [key: string]: any;
}

type EmptyObject = ObjectLiteral;
type ReturnType = SelectedPrivacy | EmptyObject;

export default function useFollowTokenSelected(): ReturnType {
  const followTokenSelected: SelectedPrivacy = useSelector(getFollowTokenSelectedTokenSelector);
  if (!followTokenSelected) return {};
  return followTokenSelected;
}
