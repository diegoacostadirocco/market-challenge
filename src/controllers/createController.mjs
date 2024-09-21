const createController =
  ({ usecase, responseMapper }) =>
  async ({ params }) => {
    const response = await usecase(params);

    return responseMapper(response);
  };

export default createController;
