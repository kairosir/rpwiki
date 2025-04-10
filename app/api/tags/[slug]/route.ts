import { NextResponse } from 'next/server';
import { tagService } from '@/lib/services/tag';
import { updateTagSchema } from '@/lib/validations/tag';
import { ZodError } from 'zod';

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const tag = await tagService.getBySlug(params.slug);
    
    if (!tag) {
      return NextResponse.json(
        { error: 'Tag not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(tag);
  } catch (error) {
    console.error('Error in GET /api/tags/[slug]:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const body = await request.json();
    const tag = await tagService.getBySlug(params.slug);
    
    if (!tag) {
      return NextResponse.json(
        { error: 'Tag not found' },
        { status: 404 }
      );
    }

    const validatedData = updateTagSchema.parse(body);
    
    const updatedTag = await tagService.update(params.slug, validatedData);
    return NextResponse.json(updatedTag);
  } catch (error) {
    console.error('Error in PUT /api/tags/[slug]:', error);
    
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

export async function DELETE(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const tag = await tagService.getBySlug(params.slug);
    
    if (!tag) {
      return NextResponse.json(
        { error: 'Tag not found' },
        { status: 404 }
      );
    }

    const deletedTag = await tagService.delete(params.slug);
    return NextResponse.json(deletedTag);
  } catch (error) {
    console.error('Error in DELETE /api/tags/[slug]:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 