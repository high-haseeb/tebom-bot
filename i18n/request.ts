"use server"
import { getRequestConfig } from 'next-intl/server';
import { cookies } from 'next/headers';

export default getRequestConfig(async () => {
    const cookie = await cookies();
    const locale = cookie.get("locale")?.value || "tr";

    return {
        locale,
        messages: (await import(`../messages/${locale}.json`)).default
    };
});
