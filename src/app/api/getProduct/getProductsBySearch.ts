const getProductsBySearch = (word: string): Promise<void> => {
  const myHeaders = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${JSON.parse(localStorage.token_info).access_token}`,
  };

  const requestOptions = {
    method: 'GET',
    headers: myHeaders,
  };
  
  return fetch(
    `https://api.australia-southeast1.gcp.commercetools.com/ecommerce-application-jsfe2023/product-projections/search?limit=500&fuzzy=true&text.en-US=%22${word}%22`,
    requestOptions,
  )
    .then((response) => {
      if (response.status >= 200 && response.status < 300) {
        return response.json();
      } else {
        throw new Error(`The error with status code ${response.status} has occured, please try later`);
      }
    })
    .then((result) => {
      console.log(result);
      localStorage.setItem('search_products', JSON.stringify(result.results));
    });
};

export default getProductsBySearch;
