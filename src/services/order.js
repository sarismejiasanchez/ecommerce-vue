const createOrder = (order) => {
    
    const url = 'http://ecommerce-php.test/api/order';

    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            
        },
        body: JSON.stringify(order),
    });

}

export {
    createOrder,
}