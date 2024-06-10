import fs from 'node:fs';
/** Load villagers from a CSV file into an array of villager objects. */
export function loadVillagers(fp) {
  // FIXME
  const data = fs.readFileSync(fp, 'utf-8');
  const villagers = [];
  for (const line of data.split('\r\n')) {
    if (line.length > 0) {
      const [name, species, personality, hobby, motto] = line.trim().split('|');
      villagers.push({ name, species, personality, hobby, motto });
    }
}
  return villagers;
}

/** Return the names of all villagers of the given species. */
export function getNamesBySpecies(fp, species) {
  // FIXME
  const data = loadVillagers(fp);
  const result = [];
  for (const villager of data) {
    if (villager.species === species) {
      result.push(villager.name);
    }
  } 
  return result;
}

/**
 * Return all villager data as a flat array of arrays. Each array should
 * contain the following fields, in order, for each villager:
 *   [name, species, personality, hobby, motto].
 */
export function getAllData(fp) {
  // FIXME
  const data = loadVillagers(fp);
  const result = [];
  for (const villager of data) {
    result.push([villager.name, villager.species, villager.personality, villager.hobby, villager.motto]);
  }
  return result;
}

/** Return an array of all unique species found in the file. */
export function getSpecies(fp) {
  // FIXME
  const data = loadVillagers(fp);
  const result = [];
  for (const villager of data) {
    if (!result.includes(villager.species)) {
      result.push(villager.species);
    }
  }
  return result;
}

/**
 * Return an object that shows the number of villagers for each species.
 * Store each species as a key and the count of villagers as the value.
 */
export function countMembersBySpecies(fp) {
  // FIXME
  const data = loadVillagers(fp);
  const result = {};
  for (const villager of data) {
    if (result[villager.species]) {
      result[villager.species] += 1;
    } else {
      result[villager.species] = 1;
    }
  }
  return result;
}
