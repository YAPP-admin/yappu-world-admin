export const getTypeName = (type: string) => {
  switch (type) {
    case 'OPERATION':
    case '운영':
      return '운영';
    case 'SESSION':
    case '세션':
      return '세션';
    default:
      return '';
  }
};
