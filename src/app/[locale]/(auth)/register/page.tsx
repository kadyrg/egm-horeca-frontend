import { GoogleAuth } from "@/components/shared/google-auth";
import { Or } from "@/components/shared/or";
import { RegisterForm } from "@/components/shared/register-form";
import { Link } from "@/i18n/navigation";
import { getRegisterPageMetadata } from "@/lib/api/metadata";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const metadata = await getRegisterPageMetadata();

  return {
    title: metadata.title,
    description: metadata.description,
  };
}

export default async function RegisterPage() {
  const metadata = await getRegisterPageMetadata();

  return (
    <div className="max-w-120 mx-auto space-y-6 w-full absolute top-3/6 left-1/2 -translate-x-1/2 -translate-y-1/2 sm:border sm:border-slate-200 p-7 sm:p-10 lg:p-14 rounded-2xl">
      <h1 className="text-xl lg:text-2xl font-semibold">
        {metadata.pageTitle}
      </h1>
      <RegisterForm
        firstNamePlaceholder={metadata.firstNamePlaceholder}
        lastNamePlaceholder={metadata.lastNamePlaceholder}
        emailPlaceholder={metadata.emailPlaceholder}
        phoneNumberPlaceholder={metadata.phoneNumberPlaceholder}
        passwordPlaceholder={metadata.passwordPlaceholder}
        signupButton={metadata.signupButton}
      />
      <Or text={metadata.orTxt} />
      <GoogleAuth text={metadata.googleButton} />
      <h3 className="text-center font-semibold text-sm">
        {metadata.already}&nbsp;&nbsp;
        <Link className="text-primary hover:text-primary/75" href={"/login"}>
          {metadata.signIn}
        </Link>
      </h3>
    </div>
  );
}
