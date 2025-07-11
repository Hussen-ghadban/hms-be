
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Guest
 * 
 */
export type Guest = $Result.DefaultSelection<Prisma.$GuestPayload>
/**
 * Model GroupProfile
 * 
 */
export type GroupProfile = $Result.DefaultSelection<Prisma.$GroupProfilePayload>

/**
 * Enums
 */
export namespace $Enums {
  export const BusinessType: {
  CORPORATE: 'CORPORATE',
  TRAVEL_AGENCY: 'TRAVEL_AGENCY',
  EVENT_PLANNER: 'EVENT_PLANNER',
  GOVERNMENT: 'GOVERNMENT',
  OTHER: 'OTHER'
};

export type BusinessType = (typeof BusinessType)[keyof typeof BusinessType]


export const GroupStatus: {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
  SUSPENDED: 'SUSPENDED'
};

export type GroupStatus = (typeof GroupStatus)[keyof typeof GroupStatus]

}

export type BusinessType = $Enums.BusinessType

export const BusinessType: typeof $Enums.BusinessType

export type GroupStatus = $Enums.GroupStatus

export const GroupStatus: typeof $Enums.GroupStatus

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Guests
 * const guests = await prisma.guest.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Guests
   * const guests = await prisma.guest.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
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
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
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
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
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
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
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
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.guest`: Exposes CRUD operations for the **Guest** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Guests
    * const guests = await prisma.guest.findMany()
    * ```
    */
  get guest(): Prisma.GuestDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.groupProfile`: Exposes CRUD operations for the **GroupProfile** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more GroupProfiles
    * const groupProfiles = await prisma.groupProfile.findMany()
    * ```
    */
  get groupProfile(): Prisma.GroupProfileDelegate<ExtArgs, ClientOptions>;
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
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

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
   * Prisma Client JS version: 6.10.1
   * Query Engine version: 9b628578b3b7cae625e8c927178f15a170e74a9c
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


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
    Guest: 'Guest',
    GroupProfile: 'GroupProfile'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "guest" | "groupProfile"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Guest: {
        payload: Prisma.$GuestPayload<ExtArgs>
        fields: Prisma.GuestFieldRefs
        operations: {
          findUnique: {
            args: Prisma.GuestFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GuestPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.GuestFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GuestPayload>
          }
          findFirst: {
            args: Prisma.GuestFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GuestPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.GuestFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GuestPayload>
          }
          findMany: {
            args: Prisma.GuestFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GuestPayload>[]
          }
          create: {
            args: Prisma.GuestCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GuestPayload>
          }
          createMany: {
            args: Prisma.GuestCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.GuestCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GuestPayload>[]
          }
          delete: {
            args: Prisma.GuestDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GuestPayload>
          }
          update: {
            args: Prisma.GuestUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GuestPayload>
          }
          deleteMany: {
            args: Prisma.GuestDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.GuestUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.GuestUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GuestPayload>[]
          }
          upsert: {
            args: Prisma.GuestUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GuestPayload>
          }
          aggregate: {
            args: Prisma.GuestAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateGuest>
          }
          groupBy: {
            args: Prisma.GuestGroupByArgs<ExtArgs>
            result: $Utils.Optional<GuestGroupByOutputType>[]
          }
          count: {
            args: Prisma.GuestCountArgs<ExtArgs>
            result: $Utils.Optional<GuestCountAggregateOutputType> | number
          }
        }
      }
      GroupProfile: {
        payload: Prisma.$GroupProfilePayload<ExtArgs>
        fields: Prisma.GroupProfileFieldRefs
        operations: {
          findUnique: {
            args: Prisma.GroupProfileFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupProfilePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.GroupProfileFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupProfilePayload>
          }
          findFirst: {
            args: Prisma.GroupProfileFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupProfilePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.GroupProfileFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupProfilePayload>
          }
          findMany: {
            args: Prisma.GroupProfileFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupProfilePayload>[]
          }
          create: {
            args: Prisma.GroupProfileCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupProfilePayload>
          }
          createMany: {
            args: Prisma.GroupProfileCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.GroupProfileCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupProfilePayload>[]
          }
          delete: {
            args: Prisma.GroupProfileDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupProfilePayload>
          }
          update: {
            args: Prisma.GroupProfileUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupProfilePayload>
          }
          deleteMany: {
            args: Prisma.GroupProfileDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.GroupProfileUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.GroupProfileUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupProfilePayload>[]
          }
          upsert: {
            args: Prisma.GroupProfileUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupProfilePayload>
          }
          aggregate: {
            args: Prisma.GroupProfileAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateGroupProfile>
          }
          groupBy: {
            args: Prisma.GroupProfileGroupByArgs<ExtArgs>
            result: $Utils.Optional<GroupProfileGroupByOutputType>[]
          }
          count: {
            args: Prisma.GroupProfileCountArgs<ExtArgs>
            result: $Utils.Optional<GroupProfileCountAggregateOutputType> | number
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
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
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
  }
  export type GlobalOmitConfig = {
    guest?: GuestOmit
    groupProfile?: GroupProfileOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

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

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

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
   * Count Type GuestCountOutputType
   */

  export type GuestCountOutputType = {
    GroupProfile: number
  }

  export type GuestCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    GroupProfile?: boolean | GuestCountOutputTypeCountGroupProfileArgs
  }

  // Custom InputTypes
  /**
   * GuestCountOutputType without action
   */
  export type GuestCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GuestCountOutputType
     */
    select?: GuestCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * GuestCountOutputType without action
   */
  export type GuestCountOutputTypeCountGroupProfileArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GroupProfileWhereInput
  }


  /**
   * Count Type GroupProfileCountOutputType
   */

  export type GroupProfileCountOutputType = {
    LinkedGuests: number
  }

  export type GroupProfileCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    LinkedGuests?: boolean | GroupProfileCountOutputTypeCountLinkedGuestsArgs
  }

  // Custom InputTypes
  /**
   * GroupProfileCountOutputType without action
   */
  export type GroupProfileCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupProfileCountOutputType
     */
    select?: GroupProfileCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * GroupProfileCountOutputType without action
   */
  export type GroupProfileCountOutputTypeCountLinkedGuestsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GuestWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Guest
   */

  export type AggregateGuest = {
    _count: GuestCountAggregateOutputType | null
    _min: GuestMinAggregateOutputType | null
    _max: GuestMaxAggregateOutputType | null
  }

  export type GuestMinAggregateOutputType = {
    id: string | null
    gid: string | null
    firstName: string | null
    lastName: string | null
    email: string | null
    phoneNumber: string | null
    nationality: string | null
    dob: Date | null
    createdAt: Date | null
    updatedAt: Date | null
    hotelId: string | null
  }

  export type GuestMaxAggregateOutputType = {
    id: string | null
    gid: string | null
    firstName: string | null
    lastName: string | null
    email: string | null
    phoneNumber: string | null
    nationality: string | null
    dob: Date | null
    createdAt: Date | null
    updatedAt: Date | null
    hotelId: string | null
  }

  export type GuestCountAggregateOutputType = {
    id: number
    gid: number
    firstName: number
    lastName: number
    email: number
    phoneNumber: number
    identification: number
    nationality: number
    preferences: number
    dob: number
    createdAt: number
    updatedAt: number
    hotelId: number
    _all: number
  }


  export type GuestMinAggregateInputType = {
    id?: true
    gid?: true
    firstName?: true
    lastName?: true
    email?: true
    phoneNumber?: true
    nationality?: true
    dob?: true
    createdAt?: true
    updatedAt?: true
    hotelId?: true
  }

  export type GuestMaxAggregateInputType = {
    id?: true
    gid?: true
    firstName?: true
    lastName?: true
    email?: true
    phoneNumber?: true
    nationality?: true
    dob?: true
    createdAt?: true
    updatedAt?: true
    hotelId?: true
  }

  export type GuestCountAggregateInputType = {
    id?: true
    gid?: true
    firstName?: true
    lastName?: true
    email?: true
    phoneNumber?: true
    identification?: true
    nationality?: true
    preferences?: true
    dob?: true
    createdAt?: true
    updatedAt?: true
    hotelId?: true
    _all?: true
  }

  export type GuestAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Guest to aggregate.
     */
    where?: GuestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Guests to fetch.
     */
    orderBy?: GuestOrderByWithRelationInput | GuestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: GuestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Guests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Guests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Guests
    **/
    _count?: true | GuestCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: GuestMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: GuestMaxAggregateInputType
  }

  export type GetGuestAggregateType<T extends GuestAggregateArgs> = {
        [P in keyof T & keyof AggregateGuest]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGuest[P]>
      : GetScalarType<T[P], AggregateGuest[P]>
  }




  export type GuestGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GuestWhereInput
    orderBy?: GuestOrderByWithAggregationInput | GuestOrderByWithAggregationInput[]
    by: GuestScalarFieldEnum[] | GuestScalarFieldEnum
    having?: GuestScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: GuestCountAggregateInputType | true
    _min?: GuestMinAggregateInputType
    _max?: GuestMaxAggregateInputType
  }

  export type GuestGroupByOutputType = {
    id: string
    gid: string
    firstName: string
    lastName: string
    email: string | null
    phoneNumber: string | null
    identification: JsonValue
    nationality: string | null
    preferences: JsonValue | null
    dob: Date | null
    createdAt: Date
    updatedAt: Date
    hotelId: string
    _count: GuestCountAggregateOutputType | null
    _min: GuestMinAggregateOutputType | null
    _max: GuestMaxAggregateOutputType | null
  }

  type GetGuestGroupByPayload<T extends GuestGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<GuestGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof GuestGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], GuestGroupByOutputType[P]>
            : GetScalarType<T[P], GuestGroupByOutputType[P]>
        }
      >
    >


  export type GuestSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    gid?: boolean
    firstName?: boolean
    lastName?: boolean
    email?: boolean
    phoneNumber?: boolean
    identification?: boolean
    nationality?: boolean
    preferences?: boolean
    dob?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    hotelId?: boolean
    GroupProfile?: boolean | Guest$GroupProfileArgs<ExtArgs>
    _count?: boolean | GuestCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["guest"]>

  export type GuestSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    gid?: boolean
    firstName?: boolean
    lastName?: boolean
    email?: boolean
    phoneNumber?: boolean
    identification?: boolean
    nationality?: boolean
    preferences?: boolean
    dob?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    hotelId?: boolean
  }, ExtArgs["result"]["guest"]>

  export type GuestSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    gid?: boolean
    firstName?: boolean
    lastName?: boolean
    email?: boolean
    phoneNumber?: boolean
    identification?: boolean
    nationality?: boolean
    preferences?: boolean
    dob?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    hotelId?: boolean
  }, ExtArgs["result"]["guest"]>

  export type GuestSelectScalar = {
    id?: boolean
    gid?: boolean
    firstName?: boolean
    lastName?: boolean
    email?: boolean
    phoneNumber?: boolean
    identification?: boolean
    nationality?: boolean
    preferences?: boolean
    dob?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    hotelId?: boolean
  }

  export type GuestOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "gid" | "firstName" | "lastName" | "email" | "phoneNumber" | "identification" | "nationality" | "preferences" | "dob" | "createdAt" | "updatedAt" | "hotelId", ExtArgs["result"]["guest"]>
  export type GuestInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    GroupProfile?: boolean | Guest$GroupProfileArgs<ExtArgs>
    _count?: boolean | GuestCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type GuestIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type GuestIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $GuestPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Guest"
    objects: {
      GroupProfile: Prisma.$GroupProfilePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      gid: string
      firstName: string
      lastName: string
      email: string | null
      phoneNumber: string | null
      identification: Prisma.JsonValue
      nationality: string | null
      preferences: Prisma.JsonValue | null
      dob: Date | null
      createdAt: Date
      updatedAt: Date
      hotelId: string
    }, ExtArgs["result"]["guest"]>
    composites: {}
  }

  type GuestGetPayload<S extends boolean | null | undefined | GuestDefaultArgs> = $Result.GetResult<Prisma.$GuestPayload, S>

  type GuestCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<GuestFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: GuestCountAggregateInputType | true
    }

  export interface GuestDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Guest'], meta: { name: 'Guest' } }
    /**
     * Find zero or one Guest that matches the filter.
     * @param {GuestFindUniqueArgs} args - Arguments to find a Guest
     * @example
     * // Get one Guest
     * const guest = await prisma.guest.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends GuestFindUniqueArgs>(args: SelectSubset<T, GuestFindUniqueArgs<ExtArgs>>): Prisma__GuestClient<$Result.GetResult<Prisma.$GuestPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Guest that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {GuestFindUniqueOrThrowArgs} args - Arguments to find a Guest
     * @example
     * // Get one Guest
     * const guest = await prisma.guest.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends GuestFindUniqueOrThrowArgs>(args: SelectSubset<T, GuestFindUniqueOrThrowArgs<ExtArgs>>): Prisma__GuestClient<$Result.GetResult<Prisma.$GuestPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Guest that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GuestFindFirstArgs} args - Arguments to find a Guest
     * @example
     * // Get one Guest
     * const guest = await prisma.guest.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends GuestFindFirstArgs>(args?: SelectSubset<T, GuestFindFirstArgs<ExtArgs>>): Prisma__GuestClient<$Result.GetResult<Prisma.$GuestPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Guest that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GuestFindFirstOrThrowArgs} args - Arguments to find a Guest
     * @example
     * // Get one Guest
     * const guest = await prisma.guest.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends GuestFindFirstOrThrowArgs>(args?: SelectSubset<T, GuestFindFirstOrThrowArgs<ExtArgs>>): Prisma__GuestClient<$Result.GetResult<Prisma.$GuestPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Guests that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GuestFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Guests
     * const guests = await prisma.guest.findMany()
     * 
     * // Get first 10 Guests
     * const guests = await prisma.guest.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const guestWithIdOnly = await prisma.guest.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends GuestFindManyArgs>(args?: SelectSubset<T, GuestFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GuestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Guest.
     * @param {GuestCreateArgs} args - Arguments to create a Guest.
     * @example
     * // Create one Guest
     * const Guest = await prisma.guest.create({
     *   data: {
     *     // ... data to create a Guest
     *   }
     * })
     * 
     */
    create<T extends GuestCreateArgs>(args: SelectSubset<T, GuestCreateArgs<ExtArgs>>): Prisma__GuestClient<$Result.GetResult<Prisma.$GuestPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Guests.
     * @param {GuestCreateManyArgs} args - Arguments to create many Guests.
     * @example
     * // Create many Guests
     * const guest = await prisma.guest.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends GuestCreateManyArgs>(args?: SelectSubset<T, GuestCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Guests and returns the data saved in the database.
     * @param {GuestCreateManyAndReturnArgs} args - Arguments to create many Guests.
     * @example
     * // Create many Guests
     * const guest = await prisma.guest.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Guests and only return the `id`
     * const guestWithIdOnly = await prisma.guest.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends GuestCreateManyAndReturnArgs>(args?: SelectSubset<T, GuestCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GuestPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Guest.
     * @param {GuestDeleteArgs} args - Arguments to delete one Guest.
     * @example
     * // Delete one Guest
     * const Guest = await prisma.guest.delete({
     *   where: {
     *     // ... filter to delete one Guest
     *   }
     * })
     * 
     */
    delete<T extends GuestDeleteArgs>(args: SelectSubset<T, GuestDeleteArgs<ExtArgs>>): Prisma__GuestClient<$Result.GetResult<Prisma.$GuestPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Guest.
     * @param {GuestUpdateArgs} args - Arguments to update one Guest.
     * @example
     * // Update one Guest
     * const guest = await prisma.guest.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends GuestUpdateArgs>(args: SelectSubset<T, GuestUpdateArgs<ExtArgs>>): Prisma__GuestClient<$Result.GetResult<Prisma.$GuestPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Guests.
     * @param {GuestDeleteManyArgs} args - Arguments to filter Guests to delete.
     * @example
     * // Delete a few Guests
     * const { count } = await prisma.guest.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends GuestDeleteManyArgs>(args?: SelectSubset<T, GuestDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Guests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GuestUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Guests
     * const guest = await prisma.guest.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends GuestUpdateManyArgs>(args: SelectSubset<T, GuestUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Guests and returns the data updated in the database.
     * @param {GuestUpdateManyAndReturnArgs} args - Arguments to update many Guests.
     * @example
     * // Update many Guests
     * const guest = await prisma.guest.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Guests and only return the `id`
     * const guestWithIdOnly = await prisma.guest.updateManyAndReturn({
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
    updateManyAndReturn<T extends GuestUpdateManyAndReturnArgs>(args: SelectSubset<T, GuestUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GuestPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Guest.
     * @param {GuestUpsertArgs} args - Arguments to update or create a Guest.
     * @example
     * // Update or create a Guest
     * const guest = await prisma.guest.upsert({
     *   create: {
     *     // ... data to create a Guest
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Guest we want to update
     *   }
     * })
     */
    upsert<T extends GuestUpsertArgs>(args: SelectSubset<T, GuestUpsertArgs<ExtArgs>>): Prisma__GuestClient<$Result.GetResult<Prisma.$GuestPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Guests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GuestCountArgs} args - Arguments to filter Guests to count.
     * @example
     * // Count the number of Guests
     * const count = await prisma.guest.count({
     *   where: {
     *     // ... the filter for the Guests we want to count
     *   }
     * })
    **/
    count<T extends GuestCountArgs>(
      args?: Subset<T, GuestCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], GuestCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Guest.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GuestAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends GuestAggregateArgs>(args: Subset<T, GuestAggregateArgs>): Prisma.PrismaPromise<GetGuestAggregateType<T>>

    /**
     * Group by Guest.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GuestGroupByArgs} args - Group by arguments.
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
      T extends GuestGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: GuestGroupByArgs['orderBy'] }
        : { orderBy?: GuestGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, GuestGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGuestGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Guest model
   */
  readonly fields: GuestFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Guest.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__GuestClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    GroupProfile<T extends Guest$GroupProfileArgs<ExtArgs> = {}>(args?: Subset<T, Guest$GroupProfileArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GroupProfilePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Guest model
   */
  interface GuestFieldRefs {
    readonly id: FieldRef<"Guest", 'String'>
    readonly gid: FieldRef<"Guest", 'String'>
    readonly firstName: FieldRef<"Guest", 'String'>
    readonly lastName: FieldRef<"Guest", 'String'>
    readonly email: FieldRef<"Guest", 'String'>
    readonly phoneNumber: FieldRef<"Guest", 'String'>
    readonly identification: FieldRef<"Guest", 'Json'>
    readonly nationality: FieldRef<"Guest", 'String'>
    readonly preferences: FieldRef<"Guest", 'Json'>
    readonly dob: FieldRef<"Guest", 'DateTime'>
    readonly createdAt: FieldRef<"Guest", 'DateTime'>
    readonly updatedAt: FieldRef<"Guest", 'DateTime'>
    readonly hotelId: FieldRef<"Guest", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Guest findUnique
   */
  export type GuestFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Guest
     */
    select?: GuestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Guest
     */
    omit?: GuestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GuestInclude<ExtArgs> | null
    /**
     * Filter, which Guest to fetch.
     */
    where: GuestWhereUniqueInput
  }

  /**
   * Guest findUniqueOrThrow
   */
  export type GuestFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Guest
     */
    select?: GuestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Guest
     */
    omit?: GuestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GuestInclude<ExtArgs> | null
    /**
     * Filter, which Guest to fetch.
     */
    where: GuestWhereUniqueInput
  }

  /**
   * Guest findFirst
   */
  export type GuestFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Guest
     */
    select?: GuestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Guest
     */
    omit?: GuestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GuestInclude<ExtArgs> | null
    /**
     * Filter, which Guest to fetch.
     */
    where?: GuestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Guests to fetch.
     */
    orderBy?: GuestOrderByWithRelationInput | GuestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Guests.
     */
    cursor?: GuestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Guests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Guests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Guests.
     */
    distinct?: GuestScalarFieldEnum | GuestScalarFieldEnum[]
  }

  /**
   * Guest findFirstOrThrow
   */
  export type GuestFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Guest
     */
    select?: GuestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Guest
     */
    omit?: GuestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GuestInclude<ExtArgs> | null
    /**
     * Filter, which Guest to fetch.
     */
    where?: GuestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Guests to fetch.
     */
    orderBy?: GuestOrderByWithRelationInput | GuestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Guests.
     */
    cursor?: GuestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Guests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Guests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Guests.
     */
    distinct?: GuestScalarFieldEnum | GuestScalarFieldEnum[]
  }

  /**
   * Guest findMany
   */
  export type GuestFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Guest
     */
    select?: GuestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Guest
     */
    omit?: GuestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GuestInclude<ExtArgs> | null
    /**
     * Filter, which Guests to fetch.
     */
    where?: GuestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Guests to fetch.
     */
    orderBy?: GuestOrderByWithRelationInput | GuestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Guests.
     */
    cursor?: GuestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Guests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Guests.
     */
    skip?: number
    distinct?: GuestScalarFieldEnum | GuestScalarFieldEnum[]
  }

  /**
   * Guest create
   */
  export type GuestCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Guest
     */
    select?: GuestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Guest
     */
    omit?: GuestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GuestInclude<ExtArgs> | null
    /**
     * The data needed to create a Guest.
     */
    data: XOR<GuestCreateInput, GuestUncheckedCreateInput>
  }

  /**
   * Guest createMany
   */
  export type GuestCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Guests.
     */
    data: GuestCreateManyInput | GuestCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Guest createManyAndReturn
   */
  export type GuestCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Guest
     */
    select?: GuestSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Guest
     */
    omit?: GuestOmit<ExtArgs> | null
    /**
     * The data used to create many Guests.
     */
    data: GuestCreateManyInput | GuestCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Guest update
   */
  export type GuestUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Guest
     */
    select?: GuestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Guest
     */
    omit?: GuestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GuestInclude<ExtArgs> | null
    /**
     * The data needed to update a Guest.
     */
    data: XOR<GuestUpdateInput, GuestUncheckedUpdateInput>
    /**
     * Choose, which Guest to update.
     */
    where: GuestWhereUniqueInput
  }

  /**
   * Guest updateMany
   */
  export type GuestUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Guests.
     */
    data: XOR<GuestUpdateManyMutationInput, GuestUncheckedUpdateManyInput>
    /**
     * Filter which Guests to update
     */
    where?: GuestWhereInput
    /**
     * Limit how many Guests to update.
     */
    limit?: number
  }

  /**
   * Guest updateManyAndReturn
   */
  export type GuestUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Guest
     */
    select?: GuestSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Guest
     */
    omit?: GuestOmit<ExtArgs> | null
    /**
     * The data used to update Guests.
     */
    data: XOR<GuestUpdateManyMutationInput, GuestUncheckedUpdateManyInput>
    /**
     * Filter which Guests to update
     */
    where?: GuestWhereInput
    /**
     * Limit how many Guests to update.
     */
    limit?: number
  }

  /**
   * Guest upsert
   */
  export type GuestUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Guest
     */
    select?: GuestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Guest
     */
    omit?: GuestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GuestInclude<ExtArgs> | null
    /**
     * The filter to search for the Guest to update in case it exists.
     */
    where: GuestWhereUniqueInput
    /**
     * In case the Guest found by the `where` argument doesn't exist, create a new Guest with this data.
     */
    create: XOR<GuestCreateInput, GuestUncheckedCreateInput>
    /**
     * In case the Guest was found with the provided `where` argument, update it with this data.
     */
    update: XOR<GuestUpdateInput, GuestUncheckedUpdateInput>
  }

  /**
   * Guest delete
   */
  export type GuestDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Guest
     */
    select?: GuestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Guest
     */
    omit?: GuestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GuestInclude<ExtArgs> | null
    /**
     * Filter which Guest to delete.
     */
    where: GuestWhereUniqueInput
  }

  /**
   * Guest deleteMany
   */
  export type GuestDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Guests to delete
     */
    where?: GuestWhereInput
    /**
     * Limit how many Guests to delete.
     */
    limit?: number
  }

  /**
   * Guest.GroupProfile
   */
  export type Guest$GroupProfileArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupProfile
     */
    select?: GroupProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupProfile
     */
    omit?: GroupProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupProfileInclude<ExtArgs> | null
    where?: GroupProfileWhereInput
    orderBy?: GroupProfileOrderByWithRelationInput | GroupProfileOrderByWithRelationInput[]
    cursor?: GroupProfileWhereUniqueInput
    take?: number
    skip?: number
    distinct?: GroupProfileScalarFieldEnum | GroupProfileScalarFieldEnum[]
  }

  /**
   * Guest without action
   */
  export type GuestDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Guest
     */
    select?: GuestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Guest
     */
    omit?: GuestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GuestInclude<ExtArgs> | null
  }


  /**
   * Model GroupProfile
   */

  export type AggregateGroupProfile = {
    _count: GroupProfileCountAggregateOutputType | null
    _min: GroupProfileMinAggregateOutputType | null
    _max: GroupProfileMaxAggregateOutputType | null
  }

  export type GroupProfileMinAggregateOutputType = {
    id: string | null
    name: string | null
    legalName: string | null
    email: string | null
    phone: string | null
    businessType: $Enums.BusinessType | null
    specialRequirements: string | null
    status: $Enums.GroupStatus | null
    isVip: boolean | null
    notes: string | null
    hotelId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type GroupProfileMaxAggregateOutputType = {
    id: string | null
    name: string | null
    legalName: string | null
    email: string | null
    phone: string | null
    businessType: $Enums.BusinessType | null
    specialRequirements: string | null
    status: $Enums.GroupStatus | null
    isVip: boolean | null
    notes: string | null
    hotelId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type GroupProfileCountAggregateOutputType = {
    id: number
    name: number
    legalName: number
    email: number
    phone: number
    primaryContact: number
    address: number
    billingAddress: number
    businessType: number
    specialRequirements: number
    status: number
    isVip: number
    notes: number
    hotelId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type GroupProfileMinAggregateInputType = {
    id?: true
    name?: true
    legalName?: true
    email?: true
    phone?: true
    businessType?: true
    specialRequirements?: true
    status?: true
    isVip?: true
    notes?: true
    hotelId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type GroupProfileMaxAggregateInputType = {
    id?: true
    name?: true
    legalName?: true
    email?: true
    phone?: true
    businessType?: true
    specialRequirements?: true
    status?: true
    isVip?: true
    notes?: true
    hotelId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type GroupProfileCountAggregateInputType = {
    id?: true
    name?: true
    legalName?: true
    email?: true
    phone?: true
    primaryContact?: true
    address?: true
    billingAddress?: true
    businessType?: true
    specialRequirements?: true
    status?: true
    isVip?: true
    notes?: true
    hotelId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type GroupProfileAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GroupProfile to aggregate.
     */
    where?: GroupProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GroupProfiles to fetch.
     */
    orderBy?: GroupProfileOrderByWithRelationInput | GroupProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: GroupProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GroupProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GroupProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned GroupProfiles
    **/
    _count?: true | GroupProfileCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: GroupProfileMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: GroupProfileMaxAggregateInputType
  }

  export type GetGroupProfileAggregateType<T extends GroupProfileAggregateArgs> = {
        [P in keyof T & keyof AggregateGroupProfile]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGroupProfile[P]>
      : GetScalarType<T[P], AggregateGroupProfile[P]>
  }




  export type GroupProfileGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GroupProfileWhereInput
    orderBy?: GroupProfileOrderByWithAggregationInput | GroupProfileOrderByWithAggregationInput[]
    by: GroupProfileScalarFieldEnum[] | GroupProfileScalarFieldEnum
    having?: GroupProfileScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: GroupProfileCountAggregateInputType | true
    _min?: GroupProfileMinAggregateInputType
    _max?: GroupProfileMaxAggregateInputType
  }

  export type GroupProfileGroupByOutputType = {
    id: string
    name: string
    legalName: string | null
    email: string | null
    phone: string | null
    primaryContact: JsonValue | null
    address: JsonValue | null
    billingAddress: JsonValue | null
    businessType: $Enums.BusinessType
    specialRequirements: string | null
    status: $Enums.GroupStatus
    isVip: boolean
    notes: string | null
    hotelId: string
    createdAt: Date
    updatedAt: Date
    _count: GroupProfileCountAggregateOutputType | null
    _min: GroupProfileMinAggregateOutputType | null
    _max: GroupProfileMaxAggregateOutputType | null
  }

  type GetGroupProfileGroupByPayload<T extends GroupProfileGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<GroupProfileGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof GroupProfileGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], GroupProfileGroupByOutputType[P]>
            : GetScalarType<T[P], GroupProfileGroupByOutputType[P]>
        }
      >
    >


  export type GroupProfileSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    legalName?: boolean
    email?: boolean
    phone?: boolean
    primaryContact?: boolean
    address?: boolean
    billingAddress?: boolean
    businessType?: boolean
    specialRequirements?: boolean
    status?: boolean
    isVip?: boolean
    notes?: boolean
    hotelId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    LinkedGuests?: boolean | GroupProfile$LinkedGuestsArgs<ExtArgs>
    _count?: boolean | GroupProfileCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["groupProfile"]>

  export type GroupProfileSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    legalName?: boolean
    email?: boolean
    phone?: boolean
    primaryContact?: boolean
    address?: boolean
    billingAddress?: boolean
    businessType?: boolean
    specialRequirements?: boolean
    status?: boolean
    isVip?: boolean
    notes?: boolean
    hotelId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["groupProfile"]>

  export type GroupProfileSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    legalName?: boolean
    email?: boolean
    phone?: boolean
    primaryContact?: boolean
    address?: boolean
    billingAddress?: boolean
    businessType?: boolean
    specialRequirements?: boolean
    status?: boolean
    isVip?: boolean
    notes?: boolean
    hotelId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["groupProfile"]>

  export type GroupProfileSelectScalar = {
    id?: boolean
    name?: boolean
    legalName?: boolean
    email?: boolean
    phone?: boolean
    primaryContact?: boolean
    address?: boolean
    billingAddress?: boolean
    businessType?: boolean
    specialRequirements?: boolean
    status?: boolean
    isVip?: boolean
    notes?: boolean
    hotelId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type GroupProfileOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "legalName" | "email" | "phone" | "primaryContact" | "address" | "billingAddress" | "businessType" | "specialRequirements" | "status" | "isVip" | "notes" | "hotelId" | "createdAt" | "updatedAt", ExtArgs["result"]["groupProfile"]>
  export type GroupProfileInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    LinkedGuests?: boolean | GroupProfile$LinkedGuestsArgs<ExtArgs>
    _count?: boolean | GroupProfileCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type GroupProfileIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type GroupProfileIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $GroupProfilePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "GroupProfile"
    objects: {
      LinkedGuests: Prisma.$GuestPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      legalName: string | null
      email: string | null
      phone: string | null
      primaryContact: Prisma.JsonValue | null
      address: Prisma.JsonValue | null
      billingAddress: Prisma.JsonValue | null
      businessType: $Enums.BusinessType
      specialRequirements: string | null
      status: $Enums.GroupStatus
      isVip: boolean
      notes: string | null
      hotelId: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["groupProfile"]>
    composites: {}
  }

  type GroupProfileGetPayload<S extends boolean | null | undefined | GroupProfileDefaultArgs> = $Result.GetResult<Prisma.$GroupProfilePayload, S>

  type GroupProfileCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<GroupProfileFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: GroupProfileCountAggregateInputType | true
    }

  export interface GroupProfileDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['GroupProfile'], meta: { name: 'GroupProfile' } }
    /**
     * Find zero or one GroupProfile that matches the filter.
     * @param {GroupProfileFindUniqueArgs} args - Arguments to find a GroupProfile
     * @example
     * // Get one GroupProfile
     * const groupProfile = await prisma.groupProfile.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends GroupProfileFindUniqueArgs>(args: SelectSubset<T, GroupProfileFindUniqueArgs<ExtArgs>>): Prisma__GroupProfileClient<$Result.GetResult<Prisma.$GroupProfilePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one GroupProfile that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {GroupProfileFindUniqueOrThrowArgs} args - Arguments to find a GroupProfile
     * @example
     * // Get one GroupProfile
     * const groupProfile = await prisma.groupProfile.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends GroupProfileFindUniqueOrThrowArgs>(args: SelectSubset<T, GroupProfileFindUniqueOrThrowArgs<ExtArgs>>): Prisma__GroupProfileClient<$Result.GetResult<Prisma.$GroupProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first GroupProfile that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupProfileFindFirstArgs} args - Arguments to find a GroupProfile
     * @example
     * // Get one GroupProfile
     * const groupProfile = await prisma.groupProfile.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends GroupProfileFindFirstArgs>(args?: SelectSubset<T, GroupProfileFindFirstArgs<ExtArgs>>): Prisma__GroupProfileClient<$Result.GetResult<Prisma.$GroupProfilePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first GroupProfile that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupProfileFindFirstOrThrowArgs} args - Arguments to find a GroupProfile
     * @example
     * // Get one GroupProfile
     * const groupProfile = await prisma.groupProfile.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends GroupProfileFindFirstOrThrowArgs>(args?: SelectSubset<T, GroupProfileFindFirstOrThrowArgs<ExtArgs>>): Prisma__GroupProfileClient<$Result.GetResult<Prisma.$GroupProfilePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more GroupProfiles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupProfileFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all GroupProfiles
     * const groupProfiles = await prisma.groupProfile.findMany()
     * 
     * // Get first 10 GroupProfiles
     * const groupProfiles = await prisma.groupProfile.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const groupProfileWithIdOnly = await prisma.groupProfile.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends GroupProfileFindManyArgs>(args?: SelectSubset<T, GroupProfileFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GroupProfilePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a GroupProfile.
     * @param {GroupProfileCreateArgs} args - Arguments to create a GroupProfile.
     * @example
     * // Create one GroupProfile
     * const GroupProfile = await prisma.groupProfile.create({
     *   data: {
     *     // ... data to create a GroupProfile
     *   }
     * })
     * 
     */
    create<T extends GroupProfileCreateArgs>(args: SelectSubset<T, GroupProfileCreateArgs<ExtArgs>>): Prisma__GroupProfileClient<$Result.GetResult<Prisma.$GroupProfilePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many GroupProfiles.
     * @param {GroupProfileCreateManyArgs} args - Arguments to create many GroupProfiles.
     * @example
     * // Create many GroupProfiles
     * const groupProfile = await prisma.groupProfile.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends GroupProfileCreateManyArgs>(args?: SelectSubset<T, GroupProfileCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many GroupProfiles and returns the data saved in the database.
     * @param {GroupProfileCreateManyAndReturnArgs} args - Arguments to create many GroupProfiles.
     * @example
     * // Create many GroupProfiles
     * const groupProfile = await prisma.groupProfile.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many GroupProfiles and only return the `id`
     * const groupProfileWithIdOnly = await prisma.groupProfile.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends GroupProfileCreateManyAndReturnArgs>(args?: SelectSubset<T, GroupProfileCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GroupProfilePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a GroupProfile.
     * @param {GroupProfileDeleteArgs} args - Arguments to delete one GroupProfile.
     * @example
     * // Delete one GroupProfile
     * const GroupProfile = await prisma.groupProfile.delete({
     *   where: {
     *     // ... filter to delete one GroupProfile
     *   }
     * })
     * 
     */
    delete<T extends GroupProfileDeleteArgs>(args: SelectSubset<T, GroupProfileDeleteArgs<ExtArgs>>): Prisma__GroupProfileClient<$Result.GetResult<Prisma.$GroupProfilePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one GroupProfile.
     * @param {GroupProfileUpdateArgs} args - Arguments to update one GroupProfile.
     * @example
     * // Update one GroupProfile
     * const groupProfile = await prisma.groupProfile.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends GroupProfileUpdateArgs>(args: SelectSubset<T, GroupProfileUpdateArgs<ExtArgs>>): Prisma__GroupProfileClient<$Result.GetResult<Prisma.$GroupProfilePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more GroupProfiles.
     * @param {GroupProfileDeleteManyArgs} args - Arguments to filter GroupProfiles to delete.
     * @example
     * // Delete a few GroupProfiles
     * const { count } = await prisma.groupProfile.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends GroupProfileDeleteManyArgs>(args?: SelectSubset<T, GroupProfileDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more GroupProfiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupProfileUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many GroupProfiles
     * const groupProfile = await prisma.groupProfile.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends GroupProfileUpdateManyArgs>(args: SelectSubset<T, GroupProfileUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more GroupProfiles and returns the data updated in the database.
     * @param {GroupProfileUpdateManyAndReturnArgs} args - Arguments to update many GroupProfiles.
     * @example
     * // Update many GroupProfiles
     * const groupProfile = await prisma.groupProfile.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more GroupProfiles and only return the `id`
     * const groupProfileWithIdOnly = await prisma.groupProfile.updateManyAndReturn({
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
    updateManyAndReturn<T extends GroupProfileUpdateManyAndReturnArgs>(args: SelectSubset<T, GroupProfileUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GroupProfilePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one GroupProfile.
     * @param {GroupProfileUpsertArgs} args - Arguments to update or create a GroupProfile.
     * @example
     * // Update or create a GroupProfile
     * const groupProfile = await prisma.groupProfile.upsert({
     *   create: {
     *     // ... data to create a GroupProfile
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the GroupProfile we want to update
     *   }
     * })
     */
    upsert<T extends GroupProfileUpsertArgs>(args: SelectSubset<T, GroupProfileUpsertArgs<ExtArgs>>): Prisma__GroupProfileClient<$Result.GetResult<Prisma.$GroupProfilePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of GroupProfiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupProfileCountArgs} args - Arguments to filter GroupProfiles to count.
     * @example
     * // Count the number of GroupProfiles
     * const count = await prisma.groupProfile.count({
     *   where: {
     *     // ... the filter for the GroupProfiles we want to count
     *   }
     * })
    **/
    count<T extends GroupProfileCountArgs>(
      args?: Subset<T, GroupProfileCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], GroupProfileCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a GroupProfile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupProfileAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends GroupProfileAggregateArgs>(args: Subset<T, GroupProfileAggregateArgs>): Prisma.PrismaPromise<GetGroupProfileAggregateType<T>>

    /**
     * Group by GroupProfile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupProfileGroupByArgs} args - Group by arguments.
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
      T extends GroupProfileGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: GroupProfileGroupByArgs['orderBy'] }
        : { orderBy?: GroupProfileGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, GroupProfileGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGroupProfileGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the GroupProfile model
   */
  readonly fields: GroupProfileFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for GroupProfile.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__GroupProfileClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    LinkedGuests<T extends GroupProfile$LinkedGuestsArgs<ExtArgs> = {}>(args?: Subset<T, GroupProfile$LinkedGuestsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GuestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the GroupProfile model
   */
  interface GroupProfileFieldRefs {
    readonly id: FieldRef<"GroupProfile", 'String'>
    readonly name: FieldRef<"GroupProfile", 'String'>
    readonly legalName: FieldRef<"GroupProfile", 'String'>
    readonly email: FieldRef<"GroupProfile", 'String'>
    readonly phone: FieldRef<"GroupProfile", 'String'>
    readonly primaryContact: FieldRef<"GroupProfile", 'Json'>
    readonly address: FieldRef<"GroupProfile", 'Json'>
    readonly billingAddress: FieldRef<"GroupProfile", 'Json'>
    readonly businessType: FieldRef<"GroupProfile", 'BusinessType'>
    readonly specialRequirements: FieldRef<"GroupProfile", 'String'>
    readonly status: FieldRef<"GroupProfile", 'GroupStatus'>
    readonly isVip: FieldRef<"GroupProfile", 'Boolean'>
    readonly notes: FieldRef<"GroupProfile", 'String'>
    readonly hotelId: FieldRef<"GroupProfile", 'String'>
    readonly createdAt: FieldRef<"GroupProfile", 'DateTime'>
    readonly updatedAt: FieldRef<"GroupProfile", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * GroupProfile findUnique
   */
  export type GroupProfileFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupProfile
     */
    select?: GroupProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupProfile
     */
    omit?: GroupProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupProfileInclude<ExtArgs> | null
    /**
     * Filter, which GroupProfile to fetch.
     */
    where: GroupProfileWhereUniqueInput
  }

  /**
   * GroupProfile findUniqueOrThrow
   */
  export type GroupProfileFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupProfile
     */
    select?: GroupProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupProfile
     */
    omit?: GroupProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupProfileInclude<ExtArgs> | null
    /**
     * Filter, which GroupProfile to fetch.
     */
    where: GroupProfileWhereUniqueInput
  }

  /**
   * GroupProfile findFirst
   */
  export type GroupProfileFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupProfile
     */
    select?: GroupProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupProfile
     */
    omit?: GroupProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupProfileInclude<ExtArgs> | null
    /**
     * Filter, which GroupProfile to fetch.
     */
    where?: GroupProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GroupProfiles to fetch.
     */
    orderBy?: GroupProfileOrderByWithRelationInput | GroupProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GroupProfiles.
     */
    cursor?: GroupProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GroupProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GroupProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GroupProfiles.
     */
    distinct?: GroupProfileScalarFieldEnum | GroupProfileScalarFieldEnum[]
  }

  /**
   * GroupProfile findFirstOrThrow
   */
  export type GroupProfileFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupProfile
     */
    select?: GroupProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupProfile
     */
    omit?: GroupProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupProfileInclude<ExtArgs> | null
    /**
     * Filter, which GroupProfile to fetch.
     */
    where?: GroupProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GroupProfiles to fetch.
     */
    orderBy?: GroupProfileOrderByWithRelationInput | GroupProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GroupProfiles.
     */
    cursor?: GroupProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GroupProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GroupProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GroupProfiles.
     */
    distinct?: GroupProfileScalarFieldEnum | GroupProfileScalarFieldEnum[]
  }

  /**
   * GroupProfile findMany
   */
  export type GroupProfileFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupProfile
     */
    select?: GroupProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupProfile
     */
    omit?: GroupProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupProfileInclude<ExtArgs> | null
    /**
     * Filter, which GroupProfiles to fetch.
     */
    where?: GroupProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GroupProfiles to fetch.
     */
    orderBy?: GroupProfileOrderByWithRelationInput | GroupProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing GroupProfiles.
     */
    cursor?: GroupProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GroupProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GroupProfiles.
     */
    skip?: number
    distinct?: GroupProfileScalarFieldEnum | GroupProfileScalarFieldEnum[]
  }

  /**
   * GroupProfile create
   */
  export type GroupProfileCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupProfile
     */
    select?: GroupProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupProfile
     */
    omit?: GroupProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupProfileInclude<ExtArgs> | null
    /**
     * The data needed to create a GroupProfile.
     */
    data: XOR<GroupProfileCreateInput, GroupProfileUncheckedCreateInput>
  }

  /**
   * GroupProfile createMany
   */
  export type GroupProfileCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many GroupProfiles.
     */
    data: GroupProfileCreateManyInput | GroupProfileCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * GroupProfile createManyAndReturn
   */
  export type GroupProfileCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupProfile
     */
    select?: GroupProfileSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the GroupProfile
     */
    omit?: GroupProfileOmit<ExtArgs> | null
    /**
     * The data used to create many GroupProfiles.
     */
    data: GroupProfileCreateManyInput | GroupProfileCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * GroupProfile update
   */
  export type GroupProfileUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupProfile
     */
    select?: GroupProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupProfile
     */
    omit?: GroupProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupProfileInclude<ExtArgs> | null
    /**
     * The data needed to update a GroupProfile.
     */
    data: XOR<GroupProfileUpdateInput, GroupProfileUncheckedUpdateInput>
    /**
     * Choose, which GroupProfile to update.
     */
    where: GroupProfileWhereUniqueInput
  }

  /**
   * GroupProfile updateMany
   */
  export type GroupProfileUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update GroupProfiles.
     */
    data: XOR<GroupProfileUpdateManyMutationInput, GroupProfileUncheckedUpdateManyInput>
    /**
     * Filter which GroupProfiles to update
     */
    where?: GroupProfileWhereInput
    /**
     * Limit how many GroupProfiles to update.
     */
    limit?: number
  }

  /**
   * GroupProfile updateManyAndReturn
   */
  export type GroupProfileUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupProfile
     */
    select?: GroupProfileSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the GroupProfile
     */
    omit?: GroupProfileOmit<ExtArgs> | null
    /**
     * The data used to update GroupProfiles.
     */
    data: XOR<GroupProfileUpdateManyMutationInput, GroupProfileUncheckedUpdateManyInput>
    /**
     * Filter which GroupProfiles to update
     */
    where?: GroupProfileWhereInput
    /**
     * Limit how many GroupProfiles to update.
     */
    limit?: number
  }

  /**
   * GroupProfile upsert
   */
  export type GroupProfileUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupProfile
     */
    select?: GroupProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupProfile
     */
    omit?: GroupProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupProfileInclude<ExtArgs> | null
    /**
     * The filter to search for the GroupProfile to update in case it exists.
     */
    where: GroupProfileWhereUniqueInput
    /**
     * In case the GroupProfile found by the `where` argument doesn't exist, create a new GroupProfile with this data.
     */
    create: XOR<GroupProfileCreateInput, GroupProfileUncheckedCreateInput>
    /**
     * In case the GroupProfile was found with the provided `where` argument, update it with this data.
     */
    update: XOR<GroupProfileUpdateInput, GroupProfileUncheckedUpdateInput>
  }

  /**
   * GroupProfile delete
   */
  export type GroupProfileDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupProfile
     */
    select?: GroupProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupProfile
     */
    omit?: GroupProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupProfileInclude<ExtArgs> | null
    /**
     * Filter which GroupProfile to delete.
     */
    where: GroupProfileWhereUniqueInput
  }

  /**
   * GroupProfile deleteMany
   */
  export type GroupProfileDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GroupProfiles to delete
     */
    where?: GroupProfileWhereInput
    /**
     * Limit how many GroupProfiles to delete.
     */
    limit?: number
  }

  /**
   * GroupProfile.LinkedGuests
   */
  export type GroupProfile$LinkedGuestsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Guest
     */
    select?: GuestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Guest
     */
    omit?: GuestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GuestInclude<ExtArgs> | null
    where?: GuestWhereInput
    orderBy?: GuestOrderByWithRelationInput | GuestOrderByWithRelationInput[]
    cursor?: GuestWhereUniqueInput
    take?: number
    skip?: number
    distinct?: GuestScalarFieldEnum | GuestScalarFieldEnum[]
  }

  /**
   * GroupProfile without action
   */
  export type GroupProfileDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupProfile
     */
    select?: GroupProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupProfile
     */
    omit?: GroupProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupProfileInclude<ExtArgs> | null
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


  export const GuestScalarFieldEnum: {
    id: 'id',
    gid: 'gid',
    firstName: 'firstName',
    lastName: 'lastName',
    email: 'email',
    phoneNumber: 'phoneNumber',
    identification: 'identification',
    nationality: 'nationality',
    preferences: 'preferences',
    dob: 'dob',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    hotelId: 'hotelId'
  };

  export type GuestScalarFieldEnum = (typeof GuestScalarFieldEnum)[keyof typeof GuestScalarFieldEnum]


  export const GroupProfileScalarFieldEnum: {
    id: 'id',
    name: 'name',
    legalName: 'legalName',
    email: 'email',
    phone: 'phone',
    primaryContact: 'primaryContact',
    address: 'address',
    billingAddress: 'billingAddress',
    businessType: 'businessType',
    specialRequirements: 'specialRequirements',
    status: 'status',
    isVip: 'isVip',
    notes: 'notes',
    hotelId: 'hotelId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type GroupProfileScalarFieldEnum = (typeof GroupProfileScalarFieldEnum)[keyof typeof GroupProfileScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


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
   * Reference to a field of type 'BusinessType'
   */
  export type EnumBusinessTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BusinessType'>
    


  /**
   * Reference to a field of type 'BusinessType[]'
   */
  export type ListEnumBusinessTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BusinessType[]'>
    


  /**
   * Reference to a field of type 'GroupStatus'
   */
  export type EnumGroupStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'GroupStatus'>
    


  /**
   * Reference to a field of type 'GroupStatus[]'
   */
  export type ListEnumGroupStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'GroupStatus[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    
  /**
   * Deep Input Types
   */


  export type GuestWhereInput = {
    AND?: GuestWhereInput | GuestWhereInput[]
    OR?: GuestWhereInput[]
    NOT?: GuestWhereInput | GuestWhereInput[]
    id?: StringFilter<"Guest"> | string
    gid?: StringFilter<"Guest"> | string
    firstName?: StringFilter<"Guest"> | string
    lastName?: StringFilter<"Guest"> | string
    email?: StringNullableFilter<"Guest"> | string | null
    phoneNumber?: StringNullableFilter<"Guest"> | string | null
    identification?: JsonFilter<"Guest">
    nationality?: StringNullableFilter<"Guest"> | string | null
    preferences?: JsonNullableFilter<"Guest">
    dob?: DateTimeNullableFilter<"Guest"> | Date | string | null
    createdAt?: DateTimeFilter<"Guest"> | Date | string
    updatedAt?: DateTimeFilter<"Guest"> | Date | string
    hotelId?: StringFilter<"Guest"> | string
    GroupProfile?: GroupProfileListRelationFilter
  }

  export type GuestOrderByWithRelationInput = {
    id?: SortOrder
    gid?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    email?: SortOrderInput | SortOrder
    phoneNumber?: SortOrderInput | SortOrder
    identification?: SortOrder
    nationality?: SortOrderInput | SortOrder
    preferences?: SortOrderInput | SortOrder
    dob?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    hotelId?: SortOrder
    GroupProfile?: GroupProfileOrderByRelationAggregateInput
  }

  export type GuestWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    gid?: string
    email?: string
    AND?: GuestWhereInput | GuestWhereInput[]
    OR?: GuestWhereInput[]
    NOT?: GuestWhereInput | GuestWhereInput[]
    firstName?: StringFilter<"Guest"> | string
    lastName?: StringFilter<"Guest"> | string
    phoneNumber?: StringNullableFilter<"Guest"> | string | null
    identification?: JsonFilter<"Guest">
    nationality?: StringNullableFilter<"Guest"> | string | null
    preferences?: JsonNullableFilter<"Guest">
    dob?: DateTimeNullableFilter<"Guest"> | Date | string | null
    createdAt?: DateTimeFilter<"Guest"> | Date | string
    updatedAt?: DateTimeFilter<"Guest"> | Date | string
    hotelId?: StringFilter<"Guest"> | string
    GroupProfile?: GroupProfileListRelationFilter
  }, "id" | "gid" | "email">

  export type GuestOrderByWithAggregationInput = {
    id?: SortOrder
    gid?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    email?: SortOrderInput | SortOrder
    phoneNumber?: SortOrderInput | SortOrder
    identification?: SortOrder
    nationality?: SortOrderInput | SortOrder
    preferences?: SortOrderInput | SortOrder
    dob?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    hotelId?: SortOrder
    _count?: GuestCountOrderByAggregateInput
    _max?: GuestMaxOrderByAggregateInput
    _min?: GuestMinOrderByAggregateInput
  }

  export type GuestScalarWhereWithAggregatesInput = {
    AND?: GuestScalarWhereWithAggregatesInput | GuestScalarWhereWithAggregatesInput[]
    OR?: GuestScalarWhereWithAggregatesInput[]
    NOT?: GuestScalarWhereWithAggregatesInput | GuestScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Guest"> | string
    gid?: StringWithAggregatesFilter<"Guest"> | string
    firstName?: StringWithAggregatesFilter<"Guest"> | string
    lastName?: StringWithAggregatesFilter<"Guest"> | string
    email?: StringNullableWithAggregatesFilter<"Guest"> | string | null
    phoneNumber?: StringNullableWithAggregatesFilter<"Guest"> | string | null
    identification?: JsonWithAggregatesFilter<"Guest">
    nationality?: StringNullableWithAggregatesFilter<"Guest"> | string | null
    preferences?: JsonNullableWithAggregatesFilter<"Guest">
    dob?: DateTimeNullableWithAggregatesFilter<"Guest"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Guest"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Guest"> | Date | string
    hotelId?: StringWithAggregatesFilter<"Guest"> | string
  }

  export type GroupProfileWhereInput = {
    AND?: GroupProfileWhereInput | GroupProfileWhereInput[]
    OR?: GroupProfileWhereInput[]
    NOT?: GroupProfileWhereInput | GroupProfileWhereInput[]
    id?: StringFilter<"GroupProfile"> | string
    name?: StringFilter<"GroupProfile"> | string
    legalName?: StringNullableFilter<"GroupProfile"> | string | null
    email?: StringNullableFilter<"GroupProfile"> | string | null
    phone?: StringNullableFilter<"GroupProfile"> | string | null
    primaryContact?: JsonNullableFilter<"GroupProfile">
    address?: JsonNullableFilter<"GroupProfile">
    billingAddress?: JsonNullableFilter<"GroupProfile">
    businessType?: EnumBusinessTypeFilter<"GroupProfile"> | $Enums.BusinessType
    specialRequirements?: StringNullableFilter<"GroupProfile"> | string | null
    status?: EnumGroupStatusFilter<"GroupProfile"> | $Enums.GroupStatus
    isVip?: BoolFilter<"GroupProfile"> | boolean
    notes?: StringNullableFilter<"GroupProfile"> | string | null
    hotelId?: StringFilter<"GroupProfile"> | string
    createdAt?: DateTimeFilter<"GroupProfile"> | Date | string
    updatedAt?: DateTimeFilter<"GroupProfile"> | Date | string
    LinkedGuests?: GuestListRelationFilter
  }

  export type GroupProfileOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    legalName?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    primaryContact?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    billingAddress?: SortOrderInput | SortOrder
    businessType?: SortOrder
    specialRequirements?: SortOrderInput | SortOrder
    status?: SortOrder
    isVip?: SortOrder
    notes?: SortOrderInput | SortOrder
    hotelId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    LinkedGuests?: GuestOrderByRelationAggregateInput
  }

  export type GroupProfileWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: GroupProfileWhereInput | GroupProfileWhereInput[]
    OR?: GroupProfileWhereInput[]
    NOT?: GroupProfileWhereInput | GroupProfileWhereInput[]
    name?: StringFilter<"GroupProfile"> | string
    legalName?: StringNullableFilter<"GroupProfile"> | string | null
    email?: StringNullableFilter<"GroupProfile"> | string | null
    phone?: StringNullableFilter<"GroupProfile"> | string | null
    primaryContact?: JsonNullableFilter<"GroupProfile">
    address?: JsonNullableFilter<"GroupProfile">
    billingAddress?: JsonNullableFilter<"GroupProfile">
    businessType?: EnumBusinessTypeFilter<"GroupProfile"> | $Enums.BusinessType
    specialRequirements?: StringNullableFilter<"GroupProfile"> | string | null
    status?: EnumGroupStatusFilter<"GroupProfile"> | $Enums.GroupStatus
    isVip?: BoolFilter<"GroupProfile"> | boolean
    notes?: StringNullableFilter<"GroupProfile"> | string | null
    hotelId?: StringFilter<"GroupProfile"> | string
    createdAt?: DateTimeFilter<"GroupProfile"> | Date | string
    updatedAt?: DateTimeFilter<"GroupProfile"> | Date | string
    LinkedGuests?: GuestListRelationFilter
  }, "id">

  export type GroupProfileOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    legalName?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    primaryContact?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    billingAddress?: SortOrderInput | SortOrder
    businessType?: SortOrder
    specialRequirements?: SortOrderInput | SortOrder
    status?: SortOrder
    isVip?: SortOrder
    notes?: SortOrderInput | SortOrder
    hotelId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: GroupProfileCountOrderByAggregateInput
    _max?: GroupProfileMaxOrderByAggregateInput
    _min?: GroupProfileMinOrderByAggregateInput
  }

  export type GroupProfileScalarWhereWithAggregatesInput = {
    AND?: GroupProfileScalarWhereWithAggregatesInput | GroupProfileScalarWhereWithAggregatesInput[]
    OR?: GroupProfileScalarWhereWithAggregatesInput[]
    NOT?: GroupProfileScalarWhereWithAggregatesInput | GroupProfileScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"GroupProfile"> | string
    name?: StringWithAggregatesFilter<"GroupProfile"> | string
    legalName?: StringNullableWithAggregatesFilter<"GroupProfile"> | string | null
    email?: StringNullableWithAggregatesFilter<"GroupProfile"> | string | null
    phone?: StringNullableWithAggregatesFilter<"GroupProfile"> | string | null
    primaryContact?: JsonNullableWithAggregatesFilter<"GroupProfile">
    address?: JsonNullableWithAggregatesFilter<"GroupProfile">
    billingAddress?: JsonNullableWithAggregatesFilter<"GroupProfile">
    businessType?: EnumBusinessTypeWithAggregatesFilter<"GroupProfile"> | $Enums.BusinessType
    specialRequirements?: StringNullableWithAggregatesFilter<"GroupProfile"> | string | null
    status?: EnumGroupStatusWithAggregatesFilter<"GroupProfile"> | $Enums.GroupStatus
    isVip?: BoolWithAggregatesFilter<"GroupProfile"> | boolean
    notes?: StringNullableWithAggregatesFilter<"GroupProfile"> | string | null
    hotelId?: StringWithAggregatesFilter<"GroupProfile"> | string
    createdAt?: DateTimeWithAggregatesFilter<"GroupProfile"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"GroupProfile"> | Date | string
  }

  export type GuestCreateInput = {
    id?: string
    gid: string
    firstName: string
    lastName: string
    email?: string | null
    phoneNumber?: string | null
    identification: JsonNullValueInput | InputJsonValue
    nationality?: string | null
    preferences?: NullableJsonNullValueInput | InputJsonValue
    dob?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    hotelId: string
    GroupProfile?: GroupProfileCreateNestedManyWithoutLinkedGuestsInput
  }

  export type GuestUncheckedCreateInput = {
    id?: string
    gid: string
    firstName: string
    lastName: string
    email?: string | null
    phoneNumber?: string | null
    identification: JsonNullValueInput | InputJsonValue
    nationality?: string | null
    preferences?: NullableJsonNullValueInput | InputJsonValue
    dob?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    hotelId: string
    GroupProfile?: GroupProfileUncheckedCreateNestedManyWithoutLinkedGuestsInput
  }

  export type GuestUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    gid?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    identification?: JsonNullValueInput | InputJsonValue
    nationality?: NullableStringFieldUpdateOperationsInput | string | null
    preferences?: NullableJsonNullValueInput | InputJsonValue
    dob?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    hotelId?: StringFieldUpdateOperationsInput | string
    GroupProfile?: GroupProfileUpdateManyWithoutLinkedGuestsNestedInput
  }

  export type GuestUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    gid?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    identification?: JsonNullValueInput | InputJsonValue
    nationality?: NullableStringFieldUpdateOperationsInput | string | null
    preferences?: NullableJsonNullValueInput | InputJsonValue
    dob?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    hotelId?: StringFieldUpdateOperationsInput | string
    GroupProfile?: GroupProfileUncheckedUpdateManyWithoutLinkedGuestsNestedInput
  }

  export type GuestCreateManyInput = {
    id?: string
    gid: string
    firstName: string
    lastName: string
    email?: string | null
    phoneNumber?: string | null
    identification: JsonNullValueInput | InputJsonValue
    nationality?: string | null
    preferences?: NullableJsonNullValueInput | InputJsonValue
    dob?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    hotelId: string
  }

  export type GuestUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    gid?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    identification?: JsonNullValueInput | InputJsonValue
    nationality?: NullableStringFieldUpdateOperationsInput | string | null
    preferences?: NullableJsonNullValueInput | InputJsonValue
    dob?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    hotelId?: StringFieldUpdateOperationsInput | string
  }

  export type GuestUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    gid?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    identification?: JsonNullValueInput | InputJsonValue
    nationality?: NullableStringFieldUpdateOperationsInput | string | null
    preferences?: NullableJsonNullValueInput | InputJsonValue
    dob?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    hotelId?: StringFieldUpdateOperationsInput | string
  }

  export type GroupProfileCreateInput = {
    id?: string
    name: string
    legalName?: string | null
    email?: string | null
    phone?: string | null
    primaryContact?: NullableJsonNullValueInput | InputJsonValue
    address?: NullableJsonNullValueInput | InputJsonValue
    billingAddress?: NullableJsonNullValueInput | InputJsonValue
    businessType: $Enums.BusinessType
    specialRequirements?: string | null
    status?: $Enums.GroupStatus
    isVip?: boolean
    notes?: string | null
    hotelId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    LinkedGuests?: GuestCreateNestedManyWithoutGroupProfileInput
  }

  export type GroupProfileUncheckedCreateInput = {
    id?: string
    name: string
    legalName?: string | null
    email?: string | null
    phone?: string | null
    primaryContact?: NullableJsonNullValueInput | InputJsonValue
    address?: NullableJsonNullValueInput | InputJsonValue
    billingAddress?: NullableJsonNullValueInput | InputJsonValue
    businessType: $Enums.BusinessType
    specialRequirements?: string | null
    status?: $Enums.GroupStatus
    isVip?: boolean
    notes?: string | null
    hotelId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    LinkedGuests?: GuestUncheckedCreateNestedManyWithoutGroupProfileInput
  }

  export type GroupProfileUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    legalName?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    primaryContact?: NullableJsonNullValueInput | InputJsonValue
    address?: NullableJsonNullValueInput | InputJsonValue
    billingAddress?: NullableJsonNullValueInput | InputJsonValue
    businessType?: EnumBusinessTypeFieldUpdateOperationsInput | $Enums.BusinessType
    specialRequirements?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumGroupStatusFieldUpdateOperationsInput | $Enums.GroupStatus
    isVip?: BoolFieldUpdateOperationsInput | boolean
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    hotelId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    LinkedGuests?: GuestUpdateManyWithoutGroupProfileNestedInput
  }

  export type GroupProfileUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    legalName?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    primaryContact?: NullableJsonNullValueInput | InputJsonValue
    address?: NullableJsonNullValueInput | InputJsonValue
    billingAddress?: NullableJsonNullValueInput | InputJsonValue
    businessType?: EnumBusinessTypeFieldUpdateOperationsInput | $Enums.BusinessType
    specialRequirements?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumGroupStatusFieldUpdateOperationsInput | $Enums.GroupStatus
    isVip?: BoolFieldUpdateOperationsInput | boolean
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    hotelId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    LinkedGuests?: GuestUncheckedUpdateManyWithoutGroupProfileNestedInput
  }

  export type GroupProfileCreateManyInput = {
    id?: string
    name: string
    legalName?: string | null
    email?: string | null
    phone?: string | null
    primaryContact?: NullableJsonNullValueInput | InputJsonValue
    address?: NullableJsonNullValueInput | InputJsonValue
    billingAddress?: NullableJsonNullValueInput | InputJsonValue
    businessType: $Enums.BusinessType
    specialRequirements?: string | null
    status?: $Enums.GroupStatus
    isVip?: boolean
    notes?: string | null
    hotelId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type GroupProfileUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    legalName?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    primaryContact?: NullableJsonNullValueInput | InputJsonValue
    address?: NullableJsonNullValueInput | InputJsonValue
    billingAddress?: NullableJsonNullValueInput | InputJsonValue
    businessType?: EnumBusinessTypeFieldUpdateOperationsInput | $Enums.BusinessType
    specialRequirements?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumGroupStatusFieldUpdateOperationsInput | $Enums.GroupStatus
    isVip?: BoolFieldUpdateOperationsInput | boolean
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    hotelId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GroupProfileUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    legalName?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    primaryContact?: NullableJsonNullValueInput | InputJsonValue
    address?: NullableJsonNullValueInput | InputJsonValue
    billingAddress?: NullableJsonNullValueInput | InputJsonValue
    businessType?: EnumBusinessTypeFieldUpdateOperationsInput | $Enums.BusinessType
    specialRequirements?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumGroupStatusFieldUpdateOperationsInput | $Enums.GroupStatus
    isVip?: BoolFieldUpdateOperationsInput | boolean
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    hotelId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
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

  export type GroupProfileListRelationFilter = {
    every?: GroupProfileWhereInput
    some?: GroupProfileWhereInput
    none?: GroupProfileWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type GroupProfileOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type GuestCountOrderByAggregateInput = {
    id?: SortOrder
    gid?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    email?: SortOrder
    phoneNumber?: SortOrder
    identification?: SortOrder
    nationality?: SortOrder
    preferences?: SortOrder
    dob?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    hotelId?: SortOrder
  }

  export type GuestMaxOrderByAggregateInput = {
    id?: SortOrder
    gid?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    email?: SortOrder
    phoneNumber?: SortOrder
    nationality?: SortOrder
    dob?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    hotelId?: SortOrder
  }

  export type GuestMinOrderByAggregateInput = {
    id?: SortOrder
    gid?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    email?: SortOrder
    phoneNumber?: SortOrder
    nationality?: SortOrder
    dob?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    hotelId?: SortOrder
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

  export type EnumBusinessTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.BusinessType | EnumBusinessTypeFieldRefInput<$PrismaModel>
    in?: $Enums.BusinessType[] | ListEnumBusinessTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.BusinessType[] | ListEnumBusinessTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumBusinessTypeFilter<$PrismaModel> | $Enums.BusinessType
  }

  export type EnumGroupStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.GroupStatus | EnumGroupStatusFieldRefInput<$PrismaModel>
    in?: $Enums.GroupStatus[] | ListEnumGroupStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.GroupStatus[] | ListEnumGroupStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumGroupStatusFilter<$PrismaModel> | $Enums.GroupStatus
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type GuestListRelationFilter = {
    every?: GuestWhereInput
    some?: GuestWhereInput
    none?: GuestWhereInput
  }

  export type GuestOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type GroupProfileCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    legalName?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    primaryContact?: SortOrder
    address?: SortOrder
    billingAddress?: SortOrder
    businessType?: SortOrder
    specialRequirements?: SortOrder
    status?: SortOrder
    isVip?: SortOrder
    notes?: SortOrder
    hotelId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type GroupProfileMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    legalName?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    businessType?: SortOrder
    specialRequirements?: SortOrder
    status?: SortOrder
    isVip?: SortOrder
    notes?: SortOrder
    hotelId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type GroupProfileMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    legalName?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    businessType?: SortOrder
    specialRequirements?: SortOrder
    status?: SortOrder
    isVip?: SortOrder
    notes?: SortOrder
    hotelId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumBusinessTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.BusinessType | EnumBusinessTypeFieldRefInput<$PrismaModel>
    in?: $Enums.BusinessType[] | ListEnumBusinessTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.BusinessType[] | ListEnumBusinessTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumBusinessTypeWithAggregatesFilter<$PrismaModel> | $Enums.BusinessType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumBusinessTypeFilter<$PrismaModel>
    _max?: NestedEnumBusinessTypeFilter<$PrismaModel>
  }

  export type EnumGroupStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.GroupStatus | EnumGroupStatusFieldRefInput<$PrismaModel>
    in?: $Enums.GroupStatus[] | ListEnumGroupStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.GroupStatus[] | ListEnumGroupStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumGroupStatusWithAggregatesFilter<$PrismaModel> | $Enums.GroupStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumGroupStatusFilter<$PrismaModel>
    _max?: NestedEnumGroupStatusFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type GroupProfileCreateNestedManyWithoutLinkedGuestsInput = {
    create?: XOR<GroupProfileCreateWithoutLinkedGuestsInput, GroupProfileUncheckedCreateWithoutLinkedGuestsInput> | GroupProfileCreateWithoutLinkedGuestsInput[] | GroupProfileUncheckedCreateWithoutLinkedGuestsInput[]
    connectOrCreate?: GroupProfileCreateOrConnectWithoutLinkedGuestsInput | GroupProfileCreateOrConnectWithoutLinkedGuestsInput[]
    connect?: GroupProfileWhereUniqueInput | GroupProfileWhereUniqueInput[]
  }

  export type GroupProfileUncheckedCreateNestedManyWithoutLinkedGuestsInput = {
    create?: XOR<GroupProfileCreateWithoutLinkedGuestsInput, GroupProfileUncheckedCreateWithoutLinkedGuestsInput> | GroupProfileCreateWithoutLinkedGuestsInput[] | GroupProfileUncheckedCreateWithoutLinkedGuestsInput[]
    connectOrCreate?: GroupProfileCreateOrConnectWithoutLinkedGuestsInput | GroupProfileCreateOrConnectWithoutLinkedGuestsInput[]
    connect?: GroupProfileWhereUniqueInput | GroupProfileWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type GroupProfileUpdateManyWithoutLinkedGuestsNestedInput = {
    create?: XOR<GroupProfileCreateWithoutLinkedGuestsInput, GroupProfileUncheckedCreateWithoutLinkedGuestsInput> | GroupProfileCreateWithoutLinkedGuestsInput[] | GroupProfileUncheckedCreateWithoutLinkedGuestsInput[]
    connectOrCreate?: GroupProfileCreateOrConnectWithoutLinkedGuestsInput | GroupProfileCreateOrConnectWithoutLinkedGuestsInput[]
    upsert?: GroupProfileUpsertWithWhereUniqueWithoutLinkedGuestsInput | GroupProfileUpsertWithWhereUniqueWithoutLinkedGuestsInput[]
    set?: GroupProfileWhereUniqueInput | GroupProfileWhereUniqueInput[]
    disconnect?: GroupProfileWhereUniqueInput | GroupProfileWhereUniqueInput[]
    delete?: GroupProfileWhereUniqueInput | GroupProfileWhereUniqueInput[]
    connect?: GroupProfileWhereUniqueInput | GroupProfileWhereUniqueInput[]
    update?: GroupProfileUpdateWithWhereUniqueWithoutLinkedGuestsInput | GroupProfileUpdateWithWhereUniqueWithoutLinkedGuestsInput[]
    updateMany?: GroupProfileUpdateManyWithWhereWithoutLinkedGuestsInput | GroupProfileUpdateManyWithWhereWithoutLinkedGuestsInput[]
    deleteMany?: GroupProfileScalarWhereInput | GroupProfileScalarWhereInput[]
  }

  export type GroupProfileUncheckedUpdateManyWithoutLinkedGuestsNestedInput = {
    create?: XOR<GroupProfileCreateWithoutLinkedGuestsInput, GroupProfileUncheckedCreateWithoutLinkedGuestsInput> | GroupProfileCreateWithoutLinkedGuestsInput[] | GroupProfileUncheckedCreateWithoutLinkedGuestsInput[]
    connectOrCreate?: GroupProfileCreateOrConnectWithoutLinkedGuestsInput | GroupProfileCreateOrConnectWithoutLinkedGuestsInput[]
    upsert?: GroupProfileUpsertWithWhereUniqueWithoutLinkedGuestsInput | GroupProfileUpsertWithWhereUniqueWithoutLinkedGuestsInput[]
    set?: GroupProfileWhereUniqueInput | GroupProfileWhereUniqueInput[]
    disconnect?: GroupProfileWhereUniqueInput | GroupProfileWhereUniqueInput[]
    delete?: GroupProfileWhereUniqueInput | GroupProfileWhereUniqueInput[]
    connect?: GroupProfileWhereUniqueInput | GroupProfileWhereUniqueInput[]
    update?: GroupProfileUpdateWithWhereUniqueWithoutLinkedGuestsInput | GroupProfileUpdateWithWhereUniqueWithoutLinkedGuestsInput[]
    updateMany?: GroupProfileUpdateManyWithWhereWithoutLinkedGuestsInput | GroupProfileUpdateManyWithWhereWithoutLinkedGuestsInput[]
    deleteMany?: GroupProfileScalarWhereInput | GroupProfileScalarWhereInput[]
  }

  export type GuestCreateNestedManyWithoutGroupProfileInput = {
    create?: XOR<GuestCreateWithoutGroupProfileInput, GuestUncheckedCreateWithoutGroupProfileInput> | GuestCreateWithoutGroupProfileInput[] | GuestUncheckedCreateWithoutGroupProfileInput[]
    connectOrCreate?: GuestCreateOrConnectWithoutGroupProfileInput | GuestCreateOrConnectWithoutGroupProfileInput[]
    connect?: GuestWhereUniqueInput | GuestWhereUniqueInput[]
  }

  export type GuestUncheckedCreateNestedManyWithoutGroupProfileInput = {
    create?: XOR<GuestCreateWithoutGroupProfileInput, GuestUncheckedCreateWithoutGroupProfileInput> | GuestCreateWithoutGroupProfileInput[] | GuestUncheckedCreateWithoutGroupProfileInput[]
    connectOrCreate?: GuestCreateOrConnectWithoutGroupProfileInput | GuestCreateOrConnectWithoutGroupProfileInput[]
    connect?: GuestWhereUniqueInput | GuestWhereUniqueInput[]
  }

  export type EnumBusinessTypeFieldUpdateOperationsInput = {
    set?: $Enums.BusinessType
  }

  export type EnumGroupStatusFieldUpdateOperationsInput = {
    set?: $Enums.GroupStatus
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type GuestUpdateManyWithoutGroupProfileNestedInput = {
    create?: XOR<GuestCreateWithoutGroupProfileInput, GuestUncheckedCreateWithoutGroupProfileInput> | GuestCreateWithoutGroupProfileInput[] | GuestUncheckedCreateWithoutGroupProfileInput[]
    connectOrCreate?: GuestCreateOrConnectWithoutGroupProfileInput | GuestCreateOrConnectWithoutGroupProfileInput[]
    upsert?: GuestUpsertWithWhereUniqueWithoutGroupProfileInput | GuestUpsertWithWhereUniqueWithoutGroupProfileInput[]
    set?: GuestWhereUniqueInput | GuestWhereUniqueInput[]
    disconnect?: GuestWhereUniqueInput | GuestWhereUniqueInput[]
    delete?: GuestWhereUniqueInput | GuestWhereUniqueInput[]
    connect?: GuestWhereUniqueInput | GuestWhereUniqueInput[]
    update?: GuestUpdateWithWhereUniqueWithoutGroupProfileInput | GuestUpdateWithWhereUniqueWithoutGroupProfileInput[]
    updateMany?: GuestUpdateManyWithWhereWithoutGroupProfileInput | GuestUpdateManyWithWhereWithoutGroupProfileInput[]
    deleteMany?: GuestScalarWhereInput | GuestScalarWhereInput[]
  }

  export type GuestUncheckedUpdateManyWithoutGroupProfileNestedInput = {
    create?: XOR<GuestCreateWithoutGroupProfileInput, GuestUncheckedCreateWithoutGroupProfileInput> | GuestCreateWithoutGroupProfileInput[] | GuestUncheckedCreateWithoutGroupProfileInput[]
    connectOrCreate?: GuestCreateOrConnectWithoutGroupProfileInput | GuestCreateOrConnectWithoutGroupProfileInput[]
    upsert?: GuestUpsertWithWhereUniqueWithoutGroupProfileInput | GuestUpsertWithWhereUniqueWithoutGroupProfileInput[]
    set?: GuestWhereUniqueInput | GuestWhereUniqueInput[]
    disconnect?: GuestWhereUniqueInput | GuestWhereUniqueInput[]
    delete?: GuestWhereUniqueInput | GuestWhereUniqueInput[]
    connect?: GuestWhereUniqueInput | GuestWhereUniqueInput[]
    update?: GuestUpdateWithWhereUniqueWithoutGroupProfileInput | GuestUpdateWithWhereUniqueWithoutGroupProfileInput[]
    updateMany?: GuestUpdateManyWithWhereWithoutGroupProfileInput | GuestUpdateManyWithWhereWithoutGroupProfileInput[]
    deleteMany?: GuestScalarWhereInput | GuestScalarWhereInput[]
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

  export type NestedEnumBusinessTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.BusinessType | EnumBusinessTypeFieldRefInput<$PrismaModel>
    in?: $Enums.BusinessType[] | ListEnumBusinessTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.BusinessType[] | ListEnumBusinessTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumBusinessTypeFilter<$PrismaModel> | $Enums.BusinessType
  }

  export type NestedEnumGroupStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.GroupStatus | EnumGroupStatusFieldRefInput<$PrismaModel>
    in?: $Enums.GroupStatus[] | ListEnumGroupStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.GroupStatus[] | ListEnumGroupStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumGroupStatusFilter<$PrismaModel> | $Enums.GroupStatus
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedEnumBusinessTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.BusinessType | EnumBusinessTypeFieldRefInput<$PrismaModel>
    in?: $Enums.BusinessType[] | ListEnumBusinessTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.BusinessType[] | ListEnumBusinessTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumBusinessTypeWithAggregatesFilter<$PrismaModel> | $Enums.BusinessType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumBusinessTypeFilter<$PrismaModel>
    _max?: NestedEnumBusinessTypeFilter<$PrismaModel>
  }

  export type NestedEnumGroupStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.GroupStatus | EnumGroupStatusFieldRefInput<$PrismaModel>
    in?: $Enums.GroupStatus[] | ListEnumGroupStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.GroupStatus[] | ListEnumGroupStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumGroupStatusWithAggregatesFilter<$PrismaModel> | $Enums.GroupStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumGroupStatusFilter<$PrismaModel>
    _max?: NestedEnumGroupStatusFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type GroupProfileCreateWithoutLinkedGuestsInput = {
    id?: string
    name: string
    legalName?: string | null
    email?: string | null
    phone?: string | null
    primaryContact?: NullableJsonNullValueInput | InputJsonValue
    address?: NullableJsonNullValueInput | InputJsonValue
    billingAddress?: NullableJsonNullValueInput | InputJsonValue
    businessType: $Enums.BusinessType
    specialRequirements?: string | null
    status?: $Enums.GroupStatus
    isVip?: boolean
    notes?: string | null
    hotelId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type GroupProfileUncheckedCreateWithoutLinkedGuestsInput = {
    id?: string
    name: string
    legalName?: string | null
    email?: string | null
    phone?: string | null
    primaryContact?: NullableJsonNullValueInput | InputJsonValue
    address?: NullableJsonNullValueInput | InputJsonValue
    billingAddress?: NullableJsonNullValueInput | InputJsonValue
    businessType: $Enums.BusinessType
    specialRequirements?: string | null
    status?: $Enums.GroupStatus
    isVip?: boolean
    notes?: string | null
    hotelId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type GroupProfileCreateOrConnectWithoutLinkedGuestsInput = {
    where: GroupProfileWhereUniqueInput
    create: XOR<GroupProfileCreateWithoutLinkedGuestsInput, GroupProfileUncheckedCreateWithoutLinkedGuestsInput>
  }

  export type GroupProfileUpsertWithWhereUniqueWithoutLinkedGuestsInput = {
    where: GroupProfileWhereUniqueInput
    update: XOR<GroupProfileUpdateWithoutLinkedGuestsInput, GroupProfileUncheckedUpdateWithoutLinkedGuestsInput>
    create: XOR<GroupProfileCreateWithoutLinkedGuestsInput, GroupProfileUncheckedCreateWithoutLinkedGuestsInput>
  }

  export type GroupProfileUpdateWithWhereUniqueWithoutLinkedGuestsInput = {
    where: GroupProfileWhereUniqueInput
    data: XOR<GroupProfileUpdateWithoutLinkedGuestsInput, GroupProfileUncheckedUpdateWithoutLinkedGuestsInput>
  }

  export type GroupProfileUpdateManyWithWhereWithoutLinkedGuestsInput = {
    where: GroupProfileScalarWhereInput
    data: XOR<GroupProfileUpdateManyMutationInput, GroupProfileUncheckedUpdateManyWithoutLinkedGuestsInput>
  }

  export type GroupProfileScalarWhereInput = {
    AND?: GroupProfileScalarWhereInput | GroupProfileScalarWhereInput[]
    OR?: GroupProfileScalarWhereInput[]
    NOT?: GroupProfileScalarWhereInput | GroupProfileScalarWhereInput[]
    id?: StringFilter<"GroupProfile"> | string
    name?: StringFilter<"GroupProfile"> | string
    legalName?: StringNullableFilter<"GroupProfile"> | string | null
    email?: StringNullableFilter<"GroupProfile"> | string | null
    phone?: StringNullableFilter<"GroupProfile"> | string | null
    primaryContact?: JsonNullableFilter<"GroupProfile">
    address?: JsonNullableFilter<"GroupProfile">
    billingAddress?: JsonNullableFilter<"GroupProfile">
    businessType?: EnumBusinessTypeFilter<"GroupProfile"> | $Enums.BusinessType
    specialRequirements?: StringNullableFilter<"GroupProfile"> | string | null
    status?: EnumGroupStatusFilter<"GroupProfile"> | $Enums.GroupStatus
    isVip?: BoolFilter<"GroupProfile"> | boolean
    notes?: StringNullableFilter<"GroupProfile"> | string | null
    hotelId?: StringFilter<"GroupProfile"> | string
    createdAt?: DateTimeFilter<"GroupProfile"> | Date | string
    updatedAt?: DateTimeFilter<"GroupProfile"> | Date | string
  }

  export type GuestCreateWithoutGroupProfileInput = {
    id?: string
    gid: string
    firstName: string
    lastName: string
    email?: string | null
    phoneNumber?: string | null
    identification: JsonNullValueInput | InputJsonValue
    nationality?: string | null
    preferences?: NullableJsonNullValueInput | InputJsonValue
    dob?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    hotelId: string
  }

  export type GuestUncheckedCreateWithoutGroupProfileInput = {
    id?: string
    gid: string
    firstName: string
    lastName: string
    email?: string | null
    phoneNumber?: string | null
    identification: JsonNullValueInput | InputJsonValue
    nationality?: string | null
    preferences?: NullableJsonNullValueInput | InputJsonValue
    dob?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    hotelId: string
  }

  export type GuestCreateOrConnectWithoutGroupProfileInput = {
    where: GuestWhereUniqueInput
    create: XOR<GuestCreateWithoutGroupProfileInput, GuestUncheckedCreateWithoutGroupProfileInput>
  }

  export type GuestUpsertWithWhereUniqueWithoutGroupProfileInput = {
    where: GuestWhereUniqueInput
    update: XOR<GuestUpdateWithoutGroupProfileInput, GuestUncheckedUpdateWithoutGroupProfileInput>
    create: XOR<GuestCreateWithoutGroupProfileInput, GuestUncheckedCreateWithoutGroupProfileInput>
  }

  export type GuestUpdateWithWhereUniqueWithoutGroupProfileInput = {
    where: GuestWhereUniqueInput
    data: XOR<GuestUpdateWithoutGroupProfileInput, GuestUncheckedUpdateWithoutGroupProfileInput>
  }

  export type GuestUpdateManyWithWhereWithoutGroupProfileInput = {
    where: GuestScalarWhereInput
    data: XOR<GuestUpdateManyMutationInput, GuestUncheckedUpdateManyWithoutGroupProfileInput>
  }

  export type GuestScalarWhereInput = {
    AND?: GuestScalarWhereInput | GuestScalarWhereInput[]
    OR?: GuestScalarWhereInput[]
    NOT?: GuestScalarWhereInput | GuestScalarWhereInput[]
    id?: StringFilter<"Guest"> | string
    gid?: StringFilter<"Guest"> | string
    firstName?: StringFilter<"Guest"> | string
    lastName?: StringFilter<"Guest"> | string
    email?: StringNullableFilter<"Guest"> | string | null
    phoneNumber?: StringNullableFilter<"Guest"> | string | null
    identification?: JsonFilter<"Guest">
    nationality?: StringNullableFilter<"Guest"> | string | null
    preferences?: JsonNullableFilter<"Guest">
    dob?: DateTimeNullableFilter<"Guest"> | Date | string | null
    createdAt?: DateTimeFilter<"Guest"> | Date | string
    updatedAt?: DateTimeFilter<"Guest"> | Date | string
    hotelId?: StringFilter<"Guest"> | string
  }

  export type GroupProfileUpdateWithoutLinkedGuestsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    legalName?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    primaryContact?: NullableJsonNullValueInput | InputJsonValue
    address?: NullableJsonNullValueInput | InputJsonValue
    billingAddress?: NullableJsonNullValueInput | InputJsonValue
    businessType?: EnumBusinessTypeFieldUpdateOperationsInput | $Enums.BusinessType
    specialRequirements?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumGroupStatusFieldUpdateOperationsInput | $Enums.GroupStatus
    isVip?: BoolFieldUpdateOperationsInput | boolean
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    hotelId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GroupProfileUncheckedUpdateWithoutLinkedGuestsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    legalName?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    primaryContact?: NullableJsonNullValueInput | InputJsonValue
    address?: NullableJsonNullValueInput | InputJsonValue
    billingAddress?: NullableJsonNullValueInput | InputJsonValue
    businessType?: EnumBusinessTypeFieldUpdateOperationsInput | $Enums.BusinessType
    specialRequirements?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumGroupStatusFieldUpdateOperationsInput | $Enums.GroupStatus
    isVip?: BoolFieldUpdateOperationsInput | boolean
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    hotelId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GroupProfileUncheckedUpdateManyWithoutLinkedGuestsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    legalName?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    primaryContact?: NullableJsonNullValueInput | InputJsonValue
    address?: NullableJsonNullValueInput | InputJsonValue
    billingAddress?: NullableJsonNullValueInput | InputJsonValue
    businessType?: EnumBusinessTypeFieldUpdateOperationsInput | $Enums.BusinessType
    specialRequirements?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumGroupStatusFieldUpdateOperationsInput | $Enums.GroupStatus
    isVip?: BoolFieldUpdateOperationsInput | boolean
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    hotelId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GuestUpdateWithoutGroupProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    gid?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    identification?: JsonNullValueInput | InputJsonValue
    nationality?: NullableStringFieldUpdateOperationsInput | string | null
    preferences?: NullableJsonNullValueInput | InputJsonValue
    dob?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    hotelId?: StringFieldUpdateOperationsInput | string
  }

  export type GuestUncheckedUpdateWithoutGroupProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    gid?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    identification?: JsonNullValueInput | InputJsonValue
    nationality?: NullableStringFieldUpdateOperationsInput | string | null
    preferences?: NullableJsonNullValueInput | InputJsonValue
    dob?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    hotelId?: StringFieldUpdateOperationsInput | string
  }

  export type GuestUncheckedUpdateManyWithoutGroupProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    gid?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    identification?: JsonNullValueInput | InputJsonValue
    nationality?: NullableStringFieldUpdateOperationsInput | string | null
    preferences?: NullableJsonNullValueInput | InputJsonValue
    dob?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    hotelId?: StringFieldUpdateOperationsInput | string
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