import { AuthPage } from "@refinedev/core";

import { GetServerSideProps } from "next";

import { authProvider } from "src/authProvider";

export default function Register() {
  return <AuthPage type="register" />;
}

Register.noLayout = true;

export const getServerSideProps: GetServerSideProps<{}> = async (context) => {
  const { authenticated } = await authProvider.check(context);

  if (authenticated) {
    return {
      props: {},
      redirect: {
        destination: `/`,
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
