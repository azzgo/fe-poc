type ReturnTypes<EnumTypes> = { [key in keyof EnumTypes]: key }

export function createTypesByEnum<EnumTypes>(enumTypes: EnumTypes): ReturnTypes<EnumTypes> {
  return new Proxy(enumTypes as any, {
    get(target, property: any) {
      return property
    },
  })
}
