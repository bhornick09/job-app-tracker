import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { useAuthenticator } from '@aws-amplify/ui-react';

const client = generateClient<Schema>();

function App() {
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);
  const { user, signOut } = useAuthenticator();


  useEffect(() => {
    client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });
  }, []);

  function createTodo() {
    client.models.Todo.create({ content: window.prompt("Todo content") });
  }

  function deleteTodo(id: string) {
    client.models.Todo.delete({ id });
  }


  return (
    <main>
      {/*Nav Bar*/}
      <ul className="flex justify-between items-center border w-screen h-10 cal-sans px-6 bg-linear-to-t from-blue-600 to-white">
        <div className="flex">
        <li className="mr-3 px-6"> 
          <a className="inline-block py-1 px-3 text-white bg-linear-to-t from-sky-500 to-indigo-500">Home</a>
        </li>
        <li className="mr-3 px-6"> 
          <a className="inline-block py-1 px-3 text-white bg-linear-to-t from-sky-500 to-indigo-500">Contact</a>
        </li>
        </div>
        <div className="flex">
          <li className="mr-3 px-2"> 
            <a className="inline-block py-1 px-3 text-white bg-linear-to-t from-sky-500 to-indigo-500">{user?.signInDetails?.loginId}</a>
          </li>
          <li className="mr-3 px-2"> 
            <a onClick={signOut} className="inline-block py-1 px-3 text-white bg-linear-to-t from-sky-500 to-indigo-500">Sign out</a>
          </li>
        </div>
      </ul>

      {/*Hero*/}
      <div className="relative flex justify-center py-10 px-30 cal-sans overflow-hidden">
      <div className="absolute inset-2 bg-gradient-to-t from-black to-gray-800 bg-[url(/lines.png)] bg-center bg-repeat brightness-200"></div>
        <div className="px-20 self-center z-0">
          <h1 className="text-white text-6xl font-bold py-5 justify-self-center">Application Tracker</h1>
          <h1 className="text-blue-400 text-6xl animate-pulse justify-self-center">+</h1>
          <h1 className="text-white text-9xl font-bold justify-self-center">Open AI</h1>
          <h2 className="text-blue-500 py-5 justify-self-center">Track your job applications and adjust your resume</h2>
        </div>
      </div>

      {/*Tabs*/}
      <div className="bg-linear-to-t from-blue-600 to-white"> 
      <ul className="flex justify-center py-5 px-30 cal-sans">
        <li className="mr-3 px-20"> 
          <a className="inline-block border border-blue-300 rounded bg-linear-to-t from-sky-500 to-indigo-500 py-1 px-3 text-white text-2xl">Job Tracker</a>
        </li>
        <li className="mr-3 px-20"> 
          <a className="inline-block border border-blue-300 rounded bg-linear-to-t from-sky-500 to-indigo-500 py-1 px-3 text-white text-2xl">AI Resume Builder</a>
        </li>
        <li className="mr-3 px-20"> 
          <a className="inline-block border border-blue-300 rounded bg-linear-to-t from-sky-500 to-indigo-500 py-1 px-3 text-white text-2xl">AI Resume Job Matcher</a>
        </li>
        <li className="mr-3 px-20"> 
          <a className="inline-block border border-blue-300 rounded bg-linear-to-t from-sky-500 to-indigo-500 py-1 px-3 text-white text-2xl">AI Resume Check</a>
        </li>
      </ul>
      </div>

      {/*User menu*/}
      <div className="relative flex flex-col items-center py-10 px-30 cal-sans">

        <div className="absolute inset-0 bg-gradient-to-t from-black to-gray-800 bg-[url(/lines.png)] bg-center bg-repeat brightness-200"></div>
        <div className="z-0 flex flex-col items-center">
          <h1 className="text-white text-6xl font-bold py-5 justify-self-center">{user?.signInDetails?.loginId}'s applications</h1>
          <button onClick={createTodo} className="text-white text-6xl font-bold py-5">+ new</button>
          <ul>
            {todos.map((todo) => (
              <li 
                onClick={() => deleteTodo(todo.id)}
                key={todo.id}>{todo.content}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}

export default App;
