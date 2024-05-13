type JsonObjectBaseType = Record<string, String | Number | Object | Array<any>>;

export const baseFetch = <T extends JsonObjectBaseType>(
  ...args: Parameters<typeof fetch>
) => fetch(...args).then((res) => res.json() as unknown as T);
