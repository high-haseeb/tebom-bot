import { useTranslations } from "next-intl";

const Agreement = () => {
    const t = useTranslations("agreement");
    return (
        <div className="text-sm text-gray-600">
            {t.rich("text", {
                info:    () => <a href="#" className="underline">{t("info")}</a>,
                privacy: () => <a href="#" className="underline">{t("privacy")}</a>,
                user:    () => <a href="#" className="underline">{t("user")}</a>
            })}
        </div>
    )
}

export default Agreement;
