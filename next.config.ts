import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
    i18n: {
        locales: ["en", "tr"],
        defaultLocale: "en",
    }
};

export default withNextIntl(nextConfig);
