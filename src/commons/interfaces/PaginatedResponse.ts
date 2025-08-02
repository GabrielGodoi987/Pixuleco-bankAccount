export interface PaginatedResponse<T> {
  current: number;
  previous: number | null;
  next: number | null;
  totalPages: number;
  items: T[];
}
