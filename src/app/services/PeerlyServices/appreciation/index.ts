import {POST_APPRECIATION_ROUTE} from '../../../constant/apiRoutes';
import {apiCall} from '../../api';
import {PostAppreciationRequestBody, PostAppreciationResponse} from './types';

export const postAppreciationRequest = async (
  payload: PostAppreciationRequestBody,
) => {
  const response = await apiCall<
    PostAppreciationRequestBody,
    PostAppreciationResponse
  >({
    method: 'POST',
    url: POST_APPRECIATION_ROUTE,
    data: payload,
  });
  return response;
};
