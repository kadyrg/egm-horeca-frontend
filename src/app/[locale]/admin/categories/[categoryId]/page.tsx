interface Props {
  params: Promise<{ categoryId: number }>;
}

export default async function CategoryPage({ params }: Props) {
  const { categoryId } = await params;

  return <>{categoryId}</>;
}
