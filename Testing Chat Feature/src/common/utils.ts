import passwordHash = require('password-hash');

import type { Optional } from '../types';

/**
 * generate hash from password or string
 * @param {string} password
 * @returns {string}
 */
export function generateHash(password: string): string {
  console.log("Im here");
  return passwordHash.generate(password);
}

export function getCharacterString() {
  return 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
}

/**
 * validate text with hash
 * @param {string} password
 * @param {string} hash
 * @returns {Promise<boolean>}
 */
export function validateHash(
  password: Optional<string>,
  hash: Optional<string>,
): Promise<boolean> {
  if (!password || !hash) {
    return Promise.resolve(false);
  }
  return passwordHash.verify(password, hash);
}

export function stringEncode(valueToEncode, numberOfTimes): Promise<string> {
  for (let i = 0; i < numberOfTimes; i++) {
    valueToEncode = Buffer.from(valueToEncode, 'utf8').toString('base64');
  }
  return valueToEncode;
}

export function stringDecode(valueToDecode, numberOfTimes): string {
  for (let i = 0; i < numberOfTimes; i++) {
    valueToDecode = Buffer.from(valueToDecode, 'base64').toString('utf8');
  }
  return valueToDecode;
}

export function getVariableName<TResult>(getVar: () => TResult): string {
  const m = /\(\)=>(.*)/.exec(
    getVar.toString().replace(/(\r\n|\n|\r|\s)/gm, ''),
  );

  if (!m) {
    throw new Error(
      "The function does not contain a statement matching 'return variableName;'",
    );
  }

  const fullMemberName = m[1];

  const memberParts = fullMemberName.split('.');

  return memberParts[memberParts.length - 1];
}

// export const getAllPermissionsOfUsers = () =>
//  const permissions = AllTables.map((t)=>{

//  })
//   return [];
// };
