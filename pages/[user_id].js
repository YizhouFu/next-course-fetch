export default function UserId(props) {
  return <h1>{props.id}</h1>;
}

export async function getServerSideProps(context) {
  const { params } = context;
  const userId = params.user_id;
  return {
    props: {
      id: "user id: " + userId,
    },
  };
}
