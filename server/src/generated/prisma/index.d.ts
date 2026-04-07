
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Artifact
 * 
 */
export type Artifact = $Result.DefaultSelection<Prisma.$ArtifactPayload>
/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Conversation
 * 
 */
export type Conversation = $Result.DefaultSelection<Prisma.$ConversationPayload>
/**
 * Model Message
 * 
 */
export type Message = $Result.DefaultSelection<Prisma.$MessagePayload>
/**
 * Model OAuthToken
 * 
 */
export type OAuthToken = $Result.DefaultSelection<Prisma.$OAuthTokenPayload>
/**
 * Model WorkflowRun
 * 
 */
export type WorkflowRun = $Result.DefaultSelection<Prisma.$WorkflowRunPayload>
/**
 * Model WorkflowStep
 * 
 */
export type WorkflowStep = $Result.DefaultSelection<Prisma.$WorkflowStepPayload>
/**
 * Model WorkflowEvent
 * 
 */
export type WorkflowEvent = $Result.DefaultSelection<Prisma.$WorkflowEventPayload>
/**
 * Model WorkflowCheckpoint
 * 
 */
export type WorkflowCheckpoint = $Result.DefaultSelection<Prisma.$WorkflowCheckpointPayload>
/**
 * Model RunMessage
 * 
 */
export type RunMessage = $Result.DefaultSelection<Prisma.$RunMessagePayload>

/**
 * Enums
 */
export namespace $Enums {
  export const WorkflowRunStatus: {
  planned: 'planned',
  running: 'running',
  success: 'success',
  failed: 'failed',
  cancelled: 'cancelled'
};

export type WorkflowRunStatus = (typeof WorkflowRunStatus)[keyof typeof WorkflowRunStatus]


export const WorkflowStepType: {
  plan: 'plan',
  execute: 'execute',
  validate: 'validate',
  finalize: 'finalize'
};

export type WorkflowStepType = (typeof WorkflowStepType)[keyof typeof WorkflowStepType]


export const WorkflowStepStatus: {
  planned: 'planned',
  running: 'running',
  success: 'success',
  failed: 'failed',
  skipped: 'skipped'
};

export type WorkflowStepStatus = (typeof WorkflowStepStatus)[keyof typeof WorkflowStepStatus]

}

export type WorkflowRunStatus = $Enums.WorkflowRunStatus

export const WorkflowRunStatus: typeof $Enums.WorkflowRunStatus

export type WorkflowStepType = $Enums.WorkflowStepType

export const WorkflowStepType: typeof $Enums.WorkflowStepType

export type WorkflowStepStatus = $Enums.WorkflowStepStatus

export const WorkflowStepStatus: typeof $Enums.WorkflowStepStatus

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Artifacts
 * const artifacts = await prisma.artifact.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more Artifacts
   * const artifacts = await prisma.artifact.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.artifact`: Exposes CRUD operations for the **Artifact** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Artifacts
    * const artifacts = await prisma.artifact.findMany()
    * ```
    */
  get artifact(): Prisma.ArtifactDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.conversation`: Exposes CRUD operations for the **Conversation** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Conversations
    * const conversations = await prisma.conversation.findMany()
    * ```
    */
  get conversation(): Prisma.ConversationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.message`: Exposes CRUD operations for the **Message** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Messages
    * const messages = await prisma.message.findMany()
    * ```
    */
  get message(): Prisma.MessageDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.oAuthToken`: Exposes CRUD operations for the **OAuthToken** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more OAuthTokens
    * const oAuthTokens = await prisma.oAuthToken.findMany()
    * ```
    */
  get oAuthToken(): Prisma.OAuthTokenDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.workflowRun`: Exposes CRUD operations for the **WorkflowRun** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more WorkflowRuns
    * const workflowRuns = await prisma.workflowRun.findMany()
    * ```
    */
  get workflowRun(): Prisma.WorkflowRunDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.workflowStep`: Exposes CRUD operations for the **WorkflowStep** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more WorkflowSteps
    * const workflowSteps = await prisma.workflowStep.findMany()
    * ```
    */
  get workflowStep(): Prisma.WorkflowStepDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.workflowEvent`: Exposes CRUD operations for the **WorkflowEvent** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more WorkflowEvents
    * const workflowEvents = await prisma.workflowEvent.findMany()
    * ```
    */
  get workflowEvent(): Prisma.WorkflowEventDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.workflowCheckpoint`: Exposes CRUD operations for the **WorkflowCheckpoint** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more WorkflowCheckpoints
    * const workflowCheckpoints = await prisma.workflowCheckpoint.findMany()
    * ```
    */
  get workflowCheckpoint(): Prisma.WorkflowCheckpointDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.runMessage`: Exposes CRUD operations for the **RunMessage** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RunMessages
    * const runMessages = await prisma.runMessage.findMany()
    * ```
    */
  get runMessage(): Prisma.RunMessageDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.5.0
   * Query Engine version: 280c870be64f457428992c43c1f6d557fab6e29e
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Artifact: 'Artifact',
    User: 'User',
    Conversation: 'Conversation',
    Message: 'Message',
    OAuthToken: 'OAuthToken',
    WorkflowRun: 'WorkflowRun',
    WorkflowStep: 'WorkflowStep',
    WorkflowEvent: 'WorkflowEvent',
    WorkflowCheckpoint: 'WorkflowCheckpoint',
    RunMessage: 'RunMessage'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "artifact" | "user" | "conversation" | "message" | "oAuthToken" | "workflowRun" | "workflowStep" | "workflowEvent" | "workflowCheckpoint" | "runMessage"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Artifact: {
        payload: Prisma.$ArtifactPayload<ExtArgs>
        fields: Prisma.ArtifactFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ArtifactFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArtifactPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ArtifactFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArtifactPayload>
          }
          findFirst: {
            args: Prisma.ArtifactFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArtifactPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ArtifactFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArtifactPayload>
          }
          findMany: {
            args: Prisma.ArtifactFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArtifactPayload>[]
          }
          create: {
            args: Prisma.ArtifactCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArtifactPayload>
          }
          createMany: {
            args: Prisma.ArtifactCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ArtifactCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArtifactPayload>[]
          }
          delete: {
            args: Prisma.ArtifactDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArtifactPayload>
          }
          update: {
            args: Prisma.ArtifactUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArtifactPayload>
          }
          deleteMany: {
            args: Prisma.ArtifactDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ArtifactUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ArtifactUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArtifactPayload>[]
          }
          upsert: {
            args: Prisma.ArtifactUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArtifactPayload>
          }
          aggregate: {
            args: Prisma.ArtifactAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateArtifact>
          }
          groupBy: {
            args: Prisma.ArtifactGroupByArgs<ExtArgs>
            result: $Utils.Optional<ArtifactGroupByOutputType>[]
          }
          count: {
            args: Prisma.ArtifactCountArgs<ExtArgs>
            result: $Utils.Optional<ArtifactCountAggregateOutputType> | number
          }
        }
      }
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Conversation: {
        payload: Prisma.$ConversationPayload<ExtArgs>
        fields: Prisma.ConversationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ConversationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ConversationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationPayload>
          }
          findFirst: {
            args: Prisma.ConversationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ConversationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationPayload>
          }
          findMany: {
            args: Prisma.ConversationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationPayload>[]
          }
          create: {
            args: Prisma.ConversationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationPayload>
          }
          createMany: {
            args: Prisma.ConversationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ConversationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationPayload>[]
          }
          delete: {
            args: Prisma.ConversationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationPayload>
          }
          update: {
            args: Prisma.ConversationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationPayload>
          }
          deleteMany: {
            args: Prisma.ConversationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ConversationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ConversationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationPayload>[]
          }
          upsert: {
            args: Prisma.ConversationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationPayload>
          }
          aggregate: {
            args: Prisma.ConversationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateConversation>
          }
          groupBy: {
            args: Prisma.ConversationGroupByArgs<ExtArgs>
            result: $Utils.Optional<ConversationGroupByOutputType>[]
          }
          count: {
            args: Prisma.ConversationCountArgs<ExtArgs>
            result: $Utils.Optional<ConversationCountAggregateOutputType> | number
          }
        }
      }
      Message: {
        payload: Prisma.$MessagePayload<ExtArgs>
        fields: Prisma.MessageFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MessageFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MessageFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          findFirst: {
            args: Prisma.MessageFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MessageFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          findMany: {
            args: Prisma.MessageFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>[]
          }
          create: {
            args: Prisma.MessageCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          createMany: {
            args: Prisma.MessageCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MessageCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>[]
          }
          delete: {
            args: Prisma.MessageDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          update: {
            args: Prisma.MessageUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          deleteMany: {
            args: Prisma.MessageDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MessageUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MessageUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>[]
          }
          upsert: {
            args: Prisma.MessageUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          aggregate: {
            args: Prisma.MessageAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMessage>
          }
          groupBy: {
            args: Prisma.MessageGroupByArgs<ExtArgs>
            result: $Utils.Optional<MessageGroupByOutputType>[]
          }
          count: {
            args: Prisma.MessageCountArgs<ExtArgs>
            result: $Utils.Optional<MessageCountAggregateOutputType> | number
          }
        }
      }
      OAuthToken: {
        payload: Prisma.$OAuthTokenPayload<ExtArgs>
        fields: Prisma.OAuthTokenFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OAuthTokenFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OAuthTokenPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OAuthTokenFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OAuthTokenPayload>
          }
          findFirst: {
            args: Prisma.OAuthTokenFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OAuthTokenPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OAuthTokenFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OAuthTokenPayload>
          }
          findMany: {
            args: Prisma.OAuthTokenFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OAuthTokenPayload>[]
          }
          create: {
            args: Prisma.OAuthTokenCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OAuthTokenPayload>
          }
          createMany: {
            args: Prisma.OAuthTokenCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.OAuthTokenCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OAuthTokenPayload>[]
          }
          delete: {
            args: Prisma.OAuthTokenDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OAuthTokenPayload>
          }
          update: {
            args: Prisma.OAuthTokenUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OAuthTokenPayload>
          }
          deleteMany: {
            args: Prisma.OAuthTokenDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OAuthTokenUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.OAuthTokenUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OAuthTokenPayload>[]
          }
          upsert: {
            args: Prisma.OAuthTokenUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OAuthTokenPayload>
          }
          aggregate: {
            args: Prisma.OAuthTokenAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOAuthToken>
          }
          groupBy: {
            args: Prisma.OAuthTokenGroupByArgs<ExtArgs>
            result: $Utils.Optional<OAuthTokenGroupByOutputType>[]
          }
          count: {
            args: Prisma.OAuthTokenCountArgs<ExtArgs>
            result: $Utils.Optional<OAuthTokenCountAggregateOutputType> | number
          }
        }
      }
      WorkflowRun: {
        payload: Prisma.$WorkflowRunPayload<ExtArgs>
        fields: Prisma.WorkflowRunFieldRefs
        operations: {
          findUnique: {
            args: Prisma.WorkflowRunFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkflowRunPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.WorkflowRunFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkflowRunPayload>
          }
          findFirst: {
            args: Prisma.WorkflowRunFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkflowRunPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.WorkflowRunFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkflowRunPayload>
          }
          findMany: {
            args: Prisma.WorkflowRunFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkflowRunPayload>[]
          }
          create: {
            args: Prisma.WorkflowRunCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkflowRunPayload>
          }
          createMany: {
            args: Prisma.WorkflowRunCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.WorkflowRunCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkflowRunPayload>[]
          }
          delete: {
            args: Prisma.WorkflowRunDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkflowRunPayload>
          }
          update: {
            args: Prisma.WorkflowRunUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkflowRunPayload>
          }
          deleteMany: {
            args: Prisma.WorkflowRunDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.WorkflowRunUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.WorkflowRunUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkflowRunPayload>[]
          }
          upsert: {
            args: Prisma.WorkflowRunUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkflowRunPayload>
          }
          aggregate: {
            args: Prisma.WorkflowRunAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateWorkflowRun>
          }
          groupBy: {
            args: Prisma.WorkflowRunGroupByArgs<ExtArgs>
            result: $Utils.Optional<WorkflowRunGroupByOutputType>[]
          }
          count: {
            args: Prisma.WorkflowRunCountArgs<ExtArgs>
            result: $Utils.Optional<WorkflowRunCountAggregateOutputType> | number
          }
        }
      }
      WorkflowStep: {
        payload: Prisma.$WorkflowStepPayload<ExtArgs>
        fields: Prisma.WorkflowStepFieldRefs
        operations: {
          findUnique: {
            args: Prisma.WorkflowStepFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkflowStepPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.WorkflowStepFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkflowStepPayload>
          }
          findFirst: {
            args: Prisma.WorkflowStepFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkflowStepPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.WorkflowStepFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkflowStepPayload>
          }
          findMany: {
            args: Prisma.WorkflowStepFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkflowStepPayload>[]
          }
          create: {
            args: Prisma.WorkflowStepCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkflowStepPayload>
          }
          createMany: {
            args: Prisma.WorkflowStepCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.WorkflowStepCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkflowStepPayload>[]
          }
          delete: {
            args: Prisma.WorkflowStepDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkflowStepPayload>
          }
          update: {
            args: Prisma.WorkflowStepUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkflowStepPayload>
          }
          deleteMany: {
            args: Prisma.WorkflowStepDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.WorkflowStepUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.WorkflowStepUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkflowStepPayload>[]
          }
          upsert: {
            args: Prisma.WorkflowStepUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkflowStepPayload>
          }
          aggregate: {
            args: Prisma.WorkflowStepAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateWorkflowStep>
          }
          groupBy: {
            args: Prisma.WorkflowStepGroupByArgs<ExtArgs>
            result: $Utils.Optional<WorkflowStepGroupByOutputType>[]
          }
          count: {
            args: Prisma.WorkflowStepCountArgs<ExtArgs>
            result: $Utils.Optional<WorkflowStepCountAggregateOutputType> | number
          }
        }
      }
      WorkflowEvent: {
        payload: Prisma.$WorkflowEventPayload<ExtArgs>
        fields: Prisma.WorkflowEventFieldRefs
        operations: {
          findUnique: {
            args: Prisma.WorkflowEventFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkflowEventPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.WorkflowEventFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkflowEventPayload>
          }
          findFirst: {
            args: Prisma.WorkflowEventFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkflowEventPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.WorkflowEventFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkflowEventPayload>
          }
          findMany: {
            args: Prisma.WorkflowEventFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkflowEventPayload>[]
          }
          create: {
            args: Prisma.WorkflowEventCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkflowEventPayload>
          }
          createMany: {
            args: Prisma.WorkflowEventCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.WorkflowEventCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkflowEventPayload>[]
          }
          delete: {
            args: Prisma.WorkflowEventDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkflowEventPayload>
          }
          update: {
            args: Prisma.WorkflowEventUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkflowEventPayload>
          }
          deleteMany: {
            args: Prisma.WorkflowEventDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.WorkflowEventUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.WorkflowEventUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkflowEventPayload>[]
          }
          upsert: {
            args: Prisma.WorkflowEventUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkflowEventPayload>
          }
          aggregate: {
            args: Prisma.WorkflowEventAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateWorkflowEvent>
          }
          groupBy: {
            args: Prisma.WorkflowEventGroupByArgs<ExtArgs>
            result: $Utils.Optional<WorkflowEventGroupByOutputType>[]
          }
          count: {
            args: Prisma.WorkflowEventCountArgs<ExtArgs>
            result: $Utils.Optional<WorkflowEventCountAggregateOutputType> | number
          }
        }
      }
      WorkflowCheckpoint: {
        payload: Prisma.$WorkflowCheckpointPayload<ExtArgs>
        fields: Prisma.WorkflowCheckpointFieldRefs
        operations: {
          findUnique: {
            args: Prisma.WorkflowCheckpointFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkflowCheckpointPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.WorkflowCheckpointFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkflowCheckpointPayload>
          }
          findFirst: {
            args: Prisma.WorkflowCheckpointFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkflowCheckpointPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.WorkflowCheckpointFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkflowCheckpointPayload>
          }
          findMany: {
            args: Prisma.WorkflowCheckpointFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkflowCheckpointPayload>[]
          }
          create: {
            args: Prisma.WorkflowCheckpointCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkflowCheckpointPayload>
          }
          createMany: {
            args: Prisma.WorkflowCheckpointCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.WorkflowCheckpointCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkflowCheckpointPayload>[]
          }
          delete: {
            args: Prisma.WorkflowCheckpointDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkflowCheckpointPayload>
          }
          update: {
            args: Prisma.WorkflowCheckpointUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkflowCheckpointPayload>
          }
          deleteMany: {
            args: Prisma.WorkflowCheckpointDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.WorkflowCheckpointUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.WorkflowCheckpointUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkflowCheckpointPayload>[]
          }
          upsert: {
            args: Prisma.WorkflowCheckpointUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkflowCheckpointPayload>
          }
          aggregate: {
            args: Prisma.WorkflowCheckpointAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateWorkflowCheckpoint>
          }
          groupBy: {
            args: Prisma.WorkflowCheckpointGroupByArgs<ExtArgs>
            result: $Utils.Optional<WorkflowCheckpointGroupByOutputType>[]
          }
          count: {
            args: Prisma.WorkflowCheckpointCountArgs<ExtArgs>
            result: $Utils.Optional<WorkflowCheckpointCountAggregateOutputType> | number
          }
        }
      }
      RunMessage: {
        payload: Prisma.$RunMessagePayload<ExtArgs>
        fields: Prisma.RunMessageFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RunMessageFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RunMessagePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RunMessageFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RunMessagePayload>
          }
          findFirst: {
            args: Prisma.RunMessageFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RunMessagePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RunMessageFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RunMessagePayload>
          }
          findMany: {
            args: Prisma.RunMessageFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RunMessagePayload>[]
          }
          create: {
            args: Prisma.RunMessageCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RunMessagePayload>
          }
          createMany: {
            args: Prisma.RunMessageCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RunMessageCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RunMessagePayload>[]
          }
          delete: {
            args: Prisma.RunMessageDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RunMessagePayload>
          }
          update: {
            args: Prisma.RunMessageUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RunMessagePayload>
          }
          deleteMany: {
            args: Prisma.RunMessageDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RunMessageUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RunMessageUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RunMessagePayload>[]
          }
          upsert: {
            args: Prisma.RunMessageUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RunMessagePayload>
          }
          aggregate: {
            args: Prisma.RunMessageAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRunMessage>
          }
          groupBy: {
            args: Prisma.RunMessageGroupByArgs<ExtArgs>
            result: $Utils.Optional<RunMessageGroupByOutputType>[]
          }
          count: {
            args: Prisma.RunMessageCountArgs<ExtArgs>
            result: $Utils.Optional<RunMessageCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    artifact?: ArtifactOmit
    user?: UserOmit
    conversation?: ConversationOmit
    message?: MessageOmit
    oAuthToken?: OAuthTokenOmit
    workflowRun?: WorkflowRunOmit
    workflowStep?: WorkflowStepOmit
    workflowEvent?: WorkflowEventOmit
    workflowCheckpoint?: WorkflowCheckpointOmit
    runMessage?: RunMessageOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    conversations: number
    oauthTokens: number
    artifacts: number
    workflowRuns: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    conversations?: boolean | UserCountOutputTypeCountConversationsArgs
    oauthTokens?: boolean | UserCountOutputTypeCountOauthTokensArgs
    artifacts?: boolean | UserCountOutputTypeCountArtifactsArgs
    workflowRuns?: boolean | UserCountOutputTypeCountWorkflowRunsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountConversationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ConversationWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountOauthTokensArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OAuthTokenWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountArtifactsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ArtifactWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountWorkflowRunsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WorkflowRunWhereInput
  }


  /**
   * Count Type ConversationCountOutputType
   */

  export type ConversationCountOutputType = {
    messages: number
    workflowRuns: number
  }

  export type ConversationCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    messages?: boolean | ConversationCountOutputTypeCountMessagesArgs
    workflowRuns?: boolean | ConversationCountOutputTypeCountWorkflowRunsArgs
  }

  // Custom InputTypes
  /**
   * ConversationCountOutputType without action
   */
  export type ConversationCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConversationCountOutputType
     */
    select?: ConversationCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ConversationCountOutputType without action
   */
  export type ConversationCountOutputTypeCountMessagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MessageWhereInput
  }

  /**
   * ConversationCountOutputType without action
   */
  export type ConversationCountOutputTypeCountWorkflowRunsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WorkflowRunWhereInput
  }


  /**
   * Count Type WorkflowRunCountOutputType
   */

  export type WorkflowRunCountOutputType = {
    steps: number
    events: number
    checkpoints: number
    messages: number
  }

  export type WorkflowRunCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    steps?: boolean | WorkflowRunCountOutputTypeCountStepsArgs
    events?: boolean | WorkflowRunCountOutputTypeCountEventsArgs
    checkpoints?: boolean | WorkflowRunCountOutputTypeCountCheckpointsArgs
    messages?: boolean | WorkflowRunCountOutputTypeCountMessagesArgs
  }

  // Custom InputTypes
  /**
   * WorkflowRunCountOutputType without action
   */
  export type WorkflowRunCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowRunCountOutputType
     */
    select?: WorkflowRunCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * WorkflowRunCountOutputType without action
   */
  export type WorkflowRunCountOutputTypeCountStepsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WorkflowStepWhereInput
  }

  /**
   * WorkflowRunCountOutputType without action
   */
  export type WorkflowRunCountOutputTypeCountEventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WorkflowEventWhereInput
  }

  /**
   * WorkflowRunCountOutputType without action
   */
  export type WorkflowRunCountOutputTypeCountCheckpointsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WorkflowCheckpointWhereInput
  }

  /**
   * WorkflowRunCountOutputType without action
   */
  export type WorkflowRunCountOutputTypeCountMessagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RunMessageWhereInput
  }


  /**
   * Count Type WorkflowStepCountOutputType
   */

  export type WorkflowStepCountOutputType = {
    events: number
    checkpoints: number
  }

  export type WorkflowStepCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    events?: boolean | WorkflowStepCountOutputTypeCountEventsArgs
    checkpoints?: boolean | WorkflowStepCountOutputTypeCountCheckpointsArgs
  }

  // Custom InputTypes
  /**
   * WorkflowStepCountOutputType without action
   */
  export type WorkflowStepCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowStepCountOutputType
     */
    select?: WorkflowStepCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * WorkflowStepCountOutputType without action
   */
  export type WorkflowStepCountOutputTypeCountEventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WorkflowEventWhereInput
  }

  /**
   * WorkflowStepCountOutputType without action
   */
  export type WorkflowStepCountOutputTypeCountCheckpointsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WorkflowCheckpointWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Artifact
   */

  export type AggregateArtifact = {
    _count: ArtifactCountAggregateOutputType | null
    _min: ArtifactMinAggregateOutputType | null
    _max: ArtifactMaxAggregateOutputType | null
  }

  export type ArtifactMinAggregateOutputType = {
    id: string | null
    userId: string | null
    type: string | null
    name: string | null
    mimeType: string | null
    storagePath: string | null
    textContent: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ArtifactMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    type: string | null
    name: string | null
    mimeType: string | null
    storagePath: string | null
    textContent: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ArtifactCountAggregateOutputType = {
    id: number
    userId: number
    type: number
    name: number
    mimeType: number
    storagePath: number
    textContent: number
    jsonContent: number
    metadata: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ArtifactMinAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    name?: true
    mimeType?: true
    storagePath?: true
    textContent?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ArtifactMaxAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    name?: true
    mimeType?: true
    storagePath?: true
    textContent?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ArtifactCountAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    name?: true
    mimeType?: true
    storagePath?: true
    textContent?: true
    jsonContent?: true
    metadata?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ArtifactAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Artifact to aggregate.
     */
    where?: ArtifactWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Artifacts to fetch.
     */
    orderBy?: ArtifactOrderByWithRelationInput | ArtifactOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ArtifactWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Artifacts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Artifacts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Artifacts
    **/
    _count?: true | ArtifactCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ArtifactMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ArtifactMaxAggregateInputType
  }

  export type GetArtifactAggregateType<T extends ArtifactAggregateArgs> = {
        [P in keyof T & keyof AggregateArtifact]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateArtifact[P]>
      : GetScalarType<T[P], AggregateArtifact[P]>
  }




  export type ArtifactGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ArtifactWhereInput
    orderBy?: ArtifactOrderByWithAggregationInput | ArtifactOrderByWithAggregationInput[]
    by: ArtifactScalarFieldEnum[] | ArtifactScalarFieldEnum
    having?: ArtifactScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ArtifactCountAggregateInputType | true
    _min?: ArtifactMinAggregateInputType
    _max?: ArtifactMaxAggregateInputType
  }

  export type ArtifactGroupByOutputType = {
    id: string
    userId: string
    type: string
    name: string | null
    mimeType: string | null
    storagePath: string | null
    textContent: string | null
    jsonContent: JsonValue | null
    metadata: JsonValue | null
    createdAt: Date
    updatedAt: Date
    _count: ArtifactCountAggregateOutputType | null
    _min: ArtifactMinAggregateOutputType | null
    _max: ArtifactMaxAggregateOutputType | null
  }

  type GetArtifactGroupByPayload<T extends ArtifactGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ArtifactGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ArtifactGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ArtifactGroupByOutputType[P]>
            : GetScalarType<T[P], ArtifactGroupByOutputType[P]>
        }
      >
    >


  export type ArtifactSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    type?: boolean
    name?: boolean
    mimeType?: boolean
    storagePath?: boolean
    textContent?: boolean
    jsonContent?: boolean
    metadata?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["artifact"]>

  export type ArtifactSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    type?: boolean
    name?: boolean
    mimeType?: boolean
    storagePath?: boolean
    textContent?: boolean
    jsonContent?: boolean
    metadata?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["artifact"]>

  export type ArtifactSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    type?: boolean
    name?: boolean
    mimeType?: boolean
    storagePath?: boolean
    textContent?: boolean
    jsonContent?: boolean
    metadata?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["artifact"]>

  export type ArtifactSelectScalar = {
    id?: boolean
    userId?: boolean
    type?: boolean
    name?: boolean
    mimeType?: boolean
    storagePath?: boolean
    textContent?: boolean
    jsonContent?: boolean
    metadata?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ArtifactOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "type" | "name" | "mimeType" | "storagePath" | "textContent" | "jsonContent" | "metadata" | "createdAt" | "updatedAt", ExtArgs["result"]["artifact"]>
  export type ArtifactInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ArtifactIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ArtifactIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $ArtifactPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Artifact"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      type: string
      name: string | null
      mimeType: string | null
      storagePath: string | null
      textContent: string | null
      jsonContent: Prisma.JsonValue | null
      metadata: Prisma.JsonValue | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["artifact"]>
    composites: {}
  }

  type ArtifactGetPayload<S extends boolean | null | undefined | ArtifactDefaultArgs> = $Result.GetResult<Prisma.$ArtifactPayload, S>

  type ArtifactCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ArtifactFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ArtifactCountAggregateInputType | true
    }

  export interface ArtifactDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Artifact'], meta: { name: 'Artifact' } }
    /**
     * Find zero or one Artifact that matches the filter.
     * @param {ArtifactFindUniqueArgs} args - Arguments to find a Artifact
     * @example
     * // Get one Artifact
     * const artifact = await prisma.artifact.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ArtifactFindUniqueArgs>(args: SelectSubset<T, ArtifactFindUniqueArgs<ExtArgs>>): Prisma__ArtifactClient<$Result.GetResult<Prisma.$ArtifactPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Artifact that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ArtifactFindUniqueOrThrowArgs} args - Arguments to find a Artifact
     * @example
     * // Get one Artifact
     * const artifact = await prisma.artifact.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ArtifactFindUniqueOrThrowArgs>(args: SelectSubset<T, ArtifactFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ArtifactClient<$Result.GetResult<Prisma.$ArtifactPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Artifact that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArtifactFindFirstArgs} args - Arguments to find a Artifact
     * @example
     * // Get one Artifact
     * const artifact = await prisma.artifact.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ArtifactFindFirstArgs>(args?: SelectSubset<T, ArtifactFindFirstArgs<ExtArgs>>): Prisma__ArtifactClient<$Result.GetResult<Prisma.$ArtifactPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Artifact that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArtifactFindFirstOrThrowArgs} args - Arguments to find a Artifact
     * @example
     * // Get one Artifact
     * const artifact = await prisma.artifact.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ArtifactFindFirstOrThrowArgs>(args?: SelectSubset<T, ArtifactFindFirstOrThrowArgs<ExtArgs>>): Prisma__ArtifactClient<$Result.GetResult<Prisma.$ArtifactPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Artifacts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArtifactFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Artifacts
     * const artifacts = await prisma.artifact.findMany()
     * 
     * // Get first 10 Artifacts
     * const artifacts = await prisma.artifact.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const artifactWithIdOnly = await prisma.artifact.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ArtifactFindManyArgs>(args?: SelectSubset<T, ArtifactFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ArtifactPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Artifact.
     * @param {ArtifactCreateArgs} args - Arguments to create a Artifact.
     * @example
     * // Create one Artifact
     * const Artifact = await prisma.artifact.create({
     *   data: {
     *     // ... data to create a Artifact
     *   }
     * })
     * 
     */
    create<T extends ArtifactCreateArgs>(args: SelectSubset<T, ArtifactCreateArgs<ExtArgs>>): Prisma__ArtifactClient<$Result.GetResult<Prisma.$ArtifactPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Artifacts.
     * @param {ArtifactCreateManyArgs} args - Arguments to create many Artifacts.
     * @example
     * // Create many Artifacts
     * const artifact = await prisma.artifact.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ArtifactCreateManyArgs>(args?: SelectSubset<T, ArtifactCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Artifacts and returns the data saved in the database.
     * @param {ArtifactCreateManyAndReturnArgs} args - Arguments to create many Artifacts.
     * @example
     * // Create many Artifacts
     * const artifact = await prisma.artifact.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Artifacts and only return the `id`
     * const artifactWithIdOnly = await prisma.artifact.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ArtifactCreateManyAndReturnArgs>(args?: SelectSubset<T, ArtifactCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ArtifactPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Artifact.
     * @param {ArtifactDeleteArgs} args - Arguments to delete one Artifact.
     * @example
     * // Delete one Artifact
     * const Artifact = await prisma.artifact.delete({
     *   where: {
     *     // ... filter to delete one Artifact
     *   }
     * })
     * 
     */
    delete<T extends ArtifactDeleteArgs>(args: SelectSubset<T, ArtifactDeleteArgs<ExtArgs>>): Prisma__ArtifactClient<$Result.GetResult<Prisma.$ArtifactPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Artifact.
     * @param {ArtifactUpdateArgs} args - Arguments to update one Artifact.
     * @example
     * // Update one Artifact
     * const artifact = await prisma.artifact.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ArtifactUpdateArgs>(args: SelectSubset<T, ArtifactUpdateArgs<ExtArgs>>): Prisma__ArtifactClient<$Result.GetResult<Prisma.$ArtifactPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Artifacts.
     * @param {ArtifactDeleteManyArgs} args - Arguments to filter Artifacts to delete.
     * @example
     * // Delete a few Artifacts
     * const { count } = await prisma.artifact.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ArtifactDeleteManyArgs>(args?: SelectSubset<T, ArtifactDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Artifacts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArtifactUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Artifacts
     * const artifact = await prisma.artifact.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ArtifactUpdateManyArgs>(args: SelectSubset<T, ArtifactUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Artifacts and returns the data updated in the database.
     * @param {ArtifactUpdateManyAndReturnArgs} args - Arguments to update many Artifacts.
     * @example
     * // Update many Artifacts
     * const artifact = await prisma.artifact.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Artifacts and only return the `id`
     * const artifactWithIdOnly = await prisma.artifact.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ArtifactUpdateManyAndReturnArgs>(args: SelectSubset<T, ArtifactUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ArtifactPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Artifact.
     * @param {ArtifactUpsertArgs} args - Arguments to update or create a Artifact.
     * @example
     * // Update or create a Artifact
     * const artifact = await prisma.artifact.upsert({
     *   create: {
     *     // ... data to create a Artifact
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Artifact we want to update
     *   }
     * })
     */
    upsert<T extends ArtifactUpsertArgs>(args: SelectSubset<T, ArtifactUpsertArgs<ExtArgs>>): Prisma__ArtifactClient<$Result.GetResult<Prisma.$ArtifactPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Artifacts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArtifactCountArgs} args - Arguments to filter Artifacts to count.
     * @example
     * // Count the number of Artifacts
     * const count = await prisma.artifact.count({
     *   where: {
     *     // ... the filter for the Artifacts we want to count
     *   }
     * })
    **/
    count<T extends ArtifactCountArgs>(
      args?: Subset<T, ArtifactCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ArtifactCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Artifact.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArtifactAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ArtifactAggregateArgs>(args: Subset<T, ArtifactAggregateArgs>): Prisma.PrismaPromise<GetArtifactAggregateType<T>>

    /**
     * Group by Artifact.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArtifactGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ArtifactGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ArtifactGroupByArgs['orderBy'] }
        : { orderBy?: ArtifactGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ArtifactGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetArtifactGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Artifact model
   */
  readonly fields: ArtifactFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Artifact.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ArtifactClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Artifact model
   */
  interface ArtifactFieldRefs {
    readonly id: FieldRef<"Artifact", 'String'>
    readonly userId: FieldRef<"Artifact", 'String'>
    readonly type: FieldRef<"Artifact", 'String'>
    readonly name: FieldRef<"Artifact", 'String'>
    readonly mimeType: FieldRef<"Artifact", 'String'>
    readonly storagePath: FieldRef<"Artifact", 'String'>
    readonly textContent: FieldRef<"Artifact", 'String'>
    readonly jsonContent: FieldRef<"Artifact", 'Json'>
    readonly metadata: FieldRef<"Artifact", 'Json'>
    readonly createdAt: FieldRef<"Artifact", 'DateTime'>
    readonly updatedAt: FieldRef<"Artifact", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Artifact findUnique
   */
  export type ArtifactFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Artifact
     */
    select?: ArtifactSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Artifact
     */
    omit?: ArtifactOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArtifactInclude<ExtArgs> | null
    /**
     * Filter, which Artifact to fetch.
     */
    where: ArtifactWhereUniqueInput
  }

  /**
   * Artifact findUniqueOrThrow
   */
  export type ArtifactFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Artifact
     */
    select?: ArtifactSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Artifact
     */
    omit?: ArtifactOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArtifactInclude<ExtArgs> | null
    /**
     * Filter, which Artifact to fetch.
     */
    where: ArtifactWhereUniqueInput
  }

  /**
   * Artifact findFirst
   */
  export type ArtifactFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Artifact
     */
    select?: ArtifactSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Artifact
     */
    omit?: ArtifactOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArtifactInclude<ExtArgs> | null
    /**
     * Filter, which Artifact to fetch.
     */
    where?: ArtifactWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Artifacts to fetch.
     */
    orderBy?: ArtifactOrderByWithRelationInput | ArtifactOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Artifacts.
     */
    cursor?: ArtifactWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Artifacts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Artifacts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Artifacts.
     */
    distinct?: ArtifactScalarFieldEnum | ArtifactScalarFieldEnum[]
  }

  /**
   * Artifact findFirstOrThrow
   */
  export type ArtifactFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Artifact
     */
    select?: ArtifactSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Artifact
     */
    omit?: ArtifactOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArtifactInclude<ExtArgs> | null
    /**
     * Filter, which Artifact to fetch.
     */
    where?: ArtifactWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Artifacts to fetch.
     */
    orderBy?: ArtifactOrderByWithRelationInput | ArtifactOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Artifacts.
     */
    cursor?: ArtifactWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Artifacts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Artifacts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Artifacts.
     */
    distinct?: ArtifactScalarFieldEnum | ArtifactScalarFieldEnum[]
  }

  /**
   * Artifact findMany
   */
  export type ArtifactFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Artifact
     */
    select?: ArtifactSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Artifact
     */
    omit?: ArtifactOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArtifactInclude<ExtArgs> | null
    /**
     * Filter, which Artifacts to fetch.
     */
    where?: ArtifactWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Artifacts to fetch.
     */
    orderBy?: ArtifactOrderByWithRelationInput | ArtifactOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Artifacts.
     */
    cursor?: ArtifactWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Artifacts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Artifacts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Artifacts.
     */
    distinct?: ArtifactScalarFieldEnum | ArtifactScalarFieldEnum[]
  }

  /**
   * Artifact create
   */
  export type ArtifactCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Artifact
     */
    select?: ArtifactSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Artifact
     */
    omit?: ArtifactOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArtifactInclude<ExtArgs> | null
    /**
     * The data needed to create a Artifact.
     */
    data: XOR<ArtifactCreateInput, ArtifactUncheckedCreateInput>
  }

  /**
   * Artifact createMany
   */
  export type ArtifactCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Artifacts.
     */
    data: ArtifactCreateManyInput | ArtifactCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Artifact createManyAndReturn
   */
  export type ArtifactCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Artifact
     */
    select?: ArtifactSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Artifact
     */
    omit?: ArtifactOmit<ExtArgs> | null
    /**
     * The data used to create many Artifacts.
     */
    data: ArtifactCreateManyInput | ArtifactCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArtifactIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Artifact update
   */
  export type ArtifactUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Artifact
     */
    select?: ArtifactSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Artifact
     */
    omit?: ArtifactOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArtifactInclude<ExtArgs> | null
    /**
     * The data needed to update a Artifact.
     */
    data: XOR<ArtifactUpdateInput, ArtifactUncheckedUpdateInput>
    /**
     * Choose, which Artifact to update.
     */
    where: ArtifactWhereUniqueInput
  }

  /**
   * Artifact updateMany
   */
  export type ArtifactUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Artifacts.
     */
    data: XOR<ArtifactUpdateManyMutationInput, ArtifactUncheckedUpdateManyInput>
    /**
     * Filter which Artifacts to update
     */
    where?: ArtifactWhereInput
    /**
     * Limit how many Artifacts to update.
     */
    limit?: number
  }

  /**
   * Artifact updateManyAndReturn
   */
  export type ArtifactUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Artifact
     */
    select?: ArtifactSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Artifact
     */
    omit?: ArtifactOmit<ExtArgs> | null
    /**
     * The data used to update Artifacts.
     */
    data: XOR<ArtifactUpdateManyMutationInput, ArtifactUncheckedUpdateManyInput>
    /**
     * Filter which Artifacts to update
     */
    where?: ArtifactWhereInput
    /**
     * Limit how many Artifacts to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArtifactIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Artifact upsert
   */
  export type ArtifactUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Artifact
     */
    select?: ArtifactSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Artifact
     */
    omit?: ArtifactOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArtifactInclude<ExtArgs> | null
    /**
     * The filter to search for the Artifact to update in case it exists.
     */
    where: ArtifactWhereUniqueInput
    /**
     * In case the Artifact found by the `where` argument doesn't exist, create a new Artifact with this data.
     */
    create: XOR<ArtifactCreateInput, ArtifactUncheckedCreateInput>
    /**
     * In case the Artifact was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ArtifactUpdateInput, ArtifactUncheckedUpdateInput>
  }

  /**
   * Artifact delete
   */
  export type ArtifactDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Artifact
     */
    select?: ArtifactSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Artifact
     */
    omit?: ArtifactOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArtifactInclude<ExtArgs> | null
    /**
     * Filter which Artifact to delete.
     */
    where: ArtifactWhereUniqueInput
  }

  /**
   * Artifact deleteMany
   */
  export type ArtifactDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Artifacts to delete
     */
    where?: ArtifactWhereInput
    /**
     * Limit how many Artifacts to delete.
     */
    limit?: number
  }

  /**
   * Artifact without action
   */
  export type ArtifactDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Artifact
     */
    select?: ArtifactSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Artifact
     */
    omit?: ArtifactOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArtifactInclude<ExtArgs> | null
  }


  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    name: string | null
    createdAt: Date | null
    updatedAt: Date | null
    password: string | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    name: string | null
    createdAt: Date | null
    updatedAt: Date | null
    password: string | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    name: number
    createdAt: number
    updatedAt: number
    password: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    name?: true
    createdAt?: true
    updatedAt?: true
    password?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    name?: true
    createdAt?: true
    updatedAt?: true
    password?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    name?: true
    createdAt?: true
    updatedAt?: true
    password?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string
    name: string
    createdAt: Date
    updatedAt: Date
    password: string
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    password?: boolean
    conversations?: boolean | User$conversationsArgs<ExtArgs>
    oauthTokens?: boolean | User$oauthTokensArgs<ExtArgs>
    artifacts?: boolean | User$artifactsArgs<ExtArgs>
    workflowRuns?: boolean | User$workflowRunsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    password?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    password?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    password?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "name" | "createdAt" | "updatedAt" | "password", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    conversations?: boolean | User$conversationsArgs<ExtArgs>
    oauthTokens?: boolean | User$oauthTokensArgs<ExtArgs>
    artifacts?: boolean | User$artifactsArgs<ExtArgs>
    workflowRuns?: boolean | User$workflowRunsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      conversations: Prisma.$ConversationPayload<ExtArgs>[]
      oauthTokens: Prisma.$OAuthTokenPayload<ExtArgs>[]
      artifacts: Prisma.$ArtifactPayload<ExtArgs>[]
      workflowRuns: Prisma.$WorkflowRunPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      name: string
      createdAt: Date
      updatedAt: Date
      password: string
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    conversations<T extends User$conversationsArgs<ExtArgs> = {}>(args?: Subset<T, User$conversationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    oauthTokens<T extends User$oauthTokensArgs<ExtArgs> = {}>(args?: Subset<T, User$oauthTokensArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OAuthTokenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    artifacts<T extends User$artifactsArgs<ExtArgs> = {}>(args?: Subset<T, User$artifactsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ArtifactPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    workflowRuns<T extends User$workflowRunsArgs<ExtArgs> = {}>(args?: Subset<T, User$workflowRunsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkflowRunPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
    readonly password: FieldRef<"User", 'String'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.conversations
   */
  export type User$conversationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Conversation
     */
    omit?: ConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationInclude<ExtArgs> | null
    where?: ConversationWhereInput
    orderBy?: ConversationOrderByWithRelationInput | ConversationOrderByWithRelationInput[]
    cursor?: ConversationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ConversationScalarFieldEnum | ConversationScalarFieldEnum[]
  }

  /**
   * User.oauthTokens
   */
  export type User$oauthTokensArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthToken
     */
    select?: OAuthTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthToken
     */
    omit?: OAuthTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthTokenInclude<ExtArgs> | null
    where?: OAuthTokenWhereInput
    orderBy?: OAuthTokenOrderByWithRelationInput | OAuthTokenOrderByWithRelationInput[]
    cursor?: OAuthTokenWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OAuthTokenScalarFieldEnum | OAuthTokenScalarFieldEnum[]
  }

  /**
   * User.artifacts
   */
  export type User$artifactsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Artifact
     */
    select?: ArtifactSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Artifact
     */
    omit?: ArtifactOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArtifactInclude<ExtArgs> | null
    where?: ArtifactWhereInput
    orderBy?: ArtifactOrderByWithRelationInput | ArtifactOrderByWithRelationInput[]
    cursor?: ArtifactWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ArtifactScalarFieldEnum | ArtifactScalarFieldEnum[]
  }

  /**
   * User.workflowRuns
   */
  export type User$workflowRunsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowRun
     */
    select?: WorkflowRunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkflowRun
     */
    omit?: WorkflowRunOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowRunInclude<ExtArgs> | null
    where?: WorkflowRunWhereInput
    orderBy?: WorkflowRunOrderByWithRelationInput | WorkflowRunOrderByWithRelationInput[]
    cursor?: WorkflowRunWhereUniqueInput
    take?: number
    skip?: number
    distinct?: WorkflowRunScalarFieldEnum | WorkflowRunScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Conversation
   */

  export type AggregateConversation = {
    _count: ConversationCountAggregateOutputType | null
    _min: ConversationMinAggregateOutputType | null
    _max: ConversationMaxAggregateOutputType | null
  }

  export type ConversationMinAggregateOutputType = {
    id: string | null
    userId: string | null
    title: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ConversationMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    title: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ConversationCountAggregateOutputType = {
    id: number
    userId: number
    title: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ConversationMinAggregateInputType = {
    id?: true
    userId?: true
    title?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ConversationMaxAggregateInputType = {
    id?: true
    userId?: true
    title?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ConversationCountAggregateInputType = {
    id?: true
    userId?: true
    title?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ConversationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Conversation to aggregate.
     */
    where?: ConversationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Conversations to fetch.
     */
    orderBy?: ConversationOrderByWithRelationInput | ConversationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ConversationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Conversations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Conversations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Conversations
    **/
    _count?: true | ConversationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ConversationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ConversationMaxAggregateInputType
  }

  export type GetConversationAggregateType<T extends ConversationAggregateArgs> = {
        [P in keyof T & keyof AggregateConversation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateConversation[P]>
      : GetScalarType<T[P], AggregateConversation[P]>
  }




  export type ConversationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ConversationWhereInput
    orderBy?: ConversationOrderByWithAggregationInput | ConversationOrderByWithAggregationInput[]
    by: ConversationScalarFieldEnum[] | ConversationScalarFieldEnum
    having?: ConversationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ConversationCountAggregateInputType | true
    _min?: ConversationMinAggregateInputType
    _max?: ConversationMaxAggregateInputType
  }

  export type ConversationGroupByOutputType = {
    id: string
    userId: string
    title: string | null
    createdAt: Date
    updatedAt: Date
    _count: ConversationCountAggregateOutputType | null
    _min: ConversationMinAggregateOutputType | null
    _max: ConversationMaxAggregateOutputType | null
  }

  type GetConversationGroupByPayload<T extends ConversationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ConversationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ConversationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ConversationGroupByOutputType[P]>
            : GetScalarType<T[P], ConversationGroupByOutputType[P]>
        }
      >
    >


  export type ConversationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    title?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    messages?: boolean | Conversation$messagesArgs<ExtArgs>
    workflowRuns?: boolean | Conversation$workflowRunsArgs<ExtArgs>
    _count?: boolean | ConversationCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["conversation"]>

  export type ConversationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    title?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["conversation"]>

  export type ConversationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    title?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["conversation"]>

  export type ConversationSelectScalar = {
    id?: boolean
    userId?: boolean
    title?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ConversationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "title" | "createdAt" | "updatedAt", ExtArgs["result"]["conversation"]>
  export type ConversationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    messages?: boolean | Conversation$messagesArgs<ExtArgs>
    workflowRuns?: boolean | Conversation$workflowRunsArgs<ExtArgs>
    _count?: boolean | ConversationCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ConversationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ConversationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $ConversationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Conversation"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      messages: Prisma.$MessagePayload<ExtArgs>[]
      workflowRuns: Prisma.$WorkflowRunPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      title: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["conversation"]>
    composites: {}
  }

  type ConversationGetPayload<S extends boolean | null | undefined | ConversationDefaultArgs> = $Result.GetResult<Prisma.$ConversationPayload, S>

  type ConversationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ConversationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ConversationCountAggregateInputType | true
    }

  export interface ConversationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Conversation'], meta: { name: 'Conversation' } }
    /**
     * Find zero or one Conversation that matches the filter.
     * @param {ConversationFindUniqueArgs} args - Arguments to find a Conversation
     * @example
     * // Get one Conversation
     * const conversation = await prisma.conversation.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ConversationFindUniqueArgs>(args: SelectSubset<T, ConversationFindUniqueArgs<ExtArgs>>): Prisma__ConversationClient<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Conversation that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ConversationFindUniqueOrThrowArgs} args - Arguments to find a Conversation
     * @example
     * // Get one Conversation
     * const conversation = await prisma.conversation.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ConversationFindUniqueOrThrowArgs>(args: SelectSubset<T, ConversationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ConversationClient<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Conversation that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConversationFindFirstArgs} args - Arguments to find a Conversation
     * @example
     * // Get one Conversation
     * const conversation = await prisma.conversation.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ConversationFindFirstArgs>(args?: SelectSubset<T, ConversationFindFirstArgs<ExtArgs>>): Prisma__ConversationClient<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Conversation that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConversationFindFirstOrThrowArgs} args - Arguments to find a Conversation
     * @example
     * // Get one Conversation
     * const conversation = await prisma.conversation.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ConversationFindFirstOrThrowArgs>(args?: SelectSubset<T, ConversationFindFirstOrThrowArgs<ExtArgs>>): Prisma__ConversationClient<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Conversations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConversationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Conversations
     * const conversations = await prisma.conversation.findMany()
     * 
     * // Get first 10 Conversations
     * const conversations = await prisma.conversation.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const conversationWithIdOnly = await prisma.conversation.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ConversationFindManyArgs>(args?: SelectSubset<T, ConversationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Conversation.
     * @param {ConversationCreateArgs} args - Arguments to create a Conversation.
     * @example
     * // Create one Conversation
     * const Conversation = await prisma.conversation.create({
     *   data: {
     *     // ... data to create a Conversation
     *   }
     * })
     * 
     */
    create<T extends ConversationCreateArgs>(args: SelectSubset<T, ConversationCreateArgs<ExtArgs>>): Prisma__ConversationClient<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Conversations.
     * @param {ConversationCreateManyArgs} args - Arguments to create many Conversations.
     * @example
     * // Create many Conversations
     * const conversation = await prisma.conversation.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ConversationCreateManyArgs>(args?: SelectSubset<T, ConversationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Conversations and returns the data saved in the database.
     * @param {ConversationCreateManyAndReturnArgs} args - Arguments to create many Conversations.
     * @example
     * // Create many Conversations
     * const conversation = await prisma.conversation.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Conversations and only return the `id`
     * const conversationWithIdOnly = await prisma.conversation.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ConversationCreateManyAndReturnArgs>(args?: SelectSubset<T, ConversationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Conversation.
     * @param {ConversationDeleteArgs} args - Arguments to delete one Conversation.
     * @example
     * // Delete one Conversation
     * const Conversation = await prisma.conversation.delete({
     *   where: {
     *     // ... filter to delete one Conversation
     *   }
     * })
     * 
     */
    delete<T extends ConversationDeleteArgs>(args: SelectSubset<T, ConversationDeleteArgs<ExtArgs>>): Prisma__ConversationClient<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Conversation.
     * @param {ConversationUpdateArgs} args - Arguments to update one Conversation.
     * @example
     * // Update one Conversation
     * const conversation = await prisma.conversation.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ConversationUpdateArgs>(args: SelectSubset<T, ConversationUpdateArgs<ExtArgs>>): Prisma__ConversationClient<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Conversations.
     * @param {ConversationDeleteManyArgs} args - Arguments to filter Conversations to delete.
     * @example
     * // Delete a few Conversations
     * const { count } = await prisma.conversation.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ConversationDeleteManyArgs>(args?: SelectSubset<T, ConversationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Conversations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConversationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Conversations
     * const conversation = await prisma.conversation.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ConversationUpdateManyArgs>(args: SelectSubset<T, ConversationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Conversations and returns the data updated in the database.
     * @param {ConversationUpdateManyAndReturnArgs} args - Arguments to update many Conversations.
     * @example
     * // Update many Conversations
     * const conversation = await prisma.conversation.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Conversations and only return the `id`
     * const conversationWithIdOnly = await prisma.conversation.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ConversationUpdateManyAndReturnArgs>(args: SelectSubset<T, ConversationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Conversation.
     * @param {ConversationUpsertArgs} args - Arguments to update or create a Conversation.
     * @example
     * // Update or create a Conversation
     * const conversation = await prisma.conversation.upsert({
     *   create: {
     *     // ... data to create a Conversation
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Conversation we want to update
     *   }
     * })
     */
    upsert<T extends ConversationUpsertArgs>(args: SelectSubset<T, ConversationUpsertArgs<ExtArgs>>): Prisma__ConversationClient<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Conversations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConversationCountArgs} args - Arguments to filter Conversations to count.
     * @example
     * // Count the number of Conversations
     * const count = await prisma.conversation.count({
     *   where: {
     *     // ... the filter for the Conversations we want to count
     *   }
     * })
    **/
    count<T extends ConversationCountArgs>(
      args?: Subset<T, ConversationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ConversationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Conversation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConversationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ConversationAggregateArgs>(args: Subset<T, ConversationAggregateArgs>): Prisma.PrismaPromise<GetConversationAggregateType<T>>

    /**
     * Group by Conversation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConversationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ConversationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ConversationGroupByArgs['orderBy'] }
        : { orderBy?: ConversationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ConversationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetConversationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Conversation model
   */
  readonly fields: ConversationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Conversation.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ConversationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    messages<T extends Conversation$messagesArgs<ExtArgs> = {}>(args?: Subset<T, Conversation$messagesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    workflowRuns<T extends Conversation$workflowRunsArgs<ExtArgs> = {}>(args?: Subset<T, Conversation$workflowRunsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkflowRunPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Conversation model
   */
  interface ConversationFieldRefs {
    readonly id: FieldRef<"Conversation", 'String'>
    readonly userId: FieldRef<"Conversation", 'String'>
    readonly title: FieldRef<"Conversation", 'String'>
    readonly createdAt: FieldRef<"Conversation", 'DateTime'>
    readonly updatedAt: FieldRef<"Conversation", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Conversation findUnique
   */
  export type ConversationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Conversation
     */
    omit?: ConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationInclude<ExtArgs> | null
    /**
     * Filter, which Conversation to fetch.
     */
    where: ConversationWhereUniqueInput
  }

  /**
   * Conversation findUniqueOrThrow
   */
  export type ConversationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Conversation
     */
    omit?: ConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationInclude<ExtArgs> | null
    /**
     * Filter, which Conversation to fetch.
     */
    where: ConversationWhereUniqueInput
  }

  /**
   * Conversation findFirst
   */
  export type ConversationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Conversation
     */
    omit?: ConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationInclude<ExtArgs> | null
    /**
     * Filter, which Conversation to fetch.
     */
    where?: ConversationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Conversations to fetch.
     */
    orderBy?: ConversationOrderByWithRelationInput | ConversationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Conversations.
     */
    cursor?: ConversationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Conversations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Conversations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Conversations.
     */
    distinct?: ConversationScalarFieldEnum | ConversationScalarFieldEnum[]
  }

  /**
   * Conversation findFirstOrThrow
   */
  export type ConversationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Conversation
     */
    omit?: ConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationInclude<ExtArgs> | null
    /**
     * Filter, which Conversation to fetch.
     */
    where?: ConversationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Conversations to fetch.
     */
    orderBy?: ConversationOrderByWithRelationInput | ConversationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Conversations.
     */
    cursor?: ConversationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Conversations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Conversations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Conversations.
     */
    distinct?: ConversationScalarFieldEnum | ConversationScalarFieldEnum[]
  }

  /**
   * Conversation findMany
   */
  export type ConversationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Conversation
     */
    omit?: ConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationInclude<ExtArgs> | null
    /**
     * Filter, which Conversations to fetch.
     */
    where?: ConversationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Conversations to fetch.
     */
    orderBy?: ConversationOrderByWithRelationInput | ConversationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Conversations.
     */
    cursor?: ConversationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Conversations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Conversations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Conversations.
     */
    distinct?: ConversationScalarFieldEnum | ConversationScalarFieldEnum[]
  }

  /**
   * Conversation create
   */
  export type ConversationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Conversation
     */
    omit?: ConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationInclude<ExtArgs> | null
    /**
     * The data needed to create a Conversation.
     */
    data: XOR<ConversationCreateInput, ConversationUncheckedCreateInput>
  }

  /**
   * Conversation createMany
   */
  export type ConversationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Conversations.
     */
    data: ConversationCreateManyInput | ConversationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Conversation createManyAndReturn
   */
  export type ConversationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Conversation
     */
    omit?: ConversationOmit<ExtArgs> | null
    /**
     * The data used to create many Conversations.
     */
    data: ConversationCreateManyInput | ConversationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Conversation update
   */
  export type ConversationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Conversation
     */
    omit?: ConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationInclude<ExtArgs> | null
    /**
     * The data needed to update a Conversation.
     */
    data: XOR<ConversationUpdateInput, ConversationUncheckedUpdateInput>
    /**
     * Choose, which Conversation to update.
     */
    where: ConversationWhereUniqueInput
  }

  /**
   * Conversation updateMany
   */
  export type ConversationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Conversations.
     */
    data: XOR<ConversationUpdateManyMutationInput, ConversationUncheckedUpdateManyInput>
    /**
     * Filter which Conversations to update
     */
    where?: ConversationWhereInput
    /**
     * Limit how many Conversations to update.
     */
    limit?: number
  }

  /**
   * Conversation updateManyAndReturn
   */
  export type ConversationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Conversation
     */
    omit?: ConversationOmit<ExtArgs> | null
    /**
     * The data used to update Conversations.
     */
    data: XOR<ConversationUpdateManyMutationInput, ConversationUncheckedUpdateManyInput>
    /**
     * Filter which Conversations to update
     */
    where?: ConversationWhereInput
    /**
     * Limit how many Conversations to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Conversation upsert
   */
  export type ConversationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Conversation
     */
    omit?: ConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationInclude<ExtArgs> | null
    /**
     * The filter to search for the Conversation to update in case it exists.
     */
    where: ConversationWhereUniqueInput
    /**
     * In case the Conversation found by the `where` argument doesn't exist, create a new Conversation with this data.
     */
    create: XOR<ConversationCreateInput, ConversationUncheckedCreateInput>
    /**
     * In case the Conversation was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ConversationUpdateInput, ConversationUncheckedUpdateInput>
  }

  /**
   * Conversation delete
   */
  export type ConversationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Conversation
     */
    omit?: ConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationInclude<ExtArgs> | null
    /**
     * Filter which Conversation to delete.
     */
    where: ConversationWhereUniqueInput
  }

  /**
   * Conversation deleteMany
   */
  export type ConversationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Conversations to delete
     */
    where?: ConversationWhereInput
    /**
     * Limit how many Conversations to delete.
     */
    limit?: number
  }

  /**
   * Conversation.messages
   */
  export type Conversation$messagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    where?: MessageWhereInput
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    cursor?: MessageWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[]
  }

  /**
   * Conversation.workflowRuns
   */
  export type Conversation$workflowRunsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowRun
     */
    select?: WorkflowRunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkflowRun
     */
    omit?: WorkflowRunOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowRunInclude<ExtArgs> | null
    where?: WorkflowRunWhereInput
    orderBy?: WorkflowRunOrderByWithRelationInput | WorkflowRunOrderByWithRelationInput[]
    cursor?: WorkflowRunWhereUniqueInput
    take?: number
    skip?: number
    distinct?: WorkflowRunScalarFieldEnum | WorkflowRunScalarFieldEnum[]
  }

  /**
   * Conversation without action
   */
  export type ConversationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Conversation
     */
    omit?: ConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationInclude<ExtArgs> | null
  }


  /**
   * Model Message
   */

  export type AggregateMessage = {
    _count: MessageCountAggregateOutputType | null
    _min: MessageMinAggregateOutputType | null
    _max: MessageMaxAggregateOutputType | null
  }

  export type MessageMinAggregateOutputType = {
    id: string | null
    conversationId: string | null
    role: string | null
    content: string | null
    toolCallId: string | null
    toolName: string | null
    createdAt: Date | null
  }

  export type MessageMaxAggregateOutputType = {
    id: string | null
    conversationId: string | null
    role: string | null
    content: string | null
    toolCallId: string | null
    toolName: string | null
    createdAt: Date | null
  }

  export type MessageCountAggregateOutputType = {
    id: number
    conversationId: number
    role: number
    content: number
    toolCallId: number
    toolName: number
    createdAt: number
    _all: number
  }


  export type MessageMinAggregateInputType = {
    id?: true
    conversationId?: true
    role?: true
    content?: true
    toolCallId?: true
    toolName?: true
    createdAt?: true
  }

  export type MessageMaxAggregateInputType = {
    id?: true
    conversationId?: true
    role?: true
    content?: true
    toolCallId?: true
    toolName?: true
    createdAt?: true
  }

  export type MessageCountAggregateInputType = {
    id?: true
    conversationId?: true
    role?: true
    content?: true
    toolCallId?: true
    toolName?: true
    createdAt?: true
    _all?: true
  }

  export type MessageAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Message to aggregate.
     */
    where?: MessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Messages to fetch.
     */
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Messages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Messages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Messages
    **/
    _count?: true | MessageCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MessageMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MessageMaxAggregateInputType
  }

  export type GetMessageAggregateType<T extends MessageAggregateArgs> = {
        [P in keyof T & keyof AggregateMessage]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMessage[P]>
      : GetScalarType<T[P], AggregateMessage[P]>
  }




  export type MessageGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MessageWhereInput
    orderBy?: MessageOrderByWithAggregationInput | MessageOrderByWithAggregationInput[]
    by: MessageScalarFieldEnum[] | MessageScalarFieldEnum
    having?: MessageScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MessageCountAggregateInputType | true
    _min?: MessageMinAggregateInputType
    _max?: MessageMaxAggregateInputType
  }

  export type MessageGroupByOutputType = {
    id: string
    conversationId: string
    role: string
    content: string
    toolCallId: string | null
    toolName: string | null
    createdAt: Date
    _count: MessageCountAggregateOutputType | null
    _min: MessageMinAggregateOutputType | null
    _max: MessageMaxAggregateOutputType | null
  }

  type GetMessageGroupByPayload<T extends MessageGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MessageGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MessageGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MessageGroupByOutputType[P]>
            : GetScalarType<T[P], MessageGroupByOutputType[P]>
        }
      >
    >


  export type MessageSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    conversationId?: boolean
    role?: boolean
    content?: boolean
    toolCallId?: boolean
    toolName?: boolean
    createdAt?: boolean
    conversation?: boolean | ConversationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["message"]>

  export type MessageSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    conversationId?: boolean
    role?: boolean
    content?: boolean
    toolCallId?: boolean
    toolName?: boolean
    createdAt?: boolean
    conversation?: boolean | ConversationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["message"]>

  export type MessageSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    conversationId?: boolean
    role?: boolean
    content?: boolean
    toolCallId?: boolean
    toolName?: boolean
    createdAt?: boolean
    conversation?: boolean | ConversationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["message"]>

  export type MessageSelectScalar = {
    id?: boolean
    conversationId?: boolean
    role?: boolean
    content?: boolean
    toolCallId?: boolean
    toolName?: boolean
    createdAt?: boolean
  }

  export type MessageOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "conversationId" | "role" | "content" | "toolCallId" | "toolName" | "createdAt", ExtArgs["result"]["message"]>
  export type MessageInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    conversation?: boolean | ConversationDefaultArgs<ExtArgs>
  }
  export type MessageIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    conversation?: boolean | ConversationDefaultArgs<ExtArgs>
  }
  export type MessageIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    conversation?: boolean | ConversationDefaultArgs<ExtArgs>
  }

  export type $MessagePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Message"
    objects: {
      conversation: Prisma.$ConversationPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      conversationId: string
      role: string
      content: string
      toolCallId: string | null
      toolName: string | null
      createdAt: Date
    }, ExtArgs["result"]["message"]>
    composites: {}
  }

  type MessageGetPayload<S extends boolean | null | undefined | MessageDefaultArgs> = $Result.GetResult<Prisma.$MessagePayload, S>

  type MessageCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MessageFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MessageCountAggregateInputType | true
    }

  export interface MessageDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Message'], meta: { name: 'Message' } }
    /**
     * Find zero or one Message that matches the filter.
     * @param {MessageFindUniqueArgs} args - Arguments to find a Message
     * @example
     * // Get one Message
     * const message = await prisma.message.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MessageFindUniqueArgs>(args: SelectSubset<T, MessageFindUniqueArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Message that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MessageFindUniqueOrThrowArgs} args - Arguments to find a Message
     * @example
     * // Get one Message
     * const message = await prisma.message.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MessageFindUniqueOrThrowArgs>(args: SelectSubset<T, MessageFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Message that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageFindFirstArgs} args - Arguments to find a Message
     * @example
     * // Get one Message
     * const message = await prisma.message.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MessageFindFirstArgs>(args?: SelectSubset<T, MessageFindFirstArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Message that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageFindFirstOrThrowArgs} args - Arguments to find a Message
     * @example
     * // Get one Message
     * const message = await prisma.message.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MessageFindFirstOrThrowArgs>(args?: SelectSubset<T, MessageFindFirstOrThrowArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Messages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Messages
     * const messages = await prisma.message.findMany()
     * 
     * // Get first 10 Messages
     * const messages = await prisma.message.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const messageWithIdOnly = await prisma.message.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MessageFindManyArgs>(args?: SelectSubset<T, MessageFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Message.
     * @param {MessageCreateArgs} args - Arguments to create a Message.
     * @example
     * // Create one Message
     * const Message = await prisma.message.create({
     *   data: {
     *     // ... data to create a Message
     *   }
     * })
     * 
     */
    create<T extends MessageCreateArgs>(args: SelectSubset<T, MessageCreateArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Messages.
     * @param {MessageCreateManyArgs} args - Arguments to create many Messages.
     * @example
     * // Create many Messages
     * const message = await prisma.message.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MessageCreateManyArgs>(args?: SelectSubset<T, MessageCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Messages and returns the data saved in the database.
     * @param {MessageCreateManyAndReturnArgs} args - Arguments to create many Messages.
     * @example
     * // Create many Messages
     * const message = await prisma.message.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Messages and only return the `id`
     * const messageWithIdOnly = await prisma.message.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MessageCreateManyAndReturnArgs>(args?: SelectSubset<T, MessageCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Message.
     * @param {MessageDeleteArgs} args - Arguments to delete one Message.
     * @example
     * // Delete one Message
     * const Message = await prisma.message.delete({
     *   where: {
     *     // ... filter to delete one Message
     *   }
     * })
     * 
     */
    delete<T extends MessageDeleteArgs>(args: SelectSubset<T, MessageDeleteArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Message.
     * @param {MessageUpdateArgs} args - Arguments to update one Message.
     * @example
     * // Update one Message
     * const message = await prisma.message.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MessageUpdateArgs>(args: SelectSubset<T, MessageUpdateArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Messages.
     * @param {MessageDeleteManyArgs} args - Arguments to filter Messages to delete.
     * @example
     * // Delete a few Messages
     * const { count } = await prisma.message.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MessageDeleteManyArgs>(args?: SelectSubset<T, MessageDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Messages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Messages
     * const message = await prisma.message.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MessageUpdateManyArgs>(args: SelectSubset<T, MessageUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Messages and returns the data updated in the database.
     * @param {MessageUpdateManyAndReturnArgs} args - Arguments to update many Messages.
     * @example
     * // Update many Messages
     * const message = await prisma.message.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Messages and only return the `id`
     * const messageWithIdOnly = await prisma.message.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MessageUpdateManyAndReturnArgs>(args: SelectSubset<T, MessageUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Message.
     * @param {MessageUpsertArgs} args - Arguments to update or create a Message.
     * @example
     * // Update or create a Message
     * const message = await prisma.message.upsert({
     *   create: {
     *     // ... data to create a Message
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Message we want to update
     *   }
     * })
     */
    upsert<T extends MessageUpsertArgs>(args: SelectSubset<T, MessageUpsertArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Messages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageCountArgs} args - Arguments to filter Messages to count.
     * @example
     * // Count the number of Messages
     * const count = await prisma.message.count({
     *   where: {
     *     // ... the filter for the Messages we want to count
     *   }
     * })
    **/
    count<T extends MessageCountArgs>(
      args?: Subset<T, MessageCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MessageCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Message.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MessageAggregateArgs>(args: Subset<T, MessageAggregateArgs>): Prisma.PrismaPromise<GetMessageAggregateType<T>>

    /**
     * Group by Message.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MessageGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MessageGroupByArgs['orderBy'] }
        : { orderBy?: MessageGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MessageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMessageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Message model
   */
  readonly fields: MessageFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Message.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MessageClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    conversation<T extends ConversationDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ConversationDefaultArgs<ExtArgs>>): Prisma__ConversationClient<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Message model
   */
  interface MessageFieldRefs {
    readonly id: FieldRef<"Message", 'String'>
    readonly conversationId: FieldRef<"Message", 'String'>
    readonly role: FieldRef<"Message", 'String'>
    readonly content: FieldRef<"Message", 'String'>
    readonly toolCallId: FieldRef<"Message", 'String'>
    readonly toolName: FieldRef<"Message", 'String'>
    readonly createdAt: FieldRef<"Message", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Message findUnique
   */
  export type MessageFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter, which Message to fetch.
     */
    where: MessageWhereUniqueInput
  }

  /**
   * Message findUniqueOrThrow
   */
  export type MessageFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter, which Message to fetch.
     */
    where: MessageWhereUniqueInput
  }

  /**
   * Message findFirst
   */
  export type MessageFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter, which Message to fetch.
     */
    where?: MessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Messages to fetch.
     */
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Messages.
     */
    cursor?: MessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Messages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Messages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Messages.
     */
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[]
  }

  /**
   * Message findFirstOrThrow
   */
  export type MessageFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter, which Message to fetch.
     */
    where?: MessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Messages to fetch.
     */
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Messages.
     */
    cursor?: MessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Messages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Messages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Messages.
     */
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[]
  }

  /**
   * Message findMany
   */
  export type MessageFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter, which Messages to fetch.
     */
    where?: MessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Messages to fetch.
     */
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Messages.
     */
    cursor?: MessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Messages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Messages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Messages.
     */
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[]
  }

  /**
   * Message create
   */
  export type MessageCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * The data needed to create a Message.
     */
    data: XOR<MessageCreateInput, MessageUncheckedCreateInput>
  }

  /**
   * Message createMany
   */
  export type MessageCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Messages.
     */
    data: MessageCreateManyInput | MessageCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Message createManyAndReturn
   */
  export type MessageCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * The data used to create many Messages.
     */
    data: MessageCreateManyInput | MessageCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Message update
   */
  export type MessageUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * The data needed to update a Message.
     */
    data: XOR<MessageUpdateInput, MessageUncheckedUpdateInput>
    /**
     * Choose, which Message to update.
     */
    where: MessageWhereUniqueInput
  }

  /**
   * Message updateMany
   */
  export type MessageUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Messages.
     */
    data: XOR<MessageUpdateManyMutationInput, MessageUncheckedUpdateManyInput>
    /**
     * Filter which Messages to update
     */
    where?: MessageWhereInput
    /**
     * Limit how many Messages to update.
     */
    limit?: number
  }

  /**
   * Message updateManyAndReturn
   */
  export type MessageUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * The data used to update Messages.
     */
    data: XOR<MessageUpdateManyMutationInput, MessageUncheckedUpdateManyInput>
    /**
     * Filter which Messages to update
     */
    where?: MessageWhereInput
    /**
     * Limit how many Messages to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Message upsert
   */
  export type MessageUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * The filter to search for the Message to update in case it exists.
     */
    where: MessageWhereUniqueInput
    /**
     * In case the Message found by the `where` argument doesn't exist, create a new Message with this data.
     */
    create: XOR<MessageCreateInput, MessageUncheckedCreateInput>
    /**
     * In case the Message was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MessageUpdateInput, MessageUncheckedUpdateInput>
  }

  /**
   * Message delete
   */
  export type MessageDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter which Message to delete.
     */
    where: MessageWhereUniqueInput
  }

  /**
   * Message deleteMany
   */
  export type MessageDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Messages to delete
     */
    where?: MessageWhereInput
    /**
     * Limit how many Messages to delete.
     */
    limit?: number
  }

  /**
   * Message without action
   */
  export type MessageDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
  }


  /**
   * Model OAuthToken
   */

  export type AggregateOAuthToken = {
    _count: OAuthTokenCountAggregateOutputType | null
    _min: OAuthTokenMinAggregateOutputType | null
    _max: OAuthTokenMaxAggregateOutputType | null
  }

  export type OAuthTokenMinAggregateOutputType = {
    id: string | null
    userId: string | null
    provider: string | null
    accessToken: string | null
    refreshToken: string | null
    expiresAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type OAuthTokenMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    provider: string | null
    accessToken: string | null
    refreshToken: string | null
    expiresAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type OAuthTokenCountAggregateOutputType = {
    id: number
    userId: number
    provider: number
    accessToken: number
    refreshToken: number
    expiresAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type OAuthTokenMinAggregateInputType = {
    id?: true
    userId?: true
    provider?: true
    accessToken?: true
    refreshToken?: true
    expiresAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type OAuthTokenMaxAggregateInputType = {
    id?: true
    userId?: true
    provider?: true
    accessToken?: true
    refreshToken?: true
    expiresAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type OAuthTokenCountAggregateInputType = {
    id?: true
    userId?: true
    provider?: true
    accessToken?: true
    refreshToken?: true
    expiresAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type OAuthTokenAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OAuthToken to aggregate.
     */
    where?: OAuthTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OAuthTokens to fetch.
     */
    orderBy?: OAuthTokenOrderByWithRelationInput | OAuthTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OAuthTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OAuthTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OAuthTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned OAuthTokens
    **/
    _count?: true | OAuthTokenCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OAuthTokenMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OAuthTokenMaxAggregateInputType
  }

  export type GetOAuthTokenAggregateType<T extends OAuthTokenAggregateArgs> = {
        [P in keyof T & keyof AggregateOAuthToken]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOAuthToken[P]>
      : GetScalarType<T[P], AggregateOAuthToken[P]>
  }




  export type OAuthTokenGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OAuthTokenWhereInput
    orderBy?: OAuthTokenOrderByWithAggregationInput | OAuthTokenOrderByWithAggregationInput[]
    by: OAuthTokenScalarFieldEnum[] | OAuthTokenScalarFieldEnum
    having?: OAuthTokenScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OAuthTokenCountAggregateInputType | true
    _min?: OAuthTokenMinAggregateInputType
    _max?: OAuthTokenMaxAggregateInputType
  }

  export type OAuthTokenGroupByOutputType = {
    id: string
    userId: string
    provider: string
    accessToken: string
    refreshToken: string | null
    expiresAt: Date | null
    createdAt: Date
    updatedAt: Date
    _count: OAuthTokenCountAggregateOutputType | null
    _min: OAuthTokenMinAggregateOutputType | null
    _max: OAuthTokenMaxAggregateOutputType | null
  }

  type GetOAuthTokenGroupByPayload<T extends OAuthTokenGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OAuthTokenGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OAuthTokenGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OAuthTokenGroupByOutputType[P]>
            : GetScalarType<T[P], OAuthTokenGroupByOutputType[P]>
        }
      >
    >


  export type OAuthTokenSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    provider?: boolean
    accessToken?: boolean
    refreshToken?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["oAuthToken"]>

  export type OAuthTokenSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    provider?: boolean
    accessToken?: boolean
    refreshToken?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["oAuthToken"]>

  export type OAuthTokenSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    provider?: boolean
    accessToken?: boolean
    refreshToken?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["oAuthToken"]>

  export type OAuthTokenSelectScalar = {
    id?: boolean
    userId?: boolean
    provider?: boolean
    accessToken?: boolean
    refreshToken?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type OAuthTokenOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "provider" | "accessToken" | "refreshToken" | "expiresAt" | "createdAt" | "updatedAt", ExtArgs["result"]["oAuthToken"]>
  export type OAuthTokenInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type OAuthTokenIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type OAuthTokenIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $OAuthTokenPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "OAuthToken"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      provider: string
      accessToken: string
      refreshToken: string | null
      expiresAt: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["oAuthToken"]>
    composites: {}
  }

  type OAuthTokenGetPayload<S extends boolean | null | undefined | OAuthTokenDefaultArgs> = $Result.GetResult<Prisma.$OAuthTokenPayload, S>

  type OAuthTokenCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<OAuthTokenFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: OAuthTokenCountAggregateInputType | true
    }

  export interface OAuthTokenDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['OAuthToken'], meta: { name: 'OAuthToken' } }
    /**
     * Find zero or one OAuthToken that matches the filter.
     * @param {OAuthTokenFindUniqueArgs} args - Arguments to find a OAuthToken
     * @example
     * // Get one OAuthToken
     * const oAuthToken = await prisma.oAuthToken.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OAuthTokenFindUniqueArgs>(args: SelectSubset<T, OAuthTokenFindUniqueArgs<ExtArgs>>): Prisma__OAuthTokenClient<$Result.GetResult<Prisma.$OAuthTokenPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one OAuthToken that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OAuthTokenFindUniqueOrThrowArgs} args - Arguments to find a OAuthToken
     * @example
     * // Get one OAuthToken
     * const oAuthToken = await prisma.oAuthToken.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OAuthTokenFindUniqueOrThrowArgs>(args: SelectSubset<T, OAuthTokenFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OAuthTokenClient<$Result.GetResult<Prisma.$OAuthTokenPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OAuthToken that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OAuthTokenFindFirstArgs} args - Arguments to find a OAuthToken
     * @example
     * // Get one OAuthToken
     * const oAuthToken = await prisma.oAuthToken.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OAuthTokenFindFirstArgs>(args?: SelectSubset<T, OAuthTokenFindFirstArgs<ExtArgs>>): Prisma__OAuthTokenClient<$Result.GetResult<Prisma.$OAuthTokenPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OAuthToken that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OAuthTokenFindFirstOrThrowArgs} args - Arguments to find a OAuthToken
     * @example
     * // Get one OAuthToken
     * const oAuthToken = await prisma.oAuthToken.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OAuthTokenFindFirstOrThrowArgs>(args?: SelectSubset<T, OAuthTokenFindFirstOrThrowArgs<ExtArgs>>): Prisma__OAuthTokenClient<$Result.GetResult<Prisma.$OAuthTokenPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more OAuthTokens that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OAuthTokenFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all OAuthTokens
     * const oAuthTokens = await prisma.oAuthToken.findMany()
     * 
     * // Get first 10 OAuthTokens
     * const oAuthTokens = await prisma.oAuthToken.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const oAuthTokenWithIdOnly = await prisma.oAuthToken.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends OAuthTokenFindManyArgs>(args?: SelectSubset<T, OAuthTokenFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OAuthTokenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a OAuthToken.
     * @param {OAuthTokenCreateArgs} args - Arguments to create a OAuthToken.
     * @example
     * // Create one OAuthToken
     * const OAuthToken = await prisma.oAuthToken.create({
     *   data: {
     *     // ... data to create a OAuthToken
     *   }
     * })
     * 
     */
    create<T extends OAuthTokenCreateArgs>(args: SelectSubset<T, OAuthTokenCreateArgs<ExtArgs>>): Prisma__OAuthTokenClient<$Result.GetResult<Prisma.$OAuthTokenPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many OAuthTokens.
     * @param {OAuthTokenCreateManyArgs} args - Arguments to create many OAuthTokens.
     * @example
     * // Create many OAuthTokens
     * const oAuthToken = await prisma.oAuthToken.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OAuthTokenCreateManyArgs>(args?: SelectSubset<T, OAuthTokenCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many OAuthTokens and returns the data saved in the database.
     * @param {OAuthTokenCreateManyAndReturnArgs} args - Arguments to create many OAuthTokens.
     * @example
     * // Create many OAuthTokens
     * const oAuthToken = await prisma.oAuthToken.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many OAuthTokens and only return the `id`
     * const oAuthTokenWithIdOnly = await prisma.oAuthToken.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends OAuthTokenCreateManyAndReturnArgs>(args?: SelectSubset<T, OAuthTokenCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OAuthTokenPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a OAuthToken.
     * @param {OAuthTokenDeleteArgs} args - Arguments to delete one OAuthToken.
     * @example
     * // Delete one OAuthToken
     * const OAuthToken = await prisma.oAuthToken.delete({
     *   where: {
     *     // ... filter to delete one OAuthToken
     *   }
     * })
     * 
     */
    delete<T extends OAuthTokenDeleteArgs>(args: SelectSubset<T, OAuthTokenDeleteArgs<ExtArgs>>): Prisma__OAuthTokenClient<$Result.GetResult<Prisma.$OAuthTokenPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one OAuthToken.
     * @param {OAuthTokenUpdateArgs} args - Arguments to update one OAuthToken.
     * @example
     * // Update one OAuthToken
     * const oAuthToken = await prisma.oAuthToken.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OAuthTokenUpdateArgs>(args: SelectSubset<T, OAuthTokenUpdateArgs<ExtArgs>>): Prisma__OAuthTokenClient<$Result.GetResult<Prisma.$OAuthTokenPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more OAuthTokens.
     * @param {OAuthTokenDeleteManyArgs} args - Arguments to filter OAuthTokens to delete.
     * @example
     * // Delete a few OAuthTokens
     * const { count } = await prisma.oAuthToken.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OAuthTokenDeleteManyArgs>(args?: SelectSubset<T, OAuthTokenDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OAuthTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OAuthTokenUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many OAuthTokens
     * const oAuthToken = await prisma.oAuthToken.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OAuthTokenUpdateManyArgs>(args: SelectSubset<T, OAuthTokenUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OAuthTokens and returns the data updated in the database.
     * @param {OAuthTokenUpdateManyAndReturnArgs} args - Arguments to update many OAuthTokens.
     * @example
     * // Update many OAuthTokens
     * const oAuthToken = await prisma.oAuthToken.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more OAuthTokens and only return the `id`
     * const oAuthTokenWithIdOnly = await prisma.oAuthToken.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends OAuthTokenUpdateManyAndReturnArgs>(args: SelectSubset<T, OAuthTokenUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OAuthTokenPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one OAuthToken.
     * @param {OAuthTokenUpsertArgs} args - Arguments to update or create a OAuthToken.
     * @example
     * // Update or create a OAuthToken
     * const oAuthToken = await prisma.oAuthToken.upsert({
     *   create: {
     *     // ... data to create a OAuthToken
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the OAuthToken we want to update
     *   }
     * })
     */
    upsert<T extends OAuthTokenUpsertArgs>(args: SelectSubset<T, OAuthTokenUpsertArgs<ExtArgs>>): Prisma__OAuthTokenClient<$Result.GetResult<Prisma.$OAuthTokenPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of OAuthTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OAuthTokenCountArgs} args - Arguments to filter OAuthTokens to count.
     * @example
     * // Count the number of OAuthTokens
     * const count = await prisma.oAuthToken.count({
     *   where: {
     *     // ... the filter for the OAuthTokens we want to count
     *   }
     * })
    **/
    count<T extends OAuthTokenCountArgs>(
      args?: Subset<T, OAuthTokenCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OAuthTokenCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a OAuthToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OAuthTokenAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends OAuthTokenAggregateArgs>(args: Subset<T, OAuthTokenAggregateArgs>): Prisma.PrismaPromise<GetOAuthTokenAggregateType<T>>

    /**
     * Group by OAuthToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OAuthTokenGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends OAuthTokenGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OAuthTokenGroupByArgs['orderBy'] }
        : { orderBy?: OAuthTokenGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, OAuthTokenGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOAuthTokenGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the OAuthToken model
   */
  readonly fields: OAuthTokenFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for OAuthToken.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OAuthTokenClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the OAuthToken model
   */
  interface OAuthTokenFieldRefs {
    readonly id: FieldRef<"OAuthToken", 'String'>
    readonly userId: FieldRef<"OAuthToken", 'String'>
    readonly provider: FieldRef<"OAuthToken", 'String'>
    readonly accessToken: FieldRef<"OAuthToken", 'String'>
    readonly refreshToken: FieldRef<"OAuthToken", 'String'>
    readonly expiresAt: FieldRef<"OAuthToken", 'DateTime'>
    readonly createdAt: FieldRef<"OAuthToken", 'DateTime'>
    readonly updatedAt: FieldRef<"OAuthToken", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * OAuthToken findUnique
   */
  export type OAuthTokenFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthToken
     */
    select?: OAuthTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthToken
     */
    omit?: OAuthTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthTokenInclude<ExtArgs> | null
    /**
     * Filter, which OAuthToken to fetch.
     */
    where: OAuthTokenWhereUniqueInput
  }

  /**
   * OAuthToken findUniqueOrThrow
   */
  export type OAuthTokenFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthToken
     */
    select?: OAuthTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthToken
     */
    omit?: OAuthTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthTokenInclude<ExtArgs> | null
    /**
     * Filter, which OAuthToken to fetch.
     */
    where: OAuthTokenWhereUniqueInput
  }

  /**
   * OAuthToken findFirst
   */
  export type OAuthTokenFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthToken
     */
    select?: OAuthTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthToken
     */
    omit?: OAuthTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthTokenInclude<ExtArgs> | null
    /**
     * Filter, which OAuthToken to fetch.
     */
    where?: OAuthTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OAuthTokens to fetch.
     */
    orderBy?: OAuthTokenOrderByWithRelationInput | OAuthTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OAuthTokens.
     */
    cursor?: OAuthTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OAuthTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OAuthTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OAuthTokens.
     */
    distinct?: OAuthTokenScalarFieldEnum | OAuthTokenScalarFieldEnum[]
  }

  /**
   * OAuthToken findFirstOrThrow
   */
  export type OAuthTokenFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthToken
     */
    select?: OAuthTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthToken
     */
    omit?: OAuthTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthTokenInclude<ExtArgs> | null
    /**
     * Filter, which OAuthToken to fetch.
     */
    where?: OAuthTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OAuthTokens to fetch.
     */
    orderBy?: OAuthTokenOrderByWithRelationInput | OAuthTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OAuthTokens.
     */
    cursor?: OAuthTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OAuthTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OAuthTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OAuthTokens.
     */
    distinct?: OAuthTokenScalarFieldEnum | OAuthTokenScalarFieldEnum[]
  }

  /**
   * OAuthToken findMany
   */
  export type OAuthTokenFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthToken
     */
    select?: OAuthTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthToken
     */
    omit?: OAuthTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthTokenInclude<ExtArgs> | null
    /**
     * Filter, which OAuthTokens to fetch.
     */
    where?: OAuthTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OAuthTokens to fetch.
     */
    orderBy?: OAuthTokenOrderByWithRelationInput | OAuthTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing OAuthTokens.
     */
    cursor?: OAuthTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OAuthTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OAuthTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OAuthTokens.
     */
    distinct?: OAuthTokenScalarFieldEnum | OAuthTokenScalarFieldEnum[]
  }

  /**
   * OAuthToken create
   */
  export type OAuthTokenCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthToken
     */
    select?: OAuthTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthToken
     */
    omit?: OAuthTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthTokenInclude<ExtArgs> | null
    /**
     * The data needed to create a OAuthToken.
     */
    data: XOR<OAuthTokenCreateInput, OAuthTokenUncheckedCreateInput>
  }

  /**
   * OAuthToken createMany
   */
  export type OAuthTokenCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many OAuthTokens.
     */
    data: OAuthTokenCreateManyInput | OAuthTokenCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * OAuthToken createManyAndReturn
   */
  export type OAuthTokenCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthToken
     */
    select?: OAuthTokenSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthToken
     */
    omit?: OAuthTokenOmit<ExtArgs> | null
    /**
     * The data used to create many OAuthTokens.
     */
    data: OAuthTokenCreateManyInput | OAuthTokenCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthTokenIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * OAuthToken update
   */
  export type OAuthTokenUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthToken
     */
    select?: OAuthTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthToken
     */
    omit?: OAuthTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthTokenInclude<ExtArgs> | null
    /**
     * The data needed to update a OAuthToken.
     */
    data: XOR<OAuthTokenUpdateInput, OAuthTokenUncheckedUpdateInput>
    /**
     * Choose, which OAuthToken to update.
     */
    where: OAuthTokenWhereUniqueInput
  }

  /**
   * OAuthToken updateMany
   */
  export type OAuthTokenUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update OAuthTokens.
     */
    data: XOR<OAuthTokenUpdateManyMutationInput, OAuthTokenUncheckedUpdateManyInput>
    /**
     * Filter which OAuthTokens to update
     */
    where?: OAuthTokenWhereInput
    /**
     * Limit how many OAuthTokens to update.
     */
    limit?: number
  }

  /**
   * OAuthToken updateManyAndReturn
   */
  export type OAuthTokenUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthToken
     */
    select?: OAuthTokenSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthToken
     */
    omit?: OAuthTokenOmit<ExtArgs> | null
    /**
     * The data used to update OAuthTokens.
     */
    data: XOR<OAuthTokenUpdateManyMutationInput, OAuthTokenUncheckedUpdateManyInput>
    /**
     * Filter which OAuthTokens to update
     */
    where?: OAuthTokenWhereInput
    /**
     * Limit how many OAuthTokens to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthTokenIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * OAuthToken upsert
   */
  export type OAuthTokenUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthToken
     */
    select?: OAuthTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthToken
     */
    omit?: OAuthTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthTokenInclude<ExtArgs> | null
    /**
     * The filter to search for the OAuthToken to update in case it exists.
     */
    where: OAuthTokenWhereUniqueInput
    /**
     * In case the OAuthToken found by the `where` argument doesn't exist, create a new OAuthToken with this data.
     */
    create: XOR<OAuthTokenCreateInput, OAuthTokenUncheckedCreateInput>
    /**
     * In case the OAuthToken was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OAuthTokenUpdateInput, OAuthTokenUncheckedUpdateInput>
  }

  /**
   * OAuthToken delete
   */
  export type OAuthTokenDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthToken
     */
    select?: OAuthTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthToken
     */
    omit?: OAuthTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthTokenInclude<ExtArgs> | null
    /**
     * Filter which OAuthToken to delete.
     */
    where: OAuthTokenWhereUniqueInput
  }

  /**
   * OAuthToken deleteMany
   */
  export type OAuthTokenDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OAuthTokens to delete
     */
    where?: OAuthTokenWhereInput
    /**
     * Limit how many OAuthTokens to delete.
     */
    limit?: number
  }

  /**
   * OAuthToken without action
   */
  export type OAuthTokenDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthToken
     */
    select?: OAuthTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthToken
     */
    omit?: OAuthTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthTokenInclude<ExtArgs> | null
  }


  /**
   * Model WorkflowRun
   */

  export type AggregateWorkflowRun = {
    _count: WorkflowRunCountAggregateOutputType | null
    _avg: WorkflowRunAvgAggregateOutputType | null
    _sum: WorkflowRunSumAggregateOutputType | null
    _min: WorkflowRunMinAggregateOutputType | null
    _max: WorkflowRunMaxAggregateOutputType | null
  }

  export type WorkflowRunAvgAggregateOutputType = {
    maxSteps: number | null
  }

  export type WorkflowRunSumAggregateOutputType = {
    maxSteps: number | null
  }

  export type WorkflowRunMinAggregateOutputType = {
    id: string | null
    userId: string | null
    conversationId: string | null
    prompt: string | null
    status: $Enums.WorkflowRunStatus | null
    model: string | null
    maxSteps: number | null
    startedAt: Date | null
    endedAt: Date | null
    finalAnswer: string | null
    errorClass: string | null
    errorMessage: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type WorkflowRunMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    conversationId: string | null
    prompt: string | null
    status: $Enums.WorkflowRunStatus | null
    model: string | null
    maxSteps: number | null
    startedAt: Date | null
    endedAt: Date | null
    finalAnswer: string | null
    errorClass: string | null
    errorMessage: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type WorkflowRunCountAggregateOutputType = {
    id: number
    userId: number
    conversationId: number
    prompt: number
    status: number
    model: number
    maxSteps: number
    startedAt: number
    endedAt: number
    finalAnswer: number
    errorClass: number
    errorMessage: number
    metadata: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type WorkflowRunAvgAggregateInputType = {
    maxSteps?: true
  }

  export type WorkflowRunSumAggregateInputType = {
    maxSteps?: true
  }

  export type WorkflowRunMinAggregateInputType = {
    id?: true
    userId?: true
    conversationId?: true
    prompt?: true
    status?: true
    model?: true
    maxSteps?: true
    startedAt?: true
    endedAt?: true
    finalAnswer?: true
    errorClass?: true
    errorMessage?: true
    createdAt?: true
    updatedAt?: true
  }

  export type WorkflowRunMaxAggregateInputType = {
    id?: true
    userId?: true
    conversationId?: true
    prompt?: true
    status?: true
    model?: true
    maxSteps?: true
    startedAt?: true
    endedAt?: true
    finalAnswer?: true
    errorClass?: true
    errorMessage?: true
    createdAt?: true
    updatedAt?: true
  }

  export type WorkflowRunCountAggregateInputType = {
    id?: true
    userId?: true
    conversationId?: true
    prompt?: true
    status?: true
    model?: true
    maxSteps?: true
    startedAt?: true
    endedAt?: true
    finalAnswer?: true
    errorClass?: true
    errorMessage?: true
    metadata?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type WorkflowRunAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WorkflowRun to aggregate.
     */
    where?: WorkflowRunWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WorkflowRuns to fetch.
     */
    orderBy?: WorkflowRunOrderByWithRelationInput | WorkflowRunOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: WorkflowRunWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WorkflowRuns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WorkflowRuns.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned WorkflowRuns
    **/
    _count?: true | WorkflowRunCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: WorkflowRunAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: WorkflowRunSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WorkflowRunMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WorkflowRunMaxAggregateInputType
  }

  export type GetWorkflowRunAggregateType<T extends WorkflowRunAggregateArgs> = {
        [P in keyof T & keyof AggregateWorkflowRun]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWorkflowRun[P]>
      : GetScalarType<T[P], AggregateWorkflowRun[P]>
  }




  export type WorkflowRunGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WorkflowRunWhereInput
    orderBy?: WorkflowRunOrderByWithAggregationInput | WorkflowRunOrderByWithAggregationInput[]
    by: WorkflowRunScalarFieldEnum[] | WorkflowRunScalarFieldEnum
    having?: WorkflowRunScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WorkflowRunCountAggregateInputType | true
    _avg?: WorkflowRunAvgAggregateInputType
    _sum?: WorkflowRunSumAggregateInputType
    _min?: WorkflowRunMinAggregateInputType
    _max?: WorkflowRunMaxAggregateInputType
  }

  export type WorkflowRunGroupByOutputType = {
    id: string
    userId: string
    conversationId: string | null
    prompt: string
    status: $Enums.WorkflowRunStatus
    model: string | null
    maxSteps: number | null
    startedAt: Date | null
    endedAt: Date | null
    finalAnswer: string | null
    errorClass: string | null
    errorMessage: string | null
    metadata: JsonValue | null
    createdAt: Date
    updatedAt: Date
    _count: WorkflowRunCountAggregateOutputType | null
    _avg: WorkflowRunAvgAggregateOutputType | null
    _sum: WorkflowRunSumAggregateOutputType | null
    _min: WorkflowRunMinAggregateOutputType | null
    _max: WorkflowRunMaxAggregateOutputType | null
  }

  type GetWorkflowRunGroupByPayload<T extends WorkflowRunGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<WorkflowRunGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WorkflowRunGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WorkflowRunGroupByOutputType[P]>
            : GetScalarType<T[P], WorkflowRunGroupByOutputType[P]>
        }
      >
    >


  export type WorkflowRunSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    conversationId?: boolean
    prompt?: boolean
    status?: boolean
    model?: boolean
    maxSteps?: boolean
    startedAt?: boolean
    endedAt?: boolean
    finalAnswer?: boolean
    errorClass?: boolean
    errorMessage?: boolean
    metadata?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    conversation?: boolean | WorkflowRun$conversationArgs<ExtArgs>
    steps?: boolean | WorkflowRun$stepsArgs<ExtArgs>
    events?: boolean | WorkflowRun$eventsArgs<ExtArgs>
    checkpoints?: boolean | WorkflowRun$checkpointsArgs<ExtArgs>
    messages?: boolean | WorkflowRun$messagesArgs<ExtArgs>
    _count?: boolean | WorkflowRunCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["workflowRun"]>

  export type WorkflowRunSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    conversationId?: boolean
    prompt?: boolean
    status?: boolean
    model?: boolean
    maxSteps?: boolean
    startedAt?: boolean
    endedAt?: boolean
    finalAnswer?: boolean
    errorClass?: boolean
    errorMessage?: boolean
    metadata?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    conversation?: boolean | WorkflowRun$conversationArgs<ExtArgs>
  }, ExtArgs["result"]["workflowRun"]>

  export type WorkflowRunSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    conversationId?: boolean
    prompt?: boolean
    status?: boolean
    model?: boolean
    maxSteps?: boolean
    startedAt?: boolean
    endedAt?: boolean
    finalAnswer?: boolean
    errorClass?: boolean
    errorMessage?: boolean
    metadata?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    conversation?: boolean | WorkflowRun$conversationArgs<ExtArgs>
  }, ExtArgs["result"]["workflowRun"]>

  export type WorkflowRunSelectScalar = {
    id?: boolean
    userId?: boolean
    conversationId?: boolean
    prompt?: boolean
    status?: boolean
    model?: boolean
    maxSteps?: boolean
    startedAt?: boolean
    endedAt?: boolean
    finalAnswer?: boolean
    errorClass?: boolean
    errorMessage?: boolean
    metadata?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type WorkflowRunOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "conversationId" | "prompt" | "status" | "model" | "maxSteps" | "startedAt" | "endedAt" | "finalAnswer" | "errorClass" | "errorMessage" | "metadata" | "createdAt" | "updatedAt", ExtArgs["result"]["workflowRun"]>
  export type WorkflowRunInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    conversation?: boolean | WorkflowRun$conversationArgs<ExtArgs>
    steps?: boolean | WorkflowRun$stepsArgs<ExtArgs>
    events?: boolean | WorkflowRun$eventsArgs<ExtArgs>
    checkpoints?: boolean | WorkflowRun$checkpointsArgs<ExtArgs>
    messages?: boolean | WorkflowRun$messagesArgs<ExtArgs>
    _count?: boolean | WorkflowRunCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type WorkflowRunIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    conversation?: boolean | WorkflowRun$conversationArgs<ExtArgs>
  }
  export type WorkflowRunIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    conversation?: boolean | WorkflowRun$conversationArgs<ExtArgs>
  }

  export type $WorkflowRunPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "WorkflowRun"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      conversation: Prisma.$ConversationPayload<ExtArgs> | null
      steps: Prisma.$WorkflowStepPayload<ExtArgs>[]
      events: Prisma.$WorkflowEventPayload<ExtArgs>[]
      checkpoints: Prisma.$WorkflowCheckpointPayload<ExtArgs>[]
      messages: Prisma.$RunMessagePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      conversationId: string | null
      prompt: string
      status: $Enums.WorkflowRunStatus
      model: string | null
      maxSteps: number | null
      startedAt: Date | null
      endedAt: Date | null
      finalAnswer: string | null
      errorClass: string | null
      errorMessage: string | null
      metadata: Prisma.JsonValue | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["workflowRun"]>
    composites: {}
  }

  type WorkflowRunGetPayload<S extends boolean | null | undefined | WorkflowRunDefaultArgs> = $Result.GetResult<Prisma.$WorkflowRunPayload, S>

  type WorkflowRunCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<WorkflowRunFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: WorkflowRunCountAggregateInputType | true
    }

  export interface WorkflowRunDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['WorkflowRun'], meta: { name: 'WorkflowRun' } }
    /**
     * Find zero or one WorkflowRun that matches the filter.
     * @param {WorkflowRunFindUniqueArgs} args - Arguments to find a WorkflowRun
     * @example
     * // Get one WorkflowRun
     * const workflowRun = await prisma.workflowRun.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends WorkflowRunFindUniqueArgs>(args: SelectSubset<T, WorkflowRunFindUniqueArgs<ExtArgs>>): Prisma__WorkflowRunClient<$Result.GetResult<Prisma.$WorkflowRunPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one WorkflowRun that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {WorkflowRunFindUniqueOrThrowArgs} args - Arguments to find a WorkflowRun
     * @example
     * // Get one WorkflowRun
     * const workflowRun = await prisma.workflowRun.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends WorkflowRunFindUniqueOrThrowArgs>(args: SelectSubset<T, WorkflowRunFindUniqueOrThrowArgs<ExtArgs>>): Prisma__WorkflowRunClient<$Result.GetResult<Prisma.$WorkflowRunPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first WorkflowRun that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkflowRunFindFirstArgs} args - Arguments to find a WorkflowRun
     * @example
     * // Get one WorkflowRun
     * const workflowRun = await prisma.workflowRun.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends WorkflowRunFindFirstArgs>(args?: SelectSubset<T, WorkflowRunFindFirstArgs<ExtArgs>>): Prisma__WorkflowRunClient<$Result.GetResult<Prisma.$WorkflowRunPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first WorkflowRun that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkflowRunFindFirstOrThrowArgs} args - Arguments to find a WorkflowRun
     * @example
     * // Get one WorkflowRun
     * const workflowRun = await prisma.workflowRun.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends WorkflowRunFindFirstOrThrowArgs>(args?: SelectSubset<T, WorkflowRunFindFirstOrThrowArgs<ExtArgs>>): Prisma__WorkflowRunClient<$Result.GetResult<Prisma.$WorkflowRunPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more WorkflowRuns that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkflowRunFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all WorkflowRuns
     * const workflowRuns = await prisma.workflowRun.findMany()
     * 
     * // Get first 10 WorkflowRuns
     * const workflowRuns = await prisma.workflowRun.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const workflowRunWithIdOnly = await prisma.workflowRun.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends WorkflowRunFindManyArgs>(args?: SelectSubset<T, WorkflowRunFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkflowRunPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a WorkflowRun.
     * @param {WorkflowRunCreateArgs} args - Arguments to create a WorkflowRun.
     * @example
     * // Create one WorkflowRun
     * const WorkflowRun = await prisma.workflowRun.create({
     *   data: {
     *     // ... data to create a WorkflowRun
     *   }
     * })
     * 
     */
    create<T extends WorkflowRunCreateArgs>(args: SelectSubset<T, WorkflowRunCreateArgs<ExtArgs>>): Prisma__WorkflowRunClient<$Result.GetResult<Prisma.$WorkflowRunPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many WorkflowRuns.
     * @param {WorkflowRunCreateManyArgs} args - Arguments to create many WorkflowRuns.
     * @example
     * // Create many WorkflowRuns
     * const workflowRun = await prisma.workflowRun.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends WorkflowRunCreateManyArgs>(args?: SelectSubset<T, WorkflowRunCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many WorkflowRuns and returns the data saved in the database.
     * @param {WorkflowRunCreateManyAndReturnArgs} args - Arguments to create many WorkflowRuns.
     * @example
     * // Create many WorkflowRuns
     * const workflowRun = await prisma.workflowRun.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many WorkflowRuns and only return the `id`
     * const workflowRunWithIdOnly = await prisma.workflowRun.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends WorkflowRunCreateManyAndReturnArgs>(args?: SelectSubset<T, WorkflowRunCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkflowRunPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a WorkflowRun.
     * @param {WorkflowRunDeleteArgs} args - Arguments to delete one WorkflowRun.
     * @example
     * // Delete one WorkflowRun
     * const WorkflowRun = await prisma.workflowRun.delete({
     *   where: {
     *     // ... filter to delete one WorkflowRun
     *   }
     * })
     * 
     */
    delete<T extends WorkflowRunDeleteArgs>(args: SelectSubset<T, WorkflowRunDeleteArgs<ExtArgs>>): Prisma__WorkflowRunClient<$Result.GetResult<Prisma.$WorkflowRunPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one WorkflowRun.
     * @param {WorkflowRunUpdateArgs} args - Arguments to update one WorkflowRun.
     * @example
     * // Update one WorkflowRun
     * const workflowRun = await prisma.workflowRun.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends WorkflowRunUpdateArgs>(args: SelectSubset<T, WorkflowRunUpdateArgs<ExtArgs>>): Prisma__WorkflowRunClient<$Result.GetResult<Prisma.$WorkflowRunPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more WorkflowRuns.
     * @param {WorkflowRunDeleteManyArgs} args - Arguments to filter WorkflowRuns to delete.
     * @example
     * // Delete a few WorkflowRuns
     * const { count } = await prisma.workflowRun.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends WorkflowRunDeleteManyArgs>(args?: SelectSubset<T, WorkflowRunDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WorkflowRuns.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkflowRunUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many WorkflowRuns
     * const workflowRun = await prisma.workflowRun.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends WorkflowRunUpdateManyArgs>(args: SelectSubset<T, WorkflowRunUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WorkflowRuns and returns the data updated in the database.
     * @param {WorkflowRunUpdateManyAndReturnArgs} args - Arguments to update many WorkflowRuns.
     * @example
     * // Update many WorkflowRuns
     * const workflowRun = await prisma.workflowRun.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more WorkflowRuns and only return the `id`
     * const workflowRunWithIdOnly = await prisma.workflowRun.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends WorkflowRunUpdateManyAndReturnArgs>(args: SelectSubset<T, WorkflowRunUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkflowRunPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one WorkflowRun.
     * @param {WorkflowRunUpsertArgs} args - Arguments to update or create a WorkflowRun.
     * @example
     * // Update or create a WorkflowRun
     * const workflowRun = await prisma.workflowRun.upsert({
     *   create: {
     *     // ... data to create a WorkflowRun
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the WorkflowRun we want to update
     *   }
     * })
     */
    upsert<T extends WorkflowRunUpsertArgs>(args: SelectSubset<T, WorkflowRunUpsertArgs<ExtArgs>>): Prisma__WorkflowRunClient<$Result.GetResult<Prisma.$WorkflowRunPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of WorkflowRuns.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkflowRunCountArgs} args - Arguments to filter WorkflowRuns to count.
     * @example
     * // Count the number of WorkflowRuns
     * const count = await prisma.workflowRun.count({
     *   where: {
     *     // ... the filter for the WorkflowRuns we want to count
     *   }
     * })
    **/
    count<T extends WorkflowRunCountArgs>(
      args?: Subset<T, WorkflowRunCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WorkflowRunCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a WorkflowRun.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkflowRunAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends WorkflowRunAggregateArgs>(args: Subset<T, WorkflowRunAggregateArgs>): Prisma.PrismaPromise<GetWorkflowRunAggregateType<T>>

    /**
     * Group by WorkflowRun.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkflowRunGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends WorkflowRunGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WorkflowRunGroupByArgs['orderBy'] }
        : { orderBy?: WorkflowRunGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, WorkflowRunGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWorkflowRunGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the WorkflowRun model
   */
  readonly fields: WorkflowRunFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for WorkflowRun.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__WorkflowRunClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    conversation<T extends WorkflowRun$conversationArgs<ExtArgs> = {}>(args?: Subset<T, WorkflowRun$conversationArgs<ExtArgs>>): Prisma__ConversationClient<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    steps<T extends WorkflowRun$stepsArgs<ExtArgs> = {}>(args?: Subset<T, WorkflowRun$stepsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkflowStepPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    events<T extends WorkflowRun$eventsArgs<ExtArgs> = {}>(args?: Subset<T, WorkflowRun$eventsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkflowEventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    checkpoints<T extends WorkflowRun$checkpointsArgs<ExtArgs> = {}>(args?: Subset<T, WorkflowRun$checkpointsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkflowCheckpointPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    messages<T extends WorkflowRun$messagesArgs<ExtArgs> = {}>(args?: Subset<T, WorkflowRun$messagesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RunMessagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the WorkflowRun model
   */
  interface WorkflowRunFieldRefs {
    readonly id: FieldRef<"WorkflowRun", 'String'>
    readonly userId: FieldRef<"WorkflowRun", 'String'>
    readonly conversationId: FieldRef<"WorkflowRun", 'String'>
    readonly prompt: FieldRef<"WorkflowRun", 'String'>
    readonly status: FieldRef<"WorkflowRun", 'WorkflowRunStatus'>
    readonly model: FieldRef<"WorkflowRun", 'String'>
    readonly maxSteps: FieldRef<"WorkflowRun", 'Int'>
    readonly startedAt: FieldRef<"WorkflowRun", 'DateTime'>
    readonly endedAt: FieldRef<"WorkflowRun", 'DateTime'>
    readonly finalAnswer: FieldRef<"WorkflowRun", 'String'>
    readonly errorClass: FieldRef<"WorkflowRun", 'String'>
    readonly errorMessage: FieldRef<"WorkflowRun", 'String'>
    readonly metadata: FieldRef<"WorkflowRun", 'Json'>
    readonly createdAt: FieldRef<"WorkflowRun", 'DateTime'>
    readonly updatedAt: FieldRef<"WorkflowRun", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * WorkflowRun findUnique
   */
  export type WorkflowRunFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowRun
     */
    select?: WorkflowRunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkflowRun
     */
    omit?: WorkflowRunOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowRunInclude<ExtArgs> | null
    /**
     * Filter, which WorkflowRun to fetch.
     */
    where: WorkflowRunWhereUniqueInput
  }

  /**
   * WorkflowRun findUniqueOrThrow
   */
  export type WorkflowRunFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowRun
     */
    select?: WorkflowRunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkflowRun
     */
    omit?: WorkflowRunOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowRunInclude<ExtArgs> | null
    /**
     * Filter, which WorkflowRun to fetch.
     */
    where: WorkflowRunWhereUniqueInput
  }

  /**
   * WorkflowRun findFirst
   */
  export type WorkflowRunFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowRun
     */
    select?: WorkflowRunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkflowRun
     */
    omit?: WorkflowRunOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowRunInclude<ExtArgs> | null
    /**
     * Filter, which WorkflowRun to fetch.
     */
    where?: WorkflowRunWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WorkflowRuns to fetch.
     */
    orderBy?: WorkflowRunOrderByWithRelationInput | WorkflowRunOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WorkflowRuns.
     */
    cursor?: WorkflowRunWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WorkflowRuns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WorkflowRuns.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WorkflowRuns.
     */
    distinct?: WorkflowRunScalarFieldEnum | WorkflowRunScalarFieldEnum[]
  }

  /**
   * WorkflowRun findFirstOrThrow
   */
  export type WorkflowRunFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowRun
     */
    select?: WorkflowRunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkflowRun
     */
    omit?: WorkflowRunOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowRunInclude<ExtArgs> | null
    /**
     * Filter, which WorkflowRun to fetch.
     */
    where?: WorkflowRunWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WorkflowRuns to fetch.
     */
    orderBy?: WorkflowRunOrderByWithRelationInput | WorkflowRunOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WorkflowRuns.
     */
    cursor?: WorkflowRunWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WorkflowRuns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WorkflowRuns.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WorkflowRuns.
     */
    distinct?: WorkflowRunScalarFieldEnum | WorkflowRunScalarFieldEnum[]
  }

  /**
   * WorkflowRun findMany
   */
  export type WorkflowRunFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowRun
     */
    select?: WorkflowRunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkflowRun
     */
    omit?: WorkflowRunOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowRunInclude<ExtArgs> | null
    /**
     * Filter, which WorkflowRuns to fetch.
     */
    where?: WorkflowRunWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WorkflowRuns to fetch.
     */
    orderBy?: WorkflowRunOrderByWithRelationInput | WorkflowRunOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing WorkflowRuns.
     */
    cursor?: WorkflowRunWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WorkflowRuns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WorkflowRuns.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WorkflowRuns.
     */
    distinct?: WorkflowRunScalarFieldEnum | WorkflowRunScalarFieldEnum[]
  }

  /**
   * WorkflowRun create
   */
  export type WorkflowRunCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowRun
     */
    select?: WorkflowRunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkflowRun
     */
    omit?: WorkflowRunOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowRunInclude<ExtArgs> | null
    /**
     * The data needed to create a WorkflowRun.
     */
    data: XOR<WorkflowRunCreateInput, WorkflowRunUncheckedCreateInput>
  }

  /**
   * WorkflowRun createMany
   */
  export type WorkflowRunCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many WorkflowRuns.
     */
    data: WorkflowRunCreateManyInput | WorkflowRunCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * WorkflowRun createManyAndReturn
   */
  export type WorkflowRunCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowRun
     */
    select?: WorkflowRunSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the WorkflowRun
     */
    omit?: WorkflowRunOmit<ExtArgs> | null
    /**
     * The data used to create many WorkflowRuns.
     */
    data: WorkflowRunCreateManyInput | WorkflowRunCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowRunIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * WorkflowRun update
   */
  export type WorkflowRunUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowRun
     */
    select?: WorkflowRunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkflowRun
     */
    omit?: WorkflowRunOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowRunInclude<ExtArgs> | null
    /**
     * The data needed to update a WorkflowRun.
     */
    data: XOR<WorkflowRunUpdateInput, WorkflowRunUncheckedUpdateInput>
    /**
     * Choose, which WorkflowRun to update.
     */
    where: WorkflowRunWhereUniqueInput
  }

  /**
   * WorkflowRun updateMany
   */
  export type WorkflowRunUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update WorkflowRuns.
     */
    data: XOR<WorkflowRunUpdateManyMutationInput, WorkflowRunUncheckedUpdateManyInput>
    /**
     * Filter which WorkflowRuns to update
     */
    where?: WorkflowRunWhereInput
    /**
     * Limit how many WorkflowRuns to update.
     */
    limit?: number
  }

  /**
   * WorkflowRun updateManyAndReturn
   */
  export type WorkflowRunUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowRun
     */
    select?: WorkflowRunSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the WorkflowRun
     */
    omit?: WorkflowRunOmit<ExtArgs> | null
    /**
     * The data used to update WorkflowRuns.
     */
    data: XOR<WorkflowRunUpdateManyMutationInput, WorkflowRunUncheckedUpdateManyInput>
    /**
     * Filter which WorkflowRuns to update
     */
    where?: WorkflowRunWhereInput
    /**
     * Limit how many WorkflowRuns to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowRunIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * WorkflowRun upsert
   */
  export type WorkflowRunUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowRun
     */
    select?: WorkflowRunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkflowRun
     */
    omit?: WorkflowRunOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowRunInclude<ExtArgs> | null
    /**
     * The filter to search for the WorkflowRun to update in case it exists.
     */
    where: WorkflowRunWhereUniqueInput
    /**
     * In case the WorkflowRun found by the `where` argument doesn't exist, create a new WorkflowRun with this data.
     */
    create: XOR<WorkflowRunCreateInput, WorkflowRunUncheckedCreateInput>
    /**
     * In case the WorkflowRun was found with the provided `where` argument, update it with this data.
     */
    update: XOR<WorkflowRunUpdateInput, WorkflowRunUncheckedUpdateInput>
  }

  /**
   * WorkflowRun delete
   */
  export type WorkflowRunDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowRun
     */
    select?: WorkflowRunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkflowRun
     */
    omit?: WorkflowRunOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowRunInclude<ExtArgs> | null
    /**
     * Filter which WorkflowRun to delete.
     */
    where: WorkflowRunWhereUniqueInput
  }

  /**
   * WorkflowRun deleteMany
   */
  export type WorkflowRunDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WorkflowRuns to delete
     */
    where?: WorkflowRunWhereInput
    /**
     * Limit how many WorkflowRuns to delete.
     */
    limit?: number
  }

  /**
   * WorkflowRun.conversation
   */
  export type WorkflowRun$conversationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Conversation
     */
    omit?: ConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationInclude<ExtArgs> | null
    where?: ConversationWhereInput
  }

  /**
   * WorkflowRun.steps
   */
  export type WorkflowRun$stepsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowStep
     */
    select?: WorkflowStepSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkflowStep
     */
    omit?: WorkflowStepOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowStepInclude<ExtArgs> | null
    where?: WorkflowStepWhereInput
    orderBy?: WorkflowStepOrderByWithRelationInput | WorkflowStepOrderByWithRelationInput[]
    cursor?: WorkflowStepWhereUniqueInput
    take?: number
    skip?: number
    distinct?: WorkflowStepScalarFieldEnum | WorkflowStepScalarFieldEnum[]
  }

  /**
   * WorkflowRun.events
   */
  export type WorkflowRun$eventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowEvent
     */
    select?: WorkflowEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkflowEvent
     */
    omit?: WorkflowEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowEventInclude<ExtArgs> | null
    where?: WorkflowEventWhereInput
    orderBy?: WorkflowEventOrderByWithRelationInput | WorkflowEventOrderByWithRelationInput[]
    cursor?: WorkflowEventWhereUniqueInput
    take?: number
    skip?: number
    distinct?: WorkflowEventScalarFieldEnum | WorkflowEventScalarFieldEnum[]
  }

  /**
   * WorkflowRun.checkpoints
   */
  export type WorkflowRun$checkpointsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowCheckpoint
     */
    select?: WorkflowCheckpointSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkflowCheckpoint
     */
    omit?: WorkflowCheckpointOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowCheckpointInclude<ExtArgs> | null
    where?: WorkflowCheckpointWhereInput
    orderBy?: WorkflowCheckpointOrderByWithRelationInput | WorkflowCheckpointOrderByWithRelationInput[]
    cursor?: WorkflowCheckpointWhereUniqueInput
    take?: number
    skip?: number
    distinct?: WorkflowCheckpointScalarFieldEnum | WorkflowCheckpointScalarFieldEnum[]
  }

  /**
   * WorkflowRun.messages
   */
  export type WorkflowRun$messagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RunMessage
     */
    select?: RunMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RunMessage
     */
    omit?: RunMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RunMessageInclude<ExtArgs> | null
    where?: RunMessageWhereInput
    orderBy?: RunMessageOrderByWithRelationInput | RunMessageOrderByWithRelationInput[]
    cursor?: RunMessageWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RunMessageScalarFieldEnum | RunMessageScalarFieldEnum[]
  }

  /**
   * WorkflowRun without action
   */
  export type WorkflowRunDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowRun
     */
    select?: WorkflowRunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkflowRun
     */
    omit?: WorkflowRunOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowRunInclude<ExtArgs> | null
  }


  /**
   * Model WorkflowStep
   */

  export type AggregateWorkflowStep = {
    _count: WorkflowStepCountAggregateOutputType | null
    _avg: WorkflowStepAvgAggregateOutputType | null
    _sum: WorkflowStepSumAggregateOutputType | null
    _min: WorkflowStepMinAggregateOutputType | null
    _max: WorkflowStepMaxAggregateOutputType | null
  }

  export type WorkflowStepAvgAggregateOutputType = {
    retryCount: number | null
  }

  export type WorkflowStepSumAggregateOutputType = {
    retryCount: number | null
  }

  export type WorkflowStepMinAggregateOutputType = {
    id: string | null
    runId: string | null
    stepId: string | null
    stepType: $Enums.WorkflowStepType | null
    status: $Enums.WorkflowStepStatus | null
    toolName: string | null
    errorClass: string | null
    errorMessage: string | null
    retryCount: number | null
    startedAt: Date | null
    endedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type WorkflowStepMaxAggregateOutputType = {
    id: string | null
    runId: string | null
    stepId: string | null
    stepType: $Enums.WorkflowStepType | null
    status: $Enums.WorkflowStepStatus | null
    toolName: string | null
    errorClass: string | null
    errorMessage: string | null
    retryCount: number | null
    startedAt: Date | null
    endedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type WorkflowStepCountAggregateOutputType = {
    id: number
    runId: number
    stepId: number
    stepType: number
    status: number
    toolName: number
    input: number
    output: number
    errorClass: number
    errorMessage: number
    retryCount: number
    startedAt: number
    endedAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type WorkflowStepAvgAggregateInputType = {
    retryCount?: true
  }

  export type WorkflowStepSumAggregateInputType = {
    retryCount?: true
  }

  export type WorkflowStepMinAggregateInputType = {
    id?: true
    runId?: true
    stepId?: true
    stepType?: true
    status?: true
    toolName?: true
    errorClass?: true
    errorMessage?: true
    retryCount?: true
    startedAt?: true
    endedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type WorkflowStepMaxAggregateInputType = {
    id?: true
    runId?: true
    stepId?: true
    stepType?: true
    status?: true
    toolName?: true
    errorClass?: true
    errorMessage?: true
    retryCount?: true
    startedAt?: true
    endedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type WorkflowStepCountAggregateInputType = {
    id?: true
    runId?: true
    stepId?: true
    stepType?: true
    status?: true
    toolName?: true
    input?: true
    output?: true
    errorClass?: true
    errorMessage?: true
    retryCount?: true
    startedAt?: true
    endedAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type WorkflowStepAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WorkflowStep to aggregate.
     */
    where?: WorkflowStepWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WorkflowSteps to fetch.
     */
    orderBy?: WorkflowStepOrderByWithRelationInput | WorkflowStepOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: WorkflowStepWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WorkflowSteps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WorkflowSteps.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned WorkflowSteps
    **/
    _count?: true | WorkflowStepCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: WorkflowStepAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: WorkflowStepSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WorkflowStepMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WorkflowStepMaxAggregateInputType
  }

  export type GetWorkflowStepAggregateType<T extends WorkflowStepAggregateArgs> = {
        [P in keyof T & keyof AggregateWorkflowStep]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWorkflowStep[P]>
      : GetScalarType<T[P], AggregateWorkflowStep[P]>
  }




  export type WorkflowStepGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WorkflowStepWhereInput
    orderBy?: WorkflowStepOrderByWithAggregationInput | WorkflowStepOrderByWithAggregationInput[]
    by: WorkflowStepScalarFieldEnum[] | WorkflowStepScalarFieldEnum
    having?: WorkflowStepScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WorkflowStepCountAggregateInputType | true
    _avg?: WorkflowStepAvgAggregateInputType
    _sum?: WorkflowStepSumAggregateInputType
    _min?: WorkflowStepMinAggregateInputType
    _max?: WorkflowStepMaxAggregateInputType
  }

  export type WorkflowStepGroupByOutputType = {
    id: string
    runId: string
    stepId: string
    stepType: $Enums.WorkflowStepType
    status: $Enums.WorkflowStepStatus
    toolName: string | null
    input: JsonValue | null
    output: JsonValue | null
    errorClass: string | null
    errorMessage: string | null
    retryCount: number
    startedAt: Date | null
    endedAt: Date | null
    createdAt: Date
    updatedAt: Date
    _count: WorkflowStepCountAggregateOutputType | null
    _avg: WorkflowStepAvgAggregateOutputType | null
    _sum: WorkflowStepSumAggregateOutputType | null
    _min: WorkflowStepMinAggregateOutputType | null
    _max: WorkflowStepMaxAggregateOutputType | null
  }

  type GetWorkflowStepGroupByPayload<T extends WorkflowStepGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<WorkflowStepGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WorkflowStepGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WorkflowStepGroupByOutputType[P]>
            : GetScalarType<T[P], WorkflowStepGroupByOutputType[P]>
        }
      >
    >


  export type WorkflowStepSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    runId?: boolean
    stepId?: boolean
    stepType?: boolean
    status?: boolean
    toolName?: boolean
    input?: boolean
    output?: boolean
    errorClass?: boolean
    errorMessage?: boolean
    retryCount?: boolean
    startedAt?: boolean
    endedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    run?: boolean | WorkflowRunDefaultArgs<ExtArgs>
    events?: boolean | WorkflowStep$eventsArgs<ExtArgs>
    checkpoints?: boolean | WorkflowStep$checkpointsArgs<ExtArgs>
    _count?: boolean | WorkflowStepCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["workflowStep"]>

  export type WorkflowStepSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    runId?: boolean
    stepId?: boolean
    stepType?: boolean
    status?: boolean
    toolName?: boolean
    input?: boolean
    output?: boolean
    errorClass?: boolean
    errorMessage?: boolean
    retryCount?: boolean
    startedAt?: boolean
    endedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    run?: boolean | WorkflowRunDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["workflowStep"]>

  export type WorkflowStepSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    runId?: boolean
    stepId?: boolean
    stepType?: boolean
    status?: boolean
    toolName?: boolean
    input?: boolean
    output?: boolean
    errorClass?: boolean
    errorMessage?: boolean
    retryCount?: boolean
    startedAt?: boolean
    endedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    run?: boolean | WorkflowRunDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["workflowStep"]>

  export type WorkflowStepSelectScalar = {
    id?: boolean
    runId?: boolean
    stepId?: boolean
    stepType?: boolean
    status?: boolean
    toolName?: boolean
    input?: boolean
    output?: boolean
    errorClass?: boolean
    errorMessage?: boolean
    retryCount?: boolean
    startedAt?: boolean
    endedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type WorkflowStepOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "runId" | "stepId" | "stepType" | "status" | "toolName" | "input" | "output" | "errorClass" | "errorMessage" | "retryCount" | "startedAt" | "endedAt" | "createdAt" | "updatedAt", ExtArgs["result"]["workflowStep"]>
  export type WorkflowStepInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    run?: boolean | WorkflowRunDefaultArgs<ExtArgs>
    events?: boolean | WorkflowStep$eventsArgs<ExtArgs>
    checkpoints?: boolean | WorkflowStep$checkpointsArgs<ExtArgs>
    _count?: boolean | WorkflowStepCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type WorkflowStepIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    run?: boolean | WorkflowRunDefaultArgs<ExtArgs>
  }
  export type WorkflowStepIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    run?: boolean | WorkflowRunDefaultArgs<ExtArgs>
  }

  export type $WorkflowStepPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "WorkflowStep"
    objects: {
      run: Prisma.$WorkflowRunPayload<ExtArgs>
      events: Prisma.$WorkflowEventPayload<ExtArgs>[]
      checkpoints: Prisma.$WorkflowCheckpointPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      runId: string
      stepId: string
      stepType: $Enums.WorkflowStepType
      status: $Enums.WorkflowStepStatus
      toolName: string | null
      input: Prisma.JsonValue | null
      output: Prisma.JsonValue | null
      errorClass: string | null
      errorMessage: string | null
      retryCount: number
      startedAt: Date | null
      endedAt: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["workflowStep"]>
    composites: {}
  }

  type WorkflowStepGetPayload<S extends boolean | null | undefined | WorkflowStepDefaultArgs> = $Result.GetResult<Prisma.$WorkflowStepPayload, S>

  type WorkflowStepCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<WorkflowStepFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: WorkflowStepCountAggregateInputType | true
    }

  export interface WorkflowStepDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['WorkflowStep'], meta: { name: 'WorkflowStep' } }
    /**
     * Find zero or one WorkflowStep that matches the filter.
     * @param {WorkflowStepFindUniqueArgs} args - Arguments to find a WorkflowStep
     * @example
     * // Get one WorkflowStep
     * const workflowStep = await prisma.workflowStep.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends WorkflowStepFindUniqueArgs>(args: SelectSubset<T, WorkflowStepFindUniqueArgs<ExtArgs>>): Prisma__WorkflowStepClient<$Result.GetResult<Prisma.$WorkflowStepPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one WorkflowStep that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {WorkflowStepFindUniqueOrThrowArgs} args - Arguments to find a WorkflowStep
     * @example
     * // Get one WorkflowStep
     * const workflowStep = await prisma.workflowStep.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends WorkflowStepFindUniqueOrThrowArgs>(args: SelectSubset<T, WorkflowStepFindUniqueOrThrowArgs<ExtArgs>>): Prisma__WorkflowStepClient<$Result.GetResult<Prisma.$WorkflowStepPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first WorkflowStep that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkflowStepFindFirstArgs} args - Arguments to find a WorkflowStep
     * @example
     * // Get one WorkflowStep
     * const workflowStep = await prisma.workflowStep.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends WorkflowStepFindFirstArgs>(args?: SelectSubset<T, WorkflowStepFindFirstArgs<ExtArgs>>): Prisma__WorkflowStepClient<$Result.GetResult<Prisma.$WorkflowStepPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first WorkflowStep that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkflowStepFindFirstOrThrowArgs} args - Arguments to find a WorkflowStep
     * @example
     * // Get one WorkflowStep
     * const workflowStep = await prisma.workflowStep.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends WorkflowStepFindFirstOrThrowArgs>(args?: SelectSubset<T, WorkflowStepFindFirstOrThrowArgs<ExtArgs>>): Prisma__WorkflowStepClient<$Result.GetResult<Prisma.$WorkflowStepPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more WorkflowSteps that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkflowStepFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all WorkflowSteps
     * const workflowSteps = await prisma.workflowStep.findMany()
     * 
     * // Get first 10 WorkflowSteps
     * const workflowSteps = await prisma.workflowStep.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const workflowStepWithIdOnly = await prisma.workflowStep.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends WorkflowStepFindManyArgs>(args?: SelectSubset<T, WorkflowStepFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkflowStepPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a WorkflowStep.
     * @param {WorkflowStepCreateArgs} args - Arguments to create a WorkflowStep.
     * @example
     * // Create one WorkflowStep
     * const WorkflowStep = await prisma.workflowStep.create({
     *   data: {
     *     // ... data to create a WorkflowStep
     *   }
     * })
     * 
     */
    create<T extends WorkflowStepCreateArgs>(args: SelectSubset<T, WorkflowStepCreateArgs<ExtArgs>>): Prisma__WorkflowStepClient<$Result.GetResult<Prisma.$WorkflowStepPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many WorkflowSteps.
     * @param {WorkflowStepCreateManyArgs} args - Arguments to create many WorkflowSteps.
     * @example
     * // Create many WorkflowSteps
     * const workflowStep = await prisma.workflowStep.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends WorkflowStepCreateManyArgs>(args?: SelectSubset<T, WorkflowStepCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many WorkflowSteps and returns the data saved in the database.
     * @param {WorkflowStepCreateManyAndReturnArgs} args - Arguments to create many WorkflowSteps.
     * @example
     * // Create many WorkflowSteps
     * const workflowStep = await prisma.workflowStep.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many WorkflowSteps and only return the `id`
     * const workflowStepWithIdOnly = await prisma.workflowStep.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends WorkflowStepCreateManyAndReturnArgs>(args?: SelectSubset<T, WorkflowStepCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkflowStepPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a WorkflowStep.
     * @param {WorkflowStepDeleteArgs} args - Arguments to delete one WorkflowStep.
     * @example
     * // Delete one WorkflowStep
     * const WorkflowStep = await prisma.workflowStep.delete({
     *   where: {
     *     // ... filter to delete one WorkflowStep
     *   }
     * })
     * 
     */
    delete<T extends WorkflowStepDeleteArgs>(args: SelectSubset<T, WorkflowStepDeleteArgs<ExtArgs>>): Prisma__WorkflowStepClient<$Result.GetResult<Prisma.$WorkflowStepPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one WorkflowStep.
     * @param {WorkflowStepUpdateArgs} args - Arguments to update one WorkflowStep.
     * @example
     * // Update one WorkflowStep
     * const workflowStep = await prisma.workflowStep.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends WorkflowStepUpdateArgs>(args: SelectSubset<T, WorkflowStepUpdateArgs<ExtArgs>>): Prisma__WorkflowStepClient<$Result.GetResult<Prisma.$WorkflowStepPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more WorkflowSteps.
     * @param {WorkflowStepDeleteManyArgs} args - Arguments to filter WorkflowSteps to delete.
     * @example
     * // Delete a few WorkflowSteps
     * const { count } = await prisma.workflowStep.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends WorkflowStepDeleteManyArgs>(args?: SelectSubset<T, WorkflowStepDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WorkflowSteps.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkflowStepUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many WorkflowSteps
     * const workflowStep = await prisma.workflowStep.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends WorkflowStepUpdateManyArgs>(args: SelectSubset<T, WorkflowStepUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WorkflowSteps and returns the data updated in the database.
     * @param {WorkflowStepUpdateManyAndReturnArgs} args - Arguments to update many WorkflowSteps.
     * @example
     * // Update many WorkflowSteps
     * const workflowStep = await prisma.workflowStep.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more WorkflowSteps and only return the `id`
     * const workflowStepWithIdOnly = await prisma.workflowStep.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends WorkflowStepUpdateManyAndReturnArgs>(args: SelectSubset<T, WorkflowStepUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkflowStepPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one WorkflowStep.
     * @param {WorkflowStepUpsertArgs} args - Arguments to update or create a WorkflowStep.
     * @example
     * // Update or create a WorkflowStep
     * const workflowStep = await prisma.workflowStep.upsert({
     *   create: {
     *     // ... data to create a WorkflowStep
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the WorkflowStep we want to update
     *   }
     * })
     */
    upsert<T extends WorkflowStepUpsertArgs>(args: SelectSubset<T, WorkflowStepUpsertArgs<ExtArgs>>): Prisma__WorkflowStepClient<$Result.GetResult<Prisma.$WorkflowStepPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of WorkflowSteps.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkflowStepCountArgs} args - Arguments to filter WorkflowSteps to count.
     * @example
     * // Count the number of WorkflowSteps
     * const count = await prisma.workflowStep.count({
     *   where: {
     *     // ... the filter for the WorkflowSteps we want to count
     *   }
     * })
    **/
    count<T extends WorkflowStepCountArgs>(
      args?: Subset<T, WorkflowStepCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WorkflowStepCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a WorkflowStep.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkflowStepAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends WorkflowStepAggregateArgs>(args: Subset<T, WorkflowStepAggregateArgs>): Prisma.PrismaPromise<GetWorkflowStepAggregateType<T>>

    /**
     * Group by WorkflowStep.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkflowStepGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends WorkflowStepGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WorkflowStepGroupByArgs['orderBy'] }
        : { orderBy?: WorkflowStepGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, WorkflowStepGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWorkflowStepGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the WorkflowStep model
   */
  readonly fields: WorkflowStepFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for WorkflowStep.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__WorkflowStepClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    run<T extends WorkflowRunDefaultArgs<ExtArgs> = {}>(args?: Subset<T, WorkflowRunDefaultArgs<ExtArgs>>): Prisma__WorkflowRunClient<$Result.GetResult<Prisma.$WorkflowRunPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    events<T extends WorkflowStep$eventsArgs<ExtArgs> = {}>(args?: Subset<T, WorkflowStep$eventsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkflowEventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    checkpoints<T extends WorkflowStep$checkpointsArgs<ExtArgs> = {}>(args?: Subset<T, WorkflowStep$checkpointsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkflowCheckpointPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the WorkflowStep model
   */
  interface WorkflowStepFieldRefs {
    readonly id: FieldRef<"WorkflowStep", 'String'>
    readonly runId: FieldRef<"WorkflowStep", 'String'>
    readonly stepId: FieldRef<"WorkflowStep", 'String'>
    readonly stepType: FieldRef<"WorkflowStep", 'WorkflowStepType'>
    readonly status: FieldRef<"WorkflowStep", 'WorkflowStepStatus'>
    readonly toolName: FieldRef<"WorkflowStep", 'String'>
    readonly input: FieldRef<"WorkflowStep", 'Json'>
    readonly output: FieldRef<"WorkflowStep", 'Json'>
    readonly errorClass: FieldRef<"WorkflowStep", 'String'>
    readonly errorMessage: FieldRef<"WorkflowStep", 'String'>
    readonly retryCount: FieldRef<"WorkflowStep", 'Int'>
    readonly startedAt: FieldRef<"WorkflowStep", 'DateTime'>
    readonly endedAt: FieldRef<"WorkflowStep", 'DateTime'>
    readonly createdAt: FieldRef<"WorkflowStep", 'DateTime'>
    readonly updatedAt: FieldRef<"WorkflowStep", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * WorkflowStep findUnique
   */
  export type WorkflowStepFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowStep
     */
    select?: WorkflowStepSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkflowStep
     */
    omit?: WorkflowStepOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowStepInclude<ExtArgs> | null
    /**
     * Filter, which WorkflowStep to fetch.
     */
    where: WorkflowStepWhereUniqueInput
  }

  /**
   * WorkflowStep findUniqueOrThrow
   */
  export type WorkflowStepFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowStep
     */
    select?: WorkflowStepSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkflowStep
     */
    omit?: WorkflowStepOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowStepInclude<ExtArgs> | null
    /**
     * Filter, which WorkflowStep to fetch.
     */
    where: WorkflowStepWhereUniqueInput
  }

  /**
   * WorkflowStep findFirst
   */
  export type WorkflowStepFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowStep
     */
    select?: WorkflowStepSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkflowStep
     */
    omit?: WorkflowStepOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowStepInclude<ExtArgs> | null
    /**
     * Filter, which WorkflowStep to fetch.
     */
    where?: WorkflowStepWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WorkflowSteps to fetch.
     */
    orderBy?: WorkflowStepOrderByWithRelationInput | WorkflowStepOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WorkflowSteps.
     */
    cursor?: WorkflowStepWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WorkflowSteps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WorkflowSteps.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WorkflowSteps.
     */
    distinct?: WorkflowStepScalarFieldEnum | WorkflowStepScalarFieldEnum[]
  }

  /**
   * WorkflowStep findFirstOrThrow
   */
  export type WorkflowStepFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowStep
     */
    select?: WorkflowStepSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkflowStep
     */
    omit?: WorkflowStepOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowStepInclude<ExtArgs> | null
    /**
     * Filter, which WorkflowStep to fetch.
     */
    where?: WorkflowStepWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WorkflowSteps to fetch.
     */
    orderBy?: WorkflowStepOrderByWithRelationInput | WorkflowStepOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WorkflowSteps.
     */
    cursor?: WorkflowStepWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WorkflowSteps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WorkflowSteps.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WorkflowSteps.
     */
    distinct?: WorkflowStepScalarFieldEnum | WorkflowStepScalarFieldEnum[]
  }

  /**
   * WorkflowStep findMany
   */
  export type WorkflowStepFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowStep
     */
    select?: WorkflowStepSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkflowStep
     */
    omit?: WorkflowStepOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowStepInclude<ExtArgs> | null
    /**
     * Filter, which WorkflowSteps to fetch.
     */
    where?: WorkflowStepWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WorkflowSteps to fetch.
     */
    orderBy?: WorkflowStepOrderByWithRelationInput | WorkflowStepOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing WorkflowSteps.
     */
    cursor?: WorkflowStepWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WorkflowSteps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WorkflowSteps.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WorkflowSteps.
     */
    distinct?: WorkflowStepScalarFieldEnum | WorkflowStepScalarFieldEnum[]
  }

  /**
   * WorkflowStep create
   */
  export type WorkflowStepCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowStep
     */
    select?: WorkflowStepSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkflowStep
     */
    omit?: WorkflowStepOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowStepInclude<ExtArgs> | null
    /**
     * The data needed to create a WorkflowStep.
     */
    data: XOR<WorkflowStepCreateInput, WorkflowStepUncheckedCreateInput>
  }

  /**
   * WorkflowStep createMany
   */
  export type WorkflowStepCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many WorkflowSteps.
     */
    data: WorkflowStepCreateManyInput | WorkflowStepCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * WorkflowStep createManyAndReturn
   */
  export type WorkflowStepCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowStep
     */
    select?: WorkflowStepSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the WorkflowStep
     */
    omit?: WorkflowStepOmit<ExtArgs> | null
    /**
     * The data used to create many WorkflowSteps.
     */
    data: WorkflowStepCreateManyInput | WorkflowStepCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowStepIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * WorkflowStep update
   */
  export type WorkflowStepUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowStep
     */
    select?: WorkflowStepSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkflowStep
     */
    omit?: WorkflowStepOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowStepInclude<ExtArgs> | null
    /**
     * The data needed to update a WorkflowStep.
     */
    data: XOR<WorkflowStepUpdateInput, WorkflowStepUncheckedUpdateInput>
    /**
     * Choose, which WorkflowStep to update.
     */
    where: WorkflowStepWhereUniqueInput
  }

  /**
   * WorkflowStep updateMany
   */
  export type WorkflowStepUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update WorkflowSteps.
     */
    data: XOR<WorkflowStepUpdateManyMutationInput, WorkflowStepUncheckedUpdateManyInput>
    /**
     * Filter which WorkflowSteps to update
     */
    where?: WorkflowStepWhereInput
    /**
     * Limit how many WorkflowSteps to update.
     */
    limit?: number
  }

  /**
   * WorkflowStep updateManyAndReturn
   */
  export type WorkflowStepUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowStep
     */
    select?: WorkflowStepSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the WorkflowStep
     */
    omit?: WorkflowStepOmit<ExtArgs> | null
    /**
     * The data used to update WorkflowSteps.
     */
    data: XOR<WorkflowStepUpdateManyMutationInput, WorkflowStepUncheckedUpdateManyInput>
    /**
     * Filter which WorkflowSteps to update
     */
    where?: WorkflowStepWhereInput
    /**
     * Limit how many WorkflowSteps to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowStepIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * WorkflowStep upsert
   */
  export type WorkflowStepUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowStep
     */
    select?: WorkflowStepSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkflowStep
     */
    omit?: WorkflowStepOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowStepInclude<ExtArgs> | null
    /**
     * The filter to search for the WorkflowStep to update in case it exists.
     */
    where: WorkflowStepWhereUniqueInput
    /**
     * In case the WorkflowStep found by the `where` argument doesn't exist, create a new WorkflowStep with this data.
     */
    create: XOR<WorkflowStepCreateInput, WorkflowStepUncheckedCreateInput>
    /**
     * In case the WorkflowStep was found with the provided `where` argument, update it with this data.
     */
    update: XOR<WorkflowStepUpdateInput, WorkflowStepUncheckedUpdateInput>
  }

  /**
   * WorkflowStep delete
   */
  export type WorkflowStepDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowStep
     */
    select?: WorkflowStepSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkflowStep
     */
    omit?: WorkflowStepOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowStepInclude<ExtArgs> | null
    /**
     * Filter which WorkflowStep to delete.
     */
    where: WorkflowStepWhereUniqueInput
  }

  /**
   * WorkflowStep deleteMany
   */
  export type WorkflowStepDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WorkflowSteps to delete
     */
    where?: WorkflowStepWhereInput
    /**
     * Limit how many WorkflowSteps to delete.
     */
    limit?: number
  }

  /**
   * WorkflowStep.events
   */
  export type WorkflowStep$eventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowEvent
     */
    select?: WorkflowEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkflowEvent
     */
    omit?: WorkflowEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowEventInclude<ExtArgs> | null
    where?: WorkflowEventWhereInput
    orderBy?: WorkflowEventOrderByWithRelationInput | WorkflowEventOrderByWithRelationInput[]
    cursor?: WorkflowEventWhereUniqueInput
    take?: number
    skip?: number
    distinct?: WorkflowEventScalarFieldEnum | WorkflowEventScalarFieldEnum[]
  }

  /**
   * WorkflowStep.checkpoints
   */
  export type WorkflowStep$checkpointsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowCheckpoint
     */
    select?: WorkflowCheckpointSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkflowCheckpoint
     */
    omit?: WorkflowCheckpointOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowCheckpointInclude<ExtArgs> | null
    where?: WorkflowCheckpointWhereInput
    orderBy?: WorkflowCheckpointOrderByWithRelationInput | WorkflowCheckpointOrderByWithRelationInput[]
    cursor?: WorkflowCheckpointWhereUniqueInput
    take?: number
    skip?: number
    distinct?: WorkflowCheckpointScalarFieldEnum | WorkflowCheckpointScalarFieldEnum[]
  }

  /**
   * WorkflowStep without action
   */
  export type WorkflowStepDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowStep
     */
    select?: WorkflowStepSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkflowStep
     */
    omit?: WorkflowStepOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowStepInclude<ExtArgs> | null
  }


  /**
   * Model WorkflowEvent
   */

  export type AggregateWorkflowEvent = {
    _count: WorkflowEventCountAggregateOutputType | null
    _min: WorkflowEventMinAggregateOutputType | null
    _max: WorkflowEventMaxAggregateOutputType | null
  }

  export type WorkflowEventMinAggregateOutputType = {
    id: string | null
    runId: string | null
    workflowStepId: string | null
    eventType: string | null
    createdAt: Date | null
  }

  export type WorkflowEventMaxAggregateOutputType = {
    id: string | null
    runId: string | null
    workflowStepId: string | null
    eventType: string | null
    createdAt: Date | null
  }

  export type WorkflowEventCountAggregateOutputType = {
    id: number
    runId: number
    workflowStepId: number
    eventType: number
    payload: number
    createdAt: number
    _all: number
  }


  export type WorkflowEventMinAggregateInputType = {
    id?: true
    runId?: true
    workflowStepId?: true
    eventType?: true
    createdAt?: true
  }

  export type WorkflowEventMaxAggregateInputType = {
    id?: true
    runId?: true
    workflowStepId?: true
    eventType?: true
    createdAt?: true
  }

  export type WorkflowEventCountAggregateInputType = {
    id?: true
    runId?: true
    workflowStepId?: true
    eventType?: true
    payload?: true
    createdAt?: true
    _all?: true
  }

  export type WorkflowEventAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WorkflowEvent to aggregate.
     */
    where?: WorkflowEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WorkflowEvents to fetch.
     */
    orderBy?: WorkflowEventOrderByWithRelationInput | WorkflowEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: WorkflowEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WorkflowEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WorkflowEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned WorkflowEvents
    **/
    _count?: true | WorkflowEventCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WorkflowEventMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WorkflowEventMaxAggregateInputType
  }

  export type GetWorkflowEventAggregateType<T extends WorkflowEventAggregateArgs> = {
        [P in keyof T & keyof AggregateWorkflowEvent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWorkflowEvent[P]>
      : GetScalarType<T[P], AggregateWorkflowEvent[P]>
  }




  export type WorkflowEventGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WorkflowEventWhereInput
    orderBy?: WorkflowEventOrderByWithAggregationInput | WorkflowEventOrderByWithAggregationInput[]
    by: WorkflowEventScalarFieldEnum[] | WorkflowEventScalarFieldEnum
    having?: WorkflowEventScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WorkflowEventCountAggregateInputType | true
    _min?: WorkflowEventMinAggregateInputType
    _max?: WorkflowEventMaxAggregateInputType
  }

  export type WorkflowEventGroupByOutputType = {
    id: string
    runId: string
    workflowStepId: string | null
    eventType: string
    payload: JsonValue | null
    createdAt: Date
    _count: WorkflowEventCountAggregateOutputType | null
    _min: WorkflowEventMinAggregateOutputType | null
    _max: WorkflowEventMaxAggregateOutputType | null
  }

  type GetWorkflowEventGroupByPayload<T extends WorkflowEventGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<WorkflowEventGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WorkflowEventGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WorkflowEventGroupByOutputType[P]>
            : GetScalarType<T[P], WorkflowEventGroupByOutputType[P]>
        }
      >
    >


  export type WorkflowEventSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    runId?: boolean
    workflowStepId?: boolean
    eventType?: boolean
    payload?: boolean
    createdAt?: boolean
    run?: boolean | WorkflowRunDefaultArgs<ExtArgs>
    step?: boolean | WorkflowEvent$stepArgs<ExtArgs>
  }, ExtArgs["result"]["workflowEvent"]>

  export type WorkflowEventSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    runId?: boolean
    workflowStepId?: boolean
    eventType?: boolean
    payload?: boolean
    createdAt?: boolean
    run?: boolean | WorkflowRunDefaultArgs<ExtArgs>
    step?: boolean | WorkflowEvent$stepArgs<ExtArgs>
  }, ExtArgs["result"]["workflowEvent"]>

  export type WorkflowEventSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    runId?: boolean
    workflowStepId?: boolean
    eventType?: boolean
    payload?: boolean
    createdAt?: boolean
    run?: boolean | WorkflowRunDefaultArgs<ExtArgs>
    step?: boolean | WorkflowEvent$stepArgs<ExtArgs>
  }, ExtArgs["result"]["workflowEvent"]>

  export type WorkflowEventSelectScalar = {
    id?: boolean
    runId?: boolean
    workflowStepId?: boolean
    eventType?: boolean
    payload?: boolean
    createdAt?: boolean
  }

  export type WorkflowEventOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "runId" | "workflowStepId" | "eventType" | "payload" | "createdAt", ExtArgs["result"]["workflowEvent"]>
  export type WorkflowEventInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    run?: boolean | WorkflowRunDefaultArgs<ExtArgs>
    step?: boolean | WorkflowEvent$stepArgs<ExtArgs>
  }
  export type WorkflowEventIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    run?: boolean | WorkflowRunDefaultArgs<ExtArgs>
    step?: boolean | WorkflowEvent$stepArgs<ExtArgs>
  }
  export type WorkflowEventIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    run?: boolean | WorkflowRunDefaultArgs<ExtArgs>
    step?: boolean | WorkflowEvent$stepArgs<ExtArgs>
  }

  export type $WorkflowEventPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "WorkflowEvent"
    objects: {
      run: Prisma.$WorkflowRunPayload<ExtArgs>
      step: Prisma.$WorkflowStepPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      runId: string
      workflowStepId: string | null
      eventType: string
      payload: Prisma.JsonValue | null
      createdAt: Date
    }, ExtArgs["result"]["workflowEvent"]>
    composites: {}
  }

  type WorkflowEventGetPayload<S extends boolean | null | undefined | WorkflowEventDefaultArgs> = $Result.GetResult<Prisma.$WorkflowEventPayload, S>

  type WorkflowEventCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<WorkflowEventFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: WorkflowEventCountAggregateInputType | true
    }

  export interface WorkflowEventDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['WorkflowEvent'], meta: { name: 'WorkflowEvent' } }
    /**
     * Find zero or one WorkflowEvent that matches the filter.
     * @param {WorkflowEventFindUniqueArgs} args - Arguments to find a WorkflowEvent
     * @example
     * // Get one WorkflowEvent
     * const workflowEvent = await prisma.workflowEvent.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends WorkflowEventFindUniqueArgs>(args: SelectSubset<T, WorkflowEventFindUniqueArgs<ExtArgs>>): Prisma__WorkflowEventClient<$Result.GetResult<Prisma.$WorkflowEventPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one WorkflowEvent that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {WorkflowEventFindUniqueOrThrowArgs} args - Arguments to find a WorkflowEvent
     * @example
     * // Get one WorkflowEvent
     * const workflowEvent = await prisma.workflowEvent.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends WorkflowEventFindUniqueOrThrowArgs>(args: SelectSubset<T, WorkflowEventFindUniqueOrThrowArgs<ExtArgs>>): Prisma__WorkflowEventClient<$Result.GetResult<Prisma.$WorkflowEventPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first WorkflowEvent that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkflowEventFindFirstArgs} args - Arguments to find a WorkflowEvent
     * @example
     * // Get one WorkflowEvent
     * const workflowEvent = await prisma.workflowEvent.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends WorkflowEventFindFirstArgs>(args?: SelectSubset<T, WorkflowEventFindFirstArgs<ExtArgs>>): Prisma__WorkflowEventClient<$Result.GetResult<Prisma.$WorkflowEventPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first WorkflowEvent that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkflowEventFindFirstOrThrowArgs} args - Arguments to find a WorkflowEvent
     * @example
     * // Get one WorkflowEvent
     * const workflowEvent = await prisma.workflowEvent.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends WorkflowEventFindFirstOrThrowArgs>(args?: SelectSubset<T, WorkflowEventFindFirstOrThrowArgs<ExtArgs>>): Prisma__WorkflowEventClient<$Result.GetResult<Prisma.$WorkflowEventPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more WorkflowEvents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkflowEventFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all WorkflowEvents
     * const workflowEvents = await prisma.workflowEvent.findMany()
     * 
     * // Get first 10 WorkflowEvents
     * const workflowEvents = await prisma.workflowEvent.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const workflowEventWithIdOnly = await prisma.workflowEvent.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends WorkflowEventFindManyArgs>(args?: SelectSubset<T, WorkflowEventFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkflowEventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a WorkflowEvent.
     * @param {WorkflowEventCreateArgs} args - Arguments to create a WorkflowEvent.
     * @example
     * // Create one WorkflowEvent
     * const WorkflowEvent = await prisma.workflowEvent.create({
     *   data: {
     *     // ... data to create a WorkflowEvent
     *   }
     * })
     * 
     */
    create<T extends WorkflowEventCreateArgs>(args: SelectSubset<T, WorkflowEventCreateArgs<ExtArgs>>): Prisma__WorkflowEventClient<$Result.GetResult<Prisma.$WorkflowEventPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many WorkflowEvents.
     * @param {WorkflowEventCreateManyArgs} args - Arguments to create many WorkflowEvents.
     * @example
     * // Create many WorkflowEvents
     * const workflowEvent = await prisma.workflowEvent.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends WorkflowEventCreateManyArgs>(args?: SelectSubset<T, WorkflowEventCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many WorkflowEvents and returns the data saved in the database.
     * @param {WorkflowEventCreateManyAndReturnArgs} args - Arguments to create many WorkflowEvents.
     * @example
     * // Create many WorkflowEvents
     * const workflowEvent = await prisma.workflowEvent.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many WorkflowEvents and only return the `id`
     * const workflowEventWithIdOnly = await prisma.workflowEvent.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends WorkflowEventCreateManyAndReturnArgs>(args?: SelectSubset<T, WorkflowEventCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkflowEventPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a WorkflowEvent.
     * @param {WorkflowEventDeleteArgs} args - Arguments to delete one WorkflowEvent.
     * @example
     * // Delete one WorkflowEvent
     * const WorkflowEvent = await prisma.workflowEvent.delete({
     *   where: {
     *     // ... filter to delete one WorkflowEvent
     *   }
     * })
     * 
     */
    delete<T extends WorkflowEventDeleteArgs>(args: SelectSubset<T, WorkflowEventDeleteArgs<ExtArgs>>): Prisma__WorkflowEventClient<$Result.GetResult<Prisma.$WorkflowEventPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one WorkflowEvent.
     * @param {WorkflowEventUpdateArgs} args - Arguments to update one WorkflowEvent.
     * @example
     * // Update one WorkflowEvent
     * const workflowEvent = await prisma.workflowEvent.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends WorkflowEventUpdateArgs>(args: SelectSubset<T, WorkflowEventUpdateArgs<ExtArgs>>): Prisma__WorkflowEventClient<$Result.GetResult<Prisma.$WorkflowEventPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more WorkflowEvents.
     * @param {WorkflowEventDeleteManyArgs} args - Arguments to filter WorkflowEvents to delete.
     * @example
     * // Delete a few WorkflowEvents
     * const { count } = await prisma.workflowEvent.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends WorkflowEventDeleteManyArgs>(args?: SelectSubset<T, WorkflowEventDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WorkflowEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkflowEventUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many WorkflowEvents
     * const workflowEvent = await prisma.workflowEvent.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends WorkflowEventUpdateManyArgs>(args: SelectSubset<T, WorkflowEventUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WorkflowEvents and returns the data updated in the database.
     * @param {WorkflowEventUpdateManyAndReturnArgs} args - Arguments to update many WorkflowEvents.
     * @example
     * // Update many WorkflowEvents
     * const workflowEvent = await prisma.workflowEvent.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more WorkflowEvents and only return the `id`
     * const workflowEventWithIdOnly = await prisma.workflowEvent.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends WorkflowEventUpdateManyAndReturnArgs>(args: SelectSubset<T, WorkflowEventUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkflowEventPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one WorkflowEvent.
     * @param {WorkflowEventUpsertArgs} args - Arguments to update or create a WorkflowEvent.
     * @example
     * // Update or create a WorkflowEvent
     * const workflowEvent = await prisma.workflowEvent.upsert({
     *   create: {
     *     // ... data to create a WorkflowEvent
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the WorkflowEvent we want to update
     *   }
     * })
     */
    upsert<T extends WorkflowEventUpsertArgs>(args: SelectSubset<T, WorkflowEventUpsertArgs<ExtArgs>>): Prisma__WorkflowEventClient<$Result.GetResult<Prisma.$WorkflowEventPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of WorkflowEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkflowEventCountArgs} args - Arguments to filter WorkflowEvents to count.
     * @example
     * // Count the number of WorkflowEvents
     * const count = await prisma.workflowEvent.count({
     *   where: {
     *     // ... the filter for the WorkflowEvents we want to count
     *   }
     * })
    **/
    count<T extends WorkflowEventCountArgs>(
      args?: Subset<T, WorkflowEventCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WorkflowEventCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a WorkflowEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkflowEventAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends WorkflowEventAggregateArgs>(args: Subset<T, WorkflowEventAggregateArgs>): Prisma.PrismaPromise<GetWorkflowEventAggregateType<T>>

    /**
     * Group by WorkflowEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkflowEventGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends WorkflowEventGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WorkflowEventGroupByArgs['orderBy'] }
        : { orderBy?: WorkflowEventGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, WorkflowEventGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWorkflowEventGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the WorkflowEvent model
   */
  readonly fields: WorkflowEventFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for WorkflowEvent.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__WorkflowEventClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    run<T extends WorkflowRunDefaultArgs<ExtArgs> = {}>(args?: Subset<T, WorkflowRunDefaultArgs<ExtArgs>>): Prisma__WorkflowRunClient<$Result.GetResult<Prisma.$WorkflowRunPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    step<T extends WorkflowEvent$stepArgs<ExtArgs> = {}>(args?: Subset<T, WorkflowEvent$stepArgs<ExtArgs>>): Prisma__WorkflowStepClient<$Result.GetResult<Prisma.$WorkflowStepPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the WorkflowEvent model
   */
  interface WorkflowEventFieldRefs {
    readonly id: FieldRef<"WorkflowEvent", 'String'>
    readonly runId: FieldRef<"WorkflowEvent", 'String'>
    readonly workflowStepId: FieldRef<"WorkflowEvent", 'String'>
    readonly eventType: FieldRef<"WorkflowEvent", 'String'>
    readonly payload: FieldRef<"WorkflowEvent", 'Json'>
    readonly createdAt: FieldRef<"WorkflowEvent", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * WorkflowEvent findUnique
   */
  export type WorkflowEventFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowEvent
     */
    select?: WorkflowEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkflowEvent
     */
    omit?: WorkflowEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowEventInclude<ExtArgs> | null
    /**
     * Filter, which WorkflowEvent to fetch.
     */
    where: WorkflowEventWhereUniqueInput
  }

  /**
   * WorkflowEvent findUniqueOrThrow
   */
  export type WorkflowEventFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowEvent
     */
    select?: WorkflowEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkflowEvent
     */
    omit?: WorkflowEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowEventInclude<ExtArgs> | null
    /**
     * Filter, which WorkflowEvent to fetch.
     */
    where: WorkflowEventWhereUniqueInput
  }

  /**
   * WorkflowEvent findFirst
   */
  export type WorkflowEventFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowEvent
     */
    select?: WorkflowEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkflowEvent
     */
    omit?: WorkflowEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowEventInclude<ExtArgs> | null
    /**
     * Filter, which WorkflowEvent to fetch.
     */
    where?: WorkflowEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WorkflowEvents to fetch.
     */
    orderBy?: WorkflowEventOrderByWithRelationInput | WorkflowEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WorkflowEvents.
     */
    cursor?: WorkflowEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WorkflowEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WorkflowEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WorkflowEvents.
     */
    distinct?: WorkflowEventScalarFieldEnum | WorkflowEventScalarFieldEnum[]
  }

  /**
   * WorkflowEvent findFirstOrThrow
   */
  export type WorkflowEventFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowEvent
     */
    select?: WorkflowEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkflowEvent
     */
    omit?: WorkflowEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowEventInclude<ExtArgs> | null
    /**
     * Filter, which WorkflowEvent to fetch.
     */
    where?: WorkflowEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WorkflowEvents to fetch.
     */
    orderBy?: WorkflowEventOrderByWithRelationInput | WorkflowEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WorkflowEvents.
     */
    cursor?: WorkflowEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WorkflowEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WorkflowEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WorkflowEvents.
     */
    distinct?: WorkflowEventScalarFieldEnum | WorkflowEventScalarFieldEnum[]
  }

  /**
   * WorkflowEvent findMany
   */
  export type WorkflowEventFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowEvent
     */
    select?: WorkflowEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkflowEvent
     */
    omit?: WorkflowEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowEventInclude<ExtArgs> | null
    /**
     * Filter, which WorkflowEvents to fetch.
     */
    where?: WorkflowEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WorkflowEvents to fetch.
     */
    orderBy?: WorkflowEventOrderByWithRelationInput | WorkflowEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing WorkflowEvents.
     */
    cursor?: WorkflowEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WorkflowEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WorkflowEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WorkflowEvents.
     */
    distinct?: WorkflowEventScalarFieldEnum | WorkflowEventScalarFieldEnum[]
  }

  /**
   * WorkflowEvent create
   */
  export type WorkflowEventCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowEvent
     */
    select?: WorkflowEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkflowEvent
     */
    omit?: WorkflowEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowEventInclude<ExtArgs> | null
    /**
     * The data needed to create a WorkflowEvent.
     */
    data: XOR<WorkflowEventCreateInput, WorkflowEventUncheckedCreateInput>
  }

  /**
   * WorkflowEvent createMany
   */
  export type WorkflowEventCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many WorkflowEvents.
     */
    data: WorkflowEventCreateManyInput | WorkflowEventCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * WorkflowEvent createManyAndReturn
   */
  export type WorkflowEventCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowEvent
     */
    select?: WorkflowEventSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the WorkflowEvent
     */
    omit?: WorkflowEventOmit<ExtArgs> | null
    /**
     * The data used to create many WorkflowEvents.
     */
    data: WorkflowEventCreateManyInput | WorkflowEventCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowEventIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * WorkflowEvent update
   */
  export type WorkflowEventUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowEvent
     */
    select?: WorkflowEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkflowEvent
     */
    omit?: WorkflowEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowEventInclude<ExtArgs> | null
    /**
     * The data needed to update a WorkflowEvent.
     */
    data: XOR<WorkflowEventUpdateInput, WorkflowEventUncheckedUpdateInput>
    /**
     * Choose, which WorkflowEvent to update.
     */
    where: WorkflowEventWhereUniqueInput
  }

  /**
   * WorkflowEvent updateMany
   */
  export type WorkflowEventUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update WorkflowEvents.
     */
    data: XOR<WorkflowEventUpdateManyMutationInput, WorkflowEventUncheckedUpdateManyInput>
    /**
     * Filter which WorkflowEvents to update
     */
    where?: WorkflowEventWhereInput
    /**
     * Limit how many WorkflowEvents to update.
     */
    limit?: number
  }

  /**
   * WorkflowEvent updateManyAndReturn
   */
  export type WorkflowEventUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowEvent
     */
    select?: WorkflowEventSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the WorkflowEvent
     */
    omit?: WorkflowEventOmit<ExtArgs> | null
    /**
     * The data used to update WorkflowEvents.
     */
    data: XOR<WorkflowEventUpdateManyMutationInput, WorkflowEventUncheckedUpdateManyInput>
    /**
     * Filter which WorkflowEvents to update
     */
    where?: WorkflowEventWhereInput
    /**
     * Limit how many WorkflowEvents to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowEventIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * WorkflowEvent upsert
   */
  export type WorkflowEventUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowEvent
     */
    select?: WorkflowEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkflowEvent
     */
    omit?: WorkflowEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowEventInclude<ExtArgs> | null
    /**
     * The filter to search for the WorkflowEvent to update in case it exists.
     */
    where: WorkflowEventWhereUniqueInput
    /**
     * In case the WorkflowEvent found by the `where` argument doesn't exist, create a new WorkflowEvent with this data.
     */
    create: XOR<WorkflowEventCreateInput, WorkflowEventUncheckedCreateInput>
    /**
     * In case the WorkflowEvent was found with the provided `where` argument, update it with this data.
     */
    update: XOR<WorkflowEventUpdateInput, WorkflowEventUncheckedUpdateInput>
  }

  /**
   * WorkflowEvent delete
   */
  export type WorkflowEventDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowEvent
     */
    select?: WorkflowEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkflowEvent
     */
    omit?: WorkflowEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowEventInclude<ExtArgs> | null
    /**
     * Filter which WorkflowEvent to delete.
     */
    where: WorkflowEventWhereUniqueInput
  }

  /**
   * WorkflowEvent deleteMany
   */
  export type WorkflowEventDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WorkflowEvents to delete
     */
    where?: WorkflowEventWhereInput
    /**
     * Limit how many WorkflowEvents to delete.
     */
    limit?: number
  }

  /**
   * WorkflowEvent.step
   */
  export type WorkflowEvent$stepArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowStep
     */
    select?: WorkflowStepSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkflowStep
     */
    omit?: WorkflowStepOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowStepInclude<ExtArgs> | null
    where?: WorkflowStepWhereInput
  }

  /**
   * WorkflowEvent without action
   */
  export type WorkflowEventDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowEvent
     */
    select?: WorkflowEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkflowEvent
     */
    omit?: WorkflowEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowEventInclude<ExtArgs> | null
  }


  /**
   * Model WorkflowCheckpoint
   */

  export type AggregateWorkflowCheckpoint = {
    _count: WorkflowCheckpointCountAggregateOutputType | null
    _avg: WorkflowCheckpointAvgAggregateOutputType | null
    _sum: WorkflowCheckpointSumAggregateOutputType | null
    _min: WorkflowCheckpointMinAggregateOutputType | null
    _max: WorkflowCheckpointMaxAggregateOutputType | null
  }

  export type WorkflowCheckpointAvgAggregateOutputType = {
    sequence: number | null
  }

  export type WorkflowCheckpointSumAggregateOutputType = {
    sequence: number | null
  }

  export type WorkflowCheckpointMinAggregateOutputType = {
    id: string | null
    runId: string | null
    workflowStepId: string | null
    sequence: number | null
    createdAt: Date | null
  }

  export type WorkflowCheckpointMaxAggregateOutputType = {
    id: string | null
    runId: string | null
    workflowStepId: string | null
    sequence: number | null
    createdAt: Date | null
  }

  export type WorkflowCheckpointCountAggregateOutputType = {
    id: number
    runId: number
    workflowStepId: number
    sequence: number
    snapshot: number
    createdAt: number
    _all: number
  }


  export type WorkflowCheckpointAvgAggregateInputType = {
    sequence?: true
  }

  export type WorkflowCheckpointSumAggregateInputType = {
    sequence?: true
  }

  export type WorkflowCheckpointMinAggregateInputType = {
    id?: true
    runId?: true
    workflowStepId?: true
    sequence?: true
    createdAt?: true
  }

  export type WorkflowCheckpointMaxAggregateInputType = {
    id?: true
    runId?: true
    workflowStepId?: true
    sequence?: true
    createdAt?: true
  }

  export type WorkflowCheckpointCountAggregateInputType = {
    id?: true
    runId?: true
    workflowStepId?: true
    sequence?: true
    snapshot?: true
    createdAt?: true
    _all?: true
  }

  export type WorkflowCheckpointAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WorkflowCheckpoint to aggregate.
     */
    where?: WorkflowCheckpointWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WorkflowCheckpoints to fetch.
     */
    orderBy?: WorkflowCheckpointOrderByWithRelationInput | WorkflowCheckpointOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: WorkflowCheckpointWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WorkflowCheckpoints from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WorkflowCheckpoints.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned WorkflowCheckpoints
    **/
    _count?: true | WorkflowCheckpointCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: WorkflowCheckpointAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: WorkflowCheckpointSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WorkflowCheckpointMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WorkflowCheckpointMaxAggregateInputType
  }

  export type GetWorkflowCheckpointAggregateType<T extends WorkflowCheckpointAggregateArgs> = {
        [P in keyof T & keyof AggregateWorkflowCheckpoint]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWorkflowCheckpoint[P]>
      : GetScalarType<T[P], AggregateWorkflowCheckpoint[P]>
  }




  export type WorkflowCheckpointGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WorkflowCheckpointWhereInput
    orderBy?: WorkflowCheckpointOrderByWithAggregationInput | WorkflowCheckpointOrderByWithAggregationInput[]
    by: WorkflowCheckpointScalarFieldEnum[] | WorkflowCheckpointScalarFieldEnum
    having?: WorkflowCheckpointScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WorkflowCheckpointCountAggregateInputType | true
    _avg?: WorkflowCheckpointAvgAggregateInputType
    _sum?: WorkflowCheckpointSumAggregateInputType
    _min?: WorkflowCheckpointMinAggregateInputType
    _max?: WorkflowCheckpointMaxAggregateInputType
  }

  export type WorkflowCheckpointGroupByOutputType = {
    id: string
    runId: string
    workflowStepId: string | null
    sequence: number
    snapshot: JsonValue
    createdAt: Date
    _count: WorkflowCheckpointCountAggregateOutputType | null
    _avg: WorkflowCheckpointAvgAggregateOutputType | null
    _sum: WorkflowCheckpointSumAggregateOutputType | null
    _min: WorkflowCheckpointMinAggregateOutputType | null
    _max: WorkflowCheckpointMaxAggregateOutputType | null
  }

  type GetWorkflowCheckpointGroupByPayload<T extends WorkflowCheckpointGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<WorkflowCheckpointGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WorkflowCheckpointGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WorkflowCheckpointGroupByOutputType[P]>
            : GetScalarType<T[P], WorkflowCheckpointGroupByOutputType[P]>
        }
      >
    >


  export type WorkflowCheckpointSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    runId?: boolean
    workflowStepId?: boolean
    sequence?: boolean
    snapshot?: boolean
    createdAt?: boolean
    run?: boolean | WorkflowRunDefaultArgs<ExtArgs>
    step?: boolean | WorkflowCheckpoint$stepArgs<ExtArgs>
  }, ExtArgs["result"]["workflowCheckpoint"]>

  export type WorkflowCheckpointSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    runId?: boolean
    workflowStepId?: boolean
    sequence?: boolean
    snapshot?: boolean
    createdAt?: boolean
    run?: boolean | WorkflowRunDefaultArgs<ExtArgs>
    step?: boolean | WorkflowCheckpoint$stepArgs<ExtArgs>
  }, ExtArgs["result"]["workflowCheckpoint"]>

  export type WorkflowCheckpointSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    runId?: boolean
    workflowStepId?: boolean
    sequence?: boolean
    snapshot?: boolean
    createdAt?: boolean
    run?: boolean | WorkflowRunDefaultArgs<ExtArgs>
    step?: boolean | WorkflowCheckpoint$stepArgs<ExtArgs>
  }, ExtArgs["result"]["workflowCheckpoint"]>

  export type WorkflowCheckpointSelectScalar = {
    id?: boolean
    runId?: boolean
    workflowStepId?: boolean
    sequence?: boolean
    snapshot?: boolean
    createdAt?: boolean
  }

  export type WorkflowCheckpointOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "runId" | "workflowStepId" | "sequence" | "snapshot" | "createdAt", ExtArgs["result"]["workflowCheckpoint"]>
  export type WorkflowCheckpointInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    run?: boolean | WorkflowRunDefaultArgs<ExtArgs>
    step?: boolean | WorkflowCheckpoint$stepArgs<ExtArgs>
  }
  export type WorkflowCheckpointIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    run?: boolean | WorkflowRunDefaultArgs<ExtArgs>
    step?: boolean | WorkflowCheckpoint$stepArgs<ExtArgs>
  }
  export type WorkflowCheckpointIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    run?: boolean | WorkflowRunDefaultArgs<ExtArgs>
    step?: boolean | WorkflowCheckpoint$stepArgs<ExtArgs>
  }

  export type $WorkflowCheckpointPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "WorkflowCheckpoint"
    objects: {
      run: Prisma.$WorkflowRunPayload<ExtArgs>
      step: Prisma.$WorkflowStepPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      runId: string
      workflowStepId: string | null
      sequence: number
      snapshot: Prisma.JsonValue
      createdAt: Date
    }, ExtArgs["result"]["workflowCheckpoint"]>
    composites: {}
  }

  type WorkflowCheckpointGetPayload<S extends boolean | null | undefined | WorkflowCheckpointDefaultArgs> = $Result.GetResult<Prisma.$WorkflowCheckpointPayload, S>

  type WorkflowCheckpointCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<WorkflowCheckpointFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: WorkflowCheckpointCountAggregateInputType | true
    }

  export interface WorkflowCheckpointDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['WorkflowCheckpoint'], meta: { name: 'WorkflowCheckpoint' } }
    /**
     * Find zero or one WorkflowCheckpoint that matches the filter.
     * @param {WorkflowCheckpointFindUniqueArgs} args - Arguments to find a WorkflowCheckpoint
     * @example
     * // Get one WorkflowCheckpoint
     * const workflowCheckpoint = await prisma.workflowCheckpoint.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends WorkflowCheckpointFindUniqueArgs>(args: SelectSubset<T, WorkflowCheckpointFindUniqueArgs<ExtArgs>>): Prisma__WorkflowCheckpointClient<$Result.GetResult<Prisma.$WorkflowCheckpointPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one WorkflowCheckpoint that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {WorkflowCheckpointFindUniqueOrThrowArgs} args - Arguments to find a WorkflowCheckpoint
     * @example
     * // Get one WorkflowCheckpoint
     * const workflowCheckpoint = await prisma.workflowCheckpoint.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends WorkflowCheckpointFindUniqueOrThrowArgs>(args: SelectSubset<T, WorkflowCheckpointFindUniqueOrThrowArgs<ExtArgs>>): Prisma__WorkflowCheckpointClient<$Result.GetResult<Prisma.$WorkflowCheckpointPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first WorkflowCheckpoint that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkflowCheckpointFindFirstArgs} args - Arguments to find a WorkflowCheckpoint
     * @example
     * // Get one WorkflowCheckpoint
     * const workflowCheckpoint = await prisma.workflowCheckpoint.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends WorkflowCheckpointFindFirstArgs>(args?: SelectSubset<T, WorkflowCheckpointFindFirstArgs<ExtArgs>>): Prisma__WorkflowCheckpointClient<$Result.GetResult<Prisma.$WorkflowCheckpointPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first WorkflowCheckpoint that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkflowCheckpointFindFirstOrThrowArgs} args - Arguments to find a WorkflowCheckpoint
     * @example
     * // Get one WorkflowCheckpoint
     * const workflowCheckpoint = await prisma.workflowCheckpoint.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends WorkflowCheckpointFindFirstOrThrowArgs>(args?: SelectSubset<T, WorkflowCheckpointFindFirstOrThrowArgs<ExtArgs>>): Prisma__WorkflowCheckpointClient<$Result.GetResult<Prisma.$WorkflowCheckpointPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more WorkflowCheckpoints that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkflowCheckpointFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all WorkflowCheckpoints
     * const workflowCheckpoints = await prisma.workflowCheckpoint.findMany()
     * 
     * // Get first 10 WorkflowCheckpoints
     * const workflowCheckpoints = await prisma.workflowCheckpoint.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const workflowCheckpointWithIdOnly = await prisma.workflowCheckpoint.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends WorkflowCheckpointFindManyArgs>(args?: SelectSubset<T, WorkflowCheckpointFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkflowCheckpointPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a WorkflowCheckpoint.
     * @param {WorkflowCheckpointCreateArgs} args - Arguments to create a WorkflowCheckpoint.
     * @example
     * // Create one WorkflowCheckpoint
     * const WorkflowCheckpoint = await prisma.workflowCheckpoint.create({
     *   data: {
     *     // ... data to create a WorkflowCheckpoint
     *   }
     * })
     * 
     */
    create<T extends WorkflowCheckpointCreateArgs>(args: SelectSubset<T, WorkflowCheckpointCreateArgs<ExtArgs>>): Prisma__WorkflowCheckpointClient<$Result.GetResult<Prisma.$WorkflowCheckpointPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many WorkflowCheckpoints.
     * @param {WorkflowCheckpointCreateManyArgs} args - Arguments to create many WorkflowCheckpoints.
     * @example
     * // Create many WorkflowCheckpoints
     * const workflowCheckpoint = await prisma.workflowCheckpoint.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends WorkflowCheckpointCreateManyArgs>(args?: SelectSubset<T, WorkflowCheckpointCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many WorkflowCheckpoints and returns the data saved in the database.
     * @param {WorkflowCheckpointCreateManyAndReturnArgs} args - Arguments to create many WorkflowCheckpoints.
     * @example
     * // Create many WorkflowCheckpoints
     * const workflowCheckpoint = await prisma.workflowCheckpoint.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many WorkflowCheckpoints and only return the `id`
     * const workflowCheckpointWithIdOnly = await prisma.workflowCheckpoint.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends WorkflowCheckpointCreateManyAndReturnArgs>(args?: SelectSubset<T, WorkflowCheckpointCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkflowCheckpointPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a WorkflowCheckpoint.
     * @param {WorkflowCheckpointDeleteArgs} args - Arguments to delete one WorkflowCheckpoint.
     * @example
     * // Delete one WorkflowCheckpoint
     * const WorkflowCheckpoint = await prisma.workflowCheckpoint.delete({
     *   where: {
     *     // ... filter to delete one WorkflowCheckpoint
     *   }
     * })
     * 
     */
    delete<T extends WorkflowCheckpointDeleteArgs>(args: SelectSubset<T, WorkflowCheckpointDeleteArgs<ExtArgs>>): Prisma__WorkflowCheckpointClient<$Result.GetResult<Prisma.$WorkflowCheckpointPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one WorkflowCheckpoint.
     * @param {WorkflowCheckpointUpdateArgs} args - Arguments to update one WorkflowCheckpoint.
     * @example
     * // Update one WorkflowCheckpoint
     * const workflowCheckpoint = await prisma.workflowCheckpoint.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends WorkflowCheckpointUpdateArgs>(args: SelectSubset<T, WorkflowCheckpointUpdateArgs<ExtArgs>>): Prisma__WorkflowCheckpointClient<$Result.GetResult<Prisma.$WorkflowCheckpointPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more WorkflowCheckpoints.
     * @param {WorkflowCheckpointDeleteManyArgs} args - Arguments to filter WorkflowCheckpoints to delete.
     * @example
     * // Delete a few WorkflowCheckpoints
     * const { count } = await prisma.workflowCheckpoint.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends WorkflowCheckpointDeleteManyArgs>(args?: SelectSubset<T, WorkflowCheckpointDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WorkflowCheckpoints.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkflowCheckpointUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many WorkflowCheckpoints
     * const workflowCheckpoint = await prisma.workflowCheckpoint.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends WorkflowCheckpointUpdateManyArgs>(args: SelectSubset<T, WorkflowCheckpointUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WorkflowCheckpoints and returns the data updated in the database.
     * @param {WorkflowCheckpointUpdateManyAndReturnArgs} args - Arguments to update many WorkflowCheckpoints.
     * @example
     * // Update many WorkflowCheckpoints
     * const workflowCheckpoint = await prisma.workflowCheckpoint.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more WorkflowCheckpoints and only return the `id`
     * const workflowCheckpointWithIdOnly = await prisma.workflowCheckpoint.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends WorkflowCheckpointUpdateManyAndReturnArgs>(args: SelectSubset<T, WorkflowCheckpointUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkflowCheckpointPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one WorkflowCheckpoint.
     * @param {WorkflowCheckpointUpsertArgs} args - Arguments to update or create a WorkflowCheckpoint.
     * @example
     * // Update or create a WorkflowCheckpoint
     * const workflowCheckpoint = await prisma.workflowCheckpoint.upsert({
     *   create: {
     *     // ... data to create a WorkflowCheckpoint
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the WorkflowCheckpoint we want to update
     *   }
     * })
     */
    upsert<T extends WorkflowCheckpointUpsertArgs>(args: SelectSubset<T, WorkflowCheckpointUpsertArgs<ExtArgs>>): Prisma__WorkflowCheckpointClient<$Result.GetResult<Prisma.$WorkflowCheckpointPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of WorkflowCheckpoints.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkflowCheckpointCountArgs} args - Arguments to filter WorkflowCheckpoints to count.
     * @example
     * // Count the number of WorkflowCheckpoints
     * const count = await prisma.workflowCheckpoint.count({
     *   where: {
     *     // ... the filter for the WorkflowCheckpoints we want to count
     *   }
     * })
    **/
    count<T extends WorkflowCheckpointCountArgs>(
      args?: Subset<T, WorkflowCheckpointCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WorkflowCheckpointCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a WorkflowCheckpoint.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkflowCheckpointAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends WorkflowCheckpointAggregateArgs>(args: Subset<T, WorkflowCheckpointAggregateArgs>): Prisma.PrismaPromise<GetWorkflowCheckpointAggregateType<T>>

    /**
     * Group by WorkflowCheckpoint.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkflowCheckpointGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends WorkflowCheckpointGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WorkflowCheckpointGroupByArgs['orderBy'] }
        : { orderBy?: WorkflowCheckpointGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, WorkflowCheckpointGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWorkflowCheckpointGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the WorkflowCheckpoint model
   */
  readonly fields: WorkflowCheckpointFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for WorkflowCheckpoint.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__WorkflowCheckpointClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    run<T extends WorkflowRunDefaultArgs<ExtArgs> = {}>(args?: Subset<T, WorkflowRunDefaultArgs<ExtArgs>>): Prisma__WorkflowRunClient<$Result.GetResult<Prisma.$WorkflowRunPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    step<T extends WorkflowCheckpoint$stepArgs<ExtArgs> = {}>(args?: Subset<T, WorkflowCheckpoint$stepArgs<ExtArgs>>): Prisma__WorkflowStepClient<$Result.GetResult<Prisma.$WorkflowStepPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the WorkflowCheckpoint model
   */
  interface WorkflowCheckpointFieldRefs {
    readonly id: FieldRef<"WorkflowCheckpoint", 'String'>
    readonly runId: FieldRef<"WorkflowCheckpoint", 'String'>
    readonly workflowStepId: FieldRef<"WorkflowCheckpoint", 'String'>
    readonly sequence: FieldRef<"WorkflowCheckpoint", 'Int'>
    readonly snapshot: FieldRef<"WorkflowCheckpoint", 'Json'>
    readonly createdAt: FieldRef<"WorkflowCheckpoint", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * WorkflowCheckpoint findUnique
   */
  export type WorkflowCheckpointFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowCheckpoint
     */
    select?: WorkflowCheckpointSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkflowCheckpoint
     */
    omit?: WorkflowCheckpointOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowCheckpointInclude<ExtArgs> | null
    /**
     * Filter, which WorkflowCheckpoint to fetch.
     */
    where: WorkflowCheckpointWhereUniqueInput
  }

  /**
   * WorkflowCheckpoint findUniqueOrThrow
   */
  export type WorkflowCheckpointFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowCheckpoint
     */
    select?: WorkflowCheckpointSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkflowCheckpoint
     */
    omit?: WorkflowCheckpointOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowCheckpointInclude<ExtArgs> | null
    /**
     * Filter, which WorkflowCheckpoint to fetch.
     */
    where: WorkflowCheckpointWhereUniqueInput
  }

  /**
   * WorkflowCheckpoint findFirst
   */
  export type WorkflowCheckpointFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowCheckpoint
     */
    select?: WorkflowCheckpointSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkflowCheckpoint
     */
    omit?: WorkflowCheckpointOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowCheckpointInclude<ExtArgs> | null
    /**
     * Filter, which WorkflowCheckpoint to fetch.
     */
    where?: WorkflowCheckpointWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WorkflowCheckpoints to fetch.
     */
    orderBy?: WorkflowCheckpointOrderByWithRelationInput | WorkflowCheckpointOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WorkflowCheckpoints.
     */
    cursor?: WorkflowCheckpointWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WorkflowCheckpoints from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WorkflowCheckpoints.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WorkflowCheckpoints.
     */
    distinct?: WorkflowCheckpointScalarFieldEnum | WorkflowCheckpointScalarFieldEnum[]
  }

  /**
   * WorkflowCheckpoint findFirstOrThrow
   */
  export type WorkflowCheckpointFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowCheckpoint
     */
    select?: WorkflowCheckpointSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkflowCheckpoint
     */
    omit?: WorkflowCheckpointOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowCheckpointInclude<ExtArgs> | null
    /**
     * Filter, which WorkflowCheckpoint to fetch.
     */
    where?: WorkflowCheckpointWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WorkflowCheckpoints to fetch.
     */
    orderBy?: WorkflowCheckpointOrderByWithRelationInput | WorkflowCheckpointOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WorkflowCheckpoints.
     */
    cursor?: WorkflowCheckpointWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WorkflowCheckpoints from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WorkflowCheckpoints.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WorkflowCheckpoints.
     */
    distinct?: WorkflowCheckpointScalarFieldEnum | WorkflowCheckpointScalarFieldEnum[]
  }

  /**
   * WorkflowCheckpoint findMany
   */
  export type WorkflowCheckpointFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowCheckpoint
     */
    select?: WorkflowCheckpointSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkflowCheckpoint
     */
    omit?: WorkflowCheckpointOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowCheckpointInclude<ExtArgs> | null
    /**
     * Filter, which WorkflowCheckpoints to fetch.
     */
    where?: WorkflowCheckpointWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WorkflowCheckpoints to fetch.
     */
    orderBy?: WorkflowCheckpointOrderByWithRelationInput | WorkflowCheckpointOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing WorkflowCheckpoints.
     */
    cursor?: WorkflowCheckpointWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WorkflowCheckpoints from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WorkflowCheckpoints.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WorkflowCheckpoints.
     */
    distinct?: WorkflowCheckpointScalarFieldEnum | WorkflowCheckpointScalarFieldEnum[]
  }

  /**
   * WorkflowCheckpoint create
   */
  export type WorkflowCheckpointCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowCheckpoint
     */
    select?: WorkflowCheckpointSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkflowCheckpoint
     */
    omit?: WorkflowCheckpointOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowCheckpointInclude<ExtArgs> | null
    /**
     * The data needed to create a WorkflowCheckpoint.
     */
    data: XOR<WorkflowCheckpointCreateInput, WorkflowCheckpointUncheckedCreateInput>
  }

  /**
   * WorkflowCheckpoint createMany
   */
  export type WorkflowCheckpointCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many WorkflowCheckpoints.
     */
    data: WorkflowCheckpointCreateManyInput | WorkflowCheckpointCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * WorkflowCheckpoint createManyAndReturn
   */
  export type WorkflowCheckpointCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowCheckpoint
     */
    select?: WorkflowCheckpointSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the WorkflowCheckpoint
     */
    omit?: WorkflowCheckpointOmit<ExtArgs> | null
    /**
     * The data used to create many WorkflowCheckpoints.
     */
    data: WorkflowCheckpointCreateManyInput | WorkflowCheckpointCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowCheckpointIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * WorkflowCheckpoint update
   */
  export type WorkflowCheckpointUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowCheckpoint
     */
    select?: WorkflowCheckpointSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkflowCheckpoint
     */
    omit?: WorkflowCheckpointOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowCheckpointInclude<ExtArgs> | null
    /**
     * The data needed to update a WorkflowCheckpoint.
     */
    data: XOR<WorkflowCheckpointUpdateInput, WorkflowCheckpointUncheckedUpdateInput>
    /**
     * Choose, which WorkflowCheckpoint to update.
     */
    where: WorkflowCheckpointWhereUniqueInput
  }

  /**
   * WorkflowCheckpoint updateMany
   */
  export type WorkflowCheckpointUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update WorkflowCheckpoints.
     */
    data: XOR<WorkflowCheckpointUpdateManyMutationInput, WorkflowCheckpointUncheckedUpdateManyInput>
    /**
     * Filter which WorkflowCheckpoints to update
     */
    where?: WorkflowCheckpointWhereInput
    /**
     * Limit how many WorkflowCheckpoints to update.
     */
    limit?: number
  }

  /**
   * WorkflowCheckpoint updateManyAndReturn
   */
  export type WorkflowCheckpointUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowCheckpoint
     */
    select?: WorkflowCheckpointSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the WorkflowCheckpoint
     */
    omit?: WorkflowCheckpointOmit<ExtArgs> | null
    /**
     * The data used to update WorkflowCheckpoints.
     */
    data: XOR<WorkflowCheckpointUpdateManyMutationInput, WorkflowCheckpointUncheckedUpdateManyInput>
    /**
     * Filter which WorkflowCheckpoints to update
     */
    where?: WorkflowCheckpointWhereInput
    /**
     * Limit how many WorkflowCheckpoints to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowCheckpointIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * WorkflowCheckpoint upsert
   */
  export type WorkflowCheckpointUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowCheckpoint
     */
    select?: WorkflowCheckpointSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkflowCheckpoint
     */
    omit?: WorkflowCheckpointOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowCheckpointInclude<ExtArgs> | null
    /**
     * The filter to search for the WorkflowCheckpoint to update in case it exists.
     */
    where: WorkflowCheckpointWhereUniqueInput
    /**
     * In case the WorkflowCheckpoint found by the `where` argument doesn't exist, create a new WorkflowCheckpoint with this data.
     */
    create: XOR<WorkflowCheckpointCreateInput, WorkflowCheckpointUncheckedCreateInput>
    /**
     * In case the WorkflowCheckpoint was found with the provided `where` argument, update it with this data.
     */
    update: XOR<WorkflowCheckpointUpdateInput, WorkflowCheckpointUncheckedUpdateInput>
  }

  /**
   * WorkflowCheckpoint delete
   */
  export type WorkflowCheckpointDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowCheckpoint
     */
    select?: WorkflowCheckpointSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkflowCheckpoint
     */
    omit?: WorkflowCheckpointOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowCheckpointInclude<ExtArgs> | null
    /**
     * Filter which WorkflowCheckpoint to delete.
     */
    where: WorkflowCheckpointWhereUniqueInput
  }

  /**
   * WorkflowCheckpoint deleteMany
   */
  export type WorkflowCheckpointDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WorkflowCheckpoints to delete
     */
    where?: WorkflowCheckpointWhereInput
    /**
     * Limit how many WorkflowCheckpoints to delete.
     */
    limit?: number
  }

  /**
   * WorkflowCheckpoint.step
   */
  export type WorkflowCheckpoint$stepArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowStep
     */
    select?: WorkflowStepSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkflowStep
     */
    omit?: WorkflowStepOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowStepInclude<ExtArgs> | null
    where?: WorkflowStepWhereInput
  }

  /**
   * WorkflowCheckpoint without action
   */
  export type WorkflowCheckpointDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowCheckpoint
     */
    select?: WorkflowCheckpointSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkflowCheckpoint
     */
    omit?: WorkflowCheckpointOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowCheckpointInclude<ExtArgs> | null
  }


  /**
   * Model RunMessage
   */

  export type AggregateRunMessage = {
    _count: RunMessageCountAggregateOutputType | null
    _min: RunMessageMinAggregateOutputType | null
    _max: RunMessageMaxAggregateOutputType | null
  }

  export type RunMessageMinAggregateOutputType = {
    id: string | null
    runId: string | null
    role: string | null
    content: string | null
    toolName: string | null
    toolCallId: string | null
    createdAt: Date | null
  }

  export type RunMessageMaxAggregateOutputType = {
    id: string | null
    runId: string | null
    role: string | null
    content: string | null
    toolName: string | null
    toolCallId: string | null
    createdAt: Date | null
  }

  export type RunMessageCountAggregateOutputType = {
    id: number
    runId: number
    role: number
    content: number
    toolName: number
    toolCallId: number
    metadata: number
    createdAt: number
    _all: number
  }


  export type RunMessageMinAggregateInputType = {
    id?: true
    runId?: true
    role?: true
    content?: true
    toolName?: true
    toolCallId?: true
    createdAt?: true
  }

  export type RunMessageMaxAggregateInputType = {
    id?: true
    runId?: true
    role?: true
    content?: true
    toolName?: true
    toolCallId?: true
    createdAt?: true
  }

  export type RunMessageCountAggregateInputType = {
    id?: true
    runId?: true
    role?: true
    content?: true
    toolName?: true
    toolCallId?: true
    metadata?: true
    createdAt?: true
    _all?: true
  }

  export type RunMessageAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RunMessage to aggregate.
     */
    where?: RunMessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RunMessages to fetch.
     */
    orderBy?: RunMessageOrderByWithRelationInput | RunMessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RunMessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RunMessages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RunMessages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RunMessages
    **/
    _count?: true | RunMessageCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RunMessageMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RunMessageMaxAggregateInputType
  }

  export type GetRunMessageAggregateType<T extends RunMessageAggregateArgs> = {
        [P in keyof T & keyof AggregateRunMessage]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRunMessage[P]>
      : GetScalarType<T[P], AggregateRunMessage[P]>
  }




  export type RunMessageGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RunMessageWhereInput
    orderBy?: RunMessageOrderByWithAggregationInput | RunMessageOrderByWithAggregationInput[]
    by: RunMessageScalarFieldEnum[] | RunMessageScalarFieldEnum
    having?: RunMessageScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RunMessageCountAggregateInputType | true
    _min?: RunMessageMinAggregateInputType
    _max?: RunMessageMaxAggregateInputType
  }

  export type RunMessageGroupByOutputType = {
    id: string
    runId: string
    role: string
    content: string
    toolName: string | null
    toolCallId: string | null
    metadata: JsonValue | null
    createdAt: Date
    _count: RunMessageCountAggregateOutputType | null
    _min: RunMessageMinAggregateOutputType | null
    _max: RunMessageMaxAggregateOutputType | null
  }

  type GetRunMessageGroupByPayload<T extends RunMessageGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RunMessageGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RunMessageGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RunMessageGroupByOutputType[P]>
            : GetScalarType<T[P], RunMessageGroupByOutputType[P]>
        }
      >
    >


  export type RunMessageSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    runId?: boolean
    role?: boolean
    content?: boolean
    toolName?: boolean
    toolCallId?: boolean
    metadata?: boolean
    createdAt?: boolean
    run?: boolean | WorkflowRunDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["runMessage"]>

  export type RunMessageSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    runId?: boolean
    role?: boolean
    content?: boolean
    toolName?: boolean
    toolCallId?: boolean
    metadata?: boolean
    createdAt?: boolean
    run?: boolean | WorkflowRunDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["runMessage"]>

  export type RunMessageSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    runId?: boolean
    role?: boolean
    content?: boolean
    toolName?: boolean
    toolCallId?: boolean
    metadata?: boolean
    createdAt?: boolean
    run?: boolean | WorkflowRunDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["runMessage"]>

  export type RunMessageSelectScalar = {
    id?: boolean
    runId?: boolean
    role?: boolean
    content?: boolean
    toolName?: boolean
    toolCallId?: boolean
    metadata?: boolean
    createdAt?: boolean
  }

  export type RunMessageOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "runId" | "role" | "content" | "toolName" | "toolCallId" | "metadata" | "createdAt", ExtArgs["result"]["runMessage"]>
  export type RunMessageInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    run?: boolean | WorkflowRunDefaultArgs<ExtArgs>
  }
  export type RunMessageIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    run?: boolean | WorkflowRunDefaultArgs<ExtArgs>
  }
  export type RunMessageIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    run?: boolean | WorkflowRunDefaultArgs<ExtArgs>
  }

  export type $RunMessagePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RunMessage"
    objects: {
      run: Prisma.$WorkflowRunPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      runId: string
      role: string
      content: string
      toolName: string | null
      toolCallId: string | null
      metadata: Prisma.JsonValue | null
      createdAt: Date
    }, ExtArgs["result"]["runMessage"]>
    composites: {}
  }

  type RunMessageGetPayload<S extends boolean | null | undefined | RunMessageDefaultArgs> = $Result.GetResult<Prisma.$RunMessagePayload, S>

  type RunMessageCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RunMessageFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RunMessageCountAggregateInputType | true
    }

  export interface RunMessageDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RunMessage'], meta: { name: 'RunMessage' } }
    /**
     * Find zero or one RunMessage that matches the filter.
     * @param {RunMessageFindUniqueArgs} args - Arguments to find a RunMessage
     * @example
     * // Get one RunMessage
     * const runMessage = await prisma.runMessage.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RunMessageFindUniqueArgs>(args: SelectSubset<T, RunMessageFindUniqueArgs<ExtArgs>>): Prisma__RunMessageClient<$Result.GetResult<Prisma.$RunMessagePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one RunMessage that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RunMessageFindUniqueOrThrowArgs} args - Arguments to find a RunMessage
     * @example
     * // Get one RunMessage
     * const runMessage = await prisma.runMessage.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RunMessageFindUniqueOrThrowArgs>(args: SelectSubset<T, RunMessageFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RunMessageClient<$Result.GetResult<Prisma.$RunMessagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RunMessage that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RunMessageFindFirstArgs} args - Arguments to find a RunMessage
     * @example
     * // Get one RunMessage
     * const runMessage = await prisma.runMessage.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RunMessageFindFirstArgs>(args?: SelectSubset<T, RunMessageFindFirstArgs<ExtArgs>>): Prisma__RunMessageClient<$Result.GetResult<Prisma.$RunMessagePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RunMessage that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RunMessageFindFirstOrThrowArgs} args - Arguments to find a RunMessage
     * @example
     * // Get one RunMessage
     * const runMessage = await prisma.runMessage.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RunMessageFindFirstOrThrowArgs>(args?: SelectSubset<T, RunMessageFindFirstOrThrowArgs<ExtArgs>>): Prisma__RunMessageClient<$Result.GetResult<Prisma.$RunMessagePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more RunMessages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RunMessageFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RunMessages
     * const runMessages = await prisma.runMessage.findMany()
     * 
     * // Get first 10 RunMessages
     * const runMessages = await prisma.runMessage.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const runMessageWithIdOnly = await prisma.runMessage.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RunMessageFindManyArgs>(args?: SelectSubset<T, RunMessageFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RunMessagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a RunMessage.
     * @param {RunMessageCreateArgs} args - Arguments to create a RunMessage.
     * @example
     * // Create one RunMessage
     * const RunMessage = await prisma.runMessage.create({
     *   data: {
     *     // ... data to create a RunMessage
     *   }
     * })
     * 
     */
    create<T extends RunMessageCreateArgs>(args: SelectSubset<T, RunMessageCreateArgs<ExtArgs>>): Prisma__RunMessageClient<$Result.GetResult<Prisma.$RunMessagePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many RunMessages.
     * @param {RunMessageCreateManyArgs} args - Arguments to create many RunMessages.
     * @example
     * // Create many RunMessages
     * const runMessage = await prisma.runMessage.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RunMessageCreateManyArgs>(args?: SelectSubset<T, RunMessageCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many RunMessages and returns the data saved in the database.
     * @param {RunMessageCreateManyAndReturnArgs} args - Arguments to create many RunMessages.
     * @example
     * // Create many RunMessages
     * const runMessage = await prisma.runMessage.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many RunMessages and only return the `id`
     * const runMessageWithIdOnly = await prisma.runMessage.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RunMessageCreateManyAndReturnArgs>(args?: SelectSubset<T, RunMessageCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RunMessagePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a RunMessage.
     * @param {RunMessageDeleteArgs} args - Arguments to delete one RunMessage.
     * @example
     * // Delete one RunMessage
     * const RunMessage = await prisma.runMessage.delete({
     *   where: {
     *     // ... filter to delete one RunMessage
     *   }
     * })
     * 
     */
    delete<T extends RunMessageDeleteArgs>(args: SelectSubset<T, RunMessageDeleteArgs<ExtArgs>>): Prisma__RunMessageClient<$Result.GetResult<Prisma.$RunMessagePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one RunMessage.
     * @param {RunMessageUpdateArgs} args - Arguments to update one RunMessage.
     * @example
     * // Update one RunMessage
     * const runMessage = await prisma.runMessage.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RunMessageUpdateArgs>(args: SelectSubset<T, RunMessageUpdateArgs<ExtArgs>>): Prisma__RunMessageClient<$Result.GetResult<Prisma.$RunMessagePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more RunMessages.
     * @param {RunMessageDeleteManyArgs} args - Arguments to filter RunMessages to delete.
     * @example
     * // Delete a few RunMessages
     * const { count } = await prisma.runMessage.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RunMessageDeleteManyArgs>(args?: SelectSubset<T, RunMessageDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RunMessages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RunMessageUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RunMessages
     * const runMessage = await prisma.runMessage.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RunMessageUpdateManyArgs>(args: SelectSubset<T, RunMessageUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RunMessages and returns the data updated in the database.
     * @param {RunMessageUpdateManyAndReturnArgs} args - Arguments to update many RunMessages.
     * @example
     * // Update many RunMessages
     * const runMessage = await prisma.runMessage.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more RunMessages and only return the `id`
     * const runMessageWithIdOnly = await prisma.runMessage.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends RunMessageUpdateManyAndReturnArgs>(args: SelectSubset<T, RunMessageUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RunMessagePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one RunMessage.
     * @param {RunMessageUpsertArgs} args - Arguments to update or create a RunMessage.
     * @example
     * // Update or create a RunMessage
     * const runMessage = await prisma.runMessage.upsert({
     *   create: {
     *     // ... data to create a RunMessage
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RunMessage we want to update
     *   }
     * })
     */
    upsert<T extends RunMessageUpsertArgs>(args: SelectSubset<T, RunMessageUpsertArgs<ExtArgs>>): Prisma__RunMessageClient<$Result.GetResult<Prisma.$RunMessagePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of RunMessages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RunMessageCountArgs} args - Arguments to filter RunMessages to count.
     * @example
     * // Count the number of RunMessages
     * const count = await prisma.runMessage.count({
     *   where: {
     *     // ... the filter for the RunMessages we want to count
     *   }
     * })
    **/
    count<T extends RunMessageCountArgs>(
      args?: Subset<T, RunMessageCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RunMessageCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RunMessage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RunMessageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RunMessageAggregateArgs>(args: Subset<T, RunMessageAggregateArgs>): Prisma.PrismaPromise<GetRunMessageAggregateType<T>>

    /**
     * Group by RunMessage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RunMessageGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RunMessageGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RunMessageGroupByArgs['orderBy'] }
        : { orderBy?: RunMessageGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RunMessageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRunMessageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RunMessage model
   */
  readonly fields: RunMessageFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RunMessage.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RunMessageClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    run<T extends WorkflowRunDefaultArgs<ExtArgs> = {}>(args?: Subset<T, WorkflowRunDefaultArgs<ExtArgs>>): Prisma__WorkflowRunClient<$Result.GetResult<Prisma.$WorkflowRunPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the RunMessage model
   */
  interface RunMessageFieldRefs {
    readonly id: FieldRef<"RunMessage", 'String'>
    readonly runId: FieldRef<"RunMessage", 'String'>
    readonly role: FieldRef<"RunMessage", 'String'>
    readonly content: FieldRef<"RunMessage", 'String'>
    readonly toolName: FieldRef<"RunMessage", 'String'>
    readonly toolCallId: FieldRef<"RunMessage", 'String'>
    readonly metadata: FieldRef<"RunMessage", 'Json'>
    readonly createdAt: FieldRef<"RunMessage", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * RunMessage findUnique
   */
  export type RunMessageFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RunMessage
     */
    select?: RunMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RunMessage
     */
    omit?: RunMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RunMessageInclude<ExtArgs> | null
    /**
     * Filter, which RunMessage to fetch.
     */
    where: RunMessageWhereUniqueInput
  }

  /**
   * RunMessage findUniqueOrThrow
   */
  export type RunMessageFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RunMessage
     */
    select?: RunMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RunMessage
     */
    omit?: RunMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RunMessageInclude<ExtArgs> | null
    /**
     * Filter, which RunMessage to fetch.
     */
    where: RunMessageWhereUniqueInput
  }

  /**
   * RunMessage findFirst
   */
  export type RunMessageFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RunMessage
     */
    select?: RunMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RunMessage
     */
    omit?: RunMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RunMessageInclude<ExtArgs> | null
    /**
     * Filter, which RunMessage to fetch.
     */
    where?: RunMessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RunMessages to fetch.
     */
    orderBy?: RunMessageOrderByWithRelationInput | RunMessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RunMessages.
     */
    cursor?: RunMessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RunMessages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RunMessages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RunMessages.
     */
    distinct?: RunMessageScalarFieldEnum | RunMessageScalarFieldEnum[]
  }

  /**
   * RunMessage findFirstOrThrow
   */
  export type RunMessageFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RunMessage
     */
    select?: RunMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RunMessage
     */
    omit?: RunMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RunMessageInclude<ExtArgs> | null
    /**
     * Filter, which RunMessage to fetch.
     */
    where?: RunMessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RunMessages to fetch.
     */
    orderBy?: RunMessageOrderByWithRelationInput | RunMessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RunMessages.
     */
    cursor?: RunMessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RunMessages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RunMessages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RunMessages.
     */
    distinct?: RunMessageScalarFieldEnum | RunMessageScalarFieldEnum[]
  }

  /**
   * RunMessage findMany
   */
  export type RunMessageFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RunMessage
     */
    select?: RunMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RunMessage
     */
    omit?: RunMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RunMessageInclude<ExtArgs> | null
    /**
     * Filter, which RunMessages to fetch.
     */
    where?: RunMessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RunMessages to fetch.
     */
    orderBy?: RunMessageOrderByWithRelationInput | RunMessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RunMessages.
     */
    cursor?: RunMessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RunMessages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RunMessages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RunMessages.
     */
    distinct?: RunMessageScalarFieldEnum | RunMessageScalarFieldEnum[]
  }

  /**
   * RunMessage create
   */
  export type RunMessageCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RunMessage
     */
    select?: RunMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RunMessage
     */
    omit?: RunMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RunMessageInclude<ExtArgs> | null
    /**
     * The data needed to create a RunMessage.
     */
    data: XOR<RunMessageCreateInput, RunMessageUncheckedCreateInput>
  }

  /**
   * RunMessage createMany
   */
  export type RunMessageCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RunMessages.
     */
    data: RunMessageCreateManyInput | RunMessageCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RunMessage createManyAndReturn
   */
  export type RunMessageCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RunMessage
     */
    select?: RunMessageSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RunMessage
     */
    omit?: RunMessageOmit<ExtArgs> | null
    /**
     * The data used to create many RunMessages.
     */
    data: RunMessageCreateManyInput | RunMessageCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RunMessageIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * RunMessage update
   */
  export type RunMessageUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RunMessage
     */
    select?: RunMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RunMessage
     */
    omit?: RunMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RunMessageInclude<ExtArgs> | null
    /**
     * The data needed to update a RunMessage.
     */
    data: XOR<RunMessageUpdateInput, RunMessageUncheckedUpdateInput>
    /**
     * Choose, which RunMessage to update.
     */
    where: RunMessageWhereUniqueInput
  }

  /**
   * RunMessage updateMany
   */
  export type RunMessageUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RunMessages.
     */
    data: XOR<RunMessageUpdateManyMutationInput, RunMessageUncheckedUpdateManyInput>
    /**
     * Filter which RunMessages to update
     */
    where?: RunMessageWhereInput
    /**
     * Limit how many RunMessages to update.
     */
    limit?: number
  }

  /**
   * RunMessage updateManyAndReturn
   */
  export type RunMessageUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RunMessage
     */
    select?: RunMessageSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RunMessage
     */
    omit?: RunMessageOmit<ExtArgs> | null
    /**
     * The data used to update RunMessages.
     */
    data: XOR<RunMessageUpdateManyMutationInput, RunMessageUncheckedUpdateManyInput>
    /**
     * Filter which RunMessages to update
     */
    where?: RunMessageWhereInput
    /**
     * Limit how many RunMessages to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RunMessageIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * RunMessage upsert
   */
  export type RunMessageUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RunMessage
     */
    select?: RunMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RunMessage
     */
    omit?: RunMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RunMessageInclude<ExtArgs> | null
    /**
     * The filter to search for the RunMessage to update in case it exists.
     */
    where: RunMessageWhereUniqueInput
    /**
     * In case the RunMessage found by the `where` argument doesn't exist, create a new RunMessage with this data.
     */
    create: XOR<RunMessageCreateInput, RunMessageUncheckedCreateInput>
    /**
     * In case the RunMessage was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RunMessageUpdateInput, RunMessageUncheckedUpdateInput>
  }

  /**
   * RunMessage delete
   */
  export type RunMessageDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RunMessage
     */
    select?: RunMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RunMessage
     */
    omit?: RunMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RunMessageInclude<ExtArgs> | null
    /**
     * Filter which RunMessage to delete.
     */
    where: RunMessageWhereUniqueInput
  }

  /**
   * RunMessage deleteMany
   */
  export type RunMessageDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RunMessages to delete
     */
    where?: RunMessageWhereInput
    /**
     * Limit how many RunMessages to delete.
     */
    limit?: number
  }

  /**
   * RunMessage without action
   */
  export type RunMessageDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RunMessage
     */
    select?: RunMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RunMessage
     */
    omit?: RunMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RunMessageInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const ArtifactScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    type: 'type',
    name: 'name',
    mimeType: 'mimeType',
    storagePath: 'storagePath',
    textContent: 'textContent',
    jsonContent: 'jsonContent',
    metadata: 'metadata',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ArtifactScalarFieldEnum = (typeof ArtifactScalarFieldEnum)[keyof typeof ArtifactScalarFieldEnum]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    name: 'name',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    password: 'password'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const ConversationScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    title: 'title',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ConversationScalarFieldEnum = (typeof ConversationScalarFieldEnum)[keyof typeof ConversationScalarFieldEnum]


  export const MessageScalarFieldEnum: {
    id: 'id',
    conversationId: 'conversationId',
    role: 'role',
    content: 'content',
    toolCallId: 'toolCallId',
    toolName: 'toolName',
    createdAt: 'createdAt'
  };

  export type MessageScalarFieldEnum = (typeof MessageScalarFieldEnum)[keyof typeof MessageScalarFieldEnum]


  export const OAuthTokenScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    provider: 'provider',
    accessToken: 'accessToken',
    refreshToken: 'refreshToken',
    expiresAt: 'expiresAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type OAuthTokenScalarFieldEnum = (typeof OAuthTokenScalarFieldEnum)[keyof typeof OAuthTokenScalarFieldEnum]


  export const WorkflowRunScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    conversationId: 'conversationId',
    prompt: 'prompt',
    status: 'status',
    model: 'model',
    maxSteps: 'maxSteps',
    startedAt: 'startedAt',
    endedAt: 'endedAt',
    finalAnswer: 'finalAnswer',
    errorClass: 'errorClass',
    errorMessage: 'errorMessage',
    metadata: 'metadata',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type WorkflowRunScalarFieldEnum = (typeof WorkflowRunScalarFieldEnum)[keyof typeof WorkflowRunScalarFieldEnum]


  export const WorkflowStepScalarFieldEnum: {
    id: 'id',
    runId: 'runId',
    stepId: 'stepId',
    stepType: 'stepType',
    status: 'status',
    toolName: 'toolName',
    input: 'input',
    output: 'output',
    errorClass: 'errorClass',
    errorMessage: 'errorMessage',
    retryCount: 'retryCount',
    startedAt: 'startedAt',
    endedAt: 'endedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type WorkflowStepScalarFieldEnum = (typeof WorkflowStepScalarFieldEnum)[keyof typeof WorkflowStepScalarFieldEnum]


  export const WorkflowEventScalarFieldEnum: {
    id: 'id',
    runId: 'runId',
    workflowStepId: 'workflowStepId',
    eventType: 'eventType',
    payload: 'payload',
    createdAt: 'createdAt'
  };

  export type WorkflowEventScalarFieldEnum = (typeof WorkflowEventScalarFieldEnum)[keyof typeof WorkflowEventScalarFieldEnum]


  export const WorkflowCheckpointScalarFieldEnum: {
    id: 'id',
    runId: 'runId',
    workflowStepId: 'workflowStepId',
    sequence: 'sequence',
    snapshot: 'snapshot',
    createdAt: 'createdAt'
  };

  export type WorkflowCheckpointScalarFieldEnum = (typeof WorkflowCheckpointScalarFieldEnum)[keyof typeof WorkflowCheckpointScalarFieldEnum]


  export const RunMessageScalarFieldEnum: {
    id: 'id',
    runId: 'runId',
    role: 'role',
    content: 'content',
    toolName: 'toolName',
    toolCallId: 'toolCallId',
    metadata: 'metadata',
    createdAt: 'createdAt'
  };

  export type RunMessageScalarFieldEnum = (typeof RunMessageScalarFieldEnum)[keyof typeof RunMessageScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'WorkflowRunStatus'
   */
  export type EnumWorkflowRunStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'WorkflowRunStatus'>
    


  /**
   * Reference to a field of type 'WorkflowRunStatus[]'
   */
  export type ListEnumWorkflowRunStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'WorkflowRunStatus[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'WorkflowStepType'
   */
  export type EnumWorkflowStepTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'WorkflowStepType'>
    


  /**
   * Reference to a field of type 'WorkflowStepType[]'
   */
  export type ListEnumWorkflowStepTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'WorkflowStepType[]'>
    


  /**
   * Reference to a field of type 'WorkflowStepStatus'
   */
  export type EnumWorkflowStepStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'WorkflowStepStatus'>
    


  /**
   * Reference to a field of type 'WorkflowStepStatus[]'
   */
  export type ListEnumWorkflowStepStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'WorkflowStepStatus[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type ArtifactWhereInput = {
    AND?: ArtifactWhereInput | ArtifactWhereInput[]
    OR?: ArtifactWhereInput[]
    NOT?: ArtifactWhereInput | ArtifactWhereInput[]
    id?: StringFilter<"Artifact"> | string
    userId?: StringFilter<"Artifact"> | string
    type?: StringFilter<"Artifact"> | string
    name?: StringNullableFilter<"Artifact"> | string | null
    mimeType?: StringNullableFilter<"Artifact"> | string | null
    storagePath?: StringNullableFilter<"Artifact"> | string | null
    textContent?: StringNullableFilter<"Artifact"> | string | null
    jsonContent?: JsonNullableFilter<"Artifact">
    metadata?: JsonNullableFilter<"Artifact">
    createdAt?: DateTimeFilter<"Artifact"> | Date | string
    updatedAt?: DateTimeFilter<"Artifact"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type ArtifactOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    name?: SortOrderInput | SortOrder
    mimeType?: SortOrderInput | SortOrder
    storagePath?: SortOrderInput | SortOrder
    textContent?: SortOrderInput | SortOrder
    jsonContent?: SortOrderInput | SortOrder
    metadata?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type ArtifactWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ArtifactWhereInput | ArtifactWhereInput[]
    OR?: ArtifactWhereInput[]
    NOT?: ArtifactWhereInput | ArtifactWhereInput[]
    userId?: StringFilter<"Artifact"> | string
    type?: StringFilter<"Artifact"> | string
    name?: StringNullableFilter<"Artifact"> | string | null
    mimeType?: StringNullableFilter<"Artifact"> | string | null
    storagePath?: StringNullableFilter<"Artifact"> | string | null
    textContent?: StringNullableFilter<"Artifact"> | string | null
    jsonContent?: JsonNullableFilter<"Artifact">
    metadata?: JsonNullableFilter<"Artifact">
    createdAt?: DateTimeFilter<"Artifact"> | Date | string
    updatedAt?: DateTimeFilter<"Artifact"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type ArtifactOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    name?: SortOrderInput | SortOrder
    mimeType?: SortOrderInput | SortOrder
    storagePath?: SortOrderInput | SortOrder
    textContent?: SortOrderInput | SortOrder
    jsonContent?: SortOrderInput | SortOrder
    metadata?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ArtifactCountOrderByAggregateInput
    _max?: ArtifactMaxOrderByAggregateInput
    _min?: ArtifactMinOrderByAggregateInput
  }

  export type ArtifactScalarWhereWithAggregatesInput = {
    AND?: ArtifactScalarWhereWithAggregatesInput | ArtifactScalarWhereWithAggregatesInput[]
    OR?: ArtifactScalarWhereWithAggregatesInput[]
    NOT?: ArtifactScalarWhereWithAggregatesInput | ArtifactScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Artifact"> | string
    userId?: StringWithAggregatesFilter<"Artifact"> | string
    type?: StringWithAggregatesFilter<"Artifact"> | string
    name?: StringNullableWithAggregatesFilter<"Artifact"> | string | null
    mimeType?: StringNullableWithAggregatesFilter<"Artifact"> | string | null
    storagePath?: StringNullableWithAggregatesFilter<"Artifact"> | string | null
    textContent?: StringNullableWithAggregatesFilter<"Artifact"> | string | null
    jsonContent?: JsonNullableWithAggregatesFilter<"Artifact">
    metadata?: JsonNullableWithAggregatesFilter<"Artifact">
    createdAt?: DateTimeWithAggregatesFilter<"Artifact"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Artifact"> | Date | string
  }

  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    password?: StringFilter<"User"> | string
    conversations?: ConversationListRelationFilter
    oauthTokens?: OAuthTokenListRelationFilter
    artifacts?: ArtifactListRelationFilter
    workflowRuns?: WorkflowRunListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    password?: SortOrder
    conversations?: ConversationOrderByRelationAggregateInput
    oauthTokens?: OAuthTokenOrderByRelationAggregateInput
    artifacts?: ArtifactOrderByRelationAggregateInput
    workflowRuns?: WorkflowRunOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    password?: StringFilter<"User"> | string
    conversations?: ConversationListRelationFilter
    oauthTokens?: OAuthTokenListRelationFilter
    artifacts?: ArtifactListRelationFilter
    workflowRuns?: WorkflowRunListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    password?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    name?: StringWithAggregatesFilter<"User"> | string
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    password?: StringWithAggregatesFilter<"User"> | string
  }

  export type ConversationWhereInput = {
    AND?: ConversationWhereInput | ConversationWhereInput[]
    OR?: ConversationWhereInput[]
    NOT?: ConversationWhereInput | ConversationWhereInput[]
    id?: StringFilter<"Conversation"> | string
    userId?: StringFilter<"Conversation"> | string
    title?: StringNullableFilter<"Conversation"> | string | null
    createdAt?: DateTimeFilter<"Conversation"> | Date | string
    updatedAt?: DateTimeFilter<"Conversation"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    messages?: MessageListRelationFilter
    workflowRuns?: WorkflowRunListRelationFilter
  }

  export type ConversationOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    messages?: MessageOrderByRelationAggregateInput
    workflowRuns?: WorkflowRunOrderByRelationAggregateInput
  }

  export type ConversationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ConversationWhereInput | ConversationWhereInput[]
    OR?: ConversationWhereInput[]
    NOT?: ConversationWhereInput | ConversationWhereInput[]
    userId?: StringFilter<"Conversation"> | string
    title?: StringNullableFilter<"Conversation"> | string | null
    createdAt?: DateTimeFilter<"Conversation"> | Date | string
    updatedAt?: DateTimeFilter<"Conversation"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    messages?: MessageListRelationFilter
    workflowRuns?: WorkflowRunListRelationFilter
  }, "id">

  export type ConversationOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ConversationCountOrderByAggregateInput
    _max?: ConversationMaxOrderByAggregateInput
    _min?: ConversationMinOrderByAggregateInput
  }

  export type ConversationScalarWhereWithAggregatesInput = {
    AND?: ConversationScalarWhereWithAggregatesInput | ConversationScalarWhereWithAggregatesInput[]
    OR?: ConversationScalarWhereWithAggregatesInput[]
    NOT?: ConversationScalarWhereWithAggregatesInput | ConversationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Conversation"> | string
    userId?: StringWithAggregatesFilter<"Conversation"> | string
    title?: StringNullableWithAggregatesFilter<"Conversation"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Conversation"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Conversation"> | Date | string
  }

  export type MessageWhereInput = {
    AND?: MessageWhereInput | MessageWhereInput[]
    OR?: MessageWhereInput[]
    NOT?: MessageWhereInput | MessageWhereInput[]
    id?: StringFilter<"Message"> | string
    conversationId?: StringFilter<"Message"> | string
    role?: StringFilter<"Message"> | string
    content?: StringFilter<"Message"> | string
    toolCallId?: StringNullableFilter<"Message"> | string | null
    toolName?: StringNullableFilter<"Message"> | string | null
    createdAt?: DateTimeFilter<"Message"> | Date | string
    conversation?: XOR<ConversationScalarRelationFilter, ConversationWhereInput>
  }

  export type MessageOrderByWithRelationInput = {
    id?: SortOrder
    conversationId?: SortOrder
    role?: SortOrder
    content?: SortOrder
    toolCallId?: SortOrderInput | SortOrder
    toolName?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    conversation?: ConversationOrderByWithRelationInput
  }

  export type MessageWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: MessageWhereInput | MessageWhereInput[]
    OR?: MessageWhereInput[]
    NOT?: MessageWhereInput | MessageWhereInput[]
    conversationId?: StringFilter<"Message"> | string
    role?: StringFilter<"Message"> | string
    content?: StringFilter<"Message"> | string
    toolCallId?: StringNullableFilter<"Message"> | string | null
    toolName?: StringNullableFilter<"Message"> | string | null
    createdAt?: DateTimeFilter<"Message"> | Date | string
    conversation?: XOR<ConversationScalarRelationFilter, ConversationWhereInput>
  }, "id">

  export type MessageOrderByWithAggregationInput = {
    id?: SortOrder
    conversationId?: SortOrder
    role?: SortOrder
    content?: SortOrder
    toolCallId?: SortOrderInput | SortOrder
    toolName?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: MessageCountOrderByAggregateInput
    _max?: MessageMaxOrderByAggregateInput
    _min?: MessageMinOrderByAggregateInput
  }

  export type MessageScalarWhereWithAggregatesInput = {
    AND?: MessageScalarWhereWithAggregatesInput | MessageScalarWhereWithAggregatesInput[]
    OR?: MessageScalarWhereWithAggregatesInput[]
    NOT?: MessageScalarWhereWithAggregatesInput | MessageScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Message"> | string
    conversationId?: StringWithAggregatesFilter<"Message"> | string
    role?: StringWithAggregatesFilter<"Message"> | string
    content?: StringWithAggregatesFilter<"Message"> | string
    toolCallId?: StringNullableWithAggregatesFilter<"Message"> | string | null
    toolName?: StringNullableWithAggregatesFilter<"Message"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Message"> | Date | string
  }

  export type OAuthTokenWhereInput = {
    AND?: OAuthTokenWhereInput | OAuthTokenWhereInput[]
    OR?: OAuthTokenWhereInput[]
    NOT?: OAuthTokenWhereInput | OAuthTokenWhereInput[]
    id?: StringFilter<"OAuthToken"> | string
    userId?: StringFilter<"OAuthToken"> | string
    provider?: StringFilter<"OAuthToken"> | string
    accessToken?: StringFilter<"OAuthToken"> | string
    refreshToken?: StringNullableFilter<"OAuthToken"> | string | null
    expiresAt?: DateTimeNullableFilter<"OAuthToken"> | Date | string | null
    createdAt?: DateTimeFilter<"OAuthToken"> | Date | string
    updatedAt?: DateTimeFilter<"OAuthToken"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type OAuthTokenOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    provider?: SortOrder
    accessToken?: SortOrder
    refreshToken?: SortOrderInput | SortOrder
    expiresAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type OAuthTokenWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId_provider?: OAuthTokenUserIdProviderCompoundUniqueInput
    AND?: OAuthTokenWhereInput | OAuthTokenWhereInput[]
    OR?: OAuthTokenWhereInput[]
    NOT?: OAuthTokenWhereInput | OAuthTokenWhereInput[]
    userId?: StringFilter<"OAuthToken"> | string
    provider?: StringFilter<"OAuthToken"> | string
    accessToken?: StringFilter<"OAuthToken"> | string
    refreshToken?: StringNullableFilter<"OAuthToken"> | string | null
    expiresAt?: DateTimeNullableFilter<"OAuthToken"> | Date | string | null
    createdAt?: DateTimeFilter<"OAuthToken"> | Date | string
    updatedAt?: DateTimeFilter<"OAuthToken"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "userId_provider">

  export type OAuthTokenOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    provider?: SortOrder
    accessToken?: SortOrder
    refreshToken?: SortOrderInput | SortOrder
    expiresAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: OAuthTokenCountOrderByAggregateInput
    _max?: OAuthTokenMaxOrderByAggregateInput
    _min?: OAuthTokenMinOrderByAggregateInput
  }

  export type OAuthTokenScalarWhereWithAggregatesInput = {
    AND?: OAuthTokenScalarWhereWithAggregatesInput | OAuthTokenScalarWhereWithAggregatesInput[]
    OR?: OAuthTokenScalarWhereWithAggregatesInput[]
    NOT?: OAuthTokenScalarWhereWithAggregatesInput | OAuthTokenScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"OAuthToken"> | string
    userId?: StringWithAggregatesFilter<"OAuthToken"> | string
    provider?: StringWithAggregatesFilter<"OAuthToken"> | string
    accessToken?: StringWithAggregatesFilter<"OAuthToken"> | string
    refreshToken?: StringNullableWithAggregatesFilter<"OAuthToken"> | string | null
    expiresAt?: DateTimeNullableWithAggregatesFilter<"OAuthToken"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"OAuthToken"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"OAuthToken"> | Date | string
  }

  export type WorkflowRunWhereInput = {
    AND?: WorkflowRunWhereInput | WorkflowRunWhereInput[]
    OR?: WorkflowRunWhereInput[]
    NOT?: WorkflowRunWhereInput | WorkflowRunWhereInput[]
    id?: StringFilter<"WorkflowRun"> | string
    userId?: StringFilter<"WorkflowRun"> | string
    conversationId?: StringNullableFilter<"WorkflowRun"> | string | null
    prompt?: StringFilter<"WorkflowRun"> | string
    status?: EnumWorkflowRunStatusFilter<"WorkflowRun"> | $Enums.WorkflowRunStatus
    model?: StringNullableFilter<"WorkflowRun"> | string | null
    maxSteps?: IntNullableFilter<"WorkflowRun"> | number | null
    startedAt?: DateTimeNullableFilter<"WorkflowRun"> | Date | string | null
    endedAt?: DateTimeNullableFilter<"WorkflowRun"> | Date | string | null
    finalAnswer?: StringNullableFilter<"WorkflowRun"> | string | null
    errorClass?: StringNullableFilter<"WorkflowRun"> | string | null
    errorMessage?: StringNullableFilter<"WorkflowRun"> | string | null
    metadata?: JsonNullableFilter<"WorkflowRun">
    createdAt?: DateTimeFilter<"WorkflowRun"> | Date | string
    updatedAt?: DateTimeFilter<"WorkflowRun"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    conversation?: XOR<ConversationNullableScalarRelationFilter, ConversationWhereInput> | null
    steps?: WorkflowStepListRelationFilter
    events?: WorkflowEventListRelationFilter
    checkpoints?: WorkflowCheckpointListRelationFilter
    messages?: RunMessageListRelationFilter
  }

  export type WorkflowRunOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    conversationId?: SortOrderInput | SortOrder
    prompt?: SortOrder
    status?: SortOrder
    model?: SortOrderInput | SortOrder
    maxSteps?: SortOrderInput | SortOrder
    startedAt?: SortOrderInput | SortOrder
    endedAt?: SortOrderInput | SortOrder
    finalAnswer?: SortOrderInput | SortOrder
    errorClass?: SortOrderInput | SortOrder
    errorMessage?: SortOrderInput | SortOrder
    metadata?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    conversation?: ConversationOrderByWithRelationInput
    steps?: WorkflowStepOrderByRelationAggregateInput
    events?: WorkflowEventOrderByRelationAggregateInput
    checkpoints?: WorkflowCheckpointOrderByRelationAggregateInput
    messages?: RunMessageOrderByRelationAggregateInput
  }

  export type WorkflowRunWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: WorkflowRunWhereInput | WorkflowRunWhereInput[]
    OR?: WorkflowRunWhereInput[]
    NOT?: WorkflowRunWhereInput | WorkflowRunWhereInput[]
    userId?: StringFilter<"WorkflowRun"> | string
    conversationId?: StringNullableFilter<"WorkflowRun"> | string | null
    prompt?: StringFilter<"WorkflowRun"> | string
    status?: EnumWorkflowRunStatusFilter<"WorkflowRun"> | $Enums.WorkflowRunStatus
    model?: StringNullableFilter<"WorkflowRun"> | string | null
    maxSteps?: IntNullableFilter<"WorkflowRun"> | number | null
    startedAt?: DateTimeNullableFilter<"WorkflowRun"> | Date | string | null
    endedAt?: DateTimeNullableFilter<"WorkflowRun"> | Date | string | null
    finalAnswer?: StringNullableFilter<"WorkflowRun"> | string | null
    errorClass?: StringNullableFilter<"WorkflowRun"> | string | null
    errorMessage?: StringNullableFilter<"WorkflowRun"> | string | null
    metadata?: JsonNullableFilter<"WorkflowRun">
    createdAt?: DateTimeFilter<"WorkflowRun"> | Date | string
    updatedAt?: DateTimeFilter<"WorkflowRun"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    conversation?: XOR<ConversationNullableScalarRelationFilter, ConversationWhereInput> | null
    steps?: WorkflowStepListRelationFilter
    events?: WorkflowEventListRelationFilter
    checkpoints?: WorkflowCheckpointListRelationFilter
    messages?: RunMessageListRelationFilter
  }, "id">

  export type WorkflowRunOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    conversationId?: SortOrderInput | SortOrder
    prompt?: SortOrder
    status?: SortOrder
    model?: SortOrderInput | SortOrder
    maxSteps?: SortOrderInput | SortOrder
    startedAt?: SortOrderInput | SortOrder
    endedAt?: SortOrderInput | SortOrder
    finalAnswer?: SortOrderInput | SortOrder
    errorClass?: SortOrderInput | SortOrder
    errorMessage?: SortOrderInput | SortOrder
    metadata?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: WorkflowRunCountOrderByAggregateInput
    _avg?: WorkflowRunAvgOrderByAggregateInput
    _max?: WorkflowRunMaxOrderByAggregateInput
    _min?: WorkflowRunMinOrderByAggregateInput
    _sum?: WorkflowRunSumOrderByAggregateInput
  }

  export type WorkflowRunScalarWhereWithAggregatesInput = {
    AND?: WorkflowRunScalarWhereWithAggregatesInput | WorkflowRunScalarWhereWithAggregatesInput[]
    OR?: WorkflowRunScalarWhereWithAggregatesInput[]
    NOT?: WorkflowRunScalarWhereWithAggregatesInput | WorkflowRunScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"WorkflowRun"> | string
    userId?: StringWithAggregatesFilter<"WorkflowRun"> | string
    conversationId?: StringNullableWithAggregatesFilter<"WorkflowRun"> | string | null
    prompt?: StringWithAggregatesFilter<"WorkflowRun"> | string
    status?: EnumWorkflowRunStatusWithAggregatesFilter<"WorkflowRun"> | $Enums.WorkflowRunStatus
    model?: StringNullableWithAggregatesFilter<"WorkflowRun"> | string | null
    maxSteps?: IntNullableWithAggregatesFilter<"WorkflowRun"> | number | null
    startedAt?: DateTimeNullableWithAggregatesFilter<"WorkflowRun"> | Date | string | null
    endedAt?: DateTimeNullableWithAggregatesFilter<"WorkflowRun"> | Date | string | null
    finalAnswer?: StringNullableWithAggregatesFilter<"WorkflowRun"> | string | null
    errorClass?: StringNullableWithAggregatesFilter<"WorkflowRun"> | string | null
    errorMessage?: StringNullableWithAggregatesFilter<"WorkflowRun"> | string | null
    metadata?: JsonNullableWithAggregatesFilter<"WorkflowRun">
    createdAt?: DateTimeWithAggregatesFilter<"WorkflowRun"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"WorkflowRun"> | Date | string
  }

  export type WorkflowStepWhereInput = {
    AND?: WorkflowStepWhereInput | WorkflowStepWhereInput[]
    OR?: WorkflowStepWhereInput[]
    NOT?: WorkflowStepWhereInput | WorkflowStepWhereInput[]
    id?: StringFilter<"WorkflowStep"> | string
    runId?: StringFilter<"WorkflowStep"> | string
    stepId?: StringFilter<"WorkflowStep"> | string
    stepType?: EnumWorkflowStepTypeFilter<"WorkflowStep"> | $Enums.WorkflowStepType
    status?: EnumWorkflowStepStatusFilter<"WorkflowStep"> | $Enums.WorkflowStepStatus
    toolName?: StringNullableFilter<"WorkflowStep"> | string | null
    input?: JsonNullableFilter<"WorkflowStep">
    output?: JsonNullableFilter<"WorkflowStep">
    errorClass?: StringNullableFilter<"WorkflowStep"> | string | null
    errorMessage?: StringNullableFilter<"WorkflowStep"> | string | null
    retryCount?: IntFilter<"WorkflowStep"> | number
    startedAt?: DateTimeNullableFilter<"WorkflowStep"> | Date | string | null
    endedAt?: DateTimeNullableFilter<"WorkflowStep"> | Date | string | null
    createdAt?: DateTimeFilter<"WorkflowStep"> | Date | string
    updatedAt?: DateTimeFilter<"WorkflowStep"> | Date | string
    run?: XOR<WorkflowRunScalarRelationFilter, WorkflowRunWhereInput>
    events?: WorkflowEventListRelationFilter
    checkpoints?: WorkflowCheckpointListRelationFilter
  }

  export type WorkflowStepOrderByWithRelationInput = {
    id?: SortOrder
    runId?: SortOrder
    stepId?: SortOrder
    stepType?: SortOrder
    status?: SortOrder
    toolName?: SortOrderInput | SortOrder
    input?: SortOrderInput | SortOrder
    output?: SortOrderInput | SortOrder
    errorClass?: SortOrderInput | SortOrder
    errorMessage?: SortOrderInput | SortOrder
    retryCount?: SortOrder
    startedAt?: SortOrderInput | SortOrder
    endedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    run?: WorkflowRunOrderByWithRelationInput
    events?: WorkflowEventOrderByRelationAggregateInput
    checkpoints?: WorkflowCheckpointOrderByRelationAggregateInput
  }

  export type WorkflowStepWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    runId_stepId?: WorkflowStepRunIdStepIdCompoundUniqueInput
    AND?: WorkflowStepWhereInput | WorkflowStepWhereInput[]
    OR?: WorkflowStepWhereInput[]
    NOT?: WorkflowStepWhereInput | WorkflowStepWhereInput[]
    runId?: StringFilter<"WorkflowStep"> | string
    stepId?: StringFilter<"WorkflowStep"> | string
    stepType?: EnumWorkflowStepTypeFilter<"WorkflowStep"> | $Enums.WorkflowStepType
    status?: EnumWorkflowStepStatusFilter<"WorkflowStep"> | $Enums.WorkflowStepStatus
    toolName?: StringNullableFilter<"WorkflowStep"> | string | null
    input?: JsonNullableFilter<"WorkflowStep">
    output?: JsonNullableFilter<"WorkflowStep">
    errorClass?: StringNullableFilter<"WorkflowStep"> | string | null
    errorMessage?: StringNullableFilter<"WorkflowStep"> | string | null
    retryCount?: IntFilter<"WorkflowStep"> | number
    startedAt?: DateTimeNullableFilter<"WorkflowStep"> | Date | string | null
    endedAt?: DateTimeNullableFilter<"WorkflowStep"> | Date | string | null
    createdAt?: DateTimeFilter<"WorkflowStep"> | Date | string
    updatedAt?: DateTimeFilter<"WorkflowStep"> | Date | string
    run?: XOR<WorkflowRunScalarRelationFilter, WorkflowRunWhereInput>
    events?: WorkflowEventListRelationFilter
    checkpoints?: WorkflowCheckpointListRelationFilter
  }, "id" | "runId_stepId">

  export type WorkflowStepOrderByWithAggregationInput = {
    id?: SortOrder
    runId?: SortOrder
    stepId?: SortOrder
    stepType?: SortOrder
    status?: SortOrder
    toolName?: SortOrderInput | SortOrder
    input?: SortOrderInput | SortOrder
    output?: SortOrderInput | SortOrder
    errorClass?: SortOrderInput | SortOrder
    errorMessage?: SortOrderInput | SortOrder
    retryCount?: SortOrder
    startedAt?: SortOrderInput | SortOrder
    endedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: WorkflowStepCountOrderByAggregateInput
    _avg?: WorkflowStepAvgOrderByAggregateInput
    _max?: WorkflowStepMaxOrderByAggregateInput
    _min?: WorkflowStepMinOrderByAggregateInput
    _sum?: WorkflowStepSumOrderByAggregateInput
  }

  export type WorkflowStepScalarWhereWithAggregatesInput = {
    AND?: WorkflowStepScalarWhereWithAggregatesInput | WorkflowStepScalarWhereWithAggregatesInput[]
    OR?: WorkflowStepScalarWhereWithAggregatesInput[]
    NOT?: WorkflowStepScalarWhereWithAggregatesInput | WorkflowStepScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"WorkflowStep"> | string
    runId?: StringWithAggregatesFilter<"WorkflowStep"> | string
    stepId?: StringWithAggregatesFilter<"WorkflowStep"> | string
    stepType?: EnumWorkflowStepTypeWithAggregatesFilter<"WorkflowStep"> | $Enums.WorkflowStepType
    status?: EnumWorkflowStepStatusWithAggregatesFilter<"WorkflowStep"> | $Enums.WorkflowStepStatus
    toolName?: StringNullableWithAggregatesFilter<"WorkflowStep"> | string | null
    input?: JsonNullableWithAggregatesFilter<"WorkflowStep">
    output?: JsonNullableWithAggregatesFilter<"WorkflowStep">
    errorClass?: StringNullableWithAggregatesFilter<"WorkflowStep"> | string | null
    errorMessage?: StringNullableWithAggregatesFilter<"WorkflowStep"> | string | null
    retryCount?: IntWithAggregatesFilter<"WorkflowStep"> | number
    startedAt?: DateTimeNullableWithAggregatesFilter<"WorkflowStep"> | Date | string | null
    endedAt?: DateTimeNullableWithAggregatesFilter<"WorkflowStep"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"WorkflowStep"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"WorkflowStep"> | Date | string
  }

  export type WorkflowEventWhereInput = {
    AND?: WorkflowEventWhereInput | WorkflowEventWhereInput[]
    OR?: WorkflowEventWhereInput[]
    NOT?: WorkflowEventWhereInput | WorkflowEventWhereInput[]
    id?: StringFilter<"WorkflowEvent"> | string
    runId?: StringFilter<"WorkflowEvent"> | string
    workflowStepId?: StringNullableFilter<"WorkflowEvent"> | string | null
    eventType?: StringFilter<"WorkflowEvent"> | string
    payload?: JsonNullableFilter<"WorkflowEvent">
    createdAt?: DateTimeFilter<"WorkflowEvent"> | Date | string
    run?: XOR<WorkflowRunScalarRelationFilter, WorkflowRunWhereInput>
    step?: XOR<WorkflowStepNullableScalarRelationFilter, WorkflowStepWhereInput> | null
  }

  export type WorkflowEventOrderByWithRelationInput = {
    id?: SortOrder
    runId?: SortOrder
    workflowStepId?: SortOrderInput | SortOrder
    eventType?: SortOrder
    payload?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    run?: WorkflowRunOrderByWithRelationInput
    step?: WorkflowStepOrderByWithRelationInput
  }

  export type WorkflowEventWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: WorkflowEventWhereInput | WorkflowEventWhereInput[]
    OR?: WorkflowEventWhereInput[]
    NOT?: WorkflowEventWhereInput | WorkflowEventWhereInput[]
    runId?: StringFilter<"WorkflowEvent"> | string
    workflowStepId?: StringNullableFilter<"WorkflowEvent"> | string | null
    eventType?: StringFilter<"WorkflowEvent"> | string
    payload?: JsonNullableFilter<"WorkflowEvent">
    createdAt?: DateTimeFilter<"WorkflowEvent"> | Date | string
    run?: XOR<WorkflowRunScalarRelationFilter, WorkflowRunWhereInput>
    step?: XOR<WorkflowStepNullableScalarRelationFilter, WorkflowStepWhereInput> | null
  }, "id">

  export type WorkflowEventOrderByWithAggregationInput = {
    id?: SortOrder
    runId?: SortOrder
    workflowStepId?: SortOrderInput | SortOrder
    eventType?: SortOrder
    payload?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: WorkflowEventCountOrderByAggregateInput
    _max?: WorkflowEventMaxOrderByAggregateInput
    _min?: WorkflowEventMinOrderByAggregateInput
  }

  export type WorkflowEventScalarWhereWithAggregatesInput = {
    AND?: WorkflowEventScalarWhereWithAggregatesInput | WorkflowEventScalarWhereWithAggregatesInput[]
    OR?: WorkflowEventScalarWhereWithAggregatesInput[]
    NOT?: WorkflowEventScalarWhereWithAggregatesInput | WorkflowEventScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"WorkflowEvent"> | string
    runId?: StringWithAggregatesFilter<"WorkflowEvent"> | string
    workflowStepId?: StringNullableWithAggregatesFilter<"WorkflowEvent"> | string | null
    eventType?: StringWithAggregatesFilter<"WorkflowEvent"> | string
    payload?: JsonNullableWithAggregatesFilter<"WorkflowEvent">
    createdAt?: DateTimeWithAggregatesFilter<"WorkflowEvent"> | Date | string
  }

  export type WorkflowCheckpointWhereInput = {
    AND?: WorkflowCheckpointWhereInput | WorkflowCheckpointWhereInput[]
    OR?: WorkflowCheckpointWhereInput[]
    NOT?: WorkflowCheckpointWhereInput | WorkflowCheckpointWhereInput[]
    id?: StringFilter<"WorkflowCheckpoint"> | string
    runId?: StringFilter<"WorkflowCheckpoint"> | string
    workflowStepId?: StringNullableFilter<"WorkflowCheckpoint"> | string | null
    sequence?: IntFilter<"WorkflowCheckpoint"> | number
    snapshot?: JsonFilter<"WorkflowCheckpoint">
    createdAt?: DateTimeFilter<"WorkflowCheckpoint"> | Date | string
    run?: XOR<WorkflowRunScalarRelationFilter, WorkflowRunWhereInput>
    step?: XOR<WorkflowStepNullableScalarRelationFilter, WorkflowStepWhereInput> | null
  }

  export type WorkflowCheckpointOrderByWithRelationInput = {
    id?: SortOrder
    runId?: SortOrder
    workflowStepId?: SortOrderInput | SortOrder
    sequence?: SortOrder
    snapshot?: SortOrder
    createdAt?: SortOrder
    run?: WorkflowRunOrderByWithRelationInput
    step?: WorkflowStepOrderByWithRelationInput
  }

  export type WorkflowCheckpointWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    runId_sequence?: WorkflowCheckpointRunIdSequenceCompoundUniqueInput
    AND?: WorkflowCheckpointWhereInput | WorkflowCheckpointWhereInput[]
    OR?: WorkflowCheckpointWhereInput[]
    NOT?: WorkflowCheckpointWhereInput | WorkflowCheckpointWhereInput[]
    runId?: StringFilter<"WorkflowCheckpoint"> | string
    workflowStepId?: StringNullableFilter<"WorkflowCheckpoint"> | string | null
    sequence?: IntFilter<"WorkflowCheckpoint"> | number
    snapshot?: JsonFilter<"WorkflowCheckpoint">
    createdAt?: DateTimeFilter<"WorkflowCheckpoint"> | Date | string
    run?: XOR<WorkflowRunScalarRelationFilter, WorkflowRunWhereInput>
    step?: XOR<WorkflowStepNullableScalarRelationFilter, WorkflowStepWhereInput> | null
  }, "id" | "runId_sequence">

  export type WorkflowCheckpointOrderByWithAggregationInput = {
    id?: SortOrder
    runId?: SortOrder
    workflowStepId?: SortOrderInput | SortOrder
    sequence?: SortOrder
    snapshot?: SortOrder
    createdAt?: SortOrder
    _count?: WorkflowCheckpointCountOrderByAggregateInput
    _avg?: WorkflowCheckpointAvgOrderByAggregateInput
    _max?: WorkflowCheckpointMaxOrderByAggregateInput
    _min?: WorkflowCheckpointMinOrderByAggregateInput
    _sum?: WorkflowCheckpointSumOrderByAggregateInput
  }

  export type WorkflowCheckpointScalarWhereWithAggregatesInput = {
    AND?: WorkflowCheckpointScalarWhereWithAggregatesInput | WorkflowCheckpointScalarWhereWithAggregatesInput[]
    OR?: WorkflowCheckpointScalarWhereWithAggregatesInput[]
    NOT?: WorkflowCheckpointScalarWhereWithAggregatesInput | WorkflowCheckpointScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"WorkflowCheckpoint"> | string
    runId?: StringWithAggregatesFilter<"WorkflowCheckpoint"> | string
    workflowStepId?: StringNullableWithAggregatesFilter<"WorkflowCheckpoint"> | string | null
    sequence?: IntWithAggregatesFilter<"WorkflowCheckpoint"> | number
    snapshot?: JsonWithAggregatesFilter<"WorkflowCheckpoint">
    createdAt?: DateTimeWithAggregatesFilter<"WorkflowCheckpoint"> | Date | string
  }

  export type RunMessageWhereInput = {
    AND?: RunMessageWhereInput | RunMessageWhereInput[]
    OR?: RunMessageWhereInput[]
    NOT?: RunMessageWhereInput | RunMessageWhereInput[]
    id?: StringFilter<"RunMessage"> | string
    runId?: StringFilter<"RunMessage"> | string
    role?: StringFilter<"RunMessage"> | string
    content?: StringFilter<"RunMessage"> | string
    toolName?: StringNullableFilter<"RunMessage"> | string | null
    toolCallId?: StringNullableFilter<"RunMessage"> | string | null
    metadata?: JsonNullableFilter<"RunMessage">
    createdAt?: DateTimeFilter<"RunMessage"> | Date | string
    run?: XOR<WorkflowRunScalarRelationFilter, WorkflowRunWhereInput>
  }

  export type RunMessageOrderByWithRelationInput = {
    id?: SortOrder
    runId?: SortOrder
    role?: SortOrder
    content?: SortOrder
    toolName?: SortOrderInput | SortOrder
    toolCallId?: SortOrderInput | SortOrder
    metadata?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    run?: WorkflowRunOrderByWithRelationInput
  }

  export type RunMessageWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: RunMessageWhereInput | RunMessageWhereInput[]
    OR?: RunMessageWhereInput[]
    NOT?: RunMessageWhereInput | RunMessageWhereInput[]
    runId?: StringFilter<"RunMessage"> | string
    role?: StringFilter<"RunMessage"> | string
    content?: StringFilter<"RunMessage"> | string
    toolName?: StringNullableFilter<"RunMessage"> | string | null
    toolCallId?: StringNullableFilter<"RunMessage"> | string | null
    metadata?: JsonNullableFilter<"RunMessage">
    createdAt?: DateTimeFilter<"RunMessage"> | Date | string
    run?: XOR<WorkflowRunScalarRelationFilter, WorkflowRunWhereInput>
  }, "id">

  export type RunMessageOrderByWithAggregationInput = {
    id?: SortOrder
    runId?: SortOrder
    role?: SortOrder
    content?: SortOrder
    toolName?: SortOrderInput | SortOrder
    toolCallId?: SortOrderInput | SortOrder
    metadata?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: RunMessageCountOrderByAggregateInput
    _max?: RunMessageMaxOrderByAggregateInput
    _min?: RunMessageMinOrderByAggregateInput
  }

  export type RunMessageScalarWhereWithAggregatesInput = {
    AND?: RunMessageScalarWhereWithAggregatesInput | RunMessageScalarWhereWithAggregatesInput[]
    OR?: RunMessageScalarWhereWithAggregatesInput[]
    NOT?: RunMessageScalarWhereWithAggregatesInput | RunMessageScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"RunMessage"> | string
    runId?: StringWithAggregatesFilter<"RunMessage"> | string
    role?: StringWithAggregatesFilter<"RunMessage"> | string
    content?: StringWithAggregatesFilter<"RunMessage"> | string
    toolName?: StringNullableWithAggregatesFilter<"RunMessage"> | string | null
    toolCallId?: StringNullableWithAggregatesFilter<"RunMessage"> | string | null
    metadata?: JsonNullableWithAggregatesFilter<"RunMessage">
    createdAt?: DateTimeWithAggregatesFilter<"RunMessage"> | Date | string
  }

  export type ArtifactCreateInput = {
    id?: string
    type: string
    name?: string | null
    mimeType?: string | null
    storagePath?: string | null
    textContent?: string | null
    jsonContent?: NullableJsonNullValueInput | InputJsonValue
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutArtifactsInput
  }

  export type ArtifactUncheckedCreateInput = {
    id?: string
    userId: string
    type: string
    name?: string | null
    mimeType?: string | null
    storagePath?: string | null
    textContent?: string | null
    jsonContent?: NullableJsonNullValueInput | InputJsonValue
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ArtifactUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    mimeType?: NullableStringFieldUpdateOperationsInput | string | null
    storagePath?: NullableStringFieldUpdateOperationsInput | string | null
    textContent?: NullableStringFieldUpdateOperationsInput | string | null
    jsonContent?: NullableJsonNullValueInput | InputJsonValue
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutArtifactsNestedInput
  }

  export type ArtifactUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    mimeType?: NullableStringFieldUpdateOperationsInput | string | null
    storagePath?: NullableStringFieldUpdateOperationsInput | string | null
    textContent?: NullableStringFieldUpdateOperationsInput | string | null
    jsonContent?: NullableJsonNullValueInput | InputJsonValue
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ArtifactCreateManyInput = {
    id?: string
    userId: string
    type: string
    name?: string | null
    mimeType?: string | null
    storagePath?: string | null
    textContent?: string | null
    jsonContent?: NullableJsonNullValueInput | InputJsonValue
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ArtifactUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    mimeType?: NullableStringFieldUpdateOperationsInput | string | null
    storagePath?: NullableStringFieldUpdateOperationsInput | string | null
    textContent?: NullableStringFieldUpdateOperationsInput | string | null
    jsonContent?: NullableJsonNullValueInput | InputJsonValue
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ArtifactUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    mimeType?: NullableStringFieldUpdateOperationsInput | string | null
    storagePath?: NullableStringFieldUpdateOperationsInput | string | null
    textContent?: NullableStringFieldUpdateOperationsInput | string | null
    jsonContent?: NullableJsonNullValueInput | InputJsonValue
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateInput = {
    id?: string
    email: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    password: string
    conversations?: ConversationCreateNestedManyWithoutUserInput
    oauthTokens?: OAuthTokenCreateNestedManyWithoutUserInput
    artifacts?: ArtifactCreateNestedManyWithoutUserInput
    workflowRuns?: WorkflowRunCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    password: string
    conversations?: ConversationUncheckedCreateNestedManyWithoutUserInput
    oauthTokens?: OAuthTokenUncheckedCreateNestedManyWithoutUserInput
    artifacts?: ArtifactUncheckedCreateNestedManyWithoutUserInput
    workflowRuns?: WorkflowRunUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    password?: StringFieldUpdateOperationsInput | string
    conversations?: ConversationUpdateManyWithoutUserNestedInput
    oauthTokens?: OAuthTokenUpdateManyWithoutUserNestedInput
    artifacts?: ArtifactUpdateManyWithoutUserNestedInput
    workflowRuns?: WorkflowRunUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    password?: StringFieldUpdateOperationsInput | string
    conversations?: ConversationUncheckedUpdateManyWithoutUserNestedInput
    oauthTokens?: OAuthTokenUncheckedUpdateManyWithoutUserNestedInput
    artifacts?: ArtifactUncheckedUpdateManyWithoutUserNestedInput
    workflowRuns?: WorkflowRunUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    password: string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    password?: StringFieldUpdateOperationsInput | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    password?: StringFieldUpdateOperationsInput | string
  }

  export type ConversationCreateInput = {
    id?: string
    title?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutConversationsInput
    messages?: MessageCreateNestedManyWithoutConversationInput
    workflowRuns?: WorkflowRunCreateNestedManyWithoutConversationInput
  }

  export type ConversationUncheckedCreateInput = {
    id?: string
    userId: string
    title?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    messages?: MessageUncheckedCreateNestedManyWithoutConversationInput
    workflowRuns?: WorkflowRunUncheckedCreateNestedManyWithoutConversationInput
  }

  export type ConversationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutConversationsNestedInput
    messages?: MessageUpdateManyWithoutConversationNestedInput
    workflowRuns?: WorkflowRunUpdateManyWithoutConversationNestedInput
  }

  export type ConversationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    messages?: MessageUncheckedUpdateManyWithoutConversationNestedInput
    workflowRuns?: WorkflowRunUncheckedUpdateManyWithoutConversationNestedInput
  }

  export type ConversationCreateManyInput = {
    id?: string
    userId: string
    title?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ConversationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ConversationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageCreateInput = {
    id?: string
    role: string
    content: string
    toolCallId?: string | null
    toolName?: string | null
    createdAt?: Date | string
    conversation: ConversationCreateNestedOneWithoutMessagesInput
  }

  export type MessageUncheckedCreateInput = {
    id?: string
    conversationId: string
    role: string
    content: string
    toolCallId?: string | null
    toolName?: string | null
    createdAt?: Date | string
  }

  export type MessageUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    toolCallId?: NullableStringFieldUpdateOperationsInput | string | null
    toolName?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    conversation?: ConversationUpdateOneRequiredWithoutMessagesNestedInput
  }

  export type MessageUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    conversationId?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    toolCallId?: NullableStringFieldUpdateOperationsInput | string | null
    toolName?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageCreateManyInput = {
    id?: string
    conversationId: string
    role: string
    content: string
    toolCallId?: string | null
    toolName?: string | null
    createdAt?: Date | string
  }

  export type MessageUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    toolCallId?: NullableStringFieldUpdateOperationsInput | string | null
    toolName?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    conversationId?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    toolCallId?: NullableStringFieldUpdateOperationsInput | string | null
    toolName?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OAuthTokenCreateInput = {
    id?: string
    provider: string
    accessToken: string
    refreshToken?: string | null
    expiresAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutOauthTokensInput
  }

  export type OAuthTokenUncheckedCreateInput = {
    id?: string
    userId: string
    provider: string
    accessToken: string
    refreshToken?: string | null
    expiresAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OAuthTokenUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    accessToken?: StringFieldUpdateOperationsInput | string
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutOauthTokensNestedInput
  }

  export type OAuthTokenUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    accessToken?: StringFieldUpdateOperationsInput | string
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OAuthTokenCreateManyInput = {
    id?: string
    userId: string
    provider: string
    accessToken: string
    refreshToken?: string | null
    expiresAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OAuthTokenUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    accessToken?: StringFieldUpdateOperationsInput | string
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OAuthTokenUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    accessToken?: StringFieldUpdateOperationsInput | string
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WorkflowRunCreateInput = {
    id?: string
    prompt: string
    status?: $Enums.WorkflowRunStatus
    model?: string | null
    maxSteps?: number | null
    startedAt?: Date | string | null
    endedAt?: Date | string | null
    finalAnswer?: string | null
    errorClass?: string | null
    errorMessage?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutWorkflowRunsInput
    conversation?: ConversationCreateNestedOneWithoutWorkflowRunsInput
    steps?: WorkflowStepCreateNestedManyWithoutRunInput
    events?: WorkflowEventCreateNestedManyWithoutRunInput
    checkpoints?: WorkflowCheckpointCreateNestedManyWithoutRunInput
    messages?: RunMessageCreateNestedManyWithoutRunInput
  }

  export type WorkflowRunUncheckedCreateInput = {
    id?: string
    userId: string
    conversationId?: string | null
    prompt: string
    status?: $Enums.WorkflowRunStatus
    model?: string | null
    maxSteps?: number | null
    startedAt?: Date | string | null
    endedAt?: Date | string | null
    finalAnswer?: string | null
    errorClass?: string | null
    errorMessage?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    steps?: WorkflowStepUncheckedCreateNestedManyWithoutRunInput
    events?: WorkflowEventUncheckedCreateNestedManyWithoutRunInput
    checkpoints?: WorkflowCheckpointUncheckedCreateNestedManyWithoutRunInput
    messages?: RunMessageUncheckedCreateNestedManyWithoutRunInput
  }

  export type WorkflowRunUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    prompt?: StringFieldUpdateOperationsInput | string
    status?: EnumWorkflowRunStatusFieldUpdateOperationsInput | $Enums.WorkflowRunStatus
    model?: NullableStringFieldUpdateOperationsInput | string | null
    maxSteps?: NullableIntFieldUpdateOperationsInput | number | null
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    finalAnswer?: NullableStringFieldUpdateOperationsInput | string | null
    errorClass?: NullableStringFieldUpdateOperationsInput | string | null
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutWorkflowRunsNestedInput
    conversation?: ConversationUpdateOneWithoutWorkflowRunsNestedInput
    steps?: WorkflowStepUpdateManyWithoutRunNestedInput
    events?: WorkflowEventUpdateManyWithoutRunNestedInput
    checkpoints?: WorkflowCheckpointUpdateManyWithoutRunNestedInput
    messages?: RunMessageUpdateManyWithoutRunNestedInput
  }

  export type WorkflowRunUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    conversationId?: NullableStringFieldUpdateOperationsInput | string | null
    prompt?: StringFieldUpdateOperationsInput | string
    status?: EnumWorkflowRunStatusFieldUpdateOperationsInput | $Enums.WorkflowRunStatus
    model?: NullableStringFieldUpdateOperationsInput | string | null
    maxSteps?: NullableIntFieldUpdateOperationsInput | number | null
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    finalAnswer?: NullableStringFieldUpdateOperationsInput | string | null
    errorClass?: NullableStringFieldUpdateOperationsInput | string | null
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    steps?: WorkflowStepUncheckedUpdateManyWithoutRunNestedInput
    events?: WorkflowEventUncheckedUpdateManyWithoutRunNestedInput
    checkpoints?: WorkflowCheckpointUncheckedUpdateManyWithoutRunNestedInput
    messages?: RunMessageUncheckedUpdateManyWithoutRunNestedInput
  }

  export type WorkflowRunCreateManyInput = {
    id?: string
    userId: string
    conversationId?: string | null
    prompt: string
    status?: $Enums.WorkflowRunStatus
    model?: string | null
    maxSteps?: number | null
    startedAt?: Date | string | null
    endedAt?: Date | string | null
    finalAnswer?: string | null
    errorClass?: string | null
    errorMessage?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WorkflowRunUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    prompt?: StringFieldUpdateOperationsInput | string
    status?: EnumWorkflowRunStatusFieldUpdateOperationsInput | $Enums.WorkflowRunStatus
    model?: NullableStringFieldUpdateOperationsInput | string | null
    maxSteps?: NullableIntFieldUpdateOperationsInput | number | null
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    finalAnswer?: NullableStringFieldUpdateOperationsInput | string | null
    errorClass?: NullableStringFieldUpdateOperationsInput | string | null
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WorkflowRunUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    conversationId?: NullableStringFieldUpdateOperationsInput | string | null
    prompt?: StringFieldUpdateOperationsInput | string
    status?: EnumWorkflowRunStatusFieldUpdateOperationsInput | $Enums.WorkflowRunStatus
    model?: NullableStringFieldUpdateOperationsInput | string | null
    maxSteps?: NullableIntFieldUpdateOperationsInput | number | null
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    finalAnswer?: NullableStringFieldUpdateOperationsInput | string | null
    errorClass?: NullableStringFieldUpdateOperationsInput | string | null
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WorkflowStepCreateInput = {
    id?: string
    stepId: string
    stepType: $Enums.WorkflowStepType
    status?: $Enums.WorkflowStepStatus
    toolName?: string | null
    input?: NullableJsonNullValueInput | InputJsonValue
    output?: NullableJsonNullValueInput | InputJsonValue
    errorClass?: string | null
    errorMessage?: string | null
    retryCount?: number
    startedAt?: Date | string | null
    endedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    run: WorkflowRunCreateNestedOneWithoutStepsInput
    events?: WorkflowEventCreateNestedManyWithoutStepInput
    checkpoints?: WorkflowCheckpointCreateNestedManyWithoutStepInput
  }

  export type WorkflowStepUncheckedCreateInput = {
    id?: string
    runId: string
    stepId: string
    stepType: $Enums.WorkflowStepType
    status?: $Enums.WorkflowStepStatus
    toolName?: string | null
    input?: NullableJsonNullValueInput | InputJsonValue
    output?: NullableJsonNullValueInput | InputJsonValue
    errorClass?: string | null
    errorMessage?: string | null
    retryCount?: number
    startedAt?: Date | string | null
    endedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    events?: WorkflowEventUncheckedCreateNestedManyWithoutStepInput
    checkpoints?: WorkflowCheckpointUncheckedCreateNestedManyWithoutStepInput
  }

  export type WorkflowStepUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    stepId?: StringFieldUpdateOperationsInput | string
    stepType?: EnumWorkflowStepTypeFieldUpdateOperationsInput | $Enums.WorkflowStepType
    status?: EnumWorkflowStepStatusFieldUpdateOperationsInput | $Enums.WorkflowStepStatus
    toolName?: NullableStringFieldUpdateOperationsInput | string | null
    input?: NullableJsonNullValueInput | InputJsonValue
    output?: NullableJsonNullValueInput | InputJsonValue
    errorClass?: NullableStringFieldUpdateOperationsInput | string | null
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    retryCount?: IntFieldUpdateOperationsInput | number
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    run?: WorkflowRunUpdateOneRequiredWithoutStepsNestedInput
    events?: WorkflowEventUpdateManyWithoutStepNestedInput
    checkpoints?: WorkflowCheckpointUpdateManyWithoutStepNestedInput
  }

  export type WorkflowStepUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    runId?: StringFieldUpdateOperationsInput | string
    stepId?: StringFieldUpdateOperationsInput | string
    stepType?: EnumWorkflowStepTypeFieldUpdateOperationsInput | $Enums.WorkflowStepType
    status?: EnumWorkflowStepStatusFieldUpdateOperationsInput | $Enums.WorkflowStepStatus
    toolName?: NullableStringFieldUpdateOperationsInput | string | null
    input?: NullableJsonNullValueInput | InputJsonValue
    output?: NullableJsonNullValueInput | InputJsonValue
    errorClass?: NullableStringFieldUpdateOperationsInput | string | null
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    retryCount?: IntFieldUpdateOperationsInput | number
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    events?: WorkflowEventUncheckedUpdateManyWithoutStepNestedInput
    checkpoints?: WorkflowCheckpointUncheckedUpdateManyWithoutStepNestedInput
  }

  export type WorkflowStepCreateManyInput = {
    id?: string
    runId: string
    stepId: string
    stepType: $Enums.WorkflowStepType
    status?: $Enums.WorkflowStepStatus
    toolName?: string | null
    input?: NullableJsonNullValueInput | InputJsonValue
    output?: NullableJsonNullValueInput | InputJsonValue
    errorClass?: string | null
    errorMessage?: string | null
    retryCount?: number
    startedAt?: Date | string | null
    endedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WorkflowStepUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    stepId?: StringFieldUpdateOperationsInput | string
    stepType?: EnumWorkflowStepTypeFieldUpdateOperationsInput | $Enums.WorkflowStepType
    status?: EnumWorkflowStepStatusFieldUpdateOperationsInput | $Enums.WorkflowStepStatus
    toolName?: NullableStringFieldUpdateOperationsInput | string | null
    input?: NullableJsonNullValueInput | InputJsonValue
    output?: NullableJsonNullValueInput | InputJsonValue
    errorClass?: NullableStringFieldUpdateOperationsInput | string | null
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    retryCount?: IntFieldUpdateOperationsInput | number
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WorkflowStepUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    runId?: StringFieldUpdateOperationsInput | string
    stepId?: StringFieldUpdateOperationsInput | string
    stepType?: EnumWorkflowStepTypeFieldUpdateOperationsInput | $Enums.WorkflowStepType
    status?: EnumWorkflowStepStatusFieldUpdateOperationsInput | $Enums.WorkflowStepStatus
    toolName?: NullableStringFieldUpdateOperationsInput | string | null
    input?: NullableJsonNullValueInput | InputJsonValue
    output?: NullableJsonNullValueInput | InputJsonValue
    errorClass?: NullableStringFieldUpdateOperationsInput | string | null
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    retryCount?: IntFieldUpdateOperationsInput | number
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WorkflowEventCreateInput = {
    id?: string
    eventType: string
    payload?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    run: WorkflowRunCreateNestedOneWithoutEventsInput
    step?: WorkflowStepCreateNestedOneWithoutEventsInput
  }

  export type WorkflowEventUncheckedCreateInput = {
    id?: string
    runId: string
    workflowStepId?: string | null
    eventType: string
    payload?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type WorkflowEventUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    eventType?: StringFieldUpdateOperationsInput | string
    payload?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    run?: WorkflowRunUpdateOneRequiredWithoutEventsNestedInput
    step?: WorkflowStepUpdateOneWithoutEventsNestedInput
  }

  export type WorkflowEventUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    runId?: StringFieldUpdateOperationsInput | string
    workflowStepId?: NullableStringFieldUpdateOperationsInput | string | null
    eventType?: StringFieldUpdateOperationsInput | string
    payload?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WorkflowEventCreateManyInput = {
    id?: string
    runId: string
    workflowStepId?: string | null
    eventType: string
    payload?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type WorkflowEventUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    eventType?: StringFieldUpdateOperationsInput | string
    payload?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WorkflowEventUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    runId?: StringFieldUpdateOperationsInput | string
    workflowStepId?: NullableStringFieldUpdateOperationsInput | string | null
    eventType?: StringFieldUpdateOperationsInput | string
    payload?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WorkflowCheckpointCreateInput = {
    id?: string
    sequence: number
    snapshot: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    run: WorkflowRunCreateNestedOneWithoutCheckpointsInput
    step?: WorkflowStepCreateNestedOneWithoutCheckpointsInput
  }

  export type WorkflowCheckpointUncheckedCreateInput = {
    id?: string
    runId: string
    workflowStepId?: string | null
    sequence: number
    snapshot: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type WorkflowCheckpointUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    sequence?: IntFieldUpdateOperationsInput | number
    snapshot?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    run?: WorkflowRunUpdateOneRequiredWithoutCheckpointsNestedInput
    step?: WorkflowStepUpdateOneWithoutCheckpointsNestedInput
  }

  export type WorkflowCheckpointUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    runId?: StringFieldUpdateOperationsInput | string
    workflowStepId?: NullableStringFieldUpdateOperationsInput | string | null
    sequence?: IntFieldUpdateOperationsInput | number
    snapshot?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WorkflowCheckpointCreateManyInput = {
    id?: string
    runId: string
    workflowStepId?: string | null
    sequence: number
    snapshot: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type WorkflowCheckpointUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    sequence?: IntFieldUpdateOperationsInput | number
    snapshot?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WorkflowCheckpointUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    runId?: StringFieldUpdateOperationsInput | string
    workflowStepId?: NullableStringFieldUpdateOperationsInput | string | null
    sequence?: IntFieldUpdateOperationsInput | number
    snapshot?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RunMessageCreateInput = {
    id?: string
    role: string
    content: string
    toolName?: string | null
    toolCallId?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    run: WorkflowRunCreateNestedOneWithoutMessagesInput
  }

  export type RunMessageUncheckedCreateInput = {
    id?: string
    runId: string
    role: string
    content: string
    toolName?: string | null
    toolCallId?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type RunMessageUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    toolName?: NullableStringFieldUpdateOperationsInput | string | null
    toolCallId?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    run?: WorkflowRunUpdateOneRequiredWithoutMessagesNestedInput
  }

  export type RunMessageUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    runId?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    toolName?: NullableStringFieldUpdateOperationsInput | string | null
    toolCallId?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RunMessageCreateManyInput = {
    id?: string
    runId: string
    role: string
    content: string
    toolName?: string | null
    toolCallId?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type RunMessageUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    toolName?: NullableStringFieldUpdateOperationsInput | string | null
    toolCallId?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RunMessageUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    runId?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    toolName?: NullableStringFieldUpdateOperationsInput | string | null
    toolCallId?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type ArtifactCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    name?: SortOrder
    mimeType?: SortOrder
    storagePath?: SortOrder
    textContent?: SortOrder
    jsonContent?: SortOrder
    metadata?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ArtifactMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    name?: SortOrder
    mimeType?: SortOrder
    storagePath?: SortOrder
    textContent?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ArtifactMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    name?: SortOrder
    mimeType?: SortOrder
    storagePath?: SortOrder
    textContent?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type ConversationListRelationFilter = {
    every?: ConversationWhereInput
    some?: ConversationWhereInput
    none?: ConversationWhereInput
  }

  export type OAuthTokenListRelationFilter = {
    every?: OAuthTokenWhereInput
    some?: OAuthTokenWhereInput
    none?: OAuthTokenWhereInput
  }

  export type ArtifactListRelationFilter = {
    every?: ArtifactWhereInput
    some?: ArtifactWhereInput
    none?: ArtifactWhereInput
  }

  export type WorkflowRunListRelationFilter = {
    every?: WorkflowRunWhereInput
    some?: WorkflowRunWhereInput
    none?: WorkflowRunWhereInput
  }

  export type ConversationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type OAuthTokenOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ArtifactOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type WorkflowRunOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    password?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    password?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    password?: SortOrder
  }

  export type MessageListRelationFilter = {
    every?: MessageWhereInput
    some?: MessageWhereInput
    none?: MessageWhereInput
  }

  export type MessageOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ConversationCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ConversationMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ConversationMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ConversationScalarRelationFilter = {
    is?: ConversationWhereInput
    isNot?: ConversationWhereInput
  }

  export type MessageCountOrderByAggregateInput = {
    id?: SortOrder
    conversationId?: SortOrder
    role?: SortOrder
    content?: SortOrder
    toolCallId?: SortOrder
    toolName?: SortOrder
    createdAt?: SortOrder
  }

  export type MessageMaxOrderByAggregateInput = {
    id?: SortOrder
    conversationId?: SortOrder
    role?: SortOrder
    content?: SortOrder
    toolCallId?: SortOrder
    toolName?: SortOrder
    createdAt?: SortOrder
  }

  export type MessageMinOrderByAggregateInput = {
    id?: SortOrder
    conversationId?: SortOrder
    role?: SortOrder
    content?: SortOrder
    toolCallId?: SortOrder
    toolName?: SortOrder
    createdAt?: SortOrder
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type OAuthTokenUserIdProviderCompoundUniqueInput = {
    userId: string
    provider: string
  }

  export type OAuthTokenCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    provider?: SortOrder
    accessToken?: SortOrder
    refreshToken?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type OAuthTokenMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    provider?: SortOrder
    accessToken?: SortOrder
    refreshToken?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type OAuthTokenMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    provider?: SortOrder
    accessToken?: SortOrder
    refreshToken?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type EnumWorkflowRunStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.WorkflowRunStatus | EnumWorkflowRunStatusFieldRefInput<$PrismaModel>
    in?: $Enums.WorkflowRunStatus[] | ListEnumWorkflowRunStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.WorkflowRunStatus[] | ListEnumWorkflowRunStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumWorkflowRunStatusFilter<$PrismaModel> | $Enums.WorkflowRunStatus
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type ConversationNullableScalarRelationFilter = {
    is?: ConversationWhereInput | null
    isNot?: ConversationWhereInput | null
  }

  export type WorkflowStepListRelationFilter = {
    every?: WorkflowStepWhereInput
    some?: WorkflowStepWhereInput
    none?: WorkflowStepWhereInput
  }

  export type WorkflowEventListRelationFilter = {
    every?: WorkflowEventWhereInput
    some?: WorkflowEventWhereInput
    none?: WorkflowEventWhereInput
  }

  export type WorkflowCheckpointListRelationFilter = {
    every?: WorkflowCheckpointWhereInput
    some?: WorkflowCheckpointWhereInput
    none?: WorkflowCheckpointWhereInput
  }

  export type RunMessageListRelationFilter = {
    every?: RunMessageWhereInput
    some?: RunMessageWhereInput
    none?: RunMessageWhereInput
  }

  export type WorkflowStepOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type WorkflowEventOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type WorkflowCheckpointOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type RunMessageOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type WorkflowRunCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    conversationId?: SortOrder
    prompt?: SortOrder
    status?: SortOrder
    model?: SortOrder
    maxSteps?: SortOrder
    startedAt?: SortOrder
    endedAt?: SortOrder
    finalAnswer?: SortOrder
    errorClass?: SortOrder
    errorMessage?: SortOrder
    metadata?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type WorkflowRunAvgOrderByAggregateInput = {
    maxSteps?: SortOrder
  }

  export type WorkflowRunMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    conversationId?: SortOrder
    prompt?: SortOrder
    status?: SortOrder
    model?: SortOrder
    maxSteps?: SortOrder
    startedAt?: SortOrder
    endedAt?: SortOrder
    finalAnswer?: SortOrder
    errorClass?: SortOrder
    errorMessage?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type WorkflowRunMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    conversationId?: SortOrder
    prompt?: SortOrder
    status?: SortOrder
    model?: SortOrder
    maxSteps?: SortOrder
    startedAt?: SortOrder
    endedAt?: SortOrder
    finalAnswer?: SortOrder
    errorClass?: SortOrder
    errorMessage?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type WorkflowRunSumOrderByAggregateInput = {
    maxSteps?: SortOrder
  }

  export type EnumWorkflowRunStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.WorkflowRunStatus | EnumWorkflowRunStatusFieldRefInput<$PrismaModel>
    in?: $Enums.WorkflowRunStatus[] | ListEnumWorkflowRunStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.WorkflowRunStatus[] | ListEnumWorkflowRunStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumWorkflowRunStatusWithAggregatesFilter<$PrismaModel> | $Enums.WorkflowRunStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumWorkflowRunStatusFilter<$PrismaModel>
    _max?: NestedEnumWorkflowRunStatusFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type EnumWorkflowStepTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.WorkflowStepType | EnumWorkflowStepTypeFieldRefInput<$PrismaModel>
    in?: $Enums.WorkflowStepType[] | ListEnumWorkflowStepTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.WorkflowStepType[] | ListEnumWorkflowStepTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumWorkflowStepTypeFilter<$PrismaModel> | $Enums.WorkflowStepType
  }

  export type EnumWorkflowStepStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.WorkflowStepStatus | EnumWorkflowStepStatusFieldRefInput<$PrismaModel>
    in?: $Enums.WorkflowStepStatus[] | ListEnumWorkflowStepStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.WorkflowStepStatus[] | ListEnumWorkflowStepStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumWorkflowStepStatusFilter<$PrismaModel> | $Enums.WorkflowStepStatus
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type WorkflowRunScalarRelationFilter = {
    is?: WorkflowRunWhereInput
    isNot?: WorkflowRunWhereInput
  }

  export type WorkflowStepRunIdStepIdCompoundUniqueInput = {
    runId: string
    stepId: string
  }

  export type WorkflowStepCountOrderByAggregateInput = {
    id?: SortOrder
    runId?: SortOrder
    stepId?: SortOrder
    stepType?: SortOrder
    status?: SortOrder
    toolName?: SortOrder
    input?: SortOrder
    output?: SortOrder
    errorClass?: SortOrder
    errorMessage?: SortOrder
    retryCount?: SortOrder
    startedAt?: SortOrder
    endedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type WorkflowStepAvgOrderByAggregateInput = {
    retryCount?: SortOrder
  }

  export type WorkflowStepMaxOrderByAggregateInput = {
    id?: SortOrder
    runId?: SortOrder
    stepId?: SortOrder
    stepType?: SortOrder
    status?: SortOrder
    toolName?: SortOrder
    errorClass?: SortOrder
    errorMessage?: SortOrder
    retryCount?: SortOrder
    startedAt?: SortOrder
    endedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type WorkflowStepMinOrderByAggregateInput = {
    id?: SortOrder
    runId?: SortOrder
    stepId?: SortOrder
    stepType?: SortOrder
    status?: SortOrder
    toolName?: SortOrder
    errorClass?: SortOrder
    errorMessage?: SortOrder
    retryCount?: SortOrder
    startedAt?: SortOrder
    endedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type WorkflowStepSumOrderByAggregateInput = {
    retryCount?: SortOrder
  }

  export type EnumWorkflowStepTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.WorkflowStepType | EnumWorkflowStepTypeFieldRefInput<$PrismaModel>
    in?: $Enums.WorkflowStepType[] | ListEnumWorkflowStepTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.WorkflowStepType[] | ListEnumWorkflowStepTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumWorkflowStepTypeWithAggregatesFilter<$PrismaModel> | $Enums.WorkflowStepType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumWorkflowStepTypeFilter<$PrismaModel>
    _max?: NestedEnumWorkflowStepTypeFilter<$PrismaModel>
  }

  export type EnumWorkflowStepStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.WorkflowStepStatus | EnumWorkflowStepStatusFieldRefInput<$PrismaModel>
    in?: $Enums.WorkflowStepStatus[] | ListEnumWorkflowStepStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.WorkflowStepStatus[] | ListEnumWorkflowStepStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumWorkflowStepStatusWithAggregatesFilter<$PrismaModel> | $Enums.WorkflowStepStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumWorkflowStepStatusFilter<$PrismaModel>
    _max?: NestedEnumWorkflowStepStatusFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type WorkflowStepNullableScalarRelationFilter = {
    is?: WorkflowStepWhereInput | null
    isNot?: WorkflowStepWhereInput | null
  }

  export type WorkflowEventCountOrderByAggregateInput = {
    id?: SortOrder
    runId?: SortOrder
    workflowStepId?: SortOrder
    eventType?: SortOrder
    payload?: SortOrder
    createdAt?: SortOrder
  }

  export type WorkflowEventMaxOrderByAggregateInput = {
    id?: SortOrder
    runId?: SortOrder
    workflowStepId?: SortOrder
    eventType?: SortOrder
    createdAt?: SortOrder
  }

  export type WorkflowEventMinOrderByAggregateInput = {
    id?: SortOrder
    runId?: SortOrder
    workflowStepId?: SortOrder
    eventType?: SortOrder
    createdAt?: SortOrder
  }
  export type JsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type WorkflowCheckpointRunIdSequenceCompoundUniqueInput = {
    runId: string
    sequence: number
  }

  export type WorkflowCheckpointCountOrderByAggregateInput = {
    id?: SortOrder
    runId?: SortOrder
    workflowStepId?: SortOrder
    sequence?: SortOrder
    snapshot?: SortOrder
    createdAt?: SortOrder
  }

  export type WorkflowCheckpointAvgOrderByAggregateInput = {
    sequence?: SortOrder
  }

  export type WorkflowCheckpointMaxOrderByAggregateInput = {
    id?: SortOrder
    runId?: SortOrder
    workflowStepId?: SortOrder
    sequence?: SortOrder
    createdAt?: SortOrder
  }

  export type WorkflowCheckpointMinOrderByAggregateInput = {
    id?: SortOrder
    runId?: SortOrder
    workflowStepId?: SortOrder
    sequence?: SortOrder
    createdAt?: SortOrder
  }

  export type WorkflowCheckpointSumOrderByAggregateInput = {
    sequence?: SortOrder
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }

  export type RunMessageCountOrderByAggregateInput = {
    id?: SortOrder
    runId?: SortOrder
    role?: SortOrder
    content?: SortOrder
    toolName?: SortOrder
    toolCallId?: SortOrder
    metadata?: SortOrder
    createdAt?: SortOrder
  }

  export type RunMessageMaxOrderByAggregateInput = {
    id?: SortOrder
    runId?: SortOrder
    role?: SortOrder
    content?: SortOrder
    toolName?: SortOrder
    toolCallId?: SortOrder
    createdAt?: SortOrder
  }

  export type RunMessageMinOrderByAggregateInput = {
    id?: SortOrder
    runId?: SortOrder
    role?: SortOrder
    content?: SortOrder
    toolName?: SortOrder
    toolCallId?: SortOrder
    createdAt?: SortOrder
  }

  export type UserCreateNestedOneWithoutArtifactsInput = {
    create?: XOR<UserCreateWithoutArtifactsInput, UserUncheckedCreateWithoutArtifactsInput>
    connectOrCreate?: UserCreateOrConnectWithoutArtifactsInput
    connect?: UserWhereUniqueInput
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type UserUpdateOneRequiredWithoutArtifactsNestedInput = {
    create?: XOR<UserCreateWithoutArtifactsInput, UserUncheckedCreateWithoutArtifactsInput>
    connectOrCreate?: UserCreateOrConnectWithoutArtifactsInput
    upsert?: UserUpsertWithoutArtifactsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutArtifactsInput, UserUpdateWithoutArtifactsInput>, UserUncheckedUpdateWithoutArtifactsInput>
  }

  export type ConversationCreateNestedManyWithoutUserInput = {
    create?: XOR<ConversationCreateWithoutUserInput, ConversationUncheckedCreateWithoutUserInput> | ConversationCreateWithoutUserInput[] | ConversationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ConversationCreateOrConnectWithoutUserInput | ConversationCreateOrConnectWithoutUserInput[]
    createMany?: ConversationCreateManyUserInputEnvelope
    connect?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
  }

  export type OAuthTokenCreateNestedManyWithoutUserInput = {
    create?: XOR<OAuthTokenCreateWithoutUserInput, OAuthTokenUncheckedCreateWithoutUserInput> | OAuthTokenCreateWithoutUserInput[] | OAuthTokenUncheckedCreateWithoutUserInput[]
    connectOrCreate?: OAuthTokenCreateOrConnectWithoutUserInput | OAuthTokenCreateOrConnectWithoutUserInput[]
    createMany?: OAuthTokenCreateManyUserInputEnvelope
    connect?: OAuthTokenWhereUniqueInput | OAuthTokenWhereUniqueInput[]
  }

  export type ArtifactCreateNestedManyWithoutUserInput = {
    create?: XOR<ArtifactCreateWithoutUserInput, ArtifactUncheckedCreateWithoutUserInput> | ArtifactCreateWithoutUserInput[] | ArtifactUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ArtifactCreateOrConnectWithoutUserInput | ArtifactCreateOrConnectWithoutUserInput[]
    createMany?: ArtifactCreateManyUserInputEnvelope
    connect?: ArtifactWhereUniqueInput | ArtifactWhereUniqueInput[]
  }

  export type WorkflowRunCreateNestedManyWithoutUserInput = {
    create?: XOR<WorkflowRunCreateWithoutUserInput, WorkflowRunUncheckedCreateWithoutUserInput> | WorkflowRunCreateWithoutUserInput[] | WorkflowRunUncheckedCreateWithoutUserInput[]
    connectOrCreate?: WorkflowRunCreateOrConnectWithoutUserInput | WorkflowRunCreateOrConnectWithoutUserInput[]
    createMany?: WorkflowRunCreateManyUserInputEnvelope
    connect?: WorkflowRunWhereUniqueInput | WorkflowRunWhereUniqueInput[]
  }

  export type ConversationUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ConversationCreateWithoutUserInput, ConversationUncheckedCreateWithoutUserInput> | ConversationCreateWithoutUserInput[] | ConversationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ConversationCreateOrConnectWithoutUserInput | ConversationCreateOrConnectWithoutUserInput[]
    createMany?: ConversationCreateManyUserInputEnvelope
    connect?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
  }

  export type OAuthTokenUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<OAuthTokenCreateWithoutUserInput, OAuthTokenUncheckedCreateWithoutUserInput> | OAuthTokenCreateWithoutUserInput[] | OAuthTokenUncheckedCreateWithoutUserInput[]
    connectOrCreate?: OAuthTokenCreateOrConnectWithoutUserInput | OAuthTokenCreateOrConnectWithoutUserInput[]
    createMany?: OAuthTokenCreateManyUserInputEnvelope
    connect?: OAuthTokenWhereUniqueInput | OAuthTokenWhereUniqueInput[]
  }

  export type ArtifactUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ArtifactCreateWithoutUserInput, ArtifactUncheckedCreateWithoutUserInput> | ArtifactCreateWithoutUserInput[] | ArtifactUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ArtifactCreateOrConnectWithoutUserInput | ArtifactCreateOrConnectWithoutUserInput[]
    createMany?: ArtifactCreateManyUserInputEnvelope
    connect?: ArtifactWhereUniqueInput | ArtifactWhereUniqueInput[]
  }

  export type WorkflowRunUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<WorkflowRunCreateWithoutUserInput, WorkflowRunUncheckedCreateWithoutUserInput> | WorkflowRunCreateWithoutUserInput[] | WorkflowRunUncheckedCreateWithoutUserInput[]
    connectOrCreate?: WorkflowRunCreateOrConnectWithoutUserInput | WorkflowRunCreateOrConnectWithoutUserInput[]
    createMany?: WorkflowRunCreateManyUserInputEnvelope
    connect?: WorkflowRunWhereUniqueInput | WorkflowRunWhereUniqueInput[]
  }

  export type ConversationUpdateManyWithoutUserNestedInput = {
    create?: XOR<ConversationCreateWithoutUserInput, ConversationUncheckedCreateWithoutUserInput> | ConversationCreateWithoutUserInput[] | ConversationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ConversationCreateOrConnectWithoutUserInput | ConversationCreateOrConnectWithoutUserInput[]
    upsert?: ConversationUpsertWithWhereUniqueWithoutUserInput | ConversationUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ConversationCreateManyUserInputEnvelope
    set?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
    disconnect?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
    delete?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
    connect?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
    update?: ConversationUpdateWithWhereUniqueWithoutUserInput | ConversationUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ConversationUpdateManyWithWhereWithoutUserInput | ConversationUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ConversationScalarWhereInput | ConversationScalarWhereInput[]
  }

  export type OAuthTokenUpdateManyWithoutUserNestedInput = {
    create?: XOR<OAuthTokenCreateWithoutUserInput, OAuthTokenUncheckedCreateWithoutUserInput> | OAuthTokenCreateWithoutUserInput[] | OAuthTokenUncheckedCreateWithoutUserInput[]
    connectOrCreate?: OAuthTokenCreateOrConnectWithoutUserInput | OAuthTokenCreateOrConnectWithoutUserInput[]
    upsert?: OAuthTokenUpsertWithWhereUniqueWithoutUserInput | OAuthTokenUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: OAuthTokenCreateManyUserInputEnvelope
    set?: OAuthTokenWhereUniqueInput | OAuthTokenWhereUniqueInput[]
    disconnect?: OAuthTokenWhereUniqueInput | OAuthTokenWhereUniqueInput[]
    delete?: OAuthTokenWhereUniqueInput | OAuthTokenWhereUniqueInput[]
    connect?: OAuthTokenWhereUniqueInput | OAuthTokenWhereUniqueInput[]
    update?: OAuthTokenUpdateWithWhereUniqueWithoutUserInput | OAuthTokenUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: OAuthTokenUpdateManyWithWhereWithoutUserInput | OAuthTokenUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: OAuthTokenScalarWhereInput | OAuthTokenScalarWhereInput[]
  }

  export type ArtifactUpdateManyWithoutUserNestedInput = {
    create?: XOR<ArtifactCreateWithoutUserInput, ArtifactUncheckedCreateWithoutUserInput> | ArtifactCreateWithoutUserInput[] | ArtifactUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ArtifactCreateOrConnectWithoutUserInput | ArtifactCreateOrConnectWithoutUserInput[]
    upsert?: ArtifactUpsertWithWhereUniqueWithoutUserInput | ArtifactUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ArtifactCreateManyUserInputEnvelope
    set?: ArtifactWhereUniqueInput | ArtifactWhereUniqueInput[]
    disconnect?: ArtifactWhereUniqueInput | ArtifactWhereUniqueInput[]
    delete?: ArtifactWhereUniqueInput | ArtifactWhereUniqueInput[]
    connect?: ArtifactWhereUniqueInput | ArtifactWhereUniqueInput[]
    update?: ArtifactUpdateWithWhereUniqueWithoutUserInput | ArtifactUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ArtifactUpdateManyWithWhereWithoutUserInput | ArtifactUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ArtifactScalarWhereInput | ArtifactScalarWhereInput[]
  }

  export type WorkflowRunUpdateManyWithoutUserNestedInput = {
    create?: XOR<WorkflowRunCreateWithoutUserInput, WorkflowRunUncheckedCreateWithoutUserInput> | WorkflowRunCreateWithoutUserInput[] | WorkflowRunUncheckedCreateWithoutUserInput[]
    connectOrCreate?: WorkflowRunCreateOrConnectWithoutUserInput | WorkflowRunCreateOrConnectWithoutUserInput[]
    upsert?: WorkflowRunUpsertWithWhereUniqueWithoutUserInput | WorkflowRunUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: WorkflowRunCreateManyUserInputEnvelope
    set?: WorkflowRunWhereUniqueInput | WorkflowRunWhereUniqueInput[]
    disconnect?: WorkflowRunWhereUniqueInput | WorkflowRunWhereUniqueInput[]
    delete?: WorkflowRunWhereUniqueInput | WorkflowRunWhereUniqueInput[]
    connect?: WorkflowRunWhereUniqueInput | WorkflowRunWhereUniqueInput[]
    update?: WorkflowRunUpdateWithWhereUniqueWithoutUserInput | WorkflowRunUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: WorkflowRunUpdateManyWithWhereWithoutUserInput | WorkflowRunUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: WorkflowRunScalarWhereInput | WorkflowRunScalarWhereInput[]
  }

  export type ConversationUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ConversationCreateWithoutUserInput, ConversationUncheckedCreateWithoutUserInput> | ConversationCreateWithoutUserInput[] | ConversationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ConversationCreateOrConnectWithoutUserInput | ConversationCreateOrConnectWithoutUserInput[]
    upsert?: ConversationUpsertWithWhereUniqueWithoutUserInput | ConversationUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ConversationCreateManyUserInputEnvelope
    set?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
    disconnect?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
    delete?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
    connect?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
    update?: ConversationUpdateWithWhereUniqueWithoutUserInput | ConversationUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ConversationUpdateManyWithWhereWithoutUserInput | ConversationUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ConversationScalarWhereInput | ConversationScalarWhereInput[]
  }

  export type OAuthTokenUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<OAuthTokenCreateWithoutUserInput, OAuthTokenUncheckedCreateWithoutUserInput> | OAuthTokenCreateWithoutUserInput[] | OAuthTokenUncheckedCreateWithoutUserInput[]
    connectOrCreate?: OAuthTokenCreateOrConnectWithoutUserInput | OAuthTokenCreateOrConnectWithoutUserInput[]
    upsert?: OAuthTokenUpsertWithWhereUniqueWithoutUserInput | OAuthTokenUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: OAuthTokenCreateManyUserInputEnvelope
    set?: OAuthTokenWhereUniqueInput | OAuthTokenWhereUniqueInput[]
    disconnect?: OAuthTokenWhereUniqueInput | OAuthTokenWhereUniqueInput[]
    delete?: OAuthTokenWhereUniqueInput | OAuthTokenWhereUniqueInput[]
    connect?: OAuthTokenWhereUniqueInput | OAuthTokenWhereUniqueInput[]
    update?: OAuthTokenUpdateWithWhereUniqueWithoutUserInput | OAuthTokenUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: OAuthTokenUpdateManyWithWhereWithoutUserInput | OAuthTokenUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: OAuthTokenScalarWhereInput | OAuthTokenScalarWhereInput[]
  }

  export type ArtifactUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ArtifactCreateWithoutUserInput, ArtifactUncheckedCreateWithoutUserInput> | ArtifactCreateWithoutUserInput[] | ArtifactUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ArtifactCreateOrConnectWithoutUserInput | ArtifactCreateOrConnectWithoutUserInput[]
    upsert?: ArtifactUpsertWithWhereUniqueWithoutUserInput | ArtifactUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ArtifactCreateManyUserInputEnvelope
    set?: ArtifactWhereUniqueInput | ArtifactWhereUniqueInput[]
    disconnect?: ArtifactWhereUniqueInput | ArtifactWhereUniqueInput[]
    delete?: ArtifactWhereUniqueInput | ArtifactWhereUniqueInput[]
    connect?: ArtifactWhereUniqueInput | ArtifactWhereUniqueInput[]
    update?: ArtifactUpdateWithWhereUniqueWithoutUserInput | ArtifactUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ArtifactUpdateManyWithWhereWithoutUserInput | ArtifactUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ArtifactScalarWhereInput | ArtifactScalarWhereInput[]
  }

  export type WorkflowRunUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<WorkflowRunCreateWithoutUserInput, WorkflowRunUncheckedCreateWithoutUserInput> | WorkflowRunCreateWithoutUserInput[] | WorkflowRunUncheckedCreateWithoutUserInput[]
    connectOrCreate?: WorkflowRunCreateOrConnectWithoutUserInput | WorkflowRunCreateOrConnectWithoutUserInput[]
    upsert?: WorkflowRunUpsertWithWhereUniqueWithoutUserInput | WorkflowRunUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: WorkflowRunCreateManyUserInputEnvelope
    set?: WorkflowRunWhereUniqueInput | WorkflowRunWhereUniqueInput[]
    disconnect?: WorkflowRunWhereUniqueInput | WorkflowRunWhereUniqueInput[]
    delete?: WorkflowRunWhereUniqueInput | WorkflowRunWhereUniqueInput[]
    connect?: WorkflowRunWhereUniqueInput | WorkflowRunWhereUniqueInput[]
    update?: WorkflowRunUpdateWithWhereUniqueWithoutUserInput | WorkflowRunUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: WorkflowRunUpdateManyWithWhereWithoutUserInput | WorkflowRunUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: WorkflowRunScalarWhereInput | WorkflowRunScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutConversationsInput = {
    create?: XOR<UserCreateWithoutConversationsInput, UserUncheckedCreateWithoutConversationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutConversationsInput
    connect?: UserWhereUniqueInput
  }

  export type MessageCreateNestedManyWithoutConversationInput = {
    create?: XOR<MessageCreateWithoutConversationInput, MessageUncheckedCreateWithoutConversationInput> | MessageCreateWithoutConversationInput[] | MessageUncheckedCreateWithoutConversationInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutConversationInput | MessageCreateOrConnectWithoutConversationInput[]
    createMany?: MessageCreateManyConversationInputEnvelope
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
  }

  export type WorkflowRunCreateNestedManyWithoutConversationInput = {
    create?: XOR<WorkflowRunCreateWithoutConversationInput, WorkflowRunUncheckedCreateWithoutConversationInput> | WorkflowRunCreateWithoutConversationInput[] | WorkflowRunUncheckedCreateWithoutConversationInput[]
    connectOrCreate?: WorkflowRunCreateOrConnectWithoutConversationInput | WorkflowRunCreateOrConnectWithoutConversationInput[]
    createMany?: WorkflowRunCreateManyConversationInputEnvelope
    connect?: WorkflowRunWhereUniqueInput | WorkflowRunWhereUniqueInput[]
  }

  export type MessageUncheckedCreateNestedManyWithoutConversationInput = {
    create?: XOR<MessageCreateWithoutConversationInput, MessageUncheckedCreateWithoutConversationInput> | MessageCreateWithoutConversationInput[] | MessageUncheckedCreateWithoutConversationInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutConversationInput | MessageCreateOrConnectWithoutConversationInput[]
    createMany?: MessageCreateManyConversationInputEnvelope
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
  }

  export type WorkflowRunUncheckedCreateNestedManyWithoutConversationInput = {
    create?: XOR<WorkflowRunCreateWithoutConversationInput, WorkflowRunUncheckedCreateWithoutConversationInput> | WorkflowRunCreateWithoutConversationInput[] | WorkflowRunUncheckedCreateWithoutConversationInput[]
    connectOrCreate?: WorkflowRunCreateOrConnectWithoutConversationInput | WorkflowRunCreateOrConnectWithoutConversationInput[]
    createMany?: WorkflowRunCreateManyConversationInputEnvelope
    connect?: WorkflowRunWhereUniqueInput | WorkflowRunWhereUniqueInput[]
  }

  export type UserUpdateOneRequiredWithoutConversationsNestedInput = {
    create?: XOR<UserCreateWithoutConversationsInput, UserUncheckedCreateWithoutConversationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutConversationsInput
    upsert?: UserUpsertWithoutConversationsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutConversationsInput, UserUpdateWithoutConversationsInput>, UserUncheckedUpdateWithoutConversationsInput>
  }

  export type MessageUpdateManyWithoutConversationNestedInput = {
    create?: XOR<MessageCreateWithoutConversationInput, MessageUncheckedCreateWithoutConversationInput> | MessageCreateWithoutConversationInput[] | MessageUncheckedCreateWithoutConversationInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutConversationInput | MessageCreateOrConnectWithoutConversationInput[]
    upsert?: MessageUpsertWithWhereUniqueWithoutConversationInput | MessageUpsertWithWhereUniqueWithoutConversationInput[]
    createMany?: MessageCreateManyConversationInputEnvelope
    set?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    disconnect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    delete?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    update?: MessageUpdateWithWhereUniqueWithoutConversationInput | MessageUpdateWithWhereUniqueWithoutConversationInput[]
    updateMany?: MessageUpdateManyWithWhereWithoutConversationInput | MessageUpdateManyWithWhereWithoutConversationInput[]
    deleteMany?: MessageScalarWhereInput | MessageScalarWhereInput[]
  }

  export type WorkflowRunUpdateManyWithoutConversationNestedInput = {
    create?: XOR<WorkflowRunCreateWithoutConversationInput, WorkflowRunUncheckedCreateWithoutConversationInput> | WorkflowRunCreateWithoutConversationInput[] | WorkflowRunUncheckedCreateWithoutConversationInput[]
    connectOrCreate?: WorkflowRunCreateOrConnectWithoutConversationInput | WorkflowRunCreateOrConnectWithoutConversationInput[]
    upsert?: WorkflowRunUpsertWithWhereUniqueWithoutConversationInput | WorkflowRunUpsertWithWhereUniqueWithoutConversationInput[]
    createMany?: WorkflowRunCreateManyConversationInputEnvelope
    set?: WorkflowRunWhereUniqueInput | WorkflowRunWhereUniqueInput[]
    disconnect?: WorkflowRunWhereUniqueInput | WorkflowRunWhereUniqueInput[]
    delete?: WorkflowRunWhereUniqueInput | WorkflowRunWhereUniqueInput[]
    connect?: WorkflowRunWhereUniqueInput | WorkflowRunWhereUniqueInput[]
    update?: WorkflowRunUpdateWithWhereUniqueWithoutConversationInput | WorkflowRunUpdateWithWhereUniqueWithoutConversationInput[]
    updateMany?: WorkflowRunUpdateManyWithWhereWithoutConversationInput | WorkflowRunUpdateManyWithWhereWithoutConversationInput[]
    deleteMany?: WorkflowRunScalarWhereInput | WorkflowRunScalarWhereInput[]
  }

  export type MessageUncheckedUpdateManyWithoutConversationNestedInput = {
    create?: XOR<MessageCreateWithoutConversationInput, MessageUncheckedCreateWithoutConversationInput> | MessageCreateWithoutConversationInput[] | MessageUncheckedCreateWithoutConversationInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutConversationInput | MessageCreateOrConnectWithoutConversationInput[]
    upsert?: MessageUpsertWithWhereUniqueWithoutConversationInput | MessageUpsertWithWhereUniqueWithoutConversationInput[]
    createMany?: MessageCreateManyConversationInputEnvelope
    set?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    disconnect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    delete?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    update?: MessageUpdateWithWhereUniqueWithoutConversationInput | MessageUpdateWithWhereUniqueWithoutConversationInput[]
    updateMany?: MessageUpdateManyWithWhereWithoutConversationInput | MessageUpdateManyWithWhereWithoutConversationInput[]
    deleteMany?: MessageScalarWhereInput | MessageScalarWhereInput[]
  }

  export type WorkflowRunUncheckedUpdateManyWithoutConversationNestedInput = {
    create?: XOR<WorkflowRunCreateWithoutConversationInput, WorkflowRunUncheckedCreateWithoutConversationInput> | WorkflowRunCreateWithoutConversationInput[] | WorkflowRunUncheckedCreateWithoutConversationInput[]
    connectOrCreate?: WorkflowRunCreateOrConnectWithoutConversationInput | WorkflowRunCreateOrConnectWithoutConversationInput[]
    upsert?: WorkflowRunUpsertWithWhereUniqueWithoutConversationInput | WorkflowRunUpsertWithWhereUniqueWithoutConversationInput[]
    createMany?: WorkflowRunCreateManyConversationInputEnvelope
    set?: WorkflowRunWhereUniqueInput | WorkflowRunWhereUniqueInput[]
    disconnect?: WorkflowRunWhereUniqueInput | WorkflowRunWhereUniqueInput[]
    delete?: WorkflowRunWhereUniqueInput | WorkflowRunWhereUniqueInput[]
    connect?: WorkflowRunWhereUniqueInput | WorkflowRunWhereUniqueInput[]
    update?: WorkflowRunUpdateWithWhereUniqueWithoutConversationInput | WorkflowRunUpdateWithWhereUniqueWithoutConversationInput[]
    updateMany?: WorkflowRunUpdateManyWithWhereWithoutConversationInput | WorkflowRunUpdateManyWithWhereWithoutConversationInput[]
    deleteMany?: WorkflowRunScalarWhereInput | WorkflowRunScalarWhereInput[]
  }

  export type ConversationCreateNestedOneWithoutMessagesInput = {
    create?: XOR<ConversationCreateWithoutMessagesInput, ConversationUncheckedCreateWithoutMessagesInput>
    connectOrCreate?: ConversationCreateOrConnectWithoutMessagesInput
    connect?: ConversationWhereUniqueInput
  }

  export type ConversationUpdateOneRequiredWithoutMessagesNestedInput = {
    create?: XOR<ConversationCreateWithoutMessagesInput, ConversationUncheckedCreateWithoutMessagesInput>
    connectOrCreate?: ConversationCreateOrConnectWithoutMessagesInput
    upsert?: ConversationUpsertWithoutMessagesInput
    connect?: ConversationWhereUniqueInput
    update?: XOR<XOR<ConversationUpdateToOneWithWhereWithoutMessagesInput, ConversationUpdateWithoutMessagesInput>, ConversationUncheckedUpdateWithoutMessagesInput>
  }

  export type UserCreateNestedOneWithoutOauthTokensInput = {
    create?: XOR<UserCreateWithoutOauthTokensInput, UserUncheckedCreateWithoutOauthTokensInput>
    connectOrCreate?: UserCreateOrConnectWithoutOauthTokensInput
    connect?: UserWhereUniqueInput
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type UserUpdateOneRequiredWithoutOauthTokensNestedInput = {
    create?: XOR<UserCreateWithoutOauthTokensInput, UserUncheckedCreateWithoutOauthTokensInput>
    connectOrCreate?: UserCreateOrConnectWithoutOauthTokensInput
    upsert?: UserUpsertWithoutOauthTokensInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutOauthTokensInput, UserUpdateWithoutOauthTokensInput>, UserUncheckedUpdateWithoutOauthTokensInput>
  }

  export type UserCreateNestedOneWithoutWorkflowRunsInput = {
    create?: XOR<UserCreateWithoutWorkflowRunsInput, UserUncheckedCreateWithoutWorkflowRunsInput>
    connectOrCreate?: UserCreateOrConnectWithoutWorkflowRunsInput
    connect?: UserWhereUniqueInput
  }

  export type ConversationCreateNestedOneWithoutWorkflowRunsInput = {
    create?: XOR<ConversationCreateWithoutWorkflowRunsInput, ConversationUncheckedCreateWithoutWorkflowRunsInput>
    connectOrCreate?: ConversationCreateOrConnectWithoutWorkflowRunsInput
    connect?: ConversationWhereUniqueInput
  }

  export type WorkflowStepCreateNestedManyWithoutRunInput = {
    create?: XOR<WorkflowStepCreateWithoutRunInput, WorkflowStepUncheckedCreateWithoutRunInput> | WorkflowStepCreateWithoutRunInput[] | WorkflowStepUncheckedCreateWithoutRunInput[]
    connectOrCreate?: WorkflowStepCreateOrConnectWithoutRunInput | WorkflowStepCreateOrConnectWithoutRunInput[]
    createMany?: WorkflowStepCreateManyRunInputEnvelope
    connect?: WorkflowStepWhereUniqueInput | WorkflowStepWhereUniqueInput[]
  }

  export type WorkflowEventCreateNestedManyWithoutRunInput = {
    create?: XOR<WorkflowEventCreateWithoutRunInput, WorkflowEventUncheckedCreateWithoutRunInput> | WorkflowEventCreateWithoutRunInput[] | WorkflowEventUncheckedCreateWithoutRunInput[]
    connectOrCreate?: WorkflowEventCreateOrConnectWithoutRunInput | WorkflowEventCreateOrConnectWithoutRunInput[]
    createMany?: WorkflowEventCreateManyRunInputEnvelope
    connect?: WorkflowEventWhereUniqueInput | WorkflowEventWhereUniqueInput[]
  }

  export type WorkflowCheckpointCreateNestedManyWithoutRunInput = {
    create?: XOR<WorkflowCheckpointCreateWithoutRunInput, WorkflowCheckpointUncheckedCreateWithoutRunInput> | WorkflowCheckpointCreateWithoutRunInput[] | WorkflowCheckpointUncheckedCreateWithoutRunInput[]
    connectOrCreate?: WorkflowCheckpointCreateOrConnectWithoutRunInput | WorkflowCheckpointCreateOrConnectWithoutRunInput[]
    createMany?: WorkflowCheckpointCreateManyRunInputEnvelope
    connect?: WorkflowCheckpointWhereUniqueInput | WorkflowCheckpointWhereUniqueInput[]
  }

  export type RunMessageCreateNestedManyWithoutRunInput = {
    create?: XOR<RunMessageCreateWithoutRunInput, RunMessageUncheckedCreateWithoutRunInput> | RunMessageCreateWithoutRunInput[] | RunMessageUncheckedCreateWithoutRunInput[]
    connectOrCreate?: RunMessageCreateOrConnectWithoutRunInput | RunMessageCreateOrConnectWithoutRunInput[]
    createMany?: RunMessageCreateManyRunInputEnvelope
    connect?: RunMessageWhereUniqueInput | RunMessageWhereUniqueInput[]
  }

  export type WorkflowStepUncheckedCreateNestedManyWithoutRunInput = {
    create?: XOR<WorkflowStepCreateWithoutRunInput, WorkflowStepUncheckedCreateWithoutRunInput> | WorkflowStepCreateWithoutRunInput[] | WorkflowStepUncheckedCreateWithoutRunInput[]
    connectOrCreate?: WorkflowStepCreateOrConnectWithoutRunInput | WorkflowStepCreateOrConnectWithoutRunInput[]
    createMany?: WorkflowStepCreateManyRunInputEnvelope
    connect?: WorkflowStepWhereUniqueInput | WorkflowStepWhereUniqueInput[]
  }

  export type WorkflowEventUncheckedCreateNestedManyWithoutRunInput = {
    create?: XOR<WorkflowEventCreateWithoutRunInput, WorkflowEventUncheckedCreateWithoutRunInput> | WorkflowEventCreateWithoutRunInput[] | WorkflowEventUncheckedCreateWithoutRunInput[]
    connectOrCreate?: WorkflowEventCreateOrConnectWithoutRunInput | WorkflowEventCreateOrConnectWithoutRunInput[]
    createMany?: WorkflowEventCreateManyRunInputEnvelope
    connect?: WorkflowEventWhereUniqueInput | WorkflowEventWhereUniqueInput[]
  }

  export type WorkflowCheckpointUncheckedCreateNestedManyWithoutRunInput = {
    create?: XOR<WorkflowCheckpointCreateWithoutRunInput, WorkflowCheckpointUncheckedCreateWithoutRunInput> | WorkflowCheckpointCreateWithoutRunInput[] | WorkflowCheckpointUncheckedCreateWithoutRunInput[]
    connectOrCreate?: WorkflowCheckpointCreateOrConnectWithoutRunInput | WorkflowCheckpointCreateOrConnectWithoutRunInput[]
    createMany?: WorkflowCheckpointCreateManyRunInputEnvelope
    connect?: WorkflowCheckpointWhereUniqueInput | WorkflowCheckpointWhereUniqueInput[]
  }

  export type RunMessageUncheckedCreateNestedManyWithoutRunInput = {
    create?: XOR<RunMessageCreateWithoutRunInput, RunMessageUncheckedCreateWithoutRunInput> | RunMessageCreateWithoutRunInput[] | RunMessageUncheckedCreateWithoutRunInput[]
    connectOrCreate?: RunMessageCreateOrConnectWithoutRunInput | RunMessageCreateOrConnectWithoutRunInput[]
    createMany?: RunMessageCreateManyRunInputEnvelope
    connect?: RunMessageWhereUniqueInput | RunMessageWhereUniqueInput[]
  }

  export type EnumWorkflowRunStatusFieldUpdateOperationsInput = {
    set?: $Enums.WorkflowRunStatus
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserUpdateOneRequiredWithoutWorkflowRunsNestedInput = {
    create?: XOR<UserCreateWithoutWorkflowRunsInput, UserUncheckedCreateWithoutWorkflowRunsInput>
    connectOrCreate?: UserCreateOrConnectWithoutWorkflowRunsInput
    upsert?: UserUpsertWithoutWorkflowRunsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutWorkflowRunsInput, UserUpdateWithoutWorkflowRunsInput>, UserUncheckedUpdateWithoutWorkflowRunsInput>
  }

  export type ConversationUpdateOneWithoutWorkflowRunsNestedInput = {
    create?: XOR<ConversationCreateWithoutWorkflowRunsInput, ConversationUncheckedCreateWithoutWorkflowRunsInput>
    connectOrCreate?: ConversationCreateOrConnectWithoutWorkflowRunsInput
    upsert?: ConversationUpsertWithoutWorkflowRunsInput
    disconnect?: ConversationWhereInput | boolean
    delete?: ConversationWhereInput | boolean
    connect?: ConversationWhereUniqueInput
    update?: XOR<XOR<ConversationUpdateToOneWithWhereWithoutWorkflowRunsInput, ConversationUpdateWithoutWorkflowRunsInput>, ConversationUncheckedUpdateWithoutWorkflowRunsInput>
  }

  export type WorkflowStepUpdateManyWithoutRunNestedInput = {
    create?: XOR<WorkflowStepCreateWithoutRunInput, WorkflowStepUncheckedCreateWithoutRunInput> | WorkflowStepCreateWithoutRunInput[] | WorkflowStepUncheckedCreateWithoutRunInput[]
    connectOrCreate?: WorkflowStepCreateOrConnectWithoutRunInput | WorkflowStepCreateOrConnectWithoutRunInput[]
    upsert?: WorkflowStepUpsertWithWhereUniqueWithoutRunInput | WorkflowStepUpsertWithWhereUniqueWithoutRunInput[]
    createMany?: WorkflowStepCreateManyRunInputEnvelope
    set?: WorkflowStepWhereUniqueInput | WorkflowStepWhereUniqueInput[]
    disconnect?: WorkflowStepWhereUniqueInput | WorkflowStepWhereUniqueInput[]
    delete?: WorkflowStepWhereUniqueInput | WorkflowStepWhereUniqueInput[]
    connect?: WorkflowStepWhereUniqueInput | WorkflowStepWhereUniqueInput[]
    update?: WorkflowStepUpdateWithWhereUniqueWithoutRunInput | WorkflowStepUpdateWithWhereUniqueWithoutRunInput[]
    updateMany?: WorkflowStepUpdateManyWithWhereWithoutRunInput | WorkflowStepUpdateManyWithWhereWithoutRunInput[]
    deleteMany?: WorkflowStepScalarWhereInput | WorkflowStepScalarWhereInput[]
  }

  export type WorkflowEventUpdateManyWithoutRunNestedInput = {
    create?: XOR<WorkflowEventCreateWithoutRunInput, WorkflowEventUncheckedCreateWithoutRunInput> | WorkflowEventCreateWithoutRunInput[] | WorkflowEventUncheckedCreateWithoutRunInput[]
    connectOrCreate?: WorkflowEventCreateOrConnectWithoutRunInput | WorkflowEventCreateOrConnectWithoutRunInput[]
    upsert?: WorkflowEventUpsertWithWhereUniqueWithoutRunInput | WorkflowEventUpsertWithWhereUniqueWithoutRunInput[]
    createMany?: WorkflowEventCreateManyRunInputEnvelope
    set?: WorkflowEventWhereUniqueInput | WorkflowEventWhereUniqueInput[]
    disconnect?: WorkflowEventWhereUniqueInput | WorkflowEventWhereUniqueInput[]
    delete?: WorkflowEventWhereUniqueInput | WorkflowEventWhereUniqueInput[]
    connect?: WorkflowEventWhereUniqueInput | WorkflowEventWhereUniqueInput[]
    update?: WorkflowEventUpdateWithWhereUniqueWithoutRunInput | WorkflowEventUpdateWithWhereUniqueWithoutRunInput[]
    updateMany?: WorkflowEventUpdateManyWithWhereWithoutRunInput | WorkflowEventUpdateManyWithWhereWithoutRunInput[]
    deleteMany?: WorkflowEventScalarWhereInput | WorkflowEventScalarWhereInput[]
  }

  export type WorkflowCheckpointUpdateManyWithoutRunNestedInput = {
    create?: XOR<WorkflowCheckpointCreateWithoutRunInput, WorkflowCheckpointUncheckedCreateWithoutRunInput> | WorkflowCheckpointCreateWithoutRunInput[] | WorkflowCheckpointUncheckedCreateWithoutRunInput[]
    connectOrCreate?: WorkflowCheckpointCreateOrConnectWithoutRunInput | WorkflowCheckpointCreateOrConnectWithoutRunInput[]
    upsert?: WorkflowCheckpointUpsertWithWhereUniqueWithoutRunInput | WorkflowCheckpointUpsertWithWhereUniqueWithoutRunInput[]
    createMany?: WorkflowCheckpointCreateManyRunInputEnvelope
    set?: WorkflowCheckpointWhereUniqueInput | WorkflowCheckpointWhereUniqueInput[]
    disconnect?: WorkflowCheckpointWhereUniqueInput | WorkflowCheckpointWhereUniqueInput[]
    delete?: WorkflowCheckpointWhereUniqueInput | WorkflowCheckpointWhereUniqueInput[]
    connect?: WorkflowCheckpointWhereUniqueInput | WorkflowCheckpointWhereUniqueInput[]
    update?: WorkflowCheckpointUpdateWithWhereUniqueWithoutRunInput | WorkflowCheckpointUpdateWithWhereUniqueWithoutRunInput[]
    updateMany?: WorkflowCheckpointUpdateManyWithWhereWithoutRunInput | WorkflowCheckpointUpdateManyWithWhereWithoutRunInput[]
    deleteMany?: WorkflowCheckpointScalarWhereInput | WorkflowCheckpointScalarWhereInput[]
  }

  export type RunMessageUpdateManyWithoutRunNestedInput = {
    create?: XOR<RunMessageCreateWithoutRunInput, RunMessageUncheckedCreateWithoutRunInput> | RunMessageCreateWithoutRunInput[] | RunMessageUncheckedCreateWithoutRunInput[]
    connectOrCreate?: RunMessageCreateOrConnectWithoutRunInput | RunMessageCreateOrConnectWithoutRunInput[]
    upsert?: RunMessageUpsertWithWhereUniqueWithoutRunInput | RunMessageUpsertWithWhereUniqueWithoutRunInput[]
    createMany?: RunMessageCreateManyRunInputEnvelope
    set?: RunMessageWhereUniqueInput | RunMessageWhereUniqueInput[]
    disconnect?: RunMessageWhereUniqueInput | RunMessageWhereUniqueInput[]
    delete?: RunMessageWhereUniqueInput | RunMessageWhereUniqueInput[]
    connect?: RunMessageWhereUniqueInput | RunMessageWhereUniqueInput[]
    update?: RunMessageUpdateWithWhereUniqueWithoutRunInput | RunMessageUpdateWithWhereUniqueWithoutRunInput[]
    updateMany?: RunMessageUpdateManyWithWhereWithoutRunInput | RunMessageUpdateManyWithWhereWithoutRunInput[]
    deleteMany?: RunMessageScalarWhereInput | RunMessageScalarWhereInput[]
  }

  export type WorkflowStepUncheckedUpdateManyWithoutRunNestedInput = {
    create?: XOR<WorkflowStepCreateWithoutRunInput, WorkflowStepUncheckedCreateWithoutRunInput> | WorkflowStepCreateWithoutRunInput[] | WorkflowStepUncheckedCreateWithoutRunInput[]
    connectOrCreate?: WorkflowStepCreateOrConnectWithoutRunInput | WorkflowStepCreateOrConnectWithoutRunInput[]
    upsert?: WorkflowStepUpsertWithWhereUniqueWithoutRunInput | WorkflowStepUpsertWithWhereUniqueWithoutRunInput[]
    createMany?: WorkflowStepCreateManyRunInputEnvelope
    set?: WorkflowStepWhereUniqueInput | WorkflowStepWhereUniqueInput[]
    disconnect?: WorkflowStepWhereUniqueInput | WorkflowStepWhereUniqueInput[]
    delete?: WorkflowStepWhereUniqueInput | WorkflowStepWhereUniqueInput[]
    connect?: WorkflowStepWhereUniqueInput | WorkflowStepWhereUniqueInput[]
    update?: WorkflowStepUpdateWithWhereUniqueWithoutRunInput | WorkflowStepUpdateWithWhereUniqueWithoutRunInput[]
    updateMany?: WorkflowStepUpdateManyWithWhereWithoutRunInput | WorkflowStepUpdateManyWithWhereWithoutRunInput[]
    deleteMany?: WorkflowStepScalarWhereInput | WorkflowStepScalarWhereInput[]
  }

  export type WorkflowEventUncheckedUpdateManyWithoutRunNestedInput = {
    create?: XOR<WorkflowEventCreateWithoutRunInput, WorkflowEventUncheckedCreateWithoutRunInput> | WorkflowEventCreateWithoutRunInput[] | WorkflowEventUncheckedCreateWithoutRunInput[]
    connectOrCreate?: WorkflowEventCreateOrConnectWithoutRunInput | WorkflowEventCreateOrConnectWithoutRunInput[]
    upsert?: WorkflowEventUpsertWithWhereUniqueWithoutRunInput | WorkflowEventUpsertWithWhereUniqueWithoutRunInput[]
    createMany?: WorkflowEventCreateManyRunInputEnvelope
    set?: WorkflowEventWhereUniqueInput | WorkflowEventWhereUniqueInput[]
    disconnect?: WorkflowEventWhereUniqueInput | WorkflowEventWhereUniqueInput[]
    delete?: WorkflowEventWhereUniqueInput | WorkflowEventWhereUniqueInput[]
    connect?: WorkflowEventWhereUniqueInput | WorkflowEventWhereUniqueInput[]
    update?: WorkflowEventUpdateWithWhereUniqueWithoutRunInput | WorkflowEventUpdateWithWhereUniqueWithoutRunInput[]
    updateMany?: WorkflowEventUpdateManyWithWhereWithoutRunInput | WorkflowEventUpdateManyWithWhereWithoutRunInput[]
    deleteMany?: WorkflowEventScalarWhereInput | WorkflowEventScalarWhereInput[]
  }

  export type WorkflowCheckpointUncheckedUpdateManyWithoutRunNestedInput = {
    create?: XOR<WorkflowCheckpointCreateWithoutRunInput, WorkflowCheckpointUncheckedCreateWithoutRunInput> | WorkflowCheckpointCreateWithoutRunInput[] | WorkflowCheckpointUncheckedCreateWithoutRunInput[]
    connectOrCreate?: WorkflowCheckpointCreateOrConnectWithoutRunInput | WorkflowCheckpointCreateOrConnectWithoutRunInput[]
    upsert?: WorkflowCheckpointUpsertWithWhereUniqueWithoutRunInput | WorkflowCheckpointUpsertWithWhereUniqueWithoutRunInput[]
    createMany?: WorkflowCheckpointCreateManyRunInputEnvelope
    set?: WorkflowCheckpointWhereUniqueInput | WorkflowCheckpointWhereUniqueInput[]
    disconnect?: WorkflowCheckpointWhereUniqueInput | WorkflowCheckpointWhereUniqueInput[]
    delete?: WorkflowCheckpointWhereUniqueInput | WorkflowCheckpointWhereUniqueInput[]
    connect?: WorkflowCheckpointWhereUniqueInput | WorkflowCheckpointWhereUniqueInput[]
    update?: WorkflowCheckpointUpdateWithWhereUniqueWithoutRunInput | WorkflowCheckpointUpdateWithWhereUniqueWithoutRunInput[]
    updateMany?: WorkflowCheckpointUpdateManyWithWhereWithoutRunInput | WorkflowCheckpointUpdateManyWithWhereWithoutRunInput[]
    deleteMany?: WorkflowCheckpointScalarWhereInput | WorkflowCheckpointScalarWhereInput[]
  }

  export type RunMessageUncheckedUpdateManyWithoutRunNestedInput = {
    create?: XOR<RunMessageCreateWithoutRunInput, RunMessageUncheckedCreateWithoutRunInput> | RunMessageCreateWithoutRunInput[] | RunMessageUncheckedCreateWithoutRunInput[]
    connectOrCreate?: RunMessageCreateOrConnectWithoutRunInput | RunMessageCreateOrConnectWithoutRunInput[]
    upsert?: RunMessageUpsertWithWhereUniqueWithoutRunInput | RunMessageUpsertWithWhereUniqueWithoutRunInput[]
    createMany?: RunMessageCreateManyRunInputEnvelope
    set?: RunMessageWhereUniqueInput | RunMessageWhereUniqueInput[]
    disconnect?: RunMessageWhereUniqueInput | RunMessageWhereUniqueInput[]
    delete?: RunMessageWhereUniqueInput | RunMessageWhereUniqueInput[]
    connect?: RunMessageWhereUniqueInput | RunMessageWhereUniqueInput[]
    update?: RunMessageUpdateWithWhereUniqueWithoutRunInput | RunMessageUpdateWithWhereUniqueWithoutRunInput[]
    updateMany?: RunMessageUpdateManyWithWhereWithoutRunInput | RunMessageUpdateManyWithWhereWithoutRunInput[]
    deleteMany?: RunMessageScalarWhereInput | RunMessageScalarWhereInput[]
  }

  export type WorkflowRunCreateNestedOneWithoutStepsInput = {
    create?: XOR<WorkflowRunCreateWithoutStepsInput, WorkflowRunUncheckedCreateWithoutStepsInput>
    connectOrCreate?: WorkflowRunCreateOrConnectWithoutStepsInput
    connect?: WorkflowRunWhereUniqueInput
  }

  export type WorkflowEventCreateNestedManyWithoutStepInput = {
    create?: XOR<WorkflowEventCreateWithoutStepInput, WorkflowEventUncheckedCreateWithoutStepInput> | WorkflowEventCreateWithoutStepInput[] | WorkflowEventUncheckedCreateWithoutStepInput[]
    connectOrCreate?: WorkflowEventCreateOrConnectWithoutStepInput | WorkflowEventCreateOrConnectWithoutStepInput[]
    createMany?: WorkflowEventCreateManyStepInputEnvelope
    connect?: WorkflowEventWhereUniqueInput | WorkflowEventWhereUniqueInput[]
  }

  export type WorkflowCheckpointCreateNestedManyWithoutStepInput = {
    create?: XOR<WorkflowCheckpointCreateWithoutStepInput, WorkflowCheckpointUncheckedCreateWithoutStepInput> | WorkflowCheckpointCreateWithoutStepInput[] | WorkflowCheckpointUncheckedCreateWithoutStepInput[]
    connectOrCreate?: WorkflowCheckpointCreateOrConnectWithoutStepInput | WorkflowCheckpointCreateOrConnectWithoutStepInput[]
    createMany?: WorkflowCheckpointCreateManyStepInputEnvelope
    connect?: WorkflowCheckpointWhereUniqueInput | WorkflowCheckpointWhereUniqueInput[]
  }

  export type WorkflowEventUncheckedCreateNestedManyWithoutStepInput = {
    create?: XOR<WorkflowEventCreateWithoutStepInput, WorkflowEventUncheckedCreateWithoutStepInput> | WorkflowEventCreateWithoutStepInput[] | WorkflowEventUncheckedCreateWithoutStepInput[]
    connectOrCreate?: WorkflowEventCreateOrConnectWithoutStepInput | WorkflowEventCreateOrConnectWithoutStepInput[]
    createMany?: WorkflowEventCreateManyStepInputEnvelope
    connect?: WorkflowEventWhereUniqueInput | WorkflowEventWhereUniqueInput[]
  }

  export type WorkflowCheckpointUncheckedCreateNestedManyWithoutStepInput = {
    create?: XOR<WorkflowCheckpointCreateWithoutStepInput, WorkflowCheckpointUncheckedCreateWithoutStepInput> | WorkflowCheckpointCreateWithoutStepInput[] | WorkflowCheckpointUncheckedCreateWithoutStepInput[]
    connectOrCreate?: WorkflowCheckpointCreateOrConnectWithoutStepInput | WorkflowCheckpointCreateOrConnectWithoutStepInput[]
    createMany?: WorkflowCheckpointCreateManyStepInputEnvelope
    connect?: WorkflowCheckpointWhereUniqueInput | WorkflowCheckpointWhereUniqueInput[]
  }

  export type EnumWorkflowStepTypeFieldUpdateOperationsInput = {
    set?: $Enums.WorkflowStepType
  }

  export type EnumWorkflowStepStatusFieldUpdateOperationsInput = {
    set?: $Enums.WorkflowStepStatus
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type WorkflowRunUpdateOneRequiredWithoutStepsNestedInput = {
    create?: XOR<WorkflowRunCreateWithoutStepsInput, WorkflowRunUncheckedCreateWithoutStepsInput>
    connectOrCreate?: WorkflowRunCreateOrConnectWithoutStepsInput
    upsert?: WorkflowRunUpsertWithoutStepsInput
    connect?: WorkflowRunWhereUniqueInput
    update?: XOR<XOR<WorkflowRunUpdateToOneWithWhereWithoutStepsInput, WorkflowRunUpdateWithoutStepsInput>, WorkflowRunUncheckedUpdateWithoutStepsInput>
  }

  export type WorkflowEventUpdateManyWithoutStepNestedInput = {
    create?: XOR<WorkflowEventCreateWithoutStepInput, WorkflowEventUncheckedCreateWithoutStepInput> | WorkflowEventCreateWithoutStepInput[] | WorkflowEventUncheckedCreateWithoutStepInput[]
    connectOrCreate?: WorkflowEventCreateOrConnectWithoutStepInput | WorkflowEventCreateOrConnectWithoutStepInput[]
    upsert?: WorkflowEventUpsertWithWhereUniqueWithoutStepInput | WorkflowEventUpsertWithWhereUniqueWithoutStepInput[]
    createMany?: WorkflowEventCreateManyStepInputEnvelope
    set?: WorkflowEventWhereUniqueInput | WorkflowEventWhereUniqueInput[]
    disconnect?: WorkflowEventWhereUniqueInput | WorkflowEventWhereUniqueInput[]
    delete?: WorkflowEventWhereUniqueInput | WorkflowEventWhereUniqueInput[]
    connect?: WorkflowEventWhereUniqueInput | WorkflowEventWhereUniqueInput[]
    update?: WorkflowEventUpdateWithWhereUniqueWithoutStepInput | WorkflowEventUpdateWithWhereUniqueWithoutStepInput[]
    updateMany?: WorkflowEventUpdateManyWithWhereWithoutStepInput | WorkflowEventUpdateManyWithWhereWithoutStepInput[]
    deleteMany?: WorkflowEventScalarWhereInput | WorkflowEventScalarWhereInput[]
  }

  export type WorkflowCheckpointUpdateManyWithoutStepNestedInput = {
    create?: XOR<WorkflowCheckpointCreateWithoutStepInput, WorkflowCheckpointUncheckedCreateWithoutStepInput> | WorkflowCheckpointCreateWithoutStepInput[] | WorkflowCheckpointUncheckedCreateWithoutStepInput[]
    connectOrCreate?: WorkflowCheckpointCreateOrConnectWithoutStepInput | WorkflowCheckpointCreateOrConnectWithoutStepInput[]
    upsert?: WorkflowCheckpointUpsertWithWhereUniqueWithoutStepInput | WorkflowCheckpointUpsertWithWhereUniqueWithoutStepInput[]
    createMany?: WorkflowCheckpointCreateManyStepInputEnvelope
    set?: WorkflowCheckpointWhereUniqueInput | WorkflowCheckpointWhereUniqueInput[]
    disconnect?: WorkflowCheckpointWhereUniqueInput | WorkflowCheckpointWhereUniqueInput[]
    delete?: WorkflowCheckpointWhereUniqueInput | WorkflowCheckpointWhereUniqueInput[]
    connect?: WorkflowCheckpointWhereUniqueInput | WorkflowCheckpointWhereUniqueInput[]
    update?: WorkflowCheckpointUpdateWithWhereUniqueWithoutStepInput | WorkflowCheckpointUpdateWithWhereUniqueWithoutStepInput[]
    updateMany?: WorkflowCheckpointUpdateManyWithWhereWithoutStepInput | WorkflowCheckpointUpdateManyWithWhereWithoutStepInput[]
    deleteMany?: WorkflowCheckpointScalarWhereInput | WorkflowCheckpointScalarWhereInput[]
  }

  export type WorkflowEventUncheckedUpdateManyWithoutStepNestedInput = {
    create?: XOR<WorkflowEventCreateWithoutStepInput, WorkflowEventUncheckedCreateWithoutStepInput> | WorkflowEventCreateWithoutStepInput[] | WorkflowEventUncheckedCreateWithoutStepInput[]
    connectOrCreate?: WorkflowEventCreateOrConnectWithoutStepInput | WorkflowEventCreateOrConnectWithoutStepInput[]
    upsert?: WorkflowEventUpsertWithWhereUniqueWithoutStepInput | WorkflowEventUpsertWithWhereUniqueWithoutStepInput[]
    createMany?: WorkflowEventCreateManyStepInputEnvelope
    set?: WorkflowEventWhereUniqueInput | WorkflowEventWhereUniqueInput[]
    disconnect?: WorkflowEventWhereUniqueInput | WorkflowEventWhereUniqueInput[]
    delete?: WorkflowEventWhereUniqueInput | WorkflowEventWhereUniqueInput[]
    connect?: WorkflowEventWhereUniqueInput | WorkflowEventWhereUniqueInput[]
    update?: WorkflowEventUpdateWithWhereUniqueWithoutStepInput | WorkflowEventUpdateWithWhereUniqueWithoutStepInput[]
    updateMany?: WorkflowEventUpdateManyWithWhereWithoutStepInput | WorkflowEventUpdateManyWithWhereWithoutStepInput[]
    deleteMany?: WorkflowEventScalarWhereInput | WorkflowEventScalarWhereInput[]
  }

  export type WorkflowCheckpointUncheckedUpdateManyWithoutStepNestedInput = {
    create?: XOR<WorkflowCheckpointCreateWithoutStepInput, WorkflowCheckpointUncheckedCreateWithoutStepInput> | WorkflowCheckpointCreateWithoutStepInput[] | WorkflowCheckpointUncheckedCreateWithoutStepInput[]
    connectOrCreate?: WorkflowCheckpointCreateOrConnectWithoutStepInput | WorkflowCheckpointCreateOrConnectWithoutStepInput[]
    upsert?: WorkflowCheckpointUpsertWithWhereUniqueWithoutStepInput | WorkflowCheckpointUpsertWithWhereUniqueWithoutStepInput[]
    createMany?: WorkflowCheckpointCreateManyStepInputEnvelope
    set?: WorkflowCheckpointWhereUniqueInput | WorkflowCheckpointWhereUniqueInput[]
    disconnect?: WorkflowCheckpointWhereUniqueInput | WorkflowCheckpointWhereUniqueInput[]
    delete?: WorkflowCheckpointWhereUniqueInput | WorkflowCheckpointWhereUniqueInput[]
    connect?: WorkflowCheckpointWhereUniqueInput | WorkflowCheckpointWhereUniqueInput[]
    update?: WorkflowCheckpointUpdateWithWhereUniqueWithoutStepInput | WorkflowCheckpointUpdateWithWhereUniqueWithoutStepInput[]
    updateMany?: WorkflowCheckpointUpdateManyWithWhereWithoutStepInput | WorkflowCheckpointUpdateManyWithWhereWithoutStepInput[]
    deleteMany?: WorkflowCheckpointScalarWhereInput | WorkflowCheckpointScalarWhereInput[]
  }

  export type WorkflowRunCreateNestedOneWithoutEventsInput = {
    create?: XOR<WorkflowRunCreateWithoutEventsInput, WorkflowRunUncheckedCreateWithoutEventsInput>
    connectOrCreate?: WorkflowRunCreateOrConnectWithoutEventsInput
    connect?: WorkflowRunWhereUniqueInput
  }

  export type WorkflowStepCreateNestedOneWithoutEventsInput = {
    create?: XOR<WorkflowStepCreateWithoutEventsInput, WorkflowStepUncheckedCreateWithoutEventsInput>
    connectOrCreate?: WorkflowStepCreateOrConnectWithoutEventsInput
    connect?: WorkflowStepWhereUniqueInput
  }

  export type WorkflowRunUpdateOneRequiredWithoutEventsNestedInput = {
    create?: XOR<WorkflowRunCreateWithoutEventsInput, WorkflowRunUncheckedCreateWithoutEventsInput>
    connectOrCreate?: WorkflowRunCreateOrConnectWithoutEventsInput
    upsert?: WorkflowRunUpsertWithoutEventsInput
    connect?: WorkflowRunWhereUniqueInput
    update?: XOR<XOR<WorkflowRunUpdateToOneWithWhereWithoutEventsInput, WorkflowRunUpdateWithoutEventsInput>, WorkflowRunUncheckedUpdateWithoutEventsInput>
  }

  export type WorkflowStepUpdateOneWithoutEventsNestedInput = {
    create?: XOR<WorkflowStepCreateWithoutEventsInput, WorkflowStepUncheckedCreateWithoutEventsInput>
    connectOrCreate?: WorkflowStepCreateOrConnectWithoutEventsInput
    upsert?: WorkflowStepUpsertWithoutEventsInput
    disconnect?: WorkflowStepWhereInput | boolean
    delete?: WorkflowStepWhereInput | boolean
    connect?: WorkflowStepWhereUniqueInput
    update?: XOR<XOR<WorkflowStepUpdateToOneWithWhereWithoutEventsInput, WorkflowStepUpdateWithoutEventsInput>, WorkflowStepUncheckedUpdateWithoutEventsInput>
  }

  export type WorkflowRunCreateNestedOneWithoutCheckpointsInput = {
    create?: XOR<WorkflowRunCreateWithoutCheckpointsInput, WorkflowRunUncheckedCreateWithoutCheckpointsInput>
    connectOrCreate?: WorkflowRunCreateOrConnectWithoutCheckpointsInput
    connect?: WorkflowRunWhereUniqueInput
  }

  export type WorkflowStepCreateNestedOneWithoutCheckpointsInput = {
    create?: XOR<WorkflowStepCreateWithoutCheckpointsInput, WorkflowStepUncheckedCreateWithoutCheckpointsInput>
    connectOrCreate?: WorkflowStepCreateOrConnectWithoutCheckpointsInput
    connect?: WorkflowStepWhereUniqueInput
  }

  export type WorkflowRunUpdateOneRequiredWithoutCheckpointsNestedInput = {
    create?: XOR<WorkflowRunCreateWithoutCheckpointsInput, WorkflowRunUncheckedCreateWithoutCheckpointsInput>
    connectOrCreate?: WorkflowRunCreateOrConnectWithoutCheckpointsInput
    upsert?: WorkflowRunUpsertWithoutCheckpointsInput
    connect?: WorkflowRunWhereUniqueInput
    update?: XOR<XOR<WorkflowRunUpdateToOneWithWhereWithoutCheckpointsInput, WorkflowRunUpdateWithoutCheckpointsInput>, WorkflowRunUncheckedUpdateWithoutCheckpointsInput>
  }

  export type WorkflowStepUpdateOneWithoutCheckpointsNestedInput = {
    create?: XOR<WorkflowStepCreateWithoutCheckpointsInput, WorkflowStepUncheckedCreateWithoutCheckpointsInput>
    connectOrCreate?: WorkflowStepCreateOrConnectWithoutCheckpointsInput
    upsert?: WorkflowStepUpsertWithoutCheckpointsInput
    disconnect?: WorkflowStepWhereInput | boolean
    delete?: WorkflowStepWhereInput | boolean
    connect?: WorkflowStepWhereUniqueInput
    update?: XOR<XOR<WorkflowStepUpdateToOneWithWhereWithoutCheckpointsInput, WorkflowStepUpdateWithoutCheckpointsInput>, WorkflowStepUncheckedUpdateWithoutCheckpointsInput>
  }

  export type WorkflowRunCreateNestedOneWithoutMessagesInput = {
    create?: XOR<WorkflowRunCreateWithoutMessagesInput, WorkflowRunUncheckedCreateWithoutMessagesInput>
    connectOrCreate?: WorkflowRunCreateOrConnectWithoutMessagesInput
    connect?: WorkflowRunWhereUniqueInput
  }

  export type WorkflowRunUpdateOneRequiredWithoutMessagesNestedInput = {
    create?: XOR<WorkflowRunCreateWithoutMessagesInput, WorkflowRunUncheckedCreateWithoutMessagesInput>
    connectOrCreate?: WorkflowRunCreateOrConnectWithoutMessagesInput
    upsert?: WorkflowRunUpsertWithoutMessagesInput
    connect?: WorkflowRunWhereUniqueInput
    update?: XOR<XOR<WorkflowRunUpdateToOneWithWhereWithoutMessagesInput, WorkflowRunUpdateWithoutMessagesInput>, WorkflowRunUncheckedUpdateWithoutMessagesInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedEnumWorkflowRunStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.WorkflowRunStatus | EnumWorkflowRunStatusFieldRefInput<$PrismaModel>
    in?: $Enums.WorkflowRunStatus[] | ListEnumWorkflowRunStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.WorkflowRunStatus[] | ListEnumWorkflowRunStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumWorkflowRunStatusFilter<$PrismaModel> | $Enums.WorkflowRunStatus
  }

  export type NestedEnumWorkflowRunStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.WorkflowRunStatus | EnumWorkflowRunStatusFieldRefInput<$PrismaModel>
    in?: $Enums.WorkflowRunStatus[] | ListEnumWorkflowRunStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.WorkflowRunStatus[] | ListEnumWorkflowRunStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumWorkflowRunStatusWithAggregatesFilter<$PrismaModel> | $Enums.WorkflowRunStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumWorkflowRunStatusFilter<$PrismaModel>
    _max?: NestedEnumWorkflowRunStatusFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumWorkflowStepTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.WorkflowStepType | EnumWorkflowStepTypeFieldRefInput<$PrismaModel>
    in?: $Enums.WorkflowStepType[] | ListEnumWorkflowStepTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.WorkflowStepType[] | ListEnumWorkflowStepTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumWorkflowStepTypeFilter<$PrismaModel> | $Enums.WorkflowStepType
  }

  export type NestedEnumWorkflowStepStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.WorkflowStepStatus | EnumWorkflowStepStatusFieldRefInput<$PrismaModel>
    in?: $Enums.WorkflowStepStatus[] | ListEnumWorkflowStepStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.WorkflowStepStatus[] | ListEnumWorkflowStepStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumWorkflowStepStatusFilter<$PrismaModel> | $Enums.WorkflowStepStatus
  }

  export type NestedEnumWorkflowStepTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.WorkflowStepType | EnumWorkflowStepTypeFieldRefInput<$PrismaModel>
    in?: $Enums.WorkflowStepType[] | ListEnumWorkflowStepTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.WorkflowStepType[] | ListEnumWorkflowStepTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumWorkflowStepTypeWithAggregatesFilter<$PrismaModel> | $Enums.WorkflowStepType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumWorkflowStepTypeFilter<$PrismaModel>
    _max?: NestedEnumWorkflowStepTypeFilter<$PrismaModel>
  }

  export type NestedEnumWorkflowStepStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.WorkflowStepStatus | EnumWorkflowStepStatusFieldRefInput<$PrismaModel>
    in?: $Enums.WorkflowStepStatus[] | ListEnumWorkflowStepStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.WorkflowStepStatus[] | ListEnumWorkflowStepStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumWorkflowStepStatusWithAggregatesFilter<$PrismaModel> | $Enums.WorkflowStepStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumWorkflowStepStatusFilter<$PrismaModel>
    _max?: NestedEnumWorkflowStepStatusFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }
  export type NestedJsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type UserCreateWithoutArtifactsInput = {
    id?: string
    email: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    password: string
    conversations?: ConversationCreateNestedManyWithoutUserInput
    oauthTokens?: OAuthTokenCreateNestedManyWithoutUserInput
    workflowRuns?: WorkflowRunCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutArtifactsInput = {
    id?: string
    email: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    password: string
    conversations?: ConversationUncheckedCreateNestedManyWithoutUserInput
    oauthTokens?: OAuthTokenUncheckedCreateNestedManyWithoutUserInput
    workflowRuns?: WorkflowRunUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutArtifactsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutArtifactsInput, UserUncheckedCreateWithoutArtifactsInput>
  }

  export type UserUpsertWithoutArtifactsInput = {
    update: XOR<UserUpdateWithoutArtifactsInput, UserUncheckedUpdateWithoutArtifactsInput>
    create: XOR<UserCreateWithoutArtifactsInput, UserUncheckedCreateWithoutArtifactsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutArtifactsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutArtifactsInput, UserUncheckedUpdateWithoutArtifactsInput>
  }

  export type UserUpdateWithoutArtifactsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    password?: StringFieldUpdateOperationsInput | string
    conversations?: ConversationUpdateManyWithoutUserNestedInput
    oauthTokens?: OAuthTokenUpdateManyWithoutUserNestedInput
    workflowRuns?: WorkflowRunUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutArtifactsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    password?: StringFieldUpdateOperationsInput | string
    conversations?: ConversationUncheckedUpdateManyWithoutUserNestedInput
    oauthTokens?: OAuthTokenUncheckedUpdateManyWithoutUserNestedInput
    workflowRuns?: WorkflowRunUncheckedUpdateManyWithoutUserNestedInput
  }

  export type ConversationCreateWithoutUserInput = {
    id?: string
    title?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    messages?: MessageCreateNestedManyWithoutConversationInput
    workflowRuns?: WorkflowRunCreateNestedManyWithoutConversationInput
  }

  export type ConversationUncheckedCreateWithoutUserInput = {
    id?: string
    title?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    messages?: MessageUncheckedCreateNestedManyWithoutConversationInput
    workflowRuns?: WorkflowRunUncheckedCreateNestedManyWithoutConversationInput
  }

  export type ConversationCreateOrConnectWithoutUserInput = {
    where: ConversationWhereUniqueInput
    create: XOR<ConversationCreateWithoutUserInput, ConversationUncheckedCreateWithoutUserInput>
  }

  export type ConversationCreateManyUserInputEnvelope = {
    data: ConversationCreateManyUserInput | ConversationCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type OAuthTokenCreateWithoutUserInput = {
    id?: string
    provider: string
    accessToken: string
    refreshToken?: string | null
    expiresAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OAuthTokenUncheckedCreateWithoutUserInput = {
    id?: string
    provider: string
    accessToken: string
    refreshToken?: string | null
    expiresAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OAuthTokenCreateOrConnectWithoutUserInput = {
    where: OAuthTokenWhereUniqueInput
    create: XOR<OAuthTokenCreateWithoutUserInput, OAuthTokenUncheckedCreateWithoutUserInput>
  }

  export type OAuthTokenCreateManyUserInputEnvelope = {
    data: OAuthTokenCreateManyUserInput | OAuthTokenCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type ArtifactCreateWithoutUserInput = {
    id?: string
    type: string
    name?: string | null
    mimeType?: string | null
    storagePath?: string | null
    textContent?: string | null
    jsonContent?: NullableJsonNullValueInput | InputJsonValue
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ArtifactUncheckedCreateWithoutUserInput = {
    id?: string
    type: string
    name?: string | null
    mimeType?: string | null
    storagePath?: string | null
    textContent?: string | null
    jsonContent?: NullableJsonNullValueInput | InputJsonValue
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ArtifactCreateOrConnectWithoutUserInput = {
    where: ArtifactWhereUniqueInput
    create: XOR<ArtifactCreateWithoutUserInput, ArtifactUncheckedCreateWithoutUserInput>
  }

  export type ArtifactCreateManyUserInputEnvelope = {
    data: ArtifactCreateManyUserInput | ArtifactCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type WorkflowRunCreateWithoutUserInput = {
    id?: string
    prompt: string
    status?: $Enums.WorkflowRunStatus
    model?: string | null
    maxSteps?: number | null
    startedAt?: Date | string | null
    endedAt?: Date | string | null
    finalAnswer?: string | null
    errorClass?: string | null
    errorMessage?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    conversation?: ConversationCreateNestedOneWithoutWorkflowRunsInput
    steps?: WorkflowStepCreateNestedManyWithoutRunInput
    events?: WorkflowEventCreateNestedManyWithoutRunInput
    checkpoints?: WorkflowCheckpointCreateNestedManyWithoutRunInput
    messages?: RunMessageCreateNestedManyWithoutRunInput
  }

  export type WorkflowRunUncheckedCreateWithoutUserInput = {
    id?: string
    conversationId?: string | null
    prompt: string
    status?: $Enums.WorkflowRunStatus
    model?: string | null
    maxSteps?: number | null
    startedAt?: Date | string | null
    endedAt?: Date | string | null
    finalAnswer?: string | null
    errorClass?: string | null
    errorMessage?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    steps?: WorkflowStepUncheckedCreateNestedManyWithoutRunInput
    events?: WorkflowEventUncheckedCreateNestedManyWithoutRunInput
    checkpoints?: WorkflowCheckpointUncheckedCreateNestedManyWithoutRunInput
    messages?: RunMessageUncheckedCreateNestedManyWithoutRunInput
  }

  export type WorkflowRunCreateOrConnectWithoutUserInput = {
    where: WorkflowRunWhereUniqueInput
    create: XOR<WorkflowRunCreateWithoutUserInput, WorkflowRunUncheckedCreateWithoutUserInput>
  }

  export type WorkflowRunCreateManyUserInputEnvelope = {
    data: WorkflowRunCreateManyUserInput | WorkflowRunCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type ConversationUpsertWithWhereUniqueWithoutUserInput = {
    where: ConversationWhereUniqueInput
    update: XOR<ConversationUpdateWithoutUserInput, ConversationUncheckedUpdateWithoutUserInput>
    create: XOR<ConversationCreateWithoutUserInput, ConversationUncheckedCreateWithoutUserInput>
  }

  export type ConversationUpdateWithWhereUniqueWithoutUserInput = {
    where: ConversationWhereUniqueInput
    data: XOR<ConversationUpdateWithoutUserInput, ConversationUncheckedUpdateWithoutUserInput>
  }

  export type ConversationUpdateManyWithWhereWithoutUserInput = {
    where: ConversationScalarWhereInput
    data: XOR<ConversationUpdateManyMutationInput, ConversationUncheckedUpdateManyWithoutUserInput>
  }

  export type ConversationScalarWhereInput = {
    AND?: ConversationScalarWhereInput | ConversationScalarWhereInput[]
    OR?: ConversationScalarWhereInput[]
    NOT?: ConversationScalarWhereInput | ConversationScalarWhereInput[]
    id?: StringFilter<"Conversation"> | string
    userId?: StringFilter<"Conversation"> | string
    title?: StringNullableFilter<"Conversation"> | string | null
    createdAt?: DateTimeFilter<"Conversation"> | Date | string
    updatedAt?: DateTimeFilter<"Conversation"> | Date | string
  }

  export type OAuthTokenUpsertWithWhereUniqueWithoutUserInput = {
    where: OAuthTokenWhereUniqueInput
    update: XOR<OAuthTokenUpdateWithoutUserInput, OAuthTokenUncheckedUpdateWithoutUserInput>
    create: XOR<OAuthTokenCreateWithoutUserInput, OAuthTokenUncheckedCreateWithoutUserInput>
  }

  export type OAuthTokenUpdateWithWhereUniqueWithoutUserInput = {
    where: OAuthTokenWhereUniqueInput
    data: XOR<OAuthTokenUpdateWithoutUserInput, OAuthTokenUncheckedUpdateWithoutUserInput>
  }

  export type OAuthTokenUpdateManyWithWhereWithoutUserInput = {
    where: OAuthTokenScalarWhereInput
    data: XOR<OAuthTokenUpdateManyMutationInput, OAuthTokenUncheckedUpdateManyWithoutUserInput>
  }

  export type OAuthTokenScalarWhereInput = {
    AND?: OAuthTokenScalarWhereInput | OAuthTokenScalarWhereInput[]
    OR?: OAuthTokenScalarWhereInput[]
    NOT?: OAuthTokenScalarWhereInput | OAuthTokenScalarWhereInput[]
    id?: StringFilter<"OAuthToken"> | string
    userId?: StringFilter<"OAuthToken"> | string
    provider?: StringFilter<"OAuthToken"> | string
    accessToken?: StringFilter<"OAuthToken"> | string
    refreshToken?: StringNullableFilter<"OAuthToken"> | string | null
    expiresAt?: DateTimeNullableFilter<"OAuthToken"> | Date | string | null
    createdAt?: DateTimeFilter<"OAuthToken"> | Date | string
    updatedAt?: DateTimeFilter<"OAuthToken"> | Date | string
  }

  export type ArtifactUpsertWithWhereUniqueWithoutUserInput = {
    where: ArtifactWhereUniqueInput
    update: XOR<ArtifactUpdateWithoutUserInput, ArtifactUncheckedUpdateWithoutUserInput>
    create: XOR<ArtifactCreateWithoutUserInput, ArtifactUncheckedCreateWithoutUserInput>
  }

  export type ArtifactUpdateWithWhereUniqueWithoutUserInput = {
    where: ArtifactWhereUniqueInput
    data: XOR<ArtifactUpdateWithoutUserInput, ArtifactUncheckedUpdateWithoutUserInput>
  }

  export type ArtifactUpdateManyWithWhereWithoutUserInput = {
    where: ArtifactScalarWhereInput
    data: XOR<ArtifactUpdateManyMutationInput, ArtifactUncheckedUpdateManyWithoutUserInput>
  }

  export type ArtifactScalarWhereInput = {
    AND?: ArtifactScalarWhereInput | ArtifactScalarWhereInput[]
    OR?: ArtifactScalarWhereInput[]
    NOT?: ArtifactScalarWhereInput | ArtifactScalarWhereInput[]
    id?: StringFilter<"Artifact"> | string
    userId?: StringFilter<"Artifact"> | string
    type?: StringFilter<"Artifact"> | string
    name?: StringNullableFilter<"Artifact"> | string | null
    mimeType?: StringNullableFilter<"Artifact"> | string | null
    storagePath?: StringNullableFilter<"Artifact"> | string | null
    textContent?: StringNullableFilter<"Artifact"> | string | null
    jsonContent?: JsonNullableFilter<"Artifact">
    metadata?: JsonNullableFilter<"Artifact">
    createdAt?: DateTimeFilter<"Artifact"> | Date | string
    updatedAt?: DateTimeFilter<"Artifact"> | Date | string
  }

  export type WorkflowRunUpsertWithWhereUniqueWithoutUserInput = {
    where: WorkflowRunWhereUniqueInput
    update: XOR<WorkflowRunUpdateWithoutUserInput, WorkflowRunUncheckedUpdateWithoutUserInput>
    create: XOR<WorkflowRunCreateWithoutUserInput, WorkflowRunUncheckedCreateWithoutUserInput>
  }

  export type WorkflowRunUpdateWithWhereUniqueWithoutUserInput = {
    where: WorkflowRunWhereUniqueInput
    data: XOR<WorkflowRunUpdateWithoutUserInput, WorkflowRunUncheckedUpdateWithoutUserInput>
  }

  export type WorkflowRunUpdateManyWithWhereWithoutUserInput = {
    where: WorkflowRunScalarWhereInput
    data: XOR<WorkflowRunUpdateManyMutationInput, WorkflowRunUncheckedUpdateManyWithoutUserInput>
  }

  export type WorkflowRunScalarWhereInput = {
    AND?: WorkflowRunScalarWhereInput | WorkflowRunScalarWhereInput[]
    OR?: WorkflowRunScalarWhereInput[]
    NOT?: WorkflowRunScalarWhereInput | WorkflowRunScalarWhereInput[]
    id?: StringFilter<"WorkflowRun"> | string
    userId?: StringFilter<"WorkflowRun"> | string
    conversationId?: StringNullableFilter<"WorkflowRun"> | string | null
    prompt?: StringFilter<"WorkflowRun"> | string
    status?: EnumWorkflowRunStatusFilter<"WorkflowRun"> | $Enums.WorkflowRunStatus
    model?: StringNullableFilter<"WorkflowRun"> | string | null
    maxSteps?: IntNullableFilter<"WorkflowRun"> | number | null
    startedAt?: DateTimeNullableFilter<"WorkflowRun"> | Date | string | null
    endedAt?: DateTimeNullableFilter<"WorkflowRun"> | Date | string | null
    finalAnswer?: StringNullableFilter<"WorkflowRun"> | string | null
    errorClass?: StringNullableFilter<"WorkflowRun"> | string | null
    errorMessage?: StringNullableFilter<"WorkflowRun"> | string | null
    metadata?: JsonNullableFilter<"WorkflowRun">
    createdAt?: DateTimeFilter<"WorkflowRun"> | Date | string
    updatedAt?: DateTimeFilter<"WorkflowRun"> | Date | string
  }

  export type UserCreateWithoutConversationsInput = {
    id?: string
    email: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    password: string
    oauthTokens?: OAuthTokenCreateNestedManyWithoutUserInput
    artifacts?: ArtifactCreateNestedManyWithoutUserInput
    workflowRuns?: WorkflowRunCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutConversationsInput = {
    id?: string
    email: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    password: string
    oauthTokens?: OAuthTokenUncheckedCreateNestedManyWithoutUserInput
    artifacts?: ArtifactUncheckedCreateNestedManyWithoutUserInput
    workflowRuns?: WorkflowRunUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutConversationsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutConversationsInput, UserUncheckedCreateWithoutConversationsInput>
  }

  export type MessageCreateWithoutConversationInput = {
    id?: string
    role: string
    content: string
    toolCallId?: string | null
    toolName?: string | null
    createdAt?: Date | string
  }

  export type MessageUncheckedCreateWithoutConversationInput = {
    id?: string
    role: string
    content: string
    toolCallId?: string | null
    toolName?: string | null
    createdAt?: Date | string
  }

  export type MessageCreateOrConnectWithoutConversationInput = {
    where: MessageWhereUniqueInput
    create: XOR<MessageCreateWithoutConversationInput, MessageUncheckedCreateWithoutConversationInput>
  }

  export type MessageCreateManyConversationInputEnvelope = {
    data: MessageCreateManyConversationInput | MessageCreateManyConversationInput[]
    skipDuplicates?: boolean
  }

  export type WorkflowRunCreateWithoutConversationInput = {
    id?: string
    prompt: string
    status?: $Enums.WorkflowRunStatus
    model?: string | null
    maxSteps?: number | null
    startedAt?: Date | string | null
    endedAt?: Date | string | null
    finalAnswer?: string | null
    errorClass?: string | null
    errorMessage?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutWorkflowRunsInput
    steps?: WorkflowStepCreateNestedManyWithoutRunInput
    events?: WorkflowEventCreateNestedManyWithoutRunInput
    checkpoints?: WorkflowCheckpointCreateNestedManyWithoutRunInput
    messages?: RunMessageCreateNestedManyWithoutRunInput
  }

  export type WorkflowRunUncheckedCreateWithoutConversationInput = {
    id?: string
    userId: string
    prompt: string
    status?: $Enums.WorkflowRunStatus
    model?: string | null
    maxSteps?: number | null
    startedAt?: Date | string | null
    endedAt?: Date | string | null
    finalAnswer?: string | null
    errorClass?: string | null
    errorMessage?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    steps?: WorkflowStepUncheckedCreateNestedManyWithoutRunInput
    events?: WorkflowEventUncheckedCreateNestedManyWithoutRunInput
    checkpoints?: WorkflowCheckpointUncheckedCreateNestedManyWithoutRunInput
    messages?: RunMessageUncheckedCreateNestedManyWithoutRunInput
  }

  export type WorkflowRunCreateOrConnectWithoutConversationInput = {
    where: WorkflowRunWhereUniqueInput
    create: XOR<WorkflowRunCreateWithoutConversationInput, WorkflowRunUncheckedCreateWithoutConversationInput>
  }

  export type WorkflowRunCreateManyConversationInputEnvelope = {
    data: WorkflowRunCreateManyConversationInput | WorkflowRunCreateManyConversationInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutConversationsInput = {
    update: XOR<UserUpdateWithoutConversationsInput, UserUncheckedUpdateWithoutConversationsInput>
    create: XOR<UserCreateWithoutConversationsInput, UserUncheckedCreateWithoutConversationsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutConversationsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutConversationsInput, UserUncheckedUpdateWithoutConversationsInput>
  }

  export type UserUpdateWithoutConversationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    password?: StringFieldUpdateOperationsInput | string
    oauthTokens?: OAuthTokenUpdateManyWithoutUserNestedInput
    artifacts?: ArtifactUpdateManyWithoutUserNestedInput
    workflowRuns?: WorkflowRunUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutConversationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    password?: StringFieldUpdateOperationsInput | string
    oauthTokens?: OAuthTokenUncheckedUpdateManyWithoutUserNestedInput
    artifacts?: ArtifactUncheckedUpdateManyWithoutUserNestedInput
    workflowRuns?: WorkflowRunUncheckedUpdateManyWithoutUserNestedInput
  }

  export type MessageUpsertWithWhereUniqueWithoutConversationInput = {
    where: MessageWhereUniqueInput
    update: XOR<MessageUpdateWithoutConversationInput, MessageUncheckedUpdateWithoutConversationInput>
    create: XOR<MessageCreateWithoutConversationInput, MessageUncheckedCreateWithoutConversationInput>
  }

  export type MessageUpdateWithWhereUniqueWithoutConversationInput = {
    where: MessageWhereUniqueInput
    data: XOR<MessageUpdateWithoutConversationInput, MessageUncheckedUpdateWithoutConversationInput>
  }

  export type MessageUpdateManyWithWhereWithoutConversationInput = {
    where: MessageScalarWhereInput
    data: XOR<MessageUpdateManyMutationInput, MessageUncheckedUpdateManyWithoutConversationInput>
  }

  export type MessageScalarWhereInput = {
    AND?: MessageScalarWhereInput | MessageScalarWhereInput[]
    OR?: MessageScalarWhereInput[]
    NOT?: MessageScalarWhereInput | MessageScalarWhereInput[]
    id?: StringFilter<"Message"> | string
    conversationId?: StringFilter<"Message"> | string
    role?: StringFilter<"Message"> | string
    content?: StringFilter<"Message"> | string
    toolCallId?: StringNullableFilter<"Message"> | string | null
    toolName?: StringNullableFilter<"Message"> | string | null
    createdAt?: DateTimeFilter<"Message"> | Date | string
  }

  export type WorkflowRunUpsertWithWhereUniqueWithoutConversationInput = {
    where: WorkflowRunWhereUniqueInput
    update: XOR<WorkflowRunUpdateWithoutConversationInput, WorkflowRunUncheckedUpdateWithoutConversationInput>
    create: XOR<WorkflowRunCreateWithoutConversationInput, WorkflowRunUncheckedCreateWithoutConversationInput>
  }

  export type WorkflowRunUpdateWithWhereUniqueWithoutConversationInput = {
    where: WorkflowRunWhereUniqueInput
    data: XOR<WorkflowRunUpdateWithoutConversationInput, WorkflowRunUncheckedUpdateWithoutConversationInput>
  }

  export type WorkflowRunUpdateManyWithWhereWithoutConversationInput = {
    where: WorkflowRunScalarWhereInput
    data: XOR<WorkflowRunUpdateManyMutationInput, WorkflowRunUncheckedUpdateManyWithoutConversationInput>
  }

  export type ConversationCreateWithoutMessagesInput = {
    id?: string
    title?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutConversationsInput
    workflowRuns?: WorkflowRunCreateNestedManyWithoutConversationInput
  }

  export type ConversationUncheckedCreateWithoutMessagesInput = {
    id?: string
    userId: string
    title?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    workflowRuns?: WorkflowRunUncheckedCreateNestedManyWithoutConversationInput
  }

  export type ConversationCreateOrConnectWithoutMessagesInput = {
    where: ConversationWhereUniqueInput
    create: XOR<ConversationCreateWithoutMessagesInput, ConversationUncheckedCreateWithoutMessagesInput>
  }

  export type ConversationUpsertWithoutMessagesInput = {
    update: XOR<ConversationUpdateWithoutMessagesInput, ConversationUncheckedUpdateWithoutMessagesInput>
    create: XOR<ConversationCreateWithoutMessagesInput, ConversationUncheckedCreateWithoutMessagesInput>
    where?: ConversationWhereInput
  }

  export type ConversationUpdateToOneWithWhereWithoutMessagesInput = {
    where?: ConversationWhereInput
    data: XOR<ConversationUpdateWithoutMessagesInput, ConversationUncheckedUpdateWithoutMessagesInput>
  }

  export type ConversationUpdateWithoutMessagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutConversationsNestedInput
    workflowRuns?: WorkflowRunUpdateManyWithoutConversationNestedInput
  }

  export type ConversationUncheckedUpdateWithoutMessagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    workflowRuns?: WorkflowRunUncheckedUpdateManyWithoutConversationNestedInput
  }

  export type UserCreateWithoutOauthTokensInput = {
    id?: string
    email: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    password: string
    conversations?: ConversationCreateNestedManyWithoutUserInput
    artifacts?: ArtifactCreateNestedManyWithoutUserInput
    workflowRuns?: WorkflowRunCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutOauthTokensInput = {
    id?: string
    email: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    password: string
    conversations?: ConversationUncheckedCreateNestedManyWithoutUserInput
    artifacts?: ArtifactUncheckedCreateNestedManyWithoutUserInput
    workflowRuns?: WorkflowRunUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutOauthTokensInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutOauthTokensInput, UserUncheckedCreateWithoutOauthTokensInput>
  }

  export type UserUpsertWithoutOauthTokensInput = {
    update: XOR<UserUpdateWithoutOauthTokensInput, UserUncheckedUpdateWithoutOauthTokensInput>
    create: XOR<UserCreateWithoutOauthTokensInput, UserUncheckedCreateWithoutOauthTokensInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutOauthTokensInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutOauthTokensInput, UserUncheckedUpdateWithoutOauthTokensInput>
  }

  export type UserUpdateWithoutOauthTokensInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    password?: StringFieldUpdateOperationsInput | string
    conversations?: ConversationUpdateManyWithoutUserNestedInput
    artifacts?: ArtifactUpdateManyWithoutUserNestedInput
    workflowRuns?: WorkflowRunUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutOauthTokensInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    password?: StringFieldUpdateOperationsInput | string
    conversations?: ConversationUncheckedUpdateManyWithoutUserNestedInput
    artifacts?: ArtifactUncheckedUpdateManyWithoutUserNestedInput
    workflowRuns?: WorkflowRunUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutWorkflowRunsInput = {
    id?: string
    email: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    password: string
    conversations?: ConversationCreateNestedManyWithoutUserInput
    oauthTokens?: OAuthTokenCreateNestedManyWithoutUserInput
    artifacts?: ArtifactCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutWorkflowRunsInput = {
    id?: string
    email: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    password: string
    conversations?: ConversationUncheckedCreateNestedManyWithoutUserInput
    oauthTokens?: OAuthTokenUncheckedCreateNestedManyWithoutUserInput
    artifacts?: ArtifactUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutWorkflowRunsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutWorkflowRunsInput, UserUncheckedCreateWithoutWorkflowRunsInput>
  }

  export type ConversationCreateWithoutWorkflowRunsInput = {
    id?: string
    title?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutConversationsInput
    messages?: MessageCreateNestedManyWithoutConversationInput
  }

  export type ConversationUncheckedCreateWithoutWorkflowRunsInput = {
    id?: string
    userId: string
    title?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    messages?: MessageUncheckedCreateNestedManyWithoutConversationInput
  }

  export type ConversationCreateOrConnectWithoutWorkflowRunsInput = {
    where: ConversationWhereUniqueInput
    create: XOR<ConversationCreateWithoutWorkflowRunsInput, ConversationUncheckedCreateWithoutWorkflowRunsInput>
  }

  export type WorkflowStepCreateWithoutRunInput = {
    id?: string
    stepId: string
    stepType: $Enums.WorkflowStepType
    status?: $Enums.WorkflowStepStatus
    toolName?: string | null
    input?: NullableJsonNullValueInput | InputJsonValue
    output?: NullableJsonNullValueInput | InputJsonValue
    errorClass?: string | null
    errorMessage?: string | null
    retryCount?: number
    startedAt?: Date | string | null
    endedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    events?: WorkflowEventCreateNestedManyWithoutStepInput
    checkpoints?: WorkflowCheckpointCreateNestedManyWithoutStepInput
  }

  export type WorkflowStepUncheckedCreateWithoutRunInput = {
    id?: string
    stepId: string
    stepType: $Enums.WorkflowStepType
    status?: $Enums.WorkflowStepStatus
    toolName?: string | null
    input?: NullableJsonNullValueInput | InputJsonValue
    output?: NullableJsonNullValueInput | InputJsonValue
    errorClass?: string | null
    errorMessage?: string | null
    retryCount?: number
    startedAt?: Date | string | null
    endedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    events?: WorkflowEventUncheckedCreateNestedManyWithoutStepInput
    checkpoints?: WorkflowCheckpointUncheckedCreateNestedManyWithoutStepInput
  }

  export type WorkflowStepCreateOrConnectWithoutRunInput = {
    where: WorkflowStepWhereUniqueInput
    create: XOR<WorkflowStepCreateWithoutRunInput, WorkflowStepUncheckedCreateWithoutRunInput>
  }

  export type WorkflowStepCreateManyRunInputEnvelope = {
    data: WorkflowStepCreateManyRunInput | WorkflowStepCreateManyRunInput[]
    skipDuplicates?: boolean
  }

  export type WorkflowEventCreateWithoutRunInput = {
    id?: string
    eventType: string
    payload?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    step?: WorkflowStepCreateNestedOneWithoutEventsInput
  }

  export type WorkflowEventUncheckedCreateWithoutRunInput = {
    id?: string
    workflowStepId?: string | null
    eventType: string
    payload?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type WorkflowEventCreateOrConnectWithoutRunInput = {
    where: WorkflowEventWhereUniqueInput
    create: XOR<WorkflowEventCreateWithoutRunInput, WorkflowEventUncheckedCreateWithoutRunInput>
  }

  export type WorkflowEventCreateManyRunInputEnvelope = {
    data: WorkflowEventCreateManyRunInput | WorkflowEventCreateManyRunInput[]
    skipDuplicates?: boolean
  }

  export type WorkflowCheckpointCreateWithoutRunInput = {
    id?: string
    sequence: number
    snapshot: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    step?: WorkflowStepCreateNestedOneWithoutCheckpointsInput
  }

  export type WorkflowCheckpointUncheckedCreateWithoutRunInput = {
    id?: string
    workflowStepId?: string | null
    sequence: number
    snapshot: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type WorkflowCheckpointCreateOrConnectWithoutRunInput = {
    where: WorkflowCheckpointWhereUniqueInput
    create: XOR<WorkflowCheckpointCreateWithoutRunInput, WorkflowCheckpointUncheckedCreateWithoutRunInput>
  }

  export type WorkflowCheckpointCreateManyRunInputEnvelope = {
    data: WorkflowCheckpointCreateManyRunInput | WorkflowCheckpointCreateManyRunInput[]
    skipDuplicates?: boolean
  }

  export type RunMessageCreateWithoutRunInput = {
    id?: string
    role: string
    content: string
    toolName?: string | null
    toolCallId?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type RunMessageUncheckedCreateWithoutRunInput = {
    id?: string
    role: string
    content: string
    toolName?: string | null
    toolCallId?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type RunMessageCreateOrConnectWithoutRunInput = {
    where: RunMessageWhereUniqueInput
    create: XOR<RunMessageCreateWithoutRunInput, RunMessageUncheckedCreateWithoutRunInput>
  }

  export type RunMessageCreateManyRunInputEnvelope = {
    data: RunMessageCreateManyRunInput | RunMessageCreateManyRunInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutWorkflowRunsInput = {
    update: XOR<UserUpdateWithoutWorkflowRunsInput, UserUncheckedUpdateWithoutWorkflowRunsInput>
    create: XOR<UserCreateWithoutWorkflowRunsInput, UserUncheckedCreateWithoutWorkflowRunsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutWorkflowRunsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutWorkflowRunsInput, UserUncheckedUpdateWithoutWorkflowRunsInput>
  }

  export type UserUpdateWithoutWorkflowRunsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    password?: StringFieldUpdateOperationsInput | string
    conversations?: ConversationUpdateManyWithoutUserNestedInput
    oauthTokens?: OAuthTokenUpdateManyWithoutUserNestedInput
    artifacts?: ArtifactUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutWorkflowRunsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    password?: StringFieldUpdateOperationsInput | string
    conversations?: ConversationUncheckedUpdateManyWithoutUserNestedInput
    oauthTokens?: OAuthTokenUncheckedUpdateManyWithoutUserNestedInput
    artifacts?: ArtifactUncheckedUpdateManyWithoutUserNestedInput
  }

  export type ConversationUpsertWithoutWorkflowRunsInput = {
    update: XOR<ConversationUpdateWithoutWorkflowRunsInput, ConversationUncheckedUpdateWithoutWorkflowRunsInput>
    create: XOR<ConversationCreateWithoutWorkflowRunsInput, ConversationUncheckedCreateWithoutWorkflowRunsInput>
    where?: ConversationWhereInput
  }

  export type ConversationUpdateToOneWithWhereWithoutWorkflowRunsInput = {
    where?: ConversationWhereInput
    data: XOR<ConversationUpdateWithoutWorkflowRunsInput, ConversationUncheckedUpdateWithoutWorkflowRunsInput>
  }

  export type ConversationUpdateWithoutWorkflowRunsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutConversationsNestedInput
    messages?: MessageUpdateManyWithoutConversationNestedInput
  }

  export type ConversationUncheckedUpdateWithoutWorkflowRunsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    messages?: MessageUncheckedUpdateManyWithoutConversationNestedInput
  }

  export type WorkflowStepUpsertWithWhereUniqueWithoutRunInput = {
    where: WorkflowStepWhereUniqueInput
    update: XOR<WorkflowStepUpdateWithoutRunInput, WorkflowStepUncheckedUpdateWithoutRunInput>
    create: XOR<WorkflowStepCreateWithoutRunInput, WorkflowStepUncheckedCreateWithoutRunInput>
  }

  export type WorkflowStepUpdateWithWhereUniqueWithoutRunInput = {
    where: WorkflowStepWhereUniqueInput
    data: XOR<WorkflowStepUpdateWithoutRunInput, WorkflowStepUncheckedUpdateWithoutRunInput>
  }

  export type WorkflowStepUpdateManyWithWhereWithoutRunInput = {
    where: WorkflowStepScalarWhereInput
    data: XOR<WorkflowStepUpdateManyMutationInput, WorkflowStepUncheckedUpdateManyWithoutRunInput>
  }

  export type WorkflowStepScalarWhereInput = {
    AND?: WorkflowStepScalarWhereInput | WorkflowStepScalarWhereInput[]
    OR?: WorkflowStepScalarWhereInput[]
    NOT?: WorkflowStepScalarWhereInput | WorkflowStepScalarWhereInput[]
    id?: StringFilter<"WorkflowStep"> | string
    runId?: StringFilter<"WorkflowStep"> | string
    stepId?: StringFilter<"WorkflowStep"> | string
    stepType?: EnumWorkflowStepTypeFilter<"WorkflowStep"> | $Enums.WorkflowStepType
    status?: EnumWorkflowStepStatusFilter<"WorkflowStep"> | $Enums.WorkflowStepStatus
    toolName?: StringNullableFilter<"WorkflowStep"> | string | null
    input?: JsonNullableFilter<"WorkflowStep">
    output?: JsonNullableFilter<"WorkflowStep">
    errorClass?: StringNullableFilter<"WorkflowStep"> | string | null
    errorMessage?: StringNullableFilter<"WorkflowStep"> | string | null
    retryCount?: IntFilter<"WorkflowStep"> | number
    startedAt?: DateTimeNullableFilter<"WorkflowStep"> | Date | string | null
    endedAt?: DateTimeNullableFilter<"WorkflowStep"> | Date | string | null
    createdAt?: DateTimeFilter<"WorkflowStep"> | Date | string
    updatedAt?: DateTimeFilter<"WorkflowStep"> | Date | string
  }

  export type WorkflowEventUpsertWithWhereUniqueWithoutRunInput = {
    where: WorkflowEventWhereUniqueInput
    update: XOR<WorkflowEventUpdateWithoutRunInput, WorkflowEventUncheckedUpdateWithoutRunInput>
    create: XOR<WorkflowEventCreateWithoutRunInput, WorkflowEventUncheckedCreateWithoutRunInput>
  }

  export type WorkflowEventUpdateWithWhereUniqueWithoutRunInput = {
    where: WorkflowEventWhereUniqueInput
    data: XOR<WorkflowEventUpdateWithoutRunInput, WorkflowEventUncheckedUpdateWithoutRunInput>
  }

  export type WorkflowEventUpdateManyWithWhereWithoutRunInput = {
    where: WorkflowEventScalarWhereInput
    data: XOR<WorkflowEventUpdateManyMutationInput, WorkflowEventUncheckedUpdateManyWithoutRunInput>
  }

  export type WorkflowEventScalarWhereInput = {
    AND?: WorkflowEventScalarWhereInput | WorkflowEventScalarWhereInput[]
    OR?: WorkflowEventScalarWhereInput[]
    NOT?: WorkflowEventScalarWhereInput | WorkflowEventScalarWhereInput[]
    id?: StringFilter<"WorkflowEvent"> | string
    runId?: StringFilter<"WorkflowEvent"> | string
    workflowStepId?: StringNullableFilter<"WorkflowEvent"> | string | null
    eventType?: StringFilter<"WorkflowEvent"> | string
    payload?: JsonNullableFilter<"WorkflowEvent">
    createdAt?: DateTimeFilter<"WorkflowEvent"> | Date | string
  }

  export type WorkflowCheckpointUpsertWithWhereUniqueWithoutRunInput = {
    where: WorkflowCheckpointWhereUniqueInput
    update: XOR<WorkflowCheckpointUpdateWithoutRunInput, WorkflowCheckpointUncheckedUpdateWithoutRunInput>
    create: XOR<WorkflowCheckpointCreateWithoutRunInput, WorkflowCheckpointUncheckedCreateWithoutRunInput>
  }

  export type WorkflowCheckpointUpdateWithWhereUniqueWithoutRunInput = {
    where: WorkflowCheckpointWhereUniqueInput
    data: XOR<WorkflowCheckpointUpdateWithoutRunInput, WorkflowCheckpointUncheckedUpdateWithoutRunInput>
  }

  export type WorkflowCheckpointUpdateManyWithWhereWithoutRunInput = {
    where: WorkflowCheckpointScalarWhereInput
    data: XOR<WorkflowCheckpointUpdateManyMutationInput, WorkflowCheckpointUncheckedUpdateManyWithoutRunInput>
  }

  export type WorkflowCheckpointScalarWhereInput = {
    AND?: WorkflowCheckpointScalarWhereInput | WorkflowCheckpointScalarWhereInput[]
    OR?: WorkflowCheckpointScalarWhereInput[]
    NOT?: WorkflowCheckpointScalarWhereInput | WorkflowCheckpointScalarWhereInput[]
    id?: StringFilter<"WorkflowCheckpoint"> | string
    runId?: StringFilter<"WorkflowCheckpoint"> | string
    workflowStepId?: StringNullableFilter<"WorkflowCheckpoint"> | string | null
    sequence?: IntFilter<"WorkflowCheckpoint"> | number
    snapshot?: JsonFilter<"WorkflowCheckpoint">
    createdAt?: DateTimeFilter<"WorkflowCheckpoint"> | Date | string
  }

  export type RunMessageUpsertWithWhereUniqueWithoutRunInput = {
    where: RunMessageWhereUniqueInput
    update: XOR<RunMessageUpdateWithoutRunInput, RunMessageUncheckedUpdateWithoutRunInput>
    create: XOR<RunMessageCreateWithoutRunInput, RunMessageUncheckedCreateWithoutRunInput>
  }

  export type RunMessageUpdateWithWhereUniqueWithoutRunInput = {
    where: RunMessageWhereUniqueInput
    data: XOR<RunMessageUpdateWithoutRunInput, RunMessageUncheckedUpdateWithoutRunInput>
  }

  export type RunMessageUpdateManyWithWhereWithoutRunInput = {
    where: RunMessageScalarWhereInput
    data: XOR<RunMessageUpdateManyMutationInput, RunMessageUncheckedUpdateManyWithoutRunInput>
  }

  export type RunMessageScalarWhereInput = {
    AND?: RunMessageScalarWhereInput | RunMessageScalarWhereInput[]
    OR?: RunMessageScalarWhereInput[]
    NOT?: RunMessageScalarWhereInput | RunMessageScalarWhereInput[]
    id?: StringFilter<"RunMessage"> | string
    runId?: StringFilter<"RunMessage"> | string
    role?: StringFilter<"RunMessage"> | string
    content?: StringFilter<"RunMessage"> | string
    toolName?: StringNullableFilter<"RunMessage"> | string | null
    toolCallId?: StringNullableFilter<"RunMessage"> | string | null
    metadata?: JsonNullableFilter<"RunMessage">
    createdAt?: DateTimeFilter<"RunMessage"> | Date | string
  }

  export type WorkflowRunCreateWithoutStepsInput = {
    id?: string
    prompt: string
    status?: $Enums.WorkflowRunStatus
    model?: string | null
    maxSteps?: number | null
    startedAt?: Date | string | null
    endedAt?: Date | string | null
    finalAnswer?: string | null
    errorClass?: string | null
    errorMessage?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutWorkflowRunsInput
    conversation?: ConversationCreateNestedOneWithoutWorkflowRunsInput
    events?: WorkflowEventCreateNestedManyWithoutRunInput
    checkpoints?: WorkflowCheckpointCreateNestedManyWithoutRunInput
    messages?: RunMessageCreateNestedManyWithoutRunInput
  }

  export type WorkflowRunUncheckedCreateWithoutStepsInput = {
    id?: string
    userId: string
    conversationId?: string | null
    prompt: string
    status?: $Enums.WorkflowRunStatus
    model?: string | null
    maxSteps?: number | null
    startedAt?: Date | string | null
    endedAt?: Date | string | null
    finalAnswer?: string | null
    errorClass?: string | null
    errorMessage?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    events?: WorkflowEventUncheckedCreateNestedManyWithoutRunInput
    checkpoints?: WorkflowCheckpointUncheckedCreateNestedManyWithoutRunInput
    messages?: RunMessageUncheckedCreateNestedManyWithoutRunInput
  }

  export type WorkflowRunCreateOrConnectWithoutStepsInput = {
    where: WorkflowRunWhereUniqueInput
    create: XOR<WorkflowRunCreateWithoutStepsInput, WorkflowRunUncheckedCreateWithoutStepsInput>
  }

  export type WorkflowEventCreateWithoutStepInput = {
    id?: string
    eventType: string
    payload?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    run: WorkflowRunCreateNestedOneWithoutEventsInput
  }

  export type WorkflowEventUncheckedCreateWithoutStepInput = {
    id?: string
    runId: string
    eventType: string
    payload?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type WorkflowEventCreateOrConnectWithoutStepInput = {
    where: WorkflowEventWhereUniqueInput
    create: XOR<WorkflowEventCreateWithoutStepInput, WorkflowEventUncheckedCreateWithoutStepInput>
  }

  export type WorkflowEventCreateManyStepInputEnvelope = {
    data: WorkflowEventCreateManyStepInput | WorkflowEventCreateManyStepInput[]
    skipDuplicates?: boolean
  }

  export type WorkflowCheckpointCreateWithoutStepInput = {
    id?: string
    sequence: number
    snapshot: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    run: WorkflowRunCreateNestedOneWithoutCheckpointsInput
  }

  export type WorkflowCheckpointUncheckedCreateWithoutStepInput = {
    id?: string
    runId: string
    sequence: number
    snapshot: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type WorkflowCheckpointCreateOrConnectWithoutStepInput = {
    where: WorkflowCheckpointWhereUniqueInput
    create: XOR<WorkflowCheckpointCreateWithoutStepInput, WorkflowCheckpointUncheckedCreateWithoutStepInput>
  }

  export type WorkflowCheckpointCreateManyStepInputEnvelope = {
    data: WorkflowCheckpointCreateManyStepInput | WorkflowCheckpointCreateManyStepInput[]
    skipDuplicates?: boolean
  }

  export type WorkflowRunUpsertWithoutStepsInput = {
    update: XOR<WorkflowRunUpdateWithoutStepsInput, WorkflowRunUncheckedUpdateWithoutStepsInput>
    create: XOR<WorkflowRunCreateWithoutStepsInput, WorkflowRunUncheckedCreateWithoutStepsInput>
    where?: WorkflowRunWhereInput
  }

  export type WorkflowRunUpdateToOneWithWhereWithoutStepsInput = {
    where?: WorkflowRunWhereInput
    data: XOR<WorkflowRunUpdateWithoutStepsInput, WorkflowRunUncheckedUpdateWithoutStepsInput>
  }

  export type WorkflowRunUpdateWithoutStepsInput = {
    id?: StringFieldUpdateOperationsInput | string
    prompt?: StringFieldUpdateOperationsInput | string
    status?: EnumWorkflowRunStatusFieldUpdateOperationsInput | $Enums.WorkflowRunStatus
    model?: NullableStringFieldUpdateOperationsInput | string | null
    maxSteps?: NullableIntFieldUpdateOperationsInput | number | null
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    finalAnswer?: NullableStringFieldUpdateOperationsInput | string | null
    errorClass?: NullableStringFieldUpdateOperationsInput | string | null
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutWorkflowRunsNestedInput
    conversation?: ConversationUpdateOneWithoutWorkflowRunsNestedInput
    events?: WorkflowEventUpdateManyWithoutRunNestedInput
    checkpoints?: WorkflowCheckpointUpdateManyWithoutRunNestedInput
    messages?: RunMessageUpdateManyWithoutRunNestedInput
  }

  export type WorkflowRunUncheckedUpdateWithoutStepsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    conversationId?: NullableStringFieldUpdateOperationsInput | string | null
    prompt?: StringFieldUpdateOperationsInput | string
    status?: EnumWorkflowRunStatusFieldUpdateOperationsInput | $Enums.WorkflowRunStatus
    model?: NullableStringFieldUpdateOperationsInput | string | null
    maxSteps?: NullableIntFieldUpdateOperationsInput | number | null
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    finalAnswer?: NullableStringFieldUpdateOperationsInput | string | null
    errorClass?: NullableStringFieldUpdateOperationsInput | string | null
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    events?: WorkflowEventUncheckedUpdateManyWithoutRunNestedInput
    checkpoints?: WorkflowCheckpointUncheckedUpdateManyWithoutRunNestedInput
    messages?: RunMessageUncheckedUpdateManyWithoutRunNestedInput
  }

  export type WorkflowEventUpsertWithWhereUniqueWithoutStepInput = {
    where: WorkflowEventWhereUniqueInput
    update: XOR<WorkflowEventUpdateWithoutStepInput, WorkflowEventUncheckedUpdateWithoutStepInput>
    create: XOR<WorkflowEventCreateWithoutStepInput, WorkflowEventUncheckedCreateWithoutStepInput>
  }

  export type WorkflowEventUpdateWithWhereUniqueWithoutStepInput = {
    where: WorkflowEventWhereUniqueInput
    data: XOR<WorkflowEventUpdateWithoutStepInput, WorkflowEventUncheckedUpdateWithoutStepInput>
  }

  export type WorkflowEventUpdateManyWithWhereWithoutStepInput = {
    where: WorkflowEventScalarWhereInput
    data: XOR<WorkflowEventUpdateManyMutationInput, WorkflowEventUncheckedUpdateManyWithoutStepInput>
  }

  export type WorkflowCheckpointUpsertWithWhereUniqueWithoutStepInput = {
    where: WorkflowCheckpointWhereUniqueInput
    update: XOR<WorkflowCheckpointUpdateWithoutStepInput, WorkflowCheckpointUncheckedUpdateWithoutStepInput>
    create: XOR<WorkflowCheckpointCreateWithoutStepInput, WorkflowCheckpointUncheckedCreateWithoutStepInput>
  }

  export type WorkflowCheckpointUpdateWithWhereUniqueWithoutStepInput = {
    where: WorkflowCheckpointWhereUniqueInput
    data: XOR<WorkflowCheckpointUpdateWithoutStepInput, WorkflowCheckpointUncheckedUpdateWithoutStepInput>
  }

  export type WorkflowCheckpointUpdateManyWithWhereWithoutStepInput = {
    where: WorkflowCheckpointScalarWhereInput
    data: XOR<WorkflowCheckpointUpdateManyMutationInput, WorkflowCheckpointUncheckedUpdateManyWithoutStepInput>
  }

  export type WorkflowRunCreateWithoutEventsInput = {
    id?: string
    prompt: string
    status?: $Enums.WorkflowRunStatus
    model?: string | null
    maxSteps?: number | null
    startedAt?: Date | string | null
    endedAt?: Date | string | null
    finalAnswer?: string | null
    errorClass?: string | null
    errorMessage?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutWorkflowRunsInput
    conversation?: ConversationCreateNestedOneWithoutWorkflowRunsInput
    steps?: WorkflowStepCreateNestedManyWithoutRunInput
    checkpoints?: WorkflowCheckpointCreateNestedManyWithoutRunInput
    messages?: RunMessageCreateNestedManyWithoutRunInput
  }

  export type WorkflowRunUncheckedCreateWithoutEventsInput = {
    id?: string
    userId: string
    conversationId?: string | null
    prompt: string
    status?: $Enums.WorkflowRunStatus
    model?: string | null
    maxSteps?: number | null
    startedAt?: Date | string | null
    endedAt?: Date | string | null
    finalAnswer?: string | null
    errorClass?: string | null
    errorMessage?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    steps?: WorkflowStepUncheckedCreateNestedManyWithoutRunInput
    checkpoints?: WorkflowCheckpointUncheckedCreateNestedManyWithoutRunInput
    messages?: RunMessageUncheckedCreateNestedManyWithoutRunInput
  }

  export type WorkflowRunCreateOrConnectWithoutEventsInput = {
    where: WorkflowRunWhereUniqueInput
    create: XOR<WorkflowRunCreateWithoutEventsInput, WorkflowRunUncheckedCreateWithoutEventsInput>
  }

  export type WorkflowStepCreateWithoutEventsInput = {
    id?: string
    stepId: string
    stepType: $Enums.WorkflowStepType
    status?: $Enums.WorkflowStepStatus
    toolName?: string | null
    input?: NullableJsonNullValueInput | InputJsonValue
    output?: NullableJsonNullValueInput | InputJsonValue
    errorClass?: string | null
    errorMessage?: string | null
    retryCount?: number
    startedAt?: Date | string | null
    endedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    run: WorkflowRunCreateNestedOneWithoutStepsInput
    checkpoints?: WorkflowCheckpointCreateNestedManyWithoutStepInput
  }

  export type WorkflowStepUncheckedCreateWithoutEventsInput = {
    id?: string
    runId: string
    stepId: string
    stepType: $Enums.WorkflowStepType
    status?: $Enums.WorkflowStepStatus
    toolName?: string | null
    input?: NullableJsonNullValueInput | InputJsonValue
    output?: NullableJsonNullValueInput | InputJsonValue
    errorClass?: string | null
    errorMessage?: string | null
    retryCount?: number
    startedAt?: Date | string | null
    endedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    checkpoints?: WorkflowCheckpointUncheckedCreateNestedManyWithoutStepInput
  }

  export type WorkflowStepCreateOrConnectWithoutEventsInput = {
    where: WorkflowStepWhereUniqueInput
    create: XOR<WorkflowStepCreateWithoutEventsInput, WorkflowStepUncheckedCreateWithoutEventsInput>
  }

  export type WorkflowRunUpsertWithoutEventsInput = {
    update: XOR<WorkflowRunUpdateWithoutEventsInput, WorkflowRunUncheckedUpdateWithoutEventsInput>
    create: XOR<WorkflowRunCreateWithoutEventsInput, WorkflowRunUncheckedCreateWithoutEventsInput>
    where?: WorkflowRunWhereInput
  }

  export type WorkflowRunUpdateToOneWithWhereWithoutEventsInput = {
    where?: WorkflowRunWhereInput
    data: XOR<WorkflowRunUpdateWithoutEventsInput, WorkflowRunUncheckedUpdateWithoutEventsInput>
  }

  export type WorkflowRunUpdateWithoutEventsInput = {
    id?: StringFieldUpdateOperationsInput | string
    prompt?: StringFieldUpdateOperationsInput | string
    status?: EnumWorkflowRunStatusFieldUpdateOperationsInput | $Enums.WorkflowRunStatus
    model?: NullableStringFieldUpdateOperationsInput | string | null
    maxSteps?: NullableIntFieldUpdateOperationsInput | number | null
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    finalAnswer?: NullableStringFieldUpdateOperationsInput | string | null
    errorClass?: NullableStringFieldUpdateOperationsInput | string | null
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutWorkflowRunsNestedInput
    conversation?: ConversationUpdateOneWithoutWorkflowRunsNestedInput
    steps?: WorkflowStepUpdateManyWithoutRunNestedInput
    checkpoints?: WorkflowCheckpointUpdateManyWithoutRunNestedInput
    messages?: RunMessageUpdateManyWithoutRunNestedInput
  }

  export type WorkflowRunUncheckedUpdateWithoutEventsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    conversationId?: NullableStringFieldUpdateOperationsInput | string | null
    prompt?: StringFieldUpdateOperationsInput | string
    status?: EnumWorkflowRunStatusFieldUpdateOperationsInput | $Enums.WorkflowRunStatus
    model?: NullableStringFieldUpdateOperationsInput | string | null
    maxSteps?: NullableIntFieldUpdateOperationsInput | number | null
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    finalAnswer?: NullableStringFieldUpdateOperationsInput | string | null
    errorClass?: NullableStringFieldUpdateOperationsInput | string | null
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    steps?: WorkflowStepUncheckedUpdateManyWithoutRunNestedInput
    checkpoints?: WorkflowCheckpointUncheckedUpdateManyWithoutRunNestedInput
    messages?: RunMessageUncheckedUpdateManyWithoutRunNestedInput
  }

  export type WorkflowStepUpsertWithoutEventsInput = {
    update: XOR<WorkflowStepUpdateWithoutEventsInput, WorkflowStepUncheckedUpdateWithoutEventsInput>
    create: XOR<WorkflowStepCreateWithoutEventsInput, WorkflowStepUncheckedCreateWithoutEventsInput>
    where?: WorkflowStepWhereInput
  }

  export type WorkflowStepUpdateToOneWithWhereWithoutEventsInput = {
    where?: WorkflowStepWhereInput
    data: XOR<WorkflowStepUpdateWithoutEventsInput, WorkflowStepUncheckedUpdateWithoutEventsInput>
  }

  export type WorkflowStepUpdateWithoutEventsInput = {
    id?: StringFieldUpdateOperationsInput | string
    stepId?: StringFieldUpdateOperationsInput | string
    stepType?: EnumWorkflowStepTypeFieldUpdateOperationsInput | $Enums.WorkflowStepType
    status?: EnumWorkflowStepStatusFieldUpdateOperationsInput | $Enums.WorkflowStepStatus
    toolName?: NullableStringFieldUpdateOperationsInput | string | null
    input?: NullableJsonNullValueInput | InputJsonValue
    output?: NullableJsonNullValueInput | InputJsonValue
    errorClass?: NullableStringFieldUpdateOperationsInput | string | null
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    retryCount?: IntFieldUpdateOperationsInput | number
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    run?: WorkflowRunUpdateOneRequiredWithoutStepsNestedInput
    checkpoints?: WorkflowCheckpointUpdateManyWithoutStepNestedInput
  }

  export type WorkflowStepUncheckedUpdateWithoutEventsInput = {
    id?: StringFieldUpdateOperationsInput | string
    runId?: StringFieldUpdateOperationsInput | string
    stepId?: StringFieldUpdateOperationsInput | string
    stepType?: EnumWorkflowStepTypeFieldUpdateOperationsInput | $Enums.WorkflowStepType
    status?: EnumWorkflowStepStatusFieldUpdateOperationsInput | $Enums.WorkflowStepStatus
    toolName?: NullableStringFieldUpdateOperationsInput | string | null
    input?: NullableJsonNullValueInput | InputJsonValue
    output?: NullableJsonNullValueInput | InputJsonValue
    errorClass?: NullableStringFieldUpdateOperationsInput | string | null
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    retryCount?: IntFieldUpdateOperationsInput | number
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    checkpoints?: WorkflowCheckpointUncheckedUpdateManyWithoutStepNestedInput
  }

  export type WorkflowRunCreateWithoutCheckpointsInput = {
    id?: string
    prompt: string
    status?: $Enums.WorkflowRunStatus
    model?: string | null
    maxSteps?: number | null
    startedAt?: Date | string | null
    endedAt?: Date | string | null
    finalAnswer?: string | null
    errorClass?: string | null
    errorMessage?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutWorkflowRunsInput
    conversation?: ConversationCreateNestedOneWithoutWorkflowRunsInput
    steps?: WorkflowStepCreateNestedManyWithoutRunInput
    events?: WorkflowEventCreateNestedManyWithoutRunInput
    messages?: RunMessageCreateNestedManyWithoutRunInput
  }

  export type WorkflowRunUncheckedCreateWithoutCheckpointsInput = {
    id?: string
    userId: string
    conversationId?: string | null
    prompt: string
    status?: $Enums.WorkflowRunStatus
    model?: string | null
    maxSteps?: number | null
    startedAt?: Date | string | null
    endedAt?: Date | string | null
    finalAnswer?: string | null
    errorClass?: string | null
    errorMessage?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    steps?: WorkflowStepUncheckedCreateNestedManyWithoutRunInput
    events?: WorkflowEventUncheckedCreateNestedManyWithoutRunInput
    messages?: RunMessageUncheckedCreateNestedManyWithoutRunInput
  }

  export type WorkflowRunCreateOrConnectWithoutCheckpointsInput = {
    where: WorkflowRunWhereUniqueInput
    create: XOR<WorkflowRunCreateWithoutCheckpointsInput, WorkflowRunUncheckedCreateWithoutCheckpointsInput>
  }

  export type WorkflowStepCreateWithoutCheckpointsInput = {
    id?: string
    stepId: string
    stepType: $Enums.WorkflowStepType
    status?: $Enums.WorkflowStepStatus
    toolName?: string | null
    input?: NullableJsonNullValueInput | InputJsonValue
    output?: NullableJsonNullValueInput | InputJsonValue
    errorClass?: string | null
    errorMessage?: string | null
    retryCount?: number
    startedAt?: Date | string | null
    endedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    run: WorkflowRunCreateNestedOneWithoutStepsInput
    events?: WorkflowEventCreateNestedManyWithoutStepInput
  }

  export type WorkflowStepUncheckedCreateWithoutCheckpointsInput = {
    id?: string
    runId: string
    stepId: string
    stepType: $Enums.WorkflowStepType
    status?: $Enums.WorkflowStepStatus
    toolName?: string | null
    input?: NullableJsonNullValueInput | InputJsonValue
    output?: NullableJsonNullValueInput | InputJsonValue
    errorClass?: string | null
    errorMessage?: string | null
    retryCount?: number
    startedAt?: Date | string | null
    endedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    events?: WorkflowEventUncheckedCreateNestedManyWithoutStepInput
  }

  export type WorkflowStepCreateOrConnectWithoutCheckpointsInput = {
    where: WorkflowStepWhereUniqueInput
    create: XOR<WorkflowStepCreateWithoutCheckpointsInput, WorkflowStepUncheckedCreateWithoutCheckpointsInput>
  }

  export type WorkflowRunUpsertWithoutCheckpointsInput = {
    update: XOR<WorkflowRunUpdateWithoutCheckpointsInput, WorkflowRunUncheckedUpdateWithoutCheckpointsInput>
    create: XOR<WorkflowRunCreateWithoutCheckpointsInput, WorkflowRunUncheckedCreateWithoutCheckpointsInput>
    where?: WorkflowRunWhereInput
  }

  export type WorkflowRunUpdateToOneWithWhereWithoutCheckpointsInput = {
    where?: WorkflowRunWhereInput
    data: XOR<WorkflowRunUpdateWithoutCheckpointsInput, WorkflowRunUncheckedUpdateWithoutCheckpointsInput>
  }

  export type WorkflowRunUpdateWithoutCheckpointsInput = {
    id?: StringFieldUpdateOperationsInput | string
    prompt?: StringFieldUpdateOperationsInput | string
    status?: EnumWorkflowRunStatusFieldUpdateOperationsInput | $Enums.WorkflowRunStatus
    model?: NullableStringFieldUpdateOperationsInput | string | null
    maxSteps?: NullableIntFieldUpdateOperationsInput | number | null
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    finalAnswer?: NullableStringFieldUpdateOperationsInput | string | null
    errorClass?: NullableStringFieldUpdateOperationsInput | string | null
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutWorkflowRunsNestedInput
    conversation?: ConversationUpdateOneWithoutWorkflowRunsNestedInput
    steps?: WorkflowStepUpdateManyWithoutRunNestedInput
    events?: WorkflowEventUpdateManyWithoutRunNestedInput
    messages?: RunMessageUpdateManyWithoutRunNestedInput
  }

  export type WorkflowRunUncheckedUpdateWithoutCheckpointsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    conversationId?: NullableStringFieldUpdateOperationsInput | string | null
    prompt?: StringFieldUpdateOperationsInput | string
    status?: EnumWorkflowRunStatusFieldUpdateOperationsInput | $Enums.WorkflowRunStatus
    model?: NullableStringFieldUpdateOperationsInput | string | null
    maxSteps?: NullableIntFieldUpdateOperationsInput | number | null
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    finalAnswer?: NullableStringFieldUpdateOperationsInput | string | null
    errorClass?: NullableStringFieldUpdateOperationsInput | string | null
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    steps?: WorkflowStepUncheckedUpdateManyWithoutRunNestedInput
    events?: WorkflowEventUncheckedUpdateManyWithoutRunNestedInput
    messages?: RunMessageUncheckedUpdateManyWithoutRunNestedInput
  }

  export type WorkflowStepUpsertWithoutCheckpointsInput = {
    update: XOR<WorkflowStepUpdateWithoutCheckpointsInput, WorkflowStepUncheckedUpdateWithoutCheckpointsInput>
    create: XOR<WorkflowStepCreateWithoutCheckpointsInput, WorkflowStepUncheckedCreateWithoutCheckpointsInput>
    where?: WorkflowStepWhereInput
  }

  export type WorkflowStepUpdateToOneWithWhereWithoutCheckpointsInput = {
    where?: WorkflowStepWhereInput
    data: XOR<WorkflowStepUpdateWithoutCheckpointsInput, WorkflowStepUncheckedUpdateWithoutCheckpointsInput>
  }

  export type WorkflowStepUpdateWithoutCheckpointsInput = {
    id?: StringFieldUpdateOperationsInput | string
    stepId?: StringFieldUpdateOperationsInput | string
    stepType?: EnumWorkflowStepTypeFieldUpdateOperationsInput | $Enums.WorkflowStepType
    status?: EnumWorkflowStepStatusFieldUpdateOperationsInput | $Enums.WorkflowStepStatus
    toolName?: NullableStringFieldUpdateOperationsInput | string | null
    input?: NullableJsonNullValueInput | InputJsonValue
    output?: NullableJsonNullValueInput | InputJsonValue
    errorClass?: NullableStringFieldUpdateOperationsInput | string | null
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    retryCount?: IntFieldUpdateOperationsInput | number
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    run?: WorkflowRunUpdateOneRequiredWithoutStepsNestedInput
    events?: WorkflowEventUpdateManyWithoutStepNestedInput
  }

  export type WorkflowStepUncheckedUpdateWithoutCheckpointsInput = {
    id?: StringFieldUpdateOperationsInput | string
    runId?: StringFieldUpdateOperationsInput | string
    stepId?: StringFieldUpdateOperationsInput | string
    stepType?: EnumWorkflowStepTypeFieldUpdateOperationsInput | $Enums.WorkflowStepType
    status?: EnumWorkflowStepStatusFieldUpdateOperationsInput | $Enums.WorkflowStepStatus
    toolName?: NullableStringFieldUpdateOperationsInput | string | null
    input?: NullableJsonNullValueInput | InputJsonValue
    output?: NullableJsonNullValueInput | InputJsonValue
    errorClass?: NullableStringFieldUpdateOperationsInput | string | null
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    retryCount?: IntFieldUpdateOperationsInput | number
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    events?: WorkflowEventUncheckedUpdateManyWithoutStepNestedInput
  }

  export type WorkflowRunCreateWithoutMessagesInput = {
    id?: string
    prompt: string
    status?: $Enums.WorkflowRunStatus
    model?: string | null
    maxSteps?: number | null
    startedAt?: Date | string | null
    endedAt?: Date | string | null
    finalAnswer?: string | null
    errorClass?: string | null
    errorMessage?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutWorkflowRunsInput
    conversation?: ConversationCreateNestedOneWithoutWorkflowRunsInput
    steps?: WorkflowStepCreateNestedManyWithoutRunInput
    events?: WorkflowEventCreateNestedManyWithoutRunInput
    checkpoints?: WorkflowCheckpointCreateNestedManyWithoutRunInput
  }

  export type WorkflowRunUncheckedCreateWithoutMessagesInput = {
    id?: string
    userId: string
    conversationId?: string | null
    prompt: string
    status?: $Enums.WorkflowRunStatus
    model?: string | null
    maxSteps?: number | null
    startedAt?: Date | string | null
    endedAt?: Date | string | null
    finalAnswer?: string | null
    errorClass?: string | null
    errorMessage?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    steps?: WorkflowStepUncheckedCreateNestedManyWithoutRunInput
    events?: WorkflowEventUncheckedCreateNestedManyWithoutRunInput
    checkpoints?: WorkflowCheckpointUncheckedCreateNestedManyWithoutRunInput
  }

  export type WorkflowRunCreateOrConnectWithoutMessagesInput = {
    where: WorkflowRunWhereUniqueInput
    create: XOR<WorkflowRunCreateWithoutMessagesInput, WorkflowRunUncheckedCreateWithoutMessagesInput>
  }

  export type WorkflowRunUpsertWithoutMessagesInput = {
    update: XOR<WorkflowRunUpdateWithoutMessagesInput, WorkflowRunUncheckedUpdateWithoutMessagesInput>
    create: XOR<WorkflowRunCreateWithoutMessagesInput, WorkflowRunUncheckedCreateWithoutMessagesInput>
    where?: WorkflowRunWhereInput
  }

  export type WorkflowRunUpdateToOneWithWhereWithoutMessagesInput = {
    where?: WorkflowRunWhereInput
    data: XOR<WorkflowRunUpdateWithoutMessagesInput, WorkflowRunUncheckedUpdateWithoutMessagesInput>
  }

  export type WorkflowRunUpdateWithoutMessagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    prompt?: StringFieldUpdateOperationsInput | string
    status?: EnumWorkflowRunStatusFieldUpdateOperationsInput | $Enums.WorkflowRunStatus
    model?: NullableStringFieldUpdateOperationsInput | string | null
    maxSteps?: NullableIntFieldUpdateOperationsInput | number | null
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    finalAnswer?: NullableStringFieldUpdateOperationsInput | string | null
    errorClass?: NullableStringFieldUpdateOperationsInput | string | null
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutWorkflowRunsNestedInput
    conversation?: ConversationUpdateOneWithoutWorkflowRunsNestedInput
    steps?: WorkflowStepUpdateManyWithoutRunNestedInput
    events?: WorkflowEventUpdateManyWithoutRunNestedInput
    checkpoints?: WorkflowCheckpointUpdateManyWithoutRunNestedInput
  }

  export type WorkflowRunUncheckedUpdateWithoutMessagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    conversationId?: NullableStringFieldUpdateOperationsInput | string | null
    prompt?: StringFieldUpdateOperationsInput | string
    status?: EnumWorkflowRunStatusFieldUpdateOperationsInput | $Enums.WorkflowRunStatus
    model?: NullableStringFieldUpdateOperationsInput | string | null
    maxSteps?: NullableIntFieldUpdateOperationsInput | number | null
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    finalAnswer?: NullableStringFieldUpdateOperationsInput | string | null
    errorClass?: NullableStringFieldUpdateOperationsInput | string | null
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    steps?: WorkflowStepUncheckedUpdateManyWithoutRunNestedInput
    events?: WorkflowEventUncheckedUpdateManyWithoutRunNestedInput
    checkpoints?: WorkflowCheckpointUncheckedUpdateManyWithoutRunNestedInput
  }

  export type ConversationCreateManyUserInput = {
    id?: string
    title?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OAuthTokenCreateManyUserInput = {
    id?: string
    provider: string
    accessToken: string
    refreshToken?: string | null
    expiresAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ArtifactCreateManyUserInput = {
    id?: string
    type: string
    name?: string | null
    mimeType?: string | null
    storagePath?: string | null
    textContent?: string | null
    jsonContent?: NullableJsonNullValueInput | InputJsonValue
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WorkflowRunCreateManyUserInput = {
    id?: string
    conversationId?: string | null
    prompt: string
    status?: $Enums.WorkflowRunStatus
    model?: string | null
    maxSteps?: number | null
    startedAt?: Date | string | null
    endedAt?: Date | string | null
    finalAnswer?: string | null
    errorClass?: string | null
    errorMessage?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ConversationUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    messages?: MessageUpdateManyWithoutConversationNestedInput
    workflowRuns?: WorkflowRunUpdateManyWithoutConversationNestedInput
  }

  export type ConversationUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    messages?: MessageUncheckedUpdateManyWithoutConversationNestedInput
    workflowRuns?: WorkflowRunUncheckedUpdateManyWithoutConversationNestedInput
  }

  export type ConversationUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OAuthTokenUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    accessToken?: StringFieldUpdateOperationsInput | string
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OAuthTokenUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    accessToken?: StringFieldUpdateOperationsInput | string
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OAuthTokenUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    accessToken?: StringFieldUpdateOperationsInput | string
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ArtifactUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    mimeType?: NullableStringFieldUpdateOperationsInput | string | null
    storagePath?: NullableStringFieldUpdateOperationsInput | string | null
    textContent?: NullableStringFieldUpdateOperationsInput | string | null
    jsonContent?: NullableJsonNullValueInput | InputJsonValue
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ArtifactUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    mimeType?: NullableStringFieldUpdateOperationsInput | string | null
    storagePath?: NullableStringFieldUpdateOperationsInput | string | null
    textContent?: NullableStringFieldUpdateOperationsInput | string | null
    jsonContent?: NullableJsonNullValueInput | InputJsonValue
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ArtifactUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    mimeType?: NullableStringFieldUpdateOperationsInput | string | null
    storagePath?: NullableStringFieldUpdateOperationsInput | string | null
    textContent?: NullableStringFieldUpdateOperationsInput | string | null
    jsonContent?: NullableJsonNullValueInput | InputJsonValue
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WorkflowRunUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    prompt?: StringFieldUpdateOperationsInput | string
    status?: EnumWorkflowRunStatusFieldUpdateOperationsInput | $Enums.WorkflowRunStatus
    model?: NullableStringFieldUpdateOperationsInput | string | null
    maxSteps?: NullableIntFieldUpdateOperationsInput | number | null
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    finalAnswer?: NullableStringFieldUpdateOperationsInput | string | null
    errorClass?: NullableStringFieldUpdateOperationsInput | string | null
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    conversation?: ConversationUpdateOneWithoutWorkflowRunsNestedInput
    steps?: WorkflowStepUpdateManyWithoutRunNestedInput
    events?: WorkflowEventUpdateManyWithoutRunNestedInput
    checkpoints?: WorkflowCheckpointUpdateManyWithoutRunNestedInput
    messages?: RunMessageUpdateManyWithoutRunNestedInput
  }

  export type WorkflowRunUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    conversationId?: NullableStringFieldUpdateOperationsInput | string | null
    prompt?: StringFieldUpdateOperationsInput | string
    status?: EnumWorkflowRunStatusFieldUpdateOperationsInput | $Enums.WorkflowRunStatus
    model?: NullableStringFieldUpdateOperationsInput | string | null
    maxSteps?: NullableIntFieldUpdateOperationsInput | number | null
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    finalAnswer?: NullableStringFieldUpdateOperationsInput | string | null
    errorClass?: NullableStringFieldUpdateOperationsInput | string | null
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    steps?: WorkflowStepUncheckedUpdateManyWithoutRunNestedInput
    events?: WorkflowEventUncheckedUpdateManyWithoutRunNestedInput
    checkpoints?: WorkflowCheckpointUncheckedUpdateManyWithoutRunNestedInput
    messages?: RunMessageUncheckedUpdateManyWithoutRunNestedInput
  }

  export type WorkflowRunUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    conversationId?: NullableStringFieldUpdateOperationsInput | string | null
    prompt?: StringFieldUpdateOperationsInput | string
    status?: EnumWorkflowRunStatusFieldUpdateOperationsInput | $Enums.WorkflowRunStatus
    model?: NullableStringFieldUpdateOperationsInput | string | null
    maxSteps?: NullableIntFieldUpdateOperationsInput | number | null
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    finalAnswer?: NullableStringFieldUpdateOperationsInput | string | null
    errorClass?: NullableStringFieldUpdateOperationsInput | string | null
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageCreateManyConversationInput = {
    id?: string
    role: string
    content: string
    toolCallId?: string | null
    toolName?: string | null
    createdAt?: Date | string
  }

  export type WorkflowRunCreateManyConversationInput = {
    id?: string
    userId: string
    prompt: string
    status?: $Enums.WorkflowRunStatus
    model?: string | null
    maxSteps?: number | null
    startedAt?: Date | string | null
    endedAt?: Date | string | null
    finalAnswer?: string | null
    errorClass?: string | null
    errorMessage?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MessageUpdateWithoutConversationInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    toolCallId?: NullableStringFieldUpdateOperationsInput | string | null
    toolName?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageUncheckedUpdateWithoutConversationInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    toolCallId?: NullableStringFieldUpdateOperationsInput | string | null
    toolName?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageUncheckedUpdateManyWithoutConversationInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    toolCallId?: NullableStringFieldUpdateOperationsInput | string | null
    toolName?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WorkflowRunUpdateWithoutConversationInput = {
    id?: StringFieldUpdateOperationsInput | string
    prompt?: StringFieldUpdateOperationsInput | string
    status?: EnumWorkflowRunStatusFieldUpdateOperationsInput | $Enums.WorkflowRunStatus
    model?: NullableStringFieldUpdateOperationsInput | string | null
    maxSteps?: NullableIntFieldUpdateOperationsInput | number | null
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    finalAnswer?: NullableStringFieldUpdateOperationsInput | string | null
    errorClass?: NullableStringFieldUpdateOperationsInput | string | null
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutWorkflowRunsNestedInput
    steps?: WorkflowStepUpdateManyWithoutRunNestedInput
    events?: WorkflowEventUpdateManyWithoutRunNestedInput
    checkpoints?: WorkflowCheckpointUpdateManyWithoutRunNestedInput
    messages?: RunMessageUpdateManyWithoutRunNestedInput
  }

  export type WorkflowRunUncheckedUpdateWithoutConversationInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    prompt?: StringFieldUpdateOperationsInput | string
    status?: EnumWorkflowRunStatusFieldUpdateOperationsInput | $Enums.WorkflowRunStatus
    model?: NullableStringFieldUpdateOperationsInput | string | null
    maxSteps?: NullableIntFieldUpdateOperationsInput | number | null
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    finalAnswer?: NullableStringFieldUpdateOperationsInput | string | null
    errorClass?: NullableStringFieldUpdateOperationsInput | string | null
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    steps?: WorkflowStepUncheckedUpdateManyWithoutRunNestedInput
    events?: WorkflowEventUncheckedUpdateManyWithoutRunNestedInput
    checkpoints?: WorkflowCheckpointUncheckedUpdateManyWithoutRunNestedInput
    messages?: RunMessageUncheckedUpdateManyWithoutRunNestedInput
  }

  export type WorkflowRunUncheckedUpdateManyWithoutConversationInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    prompt?: StringFieldUpdateOperationsInput | string
    status?: EnumWorkflowRunStatusFieldUpdateOperationsInput | $Enums.WorkflowRunStatus
    model?: NullableStringFieldUpdateOperationsInput | string | null
    maxSteps?: NullableIntFieldUpdateOperationsInput | number | null
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    finalAnswer?: NullableStringFieldUpdateOperationsInput | string | null
    errorClass?: NullableStringFieldUpdateOperationsInput | string | null
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WorkflowStepCreateManyRunInput = {
    id?: string
    stepId: string
    stepType: $Enums.WorkflowStepType
    status?: $Enums.WorkflowStepStatus
    toolName?: string | null
    input?: NullableJsonNullValueInput | InputJsonValue
    output?: NullableJsonNullValueInput | InputJsonValue
    errorClass?: string | null
    errorMessage?: string | null
    retryCount?: number
    startedAt?: Date | string | null
    endedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WorkflowEventCreateManyRunInput = {
    id?: string
    workflowStepId?: string | null
    eventType: string
    payload?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type WorkflowCheckpointCreateManyRunInput = {
    id?: string
    workflowStepId?: string | null
    sequence: number
    snapshot: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type RunMessageCreateManyRunInput = {
    id?: string
    role: string
    content: string
    toolName?: string | null
    toolCallId?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type WorkflowStepUpdateWithoutRunInput = {
    id?: StringFieldUpdateOperationsInput | string
    stepId?: StringFieldUpdateOperationsInput | string
    stepType?: EnumWorkflowStepTypeFieldUpdateOperationsInput | $Enums.WorkflowStepType
    status?: EnumWorkflowStepStatusFieldUpdateOperationsInput | $Enums.WorkflowStepStatus
    toolName?: NullableStringFieldUpdateOperationsInput | string | null
    input?: NullableJsonNullValueInput | InputJsonValue
    output?: NullableJsonNullValueInput | InputJsonValue
    errorClass?: NullableStringFieldUpdateOperationsInput | string | null
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    retryCount?: IntFieldUpdateOperationsInput | number
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    events?: WorkflowEventUpdateManyWithoutStepNestedInput
    checkpoints?: WorkflowCheckpointUpdateManyWithoutStepNestedInput
  }

  export type WorkflowStepUncheckedUpdateWithoutRunInput = {
    id?: StringFieldUpdateOperationsInput | string
    stepId?: StringFieldUpdateOperationsInput | string
    stepType?: EnumWorkflowStepTypeFieldUpdateOperationsInput | $Enums.WorkflowStepType
    status?: EnumWorkflowStepStatusFieldUpdateOperationsInput | $Enums.WorkflowStepStatus
    toolName?: NullableStringFieldUpdateOperationsInput | string | null
    input?: NullableJsonNullValueInput | InputJsonValue
    output?: NullableJsonNullValueInput | InputJsonValue
    errorClass?: NullableStringFieldUpdateOperationsInput | string | null
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    retryCount?: IntFieldUpdateOperationsInput | number
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    events?: WorkflowEventUncheckedUpdateManyWithoutStepNestedInput
    checkpoints?: WorkflowCheckpointUncheckedUpdateManyWithoutStepNestedInput
  }

  export type WorkflowStepUncheckedUpdateManyWithoutRunInput = {
    id?: StringFieldUpdateOperationsInput | string
    stepId?: StringFieldUpdateOperationsInput | string
    stepType?: EnumWorkflowStepTypeFieldUpdateOperationsInput | $Enums.WorkflowStepType
    status?: EnumWorkflowStepStatusFieldUpdateOperationsInput | $Enums.WorkflowStepStatus
    toolName?: NullableStringFieldUpdateOperationsInput | string | null
    input?: NullableJsonNullValueInput | InputJsonValue
    output?: NullableJsonNullValueInput | InputJsonValue
    errorClass?: NullableStringFieldUpdateOperationsInput | string | null
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    retryCount?: IntFieldUpdateOperationsInput | number
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WorkflowEventUpdateWithoutRunInput = {
    id?: StringFieldUpdateOperationsInput | string
    eventType?: StringFieldUpdateOperationsInput | string
    payload?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    step?: WorkflowStepUpdateOneWithoutEventsNestedInput
  }

  export type WorkflowEventUncheckedUpdateWithoutRunInput = {
    id?: StringFieldUpdateOperationsInput | string
    workflowStepId?: NullableStringFieldUpdateOperationsInput | string | null
    eventType?: StringFieldUpdateOperationsInput | string
    payload?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WorkflowEventUncheckedUpdateManyWithoutRunInput = {
    id?: StringFieldUpdateOperationsInput | string
    workflowStepId?: NullableStringFieldUpdateOperationsInput | string | null
    eventType?: StringFieldUpdateOperationsInput | string
    payload?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WorkflowCheckpointUpdateWithoutRunInput = {
    id?: StringFieldUpdateOperationsInput | string
    sequence?: IntFieldUpdateOperationsInput | number
    snapshot?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    step?: WorkflowStepUpdateOneWithoutCheckpointsNestedInput
  }

  export type WorkflowCheckpointUncheckedUpdateWithoutRunInput = {
    id?: StringFieldUpdateOperationsInput | string
    workflowStepId?: NullableStringFieldUpdateOperationsInput | string | null
    sequence?: IntFieldUpdateOperationsInput | number
    snapshot?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WorkflowCheckpointUncheckedUpdateManyWithoutRunInput = {
    id?: StringFieldUpdateOperationsInput | string
    workflowStepId?: NullableStringFieldUpdateOperationsInput | string | null
    sequence?: IntFieldUpdateOperationsInput | number
    snapshot?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RunMessageUpdateWithoutRunInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    toolName?: NullableStringFieldUpdateOperationsInput | string | null
    toolCallId?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RunMessageUncheckedUpdateWithoutRunInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    toolName?: NullableStringFieldUpdateOperationsInput | string | null
    toolCallId?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RunMessageUncheckedUpdateManyWithoutRunInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    toolName?: NullableStringFieldUpdateOperationsInput | string | null
    toolCallId?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WorkflowEventCreateManyStepInput = {
    id?: string
    runId: string
    eventType: string
    payload?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type WorkflowCheckpointCreateManyStepInput = {
    id?: string
    runId: string
    sequence: number
    snapshot: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type WorkflowEventUpdateWithoutStepInput = {
    id?: StringFieldUpdateOperationsInput | string
    eventType?: StringFieldUpdateOperationsInput | string
    payload?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    run?: WorkflowRunUpdateOneRequiredWithoutEventsNestedInput
  }

  export type WorkflowEventUncheckedUpdateWithoutStepInput = {
    id?: StringFieldUpdateOperationsInput | string
    runId?: StringFieldUpdateOperationsInput | string
    eventType?: StringFieldUpdateOperationsInput | string
    payload?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WorkflowEventUncheckedUpdateManyWithoutStepInput = {
    id?: StringFieldUpdateOperationsInput | string
    runId?: StringFieldUpdateOperationsInput | string
    eventType?: StringFieldUpdateOperationsInput | string
    payload?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WorkflowCheckpointUpdateWithoutStepInput = {
    id?: StringFieldUpdateOperationsInput | string
    sequence?: IntFieldUpdateOperationsInput | number
    snapshot?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    run?: WorkflowRunUpdateOneRequiredWithoutCheckpointsNestedInput
  }

  export type WorkflowCheckpointUncheckedUpdateWithoutStepInput = {
    id?: StringFieldUpdateOperationsInput | string
    runId?: StringFieldUpdateOperationsInput | string
    sequence?: IntFieldUpdateOperationsInput | number
    snapshot?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WorkflowCheckpointUncheckedUpdateManyWithoutStepInput = {
    id?: StringFieldUpdateOperationsInput | string
    runId?: StringFieldUpdateOperationsInput | string
    sequence?: IntFieldUpdateOperationsInput | number
    snapshot?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}