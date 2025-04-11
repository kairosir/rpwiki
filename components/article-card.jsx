import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatDate } from '@/lib/utils';

export function ArticleCard({ article }) {
  return (
    <Link href={`/articles/${article.slug}`}>
      <Card className="h-full transition-all hover:shadow-lg">
        <CardHeader className="p-0">
          {article.cover && (
            <div className="relative h-48 w-full">
              <Image
                src={article.cover.url}
                alt={article.title}
                fill
                className="object-cover"
              />
            </div>
          )}
        </CardHeader>
        <CardContent className="p-4">
          <h3 className="mb-2 text-lg font-semibold">{article.title}</h3>
          <p className="mb-4 text-sm text-muted-foreground">
            {article.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {article.tags?.map((tag) => (
              <Badge key={tag.id} variant="secondary">
                {tag.name}
              </Badge>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex items-center justify-between p-4 pt-0">
          <span className="text-sm text-muted-foreground">
            {article.lastEditedBy === 'admin' ? 'Админ' : 'Модератор'}
          </span>
          <span className="text-sm text-muted-foreground">
            {formatDate(article.updatedAt)}
          </span>
        </CardFooter>
      </Card>
    </Link>
  );
} 