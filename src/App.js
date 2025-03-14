import './App.css';
import TodoItem from "./components/TodoItem/TodoItem";


export default function App() {

  const taches = ([
    { id: 1, text: "Faire les courses" },
    { id: 2, text: "Réviser React" },
    { id: 3, text: "Préparer la réunion" },
  ]);

  return (
      <section>
          <button>Trier</button>
          <button>Filtrer</button>

        <section className="liste">
        {taches.map((tache) => (
                <TodoItem key={tache.id} tache={tache} />
            ))}
        </section>
        </section>
  );
}


