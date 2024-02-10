export function createIDBPersister(idbValidKey = 'reactQuery', storage: any) {
  return {
    persistClient: (client: any) => {
      storage.set(idbValidKey, JSON.stringify(client));
    },
    restoreClient: async () => {
      return storage.getString(idbValidKey);
    },
    removeClient: () => {
      storage.delete(idbValidKey);
    },
  };
}
