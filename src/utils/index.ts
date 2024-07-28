/**
 * 根据传入的日期格式返回当前日期
 * @param dateFormat 日期格式
 * @returns 格式化后的当前日期
 */
export function getCurrentDate(dateFormat: string,date:unknown=null): string {
  const now = date instanceof Date ? new Date(date) : new Date();

  const formatDatePart = (part: number): string => {
    return part.toString().padStart(2, '0');
  };

  const year = now.getFullYear().toString();
  const month = formatDatePart(now.getMonth() + 1);
  const day = formatDatePart(now.getDate());
  const hours = formatDatePart(now.getHours());
  const minutes = formatDatePart(now.getMinutes());
  const seconds = formatDatePart(now.getSeconds());

  return dateFormat
    .replace('yyyy', year)
    .replace('MM', month)
    .replace('dd', day)
    .replace('HH', hours)
    .replace('mm', minutes)
    .replace('ss', seconds);
}

export function deepClone<T>(obj: T): T {
  // 如果是null或者undefined，直接返回
  if (obj === null || obj === undefined) {
    return obj;
  }

  // 处理 Date 对象
  if (obj instanceof Date) {
    return new Date(obj.getTime()) as any;
  }

  // 处理数组
  if (Array.isArray(obj)) {
    const arrCopy: any[] = [];
    obj.forEach((item, index) => {
      arrCopy[index] = deepClone(item);
    });
    return arrCopy as any;
  }

  // 处理对象
  if (typeof obj === 'object') {
    const objCopy: { [key: string]: any } = {};
    Object.keys(obj).forEach((key) => {
      objCopy[key] = deepClone((obj as { [key: string]: any })[key]);
    });
    return objCopy as T;
  }

  // 处理基本类型 (string, number, boolean, etc.)
  return obj;
}