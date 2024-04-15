type Order = 'asc' | 'desc' | 'newest' | 'oldest' | '';

export type SearchProductQuery = {
    q?: string;
    range?: string; // a,b
    categories?: string; // a,b
    order?: Order;
    page?: string;
    size?: string;
};

export interface ResponseData<T> {
    data?: T,
    message?: string
}