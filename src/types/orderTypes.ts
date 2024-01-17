export interface IncomingOrder {
  ingredients: string[]
}

export interface OutcomingOrder {
  name: string
  order: {
    number: number
  }
  sucess: boolean
}

export interface OrderSlice {
  orderLoading: boolean
  orderError: string | null | undefined
  order: OutcomingOrder
  orders: IOrder[],
  total: number | null,
  totalToday: number | null,
}

export interface IOrder {
  ingredients: string[];
  _id: string;
  status: 'created' | 'pending' | 'done';
  number: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderListResponse {
  success: boolean;
  orders: IOrder[];
  total: number;
  totalToday: number;
  message?: string;
}
