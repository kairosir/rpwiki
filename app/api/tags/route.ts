import { NextResponse } from 'next/server';
import { tagService } from '@/lib/services/tag';
import { createTagSchema } from '@/lib/validations/tag';
import { ZodError } from 'zod';

export async function GET() {
  try {
    const tags = await tagService.getAll();
    return NextResponse.json(tags);
  } catch (error) {
    console.error('Error in GET /api/tags:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Валидация входящих данных
    const validatedData = createTagSchema.parse(body);
    
    const tag = await tagService.create(validatedData);
    return NextResponse.json(tag, { status: 201 });
  } catch (error) {
    console.error('Error in POST /api/tags:', error);
    
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.errors },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 