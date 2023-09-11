import { useEffect, useState } from "react";

export default function LastSale() {
  const [sales, setSales] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("https://next-course-fetching-default-rtdb.firebaseio.com/sales.json")
      .then((response) => response.json())
      .then((data) => {
        const transformedSales = [];

        for (const key in data) {
          transformedSales.push({
            id: key,
            username: data[key].username,
            volume: data[key].volume,
          });
        }

        setSales(transformedSales);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading ...</p>;
  }

  //this is for the first time rendering
  //where sales state is still undefind
  if (!sales) {
    return <p>No data is found ...</p>
  }

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
