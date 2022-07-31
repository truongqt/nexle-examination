import { useFocusEffect } from '@react-navigation/native';
import React from 'react';
import { useDispatch } from 'react-redux';
import { setShowRequestStatus } from 'redux-manager/ui/slice';

export function useShowRequestStatus(show: boolean) {
    const dispatch = useDispatch();
    useFocusEffect(
        React.useCallback(() => {
            dispatch(setShowRequestStatus(show));
            return () => {
                dispatch(setShowRequestStatus(show));
            }
        }, [show, dispatch]),
    );
}
