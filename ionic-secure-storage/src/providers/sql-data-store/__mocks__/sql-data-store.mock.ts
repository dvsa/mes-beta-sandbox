export class SqlDataStoreProviderMock {

  setSecureContainer = jest.fn(() => {
    return new Promise(() => {});
  })

}
