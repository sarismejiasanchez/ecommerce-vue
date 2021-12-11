const getSellers = () => {

    const url = 'http://ecommerce-php.test/api/seller';

    return fetch(url, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
    });

}

const createSeller = (seller) => {
    
    const url = 'http://ecommerce-php.test/api/seller';

    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            
        },
        body: JSON.stringify(seller),
    });

}

export {
    getSellers,
    createSeller,
}