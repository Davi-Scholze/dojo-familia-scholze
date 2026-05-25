import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@dojo-fs/ui";

export function NotFoundPage() {
  const { t } = useTranslation();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 py-12">
      <section className="flex flex-col items-center gap-6 text-center">
        <h1 className="font-display text-6xl font-bold text-dojo-red">404</h1>
        <p className="text-lg font-semibold">{t("navigation.not_found_title")}</p>
        <p className="text-base text-muted-foreground">
          {t("navigation.not_found_subtitle")}
        </p>
        <Link to="/">
          <Button variant="outline">{t("navigation.back_home")}</Button>
        </Link>
      </section>
    </main>
  );
}
