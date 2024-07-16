'use client';
import {RequestAllInOne} from '@/app/demos/api-all-in-one/fetch-data';
import {useEffect, useState} from 'react';

const client = new RequestAllInOne({});

export default function Fetch() {
  const [data, setData] = useState<any>();

  useEffect(() => {
    const fetchData = async () => {
      const response = await client.get('https://api.github.com/repos/TanStack/query');
      setData(response);
    };
    fetchData();
  }, []);

  if (!data) {
    return <>No data</>;
  }

  return <>
    <div>
      <div> Fetch Only </div>
      <h1>{data.full_name}</h1>
      <p>{data.description}</p>
      <strong>👀 {data.subscribers_count}</strong>{' '}
      <strong>✨ {data.stargazers_count}</strong>{' '}
      <strong>🍴 {data.forks_count}</strong>
      {/*<div>{isFetching ? 'Updating...' : ''}</div>*/}
    </div>
  </>;
}

// function Example() {
//   const { isPending, error, data, isFetching } = useQuery({
//     queryKey: ['repoData'],
//     queryFn: async () => {
//       const response = await fetch(
//         'https://api.github.com/repos/TanStack/query',
//       )
//       return await response.json()
//     },
//   })
//
//   if (isPending) return 'Loading...'
//
//   if (error) return 'An error has occurred: ' + error.message
//
//   return (
//     <div>
//       <h1>{data.full_name}</h1>
//       <p>{data.description}</p>
//       <strong>👀 {data.subscribers_count}</strong>{' '}
//       <strong>✨ {data.stargazers_count}</strong>{' '}
//       <strong>🍴 {data.forks_count}</strong>
//       <div>{isFetching ? 'Updating...' : ''}</div>
//     </div>
//   )
// }

//
// function Todos() {
//   // Access the client
//   const queryClient = useQueryClient()
//
//   // Queries
//   const query = useQuery({ queryKey: ['todos'], queryFn: getTodos })
//
//   // Mutations
//   const mutation = useMutation({
//     mutationFn: postTodo,
//     onSuccess: () => {
//       // Invalidate and refetch
//       queryClient.invalidateQueries({ queryKey: ['todos'] })
//     },
//   })
//
//   return (
//     <div>
//       <ul>{query.data?.map((todo) => <li key={todo.id}>{todo.title}</li>)}</ul>
//
//       <button
//         onClick={() => {
//           mutation.mutate({
//             id: Date.now(),
//             title: 'Do Laundry',
//           })
//         }}
//       >
//         Add Todo
//       </button>
//     </div>
//   )
// }
