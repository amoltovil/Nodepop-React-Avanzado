import { getAdvertsStateSort, getTagsState, getUi } from './selectors';

describe('getAdvertsStateSort', () => {
  const data = [
    { createdAt: '1', id: 'a' },
    { createdAt: '2', id: 'b' },
  ];
  test('should return all adverts', () => {
    const result = getAdvertsStateSort({ adverts: { data } });
      expect(result).toHaveLength(data.length);
  });
  test('should return adverts sorted by updateAt desc', () => {
    const result = getAdvertsStateSort({ adverts: { data } });
      expect(result[0].id).toBe('b');
      expect(result[0].createdAt).toBe('2');
  });
});

describe('getTagsState', () => {
    const data = ["motor", "lifestyle"];

    test('should return all tags', () => {
        const result = getTagsState({ tags: { data } });
          expect(result).toHaveLength(data.length);
      });
});

describe('getUi', () => {

    test('should return Ui Object empty', () => {
        const ui = {};
        const result = getUi({ ui: ui });
        
        expect(result).toEqual(ui);
    });
    
    test('should return Ui Object', () => {
        const ui = {
            loading: false,
            error: null,
        };
        const result = getUi({ ui: ui });
        //expect(result).toEqual(ui);
        expect(result).toMatchObject(ui);
    });
    
});
