import { useDispatch } from 'react-redux';
import { setLoading } from 'state/loading/loading.actions';

const useLoading = () => {
  const dispatch = useDispatch();
  const showLoading = (flag: boolean, message?: string) => {
    dispatch(
      setLoading({
        flag,
        message,
      })
    );
  };

  return {
    showLoading,
  };
};

export default useLoading;
