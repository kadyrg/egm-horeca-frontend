import { GoogleAuth } from "@/components/shared/google-auth";
import { LoginForm } from "@/components/shared/login-form";
import { Or } from "@/components/shared/or";
import { Link } from "@/i18n/navigation";
import { getLoginPageMetadata } from "@/lib/api/metadata";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const metadata = await getLoginPageMetadata();

  return {
    title: metadata.title,
    description: metadata.description,
  };
}

export default async function LoginPage() {
  const metadata = await getLoginPageMetadata();

  return (
    <div className="max-w-120 mx-auto space-y-6 w-full absolute top-3/7 left-1/2 -translate-x-1/2 -translate-y-1/2 sm:border sm:border-slate-200 p-7 sm:p-10 lg:p-14 rounded-2xl">
      <h1 className="text-xl lg:text-2xl font-semibold">
        {metadata.pageTitle}
      </h1>
      <LoginForm
        emailPlaceholder={metadata.emailPlaceholder}
        passwordPlaceholder={metadata.passwordPlaceholder}
        signinButton={metadata.signinButton}
      />
      <Or text={metadata.orTxt} />
      <GoogleAuth text={metadata.googleButton} />
      <div></div>
      <h3 className="text-center font-semibold text-sm">
        {metadata.dontHave}&nbsp;&nbsp;
        <Link className="text-primary hover:text-primary/75" href={"/register"}>
          {metadata.signUp}
        </Link>
      </h3>
    </div>
  );
}
