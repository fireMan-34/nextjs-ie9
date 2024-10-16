import { useReducer } from 'react';

export default function useForceUpdate () {
  const [ fU, dispatch ] = useReducer((c) => c + 1, 0);

  return [ fU, dispatch ]
}