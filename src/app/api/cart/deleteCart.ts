export async function deleteMyCart(id: string): Promise<void> {
  const myHeaders = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${JSON.parse(localStorage.token_info).access_token}`,
  };

  const requestOptions = {
    method: 'DELETE',
    headers: myHeaders,
  };

  const version = localStorage.cartState ? JSON.parse(localStorage.cartState).version : 1;

  fetch(
    `https://api.australia-southeast1.gcp.commercetools.com/ecommerce-application-jsfe2023/me/carts/${id}?version=${version}`,
    requestOptions,
  )
    .then((res) => {
      if (res.status >= 200 && res.status < 300) {
        return res.json();
      } else {
        throw new Error(`The error with status code ${res.status} has occured, please try later`);
      }
    })
    .then((res) => {
      localStorage.setItem('cart', JSON.stringify(res));
    });
}
