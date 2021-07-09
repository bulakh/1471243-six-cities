export const ActionType = {
  CHANGE_CITY: 'CHANGE_CITY',
  FILL_OFFERS_LIST: 'FILL_OFFERS_LIST',
  SORT_OFFERS_LIST: 'SORT_OFFERS_LIST',
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
};
