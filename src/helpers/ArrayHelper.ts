export class ArrayHelperImpl {
  update<U, T extends keyof U>(key: T, value: U, array: U[]): U[] {
    return array.map((i: U) => {
      if (value[key] === i[key]) {
        return {
          ...i,
          ...value,
        };
      }
      return i;
    });
  }
  // remove<U, T extends keyof U>(key: T, array: U[]): U[] {
  //   return array.filter((i: U) => {
  //     if (key !== i[key]) {
  //       return i;
  //     }
  //   });
  // }
}

export const ArrayHelper = new ArrayHelperImpl();
