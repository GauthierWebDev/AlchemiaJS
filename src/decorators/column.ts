const column = (columnType: string) => {
  return (target: any, key: string) => {
    if (!target.constructor._columns) target.constructor._columns = {};
    target.constructor._columns[key] = columnType;
  };
};

export default column;
