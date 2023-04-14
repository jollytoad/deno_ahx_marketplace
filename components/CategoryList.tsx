interface Props {
  categories: string[];
}

export function CategoryList({ categories }: Props) {
  return (
    <div class="marketplace-category-list">
      <h4>Categories</h4>

      <ul>
        {categories.map((c) => (
          <li>
            <a href={`?category=${encodeURIComponent(c)}`}>{c}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
