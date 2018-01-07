type ReturnTypes<EnumTypes> = { [key in keyof EnumTypes]: key }

export function createTypesByEnum<EnumTypes extends object>(enumTypes: EnumTypes): ReturnTypes<EnumTypes> {
  return new Proxy<EnumTypes>(enumTypes, {
    get(_, property) {
      return property
    },
  })
}
