import path from 'node:path';
import {
  getNamesBySpecies,
  loadVillagers,
  getAllData,
  getSpecies,
  countMembersBySpecies,
} from '../main.js';

const __filename = new URL('', import.meta.url).pathname;
const __dirname = path.dirname(__filename);
const dataFile = path.resolve(path.join(__dirname, '..', 'villagers.csv'));

describe('loadVillagers', () => {
  const expectedVillager = expect.objectContaining({
    name: expect.any(String),
    species: expect.any(String),
    personality: expect.any(String),
    hobby: expect.any(String),
    motto: expect.any(String),
  });
  const data = loadVillagers(dataFile);

  test('returns a value', () => {
    expect(data).toBeDefined();
  });

  test('returns an array of objects with villager info for all villagers', () => {
    expect(data).toHaveLength(391);
    expect(data).toEqual(expect.arrayContaining([expectedVillager]));
  });
});

describe('getNamesBySpecies', () => {
  test('returns an array of strings if there are villagers of the given species', () => {
    const data = getNamesBySpecies(dataFile, 'Anteater');
    expect(data).toEqual(expect.arrayContaining([expect.any(String)]));
  });

  test('returns an empty array if there are no villagers of the given species', () => {
    const data = getNamesBySpecies(dataFile, 'Ant');
    expect(data).toEqual([]);
  });

  test('returns an array of all Anteater names', () => {
    const expectedNames = [
      'Cyrano',
      'Antonio',
      'Pango',
      'Anabelle',
      'Snooty',
      'Annalisa',
      'Olaf',
    ];
    const data = getNamesBySpecies(dataFile, 'Anteater');
    expect(data).toEqual(expectedNames);
  });
});

describe('getAllData', () => {
  const data = getAllData(dataFile);

  test('returns an array of arrays with villager data', () => {
    expect(data).toEqual(
      expect.arrayContaining([expect.arrayContaining([expect.any(String)])]),
    );
    expect(data).toHaveLength(391);
  });

  test('return value contains data for Cyrano the Anteater', () => {
    const cyrano = data.find((villager) => villager[0] === 'Cyrano');
    expect(cyrano).toEqual([
      'Cyrano',
      'Anteater',
      'Cranky',
      'Education',
      "Don't punch your nose to spite your face.",
    ]);
  });
});

describe('getSpecies', () => {
  const data = getSpecies(dataFile);

  test('returns an array of unique species', () => {
    expect(data).toEqual(expect.arrayContaining([expect.any(String)]));
    expect(data).toHaveLength(35);
  });

  test('returns an array containing species found in the file', () => {
    expect(data).toEqual(expect.arrayContaining(['Anteater', 'Bear', 'Bird']));
  });
});

describe('countMembersBySpecies', () => {
  const data = countMembersBySpecies(dataFile);

  test('returns an object with species as keys and counts as values', () => {
    expect(data.Anteater).toEqual(7);
    expect(data.Bear).toEqual(15);
    expect(data.Bird).toEqual(13);
  });
});
