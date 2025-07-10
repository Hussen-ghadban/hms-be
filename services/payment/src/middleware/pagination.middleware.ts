import { Request, Response, NextFunction } from 'express';

declare global {
  namespace Express {
    interface Request {
      pagination?: {
        page: number;
        limit: number;
        skip: number;
        getPaginationResult<T>(
          fetchFn: () => Promise<T[]>,
          countFn: () => Promise<number>
        ): Promise<PaginationResult<T>>;
      };
    }
  }
}


export interface PaginationResult<T> {
    data: T[];
    pagination: {
        totalItems: number;
        totalPages: number;
        currentPage: number;
        pageSize: number;
        hasNext: boolean;
        hasPrevious: boolean;
        nextPage: number | null;
        previousPage: number | null;
    };
}
export const paginateResults = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const skip = (page - 1) * limit;

  req.pagination = {
    page,
    limit,
    skip,

    // Works with Prisma when passed a `fetchFn` and `countFn`
    async getPaginationResult<T>(
      fetchFn: () => Promise<T[]>,
      countFn: () => Promise<number>
    ): Promise<PaginationResult<T>> {
      const [data, totalItems] = await Promise.all([fetchFn(), countFn()]);
      const totalPages = Math.ceil(totalItems / limit);

      return {
        data,
        pagination: {
          totalItems,
          totalPages,
          currentPage: page,
          pageSize: limit,
          hasNext: page < totalPages,
          hasPrevious: page > 1,
          nextPage: page < totalPages ? page + 1 : null,
          previousPage: page > 1 ? page - 1 : null,
        },
      };
    },
  };

  next();
};
