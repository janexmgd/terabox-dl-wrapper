import path from 'path';
import fs from 'fs';

const processItemRecursively = (item, currentPath = '') => {
  const results = [];

  try {
    const fullPath = path.join(currentPath, item.filename);

    if (item.is_dir === '1' || item.is_dir === 1) {
      if (item.children && item.children.length > 0) {
        item.children.forEach((child) => {
          results.push(
            ...processItemRecursively(
              child,
              // Perbaikan disini, gunakan fullPath sebagai currentPath
              fullPath
            )
          );
        });
      }
    } else {
      // Perubahan: hapus properti 'children' dari item sebelum ditambahkan ke results
      const { children, ...itemWithoutChildren } = item;
      const fileObject = {
        ...itemWithoutChildren,
        path: fullPath,
      };
      results.push(fileObject);
    }
  } catch (error) {
    console.error(`Error processing item: ${error.message}`);
  }

  return results;
};
export default processItemRecursively;
