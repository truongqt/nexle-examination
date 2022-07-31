import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'redux-manager/root-store';
import { setShowRequestStatus } from 'redux-manager/ui/slice';

export function useShowRequestStatus(show: boolean) {
    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        dispatch(setShowRequestStatus(show));
        return () => {
            dispatch(setShowRequestStatus(show));
        }
    }, [show, dispatch])

}
