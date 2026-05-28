import fs from 'fs/promises';
import path from 'path';

// Define base data directory
const DATA_DIR = path.join(process.cwd(), '../data');

/**
 * Ensures a directory exists
 */
export const ensureDir = async (dirPath: string) => {
  try {
    await fs.mkdir(dirPath, { recursive: true });
  } catch (error) {
    // Ignore error if directory already exists
  }
};

/**
 * Reads a JSON file. If it doesn't exist, returns the default value (usually an empty array or object).
 */
export const readJson = async <T>(collection: string, defaultData: T): Promise<T> => {
  const filePath = path.join(DATA_DIR, `${collection}.json`);
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data) as T;
  } catch (error: any) {
    if (error.code === 'ENOENT') {
      // File doesn't exist, create it with default data
      await writeJson(collection, defaultData);
      return defaultData;
    }
    console.error(`Error reading ${collection}.json:`, error);
    throw error;
  }
};

/**
 * Writes data to a JSON file.
 */
export const writeJson = async <T>(collection: string, data: T): Promise<void> => {
  const filePath = path.join(DATA_DIR, `${collection}.json`);
  const dirPath = path.dirname(filePath);
  await ensureDir(dirPath);
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
};
