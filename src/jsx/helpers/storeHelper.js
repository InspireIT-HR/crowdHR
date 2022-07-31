export const defaultInitinalState = {
  loading: false,
  isSubmitting: false,
  modal: {
    type: 'new',
    open: false,
    data: null,
  },
};

export const openNewModalData = {
  type: 'new',
  open: true,
  data: null,
};

export const openEditModalData = (data) => {
  return {
    type: 'edit',
    open: true,
    data,
  };
};