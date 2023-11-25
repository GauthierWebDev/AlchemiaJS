import database from "@/database";
import type Model from "./Model";

const defaultInstructions: AlchemiaQueryBuilderInstructions = {
  select: [],
  joinSelect: [],
  where: [],
  orWhere: [],
  join: [],
  on: [],
  groupBy: [],
  having: [],
  orderBy: [],
  limit: [],
};

class QueryBuilder {
  private static database = database;

  protected static tableName: string = "undefined_table_name";
  private static instructions = structuredClone(defaultInstructions);

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

  protected static hasMany<RelatedModel extends Model>(
    relatedModel: { new (): RelatedModel } & typeof Model
  ): QueryBuilder;
  protected static hasMany<RelatedModel extends Model>(
    relatedModel: { new (): RelatedModel } & typeof Model,
    foreignKey: string
  ): QueryBuilder;
  protected static hasMany<RelatedModel extends Model>(
    relatedModel: { new (): RelatedModel } & typeof Model,
    foreignKey: string,
    localKey: string
  ): QueryBuilder;
  protected static hasMany<RelatedModel extends Model>(
    relatedModel: { new (): RelatedModel } & typeof Model,
    foreignKey?: string,
    localKey?: string
  ) {
    const relatedTableName = relatedModel.tableName;
    const localTableName = this.tableName;

    foreignKey = foreignKey || `${localTableName}_id`;
    localKey = localKey || "id";

    const instructionParts: string[] = [];
    instructionParts.push("LEFT JOIN");
    instructionParts.push(`"${relatedTableName}"`);
    instructionParts.push("ON");
    instructionParts.push(`"${localTableName}"."${localKey}"`);
    instructionParts.push("=");
    instructionParts.push(`"${relatedTableName}"."${foreignKey}"`);
    this.instructions.join.push(instructionParts.join(" "));

    this.instructions.joinSelect.push(
      this.database.jsonRelationSyntax(relatedTableName)
    );

    return this;
  }

  public static with(relationMethod: Function): typeof QueryBuilder {
    relationMethod.bind(this)();

    return this;
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

  public static orWhere(field: string, value: any): typeof QueryBuilder;
  public static orWhere(
    field: string,
    operator: string,
    value: any
  ): typeof QueryBuilder;
  public static orWhere(...args: any[]): typeof QueryBuilder {
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

    this.instructions.orWhere.push(instructionParts.join(" "));

    return this;
  }

  public static orderBy(field: string): typeof QueryBuilder;
  public static orderBy(field: string, direction: string): typeof QueryBuilder;
  public static orderBy(...args: any[]): typeof QueryBuilder {
    let field: string = "";
    let direction: string = "";

    if (args.length === 1) {
      [field] = args;
      direction = "ASC";
    } else if (args.length === 2) {
      [field, direction] = args;
    }

    const instructionParts: string[] = [];
    instructionParts.push(this.addParam(field));
    instructionParts.push(direction);

    this.instructions.orderBy.push(instructionParts.join(" "));

    return this;
  }

  public static first(): typeof QueryBuilder {
    this.instructions.limit.push("1");
    return this;
  }

  private static buildSQL(): string {
    const select = this.instructions.select;
    const joinSelect = this.instructions.joinSelect;
    const where = this.instructions.where.join(" AND ");
    const join = this.instructions.join.join(" ");
    const groupBy = this.instructions.groupBy.join(", ");
    const having = this.instructions.having.join(", ");
    const orderBy = this.instructions.orderBy.join(", ");
    const limit = this.instructions.limit.join(", ");

    const selects = [];

    if (select.length === 0) selects.push(`"${this.tableName}".*`);
    if (joinSelect.length > 0) selects.push(...joinSelect);

    const sqlParts: string[] = [];

    sqlParts.push(`SELECT ${selects.join(", ")}`);
    sqlParts.push(`FROM "${this.tableName}"`);

    if (where) sqlParts.push(`WHERE ${where}`);
    if (join) sqlParts.push(join);
    if (groupBy) sqlParts.push(`GROUP BY ${groupBy}`);
    if (having) sqlParts.push(`HAVING ${having}`);
    if (orderBy) sqlParts.push(`ORDER BY ${orderBy}`);
    if (limit) sqlParts.push(`LIMIT ${limit}`);

    return sqlParts.join(" ");
  }

  // TODO: Add types
  public static async please(): Promise<any> {
    const sql = this.buildSQL();
    const params = this.params;

    const rows = await this.database.query(sql, params);
    this.instructions = structuredClone(defaultInstructions);

    return rows;
  }

  public static toSQL(): AlchemiaQueryBuilderSQL {
    const sql = this.buildSQL();
    return {
      query: sql,
      params: this.params,
    };
  }
}

export default QueryBuilder;