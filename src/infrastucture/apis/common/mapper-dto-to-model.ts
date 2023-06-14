/**
 * @description: How to use read below the documentation
 * @param {DTOType} dtoType: Raw data from the API
 * @param {Record<string,string>} fieldsToMap: fields to map from the dtoType to the model
 * @example const dataMapped = new MapperDTO_To_Model<Usuario, User>(entryData, {
 *   "nombre": "name",
 *   "id": "something"
 * }).get()
 *
 */
export class MapperDTO_To_Model<DTOType, ModelType> {
  private modelInstance = {} as ModelType;
  constructor(
    private _dto: DTOType,
    fieldsMap: Record<keyof DTOType, keyof ModelType>
  ) {
    Object.keys(fieldsMap).forEach(dtoKey => {
      const _dtoKey = dtoKey as keyof DTOType;
      const modelKey = fieldsMap[_dtoKey];
      const _dtoValue = this._dto[_dtoKey];
      this.modelInstance[modelKey] = _dtoValue as any;
    });
  }
  get(): ModelType {
    return this.modelInstance;
  }
}
/**
 * @example: HOW USE THE MapperDTO_To_Model class

interface Usuario {
    nombre: string
    apellido: string
    id?: string
}

interface User {
    name: string
    lastname: string
    something?: string
}

const entryData: Usuario = {
    id: "CC-111163334444",
    nombre: "Crhistian",
    apellido: "Vergara",
}

const dataMapped = new MapperDTO_To_Model<Omit<Usuario, "apellido">, User>(entryData, {
    "nombre": "name",
    "id": "something"
})

const dataMapped = new MapperDTO_To_Model<Usuario, User>(entryData, {
    "nombre": "name",
    "id": "something"
})

 */
