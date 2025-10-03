import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';

// Common API response helpers
export const apiResponse = {
  success: (data: any, status = 200) => {
    return NextResponse.json(data, { status });
  },
  
  error: (message: string, status = 500, details?: any) => {
    return NextResponse.json(
      { 
        error: message,
        ...(details && { details })
      },
      { status }
    );
  },
  
  notFound: (message = 'Resource not found') => {
    return NextResponse.json(
      { error: message },
      { status: 404 }
    );
  },
  
  badRequest: (message: string, details?: any) => {
    return NextResponse.json(
      { 
        error: message,
        ...(details && { details })
      },
      { status: 400 }
    );
  }
};

// Common error handling wrapper
export const withErrorHandling = (handler: Function) => {
  return async (request: NextRequest, context?: any) => {
    try {
      await connectDB();
      return await handler(request, context);
    } catch (error) {
      console.error('API Error:', error);
      return apiResponse.error(
        'Internal server error',
        500,
        error instanceof Error ? error.message : 'Unknown error'
      );
    }
  };
};

// Common validation helpers
export const validateRequired = (data: any, fields: string[]) => {
  const missing = fields.filter(field => !data[field]);
  if (missing.length > 0) {
    throw new Error(`Missing required fields: ${missing.join(', ')}`);
  }
};

// Common pagination helper
export const getPaginationParams = (request: NextRequest) => {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '10');
  const skip = (page - 1) * limit;
  
  return { page, limit, skip };
};

// Common sorting helper
export const getSortParams = (request: NextRequest, defaultSort = '-createdAt') => {
  const { searchParams } = new URL(request.url);
  const sort = searchParams.get('sort') || defaultSort;
  
  return sort;
};

// Common filtering helper
export const getFilterParams = (request: NextRequest, allowedFilters: string[] = []) => {
  const { searchParams } = new URL(request.url);
  const filters: any = {};
  
  allowedFilters.forEach(filter => {
    const value = searchParams.get(filter);
    if (value) {
      filters[filter] = value;
    }
  });
  
  return filters;
};
