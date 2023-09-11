import { useEffect, useState } from "react";
//this requires 'npm install swr'
import useSWR from "swr";

export default function LastSale(props) {
  const [sales, setSales] = useState(props.sales);
  //   const [loading, setLoading] = useState(false);

  //only useSWR will not work, add defalut fetch like follow:
  //useSWR(<request-url>, (url) => fetch(url).then(res => res.json()))
  const { data, error } = useSWR(
    "https://next-course-fetching-default-rtdb.firebaseio.com/sales.json",
    (url) => fetch(url).then((res) => res.json())
  );

  useEffect(() => {
    if (data) {
      const transformedSales = [];

      for (const key in data) {
        transformedSales.push({
          id: key,
          username: data[key].username,
          volume: data[key].volume,
        });
      }

      setSales(transformedSales);
    }
  }, [data]);

  //   useEffect(() => {
  //     setLoading(true);
  //     fetch("https://next-course-fetching-default-rtdb.firebaseio.com/sales.json")
  //       .then((response) => response.json())
  //       .then((data) => {
  //         const transformedSales = [];

  //         for (const key in data) {
  //           transformedSales.push({
  //             id: key,
  //             username: data[key].username,
  //             volume: data[key].volume,
  //           });
  //         }

  //         setSales(transformedSales);
  //         setLoading(false);
  //       });
  //   }, []);

  //   if (loading) {
  //     return <p>Loading ...</p>;
  //   }

  //error should be check before data
  if (error) {
    return <p>Failed to Load Required Data</p>;
  }
  if (!data && !sales) {
    return <p>Loading ...</p>;
  }

  //this is for the first time rendering
  //where sales state is still undefind
  //   if (!sales) {
  //     return <p>No data is found ...</p>;
  //   }

  return (
    <ul>
      {sales.map((sale) => (
        <li key={sale.id}>
          {sale.username} - ${sale.volume}
        </li>
      ))}
    </ul>
  );
}

export async function getStaticProps() {
  const response = await fetch(
    "https://next-course-fetching-default-rtdb.firebaseio.com/sales.json"
  );
  const data = await response.json();
  const transformedSales = [];

  for (const key in data) {
    transformedSales.push({
      id: key,
      username: data[key].username,
      volume: data[key].volume,
    });
  }

  return { props: { sales: transformedSales }, revalidate: 10 };
}
