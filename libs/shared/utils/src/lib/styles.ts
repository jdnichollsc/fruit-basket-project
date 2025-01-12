import clsx, { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const replaceNewLinesWithSpaces = (str: string) => {
  return str.replace(/\s{2,}/g, ' ').trim();
};

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(replaceNewLinesWithSpaces(clsx(inputs)));
}; 