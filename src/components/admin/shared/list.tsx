import { Input } from "../ui/input";
import { AdminPagination } from "../pagination";

function List({
  title,
  addFeature,
  table,
  total,
  initial,
  last,
  totalPages,
  page,
  searchPlaceholder
} : {
  title: string
  addFeature?: React.ReactNode;
  table: React.ReactNode;
  total: number;
  initial: number;
  last: number;
  totalPages: number;
  page: number;
  searchPlaceholder: string
}) {
  return (
    <div className="h-full border rounded-lg flex flex-col overflow-hidden">
      <div className="py-2 sticky top-0 z-50 flex items-center justify-between px-2 bg-background">
        <h1 className="text-lg font-semibold">{title}</h1>
        <div className="flex gap-2">
          <Input
            placeholder={searchPlaceholder}
            className="rounded-md w-90 px-3 h-8"
          />
          {addFeature}
        </div>
      </div>
      {table}
      <div className="py-1 sticky bottom-0 flex items-center justify-between px-2 shadow-[0_-1px_2px_0_rgba(0,0,0,0.05)] bg-background">
        <div></div>
        <AdminPagination
          initial={initial}
          last={last}
          total={total}
          totalPages={totalPages}
          page={page}
        />
      </div>
    </div>
  );
};

export { List };
