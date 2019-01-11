export class DataStoreProviderMock {

  setSecureContainer = jest.fn(() => {
    return new Promise(() => {});
  })

}
