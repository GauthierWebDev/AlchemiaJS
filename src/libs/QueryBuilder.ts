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

  private static addFields(
    instruction: AlchemiaQueryBuilderInstruction,
    fields: AlchemiaQueryBuilderField[],
    terminator?: string
  ) {
    fields.forEach((field) => {
      const instructionParts: string[] = [];

      this.params.push(field);
      instructionParts.push("$" + this.params.length.toString());
      if (terminator) instructionParts.push(terminator);

      instruction.push(instructionParts.join(" "));
    });
  }

  public static select(...fields: string[]) {
    this.addFields(this.instructions.select, fields);
    return this;
  }

  // public static where(field: string, value: any) {}
  public static where(field: string, operator: string, value: any) {
    this.params.push(value);
    this.instructions.where.push(
      `${field} ${operator} $${this.params.length.toString()}`
    );
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
    return sql;
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
