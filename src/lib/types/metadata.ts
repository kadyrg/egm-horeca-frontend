export type HeaderMetadata = {
  title: string;
  searchPlaceholder: string;
};

export type TopBarMetadata = {
  storeLocation: string;
  storeLocationURL: string;
  phone: string;
};

export type BottomNavMetadata = {
  home: string;
  categories: string;
  likes: string;
  cart: string;
  profile: string;
};

export type RootLayout = {
  header: HeaderMetadata;
  topBar: TopBarMetadata;
  bottomNav: BottomNavMetadata;
};

export type HomePage = {
  title: string;
  description: string;
  tops: string;
  news: string;
};

export type ProductPage = {
  addToCart: string;
  checkoutNow: string;
  description: string;
  related: string;
};

export type RegisterPage = {
  title: string;
  description: string;
  pageTitle: string;
  googleButton: string;
  firstNamePlaceholder: string;
  lastNamePlaceholder: string;
  emailPlaceholder: string;
  phoneNumberPlaceholder: string;
  passwordPlaceholder: string;
  signupButton: string;
  already: string;
  signIn: string;
  orTxt: string;
};

export type LoginPage = {
  title: string;
  description: string;
  pageTitle: string;
  googleButton: string;
  emailPlaceholder: string;
  passwordPlaceholder: string;
  signinButton: string;
  orTxt: string;
  dontHave: string;
  signUp: string;
};

export type SharedMetadata = {
  addToCart: string;
};

export type VerifyEmailPage = {
  title: string;
  description: string;
};
