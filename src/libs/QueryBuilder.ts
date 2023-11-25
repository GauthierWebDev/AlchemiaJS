class QueryBuilder {
  protected static tableName: string = "undefined_table_name";

  private static instructions: AlchemiaQueryBuilderInstructions = {
    select: [],
    where: [],
    orWhere: [],
    join: [],
    on: [],
    groupBy: [],
    having: [],
    orderBy: [],
    limit: [],
  };

  private static params: any[] = [];

  private static addParam(param: any) {
    this.params.push(param);
    return "$" + this.params.length.toString();
  }

  private static addFields(
    instruction: AlchemiaQueryBuilderInstruction,
    fields: AlchemiaQueryBuilderField[],
    terminator?: string
  ) {
    fields.forEach((field) => {
      const instructionParts: string[] = [];

      instructionParts.push(this.addParam(field));
      if (terminator) instructionParts.push(terminator);

      instruction.push(instructionParts.join(" "));
    });
  }

  public static select(...fields: string[]) {
    this.addFields(this.instructions.select, fields);
    return this;
  }

  public static where(field: string, value: any): typeof QueryBuilder;
  public static where(
    field: string,
    operator: string,
    value: any
  ): typeof QueryBuilder;
  public static where(...args: any[]): typeof QueryBuilder {
    let field: string = "";
    let operator: string = "";
    let value: any = "";

    if (args.length === 2) {
      [field, value] = args;
      operator = "=";
    } else if (args.length === 3) {
      [field, operator, value] = args;
    }

    const instructionParts: string[] = [];
    instructionParts.push(this.addParam(field));
    instructionParts.push(operator);
    instructionParts.push(this.addParam(value));

    this.instructions.where.push(instructionParts.join(" "));

    return this;
  }

  public static first() {
    this.instructions.limit.push("1");
    return this;
  }

  private static buildSQL() {
    const select = this.instructions.select.join(", ");
    const where = this.instructions.where.join(" AND ");
    const groupBy = this.instructions.groupBy.join(", ");
    const having = this.instructions.having.join(", ");
    const orderBy = this.instructions.orderBy.join(", ");
    const limit = this.instructions.limit.join(", ");

    const sqlParts: string[] = [];

    if (select) sqlParts.push(`SELECT ${select}`);
    else sqlParts.push(`SELECT *`);

    sqlParts.push(`FROM "${this.tableName}"`);

    if (where) sqlParts.push(`WHERE ${where}`);
    if (groupBy) sqlParts.push(`GROUP BY ${groupBy}`);
    if (having) sqlParts.push(`HAVING ${having}`);
    if (orderBy) sqlParts.push(`ORDER BY ${orderBy}`);
    if (limit) sqlParts.push(`LIMIT ${limit}`);

    return sqlParts.join(" ");
  }

  public static async please() {
    const sql = this.buildSQL();
    // TODO: Send SQL query to database
    console.log("TODO: Send SQL query to database");
    return this.toSQL();
  }

  public static toSQL() {
    const sql = this.buildSQL();
    return {
      query: sql,
      params: this.params,
    };
  }
}

export default QueryBuilder;
