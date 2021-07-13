export const ActionType = {
  CHANGE_CITY: 'CHANGE_CITY',
  FILL_OFFERS_LIST: 'FILL_OFFERS_LIST',
  SORT_OFFERS_LIST: 'SORT_OFFERS_LIST',
  LOAD_OFFERS: 'LOAD_OFFERS',
  REQUIRED_AUTHORIZATION: 'REQUIRED_AUTHORIZATION',
  LOGOUT: 'LOGOUT',
  SELECT_POINT_ID: 'SELECT_POINT_ID',
};

export const ActionCreator = {
  changeCity: (name) => ({
    type: ActionType.CHANGE_CITY,
    payload: name,
  }),
  fillOffersList: (offers) => ({
    type: ActionType.FILL_OFFERS_LIST,
    payload: offers,
  }),
  sortOffersList: (variant) => ({
    type: ActionType.SORT_OFFERS_LIST,
    payload: variant,
  }),
  loadOffers: (offers) => ({
    type: ActionType.LOAD_OFFERS,
    payload: offers,
  }),
  requireAuthorization: (status) => ({
    type: ActionType.REQUIRED_AUTHORIZATION,
    payload: status,
  }),
  logout: () => ({
    type: ActionType.LOGOUT,
  }),
  selectPointId: (id) => ({
    type: ActionType.SELECT_POINT_ID,
    payload: id,
  }),
};
