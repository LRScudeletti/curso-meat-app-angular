class Order {
    constructor(
        public address: string,
        public numberAddress: number,
        public optionalAddress: string,
        public paymentOption: string,
        public orderItems: OrderItem[] = [],
        public id?: string
    ) { }
}

class OrderItem {
    constructor(public quantity: number, public menuID: string) { }
}

export { Order, OrderItem }