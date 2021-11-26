import {searchSchemaById} from "../store";

test('schema should parse as indexedSchema by id', () => {
  const testSchema = {
    id: '1',
    type: '1',
    body: [
      {
        id: '3',
        type: '3'
      },
      {
        id: '2',
        type: '2',
        columns: [
          {
            type: '4',
            id: '4',
          }
        ]
      }
    ]
  };


  expect(searchSchemaById(testSchema, '1')).toBe(testSchema);
  expect(searchSchemaById(testSchema, '3')).toBe(testSchema['body'][0]);
  expect(searchSchemaById(testSchema, '4')).toBe(testSchema['body'][1].columns[0]);
})
