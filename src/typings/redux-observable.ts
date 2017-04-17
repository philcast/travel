import 'redux-observable';

///////////////////////////////////////////////////////////////////////////////
// enhance redux-observable typings to force correct values for action types //
///////////////////////////////////////////////////////////////////////////////

declare module 'redux-observable' {
  interface ActionsObservable<T> {
    ofType<AT extends { type: string }>(key: AT['type']): ActionsObservable<T>;
  }
}