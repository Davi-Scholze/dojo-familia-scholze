import { Link } from "react-router-dom";
import { Button } from "@dojo-fs/ui";

export function NotFoundPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 py-12">
      <section className="flex flex-col items-center gap-6 text-center">
        <h1 className="font-display text-6xl font-bold text-dojo-red">404</h1>
        <p className="text-lg text-muted-foreground">
          Esta página não foi encontrada.
        </p>
        <Link to="/">
          <Button variant="outline">Voltar ao início</Button>
        </Link>
      </section>
    </main>
  );
}
