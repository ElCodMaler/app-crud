import { Button } from "flowbite-react";
import { Alerts } from "../components/Alerts";

function App() {

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-800 text-white">
      <div className="text-4xl font-bold bg-primary-800 p-6 text-amber-700">
        Tailwind CSS está funcionando 🚀
      </div>
      <Button>Click me</Button>
      <Alerts variant="success" className="mx-4 my-2 w-2xl align-middle">
        <strong>Success!</strong> This is a success alert.
      </Alerts>
    </main>
  );
}

export default App
